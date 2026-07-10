---
outline: deep
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: CSS Grid, explicit grid, implicit grid, subgrid, auto-fit, minmax
  - - meta
    - name: description
      content: 從軌道、格線與自動放置到響應式網格及 subgrid，完整學習 CSS Grid。
  - - meta
    - property: og:title
      content: CSS Grid 完整教學
  - - meta
    - property: og:type
      content: article
---

<script setup>
import CssGridLab from '../../.vitepress/theme/components/CssGridLab.vue'
</script>

# CSS Grid 完整教學

Grid 是二維排版系統：容器定義列（row）、欄（column）與格線（line），項目可由自動放置演算法排列，也可指定位置。

> **核心心法**
> - template 建立 explicit grid；超出 template 的軌道屬於 implicit grid
> - `grid-column: 1 / 3` 指的是格線 1 到 3，所以跨 2 欄
> - 響應式卡片常用 `repeat(auto-fit, minmax(...))`

## 簡報版本

<SlideButton
  slug="css-grid"
  title="CSS Grid 網格排版"
  description="掌握格線、自動放置、對齊、areas 與 subgrid"
/>

## 互動實驗室

調整欄數、最小軌道、auto-fit/auto-fill 與 dense，自行觀察空軌道和補洞效果。

<CssGridLab />

## 基本名詞

- **grid container**：設定 `display: grid` 的元素。
- **grid item**：容器的直接子元素。
- **track**：兩條相鄰格線之間的列或欄。
- **cell**：一列與一欄交會的單格。
- **area**：由一或多個 cell 組成的矩形。
- **gap**：軌道之間的間距，不是額外軌道。

```css
.cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}
```

`minmax(0, 1fr)` 允許軌道縮到 `0`，可避免長內容把 `1fr` 欄撐破；實務上也可對 item 設 `min-width: 0`。

## Explicit 與 implicit grid

template 明確宣告的是 explicit tracks：

```css
.grid {
  display: grid;
  grid-template-columns: 10rem 1fr;
  grid-template-rows: auto 1fr;
}
```

若多出的項目或指定位置落在 template 外，瀏覽器會建立 implicit tracks。用 `grid-auto-rows`、`grid-auto-columns` 控制其尺寸：

```css
.grid {
  grid-auto-rows: minmax(5rem, auto);
}
```

不要混淆 `grid-template-*`（explicit）與 `grid-auto-*`（implicit）。

## 格線、跨度與命名

格線從 `1` 起算，`-1` 代表 explicit grid 最後一條線。

```css
.hero {
  grid-column: 1 / -1;
}

.feature {
  grid-column: span 2;
}
```

也可命名格線，提高可讀性：

```css
.layout {
  display: grid;
  grid-template-columns:
    [full-start] 1fr
    [content-start] minmax(0, 60rem)
    [content-end] 1fr
    [full-end];
}

.article {
  grid-column: content;
}
```

## 自動放置與 `grid-auto-flow`

預設 `grid-auto-flow: row`：依 DOM 順序逐列放置。`column` 改為逐欄；加上 `dense` 會嘗試用後面的較小項目補洞。

```css
.gallery {
  grid-auto-flow: row dense;
}
```

::: warning 閱讀順序
`dense` 可能讓視覺順序不同於 DOM、Tab 與螢幕閱讀器順序。只適合順序不重要的卡片，不要拿它重排表單或文章。
:::

## 尺寸：`fr`、`minmax()` 與 `repeat()`

`fr` 分配扣除固定尺寸與 gap 後的可用空間：

```css
grid-template-columns: 12rem minmax(0, 2fr) minmax(0, 1fr);
```

`minmax(min, max)` 設上下限。自適應卡片可寫：

```css
.gallery {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
  gap: 1rem;
}
```

- `auto-fill`：盡量建立可容納的軌道，沒有項目時空軌道仍保留。
- `auto-fit`：建立方式相近，但空軌道會折疊，既有項目可伸展。

## 對齊

Grid 有兩個層次：

- **軌道整體在容器中**：`justify-content`、`align-content`、`place-content`
- **item 在 cell 中**：`justify-items`、`align-items`、`place-items`
- **單一 item**：`justify-self`、`align-self`、`place-self`

```css
.grid {
  place-content: center;
  place-items: stretch start;
}
.featured {
  place-self: center;
}
```

只有容器有多餘空間時，content 對齊的差異才看得出來。

## Named areas

areas 很適合描述頁面骨架，每個同名區域必須形成矩形：

```css
.page {
  display: grid;
  grid-template:
    "header header" auto
    "main   aside" 1fr
    "footer footer" auto
    / minmax(0, 1fr) 16rem;
  gap: 1rem;
}

header { grid-area: header; }
main   { grid-area: main; }
aside  { grid-area: aside; }
footer { grid-area: footer; }
```

mobile-first 可先宣告單欄 areas，再於較寬斷點覆寫 template；DOM 順序仍應符合閱讀順序。

## `subgrid`

巢狀 grid 預設擁有自己的軌道，卡片內標題、內容和按鈕不會跨卡片對齊。`subgrid` 可沿用父 grid 的列或欄：

```css
.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.card {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 3;
}
```

subgrid 會沿用該軸的父層軌道與 gap；另一軸仍可自行定義。使用前依專案瀏覽器支援範圍確認相容性，並提供不需精準跨卡對齊的合理 fallback。

## 完整案例

```css
.products {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
  grid-auto-rows: minmax(8rem, auto);
  gap: clamp(0.75rem, 2vw, 1.5rem);
}

.products > :first-child {
  grid-column: span 2;
}

@media (width < 35rem) {
  .products > :first-child {
    grid-column: auto;
  }
}
```

## 練習

1. 建立三欄 explicit grid，再放入第七個項目觀察 implicit row。
2. 用 `grid-column: 1 / -1` 建立滿版標題。
3. 比較 `auto-fill` 與 `auto-fit` 在只有兩張卡片時的差異。
4. 用 named areas 做 mobile-first 的 article/aside/footer。

## FAQ

- **為何 `1fr` 還是溢出？** Grid item 預設最小尺寸可能由內容決定；試 `minmax(0, 1fr)` 與 `min-width: 0`。
- **為何 `align-content` 沒效果？** 容器需有比軌道總和更多的空間。
- **Grid 可和 Flex 混用嗎？** 可以；外層 Grid 管二維骨架，item 內用 Flex 排一列控制項很常見。

## 延伸閱讀

- [MDN：CSS grid layout](https://developer.mozilla.org/docs/Web/CSS/CSS_grid_layout)
- [MDN：Auto-placement](https://developer.mozilla.org/docs/Web/CSS/CSS_grid_layout/Auto-placement_in_grid_layout)
- [MDN：Subgrid](https://developer.mozilla.org/docs/Web/CSS/CSS_grid_layout/Subgrid)
