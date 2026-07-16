---
outline: "deep"

head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: javascript,字串,String,slice,split,join,includes,replace,template literals
  - - meta
    - property: og:title
      content: JavaScript 新手上路 Day8 - 字串方法 String Methods
  - - meta
    - property: og:description
      content: 了解如何在 JavaScript 中 使用字串方法，包含 slice/split/join/includes/replace/template literals
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/javascript-cover.webp
---

<img src="../assets/Days/javascript-title-img.webp" alt="javascript-title-img" class="title-img" />

# Javascript Day8 字串方法 String Methods

## 字串基礎

字串（String）是用來表示**文字資料**的型態。在 JavaScript 中，字串可以用單引號、雙引號或反引號建立。

```javascript
let str1 = 'Hello'
let str2 = "World"
let str3 = `Hello World`  // 反引號（Template Literals）
```

:::warning ⚠️ 注意
字串是**不可變的（immutable）**。所有字串方法都會回傳**新字串**，不會改變原始字串。
:::

## 取得字元

### charAt() — 取得指定位置的字元

```javascript
let str = 'Hello'

console.log(str.charAt(0))  // 'H'
console.log(str.charAt(4))  // 'o'
```

### 方括號記法

```javascript
let str = 'Hello'

console.log(str[0])  // 'H'
console.log(str[4])  // 'o'
```

## 搜尋字串

### indexOf() — 找到字串的位置

```javascript
let str = 'Hello, World!'

console.log(str.indexOf('World'))   // 7
console.log(str.indexOf('JavaScript'))  // -1（找不到）
```

### includes() — 是否包含某字串

```javascript
let str = 'Hello, World!'

console.log(str.includes('World'))      // true
console.log(str.includes('JavaScript')) // false
```

### startsWith() / endsWith()

```javascript
let str = 'Hello, World!'

console.log(str.startsWith('Hello'))  // true
console.log(str.endsWith('!'))        // true
```

## 截取字串

### slice() — 截取子字串

```javascript
let str = 'Hello, World!'

// slice(start, end) — 從 start 到 end（不包含 end）
console.log(str.slice(0, 5))   // 'Hello'
console.log(str.slice(7))      // 'World!'
console.log(str.slice(-6))     // 'orld!'（負數從尾端算）
```

### substring()

```javascript
let str = 'Hello, World!'

// 與 slice 類似，但不支援負數
console.log(str.substring(0, 5))  // 'Hello'
```

:::tip slice vs substring
`slice` 支援負數索引，`substring` 不支援。通常使用 `slice` 就夠了。
:::

## 轉換大小寫

```javascript
let str = 'Hello, World!'

console.log(str.toUpperCase())  // 'HELLO, WORLD!'
console.log(str.toLowerCase())  // 'hello, world!'
```

## 移除空白

### trim() — 移除前後空白

```javascript
let str = '   Hello, World!   '

console.log(str.trim())       // 'Hello, World!'
console.log(str.trimStart())  // 'Hello, World!   '
console.log(str.trimEnd())    // '   Hello, World!'
```

## 替換字串

### replace() — 替換第一個符合的

```javascript
let str = 'Hello, World! Hello, JavaScript!'

console.log(str.replace('Hello', 'Hi'))
// 'Hi, World! Hello, JavaScript!'
```

### replaceAll() — 替換所有符合的

```javascript
let str = 'Hello, World! Hello, JavaScript!'

console.log(str.replaceAll('Hello', 'Hi'))
// 'Hi, World! Hi, JavaScript!'
```

### 正規表達式替換

```javascript
let str = 'Hello, World! Hello, JavaScript!'

// 加上 g flag 替換所有
console.log(str.replace(/Hello/g, 'Hi'))
// 'Hi, World! Hi, JavaScript!'
```

## 分割與合併

### split() — 字串轉陣列

```javascript
let str = 'apple,banana,cherry'

let fruits = str.split(',')
console.log(fruits)  // ['apple', 'banana', 'cherry']
```

```javascript
let str = 'Hello World'

let words = str.split(' ')
console.log(words)  // ['Hello', 'World']
```

### join() — 陣列轉字串（陣列方法）

```javascript
let fruits = ['apple', 'banana', 'cherry']

let str = fruits.join(', ')
console.log(str)  // 'apple, banana, cherry'
```

## 重複與填充

### repeat() — 重複字串

```javascript
let str = 'Ha'

console.log(str.repeat(3))  // 'HaHaHa'
```

### padStart() / padEnd() — 填充字串

```javascript
let str = '5'

console.log(str.padStart(3, '0'))  // '005'
console.log(str.padEnd(3, '0'))    // '500'
```

## Template Literals（模板字面量）

反引號 `` ` `` 提供更強大的字串功能。

### 變數插入

```javascript
let name = 'Lucas'
let age = 20

// 傳統寫法
let str1 = '我叫 ' + name + '，今年 ' + age + ' 歲'

// Template Literals
let str2 = `我叫 ${name}，今年 ${age} 歲`

console.log(str2)  // '我叫 Lucas，今年 20 歲'
```

### 表達式

```javascript
let a = 5
let b = 3

console.log(`${a} + ${b} = ${a + b}`)  // '5 + 3 = 8'
```

### 多行字串

```javascript
// 傳統寫法
let str1 = '第一行\n' +
           '第二行\n' +
           '第三行'

// Template Literals
let str2 = `第一行
第二行
第三行`
```

## 字串與陣列的轉換

```javascript
// 字串 → 陣列
let str = 'hello'
let arr = str.split('')
console.log(arr)  // ['h', 'e', 'l', 'l', 'o']

// 陣列 → 字串
let arr = ['h', 'e', 'l', 'l', 'o']
let str = arr.join('')
console.log(str)  // 'hello'
```

## 常用方法速查表

| 方法 | 說明 | 範例 |
| --- | --- | --- |
| `charAt(n)` | 取得第 n 個字元 | `'Hello'.charAt(1)` → `'e'` |
| `indexOf(str)` | 找到字串位置 | `'Hello'.indexOf('ll')` → `2` |
| `includes(str)` | 是否包含 | `'Hello'.includes('ell')` → `true` |
| `slice(start, end)` | 截取子字串 | `'Hello'.slice(1, 3)` → `'el'` |
| `toUpperCase()` | 轉大寫 | `'Hello'.toUpperCase()` → `'HELLO'` |
| `toLowerCase()` | 轉小寫 | `'Hello'.toLowerCase()` → `'hello'` |
| `trim()` | 移除空白 | `' Hi '.trim()` → `'Hi'` |
| `replace(a, b)` | 替換字串 | `'Hello'.replace('H', 'J')` → `'Jello'` |
| `split(sep)` | 分割成陣列 | `'a,b'.split(',')` → `['a', 'b']` |
| `repeat(n)` | 重複 n 次 | `'Ha'.repeat(2)` → `'HaHa'` |

## 牛刀小試

1. 寫一個函數 `countChar(str, char)`，計算某個字元在字串中出現的次數

2. 寫一個函數 `reverseString(str)`，反轉字串（例如 `'hello'` → `'olleh'`）

3. 寫一個函數 `isPalindrome(str)`，判斷字串是否為回文（正反讀一樣，忽略大小寫）

4. 寫一個函數 `truncate(str, maxLength)`，如果字串超過 maxLength，就在結尾加上 `'...'` 截斷

5. 使用 Template Literals 寫一個函數 `greeting(name, time)`，根據時間回傳問候語（早上/下午/晚上）

:::details 看答案

**Q1**
```javascript
function countChar(str, char) {
    let count = 0
    for (let c of str) {
        if (c === char) count++
    }
    return count
}

console.log(countChar('hello', 'l'))  // 2
```

**Q2**
```javascript
function reverseString(str) {
    return str.split('').reverse().join('')
}

console.log(reverseString('hello'))  // 'olleh'
```

**Q3**
```javascript
function isPalindrome(str) {
    let lower = str.toLowerCase()
    return lower === reverseString(lower)
}

function reverseString(str) {
    return str.split('').reverse().join('')
}

console.log(isPalindrome('Racecar'))  // true
console.log(isPalindrome('hello'))    // false
```

**Q4**
```javascript
function truncate(str, maxLength) {
    if (str.length <= maxLength) return str
    return str.slice(0, maxLength - 3) + '...'
}

console.log(truncate('Hello, World!', 10))  // 'Hello, ...'
console.log(truncate('Hi', 10))             // 'Hi'
```

**Q5**
```javascript
function greeting(name, time) {
    let hour = time.getHours()
    if (hour < 12) {
        return `早安，${name}！`
    } else if (hour < 18) {
        return `午安，${name}！`
    } else {
        return `晚安，${name}！`
    }
}

// 測試
let now = new Date()
console.log(greeting('Lucas', now))
```
:::
