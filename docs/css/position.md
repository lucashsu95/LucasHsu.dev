---
head:
  - - meta
    - name: keywords
      content: css,css position,position,css定位
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: og:title
      content: Css Position 定位
  - - meta
    - name: og:description
      content: position屬性用於控制HTML元素在網頁上的位置和布局方式。這個屬性有幾個不同的值，每個值都控制元素的定位方式。以下是position的主要值
---

# Css Position 定位

position屬性用於控制HTML元素在網頁上的位置和布局方式。這個屬性有幾個不同的值，每個值都控制元素的定位方式。以下是position的主要值：

## static

這是position屬性的默認值。
元素按照它們在文檔中的正常順序佈局，不會受到其他定位屬性的影響。
`top`、`right`、`bottom`和`left`屬性對`static`定位的元素無效。

## relative 相對定位

使用`relative`屬性，您可以相對於元素在正常文檔流中的位置移動元素。
使用`top`、`right`、`bottom`和`left`屬性，您可以指定相對位移的距離。
元素仍然占據原始文檔流中的空間，但在視覺上移動。
```css
.box {
  position: relative;
  top: 20px;
  left: 30px;
}
```
這個範例將具有box類的元素相對於其正常位置向下移動20像素，向左移動30像素。

## absolute 絕對定位

absolute屬性使元素脫離正常文檔流，相對於最近的具有相對或絕對定位的祖先元素定位。
`使用top`、`right`、`bottom`和`left`屬性，您可以指定元素相對於其祖先元素的位置。
當元素使用absolute時，它不再影響其他元素的佈局，因此其他元素可能會佔據它原來的空間。

```css
.container {
  position: relative;
}
.box {
  position: absolute;
  top: 50px;
  left: 100px;
}
```
在這個範例中，`.box`元素相對於具有`container`類的父元素定位，位於其父元素的上方50像素，左側100像素的位置。

## fixed 固定定位

使用fixed屬性，元素相對於視窗定位，而不是相對於文檔。
這意味著元素會固定在瀏覽器視口中的位置，當用戶滾動頁面時也不會移動。
常用於創建固定的導航欄或工具欄。
```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  color: #fff;
}
```
這個範例創建了一個固定在頁面頂部的導航欄。

## sticky 粘性定位

sticky屬性是一種混合定位，當元素在可見區域內時，它的行為就像`relative`，但當元素滾出視口時，它的行為就像`fixed`，固定在指定位置。
常用於創建在網頁滾動時跟隨的元素，例如頁面上方的導航欄。

## 牛刀小試

試著使用position把下圖做出來吧!

![](https://hackmd.io/_uploads/HJ_P2I4A3.png)

