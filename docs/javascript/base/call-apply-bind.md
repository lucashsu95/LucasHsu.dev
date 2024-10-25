---
outline: [2,3]
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: Object.call,Object.apply,Object.bind,javascript,js,傳this到函式
  - - meta
    - name: og:title
      content: Object.call(), Object.apply(), Object.bind() - javascript
  - - meta
    - name: og:description
      content: call(), apply() 和 bind() 是 JavaScript 中的三個方法，屬於 Function 原型，允許你以指定的 this 值調用一個函數，並將參數傳遞。這些方法特別適合在需要控制 this 值的情況下。
  - - meta
    - name: og:type
      content: article
---

# **Object.call()、Object.apply()、Object.bind()**

`call()`、`apply()` 和 `bind()` 是 JavaScript 中的三個方法，屬於 `Function` 原型，允許你以指定的 `this` 值調用一個函數，並將參數傳遞。這些方法特別適合在需要控制 `this` 值的情況下。

## call()

`call()` 方法在 JavaScript 中用於調用一個函數，並且允許你傳遞參數列表。它的語法如下：

```javascript
func.call(thisArg, arg1, arg2, ...);
```

### 參數

- **thisArg**: 指定在函數內部使用的 `this` 值。
- **arg1, arg2, ...**: 要傳遞給函數的參數。

### 返回值

`call()` 方法返回函數執行的結果。

### 使用示例

```javascript
const person = {
    firstName: "John",
    lastName: "Doe"
};

function greet(greeting, message) {
    return `${greeting} ${this.firstName}. ${message}`;
}

let result = greet.call(person, 'Hello', 'How are you?');
console.log(result); // 輸出: Hello John. How are you?
```

在這個例子中，`greet` 函數被調用，`this` 被設置為 `person` 對象，並且參數逐個傳遞。

## apply()

`apply()` 方法在 JavaScript 中用於調用一個函數，並且允許你傳遞參數數組。它的語法如下：

```javascript
func.apply(thisArg, [argsArray]);
```

### 參數

- **thisArg**: 指定在函數內部使用的 `this` 值。
- **argsArray**: 一個可選的數組，包含要傳遞給函數的參數。

### 返回值

`apply()` 方法返回函數執行的結果。

### 使用示例

```javascript
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

```javascript
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

```javascript
const numbers = [1, 2, 3];
let max = Math.max.apply(null, numbers);
console.log(max); // 輸出: 3
```

## bind()

`.bind()` 方法在 JavaScript 中用於創建一個新函數，當這個新函數被調用時，它的 `this` 關鍵字會被設置為提供給 `.bind()` 的第一個參數。你還可以傳遞額外的參數，這些參數會作為新函數的預設參數。

### 語法

```javascript
const boundFunction = originalFunction.bind(thisArg[, arg1[, arg2[, ...]]])
```

### 參數

- **thisArg**：你希望 `this` 指向的對象。
- **arg1, arg2, ...**：可選參數，在執行綁定函數時會作為預設參數傳入。

### 使用示例

```javascript
const obj = {
  name: 'Alice',
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
};

const greet = obj.greet.bind(obj);
greet(); // Hello, my name is Alice
```

在這個例子中，我們將 `obj.greet` 方法綁定到 `obj`，這樣即使我們在不同的上下文中調用 `greet`，`this` 仍然指向 `obj`。

### 使用 `.bind()` 傳遞參數

```javascript
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);
console.log(double(5)); // 10
```

在這個例子中，我們創建了一個新函數 `double`，它將 `multiply` 函數的第一個參數預設為 `2`。

### 綁定 `this` 的值

```javascript
const person = {
    name: 'John',
    greet: function() {
        console.log('Hello, ' + this.name);
    }
};

const greet = person.greet;
greet(); // 這裡 `this` 是 undefined，輸出 "Hello, undefined"

const boundGreet = person.greet.bind(person);
boundGreet(); // 綁定 `this` 為 person 對象，輸出 "Hello, John"
```

### 部分應用函數

你也可以使用 `.bind()` 提前傳入部分參數，這種技術稱為 "partial application"。

```javascript
function multiply(a, b) {
    return a * b;
}

const double = multiply.bind(null, 2);  // `a` 永遠是 2
console.log(double(5)); // 輸出 10
```

### 常見用途

1. **確保 `this` 在回調中不會丟失：**
當你把方法作為回調函數傳遞時，可能會導致 `this` 變成 `undefined` 或其他意想不到的值。這時可以使用 `.bind()` 來確保 `this` 的指向正確。
2. **部分應用：**
使用 `.bind()` 可以提前固定某些參數，從而創建出參數固定的新函數，方便後續的調用。