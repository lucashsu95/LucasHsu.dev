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
      content: https://lucashsu95.github.io/LucasHsu.dev/images/javascript-cover.jpg
---

# Object.assign()

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
