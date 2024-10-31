---
head:
  - - meta
    - name: keywords
      content: css,media,rwd,響應式
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: og:title
      content: CSS 響應式網頁設計(RWD)
  - - meta
    - name: og:description
      content: 媒體查詢是一種CSS技術，允許開發者根據設備的特徵（如螢幕寬度、高度、解析度等）來應用不同的樣式。這使得網站能夠在各種設備上提供良好的使用者體驗，無論是桌面電腦、平板還是手機。
  - - meta
    - name: og:type
      content: article
  - - meta
    - name: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/css/basic/grid
---

# CSS 響應式網頁設計(RWD)

## 媒體查詢的基本概念

媒體查詢是一種CSS技術，允許開發者根據設備的特徵（如螢幕寬度、高度、解析度等）來應用不同的樣式。這使得網站能夠在各種設備上提供良好的使用者體驗，無論是桌面電腦、平板還是手機。

### 媒體類型 media-type

媒體查詢可以針對不同的媒體類型進行設置，常見的類型包括：
- **all**：適用於所有設備。
- **screen**：針對螢幕顯示設備。
- **print**：針對列印輸出。
- **speech**：針對語音合成設備。

## 使用方法

### 基本語法

媒體查詢的基本語法如下：

```css
@media media-type and (condition) {
    /* CSS rules */
}
```

#### 範例

1. **針對螢幕寬度小於600px的樣式：**

```css
@media screen and (max-width: 600px) {
    body {
        background-color: lightblue;
    }
}
```

2. **針對螢幕寬度在321px到768px之間的樣式：**

```css
@media only screen and (min-width: 321px) and (max-width: 768px) {
    .class {
        background: #666;
    }
}
```

### 寫在HTML中

媒體查詢也可以直接寫在HTML文件中：

```html
<link rel="stylesheet" media="screen and (min-width: 400px) and (max-width: 700px)" href="style.css" />
```