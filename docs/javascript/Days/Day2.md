---
outline: "deep"
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: javascript,if,else
  - - meta
    - name: og:title
      content: JavaScript 新手上路 Day2 - if else
  - - meta
    - name: og:description
      content: 了解如何在 JavaScript 中 寫判斷式(if...else)
  - - meta
    - name: og:type
      content: article
  - - meta
    - name: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/javascript/assets/Days/javascript-title-img.png
---

<img src="../assets/Days/javascript-title-img.png" alt="javascript-title-img" class="title-img" />

# Javascript Day2 判斷式 IF...ELSE

## 分別印出了多少?

先了解基本概念

```javascript:line-numbers
let a = 1
let b = 2
let c = a + b
console.log(a,b,c)
a += 1 // a = a + 1
console.log(a,b,c)
b = c
console.log(a,b,c)
```

:::details 看答案
1 2 3
2 2 3
2 3 3
c這個變數沒有變過
- `a += 1`是`a + 1`但不代表`c`會連結著`a`
- `b`等於`c`是`b`的值被複寫不是`c`
:::

## 使用內建函式
### 轉字串
```javascript
let a = 123
a.toString()
```

### 轉數字
```javascript
parseInt('123') // 123
Number('123') // 123
```

## 判斷式

### 關於 if...else

```javascript
if(這裡放布林值){
    
    如果布林值是true就做這裡的事情，不然不會做
    
}else{
    
    如果布林值是false就做這裡的事情，不然不會做
    
}

```

### 關於 if...elseif...else

```javascript
if(這裡放布林值){
    
    如果上面的布林值是true就做這裡的事情，不然不會做
    
}else if(這裡放布林值){
    
    如果上面的else if裡面的布林值是false就做這裡的事情，不然不會做
    
}else{
    
    如果上方都不符合就做這裡的事情，不然不會做
    
}
```


### 看個簡單的實作

```javascript:line-numbers
let number = prompt('請輸入一個數字')

if (number > 10) {
    console.log("這數字大於10")
} else if (number === 10) {
    console.log("這數字等於10")
} else {
    console.log("這數字小於10")
}
```

## 牛刀小試

1. 寫一個程式，可以判斷輸入的數字是偶數還是奇數。
2. 寫一個程式，可以判斷輸入的數字
    - 是【3的倍數和5的倍數】還是
    - 【3的倍數】或是
    - 【5的倍數】或是
    - 【不是3的倍數和5的倍數】。
3. 輸出a和b兩個數字，輸出最大公因數。

:::details 看答案

**Q1**
```javascript:line-numbers
let num = prompt('請輸入數字：')
if (num % 2 === 0) {
    console.log(num + " 是偶數");
} else {
    console.log(num + " 是奇數");
}
```

**Q2**
```javascript:line-numbers
let num = prompt('請輸入數字：')
if (num % 3 === 0 && num % 5 === 0) {
    console.log(num + " 是3的倍數和5的倍數");
} else if (num % 3 === 0) {
    console.log(num + " 是3的倍數");
} else if (num % 5 === 0) {
    console.log(num + " 是5的倍數");
} else {
    console.log(num + " 不是3的倍數和5的倍數");
}
```

**Q3**
```javascript:line-numbers
let a = prompt('請輸入第一個數字：')
let b = prompt('請輸入第二個數字：')
while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
}
console.log("最大公因數是 " + a);
```
:::