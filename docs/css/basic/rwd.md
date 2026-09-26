---
outline: deep
head:
  - - meta
    - name: keywords
      content: CSS, RWD, mobile-first, container queries, responsive images, clamp
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: description
      content: 以 mobile-first 建立 RWD，涵蓋 viewport、range syntax、容器查詢、偏好設定與響應式圖片。
  - - meta
    - property: og:title
      content: CSS 響應式網頁設計 RWD 完整教學
  - - meta
    - property: og:type
      content: article
---

<script setup>
import CssRwdLab from '../../.vitepress/theme/components/CssRwdLab.vue'
</script>

# CSS 響應式網頁設計（RWD）

RWD 的核心不是為幾種裝置各寫一版。重點是讓內容在**一段連續尺寸**中都能閱讀、操作。這裡統一用 **mobile-first**：先把窄版寫好，再用 `min-width` 或 range syntax 逐步加強。

## 實作四步走

1. **正確 viewport** — 沒有它，media query 與字級都會跑掉
2. **流動尺寸 + 可換行版面** — 先建立彈性基底
3. **內容真的撐不住才加斷點** — 別預設立陣營
4. **圖片、偏好設定、互動一起測** — 斷點只是其中一環

---

## 簡報版本

<SlideButton
  slug="css-rwd"
  title="CSS 響應式網頁設計"
  description="用 mobile-first、容器查詢與流動尺寸建立韌性版面"
/>

---

## 互動實驗室

拖曳預覽寬度，直接看 container query、`clamp()` 與偏好模擬如何改變卡片。

<CssRwdLab />

---

## Viewport：別讓瀏覽器猜

行動瀏覽器若缺少 viewport meta，會先用較寬的虛擬版面再縮小，導致 media query 與文字尺寸全跑掉：

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

**別加 `user-scalable=no`、別過度限制 `maximum-scale`** — 使用者需要放大。VitePress 通常已內建；獨立 HTML 請自行確認。

---

## Mobile-first：先把窄版寫死

```css
.cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 40rem) {
  .cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 64rem) {
  .cards {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
```

斷點從**內容**來：逐步縮放，行長過長、控制項擠壓、版面失衡時才記錄。別拿 iPhone、iPad、Desktop 當規格。

---

## Media Query Range Syntax：讀起來像數學

Media Queries Level 4 引入比較運算子：

```css
@media (width >= 40rem) {
  /* 40rem 以上 */
}

@media (40rem <= width < 64rem) {
  /* 40rem（含）到 64rem（不含） */
}
```

傳統 `(min-width: 40rem)` 仍可用。但避免寫相鄰的 `max-width: 64rem` 和 `min-width: 64rem` — 邊界會重疊。range syntax 能清楚表達包含關係，一眼看懂。

---

## `clamp()`：不是每個尺寸都要斷點

`clamp(min, preferred, max)` 讓值在上下限間**連續**調整，不用堆 media query：

```css
:root {
  --space-page: clamp(1rem, 4vw, 4rem);
}

h1 {
  font-size: clamp(2rem, 1.4rem + 3vw, 4.5rem);
}

main {
  width: min(100% - 2 * var(--space-page), 70rem);
  margin-inline: auto;
}
```

**關鍵**：字級的 preferred 值請混用 `rem` + `vw`。只用 `vw` 會殺掉使用者縮放行為。

---

## Container Queries：元件看自己的容器

Media query 看 viewport；但可重用元件常要看**自己的可用空間**：

```css
.card-region {
  container: card / inline-size;
}

.card {
  display: grid;
  gap: 1rem;
}

@container card (width >= 30rem) {
  .card {
    grid-template-columns: 10rem 1fr;
  }
}
```

同一張卡片，放在 sidebar 320px、main 700px，各自變版 — 不用寫一堆 viewport breakpoint。

也可搭配 container query units：

```css
.card__title {
  font-size: clamp(1.25rem, 1rem + 2cqi, 2rem);
}
```

`cqi` = query container inline size 的 1%。找不到合適容器時會退回 small viewport，所以上下限仍要設。

---

## 使用者偏好：RWD 不只管寬度

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto;
    animation-duration: 0.01ms;
    animation-iteration-count: 1;
    transition-duration: 0.01ms;
  }
}

@media (prefers-color-scheme: dark) {
  :root { color-scheme: dark; }
}

@media (prefers-contrast: more) {
  .button { border-width: 2px; }
}

@media (hover: hover) and (pointer: fine) {
  .card:hover { transform: translateY(-2px); }
}
```

**hover 不能是唯一管道** — 觸控裝置沒有 hover，鍵盤操作需 `:focus-visible`。

---

## 響應式圖片：別讓手機下載 4K

`max-width: 100%` 只擋溢出，**擋不住手機下載過大圖片**。

### 同一構圖，不同解析度

```html
<img
  src="photo-800.webp"
  srcset="
    photo-480.webp 480w,
    photo-800.webp 800w,
    photo-1600.webp 1600w"
  sizes="(min-width: 64rem) 50vw, 100vw"
  width="1600"
  height="900"
  alt="講者在台上示範 CSS Grid"
>
```

瀏覽器根據 `srcset`、`sizes`、viewport 與像素密度自動選檔。加上 `width`、`height` 可預留比例，**直接減少 layout shift**。

### 不同構圖或格式

```html
<picture>
  <source media="(min-width: 48rem)" srcset="wide.webp">
  <source type="image/avif" srcset="portrait.avif">
  <img src="portrait.webp" alt="產品外觀正面照">
</picture>
```

`picture` 用於 **art direction**（裁切不同）或**格式選擇**；alt 寫在 `img` 上，描述內容而非「這是一張圖片」。

---

## 韌性細節：這幾行省掉無數 bug

```css
img, video {
  max-width: 100%;
  height: auto;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.text {
  overflow-wrap: anywhere;
}
```

- 別用固定高度包可換行文字
- 必測：200% 文字縮放、320 CSS px 寬度、橫向模式
- 觸控目標給足尺寸與間距
- 別靠 CSS 視覺重排破壞 DOM、Tab 與閱讀順序

---

## 練習（照著做一次比看十遍強）

1. 單欄卡片 → 內容需要時變兩欄，全程 mobile-first
2. 用 range syntax 寫出 `40rem ≤ width < 64rem`
3. 讓 card 依容器而非 viewport 切換圖文排列
4. 為 hero 圖加入 `srcset`、`sizes`、固有寬高與有意義 alt

---

## FAQ

**斷點用 px 還是 rem？** 都行。`rem` 較貼近使用者字級設定。關鍵是**由內容決定、一致使用**。

**Container query 能取代 media query？** 不能。頁面級環境用 media query；元件局部版面用 container query。

**mobile-first 較快？** 不保證。但 cascade 較清楚。網路效能仍要處理圖片、字型與 JS。

---

## 延伸閱讀

- [MDN：Responsive design](https://developer.mozilla.org/docs/Learn_web_development/Core/CSS_layout/Responsive_Design)
- [MDN：Container queries](https://developer.mozilla.org/docs/Web/CSS/CSS_containment/Container_queries)
- [MDN：Responsive images](https://developer.mozilla.org/docs/Web/HTML/Guides/Responsive_images)