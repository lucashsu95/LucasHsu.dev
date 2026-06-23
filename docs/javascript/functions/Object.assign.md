---
outline: [2,3]
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: Object.assign,javascript,js,複製Object
  - - meta
    - property: og:title
      content: Object.assign() - javascript
  - - meta
    - property: og:description
      content: Object.assign() 是 JavaScript 中的一個靜態方法，用於將一個或多個源對象的可枚舉屬性複製到目標對象。這個方法返回修改後的目標對象。
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/javascript-cover.webp
---

# Object.assign()
> 📝 TL;DR
- 合併物件:`Object.assign(target, ...sources)` 複製屬性到 target。
- 淺拷貝:嵌套物件僅複製參照,不是深層複製。
- 常用於:設定預設值 (config merge)、React props 覆蓋、狀態更新。

## 前置知識
- 物件屬性存取與走訪 (keys/values/entries)
- 參照型別 vs 原始型別差異
`Object.assign()` 是 JavaScript 中的一個靜態方法，用於將一個或多個源對象的可枚舉屬性複製到目標對象。這個方法返回修改後的目標對象。

## 語法

```jsx
Object.assign(target, ...sources);
```

## 參數

- **target**: 目標對象，屬性將被複製到這個對象。
- **sources**: 一個或多個源對象，從這些對象中複製屬性。

## 返回值

返回目標對象。

## 使用示例

### 合併對象

以下示例展示了如何使用 `Object.assign()` 合併多個對象：

```jsx
const obj1 = { a: 1 };
const obj2 = { b: 2 };
const obj3 = { c: 3 };

// 合併 obj1, obj2, obj3 到一個新對象
const mergedObj = Object.assign({}, obj1, obj2, obj3);
console.log(mergedObj); // 輸出: { a: 1, b: 2, c: 3 }
```

在這個例子中，使用空對象 `{}` 作為目標對象，這樣可以避免修改任何源對象。

這裡，`copy` 是 `original` 的一個淺拷貝，兩者的屬性相同。

## 注意事項

1. **淺拷貝**: `Object.assign()` 只會進行淺拷貝，對於嵌套對象，僅複製引用。如果源對象的某個屬性是對象，則只會複製該對象的引用。
2. **可枚舉屬性**: 只有可枚舉的自有屬性會被複製，原型鏈上的屬性不會被複製。
3. **處理 null 或 undefined**: 如果源對象是 `null` 或 `undefined`，則會被忽略，不會拋出錯誤。

`Object.assign()` 是一個非常有用的方法，常用於對象合併、克隆和屬性添加等操作[1][2][4]。
## 淺拷貝 vs 深拷貝

| 特性     | 淺拷貝 (Object.assign) | 深拷貝 (structuredClone / lodash) |
| -------- | ---------------------- | --------------------------------- |
| 嵌套物件 | 複製參照               | 遞迴複製所有層                    |
| 修改影響 | 會影響原物件           | 不會影響原物件                    |
| 效能     | 快                     | 慢                                |
| 適用場景 | 简单物件、配置合併     | 复杂嵌套结构、状态克隆            |

### 淺拷貝陷阱示例
```javascript
const original = { a: 1, nested: { b: 2 } }
const shallow = Object.assign({}, original)

shallow.nested.b = 999
console.log(original.nested.b) // 999 —— 原物件被改了!
```

### 深拷貝解法
```javascript
// 方法1: structuredClone (ES2022)
const deep1 = structuredClone(original)

// 方法2: JSON (limited)
const deep2 = JSON.parse(JSON.stringify(original))

// 方法3: lodash
const deep3 = _.cloneDeep(original)
```

## 實戰練習

### 練習 1:預設值合併(簡單)⭐
> 寫出 `setDefaults(userConfig, defaults)` 函數,合併預設配置。

:::details 💡 參考答案
```javascript
const setDefaults = (userConfig, defaults) => Object.assign({}, defaults, userConfig)

const config = setDefaults({ theme: 'dark' }, { theme: 'light', lang: 'en' })
console.log(config) // { theme: 'dark', lang: 'en' }
```
:::

### 練習 2:狀態更新(簡單)⭐
> 使用 Object.assign 實現 immutable update(不修改原 state)。

:::details 💡 參考答案
```javascript
const state = { count: 0, user: 'Alice' }
const newState = Object.assign({}, state, { count: state.count + 1 })

console.log(state.count)    // 0 —— 原狀態未被修改
console.log(newState.count) // 1
```
:::

### 練習 3:淺拷貝陷阱修復(中等)⭐⭐
> 寫出 `safeClone(obj)` 函數,使用 structuredClone 避免嵌套物件問題。

:::details 💡 參考答案與提示
```javascript
const safeClone = (obj) => structuredClone(obj)

const original = { a: 1, nested: { b: 2 } }
const cloned = safeClone(original)
cloned.nested.b = 999

console.log(original.nested.b) // 2 —— 不受影響
```
:::

## 延伸閱讀
- [MDN: Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
- [structuredClone 深拷貝](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone)
- [lodash cloneDeep](https://lodash.com/docs/#cloneDeep)

## FAQ
- Q: Object.assign vs spread (...) 差在哪?
  - A: 功能相同,但 spread 語法更簡潔;`{ ...a, ...b }` 等同 `Object.assign({}, a, b)`。
- Q: 如何判斷是否需要深拷貝?
  - A: 如果物件有嵌套结构 & 需要独立副本,就用深拷貝。
- Q: JSON.parse(JSON.stringify()) 有何限制?
  - A: 不支持 undefined、function、Symbol、Date、RegExp;会丢失这些类型。