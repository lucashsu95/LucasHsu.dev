---
outline: [2,3]
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: Object.hasOwn,javascript,js,has,key,includes,object,
  - - meta
    - name: og:title
      content: Object.hasOwn() - javascript
  - - meta
    - name: og:description
      content: Object.hasOwn() 是 JavaScript 中的一個靜態方法，用於檢查指定對象是否擁有某個屬性作為其自有屬性。這個方法的引入旨在取代 Object.prototype.hasOwnProperty() 方法，並提供更好的兼容性和使用便利性。
  - - meta
    - name: og:type
      content: article
---

# Object.hasOwn()

`Object.hasOwn()` 是 JavaScript 中的一個靜態方法，用於檢查指定對象是否擁有某個屬性作為其自有屬性。這個方法的引入旨在取代 `Object.prototype.hasOwnProperty()` 方法，並提供更好的兼容性和使用便利性。

## 語法

```jsx
Object.hasOwn(obj, prop);
```

## 參數

- **obj**: 要檢查的 JavaScript 對象。
- **prop**: 要檢查的屬性名稱（字符串）。

## 返回值

返回一個布爾值，如果對象擁有指定的屬性作為其自有屬性，則返回 `true`，否則返回 `false`。

## 使用示例

### 基本用法

以下是使用 `Object.hasOwn()` 的基本示例：

```jsx
const details = { name: "Raj", course: "DSA" };

console.log(Object.hasOwn(details, 'name')); // 輸出: true
console.log(Object.hasOwn(details, 'course')); // 輸出: true
console.log(Object.hasOwn(details, 'phone number')); // 輸出: false
```

### 與 `hasOwnProperty()` 的比較

`Object.hasOwn()` 與 `Object.prototype.hasOwnProperty()` 的主要區別在於，前者可以在使用 `Object.create(null)` 創建的對象上使用，而後者則無法：

```jsx
const obj = Object.create(null);
obj.age = 35;

console.log(Object.hasOwn(obj, 'age')); // 輸出: true
console.log(obj.hasOwnProperty('age')); // TypeError: obj.hasOwnProperty is not a function
```

### 繼承屬性檢查

`Object.hasOwn()` 不會檢查繼承的屬性，這使得它在避免原型污染方面非常有用：

```jsx
const person = { name: 'John' };
const person2 = Object.create(person);

console.log(Object.hasOwn(person2, 'name')); // 輸出: false
console.log(person2.hasOwnProperty('name')); // 輸出: true
```

## 注意事項

1. **兼容性**: `Object.hasOwn()` 是 ECMAScript 2022 的一部分，並且在所有現代瀏覽器中得到了支持，但在某些舊版瀏覽器中可能不被支持。
2. **類型轉換**: 如果第一個參數不是對象，`Object.hasOwn()` 會將其轉換為對象，但如果是 `null` 或 `undefined`，則會拋出 `TypeError`。
3. **性能**: 使用 `Object.hasOwn()` 可以提高代碼的可讀性和可維護性，特別是在需要檢查對象屬性時。

總之，`Object.hasOwn()` 提供了一種簡單而有效的方法來檢查對象的自有屬性，並且在許多情況下優於傳統的 `hasOwnProperty()` 方法。