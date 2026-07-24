---
outline: { level: [2, 3] }

head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: Redis, 秒殺, 搶票, 高併發, 記憶體資料庫, redis-seckill
  - - meta
    - property: og:title
      content: Redis 秒殺入門｜從搶票轉圈圈開始
  - - meta
    - property: og:description
      content: 用演唱會搶票的轉圈圈，帶你認識 Redis：它為什麼適合當秒殺的第一線記帳本。
  - - meta
    - property: og:type
      content: article
---

# Redis 秒殺入門｜從搶票轉圈圈開始

你一定經歷過這個瞬間：倒數三秒、頁面狂閃、按下去之後畫面轉圈圈——然後彈出「已售完」。

你心裡罵的是黃牛，但其實有一半機率，是資料庫在那零點幾秒裡，正忙著排隊「鎖」一筆庫存，鎖到你前面那個人先搶走了。

今天要介紹的 Redis，就是打算讓那個轉圈圈，變成不會轉的東西。

## 「已售完」其實有兩種

畫面上寫的都是同一句話，背後卻可能是完全不同的故事。

**第一種：票真的沒了。**  
庫存數字已經歸零，你晚了一步，系統老實告訴你沒貨。這時候罵黃牛（或罵手速）說得過去。

**第二種：系統還在排隊算帳。**  
票可能還在，但資料庫正鎖著那一列「剩餘數量」，你的請求卡在人潮後面。等輪到你，前面的人已經扣完——於是你看到的仍是「已售完」。你怪的是黃牛，受傷的其實是鎖與排隊。

兩種結果長一樣，原因不一樣。  
Redis 上場要對付的，主要是第二種：讓「查庫存、改庫存」這一步快到幾乎不用排隊，也盡量別在混亂中算錯數字。

## 把「排隊算帳」攤開來看

你按下「搶購」之後，請求大概會走這一條路：

<div class="lh-flow" style="margin:1.25rem 0;overflow-x:auto;">
<svg viewBox="0 0 720 160" role="img" aria-label="搶購請求流程：按下去、進伺服器、鎖庫存、改數字、回傳結果" style="width:100%;max-width:720px;height:auto;font-family:var(--vp-font-family-base,sans-serif);">
  <defs>
    <marker id="lh-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor" opacity="0.45"/>
    </marker>
  </defs>
  <!-- boxes -->
  <rect x="8" y="48" width="110" height="56" rx="10" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <text x="63" y="72" text-anchor="middle" font-size="13" fill="var(--vp-c-text-1)">① 按下去</text>
  <text x="63" y="90" text-anchor="middle" font-size="11" fill="var(--vp-c-text-2)">瀏覽器</text>

  <line x1="118" y1="76" x2="148" y2="76" stroke="currentColor" opacity="0.35" marker-end="url(#lh-arrow)"/>

  <rect x="150" y="48" width="110" height="56" rx="10" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <text x="205" y="72" text-anchor="middle" font-size="13" fill="var(--vp-c-text-1)">② 進伺服器</text>
  <text x="205" y="90" text-anchor="middle" font-size="11" fill="var(--vp-c-text-2)">接收請求</text>

  <line x1="260" y1="76" x2="290" y2="76" stroke="currentColor" opacity="0.35" marker-end="url(#lh-arrow)"/>

  <!-- bottleneck -->
  <rect x="292" y="40" width="130" height="72" rx="10" fill="var(--lh-gold-soft, rgba(255,204,112,0.16))" stroke="var(--lh-gold, #e0a93f)" stroke-width="2"/>
  <text x="357" y="68" text-anchor="middle" font-size="13" font-weight="700" fill="var(--vp-c-text-1)">③ 鎖庫存</text>
  <text x="357" y="88" text-anchor="middle" font-size="11" fill="var(--vp-c-text-2)">卡關高發區</text>

  <line x1="422" y1="76" x2="452" y2="76" stroke="currentColor" opacity="0.35" marker-end="url(#lh-arrow)"/>

  <rect x="454" y="40" width="130" height="72" rx="10" fill="var(--lh-accent-soft, rgba(65,88,208,0.12))" stroke="var(--lh-accent, #4158d0)" stroke-width="2"/>
  <text x="519" y="68" text-anchor="middle" font-size="13" font-weight="700" fill="var(--vp-c-text-1)">④ 改數字</text>
  <text x="519" y="88" text-anchor="middle" font-size="11" fill="var(--vp-c-text-2)">剩餘 − 1</text>

  <line x1="584" y1="76" x2="614" y2="76" stroke="currentColor" opacity="0.35" marker-end="url(#lh-arrow)"/>

  <rect x="616" y="48" width="96" height="56" rx="10" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <text x="664" y="72" text-anchor="middle" font-size="13" fill="var(--vp-c-text-1)">⑤ 回傳</text>
  <text x="664" y="90" text-anchor="middle" font-size="11" fill="var(--vp-c-text-2)">成功／售完</text>

  <text x="357" y="140" text-anchor="middle" font-size="12" fill="var(--vp-c-text-2)">轉圈圈多半耗在 ③→④：人多時這裡變成單車道收費站</text>
</svg>
</div>

①② 通常很快；真正塞車的是 **③ 鎖庫存 → ④ 改數字**。  
成千上萬人同時要改同一格「還剩幾張」，資料庫只好排成一列——你的轉圈圈，常常就是卡在這段單車道收費站。

## 為什麼傳統帳本特別容易在這裡塞車

傳統關聯式資料庫很擅長「把帳記清楚、關連查得漂亮」。但秒殺要的不是漂亮報表，是**同一毫秒內，成千上萬人改同一個數字**。

可以想成收費站只開一條車道：

<div class="lh-flow" style="margin:1.25rem 0;overflow-x:auto;">
<svg viewBox="0 0 640 150" role="img" aria-label="單車道收費站：多台車排隊通過同一閘口" style="width:100%;max-width:640px;height:auto;font-family:var(--vp-font-family-base,sans-serif);">
  <!-- cars queue -->
  <rect x="20" y="58" width="44" height="28" rx="6" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <rect x="76" y="58" width="44" height="28" rx="6" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <rect x="132" y="58" width="44" height="28" rx="6" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <text x="98" y="40" text-anchor="middle" font-size="12" fill="var(--vp-c-text-2)">搶購請求…</text>

  <line x1="186" y1="72" x2="250" y2="72" stroke="currentColor" opacity="0.35" stroke-dasharray="4 3"/>

  <!-- toll -->
  <rect x="250" y="40" width="140" height="64" rx="10" fill="var(--lh-gold-soft, rgba(255,204,112,0.16))" stroke="var(--lh-gold, #e0a93f)" stroke-width="2"/>
  <text x="320" y="68" text-anchor="middle" font-size="13" font-weight="700" fill="var(--vp-c-text-1)">庫存這一列</text>
  <text x="320" y="88" text-anchor="middle" font-size="11" fill="var(--vp-c-text-2)">一次只讓一台過</text>

  <line x1="400" y1="72" x2="464" y2="72" stroke="currentColor" opacity="0.35" stroke-dasharray="4 3"/>

  <rect x="470" y="58" width="44" height="28" rx="6" fill="var(--lh-accent-soft, rgba(65,88,208,0.12))" stroke="var(--lh-accent, #4158d0)"/>
  <rect x="526" y="58" width="44" height="28" rx="6" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)" opacity="0.5"/>
  <text x="520" y="40" text-anchor="middle" font-size="12" fill="var(--vp-c-text-2)">一個一個離開</text>

  <text x="320" y="130" text-anchor="middle" font-size="12" fill="var(--vp-c-text-2)">人越多，平均等待越長 → 轉圈圈</text>
</svg>
</div>

塞車通常疊了兩件事：

1. **同一格熱點** — 全部請求都要動「商品 A 還剩幾件」這一格；系統為了不讓兩個人同時改到亂掉，常會讓請求排隊（鎖）。
2. **帳本在較慢的地方** — 很多傳統設計把權威數字放在磁碟導向的資料庫；人潮一湧，鎖排隊再加上讀寫開銷，③→④ 就變成整條路最窄的口。

所以問題常常不是「資料庫壞了」，而是：**秒殺這種極端熱點，跟「大家共享一本謹慎的倉庫帳本」本來就不合拍。**

## Redis 是什麼？

一句話：**Redis 是把資料放在記憶體裡的 key-value 引擎。**

- **記憶體**：讀寫路徑短，適合應付瞬間湧進來的請求。
- **key-value**：你給一個名字（key），它記一筆內容（value）。例如 key 是 `product:A:stock`，value 是 `50`。

它常被拿來當快取（把熱門資料暫放近一點），但在秒殺裡，我們更在意另一種用法：**讓它當第一線的庫存記帳本**——先在很快的地方改數字，別讓人潮全擠進那本謹慎的倉庫帳。

<div class="lh-flow" style="margin:1.25rem 0;overflow-x:auto;">
<svg viewBox="0 0 680 200" role="img" aria-label="倉庫帳本與櫃檯便利貼的對比：傳統資料庫 vs Redis" style="width:100%;max-width:680px;height:auto;font-family:var(--vp-font-family-base,sans-serif);">
  <!-- left: warehouse -->
  <rect x="20" y="24" width="280" height="150" rx="12" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <text x="160" y="52" text-anchor="middle" font-size="14" font-weight="700" fill="var(--vp-c-text-1)">倉庫帳本</text>
  <text x="160" y="74" text-anchor="middle" font-size="12" fill="var(--vp-c-text-2)">傳統資料庫（常見想像）</text>
  <text x="160" y="108" text-anchor="middle" font-size="12" fill="var(--vp-c-text-1)">資料在較遠、較謹慎的地方</text>
  <text x="160" y="128" text-anchor="middle" font-size="12" fill="var(--vp-c-text-1)">擅長關聯、報表、長期保存</text>
  <text x="160" y="148" text-anchor="middle" font-size="12" fill="var(--vp-c-text-2)">熱點湧入時容易變單車道</text>

  <!-- right: sticky -->
  <rect x="380" y="24" width="280" height="150" rx="12" fill="var(--lh-accent-soft, rgba(65,88,208,0.12))" stroke="var(--lh-accent, #4158d0)" stroke-width="2"/>
  <text x="520" y="52" text-anchor="middle" font-size="14" font-weight="700" fill="var(--vp-c-text-1)">櫃檯便利貼</text>
  <text x="520" y="74" text-anchor="middle" font-size="12" fill="var(--vp-c-text-2)">Redis（心智模型）</text>
  <text x="520" y="108" text-anchor="middle" font-size="12" fill="var(--vp-c-text-1)">資料在記憶體，即寫即讀</text>
  <text x="520" y="128" text-anchor="middle" font-size="12" fill="var(--vp-c-text-1)">用 key 找到那一格數字</text>
  <text x="520" y="148" text-anchor="middle" font-size="12" fill="var(--vp-c-text-2)">適合扛秒殺第一線</text>

  <text x="340" y="190" text-anchor="middle" font-size="12" fill="var(--vp-c-text-2)">不是誰取代誰，是熱點時誰站第一線</text>
</svg>
</div>

記住這張對比就夠了：秒殺當下，我們要的是櫃檯那疊便利貼，不是跑進倉庫翻厚帳本。

## 又快，還有一件事：不能算錯

便利貼解決的是「轉圈圈」——讓 ③→④ 變快。  
但秒殺還有第二條底線：**剩 1 件，不能賣出 2 件。**

想像兩個人幾乎同時走到櫃檯：

<div class="lh-flow" style="margin:1.25rem 0;overflow-x:auto;">
<svg viewBox="0 0 680 210" role="img" aria-label="兩人同時讀到庫存 1，各自減一後變成超賣" style="width:100%;max-width:680px;height:auto;font-family:var(--vp-font-family-base,sans-serif);">
  <text x="340" y="28" text-anchor="middle" font-size="13" font-weight="700" fill="var(--vp-c-text-1)">危險寫法心智圖：先讀、再減</text>

  <rect x="40" y="50" width="160" height="50" rx="10" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <text x="120" y="80" text-anchor="middle" font-size="13" fill="var(--vp-c-text-1)">A 讀到：還剩 1</text>

  <rect x="480" y="50" width="160" height="50" rx="10" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <text x="560" y="80" text-anchor="middle" font-size="13" fill="var(--vp-c-text-1)">B 也讀到：還剩 1</text>

  <rect x="260" y="55" width="160" height="40" rx="8" fill="var(--lh-accent-soft, rgba(65,88,208,0.12))" stroke="var(--lh-accent, #4158d0)"/>
  <text x="340" y="80" text-anchor="middle" font-size="12" fill="var(--vp-c-text-1)">便利貼上寫著 1</text>

  <path d="M120 100 L120 130 L300 130 L300 150" fill="none" stroke="currentColor" opacity="0.35"/>
  <path d="M560 100 L560 130 L380 130 L380 150" fill="none" stroke="currentColor" opacity="0.35"/>

  <rect x="200" y="150" width="280" height="44" rx="10" fill="var(--lh-gold-soft, rgba(255,204,112,0.16))" stroke="var(--lh-gold, #e0a93f)" stroke-width="2"/>
  <text x="340" y="177" text-anchor="middle" font-size="13" font-weight="700" fill="var(--vp-c-text-1)">兩人都以為自己搶到 → 超賣</text>
</svg>
</div>

快，只代表排隊變短；**正確**，代表改數字這一步不能拆成「我看過了」和「我改了」中間還能被人插隊。

## Redis 站在熱路徑的哪裡？

回到稍早那條五步路——這次把第一線標清楚：

<div class="lh-flow" style="margin:1.25rem 0;overflow-x:auto;">
<svg viewBox="0 0 720 175" role="img" aria-label="熱路徑五步，其中鎖庫存與改數字在 Redis 上完成" style="width:100%;max-width:720px;height:auto;font-family:var(--vp-font-family-base,sans-serif);">
  <defs>
    <marker id="lh-arrow2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor" opacity="0.45"/>
    </marker>
  </defs>

  <rect x="8" y="48" width="100" height="56" rx="10" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <text x="58" y="72" text-anchor="middle" font-size="12" fill="var(--vp-c-text-1)">① 按下去</text>
  <text x="58" y="90" text-anchor="middle" font-size="10" fill="var(--vp-c-text-2)">瀏覽器</text>

  <line x1="108" y1="76" x2="132" y2="76" stroke="currentColor" opacity="0.35" marker-end="url(#lh-arrow2)"/>

  <rect x="134" y="48" width="100" height="56" rx="10" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <text x="184" y="72" text-anchor="middle" font-size="12" fill="var(--vp-c-text-1)">② 進伺服器</text>
  <text x="184" y="90" text-anchor="middle" font-size="10" fill="var(--vp-c-text-2)">API</text>

  <line x1="234" y1="76" x2="258" y2="76" stroke="currentColor" opacity="0.35" marker-end="url(#lh-arrow2)"/>

  <!-- Redis zone -->
  <rect x="258" y="28" width="292" height="96" rx="14" fill="var(--lh-accent-soft, rgba(65,88,208,0.12))" stroke="var(--lh-accent, #4158d0)" stroke-width="2" stroke-dasharray="5 4"/>
  <text x="404" y="48" text-anchor="middle" font-size="11" font-weight="700" fill="var(--lh-accent, #4158d0)">Redis（第一線）</text>

  <rect x="274" y="58" width="120" height="50" rx="10" fill="var(--vp-c-bg)" stroke="var(--lh-gold, #e0a93f)" stroke-width="2"/>
  <text x="334" y="80" text-anchor="middle" font-size="12" font-weight="700" fill="var(--vp-c-text-1)">③ 查／鎖庫存</text>
  <text x="334" y="96" text-anchor="middle" font-size="10" fill="var(--vp-c-text-2)">便利貼上那一格</text>

  <line x1="394" y1="83" x2="418" y2="83" stroke="currentColor" opacity="0.35" marker-end="url(#lh-arrow2)"/>

  <rect x="420" y="58" width="114" height="50" rx="10" fill="var(--vp-c-bg)" stroke="var(--lh-accent, #4158d0)" stroke-width="2"/>
  <text x="477" y="80" text-anchor="middle" font-size="12" font-weight="700" fill="var(--vp-c-text-1)">④ 改數字</text>
  <text x="477" y="96" text-anchor="middle" font-size="10" fill="var(--vp-c-text-2)">剩餘 − 1</text>

  <line x1="550" y1="76" x2="574" y2="76" stroke="currentColor" opacity="0.35" marker-end="url(#lh-arrow2)"/>

  <rect x="576" y="48" width="128" height="56" rx="10" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/>
  <text x="640" y="72" text-anchor="middle" font-size="12" fill="var(--vp-c-text-1)">⑤ 回傳</text>
  <text x="640" y="90" text-anchor="middle" font-size="10" fill="var(--vp-c-text-2)">成功／售完</text>

  <text x="360" y="155" text-anchor="middle" font-size="12" fill="var(--vp-c-text-2)">倉庫帳本可以稍後再記完整訂單；搶票當下，先讓 Redis 擋住人潮</text>
</svg>
</div>

瀏覽器與 API 負責「說話」；**改那格庫存數字的工作，交給 Redis。**  
完整訂單、排行榜、後台列表——可以再往後做。第一篇只要建立這個畫面就夠。

## 本篇小结

> 📝 TL;DR：搶票轉圈圈，常常是系統在排隊改同一格庫存。Redis 是記憶體裡的 key-value，適合當秒殺第一線記帳本；但快之外還要防超賣——「先讀再減」會出事。

你帶走三件事：

1. **兩種「已售完」** — 真的沒了，或還在排隊算帳。  
2. **Redis 心智模型** — 櫃檯便利貼（記憶體 key-value），不是要取代整間倉庫。  
3. **兩個目標** — 又快，又不能算錯；正確性的做法下一篇再拆。

下一篇會接著講：怎樣讓「查＋扣」變成不能插隊的一次動作，以及為什麼還需要一條「削峰」的水路，把瞬間寫入壓力攤平。  
實作可對照：[lucashsu95/redis-seckill](https://github.com/lucashsu95/redis-seckill)。
