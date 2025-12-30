---
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: CSS, animation-timeline, scroll(), view()
  - - meta
    - property: og:title
      content: CSS 滾動時間軸
  - - meta
    - property: og:description
      content: CSS 滾動時間軸
  - - meta
    - property: og:type
      content: article
---

# animation-timeline

> 📝 TL;DR
- `animation-timeline` 用來換掉預設時間軸，最常見：`scroll()`、`view()`。
- `scroll()`：動畫進度跟滾動同步，做滾動觸發漸變/位移。
- `view()`：依元素進出視口程度推進動畫，常用於進場效果。
- 通常搭配 `animation-range` 限定滾動區間。

## 快速示例
```css
@keyframes fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.card {
  animation: fade-up 1s ease both;
  animation-timeline: view(block);
  animation-range: entry 0% entry 100%;
}
```

`animation-timeline`、`scroll()` 和 `view()` 是 CSS 中用於控制動畫進度的新特性，主要用於實現與滾動或元素可見性相關的動畫效果。以下是它們的詳細介紹：

### **語法**
```css
animation-timeline: ``;
```
- `` 可以是以下值：
  - `none`：動畫不與任何時間軸關聯。
  - `auto`：動畫與文件的默認時間軸（`DocumentTimeline`）關聯。
  - `scroll()`：動畫與滾動條的進度關聯。
  - `view()`：動畫與元素在視口中的可見性關聯。

### **範例**
```css
.element {
    animation: slide-in 1s linear;
    animation-timeline: scroll(); /* 根據滾動條控制動畫 */
}
```

## **scroll()**
`scroll()` 是 `animation-timeline` 的一個函數，用於將動畫與滾動條的進度綁定。動畫的進度會根據滾動條的位置變化而變化。

### **語法**
```css
animation-timeline: scroll();
```
- 默認情況下，`scroll()` 會綁定到最近的滾動容器。
- 可以指定特定的滾動容器或軸向（如 `scroll(vertical)` 或 `scroll(horizontal)`）。

### **範例**
```css
@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.element {
    animation: fade-out 1s ease-out;
    animation-timeline: scroll(vertical); /* 根據垂直滾動條控制動畫 */
}
```

## **view()**
`view()` 是 `animation-timeline` 的另一個函數，用於將動畫與元素在視口中的可見性綁定。動畫的進度會根據元素進入或離開視口的程度來變化。

### **語法**
```css
animation-timeline: view();
```
- `view()` 可以指定軸向（如 `view(block)` 或 `view(inline)`）以及可見範圍（如 `view(0% 100%)`）。
- `block` 表示垂直方向，`inline` 表示水平方向。

### **範例**
```css
@keyframes fade-up {
    from {
        opacity: 0;
        transform: translatey(-10%);
    }
}
.element {
    animation: fade-up 1s linear both;
    animation-timeline: view(block); /* 根據元素在垂直方向的可見性控制動畫 */
    animation-range: entry 0% entry 100%;
}
```

## 動畫範圍
除了 `animation-timeline`，還可以使用 `animation-range` 來定義動畫的開始和結束滾動位置。這使得開發者能夠控制動畫在特定滾動範圍內的播放。例如，可以設置 `animation-range: 20vh 80vh;` 來限制動畫只在頁面的 `20%` 到 `80%` 之間播放。

## **總結**
- **`animation-timeline`**：用於指定動畫的時間軸來源。
- **`scroll()`**：將動畫與滾動條的進度綁定，適用於滾動驅動的動畫。
- **`view()`**：將動畫與元素在視口中的可見性綁定，適用於基於元素可見性的動畫。

### 更多範例

- [Bookstore](https://lucashsu95.github.io/webDesign/components/%E6%9B%B8%E5%BA%97/index.html)
- [scroll-anime.html](https://lucashsu95.github.io/webDesign/scroll/scroll-anime/scroll-anime.html)

## 實戰練習

### 練習 1：滾動淡出（簡單）⭐
> 讓標題在滾動 0→100vh 時逐漸消失。

:::details 💡 參考答案
```css
@keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
h1 {
  animation: fadeOut 1s linear;
  animation-timeline: scroll(block);
  animation-range: 0 100vh;
}
```
:::

### 練習 2：卡片進場（簡單）⭐
> 卡片進入視口時向上滑入並顯示。

:::details 💡 參考答案
```css
@keyframes rise { from { opacity: 0; transform: translateY(30px); } }
.card {
  animation: rise 0.8s ease-out both;
  animation-timeline: view(block);
  animation-range: entry 0% entry 100%;
}
```
:::

### 練習 3：自訂滾動容器（中等）⭐⭐
> 在水平滾動容器中，圖片依滾動進度縮放。

:::details 💡 參考答案與提示
```css
@keyframes zoomImg { from { transform: scale(.8); } to { transform: scale(1.1); } }
.scroll-x {
  overflow-x: auto;
  display: flex;
}
.scroll-x img {
  animation: zoomImg 1s ease both;
  animation-timeline: scroll(inline);
  animation-range: 0 100%;
}
```
**提示**：`scroll(inline)` 綁定水平軸。
:::

## FAQ
- Q: 與 `IntersectionObserver` 差異？
  - A: `view()` 是 CSS 原生時間軸，可直接驅動動畫；IO 是 JS 事件，需手動控制 class/動畫。
- Q: 行動裝置支援嗎？
  - A: 屬於新特性，需檢查瀏覽器版本；可加漸進增強 fallback。
- Q: 與 `animation-delay` 可同時用嗎？
  - A: 可以，但時間軸由 `animation-timeline` 決定；delay 仍會作用在動畫開始前。
