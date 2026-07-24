---
outline: { level: [2, 3] }

head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: Redis, 秒殺, 原子性, 超賣, Redis Streams, 削峰, redis-seckill
  - - meta
    - property: og:title
      content: Redis 秒殺｜不能插隊的扣庫存與削峰
  - - meta
    - property: og:description
      content: 接續 Redis 入門：用圖講清楚原子扣減、為什麼先讀再減會超賣，以及 Streams 如何把寫入壓力攤平。
  - - meta
    - property: og:type
      content: article
---

# Redis 秒殺｜不能插隊的扣庫存與削峰

上一篇我們停在這張危險圖：兩個人都讀到「還剩 1」，各自減一，最後變成超賣。

問題不在「減一」這個動作本身，而在它被拆成兩步——**看** 與 **改**——中間還能被人插隊。

怎樣才算「不能插隊」？很簡單：櫃檯規定這兩步必須黏在一起。

<div class="lh-flow" style="margin:1.25rem 0;overflow-x:auto;">
<svg viewBox="0 0 700 220" role="img" aria-label="先讀再減會超賣，對比一次做完查加扣" style="width:100%;max-width:700px;height:auto;font-family:var(--vp-font-family-base,sans-serif);">
  <text x="170" y="24" text-anchor="middle" font-size="13" font-weight="700" fill="var(--vp-c-text-1)">危險：先讀，再減</text>
  <rect x="40" y="40" width="120" height="40" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <text x="100" y="65" text-anchor="middle" font-size="12" fill="var(--vp-c-text-1)">A 讀到 1</text>
  <rect x="180" y="40" width="120" height="40" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <text x="240" y="65" text-anchor="middle" font-size="12" fill="var(--vp-c-text-1)">B 也讀到 1</text>
  <rect x="40" y="100" width="260" height="40" rx="8" fill="var(--lh-gold-soft, rgba(255,204,112,0.16))" stroke="var(--lh-gold, #e0a93f)"/>
  <text x="170" y="125" text-anchor="middle" font-size="12" fill="var(--vp-c-text-1)">中間被人插隊 → 超賣</text>

  <line x1="350" y1="40" x2="350" y2="160" stroke="var(--vp-c-divider)"/>

  <text x="520" y="24" text-anchor="middle" font-size="13" font-weight="700" fill="var(--vp-c-text-1)">目標：一次做完</text>
  <rect x="390" y="55" width="260" height="70" rx="12" fill="var(--lh-accent-soft, rgba(65,88,208,0.12))" stroke="var(--lh-accent, #4158d0)" stroke-width="2"/>
  <text x="520" y="85" text-anchor="middle" font-size="13" fill="var(--vp-c-text-1)">查庫存 ＋ 決定 ＋ 扣 1</text>
  <text x="520" y="105" text-anchor="middle" font-size="12" fill="var(--vp-c-text-2)">中間不開放插隊</text>

  <text x="350" y="200" text-anchor="middle" font-size="12" fill="var(--vp-c-text-2)">這種「黏成一次」的性質，就叫原子性（先建立直覺，細節慢慢補）</text>
</svg>
</div>

從這裡開始，我們要的不是更快的「先讀再減」，而是：**在 Redis 裡把查與扣黏成一次、別人插不進來的動作。**

## 為什麼 Redis 適合當「不能插隊」的櫃檯

Redis 處理指令時，可以想成：**櫃檯一次只完整服務一位客人。**

這位客人的「查庫存 → 決定能不能賣 → 扣 1」若被綁成一套手續，下一位要等這套做完才輪到他——中間沒有「兩個人同時讀到 1」的空隙。

<div class="lh-flow" style="margin:1.25rem 0;overflow-x:auto;">
<svg viewBox="0 0 680 170" role="img" aria-label="Redis 一次服務一位：整套手續做完才換下一位" style="width:100%;max-width:680px;height:auto;font-family:var(--vp-font-family-base,sans-serif);">
  <rect x="40" y="40" width="200" height="80" rx="12" fill="var(--lh-accent-soft, rgba(65,88,208,0.12))" stroke="var(--lh-accent, #4158d0)" stroke-width="2"/>
  <text x="140" y="75" text-anchor="middle" font-size="13" font-weight="700" fill="var(--vp-c-text-1)">客人 A 的整套手續</text>
  <text x="140" y="95" text-anchor="middle" font-size="11" fill="var(--vp-c-text-2)">查 → 決定 → 扣</text>

  <line x1="250" y1="80" x2="310" y2="80" stroke="currentColor" opacity="0.35" stroke-dasharray="4 3"/>
  <text x="280" y="68" text-anchor="middle" font-size="11" fill="var(--vp-c-text-2)">做完</text>

  <rect x="320" y="40" width="200" height="80" rx="12" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <text x="420" y="75" text-anchor="middle" font-size="13" font-weight="700" fill="var(--vp-c-text-1)">才輪到客人 B</text>
  <text x="420" y="95" text-anchor="middle" font-size="11" fill="var(--vp-c-text-2)">同一套手續</text>

  <rect x="540" y="55" width="100" height="50" rx="10" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)" opacity="0.7"/>
  <text x="590" y="85" text-anchor="middle" font-size="11" fill="var(--vp-c-text-2)">排隊中…</text>

  <text x="340" y="150" text-anchor="middle" font-size="12" fill="var(--vp-c-text-2)">重點不是「世界只有一個執行緒」的考試定義，而是：黏在一起的手續，中間插不進別人的讀寫</text>
</svg>
</div>

實務上，這套手續可以是 Redis 內建的原子指令，或一小段在伺服器端一次跑完的腳本——**你只要記住目的：查與扣不要拆開給網路來來回回。**  
細節與程式碼請看專案：[redis-seckill](https://github.com/lucashsu95/redis-seckill) 的秒殺熱路徑；本系列主角仍是 Redis 的角色分工，不是腳本語法課。

## 熱路徑最小劇本

櫃檯那套手續，縮到最小大概長這樣：

<div class="lh-flow" style="margin:1.25rem 0;overflow-x:auto;">
<svg viewBox="0 0 700 260" role="img" aria-label="熱路徑：查庫存後分支為扣庫存成功或售完" style="width:100%;max-width:700px;height:auto;font-family:var(--vp-font-family-base,sans-serif);">
  <rect x="270" y="16" width="160" height="44" rx="10" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <text x="350" y="43" text-anchor="middle" font-size="13" fill="var(--vp-c-text-1)">查：還有貨嗎？</text>

  <line x1="350" y1="60" x2="350" y2="84" stroke="currentColor" opacity="0.35"/>

  <path d="M350 84 L200 120" fill="none" stroke="currentColor" opacity="0.35"/>
  <path d="M350 84 L500 120" fill="none" stroke="currentColor" opacity="0.35"/>
  <text x="240" y="100" text-anchor="middle" font-size="11" fill="var(--vp-c-text-2)">沒有</text>
  <text x="460" y="100" text-anchor="middle" font-size="11" fill="var(--vp-c-text-2)">有</text>

  <rect x="110" y="120" width="180" height="50" rx="10" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <text x="200" y="150" text-anchor="middle" font-size="13" fill="var(--vp-c-text-1)">回傳：已售完</text>

  <rect x="410" y="120" width="180" height="50" rx="10" fill="var(--lh-accent-soft, rgba(65,88,208,0.12))" stroke="var(--lh-accent, #4158d0)" stroke-width="2"/>
  <text x="500" y="150" text-anchor="middle" font-size="13" fill="var(--vp-c-text-1)">扣 1，回傳成功</text>

  <line x1="500" y1="170" x2="500" y2="198" stroke="currentColor" opacity="0.35" stroke-dasharray="4 3"/>

  <rect x="390" y="198" width="220" height="44" rx="10" fill="var(--lh-gold-soft, rgba(255,204,112,0.16))" stroke="var(--lh-gold, #e0a93f)"/>
  <text x="500" y="225" text-anchor="middle" font-size="12" fill="var(--vp-c-text-1)">（可選）丟一張「稍後再記」的紙條</text>
</svg>
</div>

成功分支只做兩件必要的事：**改庫存**，以及（常常）**留下一張稍後處理的紙條**。  
紙條上可以寫：誰、買哪個、訂單編號、時間——夠 Worker 稍後把完整訂單與索引補齊就好。

熱路徑越短，轉圈圈越不容易回來。

## 為什麼不在熱路徑寫完整訂單？

若搶購成功的那一刻，還要順便做這些事：

- 把整張訂單存成一份完整紀錄  
- 寫進「某用戶的歷史訂單」  
- 更新熱銷排行榜  
- 掛進後台分頁用的總索引  

櫃檯手續會瞬間變長。人潮一來，你又把「單車道」從庫存格，搬到「寫一堆關聯資料」上——轉圈圈可能換個理由回來。

<div class="lh-flow" style="margin:1.25rem 0;overflow-x:auto;">
<svg viewBox="0 0 700 180" role="img" aria-label="熱路徑只做短手續，完整寫入留給稍後" style="width:100%;max-width:700px;height:auto;font-family:var(--vp-font-family-base,sans-serif);">
  <rect x="30" y="30" width="280" height="110" rx="12" fill="var(--lh-accent-soft, rgba(65,88,208,0.12))" stroke="var(--lh-accent, #4158d0)" stroke-width="2"/>
  <text x="170" y="60" text-anchor="middle" font-size="13" font-weight="700" fill="var(--vp-c-text-1)">熱路徑（現在）</text>
  <text x="170" y="88" text-anchor="middle" font-size="12" fill="var(--vp-c-text-1)">扣庫存</text>
  <text x="170" y="110" text-anchor="middle" font-size="12" fill="var(--vp-c-text-1)">丟紙條</text>
  <text x="170" y="130" text-anchor="middle" font-size="11" fill="var(--vp-c-text-2)">短、快、回得了</text>

  <rect x="390" y="30" width="280" height="110" rx="12" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <text x="530" y="60" text-anchor="middle" font-size="13" font-weight="700" fill="var(--vp-c-text-1)">稍後再做</text>
  <text x="530" y="88" text-anchor="middle" font-size="12" fill="var(--vp-c-text-1)">訂單本體／用戶歷史</text>
  <text x="530" y="110" text-anchor="middle" font-size="12" fill="var(--vp-c-text-1)">排行榜／後台索引</text>
  <text x="530" y="130" text-anchor="middle" font-size="11" fill="var(--vp-c-text-2)">可以慢一點，但要齊</text>

  <text x="350" y="165" text-anchor="middle" font-size="12" fill="var(--vp-c-text-2)">兩種壓力：改同一個數字 vs 寫很多份關聯資料</text>
</svg>
</div>

所以設計上常拆成兩種壓力：

1. **熱點數字** — 必須立刻、正確地改完（上一節的原子手續）。  
2. **關聯寫入** — 重要，但不該全部堵在用戶還在轉圈圈的那幾百毫秒裡。

紙條，就是把第 2 種壓力「延後」的橋。

## 紙條落地：Redis Streams

在 Redis 裡，這張「稍後再記」的紙條，常見落點就是 **Stream**（串流／訊息流）。

心智模型：一條**有編號的傳送帶**。

- 熱路徑成功扣庫存後，把一張小卡片（誰、哪個商品、訂單 id、時間…）**放上傳送帶**，然後立刻回覆使用者。  
- 旁邊的 **Worker（工人）** 依序取卡片，慢慢把完整訂單、索引、排行榜補齊。

<div class="lh-flow" style="margin:1.25rem 0;overflow-x:auto;">
<svg viewBox="0 0 720 200" role="img" aria-label="熱路徑把訊息放入 Stream，Worker 稍後取出處理" style="width:100%;max-width:720px;height:auto;font-family:var(--vp-font-family-base,sans-serif);">
  <rect x="20" y="50" width="140" height="70" rx="12" fill="var(--lh-accent-soft, rgba(65,88,208,0.12))" stroke="var(--lh-accent, #4158d0)" stroke-width="2"/>
  <text x="90" y="80" text-anchor="middle" font-size="13" font-weight="700" fill="var(--vp-c-text-1)">熱路徑</text>
  <text x="90" y="100" text-anchor="middle" font-size="11" fill="var(--vp-c-text-2)">扣庫存後投信</text>

  <line x1="160" y1="85" x2="210" y2="85" stroke="currentColor" opacity="0.4"/>

  <rect x="210" y="35" width="300" height="100" rx="14" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <text x="360" y="58" text-anchor="middle" font-size="13" font-weight="700" fill="var(--vp-c-text-1)">Redis Stream（傳送帶）</text>
  <rect x="230" y="72" width="50" height="36" rx="6" fill="var(--lh-gold-soft, rgba(255,204,112,0.16))" stroke="var(--lh-gold, #e0a93f)"/>
  <rect x="292" y="72" width="50" height="36" rx="6" fill="var(--lh-gold-soft, rgba(255,204,112,0.16))" stroke="var(--lh-gold, #e0a93f)"/>
  <rect x="354" y="72" width="50" height="36" rx="6" fill="var(--lh-gold-soft, rgba(255,204,112,0.16))" stroke="var(--lh-gold, #e0a93f)"/>
  <rect x="416" y="72" width="50" height="36" rx="6" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)" opacity="0.5"/>
  <text x="360" y="125" text-anchor="middle" font-size="10" fill="var(--vp-c-text-2)">每張卡片有編號，可依序處理</text>

  <line x1="510" y1="85" x2="560" y2="85" stroke="currentColor" opacity="0.4"/>

  <rect x="560" y="50" width="140" height="70" rx="12" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <text x="630" y="80" text-anchor="middle" font-size="13" font-weight="700" fill="var(--vp-c-text-1)">Worker</text>
  <text x="630" y="100" text-anchor="middle" font-size="11" fill="var(--vp-c-text-2)">取信並補寫資料</text>

  <text x="360" y="175" text-anchor="middle" font-size="12" fill="var(--vp-c-text-2)">使用者不用等傳送帶跑完；尖峰卡片可以在後面幾秒被消化</text>
</svg>
</div>

這就是常說的**削峰**：瞬間湧進的寫入，變成傳送帶上的卡片，讓工人用自己的節奏處理，而不是全部堵在用戶還盯著轉圈圈的那一刻。

指令名稱（例如往 Stream 加一筆、工人用消費組讀取）記不記得沒關係；先記住 **Redis 自己就能當這條傳送帶**。實作見 [redis-seckill](https://github.com/lucashsu95/redis-seckill) 的 Worker。

## 整條路再看一次

把本篇拼起來，秒殺當下的資料流大概是這樣：

<div class="lh-flow" style="margin:1.25rem 0;overflow-x:auto;">
<svg viewBox="0 0 740 210" role="img" aria-label="秒殺端到端：原子扣減、Stream、Worker 補寫" style="width:100%;max-width:740px;height:auto;font-family:var(--vp-font-family-base,sans-serif);">
  <rect x="20" y="60" width="120" height="60" rx="10" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <text x="80" y="95" text-anchor="middle" font-size="12" fill="var(--vp-c-text-1)">使用者搶購</text>

  <line x1="140" y1="90" x2="175" y2="90" stroke="currentColor" opacity="0.4"/>

  <rect x="175" y="40" width="170" height="100" rx="12" fill="var(--lh-accent-soft, rgba(65,88,208,0.12))" stroke="var(--lh-accent, #4158d0)" stroke-width="2"/>
  <text x="260" y="70" text-anchor="middle" font-size="12" font-weight="700" fill="var(--vp-c-text-1)">① 熱路徑</text>
  <text x="260" y="92" text-anchor="middle" font-size="11" fill="var(--vp-c-text-1)">原子：查＋扣</text>
  <text x="260" y="112" text-anchor="middle" font-size="11" fill="var(--vp-c-text-2)">立刻回成功／售完</text>

  <line x1="345" y1="90" x2="380" y2="90" stroke="currentColor" opacity="0.4"/>

  <rect x="380" y="50" width="150" height="80" rx="12" fill="var(--lh-gold-soft, rgba(255,204,112,0.16))" stroke="var(--lh-gold, #e0a93f)" stroke-width="2"/>
  <text x="455" y="85" text-anchor="middle" font-size="12" font-weight="700" fill="var(--vp-c-text-1)">② Stream</text>
  <text x="455" y="105" text-anchor="middle" font-size="11" fill="var(--vp-c-text-2)">紙條排隊</text>

  <line x1="530" y1="90" x2="565" y2="90" stroke="currentColor" opacity="0.4"/>

  <rect x="565" y="40" width="155" height="100" rx="12" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <text x="642" y="70" text-anchor="middle" font-size="12" font-weight="700" fill="var(--vp-c-text-1)">③ Worker</text>
  <text x="642" y="92" text-anchor="middle" font-size="11" fill="var(--vp-c-text-1)">補訂單／索引</text>
  <text x="642" y="112" text-anchor="middle" font-size="11" fill="var(--vp-c-text-2)">排行榜等</text>

  <text x="370" y="175" text-anchor="middle" font-size="12" fill="var(--vp-c-text-2)">① 要快且不能插隊　② 扛尖峰　③ 把帳記齊——都還在 Redis 生態裡完成</text>
</svg>
</div>

使用者只感受到 ① 的快慢；②③ 是系統在背後把尖峰寫入攤平、把資料補齊。

## 本篇小结

> 📝 TL;DR：用「黏成一次」的手續避免超賣；熱路徑只扣庫存並丟 Stream 紙條；Worker 稍後補寫訂單與索引，這叫削峰。

你帶走三件事：

1. **原子性（直覺）** — 查＋扣不要拆開被人插隊。  
2. **熱路徑要短** — 完整訂單與一堆索引，別堵在轉圈圈那幾百毫秒。  
3. **Stream + Worker** — Redis 當傳送帶，把關聯寫入延後消化。

下一篇會講：Worker 補寫時，那些「索引」在 Redis 裡長什麼樣子——沒有 SQL 的 `ORDER BY`／`JOIN`，怎麼用 ZSet、List 做出後台分頁與排行榜。  
專案：[lucashsu95/redis-seckill](https://github.com/lucashsu95/redis-seckill)。
