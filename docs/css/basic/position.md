---
outline: deep
head:
  - - meta
    - name: keywords
      content: CSS, position, containing block, sticky, z-index, inset
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: description
      content: 從文流、containing block 到 sticky、fixed、z-index 與 inset，完整理解 CSS 定位。
  - - meta
    - property: og:title
      content: CSS Position 定位完整教學
  - - meta
    - property: og:type
      content: article
---

<script setup>
import CssPositionLab from '../../.vitepress/theme/components/CssPositionLab.vue'
</script>

# CSS Position 定位

`position` 決定元素如何參與文流，以及 `inset` 系列屬性要以哪個矩形為參考。

> **快速判斷**
> - 留在文流：`static`、`relative`、`sticky`
> - 脫離文流：`absolute`、`fixed`
> - `left: 30px` 是「左邊緣離參考邊 30px」，所以元素通常向右移，不是向左

## 簡報版本

<SlideButton
  slug="css-position"
  title="CSS Position 定位"
  description="用圖解理解文流、定位參考、sticky 與堆疊順序"
/>

## 互動實驗室

切換定位模式並調整 inset；sticky 模式可直接捲動預覽區。

<CssPositionLab />

## 五種定位模式

### `static`

預設值。元素照正常文流排列，`top`、`right`、`bottom`、`left` 與 `z-index` 通常不生效。

### `relative`

元素保留原本佔位，再從原位置視覺位移。其他元素不會補上空間。

```css
.box {
  position: relative;
  top: 20px;  /* 向下移 20px */
  left: 30px; /* 向右移 30px */
}
```

若要向左移，可用 `left: -30px` 或 `right: 30px`。同時指定互相衝突的兩側時，結果還受書寫方向影響，因此通常只指定一側。

### `absolute`

元素脫離正常文流，其 containing block 通常是最近一個 `position` 非 `static` 的祖先；若找不到，會回到 initial containing block，而不能簡化成「永遠相對 viewport」。

```css
.card { position: relative; }
.badge {
  position: absolute;
  inset-block-start: 0.5rem;
  inset-inline-end: 0.5rem;
}
```

邏輯屬性會配合書寫方向；`inset: 8px 12px` 等同上下 `8px`、左右 `12px`。

### `fixed`

通常相對 viewport 固定，不隨頁面捲動。但祖先若有 `transform`、`perspective`、`filter`（依規範與瀏覽器條件）等，可能為 fixed 元素建立 containing block，使它改為固定在該祖先內。

```css
.help {
  position: fixed;
  inset-inline-end: 1rem;
  inset-block-end: 1rem;
}
```

這是 fixed 元素「沒有固定在視窗」時最先要檢查的原因。

### `sticky`

sticky 先照文流排列，達到指定 inset 閾值後，黏在**最近的 scrolling ancestor** 範圍內；它不是切換成 `fixed`。

```css
.section-title {
  position: sticky;
  top: 0;
  z-index: 1;
  background: Canvas;
}
```

sticky 至少需要一個非 `auto` inset、可捲動距離與足夠容器空間。祖先的 `overflow: hidden/auto/scroll` 可能改變捲動容器；若項目 stretch 到與容器同高，也沒有可黏動距離。

## Containing block 不等於父元素

定位百分比與 inset 都依 containing block 計算：

- `relative`、`static`：通常依格式化上下文中的 content box。
- `absolute`：最近建立 absolute positioning containing block 的祖先，常見做法是 `position: relative`。
- `fixed`：通常是 viewport，但 transform 等祖先可能改寫。
- `sticky`：排版位置與 containing block 有關，黏附則受最近 scrolling ancestor 限制。

開發者工具可協助檢查 offset parent、overflow 與 transform。

## `z-index` 與 stacking context

`z-index: 999999` 不保證在全頁最上方。元素只能在自己的 stacking context 中排序；父層若位於另一層之下，子元素數字再大也無法跨出去。

常見建立 stacking context 的條件：

- 已定位元素搭配非 `auto` 的 `z-index`
- `position: fixed` 或 `sticky`
- `opacity < 1`
- `transform`、`filter`
- `isolation: isolate`

建議以少量語意層級管理，例如 content、dropdown、modal、toast。

## 常見模式

```css
.overlay {
  position: fixed;
  inset: 0;
}

.card { position: relative; }
.card__badge {
  position: absolute;
  inset: 0.5rem 0.5rem auto auto;
}
```

::: warning 可用性
固定與黏性內容不要遮住鍵盤焦點、頁面標題或縮放後文字。錨點被 sticky header 遮住時，可對標題設定 `scroll-margin-top`。
:::

## 練習

1. 做一個不影響卡片文流的右上角 badge。
2. 在 `overflow: auto` 的區塊中建立 sticky 標題。
3. 建立兩個 stacking context，驗證子元素的巨大 `z-index` 仍無法跨越父層。

## FAQ

- **absolute 為何不是相對父元素？** 父元素未必建立 containing block；先檢查最近的定位或 transform 祖先。
- **sticky 為何失效？** 檢查 inset、捲動空間、stretch 尺寸與每層祖先的 overflow。
- **fixed 為何跟著容器？** 檢查祖先的 transform、perspective 或 filter。

## 延伸閱讀

- [MDN：position](https://developer.mozilla.org/docs/Web/CSS/position)
- [MDN：Layout and the containing block](https://developer.mozilla.org/docs/Web/CSS/CSS_display/Containing_block)
- [MDN：Stacking context](https://developer.mozilla.org/docs/Web/CSS/CSS_positioned_layout/Stacking_context)
