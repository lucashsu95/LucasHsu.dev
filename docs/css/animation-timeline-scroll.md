---
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: CSS, 滾動時間軸, animation-timeline, animation-timeline:scroll()
  - - meta
    - name: og:title
      content: CSS 滾動時間軸
  - - meta
    - name: og:description
      content: CSS 滾動時間軸
  - - meta
    - name: og:type
      content: article
---

# CSS 滾動時間軸

`animation-timeline: scroll()` 是一個 CSS 屬性，讓動畫的進度與頁面滾動相關聯。這意味著當用戶滾動頁面時，動畫會根據滾動位置進行播放，而不是僅依賴時間。

## 什麼是動畫時間軸？
傳統上，動畫的時間軸是基於時間的，從動畫開始到結束的過程中，動畫的進度是隨著時間的流逝而變化的。使用 animation-timeline: scroll()，開發者可以改變這一點，讓動畫的進度與滾動位置相關聯。這樣，當用戶滾動頁面時，動畫會根據滾動的百分比進行播放。

## 使用 scroll() 函數
`scroll()` 函數需要兩個參數：
滾動容器：這可以是 nearest（默認值，使用最近的滾動容器）、root（使用根元素，即整個頁面）或 self（使用元素本身作為滾動容器）。
軸向：可以是 block（默認值，通常是垂直方向）、inline（水平方向）、y（垂直）或 x（水平）。
例如，使用 `animation-timeline: scroll(root block);` 會將動畫綁定到整個頁面的垂直滾動。

## 動畫範圍
除了 `animation-timeline`，還可以使用 `animation-range` 來定義動畫的開始和結束滾動位置。這使得開發者能夠控制動畫在特定滾動範圍內的播放。例如，可以設置 `animation-range: 20vh 80vh;` 來限制動畫只在頁面的 `20%` 到 `80%` 之間播放。

## 使用範例

```html
<div class="element"></div>
<div class="other-stuff"></div>
```

```css
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.element {
  animation: fadeOut 2s forwards;
  animation-timeline: scroll();
}
.element {
  height: 300px;
  width: 300px;
  background-color: red;
}
.other-stuff {
  height: 800px;
  width: 300px;
}
```

- [更多範例](https://lucashsu95.github.io/webDesign/scroll/scroll-anime/scroll-anime.html)

## 備註
因為用**右邊滑到左邊**會**超出畫面**讓x軸的滾軸跑出來
所之後加上overflow-hidden...但沒想到會失效