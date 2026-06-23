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
      content: https://lucashsu95.github.io/LucasHsu.dev/images/javascript-cover.webp
---

# Object.entries()
> 📝 TL;DR
- 物件轉陣列:`Object.entries(obj)` 返回 `[[key, value], ...]` 陣列。
- 常用於:for...of 走訪、表單資料轉換、物件過濾/轉換。
- 配對:`Object.fromEntries()` 可還原為物件。

## 前置知識
- 物件基礎語法、解構賽派
- for...of 迴圈與陣列方法
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
## 實際應用場景

### 1. 表單資料轉換
```javascript
const formData = { name: 'Alice', email: 'alice@mail.com', age: 25 }
const queryString = Object.entries(formData)
  .map(([key, value]) => `${key}=${value}`)
  .join('&')

console.log(queryString) // name=Alice&email=alice@mail.com&age=25
```

### 2. 物件過濾
```javascript
const data = { a: 10, b: null, c: 30, d: undefined }
const filtered = Object.fromEntries(
  Object.entries(data).filter(([_, value]) => value != null)
)

console.log(filtered) // { a: 10, c: 30 }
```

### 3. 物件轉換(Map)
```javascript
const prices = { apple: 10, banana: 20, orange: 30 }
const discounted = Object.fromEntries(
  Object.entries(prices).map(([fruit, price]) => [fruit, price * 0.8])
)

console.log(discounted) // { apple: 8, banana: 16, orange: 24 }
```

## 實戰練習

### 練習 1:遍歷物件(簡單)⭐
> 使用 Object.entries 輸出所有鍵值對。

:::details 💡 參考答案
```javascript
const user = { id: 1, name: 'Bob', role: 'admin' }
for (const [key, value] of Object.entries(user)) {
  console.log(`${key}: ${value}`)
}
// id: 1
// name: Bob
// role: admin
```
:::

### 練習 2:過濾空值(簡單)⭐
> 移除物件中所有 null/undefined 的屬性。

:::details 💡 參考答案
```javascript
const cleanObj = (obj) => Object.fromEntries(
  Object.entries(obj).filter(([_, v]) => v != null)
)

const data = { a: 1, b: null, c: 3, d: undefined }
console.log(cleanObj(data)) // { a: 1, c: 3 }
```
:::

### 練習 3:物件值加總(中等)⭐⭐
> 計算 `{ apple: 10, banana: 20, orange: 30 }` 的總金額。

:::details 💡 參考答案與提示
```javascript
const cart = { apple: 10, banana: 20, orange: 30 }
const total = Object.entries(cart).reduce((sum, [_, price]) => sum + price, 0)
console.log(total) // 60
```
:::

## 延伸閱讀
- [MDN: Object.entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
- [Object.fromEntries 還原物件](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)
- [Object.keys / Object.values 比較](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)

## FAQ
- Q: Object.entries vs Object.keys 差在哪?
  - A: entries 返回 `[key, value]`,keys 只返回 `key`;values 只返回 `value`。
- Q: 可以走訪 Map 嗎?
  - A: 可以!`new Map(Object.entries(obj))` 或 `Object.fromEntries(map)`。
- Q: 不可枚舉屬性會被包含嗎?
  - A: 不會,Object.entries 只轉換可枚舉的自有屬性。