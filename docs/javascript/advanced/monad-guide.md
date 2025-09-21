---
outline: "deep"
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: monad,單子,函數式程式設計,functional programming,flatMap,maybe monad,either monad,io monad,promise,javascript,js
  - - meta
    - property: og:title
      content: Monad 單子完整指南 | 函數式程式設計的終極抽象
  - - meta
    - property: og:description
      content: 深入學習 Monad 單子概念，包含 Maybe、Either、IO、List Monad 的實現與應用，掌握函數式程式設計的核心抽象模式。
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/javascript-cover.png
  - - meta
    - name: description
      content: 完整的 Monad 單子教學指南，學習函數式程式設計的終極抽象，包含錯誤處理、副作用管理和計算組合的實用範例。
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - property: og:url
      content: https://lucashsu.dev/javascript/advanced/monad-guide
  - - meta
    - property: og:site_name
      content: Lucas Hsu Blog
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Monad 單子完整指南 | 函數式程式設計的終極抽象
  - - meta
    - name: twitter:description
      content: 深入學習 Monad 單子概念，包含 Maybe、Either、IO、List Monad 的實現與應用，掌握函數式程式設計的核心抽象模式。
---

# Monad：函數式程式設計的終極抽象

## 什麼是 Monad？

Monad（單子）是函數式程式設計中最重要也是最神秘的概念之一。如果說 Functor 是「可以映射的容器」，那麼 **Monad 就是「可以扁平化映射的容器」**。

Monad 是一個設計模式，用於處理**計算的組合**和**副作用的管理**。它提供了一種結構化的方式來：
- 鏈接可能失敗的操作
- 處理異步計算
- 管理狀態變化
- 處理各種計算上下文

## Monad 的定義

一個 Monad 必須實現三個基本操作：

1. **Unit/Of**：將普通值包裝到 Monad 中
2. **Bind/FlatMap/Chain**：將函數應用到 Monad 值，並扁平化結果
3. **滿足 Monad 法則**：左恆等、右恆等、結合律

```javascript
// Monad 的基本結構
class Monad {
  constructor(value) {
    this.value = value;
  }
  
  // Unit/Of：包裝普通值
  static of(value) {
    return new Monad(value);
  }
  
  // 實現 map（繼承自 Functor）
  map(fn) {
    return Monad.of(fn(this.value));
  }
  
  // 關鍵：實現 flatMap/chain
  flatMap(fn) {
    return fn(this.value);
  }
}
```

## Monad vs Functor 的區別

### Functor 的限制

當我們使用 `map` 處理一個返回容器的函數時，會產生**雙重包裝**：

```javascript
Maybe.of(10).map(x => Maybe.of(x * 2))  // 結果：Maybe(Maybe(20))
```

這時候值被嵌套在兩層容器中，變得難以處理。

### Monad 的解決方案

`flatMap` 方法會自動**扁平化**結果，避免嵌套：

```javascript
Maybe.of(10).flatMap(x => Maybe.of(x * 2))  // 結果：Maybe(20)
```

### 實際應用場景比較

不同場景下 Functor 和 Monad 的問題與解決方案：


| 場景         | Functor 問題                          | Monad 解決                    |
| :----------- | :------------------------------------ | :---------------------------- |
| 安全除法     | `Maybe(Maybe(結果))` 嵌套             | `Maybe(結果)` 扁平化          |
| 用戶資料處理 | `Maybe(Maybe(email))` 難以處理        | `Maybe(email)` 直接處理       |
| API 請求鏈   | `Promise(Promise(data))` 嵌套         | `Promise(data)` 鏈式調用      |
| 表單驗證     | `Validation(Validation(result))` 複雜 | `Validation(result)` 組合驗證 |

### 使用法則總結

#### 什麼時候用 map？

- 函數返回**普通值** `(a → b)`
- 進行簡單的**值轉換**
- 例如：數字運算、字串處理、格式化等

```javascript
Maybe.of(5)
  .map(x => x * 2)        // 純函數：數字 → 數字
  .map(x => x.toString()) // 純函數：數字 → 字串
```


#### 什麼時候用 flatMap？

- 函數返回**同類型容器** `(a → M(b))`
- 進行**可能失敗的操作**
- 需要**鏈式組合**多個容器操作

```javascript
Maybe.of(16)
  .flatMap(x => safeDivide(x, 4))     // 返回 Maybe
  .flatMap(x => safeSquareRoot(x))    // 返回 Maybe
```


### 技術細節對比

| 特性         | Functor                | Monad                          |
| :----------- | :--------------------- | :----------------------------- |
| 核心方法     | `map`                  | `flatMap/chain/bind`           |
| 函數簽名     | `map(f: a → b) → F[b]` | `flatMap(f: a → M[b]) → M[b]`  |
| 處理函數類型 | 純函數 `(a → b)`       | 返回 Monad 的函數 `(a → M[b])` |
| 嵌套問題     | 會產生嵌套 `F[F[b]]`   | 自動扁平化避免嵌套             |
| 主要用途     | 值的轉換               | 計算的組合與控制流             |
| 法則數量     | 2個法則                | 3個法則                        |

### 關鍵洞察

**Monad 不只是「有 flatMap 的 Functor」**。更準確地說：

1. **Functor** 解決了「如何在容器中應用函數」的問題
2. **Monad** 解決了「如何組合返回容器的計算」的問題

Monad 的真正價值在於提供了一種**組合計算**的統一方式，特別是處理可能失敗、異步、或有副作用的操作時。這就是為什麼 JavaScript 的 Promise 本質上就是一個 Monad - 它允許我們優雅地鏈式組合異步操作，而不需要深層嵌套的回調。

## 實用的 Monad 實現

### 1. Maybe Monad - 處理空值

```javascript
class Maybe {
  constructor(value) {
    this.value = value;
  }
  
  static of(value) {
    return new Maybe(value);
  }
  
  static nothing() {
    return new Maybe(null);
  }
  
  isNothing() {
    return this.value === null || this.value === undefined;
  }
  
  // Functor 的 map
  map(fn) {
    return this.isNothing() ? this : Maybe.of(fn(this.value));
  }
  
  // Monad 的 flatMap/chain
  flatMap(fn) {
    return this.isNothing() ? this : fn(this.value);
  }
  
  // 輔助方法
  getOrElse(defaultValue) {
    return this.isNothing() ? defaultValue : this.value;
  }
  
  inspect() {
    return this.isNothing() ? 'Nothing' : `Just(${this.value})`;
  }
}

// 實際應用：安全的鏈式操作
function safeGet(obj, key) {
  return obj && obj[key] !== undefined ? Maybe.of(obj[key]) : Maybe.nothing();
}

function safeParse(str) {
  try {
    const num = parseFloat(str);
    return isNaN(num) ? Maybe.nothing() : Maybe.of(num);
  } catch {
    return Maybe.nothing();
  }
}

// 使用 Maybe Monad 處理深層物件訪問
const userData = {
  user: {
    profile: {
      settings: {
        theme: 'dark',
        fontSize: '14px'
      }
    }
  }
};

const fontSize = Maybe.of(userData)
  .flatMap(data => safeGet(data, 'user'))
  .flatMap(user => safeGet(user, 'profile'))
  .flatMap(profile => safeGet(profile, 'settings'))
  .flatMap(settings => safeGet(settings, 'fontSize'))
  .flatMap(size => safeParse(size.replace('px', '')))
  .map(size => size + 2)
  .map(size => `${size}px`)
  .getOrElse('16px');

console.log(fontSize); // '16px'
```

### 2. Either Monad - 錯誤處理

```javascript
class Either {
  constructor(value, isRight = true) {
    this.value = value;
    this.isRight = isRight;
  }
  
  static right(value) {
    return new Either(value, true);
  }
  
  static left(value) {
    return new Either(value, false);
  }
  
  static of(value) {
    return Either.right(value);
  }
  
  isLeft() {
    return !this.isRight;
  }
  
  map(fn) {
    return this.isLeft() ? this : Either.right(fn(this.value));
  }
  
  flatMap(fn) {
    return this.isLeft() ? this : fn(this.value);
  }
  
  mapLeft(fn) {
    return this.isLeft() ? Either.left(fn(this.value)) : this;
  }
  
  fold(leftFn, rightFn) {
    return this.isLeft() ? leftFn(this.value) : rightFn(this.value);
  }
  
  inspect() {
    return this.isLeft() ? `Left(${this.value})` : `Right(${this.value})`;
  }
}

// 實際應用：表單驗證
function validateEmail(email) {
  if (!email) {
    return Either.left('郵箱不能為空');
  }
  if (!email.includes('@')) {
    return Either.left('郵箱格式不正確');
  }
  return Either.right(email.toLowerCase());
}

function validateAge(age) {
  if (typeof age !== 'number') {
    return Either.left('年齡必須是數字');
  }
  if (age < 0) {
    return Either.left('年齡不能為負數');
  }
  if (age > 150) {
    return Either.left('年齡不能超過150歲');
  }
  return Either.right(age);
}

function validateUser(userData) {
  return Either.of(userData)
    .flatMap(data => 
      validateEmail(data.email).map(email => ({ ...data, email }))
    )
    .flatMap(data => 
      validateAge(data.age).map(age => ({ ...data, age }))
    )
    .map(validatedData => ({
      ...validatedData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    }));
}

// 使用
const result1 = validateUser({ email: 'test@example.com', age: 25 });
console.log(result1.inspect()); 
// Right({email: 'test@example.com', age: 25, id: 'xyz123', createdAt: '...'})

const result2 = validateUser({ email: 'invalid-email', age: 25 });
console.log(result2.inspect()); 
// Left(郵箱格式不正確)
```

### 3. Result Monad - 簡化的錯誤處理

Result Monad 是 Either Monad 的簡化版本，專門用於成功/失敗的二元狀態：

```javascript
class Result {
  constructor(value, isSuccess = true) {
    this.value = value;
    this.isSuccess = isSuccess;
  }
  
  static success(value) {
    return new Result(value, true);
  }
  
  static error(error) {
    return new Result(error, false);
  }
  
  static of(value) {
    return Result.success(value);
  }
  
  isError() {
    return !this.isSuccess;
  }
  
  map(fn) {
    return this.isError() ? this : Result.success(fn(this.value));
  }
  
  flatMap(fn) {
    return this.isError() ? this : fn(this.value);
  }
  
  getOrElse(defaultValue) {
    return this.isSuccess ? this.value : defaultValue;
  }
  
  inspect() {
    return this.isSuccess ? `Success(${this.value})` : `Error(${this.value})`;
  }
}

// 實際應用：安全計算鏈
const safeParseInt = (str) => {
  const num = parseInt(str, 10);
  return isNaN(num) ? Result.error('無法解析為數字') : Result.success(num);
};

const safeDivide = (a, b) => {
  return b === 0 ? Result.error('除數不能為零') : Result.success(a / b);
};

// 組合使用
const calculate = (aStr, bStr) => 
  safeParseInt(aStr)
    .flatMap(a => 
      safeParseInt(bStr)
        .flatMap(b => safeDivide(a, b))
    );

console.log(calculate('10', '2').inspect());  // Success(5)
console.log(calculate('10', '0').inspect());  // Error(除數不能為零)
console.log(calculate('abc', '2').inspect()); // Error(無法解析為數字)
```

### 4. IO Monad - 管理副作用

```javascript
class IO {
  constructor(effect) {
    this.effect = effect;
  }
  
  static of(value) {
    return new IO(() => value);
  }
  
  // 創建讀取操作
  static read(promptText) {
    return new IO(() => {
      return prompt(promptText) || '';
    });
  }
  
  // 創建寫入操作
  static write(output) {
    return new IO(() => {
      console.log(output);
      return output;
    });
  }
  
  // 創建 DOM 操作
  static getElementById(id) {
    return new IO(() => document.getElementById(id));
  }
  
  map(fn) {
    return new IO(() => fn(this.effect()));
  }
  
  flatMap(fn) {
    return new IO(() => fn(this.effect()).effect());
  }
  
  // 執行副作用
  run() {
    return this.effect();
  }
  
  inspect() {
    return 'IO(?)';
  }
}

// 實際應用：純函數式的 DOM 操作
function updateTitle(newTitle) {
  return IO.getElementById('title')
    .map(element => {
      if (element) {
        element.textContent = newTitle;
        return `標題已更新為: ${newTitle}`;
      }
      return '找不到標題元素';
    })
    .flatMap(message => IO.write(message));
}

function interactiveGreeting() {
  return IO.read('請輸入您的姓名:')
    .map(name => name.trim() || '訪客')
    .map(name => `您好, ${name}!`)
    .flatMap(greeting => IO.write(greeting))
    .flatMap(() => updateTitle('歡迎頁面'));
}

// 純函數式的程式，只有在調用 run() 時才執行副作用
const program = interactiveGreeting();
// program.run(); // 執行副作用
```

### 5. List Monad - 非確定性計算

```javascript
class List {
  constructor(items) {
    this.items = Array.isArray(items) ? items : [items];
  }
  
  static of(value) {
    return new List([value]);
  }
  
  static empty() {
    return new List([]);
  }
  
  map(fn) {
    return new List(this.items.map(fn));
  }
  
  flatMap(fn) {
    const results = this.items.map(item => fn(item).items);
    return new List([].concat(...results));
  }
  
  filter(predicate) {
    return new List(this.items.filter(predicate));
  }
  
  concat(other) {
    return new List([...this.items, ...other.items]);
  }
  
  toArray() {
    return [...this.items];
  }
  
  inspect() {
    return `List([${this.items.join(', ')}])`;
  }
}

// 實際應用：生成所有可能的組合
function generateOutfits() {
  const tops = List.of(['T恤', '襯衫', '毛衣']);
  const bottoms = List.of(['牛仔褲', '裙子', '短褲']);
  const shoes = List.of(['運動鞋', '靴子', '涼鞋']);
  
  return tops.flatMap(top =>
    bottoms.flatMap(bottom =>
      shoes.map(shoe => ({ top, bottom, shoe }))
    )
  );
}

const outfits = generateOutfits();
console.log(outfits.toArray());
// 所有可能的穿搭組合

// 生成購物清單
function generateShoppingLists(budget) {
  const items = [
    { name: '蘋果', price: 30 },
    { name: '香蕉', price: 20 },
    { name: '橘子', price: 25 },
    { name: '葡萄', price: 80 }
  ];
  
  return List.of(items)
    .flatMap(itemList => {
      // 生成所有可能的商品組合
      const combinations = [];
      for (let i = 0; i < Math.pow(2, itemList.length); i++) {
        const combination = [];
        let totalPrice = 0;
        for (let j = 0; j < itemList.length; j++) {
          if ((i >> j) & 1) {
            combination.push(itemList[j]);
            totalPrice += itemList[j].price;
          }
        }
        if (totalPrice <= budget && combination.length > 0) {
          combinations.push({ items: combination, total: totalPrice });
        }
      }
      return List.of(combinations);
    })
    .flatMap(combos => List.of(combos));
  
}
```

## Promise：JavaScript 中的內建 Monad

JavaScript 的 Promise 實際上就是一個 Monad：

```javascript
// Promise 的 Monad 特性
Promise.resolve(5)           // Unit/Of
  .then(x => x * 2)          // map (Functor)
  .then(x => Promise.resolve(x + 1))  // flatMap (Monad)
  .then(result => console.log(result)); // 11

// 組合 Promise 操作
function fetchUser(id) {
  return fetch(`/api/users/${id}`).then(r => r.json());
}

function fetchUserPosts(userId) {
  return fetch(`/api/posts?userId=${userId}`).then(r => r.json());
}

function fetchUserProfile(userId) {
  return fetchUser(userId)
    .then(user => 
      fetchUserPosts(user.id)
        .then(posts => ({ user, posts }))
    );
}

// 使用 async/await 語法糖（Monad 的語法糖）
async function fetchUserProfileAsync(userId) {
  const user = await fetchUser(userId);
  const posts = await fetchUserPosts(user.id);
  return { user, posts };
}
```

## Monad 法則

### 1. 左恆等律（Left Identity）
```javascript
// M.of(a).flatMap(f) === f(a)
const a = 5;
const f = x => Maybe.of(x * 2);

const left = Maybe.of(a).flatMap(f);
const right = f(a);
// left 和 right 應該相等
```

### 2. 右恆等律（Right Identity）
```javascript
// m.flatMap(M.of) === m
const m = Maybe.of(5);
const left = m.flatMap(Maybe.of);
const right = m;
// left 和 right 應該相等
```

### 3. 結合律（Associativity）
```javascript
// m.flatMap(f).flatMap(g) === m.flatMap(x => f(x).flatMap(g))
const m = Maybe.of(5);
const f = x => Maybe.of(x * 2);
const g = x => Maybe.of(x + 1);

const left = m.flatMap(f).flatMap(g);
const right = m.flatMap(x => f(x).flatMap(g));
// left 和 right 應該相等
```

## 何時使用 Monad

1. **錯誤處理**：使用 Either 或 Maybe 代替 try-catch
2. **異步操作**：Promise 已經是 Monad
3. **狀態管理**：管理複雜的狀態變化
4. **副作用控制**：使用 IO Monad 分離純函數和副作用
5. **選項組合**：使用 List Monad 處理多種可能性

## Monad 的優點

1. **錯誤處理**：優雅地處理失敗情況
2. **組合性**：可以鏈接複雜的操作
3. **抽象性**：隱藏複雜的控制流程
4. **一致性**：提供統一的操作模式
5. **可測試性**：純函數更容易測試

## 總結

Monad 是函數式程式設計的精髓，它提供了一種統一的方式來處理各種計算情境。雖然概念抽象，但 Monad 在實際編程中非常實用：

- **Maybe** 讓我們安全地處理空值
- **Either** 提供了優雅的錯誤處理
- **IO** 幫助我們管理副作用
- **Promise** 讓異步編程變得簡單

理解 Monad 需要時間和實踐，但一旦掌握，它會讓您的程式碼變得更加健壯、可維護和優雅。記住：Monad 不是為了炫技，而是為了解決實際的編程問題。