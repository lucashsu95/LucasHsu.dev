---
outline: "deep"

head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: javascript,物件,Object,屬性,方法,Object.keys,Object.values,Object.entries
  - - meta
    - property: og:title
      content: JavaScript 新手上路 Day6 - 物件 Object
  - - meta
    - property: og:description
      content: 了解如何在 JavaScript 中 使用物件 Object，包含建立、屬性存取、方法、遍歷
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/javascript-cover.webp
---

<img src="../assets/Days/javascript-title-img.webp" alt="javascript-title-img" class="title-img" />

# Javascript Day6 物件 Object

## 什麼是物件？

物件（Object）是用來儲存**鍵值對（key-value pair）**的資料結構。想像一個表單，每個欄位（key）都有一個對應的值（value）。

```javascript
// 建立一個物件
let person = {
    name: 'Lucas',
    age: 20,
    isStudent: true
}
```

## 建立物件

```javascript
// 字面量建立（最常用）
let obj1 = { name: 'Alice', age: 25 }

// 建構函式建立
let obj2 = new Object()
obj2.name = 'Bob'

// Object.create
let obj3 = Object.create(null)
```

## 存取屬性

### 點記法（Dot notation）

```javascript
let person = { name: 'Lucas', age: 20 }

console.log(person.name)  // 'Lucas'
console.log(person.age)   // 20
```

### 方括號記法（Bracket notation）

```javascript
let person = { name: 'Lucas', age: 20 }

let key = 'name'
console.log(person[key])  // 'Lucas'

// 當 key 是變數或有特殊字元時，只能用方括號
let person2 = { 'first-name': 'Lucas' }
console.log(person2['first-name'])  // 'Lucas'
```

## 新增與修改屬性

```javascript
let car = { brand: 'Toyota' }

// 新增屬性
car.color = 'red'
car.year = 2024
console.log(car)  // { brand: 'Toyota', color: 'red', year: 2024 }

// 修改屬性
car.brand = 'Honda'
console.log(car.brand)  // 'Honda'

// 刪除屬性
delete car.year
console.log(car)  // { brand: 'Honda', color: 'red' }
```

## 物件方法

方法就是屬性的值是**函數**。

```javascript
let calculator = {
    add: function(a, b) {
        return a + b
    },
    subtract(a, b) {  // 簡寫語法
        return a - b
    }
}

console.log(calculator.add(3, 5))       // 8
console.log(calculator.subtract(10, 4)) // 6
```

### this 關鍵字

在物件方法中，`this` 指向**該物件本身**。

```javascript
let person = {
    name: 'Lucas',
    greet() {
        console.log(`你好，我是 ${this.name}`)
    }
}

person.greet()  // '你好，我是 Lucas'
```

:::warning ⚠️ 注意
箭頭函數**沒有**自己的 `this`，所以物件方法中**不要**用箭頭函數，否则 `this` 會指向錯誤的對象。
:::

## 遍歷物件

### for...in 迴圈

```javascript
let person = { name: 'Lucas', age: 20, city: 'Taipei' }

for (let key in person) {
    console.log(`${key}: ${person[key]}`)
}
// name: Lucas
// age: 20
// city: Taipei
```

### Object.keys() — 取得所有鍵

```javascript
let person = { name: 'Lucas', age: 20, city: 'Taipei' }

let keys = Object.keys(person)
console.log(keys)  // ['name', 'age', 'city']
```

### Object.values() — 取得所有值

```javascript
let person = { name: 'Lucas', age: 20, city: 'Taipei' }

let values = Object.values(person)
console.log(values)  // ['Lucas', 20, 'Taipei']
```

### Object.entries() — 取得所有鍵值對

```javascript
let person = { name: 'Lucas', age: 20, city: 'Taipei' }

let entries = Object.entries(person)
console.log(entries)
// [['name', 'Lucas'], ['age', 20], ['city', 'Taipei']]

// 可以搭配 for...of 使用
for (let [key, value] of entries) {
    console.log(`${key}: ${value}`)
}
```

## 巢狀物件

物件裡面可以放物件。

```javascript
let student = {
    name: 'Lucas',
    scores: {
        math: 90,
        english: 85,
        science: 92
    }
}

console.log(student.scores.math)  // 90
console.log(student['scores']['english'])  // 85
```

## 物件與陣列的搭配

```javascript
let students = [
    { name: 'Alice', score: 85 },
    { name: 'Bob', score: 92 },
    { name: 'Charlie', score: 78 }
]

// 找出高分學生
let highScore = students.filter(s => s.score >= 90)
console.log(highScore)  // [{ name: 'Bob', score: 92 }]

// 取出所有名字
let names = students.map(s => s.name)
console.log(names)  // ['Alice', 'Bob', 'Charlie']
```

## 解構賦值（Destructuring）

快速從物件中取出屬性。

```javascript
let person = { name: 'Lucas', age: 20, city: 'Taipei' }

// 傳統寫法
let name1 = person.name
let age1 = person.age

// 解構賦值
let { name, age, city } = person
console.log(name)  // 'Lucas'
console.log(age)   // 20

// 重新命名
let { name: userName, age: userAge } = person
console.log(userName)  // 'Lucas'
```

## 展開運算子（Spread）

```javascript
let obj1 = { a: 1, b: 2 }
let obj2 = { b: 3, c: 4 }

// 合併物件（後面的會覆蓋前面的）
let merged = { ...obj1, ...obj2 }
console.log(merged)  // { a: 1, b: 3, c: 4 }

// 複製物件
let copy = { ...obj1 }
```

## 牛刀小試

1. 建立一個物件 `car`，包含 `brand`、`model`、`year` 三個屬性，並寫一個方法 `info()` 回傳字串 `"Toyota Corolla 2024"`

2. 建立一個物件 `score`，包含三個成績，寫一個方法 `average()` 計算平均分數

3. 建立一個陣列，裡面包含 3 個學生物件（每個有 `name` 和 `score`），用 `map` 取出所有名字，用 `filter` 找出及格的學生（score >= 60）

4. 用解構賦值從 `{ name: 'Alice', age: 25, city: 'Taipei' }` 中取出 `name` 和 `city`

:::details 看答案

**Q1**
```javascript
let car = {
    brand: 'Toyota',
    model: 'Corolla',
    year: 2024,
    info() {
        return `${this.brand} ${this.model} ${this.year}`
    }
}
console.log(car.info())  // 'Toyota Corolla 2024'
```

**Q2**
```javascript
let score = {
    math: 90,
    english: 85,
    science: 92,
    average() {
        return (this.math + this.english + this.science) / 3
    }
}
console.log(score.average())  // 89
```

**Q3**
```javascript
let students = [
    { name: 'Alice', score: 85 },
    { name: 'Bob', score: 45 },
    { name: 'Charlie', score: 72 }
]

let names = students.map(s => s.name)
console.log(names)  // ['Alice', 'Bob', 'Charlie']

let passed = students.filter(s => s.score >= 60)
console.log(passed)  // [{ name: 'Alice', score: 85 }, { name: 'Charlie', score: 72 }]
```

**Q4**
```javascript
let { name, city } = { name: 'Alice', age: 25, city: 'Taipei' }
console.log(name)  // 'Alice'
console.log(city)  // 'Taipei'
```
:::
