---
outline: "deep"
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: JavaScript,slice,split,splice
  - - meta
    - property: og:title
      content: 搞懂slice,split,splice｜JavaScript
  - - meta
    - property: og:description
      content: slice()、splice()、split()在處理Array、String時會很常用到，本單元就會一一介紹如何使用
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/javascript-cover.jpg
---

# slice,split,splice分不清

> 📝 TL;DR
- **slice**: 擷取部分(不改原始)、字串/陣列通用。
- **split**: 字串切割成陣列。
- **splice**: 陣列修改(插入/刪除/替換,會改原陣列)。

## 前置知識
- 陣列與字串基礎操作
- 可變 vs 不可變(mutable vs immutable)
- 陣列方法回傳值概念

## 快速對照表

| 方法       | 作用對象  | 是否改變原始 | 用途       | 回傳值       |
| ---------- | --------- | ------------ | ---------- | ------------ |
| **slice**  | 字串/陣列 | ❌ 否         | 擷取部分   | 新字串/陣列  |
| **split**  | 字串      | ❌ 否         | 切割成陣列 | 新陣列       |
| **splice** | 陣列      | ✅ 是         | 增刪改元素 | 被刪除的元素 |

## 字串操作

1. `substr(from, ?length)`：

    選取字串

    ```jsx
    Lstr = '1234567890'
    Lstr.substr(3, 5) // '45678'
    Lstr.substr(5, 3) // '678'
    ```

2. `substring(start, ?end)`：

    選取字串

    ```jsx
    Lstr = '1234567890'
    Lstr.substring(3, 5) // '45'
    Lstr.substring(5, 3) // '45'
    ```

3. `slice(?start, ?end)`：

    選取字串

    ```jsx
    Lstr = '1234567890'
    Lstr.slice(3, 5) // '45'
    ```

## 陣列操作

1. `split()`：

    切割字串變成陣列

    ```jsx
    Lstr = 'a,b,c'
    Lary = Lstr.split(',') // ['a', 'b', 'c']
    ```

2. `slice(?start, ?end)`：

    選取陣列的部分元素

    ```jsx
    Lary = ['a', 'b', 'c']
    Lary.slice(2, 3) // ['c']
    ```

3. `splice(start, ?deleteCount, ...items)`：

    修改陣列內容

    ```jsx
    Lary = ['a', 'b', 'c']
    Lary.splice(2, 1) // ['c']
    Lary.splice(1, 1, 'D') // ['b']
    console.log(Lary) // ['a', 'D']
    ```

## 實戰練習

### 練習 1:字串分割(簡單)⭐
> 將 `"apple,banana,orange"` 分割成陣列並取前兩項。

:::details 💡 參考答案
```javascript
const fruits = "apple,banana,orange"
const arr = fruits.split(',').slice(0, 2)
console.log(arr) // ['apple', 'banana']
```
:::

### 練習 2:陣列插入(簡單)⭐
> 在陣列 `[1, 2, 5]` 的索引 2 插入 3, 4。

:::details 💡 參考答案
```javascript
const nums = [1, 2, 5]
nums.splice(2, 0, 3, 4)
console.log(nums) // [1, 2, 3, 4, 5]
```
:::

### 練習 3:陣列刪除與替換(中等)⭐⭐
> 刪除陣列 `['a', 'b', 'c', 'd']` 的第 2-3 項,並插入 'X', 'Y'。

:::details 💡 參考答案與提示
```javascript
const letters = ['a', 'b', 'c', 'd']
const removed = letters.splice(1, 2, 'X', 'Y')
console.log(letters) // ['a', 'X', 'Y', 'd']
console.log(removed) // ['b', 'c']
```
**提示**: splice(start, deleteCount, ...items) — start=1, deleteCount=2
:::

## 延伸閱讀
- [MDN: Array.prototype.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
- [MDN: String.prototype.split](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
- [MDN: Array.prototype.splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

## FAQ
- Q: slice 負數索引怎麼算?
  - A: 從尾部算起,`arr.slice(-2)` 取最後兩項;`arr.slice(1, -1)` 取第2到倒數第2項。
- Q: splice 刪除後回傳什麼?
  - A: 回傳被刪除的元素陣列;如果沒刪除則回傳空陣列 `[]`。
- Q: split 如何處理多個分隔符?
  - A: 用正則表達式,如 `str.split(/[,;]/)` 分割逗號或分號。