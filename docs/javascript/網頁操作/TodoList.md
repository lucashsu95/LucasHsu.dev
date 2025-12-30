---
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: javascript,todolist
  - - meta
    - property: og:title
      content: 用Javascript做一個TodoList吧
  - - meta
    - property: og:description
      content: TodoList實作教學，以Javascript為例
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/javascript-cover.jpg
---

# TodoList 待辦事項清單

> 📝 TL;DR
- 先做 MVP：新增/更新/刪除 + 內存狀態；再加完成狀態、篩選、永續化。
- React/Vue：使用單一 state 作為真相來源；新增/編輯/刪除都要不可變更新。
- 原生 JS：事件委派 + LocalStorage；避免空白與重複項。

## 前置知識
- 陣列操作：`map`、`filter`、`findIndex`
- DOM 事件：`submit`、`click`、事件委派
- LocalStorage：`getItem` / `setItem`

## 基礎目標 (MVP)
1. 一個輸入框 + 按鈕新增
2. 可編輯、刪除
3. 新增後清空輸入框

<video controls="controls" src="../assets/網頁操作/todolist/todolist-demo.mp4"></video>

## React 版範例 (含防呆)

```jsx
import { useState, useRef, useEffect } from 'react'

export default function TodoList() {
  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem('todos') || '[]')
  })
  const [filter, setFilter] = useState('all')
  const inp = useRef(null)

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const add = () => {
    const text = inp.current.value.trim()
    if (!text) return
    if (todos.some((t) => t.text === text)) return // 避免重複
    setTodos((prev) => [...prev, { id: crypto.randomUUID(), text, done: false }])
    inp.current.value = ''
  }

  const update = (id) => {
    const next = prompt('請輸入新的內容', todos.find((t) => t.id === id)?.text)
    if (next == null || !next.trim()) return
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text: next.trim() } : t)))
  }

  const toggle = (id) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  const remove = (id) => setTodos((prev) => prev.filter((t) => t.id !== id))

  const filters = {
    all: () => true,
    active: (t) => !t.done,
    done: (t) => t.done
  }

  const view = todos.filter(filters[filter])

  return (
    <section>
      <header className="flex gap-2">
        <input ref={inp} className="input" onKeyDown={(e) => e.key === 'Enter' && add()} />
        <button onClick={add}>新增</button>
      </header>

      <nav className="space-x-2 my-2">
        {['all', 'active', 'done'].map((key) => (
          <button key={key} onClick={() => setFilter(key)} disabled={filter === key}>
            {key}
          </button>
        ))}
      </nav>

      <ul className="space-y-2">
        {view.map((t) => (
          <li key={t.id} className="flex justify-between items-center" role="listitem">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
              <span>{t.text}</span>
            </label>
            <div className="space-x-2">
              <button onClick={() => update(t.id)}>編輯</button>
              <button onClick={() => remove(t.id)}>刪除</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
```

## 原生 JS 版 (含 LocalStorage)

```html
<form id="todo-form">
  <input id="todo-input" aria-label="新增待辦" />
  <button type="submit">新增</button>
</form>
<nav>
  <button data-filter="all">全部</button>
  <button data-filter="active">未完成</button>
  <button data-filter="done">已完成</button>
</nav>
<ul id="todo-list"></ul>

<script>
const $ = (s) => document.querySelector(s)
let state = JSON.parse(localStorage.getItem('todos') || '[]')
let filter = 'all'
const filters = { all: () => true, active: (i) => !i.done, done: (i) => i.done }

const persist = () => localStorage.setItem('todos', JSON.stringify(state))

function render() {
  $('#todo-list').innerHTML = state
    .filter(filters[filter])
    .map(
      (i) => `
      <li data-id="${i.id}">
        <label>
          <input type="checkbox" ${i.done ? 'checked' : ''} />
          <span>${i.text}</span>
        </label>
        <div>
          <button data-action="edit">編輯</button>
          <button data-action="delete">刪除</button>
        </div>
      </li>`
    )
    .join('')
}

$('#todo-form').addEventListener('submit', (e) => {
  e.preventDefault()
  const text = $('#todo-input').value.trim()
  if (!text) return
  if (state.some((i) => i.text === text)) return
  state = [...state, { id: crypto.randomUUID(), text, done: false }]
  $('#todo-input').value = ''
  persist()
  render()
})

$('#todo-list').addEventListener('click', (e) => {
  const li = e.target.closest('li')
  if (!li) return
  const id = li.dataset.id
  const action = e.target.dataset.action
  if (action === 'delete') state = state.filter((i) => i.id !== id)
  if (action === 'edit') {
    const target = state.find((i) => i.id === id)
    const next = prompt('更新內容', target.text)
    if (next && next.trim()) target.text = next.trim()
  }
  if (e.target.type === 'checkbox') {
    const target = state.find((i) => i.id === id)
    target.done = e.target.checked
  }
  persist()
  render()
})

document.querySelectorAll('button[data-filter]').forEach((btn) =>
  btn.addEventListener('click', () => {
    filter = btn.dataset.filter
    render()
  })
)

render()
</script>
```

## 進階功能建議
- 狀態管理：所有動作只改一份 state，再渲染。
- 鍵盤體驗：Enter 新增、Esc 取消編輯。
- UX 細節：空白阻擋、重複阻擋、loading/錯誤提示（若串 API）。
- 測試點：新增/刪除/切換完成後，LocalStorage 內容應一致。

## 實戰練習

### 練習 1：空白防呆（簡單）⭐
> 新增時若內容為空白或只有空格，阻擋並提示。

:::details 💡 參考答案
```javascript
if (!text.trim()) {
  alert('請輸入內容')
  return
}
```
:::

### 練習 2：狀態快取（簡單）⭐
> 將待辦清單存到 LocalStorage，並在載入時讀取回來。

:::details 💡 參考答案
```javascript
useEffect(() => {
  const saved = JSON.parse(localStorage.getItem('todos') || '[]')
  setTodos(saved)
}, [])

useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos))
}, [todos])
```
:::

### 練習 3：完成篩選（中等）⭐⭐
> 加入「全部 / 未完成 / 已完成」切換，並保留新增、編輯、刪除功能。

:::details 💡 參考答案與提示
**提示：** 用 `filterKey` + 篩選函式映射。
```javascript
const filters = { all: () => true, active: (i) => !i.done, done: (i) => i.done }
const view = todos.filter(filters[filterKey])
```
:::

## 延伸閱讀
- MDN: [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- TodoMVC: 觀摩多框架的待辦實作
- React 官方：State & Events（理解單向資料流）

## FAQ
- Q: 勾選 checkbox 後沒有更新畫面？
  - A: 確認有更新 state 並觸發渲染；原生需手動呼叫 render。
- Q: prompt 取消會變空字串？
  - A: 先檢查 `if (next == null) return;`，避免寫入空值。
- Q: key 衝突怎麼辦？
  - A: 用 `crypto.randomUUID()` 或時間戳+亂數；不要用索引。
