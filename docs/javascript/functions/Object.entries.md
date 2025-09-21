---
outline: [2,3]
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: Object.entries,javascript,js,Object轉陣列,Object轉Array
  - - meta
    - property: og:title
      content: Object.entries() - javascript
  - - meta
    - property: og:description
      content: Object.entries() 是 JavaScript 中的一個靜態方法，用於返回一個給定對象的可枚舉屬性鍵值對的數組。這個方法的主要功能是將對象的屬性轉換為一個由鍵值對組成的數組，每個鍵值對也是一個數組，第一個元素是屬性鍵，第二個元素是對應的屬性值。
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/javascript-cover.jpg
---

# Object.entries()

`Object.entries()` 是 JavaScript 中的一個靜態方法，用於返回一個給定對象的可枚舉屬性鍵值對的數組。這個方法的主要功能是將對象的屬性轉換為一個由鍵值對組成的數組，每個鍵值對也是一個數組，第一個元素是屬性鍵，第二個元素是對應的屬性值。

## 語法

```jsx
Object.entries(obj);
```

## 參數

- **obj**: 要處理的對象。

## 返回值

返回一個數組，數組的每個元素都是一個包含兩個元素的數組，分別是屬性鍵和屬性值。

## 使用示例

以下是一些使用 `Object.entries()` 的示例：

### 基本示例

```jsx
const person = {
    firstName: "John",
    lastName: "Doe",
    age: 30
};

console.log(Object.entries(person));
// 輸出: [['firstName', 'John'], ['lastName', 'Doe'], ['age', 30]]
```

在這個示例中，`Object.entries(person)` 將 `person` 對象的屬性轉換為一個數組。

### 與 `Object.fromEntries()` 結合使用

`Object.entries()` 可以與 `Object.fromEntries()` 方法結合使用，實現對對象的轉換：

```jsx
const entries = [['name', 'Alice'], ['age', 25]];
const obj = Object.fromEntries(entries);
console.log(obj); // 輸出: { name: 'Alice', age: 25 }
```

## 注意事項

1. **可枚舉性**: `Object.entries()` 僅返回對象自有的可枚舉屬性，不包括從原型鏈繼承的屬性。
2. **非可枚舉屬性**: 如果對象中存在非可枚舉屬性，這些屬性將不會出現在返回的數組中。
3. **對於原始值的處理**: 當傳入非對象類型（如數字或布林值）時，這些值會被轉換為對象，但 `undefined` 和 `null` 將引發 `TypeError`。
4. **順序**: 返回的鍵值對的順序與對象屬性被創建的順序相同。

`Object.entries()` 是一個非常有用的方法，特別是在需要處理對象的鍵值對時，能夠提高代碼的可讀性和可維護性。
