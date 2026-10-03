---
theme: seriph
title: 後端 101 — 網路是怎麼運作的，以及框架到底解決了什麼
layout: cover
ui:
  nav: false
transition: slide-left
mdc: true
comark: true
download: true
lineNumbers: true
routerMode: hash
colorSchema: dark
fonts:
  sans: "Outfit"
  mono: "JetBrains Mono"
css: unocss
stylesheet: ./style.css
drawings:
  persist: true
  enabled: true
  presenterOnly: false
selectable: true
record: user
seoMeta:
  ogTitle: 後端 101 — 網路是怎麼運作的，以及框架到底解決了什麼
  description: 從瀏覽器到伺服器、TCP/IP 四層模型、HTTP 狀態碼、Port 號，到「什麼是框架」與 Spring Boot 的配置魔法
exportFilename: backend-101-network-framework
---
<div class="tc-ambient"></div>
<div class="tc-stage">
  <div class="tc-stage__main tc-in">
    <div class="tc-mark" style="--i:0">
      <img src="./birc.webp" alt="BIRC Logo" />
      <span class="tc-mark__t">Business Intelligence Center</span>
    </div>
    <h1 class="tc-display tc-display--sm" style="--i:1;margin-top:30px">BIRC <em>商智中心</em></h1>
    <div class="tc-stage__rule" style="--i:2"></div>
    <p class="tc-lead" style="--i:3;margin-top:20px">推動校園數位人才培育</p>
  </div>
  <div class="tc-stage__aside" style="align-self:center;width:100%">
    <span class="tc-tag tc-tag--solid" style="--i:4;margin-bottom:12px">2026 後端群體驗營</span>
    <div class="tc-rows tc-in" style="width:100%">
      <div class="tc-rowline" style="grid-template-columns:52px 1fr;--i:5"><span class="tc-rowline__n">時長</span><span class="tc-rowline__v tc-sm">50 分鐘</span></div>
      <div class="tc-rowline" style="grid-template-columns:52px 1fr;--i:6"><span class="tc-rowline__n">範圍</span><span class="tc-rowline__v tc-sm">網路 · 狀態碼 · Port · 框架</span></div>
      <div class="tc-rowline" style="grid-template-columns:52px 1fr;--i:7"><span class="tc-rowline__n">講者</span><span class="tc-rowline__v tc-sm">LucasHsu.dev</span></div>
    </div>
  </div>
</div>
<div class="tc-grain"></div>

---
layout: cover
transition: slide-left
---

<div class="tc-ambient"></div>
<div class="tc-stage">
  <div class="tc-stage__main tc-in">
    <div class="tc-kicker tc-kicker--cmd" style="--i:0">$ curl http://localhost:8080/api/products<span class="tc-caret"></span></div>
    <h1 class="tc-display" style="--i:1;margin-top:14px"><em>Backend</em> 101</h1>
    <div class="tc-stage__rule" style="--i:2"></div>
    <p class="tc-lead tc-mono" style="--i:3;margin-top:20px">// 網路怎麼跑 · 狀態碼 · Port · 框架的魔法</p>
  </div>
  <div class="tc-stage__aside" style="align-self:center;width:100%">
    <span class="tc-panel__label" style="--i:4">本課三條主線</span>
    <div class="tc-rows">
      <div class="tc-rowline tc-rowline--auto" style="--i:5"><b>看得見的請求</b><span class="tc-rowline__n" style="justify-self:end">TCP/IP · HTTP · Port</span></div>
      <div class="tc-rowline tc-rowline--auto" style="--i:6"><b>讀得懂的回應</b><span class="tc-rowline__n" style="justify-self:end">200 / 400 / 409 / 500</span></div>
      <div class="tc-rowline tc-rowline--auto" style="--i:7"><b>框架的真相</b><span class="tc-rowline__n" style="justify-self:end">它替你省了什麼</span></div>
    </div>
  </div>
</div>
<div class="tc-grain"></div>

<!--
全課約 50 分鐘。
節奏：1-5 點是「看懂」，6-8 點是「想懂」，9-10 點是「動手」。
第 7 點「什麼是框架」是本課重點，會花的時間最多。
-->

---
layout: default
---

<div class="tc-head">
  <div class="tc-kicker">AGENDA</div>
  <h1 class="tc-h1">今天會講什麼</h1>
</div>

<div class="tc-rows tc-rows--dense">
  <div class="tc-rowline" style="grid-template-columns:34px 1fr auto"><span class="tc-rowline__k">01</span><span class="tc-rowline__v"><b>系列規劃與介紹</b> — 我們在哪裡、要往哪裡走</span><span class="tc-rowline__n">2 min</span></div>
  <div class="tc-rowline" style="grid-template-columns:34px 1fr auto"><span class="tc-rowline__k">02</span><span class="tc-rowline__v"><b>常見網站應用</b> — 你每天都在用的東西</span><span class="tc-rowline__n">2 min</span></div>
  <div class="tc-rowline" style="grid-template-columns:34px 1fr auto"><span class="tc-rowline__k">03</span><span class="tc-rowline__v"><b>五大面向拆解網站應用</b> — 一個網站到底由什麼組成</span><span class="tc-rowline__n">2 min</span></div>
  <div class="tc-rowline" style="grid-template-columns:34px 1fr auto"><span class="tc-rowline__k">04</span><span class="tc-rowline__v"><b>網路是如何運作的</b> — TCP/IP 四層 · 應用層協議 · HTTP</span><span class="tc-rowline__n">3 min</span></div>
  <div class="tc-rowline" style="grid-template-columns:34px 1fr auto"><span class="tc-rowline__k">05</span><span class="tc-rowline__v"><b>HTTP 狀態碼</b> — 200 · 201 · 400 · 401 · 403 · 404 · 500</span><span class="tc-rowline__n">5 min</span></div>
  <div class="tc-rowline tc-rowline--hi" style="grid-template-columns:34px 1fr auto"><span class="tc-rowline__k tc-rowline__k--warn">06</span><span class="tc-rowline__v"><b>Port 號</b> — 3306 · 8080 · 為什麼會撞號</span><span class="tc-rowline__n">4 min</span></div>
  <div class="tc-rowline tc-rowline--hi" style="grid-template-columns:34px 1fr auto"><span class="tc-rowline__k tc-rowline__k--warn">07</span><span class="tc-rowline__v"><b>什麼是框架</b> <span class="tc-tag tc-tag--warn">本課重點</span> — 定義 → 為何需要 → 對比</span><span class="tc-rowline__n tc-warn">6 min</span></div>
  <div class="tc-rowline" style="grid-template-columns:34px 1fr auto"><span class="tc-rowline__k">08</span><span class="tc-rowline__v"><b>前後端如何溝通</b> — 一張循序圖看懂整個對話</span><span class="tc-rowline__n">5 min</span></div>
  <div class="tc-rowline" style="grid-template-columns:34px 1fr auto"><span class="tc-rowline__k">10</span><span class="tc-rowline__v"><b>框架的配置魔法</b> — 同樣的 API，Spring Boot 版</span><span class="tc-rowline__n">6 min</span></div>
</div>

<div class="tc-note tc-note--warn" style="margin-top:16px">
  <div class="tc-note__t">前 5 點是「看懂」，6-8 點是「想懂」，9-10 點是「動手」</div>
  <div class="tc-note__b">最後兩點請務必打開終端機跟著做。</div>
</div>

---
layout: default
---

<div class="tc-head">
  <div class="tc-kicker">02 · 常見網站應用</div>
  <h1 class="tc-h1">你每天都在用的東西</h1>
</div>

<div class="tc-rows tc-in">
  <div class="tc-rowline" style="grid-template-columns:24px 96px 1fr;--i:0"><i class="ic ic-cart ic--md tc-accent"></i><b>foodpanda</b><span class="tc-rowline__v tc-sm">瀏覽餐廳 → 購物車 → 下單<span class="tc-mute"> · 背後：菜單 API、庫存 API、訂單 API</span></span></div>
  <div class="tc-rowline" style="grid-template-columns:24px 96px 1fr;--i:1"><i class="ic ic-video ic--md tc-accent"></i><b>YouTube</b><span class="tc-rowline__v tc-sm">看影片、留言、推薦<span class="tc-mute"> · 背後：影片 API、推薦演算法、CDN</span></span></div>
  <div class="tc-rowline" style="grid-template-columns:24px 96px 1fr;--i:2"><i class="ic ic-bank ic--md tc-accent"></i><b>網路銀行</b><span class="tc-rowline__v tc-sm">查餘額、轉帳、對帳<span class="tc-mute"> · 背後：驗證、加密、稽核日誌</span></span></div>
  <div class="tc-rowline" style="grid-template-columns:24px 96px 1fr;--i:3"><i class="ic ic-chat ic--md tc-accent"></i><b>LINE</b><span class="tc-rowline__v tc-sm">傳訊息、語音、通知<span class="tc-mute"> · 背後：長連線、推播、訊息佇列</span></span></div>
  <div class="tc-rowline" style="grid-template-columns:24px 96px 1fr;--i:4"><i class="ic ic-package ic--md tc-accent"></i><b>蝦皮</b><span class="tc-rowline__v tc-sm">搜尋商品、下單、付款<span class="tc-mute"> · 背後：搜尋引擎、金流、推薦</span></span></div>
  <div class="tc-rowline" style="grid-template-columns:24px 96px 1fr;--i:5"><i class="ic ic-truck ic--md tc-accent"></i><b>宅配</b><span class="tc-rowline__v tc-sm">查包裹、通知送貨<span class="tc-mute"> · 背後：物流 API、Webhook</span></span></div>
</div>

<div class="tc-note tc-note--accent" style="margin-top:18px">
  <div class="tc-note__t">它們長得很不一樣，但拆開來都是同一種結構</div>
  <div class="tc-note__b">一個畫面 + 一堆後端 + 一堆資料。</div>
</div>

---
layout: default
---

<div class="tc-head">
  <div class="tc-kicker">03 · 五大面向</div>
  <h1 class="tc-h1">五大面向拆解網站應用</h1>
</div>

<div class="tc-rows tc-rows--dense">
  <div class="tc-rowline" style="grid-template-columns:24px 1fr">
    <i class="ic ic-browser ic--lg tc-accent"></i>
    <div><b>前端 Frontend</b> <span class="tc-xs tc-mute">使用者看到的</span>
      <p class="tc-sm">HTML 結構、CSS 樣式、JavaScript 互動。跑在<b>使用者的瀏覽器</b>裡，伺服器只送程式碼。</p></div>
  </div>
  <div class="tc-rowline" style="grid-template-columns:24px 1fr">
    <i class="ic ic-server ic--lg tc-accent"></i>
    <div><b>後端 Backend</b> <span class="tc-xs tc-mute">使用者看不到的</span>
      <p class="tc-sm">收請求、驗證、算錢、動資料。跑在<b>伺服器</b>裡，你看不到但它一直在運作。</p></div>
  </div>
  <div class="tc-rowline" style="grid-template-columns:24px 1fr">
    <i class="ic ic-db ic--lg tc-accent"></i>
    <div><b>資料庫 Database</b> <span class="tc-xs tc-mute">記憶體之外的記憶</span>
      <p class="tc-sm">MySQL、PostgreSQL、SQLite、MongoDB。程式關掉、機器重開，資料還在。</p></div>
  </div>
  <div class="tc-rowline" style="grid-template-columns:24px 1fr">
    <i class="ic ic-net ic--lg tc-accent"></i>
    <div><b>網路與通訊協定 Network</b> <span class="tc-xs tc-mute">把它們連起來</span>
      <p class="tc-sm">TCP/IP、HTTP、DNS。瀏覽器要能找到伺服器、要能問它要資料。</p></div>
  </div>
  <div class="tc-rowline" style="grid-template-columns:24px 1fr">
    <i class="ic ic-rocket ic--lg tc-accent"></i>
    <div><b>部署與維運 Deployment</b> <span class="tc-xs tc-mute">上線之後的事</span>
      <p class="tc-sm">伺服器環境、上線流程、掛掉時誰來修。程式寫完只是開始。</p></div>
  </div>
</div>

---
layout: default
---

<div class="tc-head">
  <div class="tc-kicker">03 · 五大面向</div>
  <h1 class="tc-h1">你每天用的網站，拆開長這樣</h1>
</div>

<div class="tc-panel tc-panel--inset" style="padding:20px 24px">
  <div class="tc-row tc-row--center" style="justify-content:space-between;gap:18px">
    <div class="tc-col" style="align-items:center;gap:5px;flex:none;width:150px">
      <i class="ic ic-browser ic--xl tc-accent"></i>
      <b class="tc-sm">瀏覽器</b>
      <span class="tc-xs tc-mute" style="text-align:center">顯示畫面 · 送出請求</span>
    </div>
    <i class="ic ic-exchange ic--lg tc-mute"></i>
    <div class="tc-col" style="align-items:center;gap:5px;flex:none;width:150px">
      <i class="ic ic-server ic--xl tc-accent"></i>
      <b class="tc-sm">後端伺服器</b>
      <span class="tc-xs tc-mute" style="text-align:center">收請求 · 執行邏輯</span>
    </div>
    <i class="ic ic-exchange ic--lg tc-mute"></i>
    <div class="tc-col" style="align-items:center;gap:5px;flex:none;width:150px">
      <i class="ic ic-db ic--xl tc-accent"></i>
      <b class="tc-sm">資料庫</b>
      <span class="tc-xs tc-mute" style="text-align:center">保存商品 · 使用者資料</span>
    </div>
  </div>
</div>

<div style="margin-top:16px">
  <span class="tc-panel__label">在中間那兩段雙向箭頭上，發生的是</span>
  <div class="tc-grid tc-grid--even" style="gap:6px 30px">
    <div class="tc-row tc-row--center"><i class="ic ic-code ic--sm tc-accent"></i><span class="tc-sm"><b>HTTP 協定</b> <span class="tc-mute">— 兩邊說話的規則</span></span></div>
    <div class="tc-row tc-row--center"><i class="ic ic-door ic--sm tc-accent"></i><span class="tc-sm"><b>Port 號</b> <span class="tc-mute">— 找到正確的那台服務</span></span></div>
    <div class="tc-row tc-row--center"><i class="ic ic-net ic--sm tc-accent"></i><span class="tc-sm"><b>TCP/IP</b> <span class="tc-mute">— 資料怎麼在網路上跑</span></span></div>
    <div class="tc-row tc-row--center"><i class="ic ic-signal ic--sm tc-accent"></i><span class="tc-sm"><b>狀態碼</b> <span class="tc-mute">— 這次請求的結果</span></span></div>
  </div>
</div>

<div class="tc-note tc-note--accent" style="margin-top:16px">
  <div class="tc-note__t">接下來三節，把這四個詞講清楚。</div>
</div>

---
layout: default
---

<div class="tc-head">
  <div class="tc-kicker">04 · 網路是如何運作的</div>
  <h1 class="tc-h1">從瀏覽器到伺服器</h1>
</div>

<RequestJourney />

<div class="tc-note tc-note--accent" style="margin-top:18px">
  <div class="tc-note__t">DNS 負責「名字 → IP」，HTTP 負責「問什麼、要什麼」</div>
  <div class="tc-note__b">兩件事，別搞混。</div>
</div>

---
layout: default
---

<div class="tc-head">
  <div class="tc-kicker">04 · TCP/IP 四層模型</div>
  <h1 class="tc-h1">TCP/IP 四層模型</h1>
  <div class="tc-head__meta">由下往上 — <b>線 · 路 · 包 · 話</b></div>
</div>

<div class="tc-rows tc-sheen">
  <div class="tc-rowline" style="grid-template-columns:78px 1fr;padding:11px 0">
    <div><div class="tc-rowline__k tc-accent" style="font-size:17px">L4</div><div class="tc-xs tc-mute">應用層</div></div>
    <div>
      <p class="tc-rowline__v tc-sm"><b>Application</b> — HTTP、HTTPS、DNS、SMTP、FTP、SSH，定義「訊息長什麼樣、怎麼問怎麼答」</p>
      <p class="tc-xs tc-accent" style="margin-top:3px">你寫的程式在這層 · <b>今天上課的每一行 Java 程式碼都在這裡</b></p>
    </div>
  </div>
  <div class="tc-rowline" style="grid-template-columns:78px 1fr;padding:11px 0">
    <div><div class="tc-rowline__k tc-white" style="font-size:17px">L3</div><div class="tc-xs tc-mute">傳輸層</div></div>
    <div>
      <p class="tc-rowline__v tc-sm"><b>Transport</b> — TCP（可靠、慢、要握手）、UDP（不可靠、快）。<code>80</code>、<code>443</code>、<code>3306</code>、<code>8080</code> 都是這層的門牌</p>
      <p class="tc-xs tc-dim" style="margin-top:3px">用 Port 號分流 · <b>第 6 點講的 Port 號在這裡</b></p>
    </div>
  </div>
  <div class="tc-rowline" style="grid-template-columns:78px 1fr;padding:11px 0">
    <div><div class="tc-rowline__k tc-dim" style="font-size:17px">L2</div><div class="tc-xs tc-mute">網際網路層</div></div>
    <div>
      <p class="tc-rowline__v tc-sm"><b>Internet</b> — IP 協定。負責「把封包送到全世界的正確地址」。<code>140.82.121.4</code> 就是 IP</p>
    </div>
  </div>
  <div class="tc-rowline" style="grid-template-columns:78px 1fr;padding:11px 0">
    <div><div class="tc-rowline__k tc-mute" style="font-size:17px">L1</div><div class="tc-xs tc-mute">網路存取層</div></div>
    <div>
      <p class="tc-rowline__v tc-sm"><b>Network Access</b> — 網路線、Wi-Fi、网卡。負責「在這條線上正確地傳位元組」</p>
    </div>
  </div>
</div>

<div class="tc-note tc-note--accent" style="margin-top:16px">
  <div class="tc-note__t">記憶法：從下往上 — 「線、路、包、話」</div>
  <div class="tc-note__b">網線 → IP 找到路 → TCP 找對門 → HTTP 說對話</div>
</div>

---
layout: default
class: scroll-y no
---

<div class="tc-head tc-head--tight">
  <div class="tc-kicker">04 · HTTP</div>
  <h1 class="tc-h1">HTTP 到底長什麼樣</h1>
</div>

<div class="tc-row tc-row--center" style="gap:9px">
  <i class="ic ic-upload ic--sm tc-accent"></i>
  <span class="tc-h2">請求 Request</span>
  <span class="tc-xs tc-mute">前端 → 後端 — 第一行叫<b class="tc-fg">起始行</b>：方法 + 路徑 + 版本</span>
</div>

```http
GET /api/products HTTP/1.1
Host: localhost:8080
Accept: application/json
```

<div class="tc-row tc-row--center" style="gap:9px;margin-top:8px">
  <i class="ic ic-download ic--sm tc-accent"></i>
  <span class="tc-h2">回應 Response</span>
  <span class="tc-xs tc-mute">後端 → 前端 — 第一行先寫版本，再寫<b class="tc-fg">狀態碼</b> + 原因片語</span>
</div>

```http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 252
```


<div class="tc-row tc-row--center" style="gap:8px;margin-top:12px">
  <i class="ic ic-flask ic--sm tc-accent"></i>
  <span class="tc-h2">現在就試</span>
  <span class="tc-xs tc-mute">打開終端機貼上這行 — 不用等第 9 節</span>
</div>

```bash
curl -i --http1.1 https://jsonplaceholder.typicode.com/posts/1
```

<p class="tc-xs tc-mute" style="margin-top:6px">Windows PowerShell 請打 <code>curl.exe</code> — PowerShell 的 <code>curl</code> 是別名，會報錯；Mac / Linux 照打即可。</p>

<div class="tc-grid tc-grid--even" style="margin-top:10px">
  <div class="tc-note tc-note--ok">
    <div class="tc-note__t">你會看到三段</div>
    <div class="tc-note__b"><code>HTTP/1.1 200 OK</code>（狀態行）→ 一堆 Header → 空一行 → JSON 資料。和上面兩張圖對照，一模一樣。</div>
  </div>
  <div class="tc-note tc-note--accent">
    <div class="tc-note__t">第 9 節回來換自己的</div>
    <div class="tc-note__b">跑起 <code>NativeApiServer</code> 後，把網址換成 <code>http://localhost:8080/api/products</code> 再打一次 — 同樣的形狀，資料變成你的。</div>
  </div>
</div>

---
layout: default
class: scroll-y
---

<div class="tc-head">
  <div class="tc-kicker">CHECKPOINT 01</div>
  <h1 class="tc-h1">檢查點 1 — 網路與 HTTP</h1>
</div>

<div class="tc-grid tc-grid--wide">
  <div class="tc-col">
    <div class="tc-checks">
      <div class="tc-row tc-row--center" style="gap:8px"><i class="ic ic-check ic--sm tc-ok"></i><b class="tc-h2">我能說出</b></div>
      <div class="tc-checks__i">DNS 做的事</div>
      <div class="tc-checks__i">TCP/IP 四層由下往上是什麼</div>
      <div class="tc-checks__i">HTTP 請求有哪幾個部分</div>
      <div class="tc-checks__i">「無狀態」的意思</div>
    </div>
    <div class="tc-checks" style="margin-top:10px">
      <div class="tc-row tc-row--center" style="gap:8px"><i class="ic ic-question ic--sm tc-warn"></i><b class="tc-h2">我還不太確定</b></div>
      <div class="tc-checks__i tc-checks__i--q">TCP 和 UDP 差在哪</div>
      <div class="tc-checks__i tc-checks__i--q">為什麼要有四層，不會太多嗎</div>
      <div class="tc-checks__i tc-checks__i--q">三次握手在幹嘛</div>
    </div>
  </div>
  <div class="tc-col">
    <div class="tc-note tc-note--warn">
      <div class="tc-note__t">馬上複習</div>
      <div class="tc-note__b">回到「TCP/IP 四層模型」，用「線、路、包、話」重念一次。</div>
    </div>
  </div>
</div>

---
layout: default
---

<div class="tc-head">
  <div class="tc-kicker">05 · HTTP 狀態碼</div>
  <h1 class="tc-h1">2xx 成功</h1>
  <div class="tc-head__meta">伺服器成功處理了你的請求，而且沒有出錯</div>
</div>

<div class="tc-rows">
  <div class="tc-rowline" style="grid-template-columns:78px 1fr;padding:14px 0">
    <div><div class="tc-num tc-ok">200</div><div class="tc-xs tc-mute">OK</div></div>
    <div>
      <p class="tc-rowline__v"><b>成功，東西在這裡</b> — 最常見。GET 成功、POST 成功都回這個。<code>GET /api/products</code> 回的就是 200</p>
      <p class="tc-xs tc-ok" style="margin-top:4px">前端怎麼處理：<code>response.json()</code> 直接用</p>
    </div>
  </div>
  <div class="tc-rowline" style="grid-template-columns:78px 1fr;padding:14px 0">
    <div><div class="tc-num tc-ok">201</div><div class="tc-xs tc-mute">Created</div></div>
    <div>
      <p class="tc-rowline__v"><b>成功，而且「建立了東西」</b> — 跟 200 的差別：201 表示<b>伺服器新建立了一筆資源</b>。例如註冊新帳號、新增一筆訂單</p>
      <p class="tc-xs tc-ok" style="margin-top:4px">很多實務上會混用 200 代替 201，但嚴格來說「新增」該用 201</p>
    </div>
  </div>
  <div class="tc-rowline" style="grid-template-columns:78px 1fr;padding:14px 0">
    <div><div class="tc-num tc-ok">204</div><div class="tc-xs tc-mute">No Content</div></div>
    <div>
      <p class="tc-rowline__v"><b>成功，但「沒有東西要給你」</b> — 事情做完了，body 是空的。典型是 <code>DELETE</code>：刪除成功不回傳任何資料</p>
      <p class="tc-xs tc-warn" style="margin-top:4px">前端陷阱：<code>response.json()</code> 會直接報錯 — body 根本沒有東西可以 parse</p>
    </div>
  </div>
</div>

<div class="tc-note tc-note--ok" style="margin-top:16px">
  <div class="tc-note__t">2xx 的共同點：伺服器成功處理了你的請求，而且沒有出錯。</div>
  <div class="tc-note__b">前端可以放心把資料當成有效值用。</div>
</div>

---
layout: default
class: scroll-y
---

<div class="tc-head">
  <div class="tc-kicker">05 · HTTP 狀態碼</div>
  <h1 class="tc-h1">4xx 是「你的問題」</h1>
</div>

<div class="tc-rows">
  <div class="tc-rowline" style="grid-template-columns:60px 1fr;padding:10px 0">
    <div class="tc-num tc-warn">400</div>
    <div>
      <p class="tc-rowline__v"><b>Bad Request — 你的請求格式不對</b> — 送出 <code>productId=abc</code>（應該是數字）。<b>伺服器看不懂就拒絕。</b></p>
      <p class="tc-xs tc-warn" style="margin-top:3px">我們的程式：<code>NumberFormatException → 400</code> <i class="ic ic-check ic--sm"></i></p>
    </div>
  </div>
  <div class="tc-rowline" style="grid-template-columns:60px 1fr;padding:10px 0">
    <div class="tc-num tc-warn">401</div>
    <div>
      <p class="tc-rowline__v"><b>Unauthorized — 你「是誰」我還不知道</b> — 沒登入、token 過期、根本沒帶 token。<b>認不出你是誰</b></p>
      <p class="tc-xs tc-dim" style="margin-top:3px">前端：導向登入頁面</p>
    </div>
  </div>
  <div class="tc-rowline" style="grid-template-columns:60px 1fr;padding:10px 0">
    <div class="tc-num tc-warn">403</div>
    <div>
      <p class="tc-rowline__v"><b>Forbidden — 我知道你是誰，但你不可以</b> — 已登入了，但這筆訂單不是你的。<b>401 和 403 的差別就在這裡</b></p>
      <p class="tc-xs tc-dim" style="margin-top:3px">前端：顯示「沒有權限」，不要登出</p>
    </div>
  </div>
  <div class="tc-rowline" style="grid-template-columns:60px 1fr;padding:10px 0">
    <div class="tc-num tc-warn">404</div>
    <div>
      <p class="tc-rowline__v"><b>Not Found — 你找的東西不在這裡</b> — 網址打錯、路徑不存在、資源被刪了。<b>最常見的 4xx</b></p>
      <p class="tc-xs tc-warn" style="margin-top:3px">我們的程式：<code>GET /nope → 404</code> <i class="ic ic-check ic--sm"></i></p>
    </div>
  </div>
  <div class="tc-rowline" style="grid-template-columns:60px 1fr;padding:10px 0">
    <div class="tc-num tc-warn">415</div>
    <div>
      <p class="tc-rowline__v"><b>Unsupported Media Type — 你的格式我不收</b> — 後端要 JSON，你卻送 <code>application/x-www-form-urlencoded</code>（表單格式）。<b>這是 body 格式錯，不是內容錯。</b></p>
      <p class="tc-xs tc-dim" style="margin-top:3px">我們的程式：Day 2 手拆 form；Spring 版的 <code>@RequestBody</code> 只收 JSON — <b>同一個 API，兩邊接受的格式不同</b></p>
    </div>
  </div>
</div>

<div class="tc-note tc-note--warn" style="margin-top:14px">
  <div class="tc-note__t">401 vs 403 這組最容易混 — 面試愛問</div>
  <div class="tc-note__b">401 = 「你是誰？」　403 = 「你不能。」</div>
</div>

---
layout: default
class: scroll-y
---

<div class="tc-head tc-head--tight">
  <div class="tc-kicker">05 · HTTP 狀態碼</div>
  <h1 class="tc-h1">5xx 是「我的問題」</h1>
</div>

<div class="tc-rows">
  <div class="tc-rowline" style="grid-template-columns:78px 1fr;padding:12px 0">
    <div><div class="tc-num tc-err">500</div><div class="tc-xs tc-mute">Internal Server Error</div></div>
    <div>
      <p class="tc-rowline__v"><b>我壞掉了</b> — 伺服器裡發生了你預期外的錯誤：程式 exception、資料庫連不上、寫炸了</p>
      <p class="tc-xs tc-err" style="margin-top:3px">我們的程式：<code>catch (Exception) → 500</code> <i class="ic ic-check ic--sm"></i></p>
    </div>
  </div>
</div>

<div class="tc-grid tc-grid--even" style="margin-top:12px">
  <div class="tc-note tc-note--warn">
    <div class="tc-note__t tc-warn">4xx — 客戶端的問題</div>
    <div class="tc-note__b">你傳錯了、少帶東西、想看不存在的東西。<b>改前端或改請求就能解決。</b></div>
  </div>
  <div class="tc-note tc-note--err">
    <div class="tc-note__t tc-err">5xx — 伺服器的問題</div>
    <div class="tc-note__b">程式炸了、服務掛了。<b>使用者改什麼都沒用，要去修後端。</b></div>
  </div>
</div>

<span class="tc-panel__label" style="margin-top:14px">同一份程式碼，狀態碼是這樣決定的</span>

```java
if (方法不對)              → 405  我不接這種請求
if (參數不是正整數)         → 400  你送壞了
if (找不到這筆商品)         → 400  你送壞了
if (庫存 < 購買數量)        → 409  請求合理但跟現況衝突
if (扣減成功)              → 200  成了
if (沒接住的 Exception)    → 500  我壞了
```

<div class="tc-note tc-note--accent" style="margin-top:12px">
  <div class="tc-note__t">409 我們在 Day 2 沒講過，但它超常用</div>
  <div class="tc-note__b">「庫存剛好被別人買完」就是最典型的 409 Conflict。</div>
</div>

---
layout: default
---

<div class="tc-head">
  <div class="tc-kicker">06 · PORT</div>
  <h1 class="tc-h1">Port 號是什麼</h1>
</div>

<div class="tc-note tc-note--accent">
  <div class="tc-note__t">先建立一個畫面</div>
  <div class="tc-note__b">一棟大樓裡有幾百家公司。(find 你的名字 → IP)，接著要找到<b>該走哪一扇門</b> → Port。</div>
</div>

<div class="tc-grid tc-grid--even" style="margin-top:14px">
  <div class="tc-note tc-note--accent">
    <div class="tc-note__t"><i class="ic ic-pin ic--sm"></i> IP 網址 = 大樓的地址</div>
    <div class="tc-note__b">全網路唯一。<code>140.82.121.4</code><br>由 DNS 幫你從域名查出來</div>
  </div>
  <div class="tc-note tc-note--warn">
    <div class="tc-note__t"><i class="ic ic-door ic--sm"></i> Port 號 = 大樓裡的門牌</div>
    <div class="tc-note__b">一台機器上唯一。<code>8080</code><br>由程式啟動時自己指定</div>
  </div>
</div>

<div style="margin-top:14px">
  <span class="tc-panel__label">技術上：Port 是 16 位元的無號整數</span>
  <div class="tc-rows tc-rows--dense">
    <div class="tc-rowline" style="grid-template-columns:132px 1fr"><code class="tc-rowline__k">0 ~ 65535</code><span class="tc-rowline__v tc-sm">共 65536 個</span></div>
    <div class="tc-rowline" style="grid-template-columns:132px 1fr"><code class="tc-rowline__k">0 ~ 1023</code><span class="tc-rowline__v tc-sm">「保留區」，要系統權限才能用（<code>80</code>、<code>443</code>、<code>22</code> 都在這）</span></div>
    <div class="tc-rowline" style="grid-template-columns:132px 1fr"><code class="tc-rowline__k">1024 ~ 49151</code><span class="tc-rowline__v tc-sm">「註冊 port」，要向 IANA 登記</span></div>
    <div class="tc-rowline" style="grid-template-columns:132px 1fr"><code class="tc-rowline__k">49152 ~ 65535</code><span class="tc-rowline__v tc-sm">「動態 port」，作業系統隨機指派給客戶端連線</span></div>
  </div>
</div>

<div class="tc-note tc-note--warn" style="margin-top:14px">
  <div class="tc-note__t">Port 是傳輸層（TCP/UDP）的概念，不是 IP 的。</div>
  <div class="tc-note__b">同一個 IP 可以同時跑幾十個 port，各自服務不同的程式。</div>
</div>

---
layout: default
---

<div class="tc-head">
  <div class="tc-kicker">06 · PORT</div>
  <h1 class="tc-h1">你會一直遇到的 Port 號</h1>
</div>

<div class="tc-rows">
  <div class="tc-rowline" style="grid-template-columns:74px 1fr 190px"><span class="tc-num tc-accent">3306</span><span class="tc-rowline__v tc-sm"><b>MySQL</b> <span class="tc-mute">— 資料庫預設連線埠</span></span><code class="tc-rowline__n" style="text-align:right">mysql -u root -P 3306</code></div>
  <div class="tc-rowline" style="grid-template-columns:74px 1fr 190px"><span class="tc-num tc-accent">5432</span><span class="tc-rowline__v tc-sm"><b>PostgreSQL</b> <span class="tc-mute">— MySQL 的對手，開源社群常用</span></span><code class="tc-rowline__n" style="text-align:right">psql -p 5432</code></div>
  <div class="tc-rowline" style="grid-template-columns:74px 1fr 190px"><span class="tc-num tc-accent">6379</span><span class="tc-rowline__v tc-sm"><b>Redis</b> <span class="tc-mute">— 記憶體快取</span></span><code class="tc-rowline__n" style="text-align:right">redis-cli -p 6379</code></div>
  <div class="tc-rowline" style="grid-template-columns:74px 1fr 190px"><span class="tc-num tc-accent">27017</span><span class="tc-rowline__v tc-sm"><b>MongoDB</b> <span class="tc-mute">— 沒有 schema 的資料庫</span></span><code class="tc-rowline__n" style="text-align:right">mongod --port 27017</code></div>
  <div class="tc-rowline tc-rowline--hi" style="grid-template-columns:74px 1fr 190px"><span class="tc-num tc-warn">8080</span><span class="tc-rowline__v tc-sm"><b>HTTP 替代 port</b> <span class="tc-warn">— 本課的示範 port</span></span><code class="tc-rowline__n tc-warn" style="text-align:right">http://localhost:8080</code></div>
  <div class="tc-rowline" style="grid-template-columns:74px 1fr 190px"><span class="tc-num tc-accent">80 / 443</span><span class="tc-rowline__v tc-sm"><b>HTTP / HTTPS</b> <span class="tc-mute">— 保留區，要權限才能綁</span></span><code class="tc-rowline__n" style="text-align:right">不用打，直接省略</code></div>
</div>

<div class="tc-note tc-note--warn" style="margin-top:16px">
  <div class="tc-note__t">為什麼 Spring Boot 預設 8080、Express 預設 3000？</div>
  <div class="tc-note__b">因為 80/443 要管理員權限，開發時用 1024 以上的 port 最省事。</div>
</div>

---
layout: default
class: scroll-y no
---

<div class="tc-head tc-head--tight">
  <div class="tc-kicker">06 · PORT</div>
  <h1 class="tc-h1">Port 號會撞 — 到底發生什麼事</h1>
</div>

<p class="tc-sm">我們的 Day 2 程式裡這一行：</p>

```java
HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
//                                              ↑ 門牌 8080
```

<p class="tc-sm" style="margin-top:8px">如果 <b>8080 已經被別的程式占用</b>（你忘了關掉昨天開的那個），<b class="tc-err">這行直接丟例外，伺服器根本開不起來</b>：</p>

```bash
Exception in thread "main" java.net.BindException:
  Address already in use
```

<p class="tc-xs tc-mute tc-mono">（Java 版的錯誤訊息）</p>

<span class="tc-panel__label tc-err" style="margin-top:8px">怎麼找出誰占了？</span>

```bash
# macOS / Linux
lsof -i :8080
# 或
netstat -an | grep 8080
# Windows
netstat -ano | findstr :8080
```

<div class="tc-grid tc-grid--even" style="margin-top:12px">
  <div class="tc-note tc-note--ok">
    <div class="tc-note__t">解法一：關掉舊的那個</div>
    <div class="tc-note__b">找到 PID 後 <code>kill 編號</code>，最乾淨</div>
  </div>
  <div class="tc-note tc-note--warn">
    <div class="tc-note__t">解法二：換一個 port</div>
    <div class="tc-note__b">改成 <code>8081</code> 或 <code>9090</code>，馬上能跑</div>
  </div>
</div>

<div class="tc-note tc-note--accent" style="margin-top:12px">
  <div class="tc-note__t">本機 127.0.0.1:8080 的 8080，和別人電腦的 8080 是同一個嗎？</div>
  <div class="tc-note__b"><b>不是。</b>Port 的「唯一性」是<b class="tc-warn">在同一個 IP 上面</b>。你在自己電腦用 8080，教室同學在自己電腦用 8080，<b>完全不衝突</b> —— 因為它們是不同的 IP。只有當兩個人試著<b class="tc-err">從同一台機器連同一個 port</b> 才會撞。</div>
</div>

---
layout: section
---

<div class="tc-ambient"></div>
<div class="tc-stage">
  <div class="tc-stage__main tc-in">
    <div class="tc-kicker tc-kicker--cmd" style="--i:0">$ grep -rn "框架" ~/note/<span class="tc-caret"></span></div>
    <h1 class="tc-display" style="--i:1;margin-top:14px"><em>什麼是</em>框架</h1>
    <div class="tc-stage__rule" style="--i:2"></div>
    <p class="tc-lead tc-mono" style="--i:3;margin-top:20px">// 本課最需要慢慢講的一節</p>
  </div>
  <div class="tc-stage__aside" style="align-self:center;width:100%">
    <div class="tc-rows tc-in">
      <div class="tc-rowline tc-rowline--auto" style="--i:4"><b>怎樣才算框架</b><span class="tc-rowline__n" style="justify-self:end">先有清楚的定義</span></div>
      <div class="tc-rowline tc-rowline--auto" style="--i:5"><b>為什麼要有</b><span class="tc-rowline__n" style="justify-self:end">從你寫過的痛講起</span></div>
      <div class="tc-rowline tc-rowline--auto" style="--i:6"><b>跟 Day2 差在哪</b><span class="tc-rowline__n" style="justify-self:end">同一件事，兩種寫法</span></div>
    </div>
  </div>
</div>
<div class="tc-grain"></div>

---
layout: default
---

<div class="tc-head tc-head--tight">
  <div class="tc-kicker">07 · 什麼是框架</div>
  <h1 class="tc-h1">框架替你安排程式怎麼運作</h1>
</div>

<div class="tc-note tc-note--warn">
  <div class="tc-note__t">先記住這個判斷</div>
  <div class="tc-note__b">框架先把<b>啟動、組裝與執行流程</b>安排好。你把自己的邏輯放進指定位置，框架再於適當時機接手執行。</div>
</div>

<div class="tc-grid tc-grid--even" style="margin-top:12px">
  <div class="tc-note tc-note--accent">
    <div class="tc-note__t"><i class="ic ic-box ic--sm"></i> 套件 Library</div>
    <div class="tc-note__b">你<b>主動呼叫</b>它，決定何時使用、傳入什麼，以及如何處理結果。<br>例：<code>Math.random()</code>、<code>new Scanner()</code></div>
  </div>
  <div class="tc-note tc-note--warn">
    <div class="tc-note__t"><i class="ic ic-tool ic--sm"></i> 框架 Framework</div>
    <div class="tc-note__b">它<b>主動呼叫你的程式</b>，依照自己的流程決定何時執行。<br>你要遵守它的結構與規則。例：Spring Boot、Next.js</div>
  </div>
</div>

<div class="tc-term" style="margin-top:12px">
怎麼分辨？先問：
「<b>誰掌握整個流程？</b>」
我決定何時呼叫它 → 套件。　它決定何時執行我 → 框架。</div>

<div class="tc-grid tc-grid--even" style="margin-top:12px">
  <div class="tc-panel tc-panel--inset" style="padding:11px 14px">
    <b class="tc-sm">沒有框架時（Day 2 的寫法）</b>
    <p class="tc-xs tc-mono tc-dim">main() → new → 註冊 → start()</p>
    <p class="tc-xs">你的程式掌握啟動與執行順序</p>
  </div>
  <div class="tc-panel tc-panel--inset" style="padding:11px 14px">
    <b class="tc-sm">有框架時（Spring Boot）</b>
    <p class="tc-xs tc-mono tc-dim">main() → 啟動容器 → 接手流程</p>
    <p class="tc-xs">你提供元件與規則，框架負責組裝和呼叫</p>
  </div>
</div>

---
layout: default
---

<div class="tc-head tc-head--tight">
  <div class="tc-kicker">07 · 什麼是框架</div>
  <h1 class="tc-h1">框架幫你蓋了什麼</h1>
</div>

<div class="tc-grid tc-grid--even">
  <div class="tc-col">
    <div class="tc-row tc-row--center" style="gap:8px;padding-bottom:7px;border-bottom:1px solid var(--line)">
      <i class="ic ic-cross ic--sm tc-err"></i><span class="tc-h2">沒有框架時，程式長這樣</span>
    </div>
    <div class="tc-list">
      <div class="tc-list__i"><code>HttpServer.create(..., 8080)</code><br><span class="tc-xs tc-dim">自己建立伺服器，自己綁 port</span></div>
      <div class="tc-list__i"><code>server.createContext("/api/products", ...)</code><br><span class="tc-xs tc-dim">每條路由都要手動註冊</span></div>
      <div class="tc-list__i"><code>exchange.getRequestBody()</code><br><span class="tc-xs tc-dim">自己讀 body、解析參數</span></div>
      <div class="tc-list__i"><code>StringBuilder</code> → JSON 字串<br><span class="tc-xs tc-dim">資料要自己轉成回應格式</span></div>
      <div class="tc-list__i"><code>set("Content-Type", ...)</code><br><span class="tc-xs tc-dim">header、狀態碼、回應串流都要自己寫</span></div>
      <div class="tc-list__i"><code>try (OutputStream out = ...)</code><br><span class="tc-xs tc-dim">資源要自己關閉</span></div>
    </div>
  </div>
  <div class="tc-col">
    <div class="tc-row tc-row--center" style="gap:8px;padding-bottom:7px;border-bottom:1px solid var(--line)">
      <i class="ic ic-check ic--sm tc-ok"></i><span class="tc-h2">有框架時，這些都不見了</span>
    </div>
    <div class="tc-list">
      <div class="tc-list__i"><code>@RestController</code><br><span class="tc-xs tc-dim">框架負責建立伺服器與啟動流程</span></div>
      <div class="tc-list__i"><code>server.port=8080</code><br><span class="tc-xs tc-dim">設定寫在檔案，不散落在程式裡</span></div>
      <div class="tc-list__i"><code>@GetMapping("/api/products")</code><br><span class="tc-xs tc-dim">標記就是路由註冊</span></div>
      <div class="tc-list__i"><code>@RequestBody BuyRequest request</code><br><span class="tc-xs tc-dim">body 自動綁成物件</span></div>
      <div class="tc-list__i"><code>return products;</code><br><span class="tc-xs tc-dim">回傳物件，自動序列化成 JSON</span></div>
      <div class="tc-list__i"><code>ResponseEntity.ok(...)</code><br><span class="tc-xs tc-dim">狀態碼與 body 一起處理</span></div>
    </div>
  </div>
</div>

<div class="tc-note tc-note--accent" style="margin-top:14px">
  <div class="tc-note__t">框架沒有「消滅」這些工作，它只是把它們「藏起來」並且「一次做好」。</div>
  <div class="tc-note__b">你省下的是重複勞動，不是理解成本。</div>
</div>

---
layout: default
class: scroll-y no
---

<div class="tc-head tc-head--tight">
  <div class="tc-kicker">07 · 用程式碼證明</div>
  <h1 class="tc-h1">框架省了多少</h1>
</div>

<div class="tc-row tc-row--center" style="gap:8px"><i class="ic ic-cross ic--sm tc-err"></i><span class="tc-h2">原生版</span></div>

```java
// 綁 port、決定生命週期
HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
// 手動註冊每一條路由
server.createContext("/api/products", NativeApiServer::handleProducts);
server.createContext("/api/buy", NativeApiServer::handleBuy);
server.createContext("/", NativeApiServer::serveFrontend);
server.start();  // ← 忘了這行就不會跑

// 手刻 JSON：字串拼接 + 跳脫字元
StringBuilder json = new StringBuilder("[");
json.append("{\"id\":").append(p[0])
    .append(",\"name\":\"").append(jsonEscape(p[1]))
    .append("\",\"price\":").append(p[2]).append('}');
// 手動設 header 和狀態碼
exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");
exchange.sendResponseHeaders(200, content.length);
try (OutputStream out = exchange.getResponseBody()) { out.write(content); }
```

<div class="tc-row tc-row--center" style="gap:8px;margin-top:8px"><i class="ic ic-check ic--sm tc-ok"></i><span class="tc-h2">框架版</span></div>

```java
@RestController
@RequestMapping("/api")
public class ProductController {
    // 宣告就是註冊，沒有 start() 要記
    @GetMapping("/products")
    public List<Product> products() { return products; }

    @PostMapping("/buy")
    public synchronized ResponseEntity<?> buy(@RequestBody BuyRequest req) {
        return ResponseEntity.ok(new MessageResponse("購買成功"));
    }
}
```

---
layout: default
---

<div class="tc-head tc-head--tight">
  <div class="tc-kicker">07 · 三大支柱</div>
  <h1 class="tc-h1">框架怎麼接手你的程式</h1>
  <div class="tc-head__meta">先看三種機制，第 10 點再看它們一起運作</div>
</div>

<div class="tc-rows tc-rows--dense">
  <div class="tc-rowline" style="grid-template-columns:30px 1fr">
    <i class="ic ic-wand ic--lg tc-accent"></i>
    <div>
      <b>約定優於配置</b> <code class="tc-xs">Conventions over Configuration</code>
      <p class="tc-sm">框架先替你規定常見的放法。檔案位置、類別名稱符合規則時，<b>少寫設定也能得到預設行為</b>。</p>
      <p class="tc-xs tc-mute" style="margin-top:2px">不是沒有配置，而是先使用框架的預設配置</p>
    </div>
  </div>
  <div class="tc-rowline" style="grid-template-columns:30px 1fr">
    <i class="ic ic-chip ic--lg tc-accent"></i>
    <div>
      <b>依賴注入</b> <code class="tc-xs">Dependency Injection</code>
      <p class="tc-sm">你的類別只宣告「我需要什麼」，不負責到處 <code>new</code>。<b>框架建立物件，再把它傳進建構子</b>。</p>
      <p class="tc-xs tc-mute" style="margin-top:2px"><code>ProductQueryController(seed)</code>：seed 由框架準備</p>
    </div>
  </div>
  <div class="tc-rowline" style="grid-template-columns:30px 1fr">
    <i class="ic ic-tool ic--lg tc-accent"></i>
    <div>
      <b>註解是框架的指示牌</b> <code class="tc-xs">Annotation</code>
      <p class="tc-sm">用 <code>@RestController</code>、<code>@GetMapping</code> 標記意圖。框架讀到標記後，<b>替你完成註冊與分派</b>。</p>
      <p class="tc-xs tc-mute" style="margin-top:2px">把「手動註冊」改成「宣告規則」</p>
    </div>
  </div>
</div>

<div class="tc-note tc-note--accent" style="margin-top:14px">
  <div class="tc-note__t">第 10 點會看到三件事同時發生</div>
  <div class="tc-note__b">類別放進框架會掃描的位置，框架就能找到它；標記告訴框架它的角色；需要的物件則由框架建立並傳入。</div>
</div>

---
layout: default
---

<div class="tc-head">
  <div class="tc-kicker">08 · 前後端如何溝通</div>
  <h1 class="tc-h1">前後端如何溝通</h1>
</div>

<div class="tc-note tc-note--accent">
  <div class="tc-note__t">一句話</div>
  <div class="tc-note__b">前端發出<b>HTTP 請求</b>，後端回<b>HTTP 回應</b>。來回幾個來回就結束。<b class="tc-warn">就這樣，沒有別的了。</b></div>
</div>

<div class="tc-grid tc-grid--even" style="margin-top:16px;max-width:620px">
  <div class="tc-panel tc-panel--inset tc-col" style="align-items:center;gap:6px;padding:18px">
    <i class="ic ic-browser ic--xl tc-accent"></i>
    <b>前端</b>
    <span class="tc-xs tc-mute">用 <code>fetch()</code> 發請求</span>
    <span class="tc-xs tc-mute">負責畫面</span>
  </div>
  <div class="tc-panel tc-panel--inset tc-col" style="align-items:center;gap:6px;padding:18px">
    <i class="ic ic-server ic--xl tc-accent"></i>
    <b>後端</b>
    <span class="tc-xs tc-mute">用 <code>HttpExchange</code> 收</span>
    <span class="tc-xs tc-mute">負責邏輯</span>
  </div>
</div>

<div class="tc-note tc-note--warn" style="margin-top:16px">
  <div class="tc-note__t">重點：前端「永遠不直接碰資料庫」。</div>
  <div class="tc-note__b">它只知道有個網址可以呼叫，資料怎麼存它不管。</div>
</div>

---
layout: default
---

<div class="tc-head tc-head--tight">
  <div class="tc-kicker">08 · 完整對話</div>
  <h1 class="tc-h1">一次下單的完整對話</h1>
</div>

<div class="tc-panel tc-panel--flush" style="width:fit-content;max-width:100%;margin:0 auto">
  <SequenceDiagram />
</div>

<p class="tc-xs tc-mute" style="margin-top:7px;text-align:center">狀態碼是後端給前端的「明確答案」，不是錯誤訊息</p>

---
layout: default
class: scroll-y no
---

<div class="tc-head tc-head--tight">
  <div class="tc-kicker">08 · 把圖翻成程式碼</div>
  <h1 class="tc-h1">把圖翻成程式碼</h1>
</div>

<div class="tc-row tc-row--center" style="gap:8px"><span class="tc-rowline__k">01</span><span class="tc-h2">前端：發請求</span></div>

```js
const response = await fetch("/api/products");
//            ↑ 圖上的 GET /api/products
if (!response.ok) {
  // ok 為 false 代表狀態碼是 4xx 或 5xx
  // 200/201 才會是 true
  throw new Error("讀取失敗");
}
const products = await response.json();
```

<p class="tc-xs tc-mute">↑ 回應對應圖上的「200 · application/json」</p>

<div class="tc-row tc-row--center" style="gap:8px;margin-top:10px"><span class="tc-rowline__k">02</span><span class="tc-h2">後端：Spring Boot 回傳</span></div>

```java
@GetMapping("/products")
public List<Product> products() {
    return products;
}
```

<p class="tc-xs tc-mute">↑ 框架把回傳值轉成 JSON，並送回 200 response</p>

<div class="tc-panel tc-panel--inset" style="margin-top:12px;padding:13px 16px">
  <div class="tc-row tc-row--center" style="gap:8px;padding-bottom:8px;border-bottom:1px solid var(--line)">
    <i class="ic ic-key ic--sm tc-accent"></i><b>最重要的一件事：<code>response.ok</code></b>
  </div>
  <div class="tc-grid tc-grid--even" style="margin-top:9px">
    <div class="tc-note tc-note--ok">
      <div class="tc-note__b"><code>response.ok === true</code><br>狀態碼 <b>200 ~ 299</b><br>→ 可以放心 <code>response.json()</code></div>
    </div>
    <div class="tc-note tc-note--err">
      <div class="tc-note__b"><code>response.ok === false</code><br>狀態碼 <b>400 以上</b>（含 3xx 跳轉）<br>→ <b>body 是錯誤訊息，不要當資料用</b></div>
    </div>
  </div>
  <p class="tc-xs tc-mute" style="margin-top:8px">這一行，就是第 5 點講的狀態碼在實務上「唯一重要」的用法。</p>
</div>

<div class="tc-note tc-note--warn" style="margin-top:10px">
  <div class="tc-note__t">最常見的 bug：忘了檢查 <code>ok</code>，直接 <code>await response.json()</code></div>
  <div class="tc-note__b">伺服器回 500 時，你會拿到一個錯誤物件，畫面上出現莫名其妙的 <code>undefined</code>。</div>
</div>

---
layout: default
class: scroll-y no
---

<div class="tc-head tc-head--tight">
  <div class="tc-kicker">09 · 借鑑後端 API</div>
  <h1 class="tc-h1">前端要怎麼「借鑑」後端的 API</h1>
</div>

<div class="tc-note tc-note--accent">
  <div class="tc-note__t">先理解一件事：API 沒有文件也能用</div>
  <div class="tc-note__b">後端寫好之後，你只要問三個問題，就知道怎麼接：</div>
</div>

<div class="tc-steps" style="margin-top:12px">
  <div class="tc-step"><div>
    <div class="tc-step__t">網址跟方法？</div>
    <div class="tc-step__d">直接讀後端程式碼裡的 <code>createContext("/api/products", ...)</code> 和 <code>if (!"GET".equals(...))</code></div>
  </div></div>
  <div class="tc-step"><div>
    <div class="tc-step__t">要送什麼進去？</div>
    <div class="tc-step__d">看 <code>form.get("productId")</code> — key 就是參數名，<code>parseForm</code> 決定格式是 form-urlencoded</div>
  </div></div>
  <div class="tc-step"><div>
    <div class="tc-step__t">會回什麼？</div>
    <div class="tc-step__d">看 <code>sendJson(ex, 200, ...)</code> 裡面那段字串 — <b>那就是你的 JSON schema</b></div>
  </div></div>
</div>

<div class="tc-panel tc-panel--inset" style="margin-top:12px;padding:12px 15px">
  <div class="tc-row tc-row--center" style="gap:8px;padding-bottom:7px;border-bottom:1px solid var(--line)">
    <i class="ic ic-bolt ic--sm tc-accent"></i><b>更快的辦法：直接用瀏覽器開發者工具</b>
  </div>
  <div class="tc-grid tc-grid--thirds" style="gap:6px 20px;margin-top:8px">
    <p class="tc-sm"><b class="tc-accent">1.</b> F12 開 DevTools</p>
    <p class="tc-sm"><b class="tc-accent">2.</b> 切到 Network 分頁</p>
    <p class="tc-sm"><b class="tc-accent">3.</b> 重新整理，看每一筆請求</p>
  </div>
  <p class="tc-xs tc-mute" style="margin-top:7px">Network 分頁會完整列出 <b>每一個 URL、狀態碼、request、response</b> — 這就是 API 的真相。</p>
</div>

<div class="tc-note tc-note--warn" style="margin-top:10px">
  <div class="tc-note__t">順帶一提：Day 2 的 Spring Boot 版是 JSON body，本課原生版是 form-urlencoded。</div>
  <div class="tc-note__b">格式不同，但<b>前端程式碼只有一行差異</b>（<code>body: data</code> vs <code>body: JSON.stringify(...)</code>）。這就是為什麼要先搞懂「格式」。</div>
</div>

---
layout: section
---

<div class="tc-ambient"></div>
<div class="tc-stage">
  <div class="tc-stage__main tc-in">
    <div class="tc-kicker tc-kicker--cmd" style="--i:0">$ mvn spring-boot:run<span class="tc-caret"></span></div>
    <h1 class="tc-display" style="--i:1;margin-top:14px"><em>配置</em>魔法</h1>
    <div class="tc-stage__rule" style="--i:2"></div>
    <p class="tc-lead tc-mono" style="--i:3;margin-top:20px">// 同一組 API，換一個寫法</p>
  </div>
  <div class="tc-stage__aside" style="align-self:center;width:100%">
    <div class="tc-stats tc-stats--2 tc-in" style="border-top:none">
      <div class="tc-stat" style="border-right:none;padding-right:0">
        <div class="tc-stat__v tc-err">189</div>
        <span class="tc-stat__k">原生 Java</span>
      </div>
      <div class="tc-stat" style="padding-left:0">
        <div class="tc-stat__v tc-ok">66</div>
        <span class="tc-stat__k">Spring Boot</span>
      </div>
    </div>
    <p class="tc-xs tc-mute" style="margin-top:8px">API 完全相同</p>
  </div>
</div>
<div class="tc-grain"></div>

---
layout: default
class: scroll-y no
---

<div class="tc-head tc-head--tight">
  <div class="tc-kicker">10 · Spring Boot</div>
  <h1 class="tc-h1">Spring Boot 怎麼啟動</h1>
</div>

<div class="tc-row tc-row--center" style="gap:8px"><span class="tc-rowline__k">01</span><span class="tc-h2">前提：裝好 JDK 17 以上 + Maven</span></div>

```bash
java -version    # 需要 17+
mvn -version     # 需要 3.8+
```

<p class="tc-xs tc-mute">沒裝 Maven？<a href="https://maven.apache.org/download.cgi" target="_blank">從官網抓 binary 壓縮檔</a>解壓後把 <code>bin</code> 加到 PATH。</p>

<div class="tc-row tc-row--center" style="gap:8px;margin-top:10px"><span class="tc-rowline__k">02</span><span class="tc-h2">啟動</span></div>

```bash
cd springboot

# 一行，會先下載依賴再啟動
mvn spring-boot:run
```

<p class="tc-xs tc-mute">第一次會比較慢（下載 jar）。看到 <code>Started Backend101Application</code> 就是好了。</p>

<div class="tc-row tc-row--center" style="gap:8px;margin-top:10px"><span class="tc-rowline__k">03</span><span class="tc-h2">想打包成 jar 檔再跑？</span></div>

```bash
mvn package
java -jar target/backend-101-1.0.0.jar
```

<div class="tc-note tc-note--warn" style="margin-top:12px">
  <div class="tc-note__t">記得先關掉上一個原生版伺服器</div>
  <div class="tc-note__b">兩個都佔 <code>8080</code> → 第二個會直接 <code class="tc-err">Address already in use</code>。這就是第 6 點講的撞號。</div>
</div>

---
layout: default
class: scroll-y no
---

<div class="tc-head tc-head--tight">
  <div class="tc-kicker">10 · 魔法在哪</div>
  <h1 class="tc-h1">整份 Controller</h1>
  <div class="tc-head__meta"><b>ProductController.java · 66 行</b> — Day 2 的 BuyProductApi.java 是 189 行</div>
</div>

```java
package com.birc.backend101;                    // 套件 → 對應到路徑，框架靠這個找

@RestController                                 // ① 「我是個 API 控制器」
@RequestMapping("/api")                         // ② 這個類別的網址都掛在 /api 底下
@CrossOrigin(origins = "*")
public class ProductController {

    private final List<Product> products = ...;  // 資料照舊是記憶體

    @GetMapping("/products")                     // ③ GET /api/products
    public List<Product> products() {
        return products;                         //    回傳物件，JSON 自動生成
    }

    @PostMapping("/buy")                         // ④ POST /api/buy
    public synchronized ResponseEntity<?> buy(
            @RequestBody BuyRequest request) {   // ⑤ body 自動綁成物件
        int id = request.productId();
        if (id < 1 || id > products.size())
            return ResponseEntity.badRequest()   // ⑥ 一行 = 400
                    .body(new ErrorResponse("商品與數量必須是正整數"));
        return ResponseEntity.ok(new MessageResponse("購買成功"));
    }
}
```

<div class="tc-note tc-note--accent" style="margin-top:12px">
  <div class="tc-note__t">看不懂的標記先記下來，等下逐個拆</div>
  <div class="tc-note__b"><code>@RestController</code> <code>@RequestMapping</code> <code>@GetMapping</code> <code>@PostMapping</code> <code>@RequestBody</code> <code>ResponseEntity</code></div>
</div>

---
layout: default
class: scroll-y
---

<div class="tc-head tc-head--tight">
  <div class="tc-kicker">10 · 配置魔法</div>
  <h1 class="tc-h1">框架幫你做了什麼</h1>
</div>

<div class="tc-rows">
  <div class="tc-rowline" style="grid-template-columns:200px 1fr;padding:10px 0">
    <code class="tc-rowline__k tc-xs">package + 資料夾結構</code>
    <span class="tc-rowline__v tc-xs">編譯器與類別載入器的慣例：<b>套件名必須對應資料夾</b>。所以 <code>com.birc.backend101</code> 必須在 <code>com/birc/backend101/</code> — Spring 靠它自動掃描。放錯就找不到。</span>
  </div>
  <div class="tc-rowline" style="grid-template-columns:200px 1fr;padding:10px 0">
    <code class="tc-rowline__k tc-xs">@RestController</code>
    <span class="tc-rowline__v tc-xs">= 「這個類別的方法，回傳值直接變成 HTTP 回應 body」。<b>取代了手動呼叫 sendJson</b>。它 = <code>@Controller</code> + <code>@ResponseBody</code>。</span>
  </div>
  <div class="tc-rowline" style="grid-template-columns:200px 1fr;padding:10px 0">
    <code class="tc-rowline__k tc-xs">@RequestMapping("/api")</code>
    <span class="tc-rowline__v tc-xs">這一行<b>取代了 createContext 註冊</b>。整個類別的網址前綴。</span>
  </div>
  <div class="tc-rowline" style="grid-template-columns:200px 1fr;padding:10px 0">
    <code class="tc-rowline__k tc-xs">@GetMapping("/products")</code>
    <span class="tc-rowline__v tc-xs">組出 <code>GET /api/products</code>。<b>HTTP 方法與路徑合在一個註解裡</b>。</span>
  </div>
  <div class="tc-rowline" style="grid-template-columns:200px 1fr;padding:10px 0">
    <code class="tc-rowline__k tc-xs">@RequestBody</code>
    <span class="tc-rowline__v tc-xs">自動讀 body、解析 JSON、<b>塞進你的物件</b>。取代了 <code>readAllBytes()</code> + <code>parseForm()</code> + <code>getOrDefault()</code>，且 body 從 form 格式換成 JSON。</span>
  </div>
  <div class="tc-rowline" style="grid-template-columns:200px 1fr;padding:10px 0">
    <code class="tc-rowline__k tc-xs">ResponseEntity.ok(...)</code>
    <span class="tc-rowline__v tc-xs"><code>ok()</code> = 200、<code>badRequest()</code> = 400、<code>ResponseEntity.status(409)</code> = 409。<b>一行搞定狀態碼 + body</b>。</span>
  </div>
</div>

---
layout: default
class: scroll-y
---

<div class="tc-head tc-head--tight">
  <div class="tc-kicker">10 · 公平比較</div>
  <h1 class="tc-h1">不是 Spring Boot 永遠比較好</h1>
</div>

<table>
<thead>
<tr>
  <th>如果你要…</th>
  <th>用原生 Java</th>
  <th>用 Spring Boot</th>
</tr>
</thead>
<tbody>
<tr><td>教學、做作業</td><td class="tc-ok"><i class="ic ic-check ic--sm"></i> 看得懂每一步</td><td class="tc-mute"><i class="ic ic-cross ic--sm"></i> 黑箱太多</td></tr>
<tr><td>競賽限時 3 小時</td><td class="tc-ok"><i class="ic ic-check ic--sm"></i> 零依賴不會壞</td><td class="tc-mute"><i class="ic ic-cross ic--sm"></i> 設定錯誤就開不起來</td></tr>
<tr><td>做真的產品</td><td class="tc-err"><i class="ic ic-cross ic--sm"></i> 你會重寫到哭</td><td class="tc-ok"><i class="ic ic-check ic--sm"></i> 別人都在用</td></tr>
<tr><td>團隊 5 人以上</td><td class="tc-err"><i class="ic ic-cross ic--sm"></i> 樣板碼不一致</td><td class="tc-ok"><i class="ic ic-check ic--sm"></i> 大家寫法統一</td></tr>
<tr><td>需要驗證/ORM/快取</td><td class="tc-err"><i class="ic ic-cross ic--sm"></i> 全部自己刻</td><td class="tc-ok"><i class="ic ic-check ic--sm"></i> 一個 annotation</td></tr>
</tbody>
</table>

<div class="tc-note tc-note--warn" style="margin-top:14px">
  <div class="tc-note__t">回到第 7 點的問題：為什麼要有框架？</div>
  <div class="tc-note__b">不是因為框架比較聰明。是因為<b>那些麻煩事（序列化、路由、連線、序列化 JSON）每一個專案都會遇到，而且解法都一樣。</b>把重複的解法抽出來，就是框架。<br>框架的價值不是「少寫幾行」，是<b>「不用每次都重新想一次」</b>。</div>
</div>

<div class="tc-note tc-note--accent" style="margin-top:10px">
  <div class="tc-note__t">所以框架的前提是：你已經知道它在做什麼。</div>
  <div class="tc-note__b">今天這堂課的順序（先原生、再框架）不是巧合。</div>
</div>

---
layout: default
class: scroll-y
---

<div class="tc-head tc-head--tight">
  <div class="tc-kicker">CHECKPOINT 04</div>
  <h1 class="tc-h1">全課總複習</h1>
</div>

<div class="tc-grid tc-grid--thirds" style="gap:12px 26px">
  <div class="tc-col">
    <div class="tc-row tc-row--center" style="gap:7px;padding-bottom:5px;border-bottom:1px solid var(--line)"><i class="ic ic-net ic--sm tc-accent"></i><b class="tc-sm">網路</b></div>
    <div class="tc-list">
      <div class="tc-list__i">TCP/IP 四層：線路包話</div>
      <div class="tc-list__i">DNS：名字 → IP</div>
      <div class="tc-list__i">HTTP：request / response</div>
      <div class="tc-list__i">無狀態的意思</div>
    </div>
  </div>
  <div class="tc-col">
    <div class="tc-row tc-row--center" style="gap:7px;padding-bottom:5px;border-bottom:1px solid var(--line)"><i class="ic ic-signal ic--sm tc-accent"></i><b class="tc-sm">狀態碼</b></div>
    <div class="tc-list">
      <div class="tc-list__i">200 成功 / 201 建立了東西</div>
      <div class="tc-list__i">400 請求壞了</div>
      <div class="tc-list__i">401 不知道你是誰</div>
      <div class="tc-list__i">403 知道但你不能</div>
      <div class="tc-list__i">404 不存在</div>
      <div class="tc-list__i">500 伺服器壞了</div>
    </div>
  </div>
  <div class="tc-col">
    <div class="tc-row tc-row--center" style="gap:7px;padding-bottom:5px;border-bottom:1px solid var(--line)"><i class="ic ic-door ic--sm tc-accent"></i><b class="tc-sm">Port</b></div>
    <div class="tc-list">
      <div class="tc-list__i">16 位元，0~65535</div>
      <div class="tc-list__i">唯一性限於同一個 IP</div>
      <div class="tc-list__i">撞號 → BindException</div>
      <div class="tc-list__i">3306 / 8080 / 6379</div>
    </div>
  </div>
  <div class="tc-col">
    <div class="tc-row tc-row--center" style="gap:7px;padding-bottom:5px;border-bottom:1px solid var(--line)"><i class="ic ic-tool ic--sm tc-accent"></i><b class="tc-sm">框架</b></div>
    <div class="tc-list">
      <div class="tc-list__i">它呼叫你，不是你呼叫它</div>
      <div class="tc-list__i">控制反轉（IoC）— 說明這個現象的原則</div>
      <div class="tc-list__i">約定優於配置</div>
      <div class="tc-list__i">135 → 46 行</div>
    </div>
  </div>
  <div class="tc-col">
    <div class="tc-row tc-row--center" style="gap:7px;padding-bottom:5px;border-bottom:1px solid var(--line)"><i class="ic ic-exchange ic--sm tc-accent"></i><b class="tc-sm">溝通</b></div>
    <div class="tc-list">
      <div class="tc-list__i">前端不直接碰資料庫</div>
      <div class="tc-list__i">response.ok 怎麼用</div>
      <div class="tc-list__i">從程式碼推 API 規格</div>
    </div>
  </div>
</div>

<div class="tc-note tc-note--warn" style="margin-top:10px">
  <div class="tc-note__t">如果只能記一件事：框架的價值是「不用每次重新想一次」。</div>
  <div class="tc-note__b">知道它在做什麼，你才有能力判斷什麼時候該用、什麼時候該自己刻。</div>
</div>

---
layout: center
---

<div class="tc-ambient"></div>
<div class="tc-stage tc-stage--center">
  <div class="tc-stage__main tc-in">
    <div class="tc-kicker tc-kicker--cmd" style="--i:0">$ echo $?<span class="tc-caret"></span></div>
    <h1 class="tc-display tc-display--sm" style="--i:1;margin-top:14px"><em>下課</em></h1>
    <div class="tc-stage__rule" style="--i:2"></div>
    <p class="tc-lead" style="--i:3;margin-top:20px">你現在可以解釋網路怎麼跑、狀態碼代表什麼、以及框架到底解決了什麼。這就是後端的真實面貌。</p>
    <div class="tc-rows" style="--i:4;margin-top:26px;max-width:460px">
      <div class="tc-rowline" style="grid-template-columns:78px 1fr"><span class="tc-rowline__n">回家複習</span><span class="tc-rowline__v tc-sm"><code>localhost:8080</code> 的 Port 那一頁</span></div>
    </div>
    <p class="tc-xs tc-mute" style="--i:5;margin-top:22px">LucasHsu.dev — 2026 商智中心後端群體驗營</p>
  </div>
</div>
<div class="tc-grain"></div>
