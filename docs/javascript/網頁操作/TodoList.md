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

## 目標
1. 一個**輸入框**和一個**按鈕**
2. 按下按鈕後把輸入框的內容塞入清單內，並清空輸入框的內容
3. 清單內的項目有兩個按鈕**更新**和**刪除**
4. 更新按鈕可以用`prompt()`實作，並正確修改內容
5. 刪除按鈕可以正確刪除項目

<video controls="controls" src="../assets/網頁操作/todolist/todolist-demo.mp4"></video>

::: details 看答案

::: code-group

```html [原生js寫法]
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>待辦事項清單</title>
    <style>
      body {
        font-family: Arial, sans-serif;
      }

      ul {
        list-style-type: none;
      }

      li {
        margin: 5px 0;
      }
    </style>
  </head>

  <body>
    <h1>待辦事項清單</h1>
    <input type="text" id="todoInput" placeholder="請輸入待辦事項" />
    <button onclick="addTodo()">新增待辦事項</button>
    <ul id="todoList"></ul>

    <script>
      const todoList = document.getElementById("todoList");
      const todoInput = document.getElementById("todoInput");
      let id = 0;

      function addTodo() {
        const todo = todoInput.value.trim();
        if (todo) {
          todoInput.value = ""; // 清空輸入框
          todoList.innerHTML += `
                 <li data-id="${++id}">
                    <span>${todo}</span>
                    <button onclick="updateTodo(${id})">更新</button>
                    <button onclick="deleteTodo(${id})">刪除</button>
                </li>`;
        }
      }

      function updateTodo(index) {
        const span = document.querySelector(`li[data-id="${index}"] > span`);
        const newTodo = prompt("請輸入新的待辦事項:", span.textContent);
        if (newTodo) {
          span.textContent = newTodo;
        }
      }

      function deleteTodo(index) {
        const li = document.querySelector(`li[data-id="${index}"]`);
        li.remove();
      }
    </script>
  </body>
</html>

```

```jsx [react 寫法]
import { useState,useRef } from 'react'
import PropTypes from 'prop-types'

export default function TodoList() {
  const [datas, setDatas] = useState([
    {
      id: 1,
      content: 'text'
    },
    {
      id: 2,
      content: 'text2'
    }
  ])

  const inp = useRef(null)

  const handleAdd = () => {
    const inpValue = inp.current.value
    setDatas((prev) => {
      return [
        ...prev,
        {
          id: Date.now(),
          content: inpValue
        }
      ]
    })
    inp.current.value = ''
  }

  return (
    <section className="wrap">
      <h2 className="text-xl font-bold">待辦事項</h2>

      <section className="my-2 flex gap-2">
        <input type="text" className="input flex-1" ref={inp} />
        <button className="btn-primary" onClick={handleAdd}>
          新增
        </button>
      </section>

      <ul className="space-y-3 mt-3">
        {datas.map((data) => (
          <Todo key={data.id} data={data} setDatas={setDatas} />
        ))}
      </ul>
    </section>
  )
}

function Todo({ data, setDatas }) {
  const { id, content } = data
  const handleModify = () => {
    const newContent = prompt('請輸入新的內容', content)
    setDatas((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            content: newContent
          }
        }
        return item
      })
    })
  }

  const handleDelete = () => {
    setDatas((prev) => {
      return prev.filter((item) => item.id !== id)
    })
  }

  return (
    <li className="flex items-center justify-between space-x-3 rounded-lg border border-sky-500 p-3">
      <span className="">{content}</span>
      <div className="space-x-2">
        <button className="btn-warning" onClick={handleModify}>
          編輯
        </button>
        <button className="btn-danger" onClick={handleDelete}>
          刪除
        </button>
      </div>
    </li>
  )
}

Todo.propTypes = {
  data: PropTypes.object.isRequired,
  setDatas: PropTypes.func.isRequired
}
```
[教學影片](https://www.youtube.com/watch?v=0CvVez4teYc&feature=youtu.be)
:::
