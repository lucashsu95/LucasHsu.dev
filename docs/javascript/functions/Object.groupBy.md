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
    - name: og:title
      content: Object.groupBy() - javascript
  - - meta
    - name: og:description
      content: Object.groupBy() 是 JavaScript 中的一個新方法，用於根據回調函數返回的字符串值將可迭代對象的元素分組。這個方法的引入使得對數據進行分組變得更加簡單和直觀。
  - - meta
    - name: og:type
      content: article
---

# Object.groupBy()

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
