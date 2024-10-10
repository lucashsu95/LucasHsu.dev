---
head:
  - - meta
    - name: keywords
      content: css,css diaply,css flex
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: og:title
      content: Css Display 顯示
  - - meta
    - name: og:description
      content: display屬性用於控制HTML元素在網頁上的顯示方式。這個屬性有多個不同的值，每個值都決定了元素的顯示方式。以下是display屬性的一些常見值
  - - meta
    - name: og:type
      content: article
---

# Css Display 顯示

display屬性用於控制HTML元素在網頁上的顯示方式。這個屬性有多個不同的值，每個值都決定了元素的顯示方式。以下是display屬性的一些常見值：

## block:

block是display屬性的默認值（對大多數HTML元素來說）。
元素將在新的行上開始，佔據父元素的整個寬度，並總是在上下文中顯示為獨立的塊。
常見的block元素包括`<div>`、`<p>`、`<h1>`等。

```css
a.button {
  display: block;
  width: 120px;
  height: 40px;
  background-color: #007bff;
  color: #fff;
  text-align: center;
  line-height: 40px;
  text-decoration: none;
}
```
這個範例將`<a>`元素轉換為塊級元素，以創建一個具有特定寬度和高度的按鈕。
    
## inline:

inline使元素以行內元素的方式顯示。
元素不會強制斷行，並只佔據其內容所需的寬度。
常見的inline元素包括`<span>`、`<a>`、`<strong>`等。

## inline-block:

inline-block使元素以行內塊的方式顯示。
元素不會強制斷行，但可以佔據其內容所需的寬度，同時可以應用塊級元素的樣式，如width和height。
這對於創建水平導航菜單等元素很有用。
## none:

使用none值，元素將完全不可見，且不佔據空間。
這可用於在不刪除元素的情況下將其隱藏，或根據需要動態顯示/隱藏元素。
## flex:

flex使元素成為一個靈活的容器，其子元素將按照一定的比例分佈在容器中。
這可用於創建自適應佈局，並使子元素根據可用空間動態調整位置和大小。

```css
.flex-container {
  display: flex;
  justify-content: space-between;
}
```
這個範例創建一個水平排列的彈性容器，其中子元素之間具有均勻的間距。
## grid 網格布局:

grid允許創建多行和多列的網格布局，以更精確地控制元素的位置。
這對於複雜的網頁佈局非常有用。
```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
```
這個範例創建一個網格容器，其中有3列且列之間有10像素的間距

## 小遊戲

1. ![](https://hackmd.io/_uploads/Sy-11PNRn.png)
    [flex小青蛙](https://flexboxfroggy.com/#zh-tw)
2. ![](https://hackmd.io/_uploads/SJB6CLNCn.png)
    [grid花園](https://cssgridgarden.com/#zh-tw)
