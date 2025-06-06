---
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: CSS, 背景圖片, background屬性, CSS縮寫, 視差效果
  - - meta
    - name: og:title
      content: CSS背景圖片設置 - 縮寫屬性詳解
  - - meta
    - name: og:description
      content: 學習使用一行CSS縮寫屬性設置背景圖片，包括置中、不重複、等比例放大及固定位置等效果
  - - meta
    - name: og:type
      content: article
---

# 背景圖片

主要是想講background可以寫成一行

`background: url('') no-repeat center center / cover fixed;`是一個CSS縮寫屬性，用於設置元素的背景樣式。以下是各個屬性值的解釋：

- `url('')`：指定背景圖片的URL路徑。如果沒有圖片，可以留空。

- `no-repeat`：背景圖片只顯示一次，不重複。

- `center center`：水平和垂直方向上都將背景圖片置中。也可以使用具體的位置值，如`top`、`right`、`bottom`、`left`或者百分比/長度單位。

- `/ cover`：設置背景圖片的大小。`cover`會等比例放大圖片，直到剛好填滿容器，也可以是`contain`、`auto`、`100%`。

- `fixed`：背景圖片固定在視口位置，不會隨頁面滾動而移動，一種視差感。

綜合起來，這個縮寫屬性會在元素的背景放置一張置中、不重複的圖片，並將其等比例放大以填滿整個容器。圖片在視口中保持固定位置，不會跟隨頁面滾動。

這種效果常用於製作全屏背景圖片，可以營造出一種視覺上的沉浸感。搭配適當的內容，可以突出主題並吸引用戶注意力。
