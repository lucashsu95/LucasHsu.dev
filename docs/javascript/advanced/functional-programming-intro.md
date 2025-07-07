---
outline: "deep"
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: 函數式程式設計,functional programming,純函數,不可變性,高階函數,map,filter,reduce,javascript,js,fp
  - - meta
    - name: og:title
      content: 函數式程式設計入門指南 | Pure Functions、Immutability、Higher-Order Functions
  - - meta
    - name: og:description
      content: 完整的函數式程式設計入門教學，包含純函數、不可變性、高階函數等核心概念，以及JavaScript中map、filter、reduce的實戰應用。
  - - meta
    - name: og:type
      content: article
  - - meta
    - name: og:image
      content: https://lucashsu.dev/javascript/advanced/functional-programming-intro
  - - meta
    - name: description
      content: 學習函數式程式設計的核心概念：純函數、不可變性、高階函數。掌握JavaScript中map、filter、reduce方法的實際應用，適合初學者入門。
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - property: og:url
      content: https://lucashsu.dev/javascript/advanced/functional-programming-intro
  - - meta
    - property: og:site_name
      content: Lucas Hsu Blog
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: 函數式程式設計入門指南 | Pure Functions、Immutability、Higher-Order Functions
  - - meta
    - name: twitter:description
      content: 完整的函數式程式設計入門教學，包含純函數、不可變性、高階函數等核心概念，以及JavaScript中map、filter、reduce的實戰應用。
---

# 函數式程式設計入門指南

## 什麼是函數式程式設計？

函數式程式設計（Functional Programming，簡稱 FP）是一種程式設計範式，它強調使用**函數**作為程式的基本構建單元。與命令式程式設計不同，函數式程式設計著重於「**做什麼**」而非「**怎麼做**」。

## 函數式程式設計的三大特性

### 1. 純函數（Pure Functions）

純函數是函數式程式設計的核心概念，具有兩個重要特性：

- **相同的輸入，永遠產生相同的輸出**
- **沒有副作用（side effects）**

```javascript
// ✅ 純函數範例
function add(a, b) {
  return a + b;
}

console.log(add(2, 3)); // 總是返回 5

// ❌ 非純函數範例（有副作用）
let total = 0;
function addToTotal(num) {
  total += num; // 修改了外部變數
  return total;
}

// ❌ 非純函數範例（依賴外部狀態）
function getCurrentTime() {
  return new Date(); // 每次呼叫結果都不同
}
```

### 2. 不可變性（Immutability）

在函數式程式設計中，數據一旦創建就不應該被修改。如果需要改變，應該創建新的數據結構。

```javascript
// ❌ 可變的做法
const numbers = [1, 2, 3];
numbers.push(4); // 直接修改原陣列
console.log(numbers); // [1, 2, 3, 4]

// ✅ 不可變的做法
const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4]; // 創建新陣列
console.log(numbers);    // [1, 2, 3] (原陣列未變)
console.log(newNumbers); // [1, 2, 3, 4]

// 物件的不可變操作
const user = { name: '小明', age: 25 };
const updatedUser = { ...user, age: 26 }; // 創建新物件
```

### 3. 高階函數（Higher-Order Functions）

高階函數是指能夠**接受其他函數作為參數**或**返回函數**的函數。這讓我們能夠編寫更加模組化和可重用的程式碼。

```javascript
// 接受函數作為參數的高階函數
function greet(name, formatter) {
  return formatter(name);
}

function formal(name) {
  return `您好，${name}先生/小姐`;
}

function casual(name) {
  return `嗨，${name}！`;
}

console.log(greet('小明', formal)); // "您好，小明先生/小姐"
console.log(greet('小明', casual)); // "嗨，小明！"

// 返回函數的高階函數
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

## JavaScript 中的函數式程式設計：map、filter、reduce

JavaScript 陣列提供了幾個非常重要的函數式方法，讓我們能夠以聲明式的方式處理數據。

### map() - 轉換每個元素

`map()` 方法用於對陣列中的每個元素應用一個函數，返回一個新的陣列。

```javascript
const numbers = [1, 2, 3, 4, 5];

// 將每個數字乘以 2
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// 轉換物件陣列
const users = [
  { name: '小明', age: 25 },
  { name: '小花', age: 30 },
  { name: '小華', age: 35 }
];

const names = users.map(user => user.name);
console.log(names); // ['小明', '小花', '小華']

// 更複雜的轉換
const userProfiles = users.map(user => ({
  displayName: `${user.name} (${user.age}歲)`,
  isAdult: user.age >= 18
}));
```

### filter() - 篩選元素

`filter()` 方法用於篩選出符合條件的元素，返回一個新的陣列。

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 篩選出偶數
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4, 6, 8, 10]

// 篩選出大於 5 的數字
const bigNumbers = numbers.filter(num => num > 5);
console.log(bigNumbers); // [6, 7, 8, 9, 10]

// 篩選物件陣列
const products = [
  { name: '筆記本', price: 1200, inStock: true },
  { name: '滑鼠', price: 800, inStock: false },
  { name: '鍵盤', price: 1500, inStock: true },
  { name: '螢幕', price: 8000, inStock: true }
];

// 篩選有庫存且價格低於 2000 的商品
const affordableInStock = products.filter(product => 
  product.inStock && product.price < 2000
);
console.log(affordableInStock);
```

### reduce() - 累積計算

`reduce()` 方法用於將陣列中的所有元素減少為一個值。它是最強大也最靈活的陣列方法。

```javascript
const numbers = [1, 2, 3, 4, 5];

// 計算總和
const sum = numbers.reduce((accumulator, current) => {
  return accumulator + current;
}, 0);
console.log(sum); // 15

// 計算最大值
const max = numbers.reduce((acc, current) => {
  return current > acc ? current : acc;
});
console.log(max); // 5

// 計算物件陣列中的總價
const cart = [
  { name: '蘋果', price: 30, quantity: 2 },
  { name: '香蕉', price: 20, quantity: 3 },
  { name: '橘子', price: 25, quantity: 4 }
];

const total = cart.reduce((acc, item) => {
  return acc + (item.price * item.quantity);
}, 0);
console.log(total); // 190

// 統計每個字母出現的次數
const text = 'hello world';
const letterCount = text.split('').reduce((acc, letter) => {
  acc[letter] = (acc[letter] || 0) + 1;
  return acc;
}, {});
console.log(letterCount); // {h: 1, e: 1, l: 3, o: 2, ' ': 1, w: 1, r: 1, d: 1}
```

## 組合使用 map、filter、reduce

這三個方法的真正威力在於它們可以組合使用，創造出強大而簡潔的數據處理管道：

```javascript
const orders = [
  { id: 1, amount: 100, status: 'completed' },
  { id: 2, amount: 200, status: 'pending' },
  { id: 3, amount: 150, status: 'completed' },
  { id: 4, amount: 300, status: 'cancelled' },
  { id: 5, amount: 250, status: 'completed' }
];

// 計算所有已完成訂單的總金額
const completedOrdersTotal = orders
  .filter(order => order.status === 'completed')  // 篩選已完成的訂單
  .map(order => order.amount)                     // 取出金額
  .reduce((total, amount) => total + amount, 0);  // 計算總和

console.log(completedOrdersTotal); // 500

// 一行程式碼完成複雜的數據處理
const result = orders
  .filter(order => order.status === 'completed')
  .map(order => ({ ...order, tax: order.amount * 0.1 }))
  .reduce((summary, order) => ({
    totalAmount: summary.totalAmount + order.amount,
    totalTax: summary.totalTax + order.tax,
    count: summary.count + 1
  }), { totalAmount: 0, totalTax: 0, count: 0 });

console.log(result);
// { totalAmount: 500, totalTax: 50, count: 3 }
```

## 為什麼要使用函數式程式設計？

1. **更好的可測試性**：純函數更容易測試，因為它們不依賴外部狀態
2. **更高的可讀性**：聲明式的程式碼更容易理解
3. **更少的錯誤**：不可變性減少了意外修改數據的風險
4. **更好的並發性**：純函數天然支援並行處理
5. **更強的組合性**：小的純函數可以組合成複雜的功能

## 總結

函數式程式設計是一種強大的程式設計範式，通過純函數、不可變性和高階函數的概念，我們可以編寫出更加簡潔、可維護和可靠的程式碼。JavaScript 的 `map()`、`filter()` 和 `reduce()` 方法是實踐函數式程式設計的絕佳起點。

記住：函數式程式設計不是要完全替代其他範式，而是提供另一種思考和解決問題的方式。在適當的場景下使用函數式的方法，能讓您的程式碼更加優雅和高效。