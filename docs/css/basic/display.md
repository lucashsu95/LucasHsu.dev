---
outline: deep
head:
  - - meta
    - name: keywords
      content: CSS, display, box tree, flow-root, display contents, flex, grid
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: description
      content: 理解 CSS display 的 outer/inner 顯示類型、box tree、隱藏方式與無障礙影響。
  - - meta
    - property: og:title
      content: CSS Display 顯示模式完整教學
  - - meta
    - property: og:type
      content: article
---

<script setup>
import CssDisplayLab from '../../.vitepress/theme/components/CssDisplayLab.vue'
</script>

# CSS Display 顯示模式

`display` 不只決定「是否換行」，還決定元素產生什麼 box、對外如何參與排版，以及子元素在內部使用哪種 layout mode。

> **快速判斷**
> - 對外排列：`block` 或 `inline`
> - 對內排列：`flow`、`flow-root`、`flex`、`grid`
> - 不產生 box：`none`；只移除主體 box：`contents`

## 簡報版本

<SlideButton
  slug="css-display"
  title="CSS Display 顯示模式"
  description="從 box tree 理解 block、inline、flex、grid 與隱藏策略"
/>

## 互動實驗室

切換值並觀察容器邊框、子項排列、佔位和鍵盤焦點。

<CssDisplayLab />

## DOM tree 與 box tree

瀏覽器先解析 DOM，再依 CSS 產生用於排版的 box tree。兩者並非一對一：

- `display: none`：元素及後代不產生 box。
- `display: contents`：元素本身不產生 principal box，但子元素仍產生 box，像被提升到上一層。
- `::before`、`::after` 等生成內容可產生 DOM 中不存在的 box。

因此 display 改的是排版表現，不會改變 HTML 語意或 DOM 親子關係。

## Outer 與 inner display type

現代語法可明確寫兩個關鍵字：

```css
.card  { display: block flow; }
.pill  { display: inline flow-root; }
.tools { display: inline flex; }
.tiles { display: block grid; }
```

第一個值是 **outer**：元素本身如何參與父層排版；第二個是 **inner**：子元素怎麼排。

常見單一關鍵字是相容簡寫：

- `block` 約等於 `block flow`
- `inline-block` 約等於 `inline flow-root`
- `flex` 約等於 `block flex`
- `inline-flex` 約等於 `inline flex`
- `grid` 約等於 `block grid`
- `inline-grid` 約等於 `inline grid`

多關鍵字語法已獲現代瀏覽器支援；較舊環境可先寫傳統值，再寫多關鍵字值作漸進增強。

## Normal flow

### `block`

在一般 flow 中建立 block box，通常從新行開始，`width: auto` 時填滿可用 inline size；「永遠佔滿整行」並非所有 formatting context 都成立。

### `inline`

參與文字行排版，不強制換行。非 replaced inline 元素的 `width`、`height` 不控制尺寸；水平 padding/margin 有效，垂直方向雖可繪製，通常不會像 block 一樣推開相鄰行。

### `inline-block`

外部像 inline 並排，內部是獨立 formatting context，可設定寬高。元素間空隙通常來自 HTML 文字空白；現代版面優先考慮 Flex/Grid 的 `gap`，不要用父層 `font-size: 0` 修補。

## `flow-root`：建立新的 BFC

`display: flow-root` 產生 block box 並建立新的 block formatting context（BFC），可包住內部 float、隔離外部 float，並避免部分 margin collapsing。

```css
.media { display: flow-root; }
.media img {
  float: inline-start;
  margin-inline-end: 1rem;
}
```

這比用 `overflow: hidden` 清 float 更能表達意圖，也不會意外裁切內容。

## Flex 與 Grid

- `flex` / `inline-flex`：以主軸為核心的一維排列；項目仍可換行。
- `grid` / `inline-grid`：同時控制列與欄的二維排列。

`inline-flex` 和 `inline-grid` 的「inline」描述容器對外行為，不代表裡面的項目變成 inline。

```css
.toolbar {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(14rem, 100%), 1fr));
  gap: 1rem;
}
```

## `display: contents`

正確名稱是 **contents**。它讓 wrapper 不參與 box tree，子項可直接加入外層 Grid/Flex，但要謹慎：

- wrapper 的 background、border、padding 不會畫出來。
- 定位與偽元素行為可能不符合直覺。
- 歷史上部分瀏覽器曾錯誤移除其 accessibility tree 語意；應測試目標瀏覽器與輔助科技。
- 不要為了排版犧牲 `<button>`、表格、表單等重要語意。

## 隱藏方式與互動

| 寫法 | 佔位 | 可見 | 可點擊 | 一般無障礙樹 |
| --- | --- | --- | --- | --- |
| `display: none` | 否 | 否 | 否 | 移除 |
| `visibility: hidden` | 是 | 否 | 否 | 通常移除 |
| `opacity: 0` | 是 | 否 | **仍可能** | **仍保留** |

::: danger 焦點陷阱
不要只用 `opacity: 0` 隱藏可互動內容：透明按鈕仍可能被點擊或用 Tab 聚焦。應同步管理 `visibility`、`inert` 或真正卸載內容。若焦點在即將 `display: none` 的區域內，先移到合理的觸發按鈕。
:::

`aria-hidden="true"` 只影響無障礙樹，不會隱藏畫面，也不應套在仍可聚焦的元素或其祖先。

## 選擇指南

- 文件段落：normal flow。
- 一列工具或導覽：Flex。
- 有列欄關係的卡片、版面：Grid。
- inline 排列但需完整盒模型：`inline-block` 或 `inline-flex`。
- 建立 BFC：`flow-root`。
- wrapper 只為框架限制而存在：評估 `contents`，並測試語意與 a11y。

## 練習

1. 將一組標籤改成 `inline-flex` 並用 `gap` 排列。
2. 用 `flow-root` 讓容器包住 float 圖片。
3. 比較三種隱藏方式，確認 Tab 鍵是否停在不可見控制項。

## 延伸閱讀

- [MDN：display](https://developer.mozilla.org/docs/Web/CSS/display)
- [MDN：Visual formatting model](https://developer.mozilla.org/docs/Web/CSS/CSS_display/Visual_formatting_model)
- [Grid 完整教學](./grid)
