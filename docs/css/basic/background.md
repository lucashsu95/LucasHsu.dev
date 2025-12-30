---
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: CSS, 背景圖片, background屬性, CSS縮寫, 視差效果
  - - meta
    - property: og:title
      content: CSS背景圖片設置 - 縮寫屬性詳解
  - - meta
    - property: og:description
      content: 學習使用一行CSS縮寫屬性設置背景圖片，包括置中、不重複、等比例放大及固定位置等效果
  - - meta
    - property: og:type
      content: article
---

# 背景圖片

> 📝 TL;DR
- 一行縮寫：`background: url(img) no-repeat center/cover fixed;`。
- 常見順序：色 > 圖 > repeat > position / size > attachment。
- 視差感：`background-attachment: fixed;`；滿版：`background-size: cover;`。

## 視覺化：縮寫拆解
```mermaid
flowchart LR
  A[background] --> B[url(img)]
  A --> C[no-repeat]
  A --> D[center center]
  D --> E[/ cover]
  A --> F[fixed]
```

主要是想講background可以寫成一行

`background: url('') no-repeat center center / cover fixed;`是一個CSS縮寫屬性，用於設置元素的背景樣式。以下是各個屬性值的解釋：

- `url('')`：指定背景圖片的URL路徑。如果沒有圖片，可以留空。

- `no-repeat`：背景圖片只顯示一次，不重複。

- `center center`：水平和垂直方向上都將背景圖片置中。也可以使用具體的位置值，如`top`、`right`、`bottom`、`left`或者百分比/長度單位。

- `/ cover`：設置背景圖片的大小。`cover`會等比例放大圖片，直到剛好填滿容器，也可以是`contain`、`auto`、`100%`。

- `fixed`：背景圖片固定在視口位置，不會隨頁面滾動而移動，一種視差感。

綜合起來，這個縮寫屬性會在元素的背景放置一張置中、不重複的圖片，並將其等比例放大以填滿整個容器。圖片在視口中保持固定位置，不會跟隨頁面滾動。

這種效果常用於製作全屏背景圖片，可以營造出一種視覺上的沉浸感。搭配適當的內容，可以突出主題並吸引用戶注意力。

## 實戰練習

### 練習 1：Hero 滿版背景（簡單）⭐
> 實作一個 100vh hero，背景置中且不變形。

:::details 💡 參考答案
```css
.hero {
  min-height: 100vh;
  background: url('/images/hero.jpg') center/cover no-repeat fixed;
}
```
:::

### 練習 2：多圖圖層（簡單）⭐
> 疊兩層背景：漸層 + 圖片。

:::details 💡 參考答案
```css
.card {
  background:
    linear-gradient(135deg, rgba(0,0,0,.4), rgba(0,0,0,.2)),
    url('/img/pattern.png') center/200px repeat;
}
```
:::

### 練習 3：視差卡片（中等）⭐⭐
> 讓卡片滾動時背景固定，內容可滾。

:::details 💡 參考答案與提示
```css
.parallax-card {
  background: url('/img/mountain.jpg') center/cover fixed;
  padding: 48px;
  color: #fff;
}
```
**提示**：使用 `background-attachment: fixed;` 並確保高度足夠。
:::

## FAQ
- Q: `cover` 會不會裁切圖片？
  - A: 會，為了填滿容器可能裁掉邊緣；想完整顯示用 `contain`。
- Q: 行動裝置 `background-attachment: fixed` 常失效？
  - A: 是，部分行動瀏覽器為省電禁用，可改用 `transform` + `will-change` 自製視差。
- Q: 縮寫順序一定要固定嗎？
  - A: 常見順序為 color > image > repeat > position / size > attachment，保持一致可讀性更高。
