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
      content: https://lucashsu95.github.io/LucasHsu.dev/images/javascript-cover.webp
---

# Node.js fs

> 📝 TL;DR
- `fs.readFile()`: 讀取檔案內容。
- `fs.writeFile()`: 建立/覆寫檔案。
- `fs.appendFile()`: 追加內容到檔案末尾。
- `fs.unlink()`: 刪除檔案。
- Promises API: 用 `fs.promises` 搭配 async/await。

## 前置知識
- Node.js 基礎與模組系統
- 非同步程式設計 (callback / Promise / async-await)
- 檔案路徑與編碼 (utf8、buffer)

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

## 實際應用場景

### 1. 日誌寫入系統
```javascript
const fs = require('fs').promises
const path = require('path')

async function writeLog(message) {
  const logFile = path.join(__dirname, 'app.log')
  const timestamp = new Date().toISOString()
  await fs.appendFile(logFile, `[${timestamp}] ${message}\n`)
}

writeLog('Server started') // 追加日誌
```

### 2. 批次處理檔案
```javascript
const fs = require('fs').promises

async function processFiles(dirPath) {
  const files = await fs.readdir(dirPath)
  for (const file of files) {
    if (file.endsWith('.txt')) {
      const content = await fs.readFile(`${dirPath}/${file}`, 'utf8')
      console.log(`${file}: ${content.length} 字元`)
    }
  }
}

processFiles('./data')
```

### 3. 檔案備份
```javascript
const fs = require('fs').promises

async function backup(source, dest) {
  const content = await fs.readFile(source)
  await fs.writeFile(dest, content)
  console.log(`備份完成: ${source} → ${dest}`)
}

backup('config.json', 'config.backup.json')
```

## 實戰練習

### 練習 1:讀取並顯示檔案(簡單)⭐
> 讀取 `package.json` 並輸出其中的 `name` 和 `version`。

:::details 💡 參考答案
```javascript
const fs = require('fs').promises

async function readPackage() {
  const data = await fs.readFile('package.json', 'utf8')
  const pkg = JSON.parse(data)
  console.log(`${pkg.name} v${pkg.version}`)
}

readPackage()
```
:::

### 練習 2:檔案存在檢查(簡單)⭐
> 寫出 `fileExists(path)` 函數,檢查檔案是否存在。

:::details 💡 參考答案
```javascript
const fs = require('fs').promises

async function fileExists(path) {
  try {
    await fs.access(path)
    return true
  } catch {
    return false
  }
}

console.log(await fileExists('test.txt'))
```
:::

### 練習 3:複製目錄結構(中等)⭐⭐
> 實作 `copyDir(src, dest)`,遞迴複製整個目錄。

:::details 💡 參考答案與提示
```javascript
const fs = require('fs').promises
const path = require('path')

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true })
  const entries = await fs.readdir(src, { withFileTypes: true })
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath)
    } else {
      await fs.copyFile(srcPath, destPath)
    }
  }
}

copyDir('./source', './backup')
```
**提示**: 用 `readdir` 的 `withFileTypes` 選項判斷是檔案還是目錄。
:::

## 延伸閱讀
- [Node.js fs 官方文件](https://nodejs.org/api/fs.html)
- [fs.promises vs callback 差異](https://nodejs.dev/learn/the-nodejs-fs-module)
- [path 模組操作檔案路徑](https://nodejs.org/api/path.html)

## FAQ
- Q: readFile 和 createReadStream 差在哪?
  - A: readFile 一次讀完整檔案到記憶體;createReadStream 串流讀取,適合大檔案。
- Q: 如何處理檔案不存在的錯誤?
  - A: 用 try/catch 捕捉錯誤,或在 callback 檢查 `err.code === 'ENOENT'`。
- Q: writeFile 會覆蓋原檔案嗎?
  - A: 是,會完全覆寫;若要追加用 `appendFile` 或 `fs.writeFile(path, data, {flag: 'a'})`。
