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
      content: https://lucashsu95.github.io/LucasHsu.dev/images/javascript-cover.webp
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

## 互動體驗：購物車

<ShoppingCart />


## 實做

:::code-group

```jsx [React]
import { useState, useRef } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const inp = useRef(null);

  const add = () => {
    const text = inp.current.value.trim();
    if (!text) return;
    setTodos((prev) => [...prev, { id: Date.now(), text, done: false }]);
    inp.current.value = "";
  };

  const toggle = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  };

  const remove = (id) => setTodos((prev) => prev.filter((t) => t.id !== id));

  return (
    <section>
      <div className="flex gap-2">
        <input ref={inp} onKeyDown={(e) => e.key === "Enter" && add()} />
        <button onClick={add}>新增</button>
      </div>

      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <label>
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => toggle(t.id)}
              />
              <span style={{ textDecoration: t.done ? "line-through" : "none" }}>
                {t.text}
              </span>
            </label>
            <button onClick={() => remove(t.id)}>刪除</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

```html [原生 JS]
<div>
  <input id="todo-input" />
  <button id="add-btn">新增</button>
</div>
<ul id="todo-list"></ul>

<script>
  const $ = (s) => document.querySelector(s);
  let todos = [];

  function render() {
    $("#todo-list").innerHTML = todos
      .map(
        (t, i) => `
      <li>
        <label>
          <input type="checkbox" data-i="${i}" class="toggle" ${t.done ? "checked" : ""} />
          <span style="${t.done ? "text-decoration:line-through" : ""}">${t.text}</span>
        </label>
        <button data-i="${i}" class="del">刪除</button>
      </li>`,
      )
      .join("");
  }

  function addTodo() {
    const text = $("#todo-input").value.trim();
    if (!text) return;
    todos.push({ text, done: false });
    $("#todo-input").value = "";
    render();
  }

  $("#add-btn").addEventListener("click", addTodo);
  $("#todo-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTodo();
  });

  $("#todo-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
      todos.splice(Number(e.target.dataset.i), 1);
      render();
    }
  });

  $("#todo-list").addEventListener("change", (e) => {
    if (e.target.classList.contains("toggle")) {
      todos[Number(e.target.dataset.i)].done = e.target.checked;
      render();
    }
  });

  render();
</script>
```

:::

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
  alert("請輸入內容");
  return;
}
```

:::

### 練習 2：狀態快取（簡單）⭐

> 將待辦清單存到 LocalStorage，並在載入時讀取回來。

:::details 💡 參考答案

```javascript
useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("todos") || "[]");
  setTodos(saved);
}, []);

useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);
```

:::

### 練習 3：完成篩選（中等）⭐⭐

> 加入「全部 / 未完成 / 已完成」切換，並保留新增、編輯、刪除功能。

:::details 💡 參考答案與提示
**提示：** 用 `filterKey` + 篩選函式映射。

```javascript
const filters = {
  all: () => true,
  active: (i) => !i.done,
  done: (i) => i.done,
};
const view = todos.filter(filters[filterKey]);
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
