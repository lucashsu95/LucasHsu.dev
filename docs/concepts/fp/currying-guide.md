---
outline: "deep"
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: currying,柯里化,函數式程式設計,functional programming,部分應用,partial application,閉包,closure,javascript,js
  - - meta
    - property: og:title
      content: Currying 柯里化完整指南 | 函數式程式設計進階技巧
  - - meta
    - property: og:description
      content: 深入學習 Currying 柯里化技術，包含基本概念、實際應用、部分應用等進階函數式程式設計技巧，豐富的 JavaScript 範例教學。
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/javascript-cover.webp
  - - meta
    - name: description
      content: 完整的 Currying 柯里化教學指南，學習將多參數函數轉換為單參數函數鏈的技術，提升程式碼重用性和靈活性。
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - property: og:url
      content: https://lucashsu95.github.io/LucasHsu.dev/javascript/advanced/currying-guide
  - - meta
    - property: og:site_name
      content: Lucas Hsu Blog
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Currying 柯里化完整指南 | 函數式程式設計進階技巧
  - - meta
    - name: twitter:description
      content: 深入學習 Currying 柯里化技術，包含基本概念、實際應用、部分應用等進階函數式程式設計技巧，豐富的 JavaScript 範例教學。
---

# Currying：讓函數更加靈活的魔法

## 什麼是 Currying？

Currying（柯里化）是函數式程式設計中的一個重要概念，它是一種將**接受多個參數的函數**轉換成**一系列只接受單一參數的函數**的技術。這個名稱來自於數學家 Haskell Curry。

簡單來說，Currying 把這樣的函數調用：
```javascript
f(a, b, c)
```

轉換成這樣：
```javascript
f(a)(b)(c)
```

## 基本概念和原理

### 傳統函數 vs Curried 函數

```javascript
// 傳統的多參數函數
function add(a, b, c) {
  return a + b + c;
}
console.log(add(1, 2, 3)); // 6

// Curried 版本
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}
console.log(curriedAdd(1)(2)(3)); // 6

// 使用箭頭函數的簡潔寫法
const curriedAddArrow = a => b => c => a + b + c;
console.log(curriedAddArrow(1)(2)(3)); // 6
```

### Currying 的核心原理：閉包（Closure）

Currying 能夠工作的關鍵在於 JavaScript 的閉包特性。每個返回的函數都能「記住」之前傳入的參數：

```javascript
function multiply(a) {
  console.log(`第一個參數是: ${a}`);
  return function(b) {
    console.log(`第二個參數是: ${b}`);
    console.log(`計算 ${a} × ${b}`);
    return a * b;
  };
}

const multiplyBy5 = multiply(5);
// 輸出: "第一個參數是: 5"

console.log(multiplyBy5(3)); 
// 輸出: "第二個參數是: 3"
// 輸出: "計算 5 × 3"
// 輸出: 15
```

## 部分應用（Partial Application）

Currying 最大的優勢是可以進行**部分應用**，即先提供部分參數，創建專門化的函數：

```javascript
// 通用的問候函數
const greet = language => name => time => {
  const greetings = {
    zh: '您好',
    en: 'Hello',
    jp: 'こんにちは'
  };
  return `${greetings[language]}, ${name}! 現在是${time}`;
};

// 創建專門的中文問候函數
const greetInChinese = greet('zh');

// 創建更專門的早上中文問候函數
const morningGreetInChinese = greetInChinese('小明');

console.log(morningGreetInChinese('早上8點')); 
// "您好, 小明! 現在是早上8點"

// 也可以一次調用
console.log(greet('en')('John')('3PM')); 
// "Hello, John! 現在是3PM"
```

## 實用的 Currying 範例

### 1. 數學運算

```javascript
// 基本運算的 Curried 版本
const add = a => b => a + b;
const multiply = a => b => a * b;
const subtract = a => b => a - b;

// 創建專門的運算函數
const add10 = add(10);
const double = multiply(2);
const subtract5 = subtract(5);

console.log(add10(5));    // 15
console.log(double(8));   // 16
console.log(subtract5(3)); // 2 (5 - 3)

// 組合使用
const numbers = [1, 2, 3, 4, 5];
const doubledAndAdd10 = numbers.map(double).map(add10);
console.log(doubledAndAdd10); // [12, 14, 16, 18, 20]
```

### 2. 資料處理

```javascript
// Curried 的篩選函數
const filterBy = property => value => array => {
  return array.filter(item => item[property] === value);
};

// Curried 的排序函數
const sortBy = property => array => {
  return [...array].sort((a, b) => {
    if (a[property] < b[property]) return -1;
    if (a[property] > b[property]) return 1;
    return 0;
  });
};

const users = [
  { name: '小明', age: 25, city: '台北' },
  { name: '小花', age: 30, city: '台中' },
  { name: '小華', age: 25, city: '台北' },
  { name: '小李', age: 35, city: '高雄' }
];

// 創建專門的篩選函數
const filterByAge25 = filterBy('age')(25);
const filterByTaipei = filterBy('city')('台北');
const sortByAge = sortBy('age');

console.log(filterByAge25(users));
// [{ name: '小明', age: 25, city: '台北' }, { name: '小華', age: 25, city: '台北' }]

console.log(filterByTaipei(users));
// [{ name: '小明', age: 25, city: '台北' }, { name: '小華', age: 25, city: '台北' }]

// 組合篩選和排序
const taipei25YearOlds = filterByTaipei(filterByAge25(users));
console.log(taipei25YearOlds);
```

### 3. DOM 操作

```javascript
// Curried DOM 操作函數
const updateElement = selector => property => value => {
  const element = document.querySelector(selector);
  if (element) {
    element[property] = value;
  }
  return element;
};

// 創建專門的更新函數
const updateTitle = updateElement('h1');
const updateTitleText = updateTitle('textContent');
const updateTitleColor = updateTitle('style.color');

// 使用
updateTitleText('歡迎來到我的網站');
updateTitleColor('blue');

// 創建更專門的函數
const updateHeader = updateElement('#header')('innerHTML');
updateHeader('<h1>新的標題</h1>');
```

## 通用的 Curry 函數

我們可以創建一個通用的 `curry` 函數，它能自動將任何函數轉換成 Curried 版本：

```javascript
function curry(fn) {
  return function curried(...args) {
    // 如果提供的參數數量大於等於原函數需要的參數數量
    if (args.length >= fn.length) {
      // 直接調用原函數
      return fn.apply(this, args);
    } else {
      // 返回一個新函數，等待更多參數
      return function(...nextArgs) {
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}

// 測試通用 curry 函數
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);

// 所有這些調用方式都有效
console.log(curriedAdd(1)(2)(3));     // 6
console.log(curriedAdd(1, 2)(3));     // 6
console.log(curriedAdd(1)(2, 3));     // 6
console.log(curriedAdd(1, 2, 3));     // 6

// 部分應用
const add5 = curriedAdd(5);
const add5and3 = add5(3);
console.log(add5and3(2)); // 10
```

## 實際應用案例

### 1. API 請求處理

```javascript
// Curried API 請求函數
const apiRequest = method => url => data => {
  const config = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  if (data && method !== 'GET') {
    config.body = JSON.stringify(data);
  }
  
  return fetch(url, config).then(response => response.json());
};

// 創建專門的請求函數
const get = apiRequest('GET');
const post = apiRequest('POST');
const put = apiRequest('PUT');

// 創建特定 API 的函數
const getUser = get('/api/users/');
const getUserPosts = get('/api/posts?userId=');
const createPost = post('/api/posts');

// 使用
getUser(123).then(user => console.log(user));
getUserPosts(123).then(posts => console.log(posts));
createPost({ title: '新文章', content: '內容...' });
```

### 2. 驗證函數

```javascript
// Curried 驗證函數
const validate = fieldName => rule => value => {
  const rules = {
    required: val => val !== null && val !== undefined && val !== '',
    minLength: min => val => val.length >= min,
    maxLength: max => val => val.length <= max,
    email: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
  };
  
  const result = rules[rule](value);
  return {
    isValid: result,
    message: result ? '驗證通過' : `${fieldName} 驗證失敗: ${rule}`
  };
};

// 創建專門的驗證函數
const validateName = validate('姓名');
const validateEmail = validate('電子郵件');
const validatePassword = validate('密碼');

const requiredName = validateName('required');
const validEmail = validateEmail('email');
const minLengthPassword = validatePassword('minLength')(8);

// 使用
console.log(requiredName('小明'));        // { isValid: true, message: '驗證通過' }
console.log(validEmail('test@test.com')); // { isValid: true, message: '驗證通過' }
console.log(minLengthPassword('123'));    // { isValid: false, message: '密碼 驗證失敗: minLength' }
```

### 3. 待辦事項管理系統

讓我們用 Currying 構建一個簡潔的待辦事項管理系統：

```javascript
// 基礎資料
const todos = [
  { id: 1, text: '學習 JavaScript', completed: false, priority: 'high', category: 'learning' },
  { id: 2, text: '購買雜貨', completed: true, priority: 'medium', category: 'personal' },
  { id: 3, text: '完成專案報告', completed: false, priority: 'high', category: 'work' },
  { id: 4, text: '運動', completed: false, priority: 'low', category: 'health' }
];

// Curried 篩選函數
const filterBy = property => value => todos => 
  todos.filter(todo => todo[property] === value);

// Curried 更新函數
const updateTodo = property => value => id => todos =>
  todos.map(todo => 
    todo.id === id ? { ...todo, [property]: value } : todo
  );

// Curried 統計函數
const countBy = property => todos =>
  todos.reduce((stats, todo) => {
    const key = todo[property];
    stats[key] = (stats[key] || 0) + 1;
    return stats;
  }, {});

// 創建專門的篩選器
const filterCompleted = filterBy('completed');
const filterPriority = filterBy('priority');
const filterCategory = filterBy('category');

// 創建專門的更新器
const toggleComplete = updateTodo('completed');
const changePriority = updateTodo('priority');

// 創建專門的統計器
const statsByPriority = countBy('priority');
const statsByCategory = countBy('category');

// 使用範例
console.log('高優先級任務:', filterPriority('high')(todos));
console.log('未完成任務:', filterCompleted(false)(todos));

// 組合篩選器
const getHighPriorityIncomplete = todos => 
  filterCompleted(false)(filterPriority('high')(todos));

console.log('高優先級未完成:', getHighPriorityIncomplete(todos));

// 更新資料
const toggleTodo1 = toggleComplete(true)(1);
const updatedTodos = toggleTodo1(todos);
console.log('更新後的待辦事項:', updatedTodos);

// 統計資訊
console.log('優先級統計:', statsByPriority(todos));
console.log('分類統計:', statsByCategory(todos));

// 創建管道函數進行複雜操作
const pipe = (...fns) => initial => fns.reduce((acc, fn) => fn(acc), initial);

const getWorkTasksHighPriority = pipe(
  filterCategory('work'),
  filterPriority('high'),
  filterCompleted(false)
);

console.log('工作中的高優先級未完成任務:', getWorkTasksHighPriority(todos));
```

這個範例展示了 Currying 如何讓我們：
- 創建可重用的篩選器和更新器
- 組合簡單函數構建複雜功能
- 通過部分應用創建專門化的工具函數

## Currying 的優點

1. **函數重用性**：可以創建專門化的函數，減少重複程式碼
2. **函數組合**：更容易組合小函數來構建複雜功能
3. **延遲執行**：可以預先配置函數，延遲到有足夠參數時才執行
4. **更清晰的程式碼**：讓程式碼意圖更加明確
5. **更好的測試性**：專門化的函數更容易測試

## 何時使用 Currying

- 當您發現經常使用相同的參數組合時
- 需要創建配置化的函數時
- 構建函數組合管道時
- 需要延遲函數執行時
- 想要提高程式碼重用性時

## 注意事項

1. **性能考量**：Currying 會創建額外的函數，可能影響性能
2. **記憶體使用**：閉包會保持對外部變數的引用
3. **除錯困難**：錯誤堆疊可能更複雜
4. **過度使用**：不是所有函數都需要 Currying

## 總結

Currying 是函數式程式設計中的一個強大工具，它通過將多參數函數轉換為單參數函數鏈，提供了更大的靈活性和重用性。雖然可能需要一些時間來習慣這種思維方式，但一旦掌握，您會發現它能讓程式碼變得更加優雅和模組化。

記住：Currying 不是為了炫技，而是為了讓程式碼更加實用和可維護。在適當的場景下使用 Currying，能夠顯著提升程式碼的品質。

## 實戰練習

### 練習 1：基本 Currying 實作（簡單）⭐

**任務：** 將以下函數轉換為 Curried 版本

```javascript
// 原始函數
function calculatePrice(price, taxRate, discount) {
  return price * (1 + taxRate) - discount;
}

// 使用範例
console.log(calculatePrice(100, 0.1, 10)); // 100
```

**要求：**
- 轉換為 Curried 版本
- 建立專門的「10% 稅率計算」函數
- 建立專門的「無折扣計算」函數

:::details 💡 參考答案
```javascript
// Curried 版本
const calculatePrice = price => taxRate => discount => {
  return price * (1 + taxRate) - discount;
};

// 建立專門的函數
const priceWithTax = calculatePrice(100);
const priceWith10PercentTax = priceWithTax(0.1);

// 使用
console.log(priceWith10PercentTax(10)); // 100
console.log(priceWith10PercentTax(20)); // 90

// 更專門的函數
const calculate10PercentTax = calculatePrice(100)(0.1);
const calculateNoDiscount = price => calculatePrice(price)(0.1)(0);

console.log(calculateNoDiscount(200)); // 220
```

**進階應用：**
```javascript
// 建立產品價格計算器
const products = [
  { name: '手機', price: 10000 },
  { name: '筆電', price: 30000 },
  { name: '平板', price: 15000 }
];

// 使用 Currying 計算所有產品的含稅價
const applyTax = taxRate => price => price * (1 + taxRate);
const apply5PercentTax = applyTax(0.05);

const pricesWithTax = products.map(p => ({
  ...p,
  priceWithTax: apply5PercentTax(p.price)
}));

console.log(pricesWithTax);
// [
//   { name: '手機', price: 10000, priceWithTax: 10500 },
//   { name: '筆電', price: 30000, priceWithTax: 31500 },
//   { name: '平板', price: 15000, priceWithTax: 15750 }
// ]
```
:::

### 練習 2：實用工具函數（簡單）⭐

**任務：** 使用 Currying 建立一組實用的陣列處理函數

**要求：**
1. 建立 `filterBy(property)(value)(array)` 函數
2. 建立 `mapBy(property)(fn)(array)` 函數
3. 建立 `sortBy(property)(order)(array)` 函數

:::details 💡 參考答案
```javascript
// 1. 篩選函數
const filterBy = property => value => array => 
  array.filter(item => item[property] === value);

// 2. 映射函數
const mapBy = property => fn => array =>
  array.map(item => ({
    ...item,
    [property]: fn(item[property])
  }));

// 3. 排序函數
const sortBy = property => order => array => {
  const sorted = [...array].sort((a, b) => {
    if (a[property] < b[property]) return -1;
    if (a[property] > b[property]) return 1;
    return 0;
  });
  return order === 'desc' ? sorted.reverse() : sorted;
};

// 測試資料
const users = [
  { id: 1, name: '小明', age: 25, role: 'admin' },
  { id: 2, name: '小華', age: 30, role: 'user' },
  { id: 3, name: '小美', age: 28, role: 'admin' },
  { id: 4, name: '小強', age: 35, role: 'user' }
];

// 使用範例
const filterAdmins = filterBy('role')('admin');
const doubleAge = mapBy('age')(age => age * 2);
const sortByAgeDesc = sortBy('age')('desc');

console.log('管理員:', filterAdmins(users));
console.log('年齡加倍:', doubleAge(users));
console.log('按年齡降序:', sortByAgeDesc(users));

// 組合使用
const pipe = (...fns) => initial => 
  fns.reduce((acc, fn) => fn(acc), initial);

const processUsers = pipe(
  filterAdmins,
  sortByAgeDesc,
  doubleAge
);

console.log('組合處理結果:', processUsers(users));
```
:::

### 練習 3：購物車系統（中等）⭐⭐

**任務：** 使用 Currying 建立一個功能完整的購物車系統

**需求：**
1. 新增商品到購物車
2. 套用折扣
3. 計算運費
4. 計算總價

**資料結構：**
```javascript
const products = [
  { id: 1, name: 'iPhone', price: 30000, quantity: 0 },
  { id: 2, name: 'MacBook', price: 50000, quantity: 0 },
  { id: 3, name: 'iPad', price: 20000, quantity: 0 }
];
```

:::details 💡 參考答案與完整實作

**解題思路：**
1. 使用 Currying 建立可組合的計算函數
2. 每個函數負責單一職責
3. 透過 pipe 組合函數建立完整流程

**完整程式碼：**
```javascript
// 基礎計算函數
const addToCart = productId => quantity => cart => {
  return cart.map(item => 
    item.id === productId 
      ? { ...item, quantity: item.quantity + quantity }
      : item
  );
};

const applyDiscount = discountRate => cart => {
  return cart.map(item => ({
    ...item,
    discountedPrice: item.price * (1 - discountRate)
  }));
};

const calculateShipping = freeShippingThreshold => cart => {
  const subtotal = cart.reduce(
    (sum, item) => sum + (item.discountedPrice || item.price) * item.quantity, 
    0
  );
  return {
    cart,
    shipping: subtotal >= freeShippingThreshold ? 0 : 100
  };
};

const calculateTotal = ({ cart, shipping }) => {
  const subtotal = cart.reduce(
    (sum, item) => sum + (item.discountedPrice || item.price) * item.quantity,
    0
  );
  return {
    cart,
    subtotal,
    shipping,
    total: subtotal + shipping
  };
};

// 建立專門的函數
const add1iPhone = addToCart(1)(1);
const add1MacBook = addToCart(2)(1);
const apply20PercentOff = applyDiscount(0.2);
const freeShippingOver5000 = calculateShipping(5000);

// Pipe 工具函數
const pipe = (...fns) => initial => 
  fns.reduce((acc, fn) => fn(acc), initial);

// 建立購物流程
const processOrder = pipe(
  add1iPhone,
  add1MacBook,
  apply20PercentOff,
  freeShippingOver5000,
  calculateTotal
);

// 初始購物車
const initialCart = [
  { id: 1, name: 'iPhone', price: 30000, quantity: 0 },
  { id: 2, name: 'MacBook', price: 50000, quantity: 0 },
  { id: 3, name: 'iPad', price: 20000, quantity: 0 }
];

// 執行訂單處理
const result = processOrder(initialCart);

console.log('購物車內容:', result.cart);
console.log('小計:', result.subtotal);
console.log('運費:', result.shipping);
console.log('總計:', result.total);

// 輸出：
// 購物車內容: [
//   { id: 1, name: 'iPhone', price: 30000, quantity: 1, discountedPrice: 24000 },
//   { id: 2, name: 'MacBook', price: 50000, quantity: 1, discountedPrice: 40000 },
//   { id: 3, name: 'iPad', price: 20000, quantity: 0, discountedPrice: 16000 }
// ]
// 小計: 64000
// 運費: 0
// 總計: 64000
```

**進階功能：優惠券系統**
```javascript
// 優惠券類型
const couponTypes = {
  percentage: (rate, minPurchase) => subtotal =>
    subtotal >= minPurchase ? subtotal * (1 - rate) : subtotal,
  
  fixedAmount: (amount, minPurchase) => subtotal =>
    subtotal >= minPurchase ? subtotal - amount : subtotal,
  
  freeShipping: () => shipping => 0
};

// 建立特定優惠券
const spring20Off = couponTypes.percentage(0.2, 3000);
const save500 = couponTypes.fixedAmount(500, 5000);
const freeShip = couponTypes.freeShipping();

// 套用優惠券
const applyCoupon = couponFn => ({ cart, subtotal, shipping, total }) => {
  const newSubtotal = couponFn(subtotal);
  return {
    cart,
    subtotal: newSubtotal,
    shipping,
    total: newSubtotal + shipping
  };
};

// 使用優惠券
const orderWithCoupon = pipe(
  add1iPhone,
  add1MacBook,
  apply20PercentOff,
  freeShippingOver5000,
  calculateTotal,
  applyCoupon(spring20Off)
);

console.log('使用優惠券後:', orderWithCoupon(initialCart));
```

**學習重點：**
1. Currying 讓函數可以「預設」部分參數
2. Pipe 函數讓多個小函數組合成複雜流程
3. 每個函數都是純函數，容易測試和維護
4. 可以輕鬆建立不同的購物流程組合

:::

## 延伸閱讀

### 相關文章

本站相關主題：
- [函數式程式設計入門](/concepts/fp/functional-programming-intro) - 理解 FP 基本概念
- [Functor 指南](/concepts/fp/functor-guide) - 進階的函數容器概念
- [Monad 指南](/concepts/fp/monad-guide) - 更進階的函數組合技巧

### 推薦資源

外部優質資源：
- [Professor Frisby's Mostly Adequate Guide to FP](https://mostly-adequate.gitbook.io/) - 函數式程式設計經典教材
- [Ramda.js 文件](https://ramdajs.com/) - 實用的 FP 工具庫
- [Lodash/fp 模組](https://github.com/lodash/lodash/wiki/FP-Guide) - Lodash 的 FP 版本

## 常見問題 FAQ

### Q1: Currying 和 Partial Application 有什麼差別？

**A:** 兩者經常被混淆，但有明確差異：

| 比較項目 | Currying                     | Partial Application      |
| -------- | ---------------------------- | ------------------------ |
| 定義     | 將多參數函數轉為單參數函數鏈 | 固定部分參數，返回新函數 |
| 參數處理 | 每次只接受一個參數           | 可以一次接受多個參數     |
| 返回值   | 總是返回函數（直到最後一個） | 固定參數後返回新函數     |
| 使用方式 | `f(a)(b)(c)`                 | `f(a, b)` → `newF(c)`    |

**範例比較：**
```javascript
// Currying
const add = a => b => c => a + b + c;
add(1)(2)(3); // 必須一個一個傳

// Partial Application
const add = (a, b, c) => a + b + c;
const add1 = add.bind(null, 1);
add1(2, 3); // 可以一次傳多個
```

### Q2: 什麼時候應該使用 Currying？

**A:** Currying 適用於以下情況：

1. **需要建立專門化函數**
```javascript
const log = level => message => console.log(`[${level}] ${message}`);
const error = log('ERROR');
const info = log('INFO');

error('系統錯誤'); // [ERROR] 系統錯誤
info('啟動完成');  // [INFO] 啟動完成
```

2. **參數逐步取得**
```javascript
// API 請求配置
const request = baseURL => endpoint => params => 
  fetch(`${baseURL}${endpoint}`, { ...params });

const api = request('https://api.example.com');
const getUsers = api('/users');
getUsers({ method: 'GET' });
```

3. **函數組合管道**
```javascript
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const processUser = pipe(
  filterBy('active')(true),
  sortBy('age')('desc'),
  mapBy('name')(name => name.toUpperCase())
);
```

### Q3: Currying 會影響效能嗎？

**A:** 會有輕微影響，但通常可以忽略：

**效能考量：**
- ✅ **閉包成本**：每個 Curried 函數都會建立閉包
- ✅ **函數調用**：多次函數調用比單次調用慢
- ✅ **現代引擎優化**：V8 等引擎會優化簡單的閉包

**效能測試結果：**
```javascript
// 一般函數
function normalAdd(a, b, c) {
  return a + b + c;
}

// Curried 函數
const curriedAdd = a => b => c => a + b + c;

// 百萬次調用測試
console.time('normal');
for (let i = 0; i < 1000000; i++) {
  normalAdd(1, 2, 3);
}
console.timeEnd('normal'); // ~15ms

console.time('curried');
for (let i = 0; i < 1000000; i++) {
  curriedAdd(1)(2)(3);
}
console.timeEnd('curried'); // ~25ms
```

**結論：** 
- 效能差異約 60%，但絕對值很小（10ms 差異）
- 在實際應用中，程式碼可讀性和維護性更重要
- 除非是超高頻率調用的核心運算，否則影響可忽略

### Q4: 如何除錯 Curried 函數？

**A:** Curried 函數的堆疊追蹤可能較複雜，建議：

**1. 使用命名函數**
```javascript
// ❌ 難以除錯
const add = a => b => c => a + b + c;

// ✅ 更容易追蹤
const add = function addCurried(a) {
  return function addWithA(b) {
    return function addWithAB(c) {
      return a + b + c;
    };
  };
};
```

**2. 增加中間日誌**
```javascript
const add = a => {
  console.log('a:', a);
  return b => {
    console.log('b:', b);
    return c => {
      console.log('c:', c);
      return a + b + c;
    };
  };
};
```

**3. 使用開發工具**
```javascript
// 建立可除錯的 curry helper
const curry = (fn, arity = fn.length) => {
  return function curried(...args) {
    console.log(`調用 ${fn.name}，參數:`, args);
    if (args.length >= arity) {
      return fn(...args);
    }
    return (...moreArgs) => curried(...args, ...moreArgs);
  };
};
```
