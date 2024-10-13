---
outline: [2,3]
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: Object.apply,javascript,js,傳this到函式
  - - meta
    - name: og:title
      content: Object.apply() - javascript
  - - meta
    - name: og:description
      content: apply() 是 JavaScript 中的一個方法，屬於 Function 原型，允許你以指定的 this 值調用一個函數，並將參數作為數組傳遞。這個方法特別適合在需要使用數組作為參數列表的情況下。
  - - meta
    - name: og:type
      content: article
---

# **Object.apply()**

`apply()` 是 JavaScript 中的一個方法，屬於 `Function` 原型，允許你以指定的 `this` 值調用一個函數，並將參數作為數組傳遞。這個方法特別適合在需要使用數組作為參數列表的情況下。

## 語法

```jsx
func.apply(thisArg, [argsArray]);
```

## 參數

- **thisArg**: 指定在函數內部使用的 `this` 值。
- **argsArray**: 一個可選的數組，包含要傳遞給函數的參數。

### 返回值

`apply()` 方法返回函數執行的結果。

## 使用示例

### 基本示例

以下是一個使用 `apply()` 的基本示例：

```jsx
const person = {
    firstName: "John",
    lastName: "Doe"
};

function greet(greeting, message) {
    return `${greeting} ${this.firstName}. ${message}`;
}

let result = greet.apply(person, ['Hello', 'How are you?']);
console.log(result); // 輸出: Hello John. How are you?
```

在這個例子中，`greet` 函數被調用，`this` 被設置為 `person` 對象，並且參數以數組的形式傳遞。

### 函數借用

`apply()` 方法允許一個對象借用另一個對象的方法，而無需重複代碼。以下是函數借用的示例：

```jsx
const computer = {
    name: 'MacBook',
    turnOn() {
        return `The ${this.name} is On`;
    }
};

const server = {
    name: 'Dell PowerEdge T30'
};

// 使用 apply() 借用 computer 的 turnOn 方法
let result = computer.turnOn.apply(server);
console.log(result); // 輸出: The Dell PowerEdge T30 is On
```

### 使用內建函數

`apply()` 也可以用於內建函數，例如 `Math.max()`，來找到數組中的最大值：

```jsx
const numbers = [1, 2, 3];
let max = Math.max.apply(null, numbers);
console.log(max); // 輸出: 3
```

在這個例子中，`Math.max()` 方法被應用於一個數組，返回該數組中的最大值。

## 注意事項

- `apply()` 方法與 `call()` 方法相似，主要區別在於 `apply()` 接受一個數組作為參數，而 `call()` 需要逐個參數傳遞。
- 在使用 `apply()` 時，若第二個參數不是數組，將會拋出 `TypeError`。

`apply()` 方法是一個強大的工具，可以提高代碼的重用性，並使函數調用更靈活。
