---
outline: "deep"

head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: javascript-sort, javascript-排序, javascript-array-sort, js-sort-方法, javascript-升序, javascript-降序, javascript-自訂排序, javascript-比較函數
  - - meta
    - property: og:title
      content: JavaScript sort() 排序方法完整教學｜升序降序與自訂排序範例
  - - meta
    - property: og:description
      content: JavaScript sort() 怎麼用？本篇詳細說明 sort() 方法的工作原理、返回值意義、升序降序排序，並提供數字、字串、物件排序的實用範例，幫你掌握 JavaScript 陣列排序技巧。
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/javascript-cover.jpg
---

# JavaScript sort() 排序方法完整教學

## 什麼是 sort() 方法？

`Array.prototype.sort()` 是 JavaScript 內建的陣列排序方法，可以對陣列元素進行排序。

## 比較函數的返回值意義

在 `sort((a, b) => {...})` 中，比較函數的返回值決定排序順序：

| 返回值      | 意義                  | 結果           |
| ----------- | --------------------- | -------------- |
| `-1` (負數) | `a` 應該排在 `b` 之前 | a 在前，b 在後 |
| `1` (正數)  | `a` 應該排在 `b` 之後 | b 在前，a 在後 |
| `0`         | `a` 和 `b` 順序不變   | 保持原順序     |

## 基本排序範例

### 數字排序

**升序排序（小到大）：**
```javascript
const numbers = [3, 1, 4, 1, 5, 9];
numbers.sort((a, b) => a - b);
console.log(numbers); // [1, 1, 3, 4, 5, 9]
```

**降序排序（大到小）：**
```javascript
const numbers = [3, 1, 4, 1, 5, 9];
numbers.sort((a, b) => b - a);
console.log(numbers); // [9, 5, 4, 3, 1, 1]
```

### 字串排序

**字母順序：**
```javascript
const fruits = ['banana', 'apple', 'cherry'];
fruits.sort();
console.log(fruits); // ['apple', 'banana', 'cherry']
```

**反向字母順序：**
```javascript
const fruits = ['banana', 'apple', 'cherry'];
fruits.sort((a, b) => b.localeCompare(a));
console.log(fruits); // ['cherry', 'banana', 'apple']
```

## 物件排序

### 根據物件屬性排序

```javascript
const students = [
  { name: 'Alice', score: 85 },
  { name: 'Bob', score: 92 },
  { name: 'Charlie', score: 78 }
];

// 按分數升序
students.sort((a, b) => a.score - b.score);
console.log(students);
// [{ name: 'Charlie', score: 78 }, { name: 'Alice', score: 85 }, { name: 'Bob', score: 92 }]

// 按分數降序
students.sort((a, b) => b.score - a.score);
console.log(students);
// [{ name: 'Bob', score: 92 }, { name: 'Alice', score: 85 }, { name: 'Charlie', score: 78 }]
```

### 按字串屬性排序

```javascript
const students = [
  { name: 'Charlie', age: 20 },
  { name: 'Alice', age: 22 },
  { name: 'Bob', age: 19 }
];

// 按姓名排序
students.sort((a, b) => a.name.localeCompare(b.name));
console.log(students);
// [{ name: 'Alice', age: 22 }, { name: 'Bob', age: 19 }, { name: 'Charlie', age: 20 }]
```

## 排序原理解析

### 為什麼 `a - b` 是升序？

```javascript
// 當 a = 3, b = 1 時
3 - 1 = 2 (正數) → a 排在 b 後面 → [1, 3]

// 當 a = 1, b = 3 時  
1 - 3 = -2 (負數) → a 排在 b 前面 → [1, 3]
```

### 為什麼 `b - a` 是降序？

```javascript
// 當 a = 1, b = 3 時
3 - 1 = 2 (正數) → a 排在 b 後面 → [3, 1]

// 當 a = 3, b = 1 時
1 - 3 = -2 (負數) → a 排在 b 前面 → [3, 1]
```

## 進階排序技巧

### 多重條件排序

```javascript
const data = [
  { name: 'Alice', age: 25, score: 85 },
  { name: 'Bob', age: 25, score: 92 },
  { name: 'Charlie', age: 23, score: 85 }
];

// 先按年齡，再按分數排序
data.sort((a, b) => {
  if (a.age !== b.age) {
    return a.age - b.age; // 年齡升序
  }
  return b.score - a.score; // 分數降序
});
```

## 注意事項

1. **`sort()` 會修改原陣列**，如果不想修改原陣列，請先複製：
   ```javascript
   const sortedArray = [...originalArray].sort((a, b) => a - b);
   ```

2. **預設是字串排序**，數字需要提供比較函數：
   ```javascript
   [10, 2, 1].sort(); // ['1', '10', '2'] ❌
   [10, 2, 1].sort((a, b) => a - b); // [1, 2, 10] ✅
   ```

## 總結

- `a - b`：升序排序（小到大）
- `b - a`：降序排序（大到小）
- 返回負數：`a` 在前
- 返回正數：`b` 在前
- 返回 0：順序不變