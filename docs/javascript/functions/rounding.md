---
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: js,javascript,四捨五入,round,toFixed
  - - meta
    - name: og:title
      content: 在javascript中使用四捨五入
  - - meta
    - name: og:description
      content: 使用 Math.round 和 toFixed 四捨五入
  - - meta
    - name: og:type
      content: article
---


# JavaScript - 四捨五入

- `Math.round(x)`: 將數字 x 四捨五入到最接近的整數。
- `x.toFixed(n)`: 將數字 x 四捨五入到小數點後 n 位。
- 
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