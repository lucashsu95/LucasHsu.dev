---
outline: { level: [2, 3] }

head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: Redis, ZSet, 手動索引, 分頁, 排行榜, MGET, redis-seckill
  - - meta
    - property: og:title
      content: Redis 秒殺｜手動索引、分頁與排行榜
  - - meta
    - property: og:description
      content: Worker 補寫時在維護什麼？用圖看懂 Redis 手動索引：訂單本體、用戶歷史、全域分頁、熱銷排行榜。
  - - meta
    - property: og:type
      content: article
---

# Redis 秒殺｜手動索引、分頁與排行榜

上一篇 Worker 負責「取紙條、把帳記齊」。  
打開那隻工具箱，裡面通常至少有四樣東西要補：

<div class="lh-flow" style="margin:1.25rem 0;overflow-x:auto;">
<svg viewBox="0 0 720 220" role="img" aria-label="Worker 補寫四類資料：訂單本體、用戶歷史、全域索引、排行榜" style="width:100%;max-width:720px;height:auto;font-family:var(--vp-font-family-base,sans-serif);">
  <rect x="280" y="16" width="160" height="44" rx="10" fill="var(--lh-gold-soft, rgba(255,204,112,0.16))" stroke="var(--lh-gold, #e0a93f)"/>
  <text x="360" y="43" text-anchor="middle" font-size="13" fill="var(--vp-c-text-1)">Stream 紙條</text>

  <line x1="360" y1="60" x2="360" y2="88" stroke="currentColor" opacity="0.35"/>
  <rect x="300" y="88" width="120" height="36" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <text x="360" y="111" text-anchor="middle" font-size="12" fill="var(--vp-c-text-1)">Worker</text>

  <path d="M360 124 L120 160" fill="none" stroke="currentColor" opacity="0.3"/>
  <path d="M360 124 L280 160" fill="none" stroke="currentColor" opacity="0.3"/>
  <path d="M360 124 L440 160" fill="none" stroke="currentColor" opacity="0.3"/>
  <path d="M360 124 L600 160" fill="none" stroke="currentColor" opacity="0.3"/>

  <rect x="40" y="160" width="160" height="44" rx="8" fill="var(--lh-accent-soft, rgba(65,88,208,0.12))" stroke="var(--lh-accent, #4158d0)"/>
  <text x="120" y="187" text-anchor="middle" font-size="12" fill="var(--vp-c-text-1)">① 訂單本體</text>

  <rect x="200" y="160" width="160" height="44" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <text x="280" y="187" text-anchor="middle" font-size="12" fill="var(--vp-c-text-1)">② 用戶歷史</text>

  <rect x="360" y="160" width="160" height="44" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <text x="440" y="187" text-anchor="middle" font-size="12" fill="var(--vp-c-text-1)">③ 全域索引</text>

  <rect x="520" y="160" width="160" height="44" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <text x="600" y="187" text-anchor="middle" font-size="12" fill="var(--vp-c-text-1)">④ 排行榜</text>
</svg>
</div>

四樣東西用途不同：

| 要回答的問題 | 補的是什麼 |
|---|---|
| 這張訂單內容是什麼？ | **訂單本體** |
| 這個用戶買過哪些？ | **用戶歷史** |
| 後台依時間翻頁怎麼翻？ | **全域索引** |
| 哪個商品賣最好？ | **排行榜** |

在 SQL 世界，很多關聯靠表格與索引自動維護。  
在以 Redis 當主戰場的設計裡，這四樣常常要 **Worker 寫入時自己維護**——這就叫**手動索引**。下一拍起，我們逐個看它們長什麼樣子。

## ① 訂單本體：一張 key，一份內容

最直覺的一塊：**訂單本體**。

- Key 長得像門牌：`order:訂單編號`  
- Value 是這張訂單的完整內容（常見是一段 JSON 字串：誰買、買什麼、價格、時間…）

<div class="lh-flow" style="margin:1.25rem 0;overflow-x:auto;">
<svg viewBox="0 0 640 140" role="img" aria-label="order id 對應一份訂單 JSON" style="width:100%;max-width:640px;height:auto;font-family:var(--vp-font-family-base,sans-serif);">
  <rect x="40" y="40" width="200" height="60" rx="10" fill="var(--lh-accent-soft, rgba(65,88,208,0.12))" stroke="var(--lh-accent, #4158d0)" stroke-width="2"/>
  <text x="140" y="65" text-anchor="middle" font-size="13" font-weight="700" fill="var(--vp-c-text-1)">key</text>
  <text x="140" y="85" text-anchor="middle" font-size="12" fill="var(--vp-c-text-2)">order:o101</text>

  <line x1="250" y1="70" x2="310" y2="70" stroke="currentColor" opacity="0.4"/>
  <text x="280" y="58" text-anchor="middle" font-size="11" fill="var(--vp-c-text-2)">存</text>

  <rect x="320" y="30" width="280" height="80" rx="10" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <text x="460" y="58" text-anchor="middle" font-size="13" font-weight="700" fill="var(--vp-c-text-1)">value（訂單內容）</text>
  <text x="460" y="82" text-anchor="middle" font-size="11" fill="var(--vp-c-text-2)">用戶、商品、價格、時間…</text>
</svg>
</div>

你有門牌，就能直接把整張訂單拿出來——這很快。  
但新問題來了：**後台要「依時間列出第 3 頁」時，你不可能靠猜門牌。**  
所以才需要旁邊那些索引（②③④）幫你回答「有哪些 id、怎麼排序」。

## ② 用戶歷史：一條屬於某人的隊伍

「這個用戶買過哪些？」不需要每次掃全部訂單。  
常見做法：每位用戶一條 **List（列表）**，裡面只放訂單 id。

- Key 像：`user:小明:orders`  
- 新訂單來時，把 id **塞到隊伍最前面**（最新的在前）

<div class="lh-flow" style="margin:1.25rem 0;overflow-x:auto;">
<svg viewBox="0 0 680 130" role="img" aria-label="用戶訂單 List：最新 id 在最前面" style="width:100%;max-width:680px;height:auto;font-family:var(--vp-font-family-base,sans-serif);">
  <text x="120" y="28" text-anchor="middle" font-size="12" fill="var(--vp-c-text-2)">user:小明:orders</text>
  <rect x="40" y="40" width="90" height="50" rx="8" fill="var(--lh-accent-soft, rgba(65,88,208,0.12))" stroke="var(--lh-accent, #4158d0)" stroke-width="2"/>
  <text x="85" y="70" text-anchor="middle" font-size="12" fill="var(--vp-c-text-1)">o103</text>
  <rect x="140" y="40" width="90" height="50" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <text x="185" y="70" text-anchor="middle" font-size="12" fill="var(--vp-c-text-1)">o101</text>
  <rect x="240" y="40" width="90" height="50" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <text x="285" y="70" text-anchor="middle" font-size="12" fill="var(--vp-c-text-1)">o077</text>
  <text x="185" y="115" text-anchor="middle" font-size="12" fill="var(--vp-c-text-2)">← 越左邊越新　只要 id，細節再去 order:… 拿</text>
</svg>
</div>

List 回答的是「**有哪些門牌、大概的先後**」。  
真正的訂單內容，還是回到 ① 用門牌去取——索引薄、本體厚，各做各的事。

## ③ 全域索引：ZSet 當時間軸

後台要「依時間翻頁看全部訂單」時，需要一條**全站共用的時間軸**。  
Redis 的 **ZSet（有序集合）** 很適合：每個成員是訂單 id，旁邊掛一個**分數（score）**——這裡用**時間戳**。

<div class="lh-flow" style="margin:1.25rem 0;overflow-x:auto;">
<svg viewBox="0 0 700 160" role="img" aria-label="ZSet 依時間戳排序的訂單 id" style="width:100%;max-width:700px;height:auto;font-family:var(--vp-font-family-base,sans-serif);">
  <text x="350" y="24" text-anchor="middle" font-size="12" fill="var(--vp-c-text-2)">orders:index（示意）</text>

  <rect x="40" y="40" width="120" height="70" rx="10" fill="var(--lh-accent-soft, rgba(65,88,208,0.12))" stroke="var(--lh-accent, #4158d0)" stroke-width="2"/>
  <text x="100" y="68" text-anchor="middle" font-size="12" font-weight="700" fill="var(--vp-c-text-1)">o103</text>
  <text x="100" y="90" text-anchor="middle" font-size="11" fill="var(--vp-c-text-2)">score 較新</text>

  <rect x="190" y="40" width="120" height="70" rx="10" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <text x="250" y="68" text-anchor="middle" font-size="12" font-weight="700" fill="var(--vp-c-text-1)">o101</text>
  <text x="250" y="90" text-anchor="middle" font-size="11" fill="var(--vp-c-text-2)">score …</text>

  <rect x="340" y="40" width="120" height="70" rx="10" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <text x="400" y="68" text-anchor="middle" font-size="12" font-weight="700" fill="var(--vp-c-text-1)">o077</text>
  <text x="400" y="90" text-anchor="middle" font-size="11" fill="var(--vp-c-text-2)">score …</text>

  <rect x="490" y="40" width="120" height="70" rx="10" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <text x="550" y="68" text-anchor="middle" font-size="12" font-weight="700" fill="var(--vp-c-text-1)">…</text>
  <text x="550" y="90" text-anchor="middle" font-size="11" fill="var(--vp-c-text-2)">更早</text>

  <text x="350" y="140" text-anchor="middle" font-size="12" fill="var(--vp-c-text-2)">翻頁＝從時間軸上切一段 id，再去拿訂單本體</text>
</svg>
</div>

翻第 1 頁、第 3 頁，本質都是：**在時間軸上切一段 id 出來**。  
不要對整庫做「把所有訂單門牌掃一遍」——那是另一種轉圈圈。

有了 id 列表之後，再一次把對應的訂單本體撈回來（下一節就講這兩步怎麼配）。

## ④ 排行榜：還是 ZSet，分數換成銷量

「哪個商品最好賣？」——又是排序問題。  
於是排行榜也常用 **ZSet**：成員換成**商品 id**，分數換成**銷量**（或累計金額，看你怎麼定義「熱」）。

<div class="lh-flow" style="margin:1.25rem 0;overflow-x:auto;">
<svg viewBox="0 0 680 150" role="img" aria-label="排行榜 ZSet：商品 id 依銷量分數排序" style="width:100%;max-width:680px;height:auto;font-family:var(--vp-font-family-base,sans-serif);">
  <text x="340" y="24" text-anchor="middle" font-size="12" fill="var(--vp-c-text-2)">leaderboard:sales（示意）</text>

  <rect x="60" y="40" width="140" height="70" rx="10" fill="var(--lh-gold-soft, rgba(255,204,112,0.16))" stroke="var(--lh-gold, #e0a93f)" stroke-width="2"/>
  <text x="130" y="68" text-anchor="middle" font-size="13" font-weight="700" fill="var(--vp-c-text-1)">商品 A</text>
  <text x="130" y="90" text-anchor="middle" font-size="11" fill="var(--vp-c-text-2)">score 最高</text>

  <rect x="240" y="40" width="140" height="70" rx="10" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <text x="310" y="68" text-anchor="middle" font-size="13" font-weight="700" fill="var(--vp-c-text-1)">商品 C</text>
  <text x="310" y="90" text-anchor="middle" font-size="11" fill="var(--vp-c-text-2)">score …</text>

  <rect x="420" y="40" width="140" height="70" rx="10" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <text x="490" y="68" text-anchor="middle" font-size="13" font-weight="700" fill="var(--vp-c-text-1)">商品 B</text>
  <text x="490" y="90" text-anchor="middle" font-size="11" fill="var(--vp-c-text-2)">score …</text>

  <text x="340" y="135" text-anchor="middle" font-size="12" fill="var(--vp-c-text-2)">Worker 每成功一筆，就給對應商品的分數 +1（或加金額）</text>
</svg>
</div>

同一種籃子，兩種用法：

| 用途 | 成員是誰 | 分數代表什麼 |
|------|----------|--------------|
| 全域訂單索引 | 訂單 id | 時間 |
| 熱銷排行榜 | 商品 id | 銷量／熱度 |

不需要每次用 SQL 掃表再 `ORDER BY`——分數更新時，排序關係已經在 ZSet 裡。

## 兩步讀法：先門牌，再一次拿內容

無論是用戶歷史（List）還是後台時間軸（ZSet），讀法都差不多：

1. **先從索引拿到一串訂單 id**  
2. **再依這串 id，一次把多份訂單本體撈回來**

<div class="lh-flow" style="margin:1.25rem 0;overflow-x:auto;">
<svg viewBox="0 0 700 170" role="img" aria-label="先取 id 列表再批次讀取訂單本體" style="width:100%;max-width:700px;height:auto;font-family:var(--vp-font-family-base,sans-serif);">
  <rect x="30" y="40" width="200" height="80" rx="12" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <text x="130" y="70" text-anchor="middle" font-size="13" font-weight="700" fill="var(--vp-c-text-1)">① 索引</text>
  <text x="130" y="95" text-anchor="middle" font-size="12" fill="var(--vp-c-text-2)">o103, o101, o077</text>

  <line x1="230" y1="80" x2="280" y2="80" stroke="currentColor" opacity="0.4"/>

  <rect x="280" y="40" width="160" height="80" rx="12" fill="var(--lh-accent-soft, rgba(65,88,208,0.12))" stroke="var(--lh-accent, #4158d0)" stroke-width="2"/>
  <text x="360" y="75" text-anchor="middle" font-size="13" font-weight="700" fill="var(--vp-c-text-1)">② 批次讀</text>
  <text x="360" y="98" text-anchor="middle" font-size="11" fill="var(--vp-c-text-2)">一次拿多份本體</text>

  <line x1="440" y1="80" x2="490" y2="80" stroke="currentColor" opacity="0.4"/>

  <rect x="490" y="40" width="180" height="80" rx="12" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <text x="580" y="75" text-anchor="middle" font-size="13" font-weight="700" fill="var(--vp-c-text-1)">畫面要的資料</text>
  <text x="580" y="98" text-anchor="middle" font-size="11" fill="var(--vp-c-text-2)">三張訂單內容</text>

  <text x="350" y="150" text-anchor="middle" font-size="12" fill="var(--vp-c-text-2)">索引保持輕薄；重的 JSON 只在需要顯示時才取</text>
</svg>
</div>

為什麼不把整包 JSON 塞進索引？  
因為同一份訂單會出現在「用戶歷史」和「全域時間軸」——**本體存一份就好**，索引只負責指路。批次讀（常對應一次拿多個 key）就是把路牌變成內容的那一步。

## 刪除時要掃乾淨

手動索引的代價是：**你寫了幾份，刪的時候也要記得幾份。**

只刪 `order:o101` 本體，卻忘掉：

- 全域時間軸上的 `o101`  
- 某用戶 List 裡的 `o101`  

後台翻頁就會點到**幽靈門牌**——有索引、沒內容。

<div class="lh-flow" style="margin:1.25rem 0;overflow-x:auto;">
<svg viewBox="0 0 680 150" role="img" aria-label="刪除訂單時要同時清本體與各索引" style="width:100%;max-width:680px;height:auto;font-family:var(--vp-font-family-base,sans-serif);">
  <rect x="240" y="20" width="200" height="40" rx="10" fill="var(--lh-gold-soft, rgba(255,204,112,0.16))" stroke="var(--lh-gold, #e0a93f)"/>
  <text x="340" y="45" text-anchor="middle" font-size="13" fill="var(--vp-c-text-1)">刪除訂單 o101</text>

  <path d="M340 60 L120 100" fill="none" stroke="currentColor" opacity="0.35"/>
  <path d="M340 60 L340 100" fill="none" stroke="currentColor" opacity="0.35"/>
  <path d="M340 60 L560 100" fill="none" stroke="currentColor" opacity="0.35"/>

  <rect x="40" y="100" width="160" height="36" rx="8" fill="var(--lh-accent-soft, rgba(65,88,208,0.12))" stroke="var(--lh-accent, #4158d0)"/>
  <text x="120" y="123" text-anchor="middle" font-size="12" fill="var(--vp-c-text-1)">清本體</text>

  <rect x="260" y="100" width="160" height="36" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <text x="340" y="123" text-anchor="middle" font-size="12" fill="var(--vp-c-text-1)">清時間軸</text>

  <rect x="480" y="100" width="160" height="36" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <text x="560" y="123" text-anchor="middle" font-size="12" fill="var(--vp-c-text-1)">清用戶 List</text>
</svg>
</div>

實務上會把這些刪除綁成一次事務／一次腳本，避免清到一半失敗。細節見專案後台刪除流程：[redis-seckill](https://github.com/lucashsu95/redis-seckill)。

## 本篇小结（與系列收束）

> 📝 TL;DR：Worker 用手動索引維護本體、用戶歷史、時間軸、排行榜；讀資料是「先 id 再批次拿本體」；刪除要連索引一起清。

你帶走四件事：

1. **本體一份、索引多份** — String 存內容；List／ZSet 負責指路與排序。  
2. **ZSet 兩用** — 分數＝時間做分頁；分數＝銷量做排行榜。  
3. **兩步讀** — 索引給 id，再一次取多份本體。  
4. **刪要掃乾淨** — 否則幽靈門牌。

### 三篇地圖

| 篇 | 檔案 | 記住什麼 |
|----|------|----------|
| 1 | [redis-seckill-intro](./redis-seckill-intro.md) | 轉圈圈、Redis 第一線、又快又不能算錯 |
| 2 | [redis-seckill-streams](./redis-seckill-streams.md) | 原子扣減、Stream 削峰、Worker |
| 3 | 本篇 | 手動索引、分頁、排行榜、刪除一致性 |

尚可繼續探索（專案 README 也有提）：Worker 失敗時的重試、死信、庫存回補——那是「紙條丟了怎麼辦」的下一層。  
完整實作：[lucashsu95/redis-seckill](https://github.com/lucashsu95/redis-seckill)。
