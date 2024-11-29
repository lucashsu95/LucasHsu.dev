---
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: export, import, JavaScript, 模塊, ES6 模塊, JS 模塊, 模塊化
  - - meta
    - name: og:title
      content: JavaScript 中的 export 和 import
  - - meta
    - name: og:description
      content: 了解如何在 JavaScript 中使用 export 和 import 來模塊化你的代碼，並通過簡單的範例展示如何在 HTML 中引入 JavaScript 模塊。
  - - meta
    - name: og:type
      content: article
  - - meta
    - name: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/javascript/export-import.html
---

# 關於 export 和 import

檔案
- index.html
- main.js
- import_example.js

一個簡單的範例，記得在 HTML 檔裡引入 JS 檔的時候加上 `type="module"`。

## index.html

```html
<!DOCTYPE html>
<html>
<head>
    <title>JavaScript 模塊示例</title>
</head>
<body>
    <h1>這是一個簡單的 JavaScript 模塊示例</h1>

    <!-- 引入 main.js 並設置 type="module" -->
    <script type="module" src="main.js"></script>
</body>
</html>

```

## main.js

```javascript
// main.js

// 導入 import_example.js 中的函數
import { sayHello } from './import_example.js';

// 使用導入的函數
sayHello("John");

```

## import_example.js

```javascript
// import_example.js

// 定義一個函數
export function sayHello(name) {
    console.log(`Hello, ${name}!`);
  }
```