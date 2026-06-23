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
    - property: og:title
      content: Object.hasOwn() - javascript
  - - meta
    - property: og:description
      content: Object.hasOwn() 是 JavaScript 中的一個靜態方法，用於檢查指定對象是否擁有某個屬性作為其自有屬性。這個方法的引入旨在取代 Object.prototype.hasOwnProperty() 方法，並提供更好的兼容性和使用便利性。
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/javascript-cover.webp
---

# Object.hasOwn()
> 📝 TL;DR
- 檢查自有屬性:`Object.hasOwn(obj, prop)` 比 hasOwnProperty 更安全。
- 優勢:支援 `Object.create(null)` 的物件,不受原型污染影響。
- 常用於:安全屬性檢查、配置驗證、避免繼承屬性。

## 前置知識
- 物件屬性存取與原型鏈
- `in` vs `hasOwnProperty` 差異
- Object.create(null) 的用途
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
## 實戰練習

### 練習 1:安全屬性檢查(簡單)⭐
> 寫出 `hasKey(obj, key)` 函數,使用 Object.hasOwn 安全檢查屬性。

:::details 💡 參考答案
```javascript
const hasKey = (obj, key) => Object.hasOwn(obj, key)

const user = { name: 'Alice', age: 25 }
console.log(hasKey(user, 'name'))     // true
console.log(hasKey(user, 'toString')) // false (繼承的不算)
```
:::

### 練習 2:過濾繼承屬性(簡單)⭐
> 遍歷物件只輸出自有屬性,不包含原型鏈上的屬性。

:::details 💡 參考答案
```javascript
const person = { name: 'Bob' }
const child = Object.create(person)
child.age = 10

for (const key in child) {
  if (Object.hasOwn(child, key)) {
    console.log(key, child[key]) // 只輸出: age 10
  }
}
```
:::

### 練習 3:安全配置合併(中等)⭐⭐
> 實作 `safeDefaults(userConfig, defaults)`,只合併 defaults 中確實存在的鍵。

:::details 💡 參考答案與提示
```javascript
const safeDefaults = (userConfig, defaults) => {
  const result = { ...defaults }
  for (const key in userConfig) {
    if (Object.hasOwn(defaults, key)) {
      result[key] = userConfig[key]
    }
  }
  return result
}

const defaults = { theme: 'light', lang: 'en' }
const user = { theme: 'dark', fontSize: 16 }
console.log(safeDefaults(user, defaults)) 
// { theme: 'dark', lang: 'en' } — fontSize 被忽略
```
:::

## 延伸閱讀
- [MDN: Object.hasOwn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn)
- [ECMAScript 2022 新特性](https://2ality.com/2021/06/object-hasown.html)
- [in vs hasOwnProperty vs hasOwn](https://javascript.info/prototype-inheritance)

## FAQ
- Q: Object.hasOwn vs hasOwnProperty 差在哪?
  - A: hasOwn 是靜態方法,支援 `Object.create(null)` 的物件;hasOwnProperty 是實例方法,可能被覆寫或不存在。
- Q: 什麼時候用 `in` vs `hasOwn`?
  - A: `in` 檢查所有屬性(含繼承),`hasOwn` 只檢查自有屬性;看需求選擇。
- Q: 為何要避免繼承屬性?
  - A: 防止原型污染攻擊、確保只處理物件本身的資料、避免意外存取 Object.prototype 上的方法。