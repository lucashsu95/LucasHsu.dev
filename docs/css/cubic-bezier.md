# CSS 中的 cubic-bezier

> 📝 TL;DR：`cubic-bezier(x1, y1, x2, y2)` 讓你自訂動畫速度曲線；`x1`、`x2` 必須介於 0~1，`y` 可超出 0~1 以產生彈跳/超衝效果。善用工具（cubic-bezier.com）先視覺化，再複製參數。

## 前置知識
- 已會 `transition`、`animation` 的基本用法
- 知道常見曲線：`ease`、`ease-in`、`ease-out`、`ease-in-out`

## 為什麼用 cubic-bezier？
- 客製化速度感：比內建 `ease` 更細緻，讓動畫更貼近產品個性。
- 彈跳/超衝效果：`y` 超出 0~1 可做 overshoot/bounce。
- 一致性：同一套曲線可在不同元件重用，維持品牌感。

:::tip 工具建議
先用 https://cubic-bezier.com 視覺化拖點，再複製數值到程式碼。
:::


## 語法與參數
```css
cubic-bezier(x1, y1, x2, y2)
```
- `x1`, `x2`：0~1（時間軸），超出會使曲線無效。
- `y1`, `y2`：可超出 0~1，決定速度快慢與超衝程度。

常見預設值對照：
- ease: cubic-bezier(0.25, 0.1, 0.25, 1)
- ease-in: cubic-bezier(0.42, 0, 1, 1)
- ease-out: cubic-bezier(0, 0, 0.58, 1)
- ease-in-out: cubic-bezier(0.42, 0, 0.58, 1)

## 使用情境
1) 自訂品牌感：按鈕 hover、卡片浮起。
2) 彈跳/超衝：`y` > 1 或 < 0。
3) 漸進顯示：列表逐項淡入、位移。
4) 對齊實體動作：模擬重力、慣性。

## 範例

### 範例 1：基本過渡（溫和加速再減速）
```css
.card {
  width: 120px;
  height: 120px;
  background: #ff6b6b;
  transition: transform 400ms cubic-bezier(0.33, 0.02, 0.11, 0.99);
}

.card:hover {
  transform: translateY(-12px) scale(1.03);
}
```
說明：前段加速，尾端收斂，適合微互動。

### 範例 2：彈跳效果（y 超出 1）
```css
.chip {
  display: inline-block;
  padding: 10px 14px;
  background: #1c7ed6;
  color: #fff;
  border-radius: 999px;
  transition: transform 320ms cubic-bezier(0.26, 1.42, 0.42, 1.01);
}

.chip:hover {
  transform: translateY(-8px);
}
```
說明：`y1` 大於 1 產生超衝，再回落，帶彈性。

### 範例 3：搭配 keyframes（平滑滑動，帶超衝）
```css
@keyframes slide {
  from { transform: translateX(0); }
  to { transform: translateX(140px); }
}

.box {
  width: 80px;
  height: 80px;
  background: #12b886;
  animation: slide 1.4s cubic-bezier(0.89, -0.93, 0.2, 1.58) infinite alternate;
}
```
說明：`y2` < 0 先向反方向拉，再往正向超衝。

##  注意事項
1) `x1`、`x2` 必須在 0~1，否則曲線無效。
2) `y` 可超出 0~1，但請測試避免過度閃爍或視覺突兀。
3) 移動距離大時，應拉長動畫時間避免突兀。
4) 多段互動請共用同一套曲線，保持一致感。

##  實戰練習

### 練習 1（簡單）
將一個按鈕 hover 時微浮起並放大，使用自訂 cubic-bezier 取代 `ease`，並描述體感差異。

:::details 參考答案
```css
.btn {
  transition: transform 260ms cubic-bezier(0.25, 0.9, 0.35, 1);
}

.btn:hover {
  transform: translateY(-6px) scale(1.02);
}
```
差異：前段加速，尾段收斂，比內建 ease 更俐落且不突兀。
:::

### 練習 2（簡單）
設計一個「卡片翻轉」的入場效果，需使用 `cubic-bezier` 並確保收尾不抖動。

:::details 參考答案
```css
.card {
  transform: rotateY(-90deg);
  transform-origin: left;
  animation: flipIn 480ms cubic-bezier(0.18, 0.65, 0.24, 0.99) forwards;
}

@keyframes flipIn {
  to { transform: rotateY(0deg); }
}
```
收尾使用接近 1 的 y2，避免最後抖動。
:::

### 練習 3（中等）
為列表項目做「階梯式淡入+位移」動畫：
1. 單個項目使用自訂 cubic-bezier。
2. 使用 `animation-delay` 讓多個項目依序出現。
3. 確保延遲與曲線搭配不突兀。

:::details 參考答案與思路
```css
.item {
  opacity: 0;
  transform: translateY(16px);
  animation: fadeUp 360ms cubic-bezier(0.23, 0.92, 0.35, 1) forwards;
}

.item:nth-child(1) { animation-delay: 0ms; }
.item:nth-child(2) { animation-delay: 90ms; }
.item:nth-child(3) { animation-delay: 180ms; }

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```
思路：曲線尾端收斂，延遲間隔 < 總時長，讓階梯感連續。
:::

##  延伸閱讀
- MDN: https://developer.mozilla.org/docs/Web/CSS/easing-function
- 視覺化工具：https://cubic-bezier.com
- 動畫實戰參考：`animation-timeline`、`starting-style` 相關章節（本站）

##  總結
1. `cubic-bezier` 讓動畫速度可客製，`x` 在 0~1，`y` 可超出。
2. 先用工具視覺化，再落地到程式碼。
3. 彈跳/超衝效果靠 `y` 超出 0~1，但需測試避免突兀。
4. 多段互動共用曲線可提升一致性。
5. 每個動畫搭配適當時長與延遲，避免視覺疲勞。
