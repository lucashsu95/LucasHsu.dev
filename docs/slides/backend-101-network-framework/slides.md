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
  sans: "Inter, PingFang TC, Noto Sans TC, sans-serif"
  mono: "JetBrains Mono, Fira Code, PingFang TC, Noto Sans TC, monospace"
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

<div class="cover-glow"></div>
<div class="relative z-10 flex flex-col items-center justify-center h-full">
  <div v-motion :initial="{ y: -20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 200, duration: 500 } }" class="text-center">
    <img src="./birc.webp" class="h-16 mx-auto mb-3" alt="BIRC Logo" />
  </div>
  <h1 v-motion :initial="{ y: 30, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 350, duration: 500 } }" class="text-5xl font-bold text-center">
    <span class="text-[#3B82F6]">BIRC 商智中心</span>
  </h1>
  <p v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 500, duration: 500 } }" class="text-lg text-gray-400 mt-2 text-center">
    Business Intelligence Center — 推動校園數位人才培育
  </p>
  <p v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { delay: 1000, duration: 400 } }" class="mt-6 text-xs text-gray-600">
    2026 後端群體驗營
  </p>
</div>

---
layout: cover
transition: slide-left
---

<div class="cover-glow"></div>
<div class="relative z-10">
  <div v-motion :initial="{ y: -20, opacity: 0 }" :enter="{ y: 0, opacity: 1 }" class="kicker">$ curl http://localhost:8080/api/products</div>
  <h1 v-motion :initial="{ y: 24, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 180 } }">
    <span class="text-[#3B82F6]">Backend</span> <span class="text-white">101</span>
  </h1>
  <p class="text-xl text-gray-300 mt-4 font-mono">// 網路怎麼跑 · 狀態碼 · Port · 框架的魔法</p>
  <div class="mt-14 grid grid-cols-3 gap-5 text-sm">
    <div class="concept-card blue"><b>看得見的請求</b><br><span>TCP/IP、HTTP、Port</span></div>
    <div class="concept-card green"><b>讀得懂的回應</b><br><span>200 / 400 / 409 / 500</span></div>
    <div class="concept-card amber"><b>框架的真相</b><br><span>它替你省了什麼</span></div>
  </div>
</div>

<!--
全課約 50 分鐘。
節奏：1-5 點是「看懂」，6-8 點是「想懂」，9-10 點是「動手」。
第 7 點「什麼是框架」是本課重點，會花的時間最多。
-->

---
layout: default
---

# 📋 今天會講什麼

<div class="mt-5 space-y-2.5">

<div class="flex items-center gap-4 p-3.5 rounded-lg bg-[#1E293B]">
  <span class="text-[#3B82F6] font-mono text-sm w-8">01</span>
  <div><b class="text-[#3B82F6]">系列規劃與介紹</b>
  <p class="text-gray-400 text-xs mt-0.5">我們在哪裡、要往哪裡走</p></div>
  <span class="ml-auto text-gray-500 font-mono text-xs">2 min</span>
</div>

<div class="flex items-center gap-4 p-3.5 rounded-lg bg-[#1E293B]">
  <span class="text-[#3B82F6] font-mono text-sm w-8">02</span>
  <div><b class="text-[#3B82F6]">常見網站應用</b>
  <p class="text-gray-400 text-xs mt-0.5">你每天都在用的東西</p></div>
  <span class="ml-auto text-gray-500 font-mono text-xs">2 min</span>
</div>

<div class="flex items-center gap-4 p-3.5 rounded-lg bg-[#1E293B]">
  <span class="text-[#3B82F6] font-mono text-sm w-8">03</span>
  <div><b class="text-[#3B82F6]">五大面向拆解網站應用</b>
  <p class="text-gray-400 text-xs mt-0.5">一個網站到底由什麼組成</p></div>
  <span class="ml-auto text-gray-500 font-mono text-xs">2 min</span>
</div>

<div class="flex items-center gap-4 p-3.5 rounded-lg bg-[#1E293B]">
  <span class="text-[#3B82F6] font-mono text-sm w-8">04</span>
  <div><b class="text-[#3B82F6]">網路是如何運作的</b>
  <p class="text-gray-400 text-xs mt-0.5">TCP/IP 四層 · 應用層協議 · HTTP</p></div>
  <span class="ml-auto text-gray-500 font-mono text-xs">3 min</span>
</div>

<div class="flex items-center gap-4 p-3.5 rounded-lg bg-[#1E293B]">
  <span class="text-[#3B82F6] font-mono text-sm w-8">05</span>
  <div><b class="text-[#3B82F6]">HTTP 狀態碼</b>
  <p class="text-gray-400 text-xs mt-0.5">200 · 201 · 400 · 401 · 403 · 404 · 500</p></div>
  <span class="ml-auto text-gray-500 font-mono text-xs">5 min</span>
</div>

<div class="flex items-center gap-4 p-3.5 rounded-lg bg-[#1E293B] border border-[#F59E0B]/40">
  <span class="text-[#F59E0B] font-mono text-sm w-8">06</span>
  <div><b class="text-[#F59E0B]">Port 號</b>
  <p class="text-gray-400 text-xs mt-0.5">3306 · 8080 · 為什麼會撞號</p></div>
  <span class="ml-auto text-gray-500 font-mono text-xs">4 min</span>
</div>

<div class="flex items-center gap-4 p-3.5 rounded-lg bg-[#1E293B] border border-[#F59E0B]/50">
  <span class="text-[#F59E0B] font-mono text-sm w-8">07</span>
  <div><b class="text-[#F59E0B]">什麼是框架 ★</b>
  <p class="text-gray-400 text-xs mt-0.5">本課重點：定義 → 為何需要 → 對比</p></div>
  <span class="ml-auto text-[#F59E0B] font-mono text-xs">6 min</span>
</div>

<div class="flex items-center gap-4 p-3.5 rounded-lg bg-[#1E293B]">
  <span class="text-[#3B82F6] font-mono text-sm w-8">08</span>
  <div><b class="text-[#3B82F6]">前後端如何溝通</b>
  <p class="text-gray-400 text-xs mt-0.5">一張循序圖看懂整個對話</p></div>
  <span class="ml-auto text-gray-500 font-mono text-xs">5 min</span>
</div>

<div class="flex items-center gap-4 p-3.5 rounded-lg bg-[#1E293B]">
  <span class="text-[#3B82F6] font-mono text-sm w-8">09</span>
  <div><b class="text-[#3B82F6]">小小體驗一下</b>
  <p class="text-gray-400 text-xs mt-0.5">原生 Java 當後端</p></div>
  <span class="ml-auto text-gray-500 font-mono text-xs">8 min</span>
</div>

<div class="flex items-center gap-4 p-3.5 rounded-lg bg-[#1E293B]">
  <span class="text-[#3B82F6] font-mono text-sm w-8">10</span>
  <div><b class="text-[#3B82F6]">框架的配置魔法</b>
  <p class="text-gray-400 text-xs mt-0.5">同樣的 API，Spring Boot 版</p></div>
  <span class="ml-auto text-gray-500 font-mono text-xs">6 min</span>
</div>

</div>

<div class="callout amber mt-5">💡 <b>前 5 點是「看懂」，6-8 點是「想懂」，9-10 點是「動手」</b> — 最後兩點請務必打開終端機跟著做。</div>

---
layout: default
---

# 🔄 先回顧一下：Day 2 我們做到了什麼

<div class="grid grid-cols-2 gap-5 mt-6">

<div class="p-5 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30">
  <h3 class="text-[#3B82F6] font-bold text-lg mb-3">📦 Day 2 的成果</h3>
  <ul class="space-y-1.5 text-gray-300 text-sm">
    <li>✓ 用陣列存商品資料</li>
    <li>✓ 用 JDBC 連 SQLite 資料庫</li>
    <li>✓ 用 <code>HttpServer</code> 開了一個 API</li>
    <li>✓ 用 <code>fetch()</code> 讓瀏覽器呼叫它</li>
  </ul>
</div>

<div class="p-5 rounded-lg bg-[#1E293B] border border-[#F59E0B]/30">
  <h3 class="text-[#F59E0B] font-bold text-lg mb-3">❓ 你可能答不出來的問題</h3>
  <ul class="space-y-1.5 text-gray-300 text-sm">
    <li>• 瀏覽器和 Java 是「怎麼」連上的？</li>
    <li>• <code>8080</code> 這個數字代表什麼？</li>
    <li>• 為什麼有的請求回 200、有的回 404？</li>
    <li>• 我寫的那 189 行，有人在幫我做事嗎？</li>
  </ul>
</div>

</div>

<div class="callout mt-6">🎯 <b>今天就是來回答這四個問題的。</b></div>

---
layout: default
---

# 🌍 常見網站應用 — 你每天都在用

<div class="grid grid-cols-3 gap-4 mt-6">

<div class="concept-card blue text-center">
  <div class="text-3xl mb-2">🍜</div>
  <b class="text-[#3B82F6] text-lg"> foodpanda</b>
  <p class="text-gray-400 text-xs mt-2">瀏覽餐廳 → 購物車 → 下單<br>背後：菜單 API、庫存 API、訂單 API</p>
</div>

<div class="concept-card green text-center">
  <div class="text-3xl mb-2">🎬</div>
  <b class="text-[#10B981] text-lg">YouTube</b>
  <p class="text-gray-400 text-xs mt-2">看影片、留言、推薦<br>背後：影片 API、推薦演算法、CDN</p>
</div>

<div class="concept-card amber text-center">
  <div class="text-3xl mb-2">🏦</div>
  <b class="text-[#F59E0B] text-lg">網路銀行</b>
  <p class="text-gray-400 text-xs mt-2">查餘額、轉帳、對帳<br>背後：驗證、加密、稽核日誌</p>
</div>

<div class="concept-card purple text-center">
  <div class="text-3xl mb-2">💬</div>
  <b class="text-[#8B5CF6] text-lg">LINE</b>
  <p class="text-gray-400 text-xs mt-2">傳訊息、語音、通知<br>背後：長連線、推播、訊息佇列</p>
</div>

<div class="concept-card blue text-center">
  <div class="text-3xl mb-2">🛒</div>
  <b class="text-[#3B82F6] text-lg">蝦皮</b>
  <p class="text-gray-400 text-xs mt-2">搜尋商品、下單、付款<br>背後：搜尋引擎、金流、推薦</p>
</div>

<div class="concept-card red text-center">
  <div class="text-3xl mb-2">📦</div>
  <b class="text-[#EF4444] text-lg">宅配</b>
  <p class="text-gray-400 text-xs mt-2">查包裹、通知送貨<br>背後：物流 API、Webhook</p>
</div>

</div>

<div class="callout mt-5">💡 <b>它們長得很不一樣，但拆開來都是同一種結構：</b>一個畫面 + 一堆後端 + 一堆資料。</div>

---
layout: default
class: scroll-y
---

# 🧩 五大面向拆解網站應用

<div class="mt-4 space-y-2.5 text-sm">

<div class="flex gap-4 p-3.5 rounded-lg bg-[#1E293B] border-l-4 border-[#3B82F6]">
  <span class="text-2xl">🖥️</span>
  <div>
    <b class="text-[#3B82F6] text-base">前端 Frontend — 使用者看到的</b>
    <p class="text-gray-400 text-xs mt-1">HTML 結構、CSS 樣式、JavaScript 互動。跑在<b class="text-white">使用者的瀏覽器</b>裡，伺服器只送程式碼。</p>
  </div>
</div>

<div class="flex gap-4 p-3.5 rounded-lg bg-[#1E293B] border-l-4 border-[#10B981]">
  <span class="text-2xl">⚙️</span>
  <div>
    <b class="text-[#10B981] text-base">後端 Backend — 使用者看不到的</b>
    <p class="text-gray-400 text-xs mt-1">收請求、驗證、算錢、動資料。跑在<b class="text-white">伺服器</b>裡，你看不到但它一直在運作。</p>
  </div>
</div>

<div class="flex gap-4 p-3.5 rounded-lg bg-[#1E293B] border-l-4 border-[#F59E0B]">
  <span class="text-2xl">🗄️</span>
  <div>
    <b class="text-[#F59E0B] text-base">資料庫 Database — 記憶體之外的記憶</b>
    <p class="text-gray-400 text-xs mt-1">MySQL、PostgreSQL、SQLite、MongoDB。程式關掉、機器重開，資料還在。</p>
  </div>
</div>

<div class="flex gap-4 p-3.5 rounded-lg bg-[#1E293B] border-l-4 border-[#8B5CF6]">
  <span class="text-2xl">🌐</span>
  <div>
    <b class="text-[#8B5CF6] text-base">網路 Network — 把它們連起來</b>
    <p class="text-gray-400 text-xs mt-1">TCP/IP、HTTP、DNS。瀏覽器要能找到伺服器、要能問它要資料。</p>
  </div>
</div>

<div class="flex gap-4 p-3.5 rounded-lg bg-[#1E293B] border-l-4 border-[#EF4444]">
  <span class="text-2xl">🧰</span>
  <div>
    <b class="text-[#EF4444] text-base">框架 Framework — 別人幫你做的事</b>
    <p class="text-gray-400 text-xs mt-1">Spring Boot、Express、Django。<b class="text-white">今天的重點就在這裡。</b></p>
  </div>
</div>

</div>

<div class="callout amber mt-4">🎯 <b>Day 2 我們已經把 1、2、5 碰過了。</b>今天補上 3 和 4，然後認真回答第 5 個。</div>

---
layout: default
---

# 🔍 你每天用的網站，拆開長這樣

<div class="grid grid-cols-3 gap-4 mt-8 items-center text-center">

<div class="concept-card blue">
  <div class="text-3xl mb-2">🖥️</div>
  <b class="text-[#3B82F6]">瀏覽器</b>
  <p class="text-gray-400 text-xs mt-2">顯示畫面<br>送出請求</p>
</div>

<div class="text-2xl text-[#F59E0B]">⟷</div>

<div class="concept-card green">
  <div class="text-3xl mb-2">⚙️</div>
  <b class="text-[#10B981]">後端伺服器</b>
  <p class="text-gray-400 text-xs mt-2">收請求<br>執行邏輯</p>
</div>

<div class="text-2xl text-[#F59E0B]">⟷</div>

<div class="concept-card amber">
  <div class="text-3xl mb-2">🗄️</div>
  <b class="text-[#F59E0B]">資料庫</b>
  <p class="text-gray-400 text-xs mt-2">保存商品<br>使用者資料</p>
</div>

</div>

<div class="mt-8 p-4 rounded-lg bg-[#1E293B]">
  <b class="text-[#3B82F6]">在中間那三個雙向箭頭上，發生的是：</b>
  <div class="grid grid-cols-2 gap-3 mt-3 text-sm">
    <p class="text-gray-300">· <b class="text-white">HTTP 協定</b> — 兩邊說話的規則</p>
    <p class="text-gray-300">· <b class="text-white">Port 號</b> — 找到正確的那台服務</p>
    <p class="text-gray-300">· <b class="text-white">TCP/IP</b> — 資料怎麼在網路上跑</p>
    <p class="text-gray-300">· <b class="text-white">狀態碼</b> — 這次請求的結果</p>
  </div>
</div>

<div class="callout mt-5">🎯 接下來三節，把這四個詞講清楚。</div>

---
layout: default
---

# 📦 網路是如何運作的 — 從瀏覽器到伺服器

<div class="mt-6 space-y-2.5 text-sm">

<div class="flex gap-4 items-center p-3 rounded-lg bg-[#1E293B]">
  <span class="text-[#3B82F6] font-mono w-24 shrink-0">1. 輸入網址</span>
  <span class="text-gray-300">你在瀏覽器打 <code>lucashsu.dev</code>，按 Enter</span>
</div>

<div class="flex gap-4 items-center p-3 rounded-lg bg-[#1E293B]">
  <span class="text-[#3B82F6] font-mono w-24 shrink-0">2. DNS 查詢</span>
  <span class="text-gray-300">問 DNS 伺服器：「<code>lucashsu.dev</code> 的 IP 是多少？」→ <code>140.82.121.4</code></span>
</div>

<div class="flex gap-4 items-center p-3 rounded-lg bg-[#1E293B]">
  <span class="text-[#3B82F6] font-mono w-24 shrink-0">3. 連線</span>
  <span class="text-gray-300">TCP 三次握手，建立到 <code>140.82.121.4:443</code> 的連線</span>
</div>

<div class="flex gap-4 items-center p-3 rounded-lg bg-[#1E293B]">
  <span class="text-[#3B82F6] font-mono w-24 shrink-0">4. 送請求</span>
  <span class="text-gray-300">送出 HTTP 請求：<code>GET /index.html HTTP/1.1</code></span>
</div>

<div class="flex gap-4 items-center p-3 rounded-lg bg-[#1E293B]">
  <span class="text-[#3B82F6] font-mono w-24 shrink-0">5. 收回應</span>
  <span class="text-gray-300">伺服器回 <code>200 OK</code> + HTML，瀏覽器畫出來</span>
</div>

</div>

<div class="callout mt-5">💡 <b>DNS 負責「名字 → IP」，HTTP 負責「問什麼、要什麼」。</b>兩件事，別搞混。</div>

---
layout: default
class: scroll-y
---

# 🏗️ TCP/IP 四層模型

<div class="mt-3 space-y-2 text-sm">

<div class="p-3.5 rounded-lg bg-[#1E293B] border-l-4 border-[#EF4444]">
  <div class="flex items-baseline gap-3">
    <b class="text-[#EF4444] text-base">4. 應用層 Application</b>
    <span class="text-gray-500 text-xs">你寫的程式在這層</span>
  </div>
  <p class="text-gray-400 text-xs mt-1.5">HTTP、HTTPS、DNS、SMTP、FTP、SSH — 定義「訊息長什麼樣、怎麼問怎麼答」</p>
  <p class="text-[#EF4444] text-xs mt-1">👈 <b>今天上課的每一行 Java 程式碼都在這裡</b></p>
</div>

<div class="p-3.5 rounded-lg bg-[#1E293B] border-l-4 border-[#F59E0B]">
  <div class="flex items-baseline gap-3">
    <b class="text-[#F59E0B] text-base">3. 傳輸層 Transport</b>
    <span class="text-gray-500 text-xs">用 Port 號分流</span>
  </div>
  <p class="text-gray-400 text-xs mt-1.5">TCP（可靠、慢、要握手）、UDP（不可靠、快）。<code>80</code>、<code>443</code>、<code>3306</code>、<code>8080</code> 都是這層的門牌</p>
  <p class="text-[#F59E0B] text-xs mt-1">👈 <b>第 6 點講的 Port 號在這裡</b></p>
</div>

<div class="p-3.5 rounded-lg bg-[#1E293B] border-l-4 border-[#3B82F6]">
  <div class="flex items-baseline gap-3">
    <b class="text-[#3B82F6] text-base">2. 網際網路層 Internet</b>
  </div>
  <p class="text-gray-400 text-xs mt-1.5">IP 協定。負責「把封包送到全世界的正確地址」。<code>140.82.121.4</code> 就是 IP</p>
</div>

<div class="p-3.5 rounded-lg bg-[#1E293B] border-l-4 border-[#10B981]">
  <div class="flex items-baseline gap-3">
    <b class="text-[#10B981] text-base">1. 網路存取層 Network Access</b>
  </div>
  <p class="text-gray-400 text-xs mt-1.5">網路線、Wi-Fi、网卡。負責「在這條線上正確地傳位元組」</p>
</div>

</div>

<div class="callout mt-4">🎯 <b>記憶法：從下往上 — 「線、路、包、話」</b><br>
網線 → IP 找到路 → TCP 找對門 → HTTP 說對話</div>

---
layout: default
class: scroll-y
---

# 📬 常見的應用層協議

<div class="grid grid-cols-2 gap-3.5 mt-4 text-sm">

<div class="p-3.5 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30">
  <div class="flex items-center gap-2"><span class="font-mono text-[#3B82F6]">HTTP</span><span class="text-gray-500 text-xs">80</span></div>
  <p class="text-gray-400 text-xs mt-1.5">網頁。request / response，狀態碼，<b class="text-white">無狀態</b></p>
</div>

<div class="p-3.5 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30">
  <div class="flex items-center gap-2"><span class="font-mono text-[#3B82F6]">HTTPS</span><span class="text-gray-500 text-xs">443</span></div>
  <p class="text-gray-400 text-xs mt-1.5">加密的 HTTP。瀏覽器網址列的鎖就是它</p>
</div>

<div class="p-3.5 rounded-lg bg-[#1E293B] border border-[#10B981]/30">
  <div class="flex items-center gap-2"><span class="font-mono text-[#10B981]">DNS</span><span class="text-gray-500 text-xs">53</span></div>
  <p class="text-gray-400 text-xs mt-1.5">名字查 IP。名字給人看，IP 給機器用</p>
</div>

<div class="p-3.5 rounded-lg bg-[#1E293B] border border-[#10B981]/30">
  <div class="flex items-center gap-2"><span class="font-mono text-[#10B981]">SSH</span><span class="text-gray-500 text-xs">22</span></div>
  <p class="text-gray-400 text-xs mt-1.5">遠端登入伺服器。你連上主機就是走它</p>
</div>

<div class="p-3.5 rounded-lg bg-[#1E293B] border border-[#F59E0B]/30">
  <div class="flex items-center gap-2"><span class="font-mono text-[#F59E0B]">FTP / SFTP</span><span class="text-gray-500 text-xs">21 / 22</span></div>
  <p class="text-gray-400 text-xs mt-1.5">傳檔案。早期上傳網站必用</p>
</div>

<div class="p-3.5 rounded-lg bg-[#1E293B] border border-[#F59E0B]/30">
  <div class="flex items-center gap-2"><span class="font-mono text-[#F59E0B]">SMTP / IMAP</span><span class="text-gray-500 text-xs">25 / 143</span></div>
  <p class="text-gray-400 text-xs mt-1.5">寄信 / 收信。Gmail 背後就是這兩個</p>
</div>

<div class="p-3.5 rounded-lg bg-[#1E293B] border border-[#8B5CF6]/30">
  <div class="flex items-center gap-2"><span class="font-mono text-[#8B5CF6]">MySQL</span><span class="text-gray-500 text-xs">3306</span></div>
  <p class="text-gray-400 text-xs mt-1.5">資料庫。<b class="text-white">嚴格來說不算 HTTP 那一類</b>，但同樣是「應用層協議」</p>
</div>

<div class="p-3.5 rounded-lg bg-[#1E293B] border border-[#EF4444]/30">
  <div class="flex items-center gap-2"><span class="font-mono text-[#EF4444]">Redis</span><span class="text-gray-500 text-xs">6379</span></div>
  <p class="text-gray-400 text-xs mt-1.5">快取。Day 2 我們完全沒用到它</p>
</div>

</div>

<div class="callout mt-4">💡 <b>注意 MySQL 和 Redis 的 port 不在 HTTP 的家族裡</b> — 它們是「別的服務」，只是剛好也住在同一台機器上。</div>

---
layout: default
class: scroll-y
---

# 📨 HTTP 到底長什麼樣

<div class="grid grid-cols-2 gap-5 mt-4">

<div>
  <b class="text-[#3B82F6] text-base">📤 請求 Request（前端 → 後端）</b>
</div>

<div>
  <b class="text-[#10B981] text-base">📥 回應 Response（後端 → 前端）</b>
</div>

</div>

```http {all}
GET /api/products HTTP/1.1
Host: localhost:8080
Accept: application/json
```

```http {all}
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 252
```

<div class="grid grid-cols-2 gap-5 mt-3">
  <p class="text-gray-400 text-xs">第一行叫<b class="text-white">起始行</b>：方法 + 路徑 + 版本</p>
  <p class="text-gray-400 text-xs">第一行先寫版本，再寫<b class="text-white">狀態碼</b> + 原因片語</p>
</div>

<div class="mt-5 p-4 rounded-lg bg-[#1E293B]">
  <b class="text-[#F59E0B]">我們昨天寫的那行程式碼，就是在做這件事：</b>
  <div class="mt-3 space-y-1.5 text-sm text-gray-300 font-mono">
    <p><code>server.createContext("/api/products", ...)</code> <span class="text-gray-500">← 對應 URL 路徑</span></p>
    <p><code>exchange.getRequestMethod()</code> <span class="text-gray-500">← 對應 GET / POST</span></p>
    <p><code>sendJson(exchange, 200, ...)</code> <span class="text-gray-500">← 對應狀態碼 + body</span></p>
  </div>
</div>

<div class="callout mt-4">🎯 <b>HTTP 是「無狀態」协议</b> — 伺服器不會記得上一個請求。這是為什麼需要登入 token、cookie、session。</div>

---
layout: default
---

# ✅ 檢查點 1 — 網路與 HTTP

<div class="grid grid-cols-3 gap-4 mt-6">

<div class="p-4 rounded-lg bg-[#1E293B] border border-[#10B981]/30">
  <b class="text-[#10B981] text-lg">✓ 我能說出</b>
  <ul class="text-gray-300 text-sm mt-2 space-y-1">
    <li>• DNS 做的事</li>
    <li>• TCP/IP 四層由下往上是什麼</li>
    <li>• HTTP 請求有哪幾個部分</li>
    <li>• 「無狀態」的意思</li>
  </ul>
</div>

<div class="p-4 rounded-lg bg-[#1E293B] border border-[#F59E0B]/30">
  <b class="text-[#F59E0B] text-lg">? 我還不太確定</b>
  <ul class="text-gray-300 text-sm mt-2 space-y-1">
    <li>• TCP 和 UDP 差在哪</li>
    <li>• 為什麼要有四層，不會太多嗎</li>
    <li>• 三次握手在幹嘛</li>
  </ul>
</div>

<div class="p-4 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30">
  <b class="text-[#3B82F6] text-lg">💡 馬上複習</b>
  <p class="text-gray-300 text-sm mt-2">回到「TCP/IP 四層模型」，用「線、路、包、話」重念一次。</p>
</div>

</div>

---
layout: default
class: scroll-y
---

# 🔢 HTTP 狀態碼 — 2xx 成功

<div class="space-y-3 mt-4">

<div class="p-4 rounded-lg bg-[#1E293B] border-l-4 border-[#10B981]">
  <div class="flex items-center gap-3">
    <span class="font-mono text-[#10B981] text-2xl font-bold w-16">200</span>
    <b class="text-white text-lg">OK — 成功，東西在這裡</b>
  </div>
  <p class="text-gray-400 text-sm mt-2">最常見。GET 成功、POST 成功都回這個。<code>GET /api/products</code> 回的就是 200</p>
  <p class="text-[#10B981] text-xs mt-1.5">前端怎麼處理：<code>response.json()</code> 直接用</p>
</div>

<div class="p-4 rounded-lg bg-[#1E293B] border-l-4 border-[#10B981]">
  <div class="flex items-center gap-3">
    <span class="font-mono text-[#10B981] text-2xl font-bold w-16">201</span>
    <b class="text-white text-lg">Created — 成功，而且「建立了東西」</b>
  </div>
  <p class="text-gray-400 text-sm mt-2">跟 200 的差別：201 表示<b class="text-white">伺服器新建立了一筆資源</b>。例如註冊新帳號、新增一筆訂單</p>
  <p class="text-[#10B981] text-xs mt-1.5">很多實務上會混用 200 代替 201，但嚴格來說「新增」該用 201</p>
</div>

</div>

<div class="callout mt-5">💡 <b>2xx 的共同點：伺服器成功處理了你的請求，而且沒有出錯。</b>前端可以放心把資料當成有效值用。</div>

---
layout: default
class: scroll-y
---

# 🚫 HTTP 狀態碼 — 4xx 是「你的問題」

<div class="space-y-2.5 mt-3 text-sm">

<div class="flex items-start gap-3 p-3 rounded-lg bg-[#1E293B] border-l-4 border-[#F59E0B]">
  <span class="font-mono text-[#F59E0B] text-xl font-bold w-14 shrink-0">400</span>
  <div>
    <b class="text-white">Bad Request — 你的請求格式不對</b>
    <p class="text-gray-400 text-xs mt-1">送出 <code>productId=abc</code>（應該是數字）。<b class="text-white">伺服器看不懂就拒絕。</b></p>
    <p class="text-[#F59E0B] text-xs mt-1">我們的程式：<code>NumberFormatException → 400</code> ✓</p>
  </div>
</div>

<div class="flex items-start gap-3 p-3 rounded-lg bg-[#1E293B] border-l-4 border-[#F59E0B]">
  <span class="font-mono text-[#F59E0B] text-xl font-bold w-14 shrink-0">401</span>
  <div>
    <b class="text-white">Unauthorized — 你「是誰」我還不知道</b>
    <p class="text-gray-400 text-xs mt-1">沒登入、token 過期、根本沒帶 token。<b class="text-white">認不出你是誰</b></p>
    <p class="text-gray-300 text-xs mt-1">前端：導向登入頁面</p>
  </div>
</div>

<div class="flex items-start gap-3 p-3 rounded-lg bg-[#1E293B] border-l-4 border-[#F59E0B]">
  <span class="font-mono text-[#F59E0B] text-xl font-bold w-14 shrink-0">403</span>
  <div>
    <b class="text-white">Forbidden — 我知道你是誰，但你不可以</b>
    <p class="text-gray-400 text-xs mt-1">已登入了，但這筆訂單不是你的。<b class="text-white">401 和 403 的差別就在這裡</b></p>
    <p class="text-gray-300 text-xs mt-1">前端：顯示「沒有權限」，不要登出</p>
  </div>
</div>

<div class="flex items-start gap-3 p-3 rounded-lg bg-[#1E293B] border-l-4 border-[#EF4444]">
  <span class="font-mono text-[#EF4444] text-xl font-bold w-14 shrink-0">404</span>
  <div>
    <b class="text-white">Not Found — 你找的東西不在這裡</b>
    <p class="text-gray-400 text-xs mt-1">網址打錯、路徑不存在、資源被刪了。<b class="text-white">最常見的 4xx</b></p>
    <p class="text-[#EF4444] text-xs mt-1">我們的程式：<code>GET /nope → 404</code> ✓</p>
  </div>
</div>

</div>

<div class="callout amber mt-4">⚠️ <b>401 vs 403 這組最容易混：</b>401 = 「你是誰？」  403 = 「你不能。」  面試愛問。</div>

---
layout: default
class: scroll-y
---

# 💥 HTTP 狀態碼 — 5xx 是「我的問題」

<div class="p-4 rounded-lg bg-[#1E293B] border-l-4 border-[#EF4444]">
  <div class="flex items-center gap-3">
    <span class="font-mono text-[#EF4444] text-2xl font-bold w-16">500</span>
    <b class="text-white text-lg">Internal Server Error — 我壞掉了</b>
  </div>
  <p class="text-gray-400 text-sm mt-2">伺服器裡發生了你預期外的錯誤：程式 exception、資料庫連不上、寫炸了</p>
  <p class="text-[#EF4444] text-xs mt-1.5">我們的程式：<code>catch (Exception) → 500</code> ✓</p>
</div>

<div class="p-4 rounded-lg bg-[#1E293B]">
  <b class="text-[#EF4444]">那 4xx 和 5xx 到底差在哪？</b>
  <div class="grid grid-cols-2 gap-4 mt-3 text-sm">
    <div>
      <p class="text-[#F59E0B] font-bold">4xx — 客戶端的問題</p>
      <p class="text-gray-400 text-xs mt-1.5">你傳錯了、少帶東西、想看不存在的東西。<b class="text-white">改前端或改請求就能解決。</b></p>
    </div>
    <div>
      <p class="text-[#EF4444] font-bold">5xx — 伺服器的問題</p>
      <p class="text-gray-400 text-xs mt-1.5">程式炸了、服務掛了。<b class="text-white">使用者改什麼都沒用，要去修後端。</b></p>
    </div>
  </div>
</div>

<b class="text-[#3B82F6]">同一份程式碼，狀態碼是這樣決定的：</b>

```java {1-4|6-8|10-12|14-16|all}
if (方法不對)              → 405  我不接這種請求
if (參數不是正整數)         → 400  你送壞了
if (找不到這筆商品)         → 400  你送壞了
if (庫存 < 購買數量)        → 409  請求合理但跟現況衝突
if (扣減成功)              → 200  成了
if (沒接住的 Exception)    → 500  我壞了
```

<div class="callout mt-4">💡 <b>409 我們在 Day 2 沒講過，但它超常用</b> — 「庫存剛好被別人買完」就是最典型的 409 Conflict。</div>

---
layout: default
---

# 🚪 Port 號是什麼

<div class="mt-5 p-5 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30">
  <b class="text-[#3B82F6] text-lg">先建立一個畫面</b>
  <p class="text-gray-300 text-sm mt-2">一棟大樓裡有幾百家公司。(find 你的名字 → IP)，接著要找到<b class="text-white">該走哪一扇門</b> → Port。</p>
</div>

<div class="grid grid-cols-2 gap-5 mt-5 text-sm">
  <div class="p-4 rounded-lg bg-[#1E293B] border-l-4 border-[#3B82F6]">
    <b class="text-[#3B82F6]">🌐 IP 網址 = 大樓的地址</b>
    <p class="text-gray-400 text-xs mt-1.5">全網路唯一。<code>140.82.121.4</code></p>
    <p class="text-gray-300 text-xs mt-1.5">由 DNS 幫你從域名查出來</p>
  </div>
  <div class="p-4 rounded-lg bg-[#1E293B] border-l-4 border-[#F59E0B]">
    <b class="text-[#F59E0B]">🚪 Port 號 = 大樓裡的門牌</b>
    <p class="text-gray-400 text-xs mt-1.5">一台機器上唯一。<code>8080</code></p>
    <p class="text-gray-300 text-xs mt-1.5">由程式啟動時自己指定</p>
  </div>
</div>

<div class="mt-5 p-4 rounded-lg bg-[#1E293B]">
  <b class="text-[#3B82F6]">技術上：Port 是 16 位元的無號整數</b>
  <div class="mt-3 space-y-1.5 text-sm text-gray-300">
    <p>• 範圍 <code class="text-[#F59E0B]">0 ~ 65535</code>，共 65536 個</p>
    <p>• <code class="text-[#F59E0B]">0 ~ 1023</code> 是「保留區」，要系統權限才能用（<code>80</code>、<code>443</code>、<code>22</code> 都在這）</p>
    <p>• <code class="text-[#F59E0B]">1024 ~ 49151</code> 是「註冊 port」，要向 IANA 登記</p>
    <p>• <code class="text-[#F59E0B]">49152 ~ 65535</code> 是「動態 port」，作業系統隨機指派給客戶端連線</p>
  </div>
</div>

<div class="callout mt-4">💡 <b>Port 是傳輸層（TCP/UDP）的概念，不是 IP 的。</b>同一個 IP 可以同時跑幾十個 port，各自服務不同的程式。</div>

---
layout: default
class: scroll-y
---

# 🔢 你會一直遇到的 Port 號

<div class="mt-3 space-y-2 text-sm">

<div class="flex items-center gap-3 p-3 rounded-lg bg-[#1E293B]">
  <span class="font-mono text-[#3B82F6] text-xl font-bold w-16">3306</span>
  <div class="flex-1"><b class="text-white">MySQL</b> <span class="text-gray-500 text-xs">— 資料庫預設連線埠</span></div>
  <code class="text-gray-500 text-xs">mysql -u root -P 3306</code>
</div>

<div class="flex items-center gap-3 p-3 rounded-lg bg-[#1E293B]">
  <span class="font-mono text-[#3B82F6] text-xl font-bold w-16">5432</span>
  <div class="flex-1"><b class="text-white">PostgreSQL</b> <span class="text-gray-500 text-xs">— MySQL 的對手，開源社群常用</span></div>
  <code class="text-gray-500 text-xs">psql -p 5432</code>
</div>

<div class="flex items-center gap-3 p-3 rounded-lg bg-[#1E293B]">
  <span class="font-mono text-[#3B82F6] text-xl font-bold w-16">6379</span>
  <div class="flex-1"><b class="text-white">Redis</b> <span class="text-gray-500 text-xs">— 記憶體快取</span></div>
  <code class="text-gray-500 text-xs">redis-cli -p 6379</code>
</div>

<div class="flex items-center gap-3 p-3 rounded-lg bg-[#1E293B]">
  <span class="font-mono text-[#F59E0B] text-xl font-bold w-16">27017</span>
  <div class="flex-1"><b class="text-white">MongoDB</b> <span class="text-gray-500 text-xs">— 沒有 schema 的資料庫</span></div>
  <code class="text-gray-500 text-xs">mongod --port 27017</code>
</div>

<div class="flex items-center gap-3 p-3 rounded-lg bg-[#1E293B] border-l-4 border-[#F59E0B]">
  <span class="font-mono text-[#F59E0B] text-xl font-bold w-16">8080</span>
  <div class="flex-1"><b class="text-[#F59E0B] text-white">HTTP 替代 port</b> <span class="text-gray-500 text-xs">— <b class="text-[#F59E0B]">本課的示範 port</b></span></div>
  <code class="text-[#F59E0B] text-xs">http://localhost:8080</code>
</div>

<div class="flex items-center gap-3 p-3 rounded-lg bg-[#1E293B]">
  <span class="font-mono text-[#10B981] text-xl font-bold w-16">80 / 443</span>
  <div class="flex-1"><b class="text-white">HTTP / HTTPS</b> <span class="text-gray-500 text-xs">— 保留區，要權限才能綁</span></div>
  <code class="text-gray-500 text-xs">不用打，直接省略</code>
</div>

</div>

<div class="callout amber mt-4">💡 <b>為什麼 Spring Boot 預設 8080、Express 預設 3000？</b>因為 80/443 要管理員權限，開發時用 1024 以上的 port 最省事。</div>

---
layout: default
class: scroll-y
---

# 💥 Port 號會撞 — 到底發生什麼事

<p class="text-gray-300 text-sm">我們的 Day 2 程式裡這一行：</p>

```java {1-2|all}
HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
//                                              ↑ 門牌 8080
```

<p class="text-gray-400 text-xs mt-2">如果 <b class="text-white">8080 已經被別的程式占用</b>（你忘了關掉昨天開的那個），<b class="text-red-400">這行直接丟例外，伺服器根本開不起來</b>：</p>

```bash {all}
Exception in thread "main" java.net.BindException:
  Address already in use
```

<p class="text-gray-500 text-xs mt-1 font-mono">（Java 版的錯誤訊息）</p>

<b class="text-[#EF4444] text-sm">怎麼找出誰占了？</b>

```bash {all}
# macOS / Linux
lsof -i :8080
# 或
netstat -an | grep 8080
# Windows
netstat -ano | findstr :8080
```

<div class="grid grid-cols-2 gap-4 mt-4 text-sm">
  <div class="p-3.5 rounded-lg bg-[#1E293B] border-l-4 border-[#10B981]">
    <b class="text-[#10B981]">✅ 解法一：關掉舊的那個</b>
    <p class="text-gray-400 text-xs mt-1.5">找到 PID 後 <code class="text-white">kill 編號</code>，最乾淨</p>
  </div>
  <div class="p-3.5 rounded-lg bg-[#1E293B] border-l-4 border-[#F59E0B]">
    <b class="text-[#F59E0B]">✅ 解法二：換一個 port</b>
    <p class="text-gray-400 text-xs mt-1.5">改成 <code class="text-white">8081</code> 或 <code class="text-white">9090</code>，馬上能跑</p>
  </div>
</div>

<div class="mt-4 p-3.5 rounded-lg bg-[#1E293B]">
  <b class="text-[#3B82F6]">本機 127.0.0.1:8080 的 8080，和別人電腦的 8080 是同一個嗎？</b>
  <p class="text-gray-400 text-sm mt-2">
    <b class="text-white">不是。</b>Port 的「唯一性」是<b class="text-[#F59E0B]">在同一個 IP 上面</b>。
    你在自己電腦用 8080，教室同學在自己電腦用 8080，<b class="text-white">完全不衝突</b> ——
    因為它們是不同的 IP。只有當兩個人試著<b class="text-[#EF4444]">從同一台機器連同一個 port</b> 才會撞。
  </p>
</div>

<div class="callout mt-4">🎯 <b>把這頁拍下來。</b>「Address already in use」是新手最常卡住的三個錯誤之一。</div>

---
layout: section
---

<div class="relative z-10">
  <div v-motion :initial="{ y: -20, opacity: 0 }" :enter="{ y: 0, opacity: 1 }" class="kicker">$ grep -rn "框架" ~/note/</div>
  <h1 v-motion :initial="{ y: 24, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 180 } }" class="text-5xl font-bold mt-3">
    <span class="text-[#F59E0B]">什麼是</span> <span class="text-white">框架</span>
  </h1>
  <p class="text-xl text-gray-300 mt-4 font-mono">// 本課最需要慢慢講的一節</p>
  <div class="mt-10 grid grid-cols-3 gap-5 text-sm max-w-3xl">
    <div class="concept-card amber"><b>① 怎樣才算框架</b><br><span>先有清楚的定義</span></div>
    <div class="concept-card amber"><b>② 為什麼要有</b><br><span>從你寫過的痛講起</span></div>
    <div class="concept-card amber"><b>③ 跟 Day2 差在哪</b><br><span>同一件事，兩種寫法</span></div>
  </div>
</div>

---
layout: default
class: scroll-y
---

# 📖 怎樣才算「框架」

<div class="mt-4 p-4 rounded-lg bg-[#1E293B] border-l-4 border-[#F59E0B]">
  <b class="text-[#F59E0B] text-lg">先講結論：一句話定義</b>
  <p class="text-gray-200 text-sm mt-2.5">
    框架是<b class="text-white">別人已經幫你打好地基的整套結構</b>，
    你要在這個結構裡填程式碼，而不是自己從頭蓋。
  </p>
</div>

<div class="grid grid-cols-2 gap-5 mt-5 text-sm">
  <div v-click class="p-4 rounded-lg bg-[#1E293B]">
    <b class="text-[#3B82F6]">📦 套件 Library</b>
    <p class="text-gray-400 text-xs mt-1.5">你<b class="text-white">呼叫</b>它。控制權在你。</p>
    <p class="text-gray-300 text-xs mt-2">例：<code>Math.random()</code>、<code>new Scanner()</code></p>
  </div>
  <div v-click class="p-4 rounded-lg bg-[#1E293B]">
    <b class="text-[#F59E0B]">🏗️ 框架 Framework</b>
    <p class="text-gray-400 text-xs mt-1.5">它<b class="text-white">呼叫</b>你。你把程式碼交給它，它決定何時執行。</p>
    <p class="text-gray-300 text-xs mt-2">例：Spring Boot、React、Vue</p>
  </div>
</div>

<div v-click class="mt-4 p-4 rounded-lg bg-[#1E293B]">
  <b class="text-[#10B981]">怎麼分辨？問自己一句話：</b>
  <p class="text-gray-200 text-sm mt-2.5 font-mono">「<b class="text-white">這段程式碼是它主動跑，還是我主動跑？</b>」</p>
  <p class="text-gray-400 text-xs mt-2">我主動跑 → 套件。　它主動跑我寫的 → 框架。</p>
</div>

<div v-click class="mt-4 grid grid-cols-2 gap-4 text-xs">
  <div class="p-3 rounded-lg bg-[#1E293B]">
    <b class="text-[#3B82F6]">沒有框架時（Day2 你寫的）</b>
    <p class="text-gray-400 mt-1.5 font-mono">main() → new → 註冊 → start()</p>
    <p class="text-gray-300 mt-1">你決定伺服器什麼時候開</p>
  </div>
  <div class="p-3 rounded-lg bg-[#1E293B]">
    <b class="text-[#F59E0B]">有框架時（Spring Boot）</b>
    <p class="text-gray-400 mt-1.5 font-mono">main() → done</p>
    <p class="text-gray-300 mt-1">框架掃完所有標記，自己決定開</p>
  </div>
</div>

<div v-click class="callout amber mt-4">💡 <b>這就是為什麼框架的正式名字叫「反向控制」（IoC, Inversion of Control）</b> — 控制權被反轉了。</div>

---
layout: default
class: scroll-y
---

# 🧱 框架幫你蓋了什麼

<div class="mt-3 space-y-2.5 text-sm">

<div class="p-3.5 rounded-lg bg-[#1E293B] border-l-4 border-[#EF4444]">
  <b class="text-[#EF4444] text-base">❌ 沒有框架時，你得手動做這些</b>
  <ul class="text-gray-400 text-xs mt-1.5 space-y-0.5">
    <li>• 自己 new 一個 HTTP 伺服器物件</li>
    <li>• 自己決定綁哪個 port</li>
    <li>• 自己把每個 URL 路徑註冊成處理器</li>
    <li>• 自己讀 request body、解析參數</li>
    <li>• 自己把 Java 物件手刻成 JSON 字串</li>
    <li>• 自己設 Content-Type、自己寫回應串流</li>
    <li>• 自己 try-with-resources 開關資料庫連線</li>
    <li>• 自己記得 close()</li>
  </ul>
</div>

<div class="p-3.5 rounded-lg bg-[#1E293B] border-l-4 border-[#10B981]">
  <b class="text-[#10B981] text-base">✅ 有框架時，這些都不見了</b>
  <ul class="text-gray-400 text-xs mt-1.5 space-y-0.5">
    <li>• 加上 <code>@RestController</code>，伺服器自動存在</li>
    <li>• port 寫在設定檔，不是程式碼</li>
    <li>• <code>@GetMapping("/api/products")</code> 就是註冊</li>
    <li>• <code>@RequestBody</code> 自動綁到你的參數</li>
    <li>• 回傳一個 List，自動變 JSON</li>
    <li>• <code>ResponseEntity</code> 一行處理狀態碼</li>
    <li>• 連線由容器管理，你不用碰</li>
  </ul>
</div>

</div>

<div class="callout mt-4">🎯 <b>框架沒有「消滅」這些工作，它只是把它們「藏起來」並且「一次做好」。</b>你省下的是重複勞動，不是理解成本。</div>

---
layout: default
class: scroll-y
---

# 📉 用程式碼證明：框架省了多少

<div class="grid grid-cols-2 gap-4 mb-2">
  <b class="text-[#EF4444] text-center">❌ 原生版</b>
  <b class="text-[#10B981] text-center">✅ 框架版</b>
</div>
<p class="text-gray-500 text-xs font-mono text-center mb-2">NativeApiServer.java — 189 行 / 135 行實體程式碼</p>
<p class="text-gray-500 text-xs font-mono text-center mb-2">ProductController.java — 66 行 / 46 行實體程式碼</p>

```java {1-2|4-5|all}
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

```java {1-3|5-6|all}
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

<div v-click class="callout mt-4">
  <b>135 → 46 行，實體程式碼少了約 <span class="text-[#F59E0B] text-xl">2.9 倍</span>。</b>
  <p class="text-gray-400 text-xs mt-1.5">而且少的正好是「和框架職責重疊」的那 89 行 —— 那是<b class="text-white">你本來就不該自己寫的部分</b>。</p>
</div>

---
layout: default
class: scroll-y
---

# 🔁 跟體驗營前兩天有什麼不一樣

<div class="mt-3 overflow-hidden rounded-lg border border-[#3B82F6]/30">
<table class="text-sm">
<thead>
<tr>
  <th class="text-left text-[#3B82F6]">面向</th>
  <th class="text-left text-[#3B82F6]">Day 1 · 猜數字</th>
  <th class="text-left text-[#3B82F6]">Day 2 · 訂單系統</th>
  <th class="text-left text-[#F59E0B]">今天 · Spring Boot</th>
</tr>
</thead>
<tbody>
<tr>
  <td class="text-gray-400">程式怎麼開始跑</td>
  <td class="text-gray-300">你寫 <code>main</code>，你按下去</td>
  <td class="text-gray-300">你寫 <code>main</code>，你按下去</td>
  <td class="text-[#F59E0B]">你還是寫 <code>main</code>，但一行就完事</td>
</tr>
<tr>
  <td class="text-gray-400">資料放哪</td>
  <td class="text-gray-300">變數</td>
  <td class="text-gray-300">SQLite（JDBC）</td>
  <td class="text-[#F59E0B]">同上，連線由容器管</td>
</tr>
<tr>
  <td class="text-gray-400">別人怎麼找到你</td>
  <td class="text-gray-500">沒人找得到你</td>
  <td class="text-gray-300"><code>localhost:8080</code> + 路徑</td>
  <td class="text-[#F59E0B]">同樣的路徑，設定檔改 port</td>
</tr>
<tr>
  <td class="text-gray-400">回傳格式</td>
  <td class="text-gray-500">println 到螢幕</td>
  <td class="text-gray-300">手刻 JSON 字串</td>
  <td class="text-[#F59E0B]">回傳物件，自動序列化</td>
</tr>
<tr>
  <td class="text-gray-400">重複的樣板</td>
  <td class="text-gray-500">很少</td>
  <td class="text-[#EF4444]">很多（189 行）</td>
  <td class="text-[#10B981]">幾乎沒有（66 行）</td>
</tr>
<tr>
  <td class="text-gray-400">你學到什麼</td>
  <td class="text-gray-300">Java 語法</td>
  <td class="text-gray-300">HTTP / SQL 怎麼串起來</td>
  <td class="text-[#F59E0B]">抽象與分工</td>
</tr>
</tbody>
</table>
</div>

<div class="callout amber mt-4">
  🎯 <b>關鍵差異不是「可以少寫多少行」，而是「你現在寫的東西，價值在哪裡」。</b>
  <p class="text-gray-400 text-xs mt-1.5">Day 2 讓你理解那些<b class="text-white">笨重</b>是必要的 — 因為不手寫一次，你不會知道框架在解決什麼問題。</p>
</div>

---
layout: default
class: scroll-y
---

# 🧠 什麼時候該用框架

<div class="grid grid-cols-2 gap-5 mt-4 text-sm">

<div class="p-4 rounded-lg bg-[#1E293B] border border-[#10B981]/30">
  <b class="text-[#10B981] text-base">✅ 該用框架</b>
  <ul class="text-gray-300 text-xs mt-2 space-y-1">
    <li>• 要做的是「大家都在做的」那種系統</li>
    <li>• 安全性、穩定性比速度重要</li>
    <li>• 團隊合作，程式碼要everyone看得懂</li>
    <li>• 時間有限，東西要趕快上線</li>
  </ul>
  <p class="text-[#10B981] text-xs mt-2.5">→ 電商、後台系統、API 服務</p>
</div>

<div class="p-4 rounded-lg bg-[#1E293B] border border-[#F59E0B]/30">
  <b class="text-[#F59E0B] text-base">⚠️ 慎用 / 先理解再寫</b>
  <ul class="text-gray-300 text-xs mt-2 space-y-1">
    <li>• 效能吃緊的東西</li>
    <li>• 你還不熟這個領域</li>
    <li>• 需求可能大幅改變</li>
    <li>• 教學 / 練習 / 玩具專案</li>
  </ul>
  <p class="text-[#F59E0B] text-xs mt-2.5">→ 競賽挑戰、演算法作業、Prototype</p>
</div>

</div>

<div class="mt-5 p-4 rounded-lg bg-[#1E293B] border-l-4 border-[#EF4444]">
  <b class="text-[#EF4444]">⚠️ 這句話不要對面試官講</b>
  <p class="text-gray-300 text-sm mt-2">「框架比較好，所以我用框架。」</p>
  <p class="text-gray-300 text-sm mt-1.5">正確的說法是：<b class="text-white">「這個問題不需要自己造輪子，我要解決的是 X，不是 Y。」</b></p>
</div>

<div class="callout mt-4">💡 <b>一句話：框架是把別人已經解決的問題，變成你不必再解一次。</b>知道什麼時候該用，比知道怎麼用更重要。</div>

---
layout: default
class: scroll-y
---

# 🧩 框架的三大支柱（知道名字就夠了）

<div class="grid grid-cols-3 gap-4 mt-6">

<div class="p-4 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30">
  <div class="text-2xl mb-2">📦</div>
  <b class="text-[#3B82F6] text-base">約定優於配置</b>
  <p class="text-gray-400 text-xs mt-2">Conventions over Configuration</p>
  <p class="text-gray-300 text-xs mt-2">檔案放對位置、類別取對名字，框架就自動生效。<b class="text-white">不用寫設定檔</b>。</p>
  <p class="text-gray-500 text-xs mt-2">今天就能看到效果</p>
</div>

<div class="p-4 rounded-lg bg-[#1E293B] border border-[#10B981]/30">
  <div class="text-2xl mb-2">💉</div>
  <b class="text-[#10B981] text-base">依賴注入</b>
  <p class="text-gray-400 text-xs mt-2">Dependency Injection</p>
  <p class="text-gray-300 text-xs mt-2">你不用 <code>new</code> 依賴的東西，<b class="text-white">框架送到你手上</b>。這就是 IoC 的實際做法。</p>
  <p class="text-gray-500 text-xs mt-2"><code>ProductQueryController(seed)</code> 那種寫法</p>
</div>

<div class="p-4 rounded-lg bg-[#1E293B] border border-[#F59E0B]/30">
  <div class="text-2xl mb-2">🪝</div>
  <b class="text-[#F59E0B] text-base">註解 / 標記</b>
  <p class="text-gray-400 text-xs mt-2">Annotation</p>
  <p class="text-gray-300 text-xs mt-2">用 <code>@RestController</code> 告訴框架「這個類別是我的」——<b class="text-white">宣告意圖，不是執行邏輯</b>。</p>
  <p class="text-gray-500 text-xs mt-2">等於把「註冊」變成一句話</p>
</div>

</div>

<div class="callout mt-6">
  💡 <b>第 10 點你就會親眼看到「約定優於配置」生效：</b>
  <p class="text-gray-400 text-xs mt-1.5">把 <code>ProductController</code> 放對資料夾、加上兩個標記，網址就自動出來了。沒有一行設定檔。</p>
</div>

---
layout: default
---

# ✅ 檢查點 2 — 框架

<div class="grid grid-cols-3 gap-4 mt-6">

<div class="p-4 rounded-lg bg-[#1E293B] border border-[#10B981]/30">
  <b class="text-[#10B981] text-lg">✓ 我能說出</b>
  <ul class="text-gray-300 text-sm mt-2 space-y-1">
    <li>• 框架 vs 套件的差別</li>
    <li>• 「反向控制」的意思</li>
    <li>• 框架幫我省掉哪幾件事</li>
    <li>• 135 行 → 46 行差在哪</li>
  </ul>
</div>

<div class="p-4 rounded-lg bg-[#1E293B] border border-[#F59E0B]/30">
  <b class="text-[#F59E0B] text-lg">? 我還不太確定</b>
  <ul class="text-gray-300 text-sm mt-2 space-y-1">
    <li>• 依賴注入到底注入什麼</li>
    <li>• 註解是怎麼被讀到的</li>
    <li>• 為什麼框架要知道我的檔案放哪</li>
  </ul>
</div>

<div class="p-4 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30">
  <b class="text-[#3B82F6] text-lg">💡 馬上複習</b>
  <p class="text-gray-300 text-sm mt-2">回到「📉 用程式碼證明」那頁，把兩段程式碼並排看一次。</p>
</div>

</div>

---
layout: default
---

# 🔁 前後端如何溝通

<div class="mt-4 p-4 rounded-lg bg-[#1E293B] border-l-4 border-[#3B82F6]">
  <b class="text-[#3B82F6] text-lg">一句話</b>
  <p class="text-gray-200 text-sm mt-2.5">
    前端發出<b class="text-white">HTTP 請求</b>，後端回<b class="text-white">HTTP 回應</b>。
    來回幾個來回就結束。<b class="text-[#F59E0B]">就這樣，沒有別的了。</b>
  </p>
</div>

<div class="grid grid-cols-3 gap-4 mt-6 items-center text-center">
  <div class="concept-card blue">
    <div class="text-3xl mb-2">🖥️</div>
    <b class="text-[#3B82F6]">前端</b>
    <p class="text-gray-400 text-xs mt-2">用 <code>fetch()</code> 發請求<br>負責畫面</p>
  </div>
  <div class="text-2xl text-[#F59E0B]">⟷</div>
  <div class="concept-card green">
    <div class="text-3xl mb-2">⚙️</div>
    <b class="text-[#10B981]">後端</b>
    <p class="text-gray-400 text-xs mt-2">用 <code>HttpExchange</code> 收<br>負責邏輯</p>
  </div>
</div>

<div class="callout mt-5">💡 <b>重點：前端「永遠不直接碰資料庫」。</b>它只知道有個網址可以呼叫，資料怎麼存它不管。</div>

---
layout: default
class: scroll-y
---

# 📊 一次下單的完整對話

<div class="mt-2 rounded-lg overflow-hidden border border-[#3B82F6]/25 bg-[#0d1117] p-2">
  <SequenceDiagram />
</div>

<div class="callout mt-3">💡 <b>看圖的重點：</b>同樣的「一次下單」，走的是<b class="text-white">完全相同的路徑</b>。不管後端是原生 Java 還是 Spring Boot，這張圖都不會變。</div>

---
layout: default
class: scroll-y
---

# 🧾 把圖翻成程式碼

<b class="text-[#3B82F6]">① 前端：發請求</b>

```js {2|5-6|all}
const response = await fetch("/api/products");
//            ↑ 圖上的 GET /api/products
if (!response.ok) {
  // ok 為 false 代表狀態碼是 4xx 或 5xx
  // 200/201 才會是 true
  throw new Error("讀取失敗");
}
const products = await response.json();
```

<p class="text-gray-400 text-xs mt-1.5">👆 <b class="text-white">回應對應圖上的「200 · application/json」</b></p>

<b class="text-[#10B981] mt-4">② 後端：收請求</b>

```java {2|4|all}
private static void handleProducts(HttpExchange ex) throws IOException {
    // 圖上的：讀取商品清單
    sendJson(ex, 200, json.toString());
}
```

<p class="text-gray-400 text-xs mt-1.5">👆 <b class="text-white">就是圖上那支箭頭的程式碼</b></p>

<div class="mt-4 p-4 rounded-lg bg-[#1E293B] border border-[#EF4444]/40">
  <b class="text-[#EF4444]">🔑 最重要的一件事：<code>response.ok</code></b>
  <div class="grid grid-cols-2 gap-4 mt-3 text-xs">
    <div>
      <p class="text-gray-300"><code>response.ok === true</code></p>
      <p class="text-gray-400 mt-1">狀態碼 <b class="text-[#10B981]">200 ~ 299</b></p>
      <p class="text-gray-300 mt-1.5">→ 可以放心 <code>response.json()</code></p>
    </div>
    <div>
      <p class="text-gray-300"><code>response.ok === false</code></p>
      <p class="text-gray-400 mt-1">狀態碼 <b class="text-[#EF4444]">400 以上</b>（含 3xx 跳轉）</p>
      <p class="text-gray-300 mt-1.5">→ <b class="text-[#EF4444]">body 是錯誤訊息，不要當資料用</b></p>
    </div>
  </div>
  <p class="text-gray-400 text-xs mt-3">這一行，就是第 5 點講的狀態碼在實務上「唯一重要」的用法。</p>
</div>

<div class="callout mt-4">⚠️ <b>最常見的 bug：忘了檢查 <code>ok</code>，直接 <code>await response.json()</code>。</b>伺服器回 500 時，你會拿到一個錯誤物件，畫面上出現莫名其妙的 `undefined`。</div>

---
layout: default
class: scroll-y
---

# 🧪 小小體驗 — 三個檔案

<div class="mt-3 p-4 rounded-lg bg-[#1E293B] border border-[#10B981]/40">
  <b class="text-[#10B981] text-lg">我們要跑的三個檔案</b>
  <pre class="text-gray-300 text-sm mt-3">backend-101-network-framework/
├─ demo/
│  ├─ NativeApiServer.java   ← 後端（純 JDK，零依賴）
│  └─ shop.html              ← 前端（純 HTML，零依賴）
└─ springboot/               ← 第 10 點才用</pre>
</div>

<div class="grid grid-cols-2 gap-4 mt-4 text-sm">
  <div class="p-3.5 rounded-lg bg-[#1E293B] border-l-4 border-[#EF4444]">
    <b class="text-[#EF4444]">跟 Day 2 不一樣的地方</b>
    <ul class="text-gray-300 text-xs mt-1.5 space-y-0.5">
      <li>• <b class="text-[#10B981]">沒有 JDBC、沒有 SQLite</b></li>
      <li>• 不需要 <code>lib/*.jar</code></li>
      <li>• 商品存在 <code>List</code> 裡</li>
    </ul>
    <p class="text-gray-400 text-xs mt-2">為什麼？<b class="text-white">今天要專心看 HTTP 那層</b>，不要被資料庫干擾。</p>
  </div>
  <div class="p-3.5 rounded-lg bg-[#1E293B] border-l-4 border-[#10B981]">
    <b class="text-[#10B981]">跟 Day 2 一樣的地方</b>
    <ul class="text-gray-300 text-xs mt-1.5 space-y-0.5">
      <li>• 一樣用 <code>com.sun.net.httpserver</code></li>
      <li>• 一樣綁 <code>8080</code></li>
      <li>• 一樣用 <code>fetch()</code></li>
    </ul>
    <p class="text-gray-400 text-xs mt-2">這樣你才看得出<b class="text-white">框架換掉的是哪一層</b>。</p>
  </div>
</div>

---
layout: default
class: scroll-y
---

# ▶️ 動手 — 啟動原生後端

<b class="text-[#3B82F6]">步驟 1：編譯 + 啟動</b>

```bash {all}
cd demo
javac NativeApiServer.java
java NativeApiServer
```

<p class="text-gray-400 text-xs mt-2">看到這幾行就成功了：</p>

<pre class="text-gray-300 text-xs mt-1.5 bg-[#0d1117] p-2.5 rounded">後端已啟動：http://localhost:8080
  瀏覽器前端  http://localhost:8080/
  GET  /api/products   讀取商品清單
  POST /api/buy        送出訂單</pre>

<b class="text-[#10B981] mt-5">步驟 2：先不用瀏覽器，用 curl 看</b>

```bash {all}
# 讀商品
curl -i http://localhost:8080/api/products

# 買 2 杯奶茶
curl -i -X POST \
  -d "productId=1&quantity=2" \
  http://localhost:8080/api/buy
```

<p class="text-gray-400 text-xs mt-2">這是<b class="text-white">最快看到狀態碼的方法</b>，比開瀏覽器清楚十倍。</p>

<b class="text-[#F59E0B] mt-5">試著讓它回錯的狀態碼，親眼看到第 5 點的內容</b>

```bash {all}
# 庫存不足 → 409
curl -i -X POST -d "productId=1&quantity=99999" localhost:8080/api/buy

# 參數格式錯 → 400
curl -i -X POST -d "productId=abc" localhost:8080/api/buy

# 方法錯 → 405
curl -i localhost:8080/api/buy
```

---
# 🖥️ 動手 — 開瀏覽器看真實畫面
<div class="mt-3 flex items-center gap-3 p-3.5 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30">
  <span class="text-2xl">🌐</span>
  <div>
    <b class="text-[#3B82F6] text-base">開啟</b>
    <code class="text-white text-sm ml-2">http://localhost:8080</code>
    <p class="text-gray-400 text-xs mt-1">同一個 port 同時提供「頁面」和「API」— 因為 Java 幫你把 <code>shop.html</code> 也送出来了</p>
  </div>
</div>

<div class="grid grid-cols-2 gap-4 mt-4 text-sm">
  <div class="p-4 rounded-lg bg-[#1E293B] border border-[#10B981]/30">
    <b class="text-[#10B981]">👀 盯著右下角「最近一次回應」</b>
    <p class="text-gray-400 text-xs mt-1.5">那是我們在 <code>shop.html</code> 裡加的 log，會顯示：</p>
    <pre class="text-gray-300 text-xs mt-2 bg-[#0d1117] p-2 rounded">GET /api/products
→ HTTP 200 OK
← [{"id":1,...}]</pre>
  </div>
  <div class="p-4 rounded-lg bg-[#1E293B] border border-[#F59E0B]/30">
    <b class="text-[#F59E0B]">🧪 試著讓它失敗</b>
    <p class="text-gray-400 text-xs mt-1.5">買「冰美式」（id=4，庫存 0）：</p>
    <pre class="text-gray-300 text-xs mt-2 bg-[#0d1117] p-2 rounded">POST /api/buy
→ HTTP 409 Conflict
← {"error":"庫存不足..."}</pre>
    <p class="text-[#F59E0B] text-xs mt-1.5">按鈕其實會 disable，但用 curl 可以強行突破</p>
  </div>
</div>

<div class="callout mt-4">💡 <b>你剛剛看的就是第 8 點那張循序圖。</b>圖上的每一支箭頭，在這個畫面裡都會出現一次。</div>

---
layout: default
class: scroll-y
---

# 🔎 前端要怎麼「借鑑」後端的 API

<div class="mt-3 p-4 rounded-lg bg-[#1E293B] border-l-4 border-[#3B82F6]">
  <b class="text-[#3B82F6] text-base">先理解一件事：API 沒有文件也能用</b>
  <p class="text-gray-300 text-sm mt-2">後端寫好之後，你只要問三個問題，就知道怎麼接：</p>
</div>

<div class="mt-3 space-y-2 text-sm">
  <div class="flex gap-3 p-3 rounded-lg bg-[#1E293B]">
    <span class="text-[#3B82F6] font-mono font-bold">1</span>
    <div><b class="text-white">網址跟方法？</b>
    <p class="text-gray-400 text-xs mt-1">直接讀後端程式碼裡的 <code class="text-[#3B82F6]">createContext("/api/products", ...)</code> 和 <code class="text-[#3B82F6]">if (!"GET".equals(...))</code></p></div>
  </div>
  <div class="flex gap-3 p-3 rounded-lg bg-[#1E293B]">
    <span class="text-[#3B82F6] font-mono font-bold">2</span>
    <div><b class="text-white">要送什麼進去？</b>
    <p class="text-gray-400 text-xs mt-1">看 <code class="text-[#3B82F6]">form.get("productId")</code> — key 就是參數名，<code class="text-[#3B82F6]">parseForm</code> 決定格式是 form-urlencoded</p></div>
  </div>
  <div class="flex gap-3 p-3 rounded-lg bg-[#1E293B]">
    <span class="text-[#3B82F6] font-mono font-bold">3</span>
    <div><b class="text-white">會回什麼？</b>
    <p class="text-gray-400 text-xs mt-1">看 <code class="text-[#3B82F6]">sendJson(ex, 200, ...)</code> 裡面那段字串 — <b class="text-white">那就是你的 JSON schema</b></p></div>
  </div>
</div>

<div class="mt-4 p-4 rounded-lg bg-[#1E293B]">
  <b class="text-[#10B981]">💡 更快的辦法：直接用瀏覽器開發者工具</b>
  <div class="grid grid-cols-3 gap-2 mt-3 text-xs">
    <p class="text-gray-300">1. F12 開 DevTools</p>
    <p class="text-gray-300">2. 切到 Network 分頁</p>
    <p class="text-gray-300">3. 重新整理，看每一筆請求</p>
  </div>
  <p class="text-gray-400 text-xs mt-2.5">Network 分頁會完整列出 <b class="text-white">每一個 URL、狀態碼、request、response</b> — 這就是 API 的真相。</p>
</div>

<div class="callout amber mt-3">🎯 <b>順帶一提：Day 2 的 Spring Boot 版是 JSON body，本課原生版是 form-urlencoded。</b>格式不同，但<b class="text-white">前端程式碼只有一行差異</b>（<code>body: data</code> vs <code>body: JSON.stringify(...)</code>）。這就是為什麼要先搞懂「格式」。</div>

---
layout: default
class: scroll-y
---

# ✅ 檢查點 3 — 溝通與實作

<div class="grid grid-cols-3 gap-4 mt-6">

<div class="p-4 rounded-lg bg-[#1E293B] border border-[#10B981]/30">
  <b class="text-[#10B981] text-lg">✓ 我能說出</b>
  <ul class="text-gray-300 text-sm mt-2 space-y-1">
    <li>• 前後端溝通就是 HTTP 來回</li>
    <li>• <code>response.ok</code> 什麼時候是 false</li>
    <li>• 怎麼從後端程式碼推出 API 規格</li>
    <li>• 為什麼不用 JDBC 也能跑</li>
  </ul>
</div>

<div class="p-4 rounded-lg bg-[#1E293B] border border-[#F59E0B]/30">
  <b class="text-[#F59E0B] text-lg">? 我還不太確定</b>
  <ul class="text-gray-300 text-sm mt-2 space-y-1">
    <li>• 什麼都沒送會拿到什麼狀態碼</li>
    <li>• 為什麼 form 格式不是 JSON</li>
    <li>• 怎麼知道後端有沒有收到</li>
  </ul>
</div>

<div class="p-4 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30">
  <b class="text-[#3B82F6] text-lg">💡 馬上複習</b>
  <p class="text-gray-300 text-sm mt-2">回到「📊 一次下單的完整對話」，把圖上的箭頭跟 curl 指令對起來看。</p>
</div>

</div>

---
layout: section
---

<div class="cover-glow"></div>
<div class="relative z-10">
  <div v-motion :initial="{ y: -20, opacity: 0 }" :enter="{ y: 0, opacity: 1 }" class="kicker">$ mvn spring-boot:run</div>
  <h1 v-motion :initial="{ y: 24, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 180 } }" class="text-5xl font-bold mt-3">
    <span class="text-[#10B981]">配置</span> <span class="text-white">魔法</span>
  </h1>
  <p class="text-xl text-gray-300 mt-4 font-mono">// 同一組 API，換一個寫法</p>
  <div class="mt-10 flex items-center gap-4 text-sm">
    <div class="concept-card red"><b>189 行</b><br><span>原生 Java</span></div>
    <span class="text-[#F59E0B] text-2xl">→</span>
    <div class="concept-card green"><b>66 行</b><br><span>Spring Boot</span></div>
    <span class="text-gray-500 text-xs ml-4">API 完全相同</span>
  </div>
</div>

---
layout: default
class: scroll-y
---

# 🚀 Spring Boot 怎麼啟動

<div class="grid grid-cols-2 gap-4 mt-3 text-sm">

<b class="text-[#3B82F6]">前提：裝好 JDK 17 以上 + Maven</b>

```bash {all}
java -version    # 需要 17+
mvn -version     # 需要 3.8+
```

<p class="text-gray-400 text-xs mt-2">沒裝 Maven？<a href="https://maven.apache.org/download.cgi" target="_blank" class="text-[#3B82F6] underline">從官網抓 binary 壓縮檔</a>解壓後把 <code>bin</code> 加到 PATH。</p>

<b class="text-[#10B981]">啟動</b>

```bash {all}
cd springboot

# 一行，會先下載依賴再啟動
mvn spring-boot:run
```

<p class="text-gray-400 text-xs mt-2">第一次會比較慢（下載 jar）。看到 <code class="text-[#10B981]">Started Backend101Application</code> 就是好了。</p>

</div>

<div class="mt-4 p-3.5 rounded-lg bg-[#1E293B] border border-[#F59E0B]/40">
  <b class="text-[#F59E0B]">記得先關掉上一個原生版伺服器</b>
  <p class="text-gray-400 text-xs mt-1.5">兩個都佔 <code>8080</code> → 第二個會直接 <code class="text-[#EF4444]">Address already in use</code>。這就是第 6 點講的撞號。</p>
</div>

<b class="text-[#3B82F6]">想打包成 jar 檔再跑？</b>

```bash {all}
mvn package
java -jar target/backend-101-1.0.0.jar
```

---
layout: default
class: scroll-y
---

# ✨ 魔法在哪 — 整份 Controller

<div class="mt-3 grid grid-cols-2 gap-4">
<p class="text-[#10B981] text-sm font-mono">ProductController.java · 66 行</p>
<p class="text-gray-500 text-sm font-mono">← Day 2 的 BuyProductApi.java 是 189 行</p>
</div>

```java {1-2|5-13|16-19|21-25|27-32|all}
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

<div class="callout mt-3">
  🎯 <b>看不懂的標記先記下來，等下逐個拆：</b>
  <code>@RestController</code> <code>@RequestMapping</code> <code>@GetMapping</code> <code>@PostMapping</code> <code>@RequestBody</code> <code>ResponseEntity</code>
</div>
---
layout: default
class: scroll-y
---

# 🔍 逐行拆解 — 框架幫你做了什麼

<div class="mt-3 space-y-2 text-sm">

<div v-click class="flex gap-3 p-3 rounded-lg bg-[#1E293B] border-l-4 border-[#3B82F6]">
  <code class="text-[#3B82F6] text-xs w-40 shrink-0">package + 資料夾結構</code>
  <div class="text-gray-300 text-xs">Java 規定：<b class="text-white">套件名必須對應資料夾</b>。所以 <code>com.birc.backend101</code> 必須在 <code>com/birc/backend101/</code> — 這是 Java 語言規則，但 Spring 靠它自動掃描。放錯就找不到。</div>
</div>

<div v-click class="flex gap-3 p-3 rounded-lg bg-[#1E293B] border-l-4 border-[#10B981]">
  <code class="text-[#10B981] text-xs w-40 shrink-0">@RestController</code>
  <div class="text-gray-300 text-xs">= 「這個類別的方法，回傳值直接變成 HTTP 回應 body」。<b class="text-white">取代了手動呼叫 sendJson</b>。它 = <code>@Controller</code> + <code>@ResponseBody</code>。</div>
</div>

<div v-click class="flex gap-3 p-3 rounded-lg bg-[#1E293B] border-l-4 border-[#10B981]">
  <code class="text-[#10B981] text-xs w-40 shrink-0">@RequestMapping("/api")</code>
  <div class="text-gray-300 text-xs">這三個字<b class="text-white">取代了 createContext 註冊</b>。整個類別的網址前綴。</div>
</div>

<div v-click class="flex gap-3 p-3 rounded-lg bg-[#1E293B] border-l-4 border-[#10B981]">
  <code class="text-[#10B981] text-xs w-40 shrink-0">@GetMapping("/products")</code>
  <div class="text-gray-300 text-xs">組出 <code>GET /api/products</code>。<b class="text-white">HTTP 方法 + 路徑，兩個字合併</b>。</div>
</div>

<div v-click class="flex gap-3 p-3 rounded-lg bg-[#1E293B] border-l-4 border-[#10B981]">
  <code class="text-[#10B981] text-xs w-40 shrink-0">return products;</code>
  <div class="text-gray-300 text-xs">回傳 <code>List&lt;Product&gt;</code> → <b class="text-white">自動序列化成 JSON</b>，自動設 <code>Content-Type: application/json</code>，自動呼叫 sendResponseHeaders，自動 close()。<b class="text-white">86 行手刻 JSON 變成 1 行</b>。</div>
</div>

<div v-click class="flex gap-3 p-3 rounded-lg bg-[#1E293B] border-l-4 border-[#10B981]">
  <code class="text-[#10B981] text-xs w-40 shrink-0">@RequestBody</code>
  <div class="text-gray-300 text-xs">自動讀 body、解析 JSON、<b class="text-white">塞進你的物件</b>。取代了 <code>readAllBytes()</code> + <code>parseForm()</code> + <code>getOrDefault()</code>。</div>
</div>

<div v-click class="flex gap-3 p-3 rounded-lg bg-[#1E293B] border-l-4 border-[#10B981]">
  <code class="text-[#10B981] text-xs w-40 shrink-0">ResponseEntity.ok(...)</code>
  <div class="text-gray-300 text-xs"><code>ok()</code> = 200、<code>badRequest()</code> = 400、<code>status(409)</code> = 409。<b class="text-white">一行搞定狀態碼 + body</b>。</div>
</div>

</div>

<div v-click class="callout mt-4">💡 <b>整份檔案沒有出現：</b>HttpServer、HttpExchange、OutputStream、StringBuilder、Content-Type、sendResponseHeaders、try-with-resources。<b class="text-white">這些全被框架收走了。</b></div>

---
layout: default
class: scroll-y
---

# ⚖️ 公平比較 — 不是 Spring Boot 永遠比較好

<div class="mt-3 overflow-hidden rounded-lg border border-[#3B82F6]/30">
<table class="text-sm">
<thead>
<tr>
  <th class="text-left text-[#3B82F6]">如果你要…</th>
  <th class="text-left text-[#3B82F6]">用原生 Java</th>
  <th class="text-left text-[#F59E0B]">用 Spring Boot</th>
</tr>
</thead>
<tbody>
<tr><td class="text-gray-300">教學、做作業</td><td class="text-[#10B981]">✅ 看得懂每一步</td><td class="text-gray-500">❌ 黑箱太多</td></tr>
<tr><td class="text-gray-300">競賽限時 3 小時</td><td class="text-[#10B981]">✅ 零依賴不會壞</td><td class="text-gray-500">❌ 設定錯誤就開不起來</td></tr>
<tr><td class="text-gray-300">做真的產品</td><td class="text-[#EF4444]">❌ 你會重寫到哭</td><td class="text-[#10B981]">✅ 別人都在用</td></tr>
<tr><td class="text-gray-300">團隊 5 人以上</td><td class="text-[#EF4444]">❌ 樣板碼不一致</td><td class="text-[#10B981]">✅ 大家寫法統一</td></tr>
<tr><td class="text-gray-300">需要驗證/ORM/快取</td><td class="text-[#EF4444]">❌ 全部自己刻</td><td class="text-[#10B981]">✅ 一個 annotation</td></tr>
</tbody>
</table>
</div>

<div class="mt-4 p-4 rounded-lg bg-[#1E293B] border-l-4 border-[#F59E0B]">
  <b class="text-[#F59E0B]">回到第 7 點的問題：為什麼要有框架？</b>
  <p class="text-gray-300 text-sm mt-2.5">不是因為框架比較聰明。是因為<b class="text-white">那些麻煩事（序列化、路由、連線、序列化 JSON）每一個專案都會遇到，而且解法都一樣。</b>
  把重複的解法抽出來，就是框架。</p>
  <p class="text-gray-400 text-xs mt-2">框架的價值不是「少寫幾行」，是<b class="text-white">「不用每次都重新想一次」</b>。</p>
</div>

<div class="callout mt-3">🎯 <b>所以框架的前提是：你已經知道它在做什麼。</b>今天這堂課的順序（先原生、再框架）不是巧合。</div>

---
layout: default
class: scroll-y
---

# ✅ 檢查點 4 — 全課總複習

<div class="grid grid-cols-3 gap-4 mt-5 text-sm">

<div class="p-4 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30">
  <b class="text-[#3B82F6] text-base">🌐 網路</b>
  <ul class="text-gray-300 text-xs mt-2 space-y-1">
    <li>• TCP/IP 四層：線路包話</li>
    <li>• DNS：名字 → IP</li>
    <li>• HTTP：request / response</li>
    <li>• 無狀態的意思</li>
  </ul>
</div>

<div class="p-4 rounded-lg bg-[#1E293B] border border-[#10B981]/30">
  <b class="text-[#10B981] text-base">🔢 狀態碼</b>
  <ul class="text-gray-300 text-xs mt-2 space-y-1">
    <li>• 200 成功 / 201 建立了東西</li>
    <li>• 400 請求壞了</li>
    <li>• 401 不知道你是誰</li>
    <li>• 403 知道但你不能</li>
    <li>• 404 不存在</li>
    <li>• 500 伺服器壞了</li>
  </ul>
</div>

<div class="p-4 rounded-lg bg-[#1E293B] border border-[#F59E0B]/30">
  <b class="text-[#F59E0B] text-base">🚪 Port</b>
  <ul class="text-gray-300 text-xs mt-2 space-y-1">
    <li>• 16 位元，0~65535</li>
    <li>• 唯一性限於同一個 IP</li>
    <li>• 撞號 → BindException</li>
    <li>• 3306 / 8080 / 6379</li>
  </ul>
</div>

<div class="p-4 rounded-lg bg-[#1E293B] border border-[#8B5CF6]/30">
  <b class="text-[#8B5CF6] text-base">🏗️ 框架</b>
  <ul class="text-gray-300 text-xs mt-2 space-y-1">
    <li>• 它呼叫你，不是你呼叫它</li>
    <li>• 反向控制（IoC）</li>
    <li>• 約定優於配置</li>
    <li>• 135 → 46 行</li>
  </ul>
</div>

<div class="p-4 rounded-lg bg-[#1E293B] border border-[#3B82F6]/30">
  <b class="text-[#3B82F6] text-base">🔁 溝通</b>
  <ul class="text-gray-300 text-xs mt-2 space-y-1">
    <li>• 前端不直接碰資料庫</li>
    <li>• response.ok 怎麼用</li>
    <li>• 從程式碼推 API 規格</li>
  </ul>
</div>

<div class="p-4 rounded-lg bg-[#1E293B] border border-[#10B981]/30">
  <b class="text-[#10B981] text-base">🧪 實作</b>
  <ul class="text-gray-300 text-xs mt-2 space-y-1">
    <li>• javac → java 跑起來</li>
    <li>• curl 看狀態碼</li>
    <li>• mvn spring-boot:run</li>
  </ul>
</div>

</div>

<div class="callout amber mt-5">📌 <b>如果只能記一件事：</b>框架的價值是「不用每次重新想一次」。知道它在做什麼，你才有能力判斷什麼時候該用、什麼時候該自己刻。</div>

---
layout: center
class: text-center
---

<div v-motion :initial="{ scale: 0.8, opacity: 0 }" :enter="{ scale: 1, opacity: 1, transition: { duration: 500 } }" class="text-6xl mb-6">🎉</div>

<h1 v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 200, duration: 500 } }" class="text-4xl font-bold mb-4">
  <span class="text-[#3B82F6]">下課！</span>
</h1>

<p v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 400, duration: 500 } }" class="text-lg text-gray-300 mb-6">
  你現在可以解釋網路怎麼跑、狀態碼代表什麼、以及框架到底解決了什麼
</p>

<div v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 600, duration: 500 } }" class="text-xl text-gray-400 mb-8">
  這就是後端的真實面貌
</div>

<div v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { delay: 900, duration: 500 } }" class="mt-8 text-sm text-gray-600 space-y-1">
  <p>回家複習：<code class="text-[#3B82F6]">localhost:8080</code> 的 Port 那一頁</p>
  <p>下次課程記得先裝好 <code class="text-[#3B82F6]">Maven</code></p>
  <p class="mt-6">LucasHsu.dev — 2026 商智中心後端群體驗營</p>
</div>
