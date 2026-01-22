---
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: js,javascript,四捨五入,round,toFixed
  - - meta
    - property: og:title
      content: 在javascript中使用四捨五入
  - - meta
    - property: og:description
      content: 使用 Math.round 和 toFixed 四捨五入
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/javascript-cover.jpg
---


# JavaScript - 四捨五入

> 📝 TL;DR
- `Math.round(x)`: 四捨五入到整數。
- `x.toFixed(n)`: 四捨五入到小數點後 n 位(回傳字串)。
- `Math.floor/ceil`: 無條件捨去/進位。

## 前置知識
- JavaScript 數字型別與精度問題
- 字串與數字轉換(Number、parseInt)
- 浮點數運算限制

## 方法對照表

| 方法            | 用途           | 回傳型別 | 範例                            |
| --------------- | -------------- | -------- | ------------------------------- |
| `Math.round(x)` | 四捨五入到整數 | Number   | `Math.round(3.6)` → 4           |
| `x.toFixed(n)`  | 保留 n 位小數  | String   | `(3.14159).toFixed(2)` → "3.14" |
| `Math.floor(x)` | 無條件捨去     | Number   | `Math.floor(3.9)` → 3           |
| `Math.ceil(x)`  | 無條件進位     | Number   | `Math.ceil(3.1)` → 4            |
| `Math.trunc(x)` | 去除小數部分   | Number   | `Math.trunc(3.9)` → 3           |

- `Math.round(x)`: 將數字 x 四捨五入到最接近的整數。
- `x.toFixed(n)`: 將數字 x 四捨五入到小數點後 n 位。
## 範例
```javascript
// 四捨五入到最接近的整數
let num1 = 3.14;
let roundedNum1 = Math.round(num1); // roundedNum1 會是 3

// 四捨五入到小數點後 2 位
let num2 = 123.45678;
let roundedNum2 = num2.toFixed(2); // roundedNum2 會是 "123.46" (注意：回傳的是字串)
```

## 選擇適合的函式：

- `Math.round`: 當你只需要將數字四捨五入到最接近的整數時使用。
- `toFixed`: 當你需要將數字四捨五入到特定的小數位數時使用。
注意事項：
- `toFixed` 回傳的是字串: 如果需要進行進一步的數學運算，請將結果轉換回數字型態，例如：Number(roundedNum2)。
- 浮點數精度: JavaScript 的浮點數運算可能會有精度問題，對於高精度的計算，建議使用專門的數學庫。
其他相關函式：
- `Math.floor(x)`: 無條件捨去，返回小於等於 x 的最大整數。
- `Math.ceil(x)`: 無條件進位，返回大於等於 x 的最小整數。
## 實戰練習

### 練習 1:價格四捨五入(簡單)⭐
> 將價格 `123.456` 四捨五入到小數點後 2 位並轉回數字。

:::details 💡 參考答案
```javascript
const price = 123.456
const rounded = Number(price.toFixed(2))
console.log(rounded) // 123.46
```
:::

### 練習 2:計算百分比(簡單)⭐
> 計算 `17 / 3` 並四捨五入到小數點後 1 位。

:::details 💡 參考答案
```javascript
const result = (17 / 3).toFixed(1)
console.log(result) // "5.7"
// 或使用 Math.round: Math.round((17 / 3) * 10) / 10
```
:::

### 練習 3:自訂四捨五入(中等)⭐⭐
> 實作 `roundTo(num, decimals)` 函數,支援任意小數位數。

:::details 💡 參考答案與提示
```javascript
const roundTo = (num, decimals) => {
  const factor = 10 ** decimals
  return Math.round(num * factor) / factor
}

console.log(roundTo(3.14159, 2))  // 3.14
console.log(roundTo(123.456, 1))  // 123.5
```
**提示**: 先乘以 10^n,四捨五入,再除回去。
:::

## 延伸閱讀
- [MDN: Math.round](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round)
- [MDN: toFixed](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed)
- [JavaScript 浮點數精度問題](https://javascript.info/number#imprecise-calculations)

## FAQ
- Q: toFixed 為何回傳字串?
  - A: 為了保證格式一致(如 `1.5.toFixed(2)` → "1.50");需用 `Number()` 或 `+` 轉回數字。
- Q: 如何處理銀行家捨入法?
  - A: JavaScript 預設四捨六入五取偶;若需嚴格銀行家捨入需自行實作或用 Decimal.js。
- Q: 負數四捨五入怎麼做?
  - A: `Math.round(-3.5)` → -3(往零方向);`Math.floor(-3.5)` → -4(往負無窮)。