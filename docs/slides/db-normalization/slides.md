---
theme: seriph
title: 資料庫正規化 — 1NF 到 3NF 的拆表之旅
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
  sans: "Inter"
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
  ogImage: https://lucashsu95.github.io/LucasHsu.dev/images/mysql-cover.webp
  ogTitle: 資料庫正規化 — 1NF 到 3NF 的拆表之旅
  description: 資料冗餘、三種異常、1NF/2NF/3NF 與反正規化的權衡
exportFilename: db-normalization
---

<div class="absolute inset-0 bg-gradient-to-br from-[#0d1117] via-[#0d1117] to-[#10202e]"></div>

<div class="relative z-10">
  <p class="font-mono text-sm text-[#7ee787] mb-6">$ mysql -e "SHOW CREATE TABLE orders" --normalize</p>
  <h1 class="text-5xl">
    <span class="accent-brand">資料庫</span>
    <span class="text-white">正規化</span>
  </h1>
  <p class="mt-4 text-xl text-gray-300 font-mono">
    <span class="muted">//</span> 1NF → 2NF → 3NF 的拆表之旅
  </p>
  <div class="mt-14 grid grid-cols-4 gap-3 font-mono text-sm text-center">
    <div class="concept-card"><strong>1NF</strong><br><span class="muted">原子性</span></div>
    <div class="concept-card"><strong>2NF</strong><br><span class="muted">消除部分相依</span></div>
    <div class="concept-card"><strong>3NF</strong><br><span class="muted">消除遞移相依</span></div>
    <div class="concept-card"><strong>反正規化</strong><br><span class="muted">OLAP 的選擇</span></div>
  </div>
</div>

<!--
開場：正規化不是教條，是一套「讓每項事實只存一份」的系統化方法。
一般系統到 3NF 就足夠。預計 30–40 分鐘。
-->

---
layout: default
hideInToc: true
---

<p class="font-mono text-xs text-gray-500"><span class="accent-green">$</span> cat schema-plan.md</p>

# 今日路線

<div class="grid grid-cols-2 gap-4 mt-7">
  <div v-click class="concept-card"><strong>01 / 病灶</strong><br><span class="muted">資料冗餘與三種異常</span></div>
  <div v-click class="concept-card"><strong>02 / 三步拆表</strong><br><span class="muted">1NF 原子性 → 2NF → 3NF</span></div>
  <div v-click class="concept-card"><strong>03 / 權衡</strong><br><span class="muted">JOIN 的代價</span></div>
  <div v-click class="concept-card"><strong>04 / 反正規化</strong><br><span class="muted">OLTP vs OLAP 的選擇</span></div>
</div>

<div v-click class="mt-6 terminal-card text-sm">
  <span class="accent-orange">目標：</span>每項事實只存一份 —— 改一次，全站生效。
</div>

---
layout: section
transition: fade
---

<p class="font-mono accent-orange">PART 01</p>

# 病灶：冗餘與異常

<p class="font-mono muted">同一件事實，存了 N 份</p>

---
---

# 資料冗餘：未正規化的訂單表

| order_id | customer_name | customer_email | product_name | price |
| --- | --- | --- | --- | --- |
| 1 | 張三 | zhang@example.com | 筆記型電腦 | 30000 |
| 2 | 張三 | zhang@example.com | 滑鼠 | 500 |
| 3 | 李四 | li@example.com | 鍵盤 | 1200 |

<div class="mt-6 grid grid-cols-2 gap-4 text-sm">
  <div v-click class="concept-card"><strong>浪費空間</strong><br><span class="muted">張三的姓名和 email 重複出現</span></div>
  <div v-click class="concept-card"><strong>更新惡夢</strong><br><span class="muted">張三改 email，要 UPDATE 多筆記錄</span></div>
</div>

---
---

# 三種資料異常

<div class="grid grid-cols-3 gap-4 mt-8">
  <div v-click class="concept-card"><strong>插入異常</strong><br><span class="muted">想新增「資料庫設計」課程，但還沒有學生選修 → 存不進去</span></div>
  <div v-click class="concept-card"><strong>更新異常</strong><br><span class="muted">王老師改名，要改所有課程記錄，漏一筆就不一致</span></div>
  <div v-click class="concept-card"><strong>刪除異常</strong><br><span class="muted">刪掉最後一個選課學生，課程資訊跟著消失</span></div>
</div>

<div v-click class="mt-7 terminal-card text-sm">
  <p class="terminal-label">ROOT CAUSE</p>
  三種異常同一個病根：<span class="accent-orange">不相干的事實擠在同一張表裡</span>。
</div>

---
---

<NfQuiz />

<p class="print-answer hidden mt-4 text-sm">
  列印版答案：B。「改一筆漏一筆」是更新異常的招牌症狀。
</p>

<!--
答案 B。三種異常的關鍵字：插入卡在「新增」、更新卡在「改」、刪除發生在「刪最後一筆」。
-->

---
layout: section
transition: fade
---

<p class="font-mono accent-orange">PART 02</p>

# 三步拆表

<p class="font-mono muted">1NF → 2NF → 3NF，一步一個腳印</p>

---
---

# 1NF：每格只放一個值

<div class="grid grid-cols-2 gap-5 mt-6 text-sm">
  <div v-click>
    <p class="terminal-label">BEFORE — 違反原子性</p>

| student | courses |
| --- | --- |
| 張三 | 資料庫, 演算法, 網路 |

  </div>
  <div v-click>
    <p class="terminal-label">AFTER — 1NF</p>

| student | course |
| --- | --- |
| 張三 | 資料庫 |
| 張三 | 演算法 |
| 張三 | 網路 |

  </div>
</div>

<div class="mt-6 grid grid-cols-3 gap-3 text-sm text-center">
  <div v-click class="concept-card"><strong>消除重複群組</strong></div>
  <div v-click class="concept-card"><strong>欄位原子性</strong></div>
  <div v-click class="concept-card"><strong>建立主鍵</strong></div>
</div>

<!--
一格塞多個值，WHERE course = '演算法' 就得用 LIKE 硬撈——效能與正確性雙輸。
-->

---
---

# 2NF：消除部分相依

<p class="text-sm muted">主鍵是 (order_id, product_id)，但 product_name 只依賴 product_id —— 這就是部分相依</p>

<div class="grid grid-cols-2 gap-5 mt-4 text-sm">
  <div v-click>
    <p class="terminal-label">BEFORE — 部分相依</p>

| order_id | product_id | product_name | qty |
| --- | --- | --- | --- |
| 1 | P1 | 筆電 | 1 |
| 2 | P1 | 筆電 | 3 |

  </div>
  <div v-click>
    <p class="terminal-label">AFTER — 拆成兩張表</p>

| order_id | product_id | qty |
| --- | --- | --- |
| 1 | P1 | 1 |

| product_id | product_name |
| --- | --- |
| P1 | 筆電 |

  </div>
</div>

<div v-click class="mt-5 terminal-card text-sm">
  非主鍵欄位必須依賴<span class="accent-brand">整個主鍵</span>，不能只依賴主鍵的一部分。
</div>

---
---

# 3NF：消除遞移相依

<p class="text-sm muted">student_id → dept_id → dept_name：dept_name 透過 dept_id 間接依賴主鍵 —— 這就是遞移相依</p>

<div class="grid grid-cols-2 gap-5 mt-4 text-sm">
  <div v-click>
    <p class="terminal-label">BEFORE — 遞移相依</p>

| student_id | name | dept_id | dept_name |
| --- | --- | --- | --- |
| S1 | 張三 | D1 | 資工系 |
| S2 | 李四 | D1 | 資工系 |

  </div>
  <div v-click>
    <p class="terminal-label">AFTER — 獨立參照表</p>

| student_id | name | dept_id |
| --- | --- | --- |
| S1 | 張三 | D1 |

| dept_id | dept_name |
| --- | --- |
| D1 | 資工系 |

  </div>
</div>

<div v-click class="mt-5 terminal-card text-sm">
  非主鍵欄位之間<span class="accent-brand">不該互相依賴</span> —— 系名改一次，全系學生都對。
</div>

---
---

# 正規化流程一覽

```mermaid {theme: 'dark', scale: 0.6}
flowchart LR
    START[原始資料表] --> NF1["1NF<br/>消除重複群組<br/>欄位原子性"]
    NF1 --> NF2["2NF<br/>消除部分相依<br/>完全依賴主鍵"]
    NF2 --> NF3["3NF<br/>消除遞移相依<br/>獨立參照表"]
    NF3 --> END[完成]
    style START fill:#2d1c13,stroke:#e76f00
    style NF1 fill:#13202a,stroke:#4479a1
    style NF2 fill:#13202a,stroke:#4479a1
    style NF3 fill:#13202a,stroke:#4479a1
    style END fill:#13251a,stroke:#7ee787
```

<div v-click class="mt-6 terminal-card text-sm">
  <span class="accent-orange">注意：</span>正規化並非越高階越好。一般系統達到 <strong>3NF 已足夠</strong>，
  過度正規化只會讓查詢複雜度爆炸。
</div>

---
layout: section
transition: fade
---

<p class="font-mono accent-orange">PART 03</p>

# 權衡與反正規化

<p class="font-mono muted">沒有免費的午餐：JOIN 是代價</p>

---
layout: two-cols
layoutClass: gap-7
---

# 正規化給你的

<div class="space-y-3 mt-4">
  <div v-click class="concept-card text-sm"><strong>每項事實只存一份</strong><br><span class="muted">節省空間、改一次全站生效</span></div>
  <div v-click class="concept-card text-sm"><strong>資料完整性</strong><br><span class="muted">三種異常從根源消失</span></div>
  <div v-click class="concept-card text-sm"><strong>擴展性</strong><br><span class="muted">結構清晰，容易適應變更</span></div>
</div>

::right::

# 正規化要你付的

<div class="space-y-3 mt-4">
  <div v-click class="concept-card text-sm"><strong>JOIN 變多</strong><br><span class="muted">撈完整資訊要跨多張表</span></div>
  <div v-click class="concept-card text-sm"><strong>查詢變慢</strong><br><span class="muted">複雜 JOIN 影響讀取效能</span></div>
  <div v-click class="concept-card text-sm"><strong>理解成本</strong><br><span class="muted">高度正規化的結構較難一眼看懂</span></div>
</div>

---
---

# OLTP vs OLAP：選邊站

| 比較項目 | 正規化 | 反正規化 |
| --- | --- | --- |
| 資料冗餘 | 幾乎無 | 有，重複儲存 |
| 更新效能 | 快，只改一處 | 慢，要改多處 |
| 查詢速度 | 可能較慢（JOIN） | 快，少 JOIN |
| 一致性維護 | 容易 | 需要同步機制 |
| 適用場景 | <strong>OLTP</strong> 交易系統 | <strong>OLAP</strong> 報表／資料倉儲 |

<div v-click class="mt-5 terminal-card text-sm">
  <p class="terminal-label">STRATEGY</p>
  <span class="accent-green">從正規化開始</span>，根據效能測試結果再選擇性反正規化 ——
  讀取密集、報表分析、星型架構才是反正規化的主場。
</div>

---
---

# 今日重點

<div class="grid grid-cols-2 gap-4 mt-5">
  <div v-click class="concept-card"><strong>病根</strong><br><span class="muted">不相干的事實擠同一張表 → 三種異常</span></div>
  <div v-click class="concept-card"><strong>三步拆表</strong><br><span class="muted">1NF 原子性 → 2NF 部分相依 → 3NF 遞移相依</span></div>
  <div v-click class="concept-card"><strong>3NF 就夠</strong><br><span class="muted">過度正規化讓查詢複雜度爆炸</span></div>
  <div v-click class="concept-card"><strong>先正規化再權衡</strong><br><span class="muted">OLTP 正規化；OLAP 可適度反正規化</span></div>
</div>

<div v-click class="mt-7 text-center text-lg font-mono">
  正規化的本質：<span class="accent-orange">每項事實，只存一份</span>。
</div>

---
layout: end
class: text-center
---

# Schema normalized.

<p class="mt-5 font-mono muted">下一步：資料庫索引，讓 JOIN 不再是藉口</p>

<div class="mt-10 terminal-card inline-block text-left text-sm">
  <div><span class="accent-green">$</span> mysql -e "EXPLAIN SELECT ..."</div>
  <div class="accent-orange mt-2">1NF → 2NF → 3NF → 需要時再反正規化</div>
</div>

<!--
延伸閱讀回文章：資料庫索引基礎、SQL JOIN、ACID 交易。
-->
