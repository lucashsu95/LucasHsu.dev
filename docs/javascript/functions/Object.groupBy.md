---
outline: [2,3]
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: Object.groupBy,javascript,js,group,group by
  - - meta
    - property: og:title
      content: Object.groupBy() - javascript
  - - meta
    - property: og:description
      content: Object.groupBy() 是 JavaScript 中的一個新方法，用於根據回調函數返回的字符串值將可迭代對象的元素分組。這個方法的引入使得對數據進行分組變得更加簡單和直觀。
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/javascript-cover.jpg
---

# Object.groupBy()

> 📝 TL;DR
- ES2024 新方法，一行搞定陣列分組；取代手寫 `reduce` + 物件累積。
- 回傳 `null` 原型物件，避免原型鏈干擾，適合資料科學/電商場景。
- 回呼函數返回分組鍵（string/symbol），相同鍵的元素聚成一個陣列。

## 前置知識
- 陣列遍歷與 `reduce` 概念
- 物件鍵值操作
- 可選：`Object.create(null)` 與原型

`Object.groupBy()` 是 JavaScript 中的一個新方法，用於根據回調函數返回的字符串值將可迭代對象的元素分組。這個方法的引入使得對數據進行分組變得更加簡單和直觀。

## 語法

```jsx
Object.groupBy(iterable, callback);
```

## 參數

- **iterable**: 一個可迭代的數組或映射。
- **callback**: 一個函數，對每個元素執行，應返回一個用於分組的字符串或符號。

## 返回值

返回一個具有分組元素的 `null` 原型對象，該對象的屬性對應於每個分組，屬性值為包含該組所有元素的數組。

## 使用示例

### 基本用法

以下是使用 `Object.groupBy()` 的基本示例：

```jsx
const fruits = [
    { name: "apples", quantity: 300 },
    { name: "bananas", quantity: 500 },
    { name: "oranges", quantity: 200 },
    { name: "kiwi", quantity: 150 }
];

// 根據數量分組
const result = Object.groupBy(fruits, ({ quantity }) => quantity > 200 ? "ok" : "low");

console.log(result);
/*
{
    ok: [
        { name: "bananas", quantity: 500 },
        { name: "apples", quantity: 300 }
    ],
    low: [
        { name: "oranges", quantity: 200 },
        { name: "kiwi", quantity: 150 }
    ]
}
*/
```

在這個示例中，根據水果的數量將其分組為 "ok" 和 "low"。

### 分組示例

以下示例展示了如何根據年齡對人員進行分組：

```jsx
const people = [
    { name: "Alice", age: 28 },
    { name: "Bob", age: 30 },
    { name: "Eve", age: 28 }
];

// 根據年齡分組
const peopleByAge = Object.groupBy(people, (person) => person.age);

console.log(peopleByAge);
/*
{
    "28": [
        { name: "Alice", age: 28 },
        { name: "Eve", age: 28 }
    ],
    "30": [
        { name: "Bob", age: 30 }
    ]
}
*/
```

## 注意事項

1. **返回的對象**: `Object.groupBy()` 返回的對象是 `null` 原型對象，這意味著它不會繼承 `Object.prototype` 的屬性和方法，因此不能使用 `hasOwnProperty` 等方法。
2. **回調函數**: 回調函數應返回字符串或符號，否則返回值會被強制轉換為字符串。
3. **ES2024 特性**: `Object.groupBy()` 是 ECMAScript 2024 的一部分，已在所有現代瀏覽器中得到支持。
4. **性能**: 對於小到中型數據集，`Object.groupBy()` 提供了一個高效的解決方案，簡化了分組的代碼。

`Object.groupBy()` 是一個強大的工具，能夠簡化數據分組的過程，提升代碼的可讀性和可維護性。

## 實際應用場景

### 1. 電商訂單分組
```javascript
const orders = [
  { id: 1, status: 'pending', amount: 100 },
  { id: 2, status: 'shipped', amount: 200 },
  { id: 3, status: 'pending', amount: 150 },
  { id: 4, status: 'delivered', amount: 300 }
]

const ordersByStatus = Object.groupBy(orders, order => order.status)
// { pending: [{id:1,...}, {id:3,...}], shipped: [...], delivered: [...] }
```

### 2. 使用者等級分類
```javascript
const users = [
  { name: 'Alice', score: 85 },
  { name: 'Bob', score: 92 },
  { name: 'Charlie', score: 78 }
]

const usersByGrade = Object.groupBy(users, user => {
  if (user.score >= 90) return 'A'
  if (user.score >= 80) return 'B'
  return 'C'
})
// { A: [{name:'Bob',...}], B: [{name:'Alice'}], C: [{name:'Charlie'}] }
```

### 3. 日期資料聚合
```javascript
const logs = [
  { event: 'login', date: '2025-01-01' },
  { event: 'logout', date: '2025-01-01' },
  { event: 'login', date: '2025-01-02' }
]

const logsByDate = Object.groupBy(logs, log => log.date)
// { '2025-01-01': [...2 logs], '2025-01-02': [...1 log] }
```

## 實戰練習

### 練習 1：商品分類（簡單）⭐
> 將商品陣列按照類別 `category` 分組。

:::details 💡 參考答案
```javascript
const products = [
  { name: 'Laptop', category: 'electronics' },
  { name: 'Shirt', category: 'clothing' },
  { name: 'Phone', category: 'electronics' }
]

const grouped = Object.groupBy(products, p => p.category)
// { electronics: [...], clothing: [...] }
```
:::

### 練習 2：成績及格分組（簡單）⭐
> 將學生按成績是否及格（≥60）分成 pass/fail 兩組。

:::details 💡 參考答案
```javascript
const students = [
  { name: 'Amy', score: 75 },
  { name: 'Ben', score: 55 },
  { name: 'Cathy', score: 90 }
]

const result = Object.groupBy(students, s => s.score >= 60 ? 'pass' : 'fail')
```
:::

### 練習 3：多條件分組（中等）⭐⭐
> 將訂單按「地區 + 狀態」組合鍵分組，例如 `北部-pending`。

:::details 💡 參考答案與提示
**提示：** 組合多個欄位成一個字串作為鍵。
```javascript
const orders = [
  { region: '北部', status: 'pending', id: 1 },
  { region: '南部', status: 'shipped', id: 2 },
  { region: '北部', status: 'pending', id: 3 }
]

const grouped = Object.groupBy(orders, o => `${o.region}-${o.status}`)
// { '北部-pending': [...], '南部-shipped': [...] }
```
:::

## 延伸閱讀
- MDN: [Object.groupBy()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy)
- TC39 Proposal: Array Grouping
- Lodash `_.groupBy` 對比與遷移指南

## FAQ
- Q: 和 `reduce` 手動分組有什麼差別？
  - A: `Object.groupBy` 更簡潔，且回傳 null 原型物件避免原型鏈干擾；手寫 `reduce` 較靈活但冗長。
- Q: 可以傳入 Map 嗎？
  - A: 可以，但要用 `Map.groupBy()` (ES2024 同步新增)。
- Q: 回傳物件的鍵順序？
  - A: 按首次出現的鍵順序，符合插入順序（insertion order）。
