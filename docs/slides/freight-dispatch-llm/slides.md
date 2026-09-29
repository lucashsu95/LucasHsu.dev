---
theme: seriph
title: 用一句話建出調度模型 — 卡車調度 × LLM
layout: cover
transition: slide-left
mdc: true
lineNumbers: true
colorSchema: dark
fonts:
  sans: "Inter, PingFang TC, Noto Sans TC, sans-serif"
  mono: "JetBrains Mono, PingFang TC, Noto Sans TC, monospace"
stylesheet: ./style.css
exportFilename: freight-dispatch-llm
---

<div class="kicker">RESEARCH PROPOSAL · 2026</div>

<h1 v-motion :initial="{ y: 28, opacity: 0 }" :enter="{ y: 0, opacity: 1 }">用一句話<br><span>建出可執行的調度模型</span></h1>

<p class="lead">讓中小型運輸業者用自然語言描述限制，系統把它變成限制式、測試案例和排班結果。</p>

<div class="gate-visual">
  <div class="gate-row"><code>instruction</code><span>危險品那批走外環</span><i class="wait"></i></div>
  <div class="gate-row"><code>constraint</code><span>禁行危險品路段</span><i class="ok"></i></div>
  <div class="gate-row"><code>test_case</code><span>pass / fail × 2</span><i class="ok"></i></div>
  <div class="gate-row"><code>solver</code><span>Pyomo + Gurobi</span><i class="wait"></i></div>
</div>

---
layout: two-cols
layoutClass: gap-9 v-center
---

# 一個大問題

<p class="lab-note">調度系統從一個港口搬到另一個港口，就要重找專家、重收資料，重新調校數週到數月。中型業者沒有這個預算。</p>

<div class="thesis">
<b>命題</b>
<p>用自然語言描述限制，模型自己建立、自己驗證、自己求解。安全與減碳一起算。</p>
</div>

::right::

<div class="stat-stack">
  <div><b>3,826 → 0</b><span>4 萬筆訂單下，MILP 單獨求解的未送達件數；加上啟發式後歸零</span></div>
  <div><b>0.18 vs 0.31</b><span>四個 agent 協作的空駛比，對照單一 RL</span></div>
  <div><b>27 – 33%</b><span>PortAgent 拿掉 RAG 或自我修正後的解正確率</span></div>
</div>

---
layout: section
transition: fade
---

<div class="kicker">PART 01</div>

# 文獻回顧：三篇，各解決一段

<p class="lab-note">多代理強化學習、混合求解、以及讓 LLM 寫最佳化模型。三篇各留一個洞。</p>

---
layout: two-cols
layoutClass: gap-9
---

<div class="paper-tag">PAPER 01 · HSR London, 2026</div>

# MARL + LLM 卡車調度

<p class="lab-note">規則式與最佳化式調度跟不上的地方是即時變動：需求、路況、司機狀態。</p>

<div class="stack">
  <div><b>方法</b><span>卡車、貨物、路線、獲利四個 agent 用 MARL 學調度。LLM 把仲介訊息與調度員指令轉成限制向量 Ct，注入狀態。</span></div>
  <div><b>模擬結果</b><span>Total Reward 0.91（單一 RL 0.79）、空駛比 0.18（0.31）、準時率 93%（84%）。</span></div>
</div>

::right::

<div class="limits">
  <div class="limits-head">限制與觀察</div>
  <ul>
    <li>沒有「只用 MARL、不加 LLM」的對照，LLM 的貢獻未被驗證</li>
    <li>模擬細節、隨機種子、變異數都未交代</li>
    <li>參考文獻編號對不上</li>
  </ul>
  <div class="limits-note">這篇我當靈感，不當證據。</div>
</div>

---
layout: two-cols
layoutClass: gap-9
---

<div class="paper-tag">PAPER 02 · ICAPS 2021</div>

# DeepFreight：多次轉運的貨運配送

<p class="lab-note">貨運要同時顧到服務所有訂單與省油。VRP／MILP 在大規模下算不動，也沒考慮貨物中途轉運。</p>

<div class="stack">
  <div><b>方法</b><span>QMIX 學卡車派遣，DFS 貪婪配對（允許多次轉運），剩餘少量訂單交給 MILP 精算。</span></div>
  <div><b>模擬結果</b><span>20 輛車、4 萬筆訂單：MILP 單獨約 3,826 件未送達，DeepFreight 約 643 件，兩者合用為 0。允許轉運讓行駛時間少約 7.5%。</span></div>
</div>

::right::

<div class="limits">
  <div class="limits-head">限制與觀察</div>
  <ul>
    <li>純模擬：美東 10 個配送中心</li>
    <li>需求需事先已知，不能線上應對新單</li>
    <li>純 RL 訓練不穩定</li>
  </ul>
  <div class="limits-note">「啟發式處理大部分、求解器收尾」這一段可以直接沿用。</div>
</div>

---
layout: two-cols
layoutClass: gap-9
---

<div class="paper-tag">PAPER 03</div>

# PortAgent：讓 LLM 當虛擬專家團隊

<p class="lab-note">換一個港口就要重新調校。目標是讓 LLM 產出可執行的最佳化模型，而不是重新求解。</p>

<div class="stack">
  <div><b>方法</b><span>LLM 模擬專家團隊做檢索、建模、寫程式與除錯，搭配 RAG few-shot 與 Reflexion 式自我修正，輸出 Pyomo／Gurobi 模型。</span></div>
  <div><b>結果</b><span>45 個案例：可執行率 100%，解正確率 93.33%，平均 83 秒。拿掉 RAG 或自我修正後掉到約 27～33%。</span></div>
</div>

::right::

<div class="limits">
  <div class="limits-head">限制與觀察</div>
  <ul>
    <li>測試題簡單，都是「加限制的最短路徑」</li>
    <li>3 次失敗全是語意誤解</li>
    <li>「專業程度無顯著影響」的樣本小，檢定力不足</li>
  </ul>
  <div class="limits-note">20 個節點的規模，撐不起調度題目的複雜度。</div>
</div>

---

# 三篇的共同缺口

<div class="grid-3-1">
  <div>
    <div class="row-mark"><b>01</b><span>MARL + LLM</span><em>LLM 解析層沒有對照實驗，增益歸因不明</em></div>
    <div class="row-mark"><b>02</b><span>DeepFreight</span><em>模擬環境固定，需求不能線上變動</em></div>
    <div class="row-mark"><b>03</b><span>PortAgent</span><em>規模停在 20 個節點，失敗集中在語意</em></div>
  </div>
  <div class="verdict-box">
    <div class="verdict-kicker">GAP</div>
    <p>三篇都做了<b>某一層</b>的驗證，<br>沒有人在<b>指令到限制式</b>這一層建立基準。</p>
    <p class="verdict-now">我的切入點就是這一層。</p>
  </div>
</div>

---
layout: section
transition: fade
---

<div class="kicker">PART 02</div>

# 對社會的貢獻

<p class="lab-note">讓中小型運輸業者用自然語言就能可靠地建立並求解調度模型，同時兼顧安全與減碳。</p>

---

# 一個大問題，三個小問題

<div class="prob-stack">
  <div class="prob-row">
    <div class="prob-name"><b>1</b><span>可信賴</span><em>自然語言轉成限制式時，結果怎麼驗證？</em></div>
    <div class="prob-body">
      <div><b>缺口</b><span>PortAgent 的失敗全是語意誤解；①的 LLM 解析層未被驗證。</span></div>
      <div><b>社會貢獻</b><span>危險品禁行、限高限重不被誤解，安全風險下降。</span></div>
    </div>
  </div>
  <div class="prob-row">
    <div class="prob-name"><b>2</b><span>可擴展</span><em>規模變大時，怎麼維持穩定與省油？</em></div>
    <div class="prob-body">
      <div><b>缺口</b><span>MILP 放大就算不動，純 RL 不穩定（②）；PortAgent 只測 20 個節點。</span></div>
      <div><b>社會貢獻</b><span>空駛與油耗下降，小公司不必聘最佳化專家。</span></div>
    </div>
  </div>
  <div class="prob-row">
    <div class="prob-name"><b>3</b><span>可重現</span><em>怎麼建立能公平比較的公開基準？</em></div>
    <div class="prob-body">
      <div><b>缺口</b><span>三篇的評測都是自建、小樣本。</span></div>
      <div><b>社會貢獻</b><span>公共財，後續研究可以直接比較，不用重蓋評測環境。</span></div>
    </div>
  </div>
</div>

---
layout: section
transition: fade
---

<div class="kicker">PART 03</div>

# 具體方案

<p class="lab-note">三個小問題各自有做法，驗證指標在最後一頁。</p>

---

# 1 可信賴：每條限制都要有測試案例

```mermaid {theme: 'dark', scale: 0.58}
flowchart LR
  A["口語指令"] --> B["限制式<br>Pyomo / Gurobi"] --> C["自動產生測試案例<br>通過 + 不通過"]
  C --> D{"指令模糊？"}
  D -->|是| E["系統反問使用者"]
  D -->|否| F["求解 + 量測"]
```

<p class="lab-note">建模完成後，為每條限制各產生一個通過案例與一個不通過案例。指令模糊時由系統反問，不自己猜門檻。</p>

<ConstraintGate />

---

# 2 可擴展：啟發式先跑，求解器收尾

<p class="lab-note">沿用 DeepFreight＋MILP 的分工。LLM 負責把指令變成模型，規模問題交給演算法。</p>

<div class="split-panel">
  <div>
    <b class="no">LLM 直接求解</b>
    <p>節點數一多就卡住，等待時間無法預估。</p>
    <em>PortAgent 只測到 20 個節點。</em>
  </div>
  <div>
    <b class="yes">啟發式 + 求解器</b>
    <p>啟發式處理大部分訂單，剩下難題交給求解器精算。</p>
    <em>4 萬筆訂單的案例裡，未送達件數從 643 降到 0。</em>
  </div>
</div>

<div class="metrics">
  <div><b>求解時間</b><span>同一路網規模下，從指令到可執行解的時間，與只用最佳化、只用 RL 比較</span></div>
  <div><b>空駛比</b><span>空車里程 ÷ 總里程，沿用 ① 的量法</span></div>
</div>

---

# 3 可重現：把評測環境做成公共財

<div class="row-mark"><b>01</b><span>路網</span><em>用 OpenStreetMap 或政府開放資料，不自建模擬城市</em></div>
<div class="row-mark"><b>02</b><span>指令資料集</span><em>繁體中文口語指令 + 標準答案，每條指令附限制式與測試案例</em></div>
<div class="row-mark"><b>03</b><span>多組種子</span><em>同一組評測跑多組隨機種子，用等效性檢定報信賴區間</em></div>

<div class="limits-note tall">
  三篇的評測都是自建、小樣本。我把這一層公開，其他人才有東西可以比。
</div>

---

# 預期產出與驗證指標

<div class="metrics wide">
  <div><b>開源原型</b><span>自然語言指令到限制式、測試案例、排班結果的完整流程</span></div>
  <div><b>評測集</b><span>路網、繁體中文口語指令、標準答案與多組隨機種子</span></div>
  <div><b>限制正確率</b><span>每條限制的測試案例通過比例。通過與不通過各一個，缺一不可</span></div>
  <div><b>求解時間</b><span>不同規模下的建模時間與求解時間分開量</span></div>
  <div><b>空駛比</b><span>與 ① 的 0.18／0.31 用同一種算法計算</span></div>
</div>

<p class="lab-note">限制正確率是這份計畫最硬的一項指標。其他兩項都是借來的量法。</p>

---
class: v-center
---

# 快問快答

<div class="quiz">
  <p>仲介說「危險品那批盡量走外環」。哪一種做法最安全？</p>
  <div v-click="1">A. 讓 LLM 自己決定「盡量」的門檻　 B. 直接當成硬性禁行規定　 C. 反問Broker要門檻與例外</div>
  <div v-click="2" class="answer">C：「盡量」沒有門檻，猜錯就是安全問題。這一頁的互動可以試。</div>
</div>

---
layout: end
---

# 指令進來，限制式出去

<p class="lead">把「指令到限制式」這一層變成可驗證的，後面的規模與碳排才有討論的基礎。</p>
<p>範圍：自然語言建模、限制式驗證、啟發式加求解器、公開評測集</p>
<small>文獻：MARL+LLM 調度（2026）、DeepFreight（ICAPS 2021）、PortAgent。</small>
