---
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: CSS, css, clamp函數, 響應式設計, 流動排版
  - - meta
    - property: og:title
      content: CSS技巧 - 使用clamp()函數進行響應式設計
  - - meta
    - property: og:description
      content: 學習如何使用CSS的clamp()函數來實現響應式設計，並在不同視口寬度下自動調整元素大小
  - - meta
    - property: og:type
      content: article
---

# Clamp

## 介紹

CSS的`clamp()`函數是一個強大的工具，用於在指定的範圍內限制數值。這個函數接受三個參數：`最小值、首選值和最大值`，並根據這些值自動調整輸出。這使得`clamp()`非常適合用於字體大小、寬度等屬性，特別是在創建流動排版時，一行就可以做好RWD。

## TL;DR
- `clamp(min, preferred, max)` = 在安全範圍內自動流動的數值（最常用於字級、寬度）。
- 常見組合：最小值用 `px` 保證可讀，首選用 `vw` 讓它流動，最大值用 `px` 限制失控。
- 比媒體查詢更簡短：一行即可替代多段 `@media`。

## 前置知識
- 需理解長度單位：`px`、`rem`、`vw/vh`、百分比。
- `calc()` 可與 `clamp()` 混搭：`clamp(1rem, 0.5rem + 2vw, 2rem)`。
- 排版建議使用 `rem` 保持易讀性；寬度/間距可用 `vw` 增加流動感。

### `clamp()`函數的結構

`clamp()`的語法如下：

```css
clamp(min, preferred, max)
```

- **最小值**（min）：範圍的下限，首選值不能低於此值。
- **首選值**（preferred）：在最小值和最大值之間的理想值，通常使用相對單位（如`vw`）來實現流動效果。
- **最大值**（max）：範圍的上限，首選值不能高於此值。

例如，以下將元素的寬度設置為不小於`350px`，不大於`600px`，理想情況下為`50%`：

```css
width: clamp(350px, 50%, 600px);
```

### 視覺化理解

```mermaid
xychart-beta
    title "clamp(32px, 4vw, 48px) 隨視口寬度變化"
    xAxis title "viewport(px)" min 320 max 1440
    yAxis title "font-size(px)" min 24 max 56
    line
      320:32
      480:32
      768:32
      1024:41
      1280:48
      1440:48
```

* 320-768px: 卡在最小 32px
* 768-1280px: 跟著 4vw 流動
* 1280px 以上: 封頂 48px

## 使用案例

`clamp()`函數不僅限於字體大小，還可以應用於其他CSS屬性，例如：

```css
font-size: clamp(32px, 4vw, 48px);
```

在這個例子中，字體大小在`32px`到`48px`之間流動，根據視口寬度的`4vw`值進行調整。

## 流動排版

使用`clamp()`可以簡化流動排版的實現，避免使用繁瑣的媒體查詢。這對於創建響應式設計非常有用，特別是在字體大小和元素尺寸需要隨著屏幕大小變化時。例如：

| 視口寬度 (px) | 首選值 (px) | 實際值 (px) |
| ------------- | ----------- | ----------- |
| 500           | 20          | 32          |
| 900           | 36          | 36          |
| 1400          | 56          | 48          |

## 常見模式與範本
- 流動字級：`font-size: clamp(1rem, 0.5rem + 1vw, 1.5rem);`
- 卡片寬度：`max-width: clamp(320px, 60vw, 960px);`
- 間距流動：`gap: clamp(12px, 2vw, 32px);`
- 圖片寬度：`width: clamp(240px, 40vw, 480px);`

## 實戰練習

### 練習 1：流動標題（簡單）⭐
> 讓主標 `h1` 在手機 28px、桌機最多 48px，視口中間流動。

:::details 💡 參考答案
```css
h1 {
  font-size: clamp(28px, 4vw, 48px);
}
```
:::

### 練習 2：卡片寬度（簡單）⭐
> 讓卡片在小螢幕不小於 300px，大螢幕不超過 640px，中間以 60vw 流動。

:::details 💡 參考答案
```css
.card {
  width: clamp(300px, 60vw, 640px);
}
```
:::

### 練習 3：排版行距（中等）⭐⭐
> 文章段落行高在手機為 1.6，桌機 1.9，中間跟隨視口調整，請寫一個 `clamp()` 配方。

:::details 💡 參考答案與提示
**提示：** 行高接受無單位數值，設計成 1.6~1.9 間流動即可。
```css
p { line-height: clamp(1.6, 1.4 + 0.2vw, 1.9); }
```
:::

## 延伸閱讀
- MDN: [clamp()](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp) - 官方語法與範例
- Josh Comeau: [The Magic of clamp()](https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/) - 實用配方
- Utopia: [fluid type calculator](https://utopia.fyi/type/calculator/) - 幫你產生 clamp 值

## FAQ
- Q: clamp 和媒體查詢要怎麼搭配？
  - A: 常用 clamp 取代多數字級媒體查詢，若需要佈局斷點仍可保留 `@media`。
- Q: 為什麼我的 clamp 沒有變化？
  - A: 檢查首選值是否使用 `vw` 這類相對單位，或視口寬度是否已達上下限。
- Q: 可否在 calc 裡使用 clamp？
  - A: 可以，兩者可嵌套，例如 `width: calc(50% - clamp(12px, 2vw, 24px));`。

在這個表格中，可以看到如何根據不同的視口寬度，`clamp()`自動調整字體大小，保持在設定的範圍內。