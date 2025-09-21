---
outline: "deep"

head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: javascript,宣告變數,輸入輸出,四則運算,型態,邏輯判斷式
  - - meta
    - property: og:title
      content: JavaScript 新手上路 Day1
  - - meta
    - property: og:description
      content: 了解如何在 JavaScript 中 宣告變數,輸入輸出,四則運算,型態,邏輯判斷式
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/javascript-cover.jpg
---

<img src="../assets/Days/javascript-title-img.png" alt="javascript-title-img" class="title-img" />

# Javascript Day1 先講好規則

## 宣告變數

| 方法  | 解釋         |
| ----- | ------------ |
| var   | 宣告全域變數 |
| let   | 宣告區域變數 |
| const | 宣告常數     |

反正就是`let`用到底就對了

## 輸入 & 輸出

<div class="two-column-layout">

```javascript
const msg = prompt() // 會跳出一個彈跳視窗可以 輸入 值
```
    
```javascript
console.log(msg) // 在F12裡 印出 msg 的值
```

```javascript
alert(msg) // 出現一個彈跳視窗(包含 msg 裡的值)
```
    
</div>

## 四則運算

| 符號 | 方法   | 範例     |
| ---- | ------ | -------- |
| +    | 加法   | `2 + 2`  |
| -    | 減法   | `3 - 2`  |
| *    | 乘法   | `3 * 2`  |
| **   | 次方   | `2 ** 2` |
| /    | 除法   | `4 / 2`  |
| %    | 取餘數 | `4 % 2`  |

## 型態

| 名稱         | 範例                          |
| ------------ | ----------------------------- |
| 字串 String  | `"Hi"`、`"1"`、`"0"`          |
| 數字 Int     | `0`、`1`、`2`、`3`            |
| 浮點數 float | `1.2`、`1.0`                  |
| 布林 Boolean | `true`、`false`、`0`、`1`     |
| 物件 Object  | `{key:value}`                 |
| 陣列 Array   | `['hi',123,['hi'],{'O':'X'}]` |

## 邏輯判斷式

| 各種判斷    | 結果  | 解釋                  |
| ----------- | ----- | --------------------- |
| `1 == 1`    | true  | 1 等於 1 所以 true    |
| `1 == 2`    | false | 1 不等於 2 所以 false |
| `1 != 2`    | true  | `!=` 是不等於的意思   |
| `1 == '1'`  | true  | `==` 是不嚴謹等於     |
| `1 === '1'` | false | `===`是嚴謹等於       |

## 如何開始撰寫

```html:line-numbers {1}
<html>
    <body>
        <h1>hi</h1>
        <p>hello, world!</p>
       
        <script>
            // 在這裡撰寫 javascript
            console.log('hi')
        </script>  
    </body>
</html>
```

## 牛刀小試

1. 輸入`john`，輸出`Hello, john`；
    輸入`lucas`，輸出`Hello, lucas`；
    
2. 輸入數字`2`，輸出除以`2`的**餘數**`0`；
    輸入數字`3`，輸出除以`2`的**餘數**`1`；
    
3. 輸入數字n，如果是`2`的**倍數**
    輸出true，不然false


:::details 看答案

**Q1**
```javascript
const a = prompt('請輸入文字：')
console.log('Hello,',a)
```

**Q2**
```javascript
const a = prompt('請輸入數字：')
console.log(a % 2);
```

**Q3**
```javascript
const a = prompt('請輸入數字：')
console.log(a % 2 === 0);
```
:::