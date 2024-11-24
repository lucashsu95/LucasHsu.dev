---
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: javascript,todolist
  - - meta
    - name: og:title
      content: 用Javascript做一個TodoList吧
  - - meta
    - name: og:description
      content: TodoList實作教學，以Javascript為例
  - - meta
    - name: og:type
      content: article
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
```html
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
[教學影片](https://www.youtube.com/watch?v=0CvVez4teYc&feature=youtu.be)
:::
