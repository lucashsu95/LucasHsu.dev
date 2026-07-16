---
outline: "deep"

head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: javascript,DOM,getElementById,querySelector,修改內容,建立元素,樣式修改
  - - meta
    - property: og:title
      content: JavaScript 新手上路 Day9 - DOM 操作
  - - meta
    - property: og:description
      content: 了解如何在 JavaScript 中 操作 DOM，包含 getElementById/querySelector/修改內容/建立元素/樣式修改
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/javascript-cover.webp
---

<img src="../assets/Days/javascript-title-img.webp" alt="javascript-title-img" class="title-img" />

# Javascript Day9 DOM 操作

## 什麼是 DOM？

DOM（Document Object Model）是瀏覽器將 HTML 文件轉換成的**物件樹狀結構**。透過 JavaScript，我們可以動態地讀取和修改網頁內容、結構和樣式。

```html
<!DOCTYPE html>
<html>
<body>
    <h1 id="title">Hello</h1>
    <p class="content">World</p>
</body>
</html>
```

瀏覽器會將上面的 HTML 轉換成類似這樣的結構：

```
document
  └── html
      ├── head
      └── body
          ├── h1#title → "Hello"
          └── p.content → "World"
```

## 選取元素

### getElementById — 透過 ID 選取

```javascript
let title = document.getElementById('title')
console.log(title)  // <h1 id="title">Hello</h1>
```

### getElementsByClassName — 透過 class 選取（回傳集合）

```javascript
let items = document.getElementsByClassName('item')
console.log(items)  // HTMLCollection [div.item, div.item, ...]
```

### getElementsByTagName — 透過標籤名稱選取

```javascript
let paragraphs = document.getElementsByTagName('p')
console.log(paragraphs)  // HTMLCollection [p, p, p, ...]
```

### querySelector — CSS 選擇器（第一個符合的）

```javascript
// 選取第一個 .item 元素
let firstItem = document.querySelector('.item')

// 選取第一個 ul 裡的 li
let firstLi = document.querySelector('ul li')

// 選取 id 為 title 的元素
let title = document.querySelector('#title')
```

### querySelectorAll — CSS 選擇器（所有符合的）

```javascript
// 選取所有 .item 元素
let items = document.querySelectorAll('.item')
console.log(items)  // NodeList [div.item, div.item, ...]

// 可以用 forEach 遍歷
items.forEach(item => {
    console.log(item.textContent)
})
```

### 選取方法比較

| 方法 | 回傳值 | 選取方式 |
| --- | --- | --- |
| `getElementById` | 單一元素 | ID |
| `getElementsByClassName` | 集合 | class |
| `getElementsByTagName` | 集合 | 標籤名 |
| `querySelector` | 單一元素 | CSS 選擇器 |
| `querySelectorAll` | NodeList | CSS 選擇器 |

:::tip 建議
現代開發中，最常用的是 `querySelector` 和 `querySelectorAll`，因為它們支援所有 CSS 選擇器語法。
:::

## 修改內容

### textContent — 文字內容

```javascript
let title = document.querySelector('#title')

// 讀取
console.log(title.textContent)  // 'Hello'

// 修改
title.textContent = '新的標題'
```

### innerHTML — HTML 內容

```javascript
let container = document.querySelector('.container')

// 讀取
console.log(container.innerHTML)

// 修改（可以包含 HTML 標籤）
container.innerHTML = '<h2>新標題</h2><p>新段落</p>'
```

### innerText — 文字內容（不含隱藏元素）

```javascript
let el = document.querySelector('#title')

// 與 textContent 類似，但 innerText 會考量 CSS 樣式
console.log(el.innerText)
```

:::warning ⚠️ 注意
使用 `innerHTML` 要小心**XSS 攻擊**。不要將使用者輸入的內容直接用 `innerHTML` 插入。
:::

## 修改屬性

### setAttribute / getAttribute

```javascript
let link = document.querySelector('a')

// 設定屬性
link.setAttribute('href', 'https://example.com')
link.setAttribute('target', '_blank')

// 讀取屬性
console.log(link.getAttribute('href'))
```

### 直接存取屬性

```javascript
let img = document.querySelector('img')

// 直接存取
img.src = 'new-image.jpg'
img.alt = '新圖片'

// 讀取
console.log(img.src)
```

### class 操作

```javascript
let el = document.querySelector('#myElement')

// 新增 class
el.classList.add('active')

// 移除 class
el.classList.remove('active')

// 切換 class
el.classList.toggle('active')

// 是否包含某 class
console.log(el.classList.contains('active'))
```

### style 操作

```javascript
let box = document.querySelector('.box')

// 直接修改行內樣式
box.style.backgroundColor = 'red'
box.style.color = 'white'
box.style.padding = '20px'
box.style.borderRadius = '8px'
```

:::tip 建議
較複雜的樣式修改，建議使用 `classList.toggle()` 搭配 CSS class，而不是直接修改 `style`。
:::

## 建立與插入元素

### createElement — 建立新元素

```javascript
// 建立一個新的 <li> 元素
let newLi = document.createElement('li')
newLi.textContent = '新項目'
```

### appendChild — 插入到尾端

```javascript
let ul = document.querySelector('ul')
let newLi = document.createElement('li')
newLi.textContent = '新項目'

ul.appendChild(newLi)
```

### insertBefore — 插入到指定位置前面

```javascript
let ul = document.querySelector('ul')
let newLi = document.createElement('li')
newLi.textContent = '新項目'

let secondLi = ul.children[1]
ul.insertBefore(newLi, secondLi)
```

### insertAdjacentHTML — 插入 HTML 字串

```javascript
let container = document.querySelector('.container')

// beforebegin: 元素前面
// afterbegin: 元素內部最前面
// beforeend: 元素內部最後面
// afterend: 元素後面

container.insertAdjacentHTML('beforeend', '<p>新段落</p>')
```

## 移除元素

```javascript
let el = document.querySelector('#removeMe')

// 方法一：透過父元素移除
el.parentNode.removeChild(el)

// 方法二：直接移除（較新，推薦）
el.remove()
```

## 修改 CSS 樣式

### 透過 class 切換

```css
/* CSS */
.box {
    background-color: gray;
    color: white;
}
.box.active {
    background-color: blue;
}
```

```javascript
// JavaScript
let box = document.querySelector('.box')
box.classList.add('active')  // 變成藍色
box.classList.toggle('active')  // 切換
```

### 透過 style 屬性

```javascript
let box = document.querySelector('.box')
box.style.backgroundColor = 'blue'
box.style.color = 'white'
box.style.padding = '20px'
```

## 範例：動態產生清單

```html
<!DOCTYPE html>
<html>
<body>
    <input type="text" id="input" placeholder="輸入項目">
    <button id="addBtn">新增</button>
    <ul id="list"></ul>

    <script>
        let input = document.querySelector('#input')
        let addBtn = document.querySelector('#addBtn')
        let list = document.querySelector('#list')

        addBtn.addEventListener('click', () => {
            let text = input.value.trim()
            if (text === '') return

            // 建立新的 li
            let li = document.createElement('li')
            li.textContent = text

            // 新增刪除按鈕
            let deleteBtn = document.createElement('button')
            deleteBtn.textContent = '刪除'
            deleteBtn.addEventListener('click', () => {
                li.remove()
            })
            li.appendChild(deleteBtn)

            // 插入到 list
            list.appendChild(li)

            // 清空輸入框
            input.value = ''
        })
    </script>
</body>
</html>
```

## 牛刀小試

1. 寫一個程式，點擊按鈕後改變背景顏色（隨機顏色）

2. 寫一個程式，讓元素在點擊後隱藏/顯示（切換 display）

3. 寫一個程式，動態產生一個 3x3 的格子（table），每個格子顯示其座標（如 "1,1"、"1,2"）

4. 寫一個程式，點擊按鈕後在清單尾端新增一個項目，雙擊項目可以刪除

:::details 看答案

**Q1**
```html
<button id="colorBtn">改變顏色</button>
<script>
    let colorBtn = document.querySelector('#colorBtn')
    colorBtn.addEventListener('click', () => {
        let r = Math.floor(Math.random() * 256)
        let g = Math.floor(Math.random() * 256)
        let b = Math.floor(Math.random() * 256)
        document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
    })
</script>
```

**Q2**
```html
<div id="box" style="width:100px;height:100px;background:red;">點我</div>
<script>
    let box = document.querySelector('#box')
    box.addEventListener('click', () => {
        box.style.display = box.style.display === 'none' ? 'block' : 'none'
    })
</script>
```

**Q3**
```html
<table id="grid"></table>
<script>
    let table = document.querySelector('#grid')
    for (let i = 1; i <= 3; i++) {
        let tr = document.createElement('tr')
        for (let j = 1; j <= 3; j++) {
            let td = document.createElement('td')
            td.textContent = `${i},${j}`
            td.style.border = '1px solid black'
            td.style.padding = '10px'
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
</script>
```

**Q4**
```html
<input type="text" id="input" placeholder="輸入項目">
<button id="addBtn">新增</button>
<ul id="list"></ul>
<script>
    let input = document.querySelector('#input')
    let addBtn = document.querySelector('#addBtn')
    let list = document.querySelector('#list')

    addBtn.addEventListener('click', () => {
        let text = input.value.trim()
        if (text === '') return

        let li = document.createElement('li')
        li.textContent = text
        li.addEventListener('dblclick', () => li.remove())
        list.appendChild(li)
        input.value = ''
    })
</script>
```
:::
