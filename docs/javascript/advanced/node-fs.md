---
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: node.js,fs,檔案,javascript,js
  - - meta
    - property: og:title
      content: Node.js fs 使用教學 | 檔案操作
  - - meta
    - property: og:description
      content: node.js fs 教學，對檔案的操作，讀取、寫入、更新、刪除檔案操作，還有程式碼範例。
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/javascript-cover.png
---

# Node.js fs


## 讀取檔案

要讀取檔案，可以使用 `fs.readFile()` 方法。這個方法會非同步地讀取檔案內容並將其作為緩衝區返回。以下是一個讀取 HTML 檔案的範例：

```javascript
const fs = require('fs');

fs.readFile('demofile1.html', (err, data) => {
  if (err) throw err;
  console.log(data.toString());
});
```

## 寫入檔案

你可以使用 `fs.appendFile()`、`fs.open()` 和 `fs.writeFile()` 等方法來建立和寫入檔案。例如，要建立一個新檔案並寫入內容：

```javascript
const fs = require('fs');

fs.writeFile('mynewfile.txt', 'Hello content!', (err) => {
  if (err) throw err;
  console.log('Saved!');
});
```

## 更新檔案

要更新檔案，可以使用 `fs.appendFile()` 將內容添加到檔案末尾，或使用 `fs.writeFile()` 替換檔案內容：

```javascript
const fs = require('fs');

fs.appendFile('mynewfile.txt', ' This is my text.', (err) => {
  if (err) throw err;
  console.log('Updated!');
});
```

## 刪除檔案
```javascript
const fs = require('fs');

fs.unlink('mynewfile.txt', (err) => {
if (err) throw err;
console.log('File deleted!');
});
```

## 使用Promises
```javascript
const fs = require('fs').promises;

async function readFile(filePath) {
try {
const data = await fs.readFile(filePath);
console.log(data.toString());
} catch (error) {
console.error(`Got an error trying to read the file: ${error.message}`);
}
}

readFile('greetings.txt');
```

這段程式碼會刪除名為 `mynewfile.txt` 的檔案。如果刪除過程中發生錯誤，會拋出異常並顯示錯誤訊息。

## 範例

取一個`in.txt`裡的文字內容，要把所有question裡的值都從文字檔裡抓出來，最後輸出到`out.txt`

- [不知道什麼是regex正規表達式?](./regex)

### main.js
```javascript
const fs = require("fs");
fs.readFile("in.txt", "utf8", (err, data) => {
  const regex = /question:\s*"([^"]+)"/gm;
  let match;
  while ((match = regex.exec(data))) {
    fs.appendFileSync("out.txt", match[1] + "\n");
    console.log(match[1]);
  }
});
```

### out.txt
```txt
{ question: "hello", answer: "h" },{ question: "abc", answer: "a" },
{ question: "today", answer: "t" }
```
