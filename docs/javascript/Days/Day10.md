---
outline: "deep"

head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: javascript,事件,Event,addEventListener,click,input,submit,事件物件
  - - meta
    - property: og:title
      content: JavaScript 新手上路 Day10 - 事件處理 Event Handling
  - - meta
    - property: og:description
      content: 了解如何在 JavaScript 中 處理事件，包含 addEventListener/常見事件/事件物件/表單處理
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/javascript-cover.webp
---

<img src="../assets/Days/javascript-title-img.webp" alt="javascript-title-img" class="title-img" />

# Javascript Day10 事件處理 Event Handling

## 什麼是事件？

事件（Event）是網頁上發生的**使用者互動**或**系統行為**，例如點擊按鈕、輸入文字、滾動頁面等。JavaScript 可以「監聽」這些事件，並在事件發生時執行特定的程式碼。

## addEventListener — 監聽事件

### 基本語法

```javascript
element.addEventListener('事件名稱', 回呼函數)
```

### 點擊事件

```javascript
let btn = document.querySelector('#myButton')

btn.addEventListener('click', () => {
    console.log('按鈕被點擊了！')
})
```

### 移除事件監聽

```javascript
function handleClick() {
    console.log('被點擊了！')
}

btn.addEventListener('click', handleClick)

// 移除時必須傳入同一個函數引用
btn.removeEventListener('click', handleClick)
```

## 常見事件類型

### 滑鼠事件

| 事件 | 說明 |
| --- | --- |
| `click` | 點擊元素 |
| `dblclick` | 雙擊元素 |
| `mousedown` | 按下滑鼠按鍵 |
| `mouseup` | 放開滑鼠按鍵 |
| `mouseenter` | 滑鼠進入元素 |
| `mouseleave` | 滑鼠離開元素 |
| `mousemove` | 滑鼠在元素上移動 |

```javascript
let box = document.querySelector('.box')

box.addEventListener('mouseenter', () => {
    box.style.backgroundColor = 'yellow'
})

box.addEventListener('mouseleave', () => {
    box.style.backgroundColor = 'white'
})
```

### 鍵盤事件

| 事件 | 說明 |
| --- | --- |
| `keydown` | 按下按鍵 |
| `keyup` | 放開按鍵 |
| `keypress` | 按下按鍵（已廢棄，不建議使用） |

```javascript
document.addEventListener('keydown', (e) => {
    console.log(`按下了 ${e.key} 鍵`)
})

// 只監聽特定按鍵
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        console.log('按下了 Enter')
    }
})
```

### 表單事件

| 事件 | 說明 |
| --- | --- |
| `submit` | 表單送出 |
| `input` | 輸入框內容改變（即時） |
| `change` | 輸入框內容改變（失去焦點時） |
| `focus` | 元素獲得焦點 |
| `blur` | 元素失去焦點 |

```javascript
let input = document.querySelector('#name')

input.addEventListener('input', (e) => {
    console.log(`目前輸入: ${e.target.value}`)
})
```

### 視窗事件

| 事件 | 說明 |
| --- | --- |
| `load` | 頁面完全載入 |
| `DOMContentLoaded` | DOM 建構完成（不圖片等資源） |
| `resize` | 視窗大小改變 |
| `scroll` | 頁面滾動 |

```javascript
// 等 DOM 載入完成再執行
document.addEventListener('DOMContentLoaded', () => {
    // 在這裡操作 DOM
})
```

## 事件物件（Event Object）

回呼函數會收到一個事件物件，包含事件的詳細資訊。

```javascript
btn.addEventListener('click', (e) => {
    console.log(e.type)        // 'click'
    console.log(e.target)      // 被點擊的元素
    console.log(e.currentTarget) // 監聽事件的元素
    console.log(e.timeStamp)   // 事件發生的時間
})
```

### 鍵盤事件的屬性

```javascript
document.addEventListener('keydown', (e) => {
    console.log(e.key)         // 按鍵名稱，如 'Enter', 'a'
    console.log(e.code)        // 按鍵代碼，如 'Enter', 'KeyA'
    console.log(e.altKey)      // Alt 是否被按下
    console.log(e.ctrlKey)     // Ctrl 是否被按下
    console.log(e.shiftKey)    // Shift 是否被按下
})
```

### 滑鼠事件的屬性

```javascript
box.addEventListener('click', (e) => {
    console.log(e.clientX)     // 相對視窗的 X 座標
    console.log(e.clientY)     // 相對視窗的 Y 座標
    console.log(e.pageX)       // 相對文件的 X 座標
    console.log(e.pageY)       // 相對文件的 Y 座標
})
```

## 事件冒泡與捕捉

事件的傳播順序分為三個階段：

1. **捕捉階段（Capture）**：從 `document` 向下傳到目標元素
2. **目標階段（Target）**：到達目標元素
3. **冒泡階段（Bubble）**：從目標元素向上传到 `document`

```javascript
// 預設是在冒泡階段觸發
parent.addEventListener('click', () => {
    console.log('parent 被點擊')
})

child.addEventListener('click', () => {
    console.log('child 被點擊')
})
// 點擊 child 時，會先印出 'child 被點擊'，再印出 'parent 被點擊'
```

### stopPropagation — 阻止冒泡

```javascript
child.addEventListener('click', (e) => {
    e.stopPropagation()  // 阻止事件繼續冒泡
    console.log('只有 child 被點擊')
})
```

### preventDefault — 阻止預設行為

```javascript
let form = document.querySelector('form')

form.addEventListener('submit', (e) => {
    e.preventDefault()  // 阻止表單預設的送出行為
    console.log('表單被送出，但沒有重新載入頁面')
})
```

## 事件委派（Event Delegation）

利用冒泡機制，將事件監聽器綁定在父元素上，而不是每個子元素。

```html
<ul id="list">
    <li>項目 1</li>
    <li>項目 2</li>
    <li>項目 3</li>
</ul>
```

```javascript
// ❌ 不好的做法：為每個 li 加事件
let items = document.querySelectorAll('li')
items.forEach(item => {
    item.addEventListener('click', () => {
        console.log(' clicked')
    })
})

// ✅ 好的做法：在父元素 ul 上監聽
let list = document.querySelector('#list')
list.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        console.log(`${e.target.textContent} 被點擊了`)
    }
})
```

:::tip 為什麼用事件委派？
1. **效能更好**：只需要綁定一個事件，而不是 N 個
2. **動態元素也能用**：新增的子元素也會自動被監聽
3. **記憶體佔用更少**
:::

## 表單處理

### 取得表單值

```html
<form id="myForm">
    <input type="text" id="name" placeholder="姓名">
    <input type="email" id="email" placeholder="信箱">
    <button type="submit">送出</button>
</form>
```

```javascript
let form = document.querySelector('#myForm')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    let name = document.querySelector('#name').value
    let email = document.querySelector('#email').value

    console.log(`姓名: ${name}, 信箱: ${email}`)
})
```

### 表單驗證

```javascript
form.addEventListener('submit', (e) => {
    e.preventDefault()

    let name = document.querySelector('#name').value.trim()
    let email = document.querySelector('#email').value.trim()

    if (name === '') {
        alert('請輸入姓名')
        return
    }

    if (!email.includes('@')) {
        alert('請輸入有效的信箱')
        return
    }

    // 驗證通過，處理表單
    console.log('表單送出成功！')
})
```

## 自訂事件

```javascript
// 建立自訂事件
let myEvent = new CustomEvent('myCustomEvent', {
    detail: {
        message: '自訂事件的資料'
    }
})

// 監聽自訂事件
document.addEventListener('myCustomEvent', (e) => {
    console.log(e.detail.message)  // '自訂事件的資料'
})

// 觸發自訂事件
document.dispatchEvent(myEvent)
```

## 實戰範例：Tab 切換

```html
<div class="tabs">
    <button class="tab active" data-tab="tab1">Tab 1</button>
    <button class="tab" data-tab="tab2">Tab 2</button>
    <button class="tab" data-tab="tab3">Tab 3</button>
</div>
<div class="tab-content active" id="tab1">內容 1</div>
<div class="tab-content" id="tab2">內容 2</div>
<div class="tab-content" id="tab3">內容 3</div>
```

```javascript
let tabs = document.querySelectorAll('.tab')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // 移除所有 active
        tabs.forEach(t => t.classList.remove('active'))
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'))

        // 加上 active
        tab.classList.add('active')
        let target = document.querySelector(`#${tab.dataset.tab}`)
        target.classList.add('active')
    })
})
```

## 牛刀小試

1. 寫一個程式，當使用者在輸入框中按下 Enter 時，將輸入的文字新增到清單中

2. 寫一個程式，實作一個計數器：有「+1」、「-1」和「歸零」三個按鈕，顯示目前的計數

3. 寫一個程式，實作圖片輪播：有「上一張」和「下一張」按鈕，切換顯示不同的圖片

4. 寫一個程式，實作表單驗證：使用者必須填寫姓名（不能為空）和密碼（至少 6 個字元），驗證通過才能送出

:::details 看答案

**Q1**
```html
<input type="text" id="input" placeholder="輸入項目">
<button id="addBtn">新增</button>
<ul id="list"></ul>
<script>
    let input = document.querySelector('#input')
    let addBtn = document.querySelector('#addBtn')
    let list = document.querySelector('#list')

    function addItem() {
        let text = input.value.trim()
        if (text === '') return

        let li = document.createElement('li')
        li.textContent = text
        list.appendChild(li)
        input.value = ''
    }

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') addItem()
    })

    addBtn.addEventListener('click', addItem)
</script>
```

**Q2**
```html
<button id="decrease">-1</button>
<span id="count">0</span>
<button id="increase">+1</button>
<button id="reset">歸零</button>
<script>
    let count = 0
    let countEl = document.querySelector('#count')

    document.querySelector('#increase').addEventListener('click', () => {
        count++
        countEl.textContent = count
    })

    document.querySelector('#decrease').addEventListener('click', () => {
        count--
        countEl.textContent = count
    })

    document.querySelector('#reset').addEventListener('click', () => {
        count = 0
        countEl.textContent = count
    })
</script>
```

**Q3**
```html
<button id="prev">上一張</button>
<img id="slide" src="img1.jpg" style="width:300px;">
<button id="next">下一張</button>
<script>
    let images = ['img1.jpg', 'img2.jpg', 'img3.jpg']
    let current = 0
    let slide = document.querySelector('#slide')

    document.querySelector('#prev').addEventListener('click', () => {
        current = (current - 1 + images.length) % images.length
        slide.src = images[current]
    })

    document.querySelector('#next').addEventListener('click', () => {
        current = (current + 1) % images.length
        slide.src = images[current]
    })
</script>
```

**Q4**
```html
<form id="form">
    <input type="text" id="name" placeholder="姓名">
    <span id="nameError" style="color:red;"></span><br>
    <input type="password" id="password" placeholder="密碼（至少6個字元）">
    <span id="passwordError" style="color:red;"></span><br>
    <button type="submit">送出</button>
</form>
<script>
    let form = document.querySelector('#form')
    let nameInput = document.querySelector('#name')
    let passwordInput = document.querySelector('#password')
    let nameError = document.querySelector('#nameError')
    let passwordError = document.querySelector('#passwordError')

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let valid = true

        // 驗證姓名
        if (nameInput.value.trim() === '') {
            nameError.textContent = '請輸入姓名'
            valid = false
        } else {
            nameError.textContent = ''
        }

        // 驗證密碼
        if (passwordInput.value.length < 6) {
            passwordError.textContent = '密碼至少需要 6 個字元'
            valid = false
        } else {
            passwordError.textContent = ''
        }

        if (valid) {
            alert('表單送出成功！')
        }
    })
</script>
```
:::
