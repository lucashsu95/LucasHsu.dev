---
outline: "deep"

head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: javascript,陣列,Array,map,filter,reduce,push,pop
  - - meta
    - property: og:title
      content: JavaScript 新手上路 Day5 - 陣列 Array
  - - meta
    - property: og:description
      content: 了解如何在 JavaScript 中 使用陣列 Array，包含建立、基本方法、遍歷、map/filter/reduce
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/javascript-cover.webp
---

<img src="../assets/Days/javascript-title-img.webp" alt="javascript-title-img" class="title-img" />

# Javascript Day5 陣列 Array

## 什麼是陣列？

陣列（Array）是用來存放**一組資料**的容器。想像你有一排櫃子，每個櫃子都有一個編號（index），裡面可以放東西。

```javascript
// 建立一個陣列
let fruits = ['蘋果', '香蕉', '橘子']
```

## 建立陣列

```javascript
// 字面量建立（最常用）
let arr1 = [1, 2, 3]

// 建構函式建立
let arr2 = new Array(1, 2, 3)

// 空陣列
let arr3 = []
```

:::warning ⚠️ 注意
陣列的 index 從 **0** 開始！第一個元素是 `arr[0]`，不是 `arr[1]`。
:::

## 存取元素

```javascript
let colors = ['紅', '黃', '藍']

console.log(colors[0])  // '紅'
console.log(colors[1])  // '黃'
console.log(colors[2])  // '藍'
console.log(colors[3])  // undefined（超出範圍）
```

## 常用屬性

| 屬性 | 說明 | 範例 |
| --- | --- | --- |
| `length` | 陣列長度 | `colors.length` → `3` |

## 新增與刪除元素

### push / pop（尾端操作）

```javascript
let stack = [1, 2, 3]

stack.push(4)        // 尾端加入 4 → [1, 2, 3, 4]
console.log(stack)

stack.pop()          // 尾端移除 → [1, 2, 3]
console.log(stack)
```

### unshift / shift（前端操作）

```javascript
let queue = [1, 2, 3]

queue.unshift(0)     // 前端加入 0 → [0, 1, 2, 3]
console.log(queue)

queue.shift()        // 前端移除 → [1, 2, 3]
console.log(queue)
```

:::tip 記憶口訣
- **Push / Pop** = 後進後出（像疊盤子）
- **Unshift / Shift** = 前進前出（像排隊）
:::

## 遍歷陣列

### for 迴圈

```javascript
let nums = [10, 20, 30]

for (let i = 0; i < nums.length; i++) {
    console.log(`索引 ${i}: ${nums[i]}`)
}
// 索引 0: 10
// 索引 1: 20
// 索引 2: 30
```

### for...of（推薦）

```javascript
let nums = [10, 20, 30]

for (let num of nums) {
    console.log(num)
}
// 10
// 20
// 30
```

### forEach

```javascript
let nums = [10, 20, 30]

nums.forEach((num, index) => {
    console.log(`索引 ${index}: ${num}`)
})
```

## 重要方法

### map — 轉換每個元素

回傳一個**新陣列**，每個元素都經過處理。

```javascript
let numbers = [1, 2, 3, 4, 5]

let doubled = numbers.map(n => n * 2)
console.log(doubled)  // [2, 4, 6, 8, 10]
```

### filter — 篩選元素

回傳一個**新陣列**，只包含符合條件的元素。

```javascript
let numbers = [1, 2, 3, 4, 5, 6]

let evens = numbers.filter(n => n % 2 === 0)
console.log(evens)  // [2, 4, 6]
```

### reduce — 累加計算

將陣列**縮減**成一個值。

```javascript
let numbers = [1, 2, 3, 4, 5]

let sum = numbers.reduce((accumulator, current) => {
    return accumulator + current
}, 0)

console.log(sum)  // 15
```

### find — 找到第一個符合的元素

```javascript
let users = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 17 },
    { name: 'Charlie', age: 30 }
]

let minor = users.find(user => user.age < 18)
console.log(minor)  // { name: 'Bob', age: 17 }
```

### includes — 是否包含某值

```javascript
let fruits = ['蘋果', '香蕉', '橘子']

console.log(fruits.includes('香蕉'))  // true
console.log(fruits.includes('西瓜'))  // false
```

### indexOf — 找到元素的索引

```javascript
let fruits = ['蘋果', '香蕉', '橘子']

console.log(fruits.indexOf('香蕉'))  // 1
console.log(fruits.indexOf('西瓜'))  // -1（找不到）
```

## 方法比較

| 方法 | 回傳值 | 是否改變原陣列 |
| --- | --- | --- |
| `push()` | 新的 length | ✅ 會 |
| `pop()` | 被移除的元素 | ✅ 會 |
| `map()` | 新陣列 | ❌ 不會 |
| `filter()` | 新陣列 | ❌ 不會 |
| `reduce()` | 單一值 | ❌ 不會 |
| `find()` | 元素或 undefined | ❌ 不會 |
| `includes()` | true / false | ❌ 不會 |

## 牛刀小試

1. 建立一個數字陣列 `[1, 2, 3, 4, 5]`，用 `map` 將每個數字平方，得到 `[1, 4, 9, 16, 25]`

2. 建立一個數字陣列 `[10, 15, 20, 25, 30]`，用 `filter` 篩選出大於 20 的數字

3. 建立一個數字陣列 `[1, 2, 3, 4, 5]`，用 `reduce` 計算所有數字的乘積

4. 建立一個字串陣列 `['hello', 'world', 'javascript']`，用 `map` 將每個字串轉成大寫

:::details 看答案

**Q1**
```javascript
let nums = [1, 2, 3, 4, 5]
let squared = nums.map(n => n * n)
console.log(squared)  // [1, 4, 9, 16, 25]
```

**Q2**
```javascript
let nums = [10, 15, 20, 25, 30]
let big = nums.filter(n => n > 20)
console.log(big)  // [25, 30]
```

**Q3**
```javascript
let nums = [1, 2, 3, 4, 5]
let product = nums.reduce((acc, cur) => acc * cur, 1)
console.log(product)  // 120
```

**Q4**
```javascript
let words = ['hello', 'world', 'javascript']
let upper = words.map(w => w.toUpperCase())
console.log(upper)  // ['HELLO', 'WORLD', 'JAVASCRIPT']
```
:::
