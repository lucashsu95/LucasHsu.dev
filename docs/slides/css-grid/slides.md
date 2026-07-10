---
theme: seriph
title: CSS Grid — Track Lab
layout: cover
transition: slide-left
mdc: true
lineNumbers: true
colorSchema: dark
fonts:
  sans: "Inter"
  mono: "JetBrains Mono"
stylesheet: ./style.css
exportFilename: css-grid
---

<div class="lab-kicker">CSS LAYOUT LAB · 03</div>
<h1 v-motion :initial="{ scale: .9, opacity: 0 }" :enter="{ scale: 1, opacity: 1 }">Grid<br><span>設計軌道，不是畫表格</span></h1>
<p class="lead" v-click>Explicit × Implicit × Responsive tracks × Subgrid</p>
<div class="grid-mark"><i v-for="n in 12" :key="n"></i></div>

<!--
Grid 的核心是 track sizing。先區分顯式與隱式軌道，再掌握重複、自動配置與 subgrid。
-->

---
layout: center
---

# Grid 的四層模型

<p class="lead">Grid 不是一張表，而是一組可命名的軌道系統。先分清 container、lines、tracks、areas，後面的 sizing 與 placement 才讀得懂。</p>

<div class="track-flow">
  <div v-click><b>container</b><span>建立 grid formatting context</span></div>
  <div v-click><b>lines</b><span>可命名的邊界</span></div>
  <div v-click><b>tracks</b><span>row / column 尺寸</span></div>
  <div v-click><b>areas</b><span>矩形區域</span></div>
</div>

---
layout: two-cols
layoutClass: gap-8
---

# Explicit grid

<p class="lab-note">你在 CSS 裡明確宣告了幾欄、幾列，以及每條 track 的尺寸——這就是 explicit grid。</p>

```css
.dashboard {
  display: grid;
  grid-template-columns:
    [nav] 14rem
    [main] minmax(0, 1fr);
  grid-template-rows: auto 1fr;
}
```

<p v-click class="lab-note">`minmax(0, 1fr)` 允許 track 縮到 0，避免長內容以 auto minimum 撐爆。</p>

::right::

# Implicit grid

<p class="lab-note">item 超出你宣告的 track 數量時，瀏覽器會自動補出額外軌道；尺寸由 `grid-auto-*` 決定。</p>

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 8rem;
  grid-auto-flow: row dense;
}
```

<div v-click class="callout">超出 explicit tracks 的 item 會建立 implicit tracks；其尺寸由 `grid-auto-*` 控制。`dense` 可能使視覺順序不同於 DOM / focus 順序。</div>

---

# `auto-fill` vs `auto-fit`

<p class="lead">兩者都能做響應式欄數，差別在「容器還有空間時，要不要保留沒被 item 佔用的空軌道」。</p>

<div class="compare">
  <div v-click><code>repeat(auto-fill, minmax(12rem, 1fr))</code><b>保留空軌道</b><p>容器還放得下幾欄，就建立幾欄；沒有 item 的 track 仍存在。</p></div>
  <div v-click><code>repeat(auto-fit, minmax(12rem, 1fr))</code><b>折疊空軌道</b><p>空 track 折成 0，已有 items 可拉伸填滿。</p></div>
</div>

<div v-click class="lab-note">兩者都能做「不寫 breakpoint」的 fluid grid；差異在剩餘空間如何處理。</div>

---

# Track sizing 思考流程

<p class="lead">瀏覽器先滿足固定與內容尺寸，再把剩餘空間用 `fr` 分配；溢出時常要回頭檢查 `minmax()` 與 `min-width: auto`。</p>

```mermaid {theme: 'dark', scale: 0.64}
flowchart LR
  A["可用空間"] --> B["先處理固定尺寸"]
  B --> C["處理 intrinsic<br/>min/max-content"]
  C --> D["分配 fr 彈性空間"]
  D --> E["不足時檢查<br/>min-width: auto"]
```

<div class="card-grid">
  <div v-click class="lab-card"><b>`fr`</b><p>分配剩餘空間，不等於百分比。</p></div>
  <div v-click class="lab-card"><b>`minmax()`</b><p>為 track 指定合法的尺寸範圍。</p></div>
  <div v-click class="lab-card"><b>`min-content`</b><p>內容在不溢出的前提下盡量窄。</p></div>
</div>

---

# Subgrid：共享祖先軌道

<p class="lead">子 grid 沿用父 grid 的 row 或 column tracks，讓多張卡片內的標題、內文、按鈕能在同一條垂直節奏上對齊。</p>

```css
.cards { display: grid; grid-template-columns: repeat(3, 1fr); }
.card  { display: grid; grid-template-rows: subgrid; grid-row: span 3; }
```

<div class="subgrid-demo">
  <div v-click><b>標題長短不同</b><span>描述仍對齊</span><button>Action</button></div>
  <div v-click><b>短標題</b><span>共用 parent row tracks</span><button>Action</button></div>
  <div v-click><b>跨元件一致的垂直節奏</b><span>不需硬編固定高度</span><button>Action</button></div>
</div>

<p v-click class="lab-note">Subgrid 可作用於 columns、rows 或兩者；item placement 仍受 parent grid span 範圍限制。</p>

---

# Shiki Magic Move：固定欄數到 intrinsic grid

<p class="lead">從固定三欄出發，改成 `auto-fit` + `minmax()`，讓欄數隨容器寬度變化，而不必寫 media query。</p>

````md magic-move
```css
.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
```
```css
.cards {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
  gap: clamp(.75rem, 2vw, 1.5rem);
}
```
````

---
layout: center
---

# Live Lab

<p class="lead">拖曳容器寬度、調整欄數與 gap，觀察 explicit tracks 如何隨空間重新分配；重點是「軌道怎麼算」，不是背語法。</p>

<GridLab />

<div class="monaco-probe">

```css {monaco}
display: grid;
```

</div>

<!--
拖曳容器右側把手改變 inline-size；Monaco 白名單解析 grid-template-columns、gap、grid-auto-rows。
-->

---

# 快問快答

<p class="lab-note">`dense` 只改變自動放置策略，不會幫你折疊空欄；要讓少數卡片拉寬，應選 `auto-fit`。</p>

<div class="quiz">
  <p>希望只有兩張卡時卡片拉寬，不保留看不見的空欄，選哪個？</p>
  <div v-click="1">A. auto-fill　 B. auto-fit　 C. dense</div>
  <div v-click="2" class="answer">B：`auto-fit` 折疊沒有 item 的空 tracks。</div>
</div>

---
layout: end
---

# 讓內容參與尺寸決策

<p class="lead">Grid 的 tracks 是約束條件，最終版面由內容尺寸與演算法共同決定；設計時先想「軌道規則」，再想「item 怎麼放」。</p>
<p>Tracks 是約束；Grid 演算法負責分配。</p>
<small>列印版：Live Lab 顯示 560px 預設容器。</small>
