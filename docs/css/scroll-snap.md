---
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: css,滾動時間軸,滾動快照
  - - meta
    - name: og:title
      content: CSS scroll-snap
  - - meta
    - name: og:description
      content: 介紹scroll-snap-type、scroll-snap-stop、scroll-snap-align、scroll-padding
  - - meta
    - name: og:type
      content: article
---

# CSS Scroll Snap 屬性介紹

CSS Scroll Snap 是一組用於定義滾動位置快照點的 CSS 屬性,可以提供更好的滾動體驗。

## `scroll-snap-type`

- 定義滾動容器應該如何"快照"其內容。
- 可以設置為 `x`、`y`、`block`、`inline` 或 `both` 來指定快照的方向。
- 可選的 `mandatory` 或 `proximity` 值控制快照的嚴格性。

## `scroll-snap-stop`

- 控制滾動是否可以"跳過"快照位置。
- `always` 值確保滾動不會跳過任何快照位置。

## `scroll-snap-align`

- 定義元素在其滾動容器內的對齊方式。
- 可以設置為 `none`、`start`、`end` 或 `center`。

## `scroll-padding`

- 在滾動容器的各個方向上添加一些填充。
- 可以單獨設置每個方向,如 `scroll-padding-top`、`scroll-padding-right`、`scroll-padding-bottom` 和 `scroll-padding-left`。

## 使用示例

```css
.scroll-container {
  scroll-snap-type: y mandatory;
  scroll-padding-bottom: 5%;
}

.snap-element {
  scroll-snap-align: center;
}
```

這段代碼對滾動容器啟用垂直方向的強制性滾動快照,並在容器底部添加 5% 的填充。同時,它將子元素對齊到容器中心。

## 範例網站

- [範例1](https://lucashsu95.github.io/webDesign/scroll/scroll-snap/scroll-snap.html)
- [範例2](https://lucashsu95.github.io/webDesign/scroll/index.html)