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
      content: https://lucashsu95.github.io/LucasHsu.dev/images/javascript-cover.png
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