---
theme: seriph
title: 第四次考核前導練習
layout: cover
ui:
  nav: false
transition: slide-left
mdc: true
comark: true
download: true
lineNumbers: true
routerMode: hash
colorSchema: light
fonts:
  sans: Noto Sans TC
  serif: Noto Serif TC
  mono: JetBrains Mono
css: unocss
stylesheet: ./style.css
drawings:
  persist: true
  enabled: true
selectable: true
record: user
exportFilename: agent-practice
---

<div class="cover-grid"></div>

<div class="cover-content">
  <p class="eyebrow">第四次考核前導練習</p>
  <h1>怎麼讓 agent 做事，<br>並證明它做對了</h1>
  <p class="cover-meta">BIRC <span>●</span> 115 年 11 月 <span>●</span> 90 分鐘</p>
</div>

<div class="terminal-prompt"><span>$</span> ./verify/checkout.sh<br><span>$</span> echo $?<strong>0</strong></div>

<!-- 開場：agent 真的會改檔案。本課只談兩件事：驗證與文件。 -->

---
layout: default
---

<p class="kicker">第一節 定錨 <span>· 5 min</span></p>

# <mark>agent</mark> 是什麼？有哪些工具？

<div class="dark-callout"><b>agent＝一個迴圈</b>　讀專案 → 想 → <strong>真的執行指令、改檔案</strong> → 看結果 → 再想再改，直到它認為完成。<br><small>你給任務與完成條件，它在你的機器上改真的檔案——所以接下來整堂課只有兩個主題：<b>驗證</b>、<b>文件</b>。</small></div>

<div class="tool-grid">
  <div class="paper-card"><b>終端機　Claude Code</b><small>Anthropic 官方；終端機 agent 標竿，教學用它最多</small></div>
  <div class="paper-card"><b>終端機　Codex</b><small>OpenAI 官方 CLI（也有雲端版）；GPT 家族、沙箱化</small></div>
  <div class="paper-card"><b>開源　opencode</b><small>開源終端機 TUI；接任何模型、build／plan 雙模式</small></div>
  <div class="paper-card"><b>開源　pi</b><small>極簡輕量、可擴充；API key、訂閱、本地模型都能跑</small></div>
  <div class="paper-card"><b>開源　omo</b><small>多模型編排：任務拆給多個模型／子任務協調執行</small></div>
  <div class="paper-card"><b>IDE　Antigravity</b><small>Google 的 agentic IDE；多 agent 並行、內建瀏覽器</small></div>
  <div class="paper-card"><b>助理型　Hermes</b><small>自改進型：經驗沉澱成技能、有持久記憶</small></div>
  <div class="paper-card"><b>助理型　OpenClaw</b><small>自己機器上的個人助理；可經通訊工具操作電腦</small></div>
</div>

<div class="key-callout"><b>自選，正式考不限工具</b>　下節五個動作任何工具都一樣——今天就用正式考要用的那個。</div>

---
layout: default
---

<p class="kicker">第一節 定錨 <span>· 5 min</span></p>

# 正式考，<mark>考什麼？</mark>

<p class="lead">分數落在<strong>可觀察的產出</strong>，不在程式碼漂不漂亮；<strong>五份交付物</strong>都要在 repo 裡。</p>

<div class="five-grid compact">
  <div class="paper-card"><b>① 定義問題與規格</b><code>SPEC.md 20 分</code> <code>AGENTS.md 5 分</code><small>業務規則表＋API 一覽＝評審的驗收標準</small></div>
  <div class="paper-card"><b>② 測試與評估（evals）</b><code>verify/ 15 分</code><small>九個 API 各一支腳本，乾淨環境重跑全綠</small></div>
  <div class="paper-card"><b>③ 領域知識與判斷</b><code>30 分</code><small>併發安全、/chat 串 BIRC-LLM、decisions.md</small></div>
  <div class="paper-card"><b>④ 為結果負責</b><code>15 分</code><small>audit.md（錯什麼、怎麼發現、怎麼修）＋ Live demo</small></div>
  <div class="paper-card"><b>⑤ 驗證</b><code>40 分</code><small>隱藏驗收、評審抽跑 verify/、10 分鐘口試</small></div>
</div>

<div class="dark-callout"><b>五份交付物</b>　<code>SPEC.md</code> <code>AGENTS.md</code> <code>verify/</code> <code>audit.md</code> <code>decisions.md</code><br><small>缺任一項，對應項目歸零；另有必做創意題 15 分。今天的核心產出一樣：一筆 agent 失敗——用自己的 verify 抓到、自己修好、自己寫進 audit。</small></div>

---
layout: default
---

<p class="kicker">第一節 定錨 <span>· 5 min</span></p>

# 今天的規則＝<mark>正式考的規則</mark>

<div class="three-grid">
  <div class="paper-card"><b>① 可以帶模板</b><p>自己準備的 prompt、<code>AGENTS.md</code> 模板，還有今天發的 SPEC 骨架、範例腳本，都能帶進場。</p></div>
  <div class="paper-card"><b>② agent 工具自選</b><p>用哪個都可以。</p><small>今天就用你正式考要用的那個，手感才對。</small></div>
  <div class="paper-card"><b>③ 結尾同伴互講</b><p>每個人都要對旁邊的人講 1 分鐘。</p><small>agent 哪裡錯、你怎麼抓到的。</small></div>
</div>

<div class="dark-callout"><b>今天的兩條主線</b>　<strong>驗證</strong>——別信 agent 的嘴，信 exit 0；<strong>長記憶</strong>——agent 不記得任何事，專案裡的文件才記得。</div>
<div class="key-callout"><b>開始前</b>　現在就把你的模板、agent 工具準備好——前導練習照正式考的規則走。</div>

---
layout: default
---

<p class="kicker">第一節 定錨 <span>· 5 min</span></p>

# 90 分鐘總覽

<div class="timeline">
  <div><time>0–5</time><b>定錨＋第一次：直接實作</b><span>聽＋開工</span></div>
  <div><time>5–20</time><b>agent 基本操作 15 min</b><span>考生做</span></div>
  <div class="danger"><time>20–28</time><b>agent 會搞砸 ×4</b><span>現場演・最重要</span></div>
  <div><time>28–48</time><b>帶著寫 SPEC</b><span>你寫</span></div>
  <div><time>48–70</time><b>第二次實作：新專案</b><span>考生做</span></div>
  <div><time>70–90</time><b>審計＋收束</b><span>考生做＋講</span></div>
</div>

<div class="milestones"><b>T+48</b> SPEC 缺口補齊　　<b>T+55</b> 一起跑併發 case　　<b>T+90</b> 硬截止</div>

<!-- 老師備忘：T+48 起（後 42 分鐘）fading：只問，不給答案。 -->

---
layout: default
---

<p class="kicker">第一節 定錨 <span>· 5 min</span></p>

# 前導題目：借出＋歸還——<mark>第一次，直接實作</mark>

<div class="two-cols">
<div>
<p class="lead">正式考 9 個 API，今天只做 2 個</p>

<p><span class="api post">POST</span> <code>/loans/{id}/checkout</code></p>
<p><span class="api post">POST</span> <code>/loans/{id}/return</code></p>

- seed 已有 1 筆 `RESERVED`＋對應器材
- 不用實作預約
- 業務規則只給三條粗的
</div>
<div class="paper-card">
<b>practice_pkg＝今天的戰場</b>

- 能跑的 skeleton＋SQLite＋seed
- `SPEC.md` 兩處 TBD　`AGENTS.md` 四項＝完成標準
- `verify/` 2 支範例腳本＋`reset.sh`
- 1 筆有提示的髒資料：`dueAt` 早於 `lentOutAt`

<p><strong>現在做的事：</strong>開 agent → 直接實作（TBD 先不填、verify 先不寫）→ 看它哪裡錯</p>
</div>
</div>

<div class="dark-callout"><b>第一次：只給專案，直接實作</b><br>SPEC 骨架的兩處空白：<b>TBD-1</b> 併發處理機制（你自己選）　<b>TBD-2</b> 錯誤回應契約——第三節再填。</div>

---
layout: default
---

<p class="kicker">第二節 基本操作＋agent 會搞砸 <span>· 23 min</span></p>

# 15 分鐘上手：<mark>不管你用哪個 agent</mark>

<div class="two-cols wide-left">
<ol class="step-list">
  <li><b>開</b><span>在 <code>practice_pkg/</code>（專案根目錄）啟動 agent。</span></li>
  <li><b>下指令</b><span>給<strong>有明確完成條件</strong>的小任務：「列出專案裡的例外類別」。別丟一句模糊的「幫我看看專案」。</span></li>
  <li><b>看改動</b><span><code>git diff</code> 看<strong>實際</strong>改動。agent 的總結是 PR 描述，<strong>diff 才是真相</strong>。</span></li>
  <li><b>叫它跑</b><span>讓它跑 verify 腳本，你自己看輸出。<strong>exit 0 是唯一可信訊號。</strong></span></li>
  <li><b>退回</b><span>改壞就中斷它，用 git 退回。改壞不丟人，<strong>不知道改壞了</strong>才丟人。</span></li>
</ol>
<div class="paper-card"><small>沒裝 <code>birc</code>（骨架碼產生工具）？</small><br><code>npm i -g birc-generator</code><br><small>更新到最新：</small> <code>birc update</code></div>
</div>

<div class="key-callout"><b>開始實做</b>　<strong>15 分鐘計時</strong>——開 agent，把上面五個動作各做一遍。</div>

<!-- 老師備忘：演示五個動作（5 min）→ 每人自己做完（10 min）。完成條件：讓 agent 改一行程式，學生用 git diff 指出改了哪裡。卡安裝／登入先與同學配對。 -->

---
layout: default
---

<div class="ghost-number">01</div>
<p class="kicker">第二節 · agent 會搞砸 01 / 04</p>

# 規格沒寫死 → agent <mark class="red">靜默挑一種解讀</mark>

<ol class="failure-list">
  <li><b>觸發</b><span>下含糊指示：「錯誤的時候回個錯誤訊息就好」→ agent 自信地<strong>發明</strong>一套錯誤格式（狀態碼、回應體都自己編）。<strong>規格空白＝授權 agent 猜。</strong></span></li>
  <li><b>怎麼改</b><span>告訴它真正的契約：「SPEC 寫 409＋<code>Result</code> 外殼，照這個改」→ 用 <code>git diff</code> 看它改對沒有。</span></li>
  <li><b>怎麼防</b><span><code>SPEC.md</code> 的<strong>錯誤回應契約</strong>：狀態碼＋回應體格式寫死。寫進文件，agent 就不用每次都猜。</span></li>
  <li><b>怎麼驗</b><span>錯誤 case（負例）寫進 verify：斷言<strong>狀態碼＋回應體</strong>，重跑看 exit code。</span></li>
</ol>

<!-- 老師備忘：4 支 demo 都要預跑過；現場翻車就播預錄影片。 -->

---
layout: default
---

<div class="ghost-number">02</div>
<p class="kicker">第二節 · agent 會搞砸 02 / 04</p>

# 說<strong>完成了</strong>，其實是錯的

<ol class="failure-list">
  <li><b>觸發</b><span>agent 回報「實作完成、跑過、全綠」→ <strong>你自己重跑 verify</strong>：有一支 case 紅，或 DB 狀態不是該有的值。</span></li>
  <li><b>怎麼改</b><span>指著失敗的 case 叫它修，重跑直到過；改太多就用 <code>git</code> 退回、重下指令。</span></li>
  <li><b>怎麼防</b><span>完成標準<strong>不是「它說完成」，是「verify 過」</strong>——唯一可信的完成訊號：你的 verify 腳本 <strong>exit 0</strong>。</span></li>
  <li><b>怎麼驗</b><span>verify 要<strong>可重跑＋exit code＋負例</strong>，三缺一就不叫 eval；要能從乾淨環境重跑。</span></li>
</ol>

---
layout: default
---

<div class="ghost-number">03</div>
<p class="kicker">第二節 · agent 會搞砸 03 / 04</p>

# 併發<mark class="red">裸 UPDATE</mark>

<ol class="failure-list">
  <li><b>觸發</b><span>SPEC 故意不寫併發；當場跑併發 case → <strong>數量扣成負數、同一件被借兩次</strong>。</span></li>
  <li><b>怎麼改</b><span>叫它重讀你指定的 TBD-1 機制，重寫；重跑併發 case 到<strong>恰好 1 筆成功</strong>。</span></li>
  <li><b>怎麼防</b><span><strong>TBD-1</strong> 指定機制：唯一約束／樂觀鎖／悲觀鎖／其他，擇一，寫進 SPEC。</span></li>
  <li><b>怎麼驗</b><span>併發 case 寫進 <code>verify/</code> 必跑：同時借出同一器材，斷言<strong>恰好 1 筆成功、qty ≥ 0</strong>。不跑併發測試，你根本看不見這個 bug。</span></li>
</ol>

<div class="stamp">最貴</div>

---
layout: default
---

<div class="ghost-number">04</div>
<p class="kicker">第二節 · agent 會搞砸 04 / 04</p>

# 改了程式，<mark class="red">沒改文件</mark>

<ol class="failure-list">
  <li><b>觸發</b><span>agent 改完行為，問它「文件更新了嗎？」→ 沒。AGENTS.md／SPEC 還是<strong>舊規格</strong>。</span></li>
  <li><b>怎麼改</b><span>當場叫它補文件；你自己查一遍<strong>程式 ↔ 文件一致</strong>。</span></li>
  <li><b>怎麼防</b><span>AGENTS.md 寫死「<strong>行為改了，文件同一個 PR 更新</strong>」——agent 的長記憶就是專案文件：<strong>沒寫下來的，就不存在</strong>。</span></li>
  <li><b>怎麼驗</b><span>收尾前問它「讀文件，告訴我 X 現在的規則」，跟程式對——對不上就是文件過時。</span></li>
</ol>

---
layout: default
---

<p class="kicker">第二節 基本操作＋agent 會搞砸 <span>· 23 min</span></p>

# 四件「agent 會搞砸」，都照<mark>這三步</mark>走

<div class="three-grid big">
  <div class="paper-card"><b>① 觸發失敗</b><p>現場觸發，<strong>活的</strong>，不放截圖。</p></div>
  <div class="paper-card"><b>② 怎麼改・指出扣分點</b><p>現場改、指出扣分——這裡<strong>就是</strong>正式考會扣你分的地方。</p></div>
  <div class="paper-card"><b>③ 怎麼防・怎麼驗</b><p>SPEC 一句話／verify 一個 case／decisions 一筆。</p></div>
</div>

<p class="right-note">每個 2 分鐘</p>

---
layout: default
---

<p class="kicker">第三節 帶著寫 SPEC <span>· 20 min</span></p>

# 帶著填 SPEC：要學的是<mark>「問法」</mark>

<blockquote>如果你是 agent，讀到這份規格會有幾種做法？<br><em>你允許幾種？</em></blockquote>

<ol class="step-list">
  <li><b>第一步</b><span>業務規則用白話寫：「狀態不是 RESERVED 就不能借出」。先不碰程式。</span></li>
  <li><b>第二步</b><span>枚舉解讀：如果你是 agent，這句話你有幾種做法？會錯在哪？</span></li>
  <li><b>第三步</b><span>收斂成條款：一條規則一句話，邊界與錯誤契約寫進 SPEC。</span></li>
</ol>

- **TBD-2**：給範例格式，照抄改寫即可。
- **TBD-1**：只要求「機制必須指定、寫進 SPEC」，選哪個你自己決定。

<div class="danger-callout"><b>T+48 硬時間點</b>　SPEC 兩段都要寫好——<strong>不准帶著漏洞進實作</strong>。</div>

<!-- 老師備忘：T+48 缺一段：花 2 分鐘補上該生那一段，再放行進實作。 -->

---
layout: default
---

<p class="kicker">第四節 實作 <span>· 22 min</span></p>

# 第二次實作：<mark>新專案、同一題</mark>

<div class="two-cols">
<div class="stack">
  <div class="paper-card"><strong>開一個全新的 practice_pkg</strong>，再實作一次借出＋歸還——這次 SPEC 寫好了、AGENTS.md 寫好了、verify 備好了。</div>
  <div class="dark-callout"><b>看跟第一次差在哪</b>　有文件＋驗證，agent 少問、你少追、<strong>verify 當場抓</strong>。</div>
  <div class="dark-callout"><b>對 agent 下工單</b>　你的手不離開 verify 腳本。agent 在跑 ≠ 你可以空等：<strong>你的 verify 腳本，現在就在寫。</strong></div>
</div>
<div>
<h3>T+55：大家一起跑併發 case</h3>
<ol class="failure-list short">
  <li><b>有人失敗</b><span>當場走一輪：<strong>發現 → 定位 → 修 → 複跑 → 記 audit</strong><br><small>沒有人給答案——case 是你自己的。</small></span></li>
  <li><b>沒人失敗</b><span>當場抽一份 TBD-1 填法：「<strong>僥倖通過</strong>」和「<strong>真正安全</strong>」差在哪。</span></li>
</ol>
</div>
</div>

<!-- 老師備忘：新專案＝practice_pkg 的新副本（reset.sh 只重置資料，不重置程式）。巡場只問：「agent 在跑的時候，你在寫什麼？」 -->

---
layout: default
---

<p class="kicker">第五節 審計 <span>· 20 min</span></p>

# 審計：<mark>複跑＋記錄</mark>

<div class="two-cols">
<div class="paper-card ordered-card">
  <p><b>① verify 全套複跑</b><br><small>評審會抽跑，先練一次</small></p>
  <p><b>② 寫 audit.md</b><br><small>1 筆，四要素齊全</small></p>
  <p><b>③ 寫 decisions.md</b><br><small>併發那筆＋<strong>否決的方案</strong></small></p>
</div>
<div class="code-note"><b>audit.md</b><hr>
<strong>## A-01</strong> agent 寫的分頁查詢沒限制 size 上限<br>
<span>- <b>現象</b>：agent 哪裡錯、錯成什麼樣</span><br>
<span>- <b>證據</b>：哪支腳本、哪個 case、看到什麼輸出（verify 輸出或 transcript 片段）</span><br>
<span>- <b>修法</b>：改了什麼</span><br>
<span>- <b>防再犯</b>：補了哪個 verify case／哪句 SPEC</span>
</div>
</div>

<div class="dark-callout"><b>「證據」要指向</b>　<strong>具體的腳本和 case</strong>。<small>最容易編的一欄，也最容易被看穿。</small></div>

<!-- 老師備忘：巡場只查一件事：「證據」有沒有指向具體腳本和 case；指不出來就退回。 -->

---
layout: default
---

<p class="kicker">第六節 收束 <span>· 5 min</span></p>

# 收束：<mark>一分鐘口頭陳述</mark>

<div class="two-cols equal">
  <div class="paper-card green-paper"><small>兩兩一組，每人對旁邊的人講 1 分鐘</small><h2>agent 哪裡錯？<br>我怎麼抓到的？</h2><small>口試暖身，不計分。</small></div>
  <div class="paper-card"><small>聽的人負責追問；老師也會問沒教過的點，例如：</small><h2>「評審多跑一次你的 verify，會怎樣？」</h2></div>
</div>

<div class="key-callout"><b>講的時候也想一想</b>　第一次（直接實作）vs 第二次（文件＋驗證），差在哪——那就是<strong>為什麼要驗證、為什麼要文件</strong>的答案。</div>

---
layout: default
---

<p class="kicker">第六節 收束 <span>· 5 min</span></p>

# 今天 vs. <mark class="red">正式考</mark>

<div class="two-cols wide-left">
<table class="comparison">
  <thead><tr><th></th><th>今天前導</th><th>正式考</th></tr></thead>
  <tbody>
    <tr><td>API</td><td>2 個</td><td>9 個</td></tr><tr><td>時間</td><td>90 分鐘</td><td>180 分鐘</td></tr>
    <tr><td>SPEC 缺口</td><td>2 處・有提示</td><td>自己補完整・無提示</td></tr><tr><td>帶領</td><td>老師帶前半</td><td>全程沒人帶</td></tr>
    <tr><td>髒資料</td><td>1 筆・有提示</td><td>2 筆・無提示</td></tr><tr><td>併發腳本</td><td>老師提供</td><td>自己寫</td></tr>
    <tr><td>audit</td><td>≥ 1 筆</td><td>≥ 3 筆</td></tr><tr><td>驗收</td><td>老師追問</td><td>評審抽跑＋口試</td></tr>
    <tr><td><code>/chat</code></td><td>不做</td><td>必做</td></tr>
  </tbody>
</table>
<div class="paper-card"><b>必做：機器人問答 <code>POST /chat</code></b>
  <ul><li>必須串中心的 <strong>BIRC-LLM</strong></li><li>只回答<strong>查詢類</strong>問題</li><li>先查自己系統的真實資料，再交給 LLM</li><li>查無根據 → 回 SPEC 定的固定訊息</li><li>LLM 掛掉<strong>不得回 500</strong></li></ul>
</div>
</div>

---
layout: default
---

<p class="kicker">第六節 收束 <span>· 參考頁</span></p>

# 機器人問答 <code>/chat</code>：<mark>怎麼串 BIRC-LLM</mark>

<div class="two-cols">
<div class="paper-card">
<b>BIRC-LLM＝中心提供的 OpenAI 相容端點</b>

- 三個參數：`VLLM_BASE_URL`／`VLLM_API_KEY`／`VLLM_MODEL=BIRC-LLM`
- URL 與 key 考前提供；key 放環境變數，不寫進程式、不 commit
- 最快通連：`npx @lucashsu95/ai-forge init . --yes`
- 再跑 `ai-forge doctor` 依序查金鑰 → 端點 → 模型
</div>
<div>
<div class="code-note"><b>BIRC-LLM · OpenAI 相容 · POST /chat/completions</b><hr>
Authorization: Bearer {VLLM_API_KEY}<br>
{ "model": "BIRC-LLM", "messages": [<br>
　{ "role": "system", "content": "只用我給的資料回答；查不到就回答：SPEC 定的固定訊息" },<br>
　{ "role": "user", "content": "你查 DB 得到的資料＋會員的問題" } ] }
</div>
<div class="dark-callout"><b>資料流</b>　先查<strong>自己系統</strong>的真實資料 → 餵 LLM → 回文字。<strong>不讓 LLM 憑自己的知識作答。</strong></div>
<div class="danger-callout"><b>LLM 掛掉／逾時</b>　回你在 SPEC 定的狀態碼＋訊息——<strong>不得回 500</strong>。</div>
</div>
</div>

<!-- 小坑：答案有時在 reasoning_content（content 為空時看它）。

老師專用・不投影：風險速查
| 風險 | 對策 |
| --- | --- |
| agent 太強，沒出錯 | 2 處 SPEC 缺口＋1 筆髒資料＋T+55 併發＋備案演示 |
| 示範太完整，考生只看不練 | 示範只給失敗場景，不給完整解 |
| 照抄老師的 SPEC 填法 | 只示範問法；併發機制老師不選 |
| 環境／模型速度吃時間 | 事先預跑；卡住時老師可叫停、改口頭 |
| 帶著做 ≠ 自己會 | 後 42 分鐘 fading；結尾追問沒教的點 |
| 失敗 demo 翻車 | 預跑到能成功觸發，並錄影備案 |

老師專用・已定政策（開場講明）
1. 預製 prompt／AGENTS.md 模板可以帶；今天的 SPEC 骨架與範例腳本也可以。
2. agent 工具學生自選；前導就用正式考要用的那個。
3. 基本操作 15 min（演 5＋練 10）；失敗演示 15→8；SPEC 15→20（三步法）。
4. 結尾同伴互講，每人對旁邊的人講 1 分鐘，全員覆蓋。
工具自選＝老師的四支失敗 demo 只能用一種工具預跑；巡場時要能看懂不同工具的畫面。 -->
