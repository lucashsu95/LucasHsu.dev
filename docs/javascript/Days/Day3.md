---
outline: "deep"
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: javascript,for,loop,while
  - - meta
    - name: og:title
      content: JavaScript 新手上路 Day3 for while loop
  - - meta
    - name: og:description
      content: 了解如何在 JavaScript 中 使用for迴圈和while迴圈和雙層迴圈
  - - meta
    - name: og:type
      content: article
  - - meta
    - name: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/javascript/assets/Days/javascript-title-img.png
---

<img src="../assets/Days/javascript-title-img.png" alt="javascript-title-img" class="title-img" />

# Day3 迴圈 For & While

## For

![image](https://hackmd.io/_uploads/ByaJh8D71g.png)

### 簡單範例
```javascript:line-numbers
for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) {
        console.log(i + " 是偶數");
    } else {
        console.log(i + " 是奇數");
    }
}
```


## While

![image](https://hackmd.io/_uploads/ry6s68DQyx.png)

### 簡單範例
```javascript:line-numbers
let i = 0;
while (i < 10) {
    if (i % 2 === 0) {
        console.log(i + " 是偶數");
    } else {
        console.log(i + " 是奇數");
    }
    i++;
}
```

## 雙層迴圈

## 印出一個直角三角型
```javascript:line-numbers
for (let i = 1; i <= 5; i++) {
    let row = '';
    for (let j = 1; j <= i; j++) {
        row += '*';
    }
    console.log(row);
}
```

## 印出乘法表
```javascript:line-numbers
for (let i = 1; i <= 9; i++) {
    for (let j = 1; j <= 9; j++) {
        console.log(`${i} x ${j} = ${i * j}`);
    }
}
```

## 牛刀小式

1. 印出**正三角型**
2. 印出**倒三角形**
3. 印出**菱形**

:::details 看答案

**Q1**
```javascript:line-numbers
for (let i = 1; i <= 5; i++) {
    let row = '';
    for (let j = 1; j <= 5 - i; j++) {
        row += ' ';
    }
    for (let k = 1; k <= i; k++) {
        row += '*';
    }
    console.log(row);
}
```

**Q2**
```javascript:line-numbers
for (let i = 5; i >= 1; i--) {
    let row = '';
    for (let j = 1; j <= 5 - i; j++) {
        row += ' ';
    }
    for (let k = 1; k <= i; k++) {
        row += '*';
    }
    console.log(row);
}
```

**Q3**
```javascript:line-numbers
let n = 5; // 菱形的高度
for (let i = 1; i <= n; i++) {
    let row = '';
    for (let j = 1; j <= n - i; j++) {
        row += ' ';
    }
    for (let k = 1; k <= 2 * i - 1; k++) {
        row += '*';
    }
    console.log(row);
}
for (let i = n - 1; i >= 1; i--) {
    let row = '';
    for (let j = 1; j <= n - i; j++) {
        row += ' ';
    }
    for (let k = 1; k <= 2 * i - 1; k++) {
        row += '*';
    }
    console.log(row);
}
```
:::