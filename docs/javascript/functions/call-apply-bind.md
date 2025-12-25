---
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: JavaScript,call,apply,bind,this,函式方法,柯里化
  - - meta
    - property: og:title
      content: JavaScript call、apply、bind 完全指南：掌握 this 綁定
  - - meta
    - property: og:description
      content: 深入理解 JavaScript 的 call、apply、bind 方法，學習 this 綁定、函式借用、柯里化應用
  - - meta
    - property: og:type
      content: article
---

# JavaScript call、apply、bind 完全指南

> 📝 TL;DR：`call`、`apply`、`bind` 都用於控制函式的 `this` 指向。差異：`call(thisArg, arg1, arg2, ...)` 立即執行並逐個傳參；`apply(thisArg, [args])` 立即執行並陣列傳參；`bind(thisArg, arg1, ...)` 回傳新函式，不立即執行。常用於：函式借用、事件處理、柯里化。

## 前置知識
- 了解 JavaScript 函式與物件
- 知道 `this` 的基本概念
- 熟悉箭頭函式與一般函式的差異

## this 的困境

在 JavaScript 中，`this` 的值取決於**函式如何被呼叫**，而非如何定義。

```javascript
const person = {
  name: 'Lucas',
  greet: function() {
    console.log(`Hi, I'm ${this.name}`);
  }
};

person.greet(); // "Hi, I'm Lucas" ✅

const greetFunc = person.greet;
greetFunc(); // "Hi, I'm undefined" ❌（this 指向全域）
```

**問題：**將方法賦值給變數後，`this` 遺失！

## call、apply、bind 比較

```mermaid
graph TB
    A[控制 this 的方法] --> B[call]
    A --> C[apply]
    A --> D[bind]
    
    B --> B1[立即執行 ✅]
    B --> B2[逐個傳參]
    B --> B3[語法: fn.call this, arg1, arg2]
    
    C --> C1[立即執行 ✅]
    C --> C2[陣列傳參]
    C --> C3[語法: fn.apply this, [args]]
    
    D --> D1[不立即執行 ❌]
    D --> D2[回傳新函式]
    D --> D3[語法: fn.bind this, arg1]
```

### 快速比較表

| 方法      | 執行時機 | 參數形式 | 回傳值       | 適用情境            |
| --------- | -------- | -------- | ------------ | ------------------- |
| **call**  | 立即執行 | 逐個傳遞 | 函式執行結果 | 函式借用、this 綁定 |
| **apply** | 立即執行 | 陣列傳遞 | 函式執行結果 | 參數為陣列的情況    |
| **bind**  | 不執行   | 逐個傳遞 | 新函式       | 事件處理、柯里化    |

##  call() - 立即執行 + 逐個傳參

### 基本用法

```javascript
function introduce(greeting, punctuation) {
  console.log(`${greeting}, I'm ${this.name}${punctuation}`);
}

const person = { name: 'Lucas' };

introduce.call(person, 'Hello', '!'); 
// "Hello, I'm Lucas!"
```

**語法：**
```javascript
fn.call(thisArg, arg1, arg2, ...);
```

### 實戰：函式借用

```javascript
const user1 = {
  firstName: 'Lucas',
  lastName: 'Hsu',
  getFullName: function() {
    return `${this.firstName} ${this.lastName}`;
  }
};

const user2 = {
  firstName: 'Mary',
  lastName: 'Chen'
};

// user2 借用 user1 的方法
console.log(user1.getFullName.call(user2)); 
// "Mary Chen"
```

---

##  apply() - 立即執行 + 陣列傳參

### 基本用法

```javascript
function introduce(greeting, punctuation) {
  console.log(`${greeting}, I'm ${this.name}${punctuation}`);
}

const person = { name: 'Lucas' };

introduce.apply(person, ['Hi', '?']); 
// "Hi, I'm Lucas?"
```

**語法：**
```javascript
fn.apply(thisArg, [arg1, arg2, ...]);
```

### 實戰：Math.max/min 搭配陣列

```javascript
const numbers = [5, 12, 3, 18, 7];

// 不用 apply 的寫法（麻煩）
console.log(Math.max(5, 12, 3, 18, 7)); // 18

// 用 apply 傳入陣列
console.log(Math.max.apply(null, numbers)); // 18
console.log(Math.min.apply(null, numbers)); // 3

// 現代替代方案：展開運算子
console.log(Math.max(...numbers)); // 18
```

**為何傳 `null`？**  
`Math.max` 不使用 `this`，所以第一個參數可以是 `null`。

##  bind() - 回傳新函式 + 固定 this

### 基本用法

```javascript
function introduce(greeting) {
  console.log(`${greeting}, I'm ${this.name}`);
}

const person = { name: 'Lucas' };

const boundIntroduce = introduce.bind(person);
boundIntroduce('Hey'); // "Hey, I'm Lucas"
```

**語法：**
```javascript
const newFn = fn.bind(thisArg, arg1, arg2, ...);
```

### 實戰 1：修復事件處理中的 this

```javascript
class Counter {
  constructor() {
    this.count = 0;
    this.button = document.getElementById('btn');
    
    //  錯誤：this 會指向 button 元素
    // this.button.addEventListener('click', this.increment);
    
    //  正確：用 bind 綁定 this
    this.button.addEventListener('click', this.increment.bind(this));
  }
  
  increment() {
    this.count++;
    console.log(this.count);
  }
}

new Counter();
```

**替代方案：箭頭函式**
```javascript
class Counter {
  constructor() {
    this.count = 0;
    this.button = document.getElementById('btn');
    
    // 箭頭函式會自動綁定外層的 this
    this.button.addEventListener('click', () => {
      this.increment();
    });
  }
  
  increment() {
    this.count++;
    console.log(this.count);
  }
}
```

---

### 實戰 2：部分應用（Partial Application）

```javascript
function multiply(a, b) {
  return a * b;
}

// 固定第一個參數為 2
const double = multiply.bind(null, 2);

console.log(double(5));  // 10
console.log(double(10)); // 20
```

這種技巧稱為**柯里化（Currying）**。

---

### 實戰 3：setTimeout 中的 this

```javascript
const person = {
  name: 'Lucas',
  greet: function() {
    console.log(`Hi, I'm ${this.name}`);
  }
};

//  錯誤：this 會指向全域
setTimeout(person.greet, 1000); // "Hi, I'm undefined"

//  正確：用 bind 綁定 this
setTimeout(person.greet.bind(person), 1000); // "Hi, I'm Lucas"

// 或用箭頭函式
setTimeout(() => person.greet(), 1000); // "Hi, I'm Lucas"
```

##  三者對比範例

```javascript
function introduce(greeting, punctuation) {
  return `${greeting}, I'm ${this.name}${punctuation}`;
}

const person = { name: 'Lucas' };

// 1 call：立即執行，逐個傳參
console.log(introduce.call(person, 'Hello', '!')); 
// "Hello, I'm Lucas!"

// 2 apply：立即執行，陣列傳參
console.log(introduce.apply(person, ['Hi', '?'])); 
// "Hi, I'm Lucas?"

// 3 bind：回傳新函式，稍後執行
const boundIntroduce = introduce.bind(person, 'Hey');
console.log(boundIntroduce('.')); 
// "Hey, I'm Lucas."
```

##  實戰練習

### 練習 1（簡單）
修正以下程式碼，讓按鈕點擊時正確顯示計數：

```javascript
const counter = {
  count: 0,
  increment: function() {
    this.count++;
    console.log(this.count);
  }
};

const btn = document.getElementById('btn');
btn.addEventListener('click', counter.increment); //  修正此行
```

:::details 參考答案
```javascript
// 方法一：用 bind
btn.addEventListener('click', counter.increment.bind(counter));

// 方法二：用箭頭函式
btn.addEventListener('click', () => counter.increment());

// 方法三：直接呼叫（較少用）
btn.addEventListener('click', function() {
  counter.increment();
});
```
:::

### 練習 2（簡單）
用 `apply` 實作一個函式，找出陣列中的最小值（不用 `Math.min`）。

:::details 參考答案
```javascript
function findMin(arr) {
  return Math.min.apply(null, arr);
}

console.log(findMin([5, 12, 3, 18, 7])); // 3

// 現代寫法（展開運算子）
function findMin(arr) {
  return Math.min(...arr);
}
```
:::

### 練習 3（中等）
實作一個 `curry` 函式，將多參數函式轉換成柯里化版本。

```javascript
// 目標：
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6
```

:::details 參考答案與思路
```javascript
function curry(fn) {
  return function curried(...args) {
    // 如果參數數量足夠，直接執行
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    
    // 否則回傳新函式，累積參數
    return function(...nextArgs) {
      return curried.apply(this, args.concat(nextArgs));
    };
  };
}

// 測試
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3));    // 6
console.log(curriedAdd(1, 2)(3));    // 6
console.log(curriedAdd(1)(2, 3));    // 6
console.log(curriedAdd(1, 2, 3));    // 6
```

**思路：**
1. 檢查目前累積的參數數量（`args.length`）
2. 如果 >= 原函式的參數數量（`fn.length`），用 `apply` 執行
3. 否則回傳新函式，繼續累積參數（`args.concat(nextArgs)`）
4. 遞迴呼叫 `curried` 直到參數足夠

**進階：支援 this 綁定**
```javascript
function curry(fn, thisArg) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(thisArg, args);
    }
    return function(...nextArgs) {
      return curried.apply(thisArg, args.concat(nextArgs));
    };
  };
}

const obj = {
  name: 'Calculator',
  multiply: function(a, b, c) {
    console.log(`${this.name}: ${a * b * c}`);
    return a * b * c;
  }
};

const curriedMultiply = curry(obj.multiply, obj);
curriedMultiply(2)(3)(4); // "Calculator: 24"
```
:::

---

##  FAQ

### Q: 箭頭函式可以用 call/apply/bind 嗎？
**不行**。箭頭函式的 `this` 在定義時就決定，無法被改變。

```javascript
const fn = () => console.log(this);
const obj = { name: 'Test' };

fn.call(obj); // this 仍然是外層的 this，不會變成 obj
```

### Q: bind 可以多次綁定嗎？
**不行**。`bind` 只有第一次有效。

```javascript
function showName() {
  console.log(this.name);
}

const obj1 = { name: 'Lucas' };
const obj2 = { name: 'Mary' };

const bound = showName.bind(obj1).bind(obj2);
bound(); // "Lucas"（只綁定到 obj1）
```

### Q: 什麼時候用 call，什麼時候用 apply？
- 參數已經是陣列  用 `apply`
- 參數逐個傳遞  用 `call`
- 現代開發：優先用**展開運算子**（`...`）

##  延伸閱讀
- [MDN: Function.prototype.call()](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
- [MDN: Function.prototype.apply()](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
- [MDN: Function.prototype.bind()](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
- [JavaScript.info: 函式綁定](https://javascript.info/bind)

##  總結
1. `call` 和 `apply` 立即執行函式，差異在參數傳遞方式。
2. `bind` 回傳新函式，常用於事件處理和柯里化。
3. 箭頭函式的 `this` 無法被 call/apply/bind 改變。
4. 現代 JS 優先使用展開運算子（`...`）和箭頭函式。
5. 理解 `this` 綁定是掌握 JavaScript 進階技巧的關鍵。
