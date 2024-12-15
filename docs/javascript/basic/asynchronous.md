---
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: 非同步,異同步,promise,javascript,async,await
  - - meta
    - name: og:title
      content: 非同步是什麼?能吃嗎?
  - - meta
    - name: og:description
      content: 利用準備早餐的例子，快速了解異步（Asynchronous）與同步（Synchronous）的差別
  - - meta
    - name: og:type
      content: article
  - - meta
    - name: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/javascript/basic/asynchronous
---

# 異同步 - Asynchronous

## 什麼是異步編程？

在 JavaScript 中，異步（Asynchronous）與同步（Synchronous）相對。

同步編程是指代碼按順序執行，而異步編程則允許某些任務在後台進行，主程序可以繼續執行其他代碼。

例如，當你從網路獲取資料時，如果使用同步方式，程式會停下來等資料回來；而使用異步方式，程式可以在等待資料的同時做其他事情。

## 準備早餐的例子

想像一下，你早上起床後決定準備早餐~~不要跟我說你不吃早餐~~。你有幾個任務需要完成：

1. 煮咖啡
2. 烤吐司
3. 煎蛋

### 同步方式

如果你使用同步方式，你會這樣做：

1. 開始煮咖啡，等咖啡煮好（這可能需要幾分鐘）。
2. 然後開始烤吐司，等吐司烤好。
3. 最後煎蛋。

在這種情況下，你必須等每個任務完成後才能開始下一個，這樣會**浪費時間**。

### 異步方式

如果使用異步方式，你可以這樣做：

1. 開始煮咖啡（這是耗時的任務），然後把鍋子放在爐子上。
2. 同時開始烤吐司（也放進烤箱）。
3. 最後開始煎蛋。

在這種情況下，你不需要等咖啡煮好就去烤吐司和煎蛋，所有任務可以同時進行，這樣可以更快地完成早餐。

## Promise

先把基本操作講完，後面再來實作

**Promise** 是一種用於處理異步操作的物件，它代表了一個尚未完成但預計會在將來完成的操作。Promise 有三種狀態：待定（pending）、已解決（fulfilled）、已拒絕（rejected）。

### 範例

```javascript
let myPromise = new Promise((resolve, reject) => {
    let success = true; // 假設這是一個隨機結果(可以是true或是false)
    setTimeout(() => {
        if (success) {
            resolve("成功！"); // 當任務成功時調用 resolve
        } else {
            reject("失敗！"); // 當任務失敗時調用 reject
        }
    }, 2000); // 模擬一個耗時的操作
});

// 使用 .then() 處理結果
myPromise.then(result => {
    console.log(result); // 輸出: 成功！
}).catch(error => {
    console.log(error); // 輸出: 失敗！
});
```

在這個範例中，我們創建了一個 Promise，模擬了一個耗時兩秒的操作。當操作成功時，會調用 `resolve`，並在 `.then()` 中處理結果；如果失敗，則調用 `reject`，並在 `.catch()` 中處理錯誤。

## async/await

**async/await** 是基於 Promise 的語法糖，使得異步代碼看起來更像同步代碼。使用 `async` 關鍵字定義一個函數為異步函數，而 `await` 用來暫停函數的執行直到 Promise 被解決。

### 範例

```javascript
async function fetchData() {
    try {
        let result = await myPromise; // 等待 myPromise 完成
        console.log(result); // 輸出: 成功！
    } catch (error) {
        console.log(error); // 輸出: 失敗！
    }
}

fetchData(); // 調用異步函數
```

在這個範例中，我們定義了一個 `fetchData` 的異步函數。在這裡，我們使用 `await` 來等待 `myPromise` 的結果。如果 Promise 被解決，就會輸出成功的訊息；如果被拒絕，就會捕獲錯誤並輸出。


## 實作 - 準備早餐

前面看不懂嗎?沒關係~~我也不懂~~，在最面前有個早餐的例子我們來實作它

### 同步版本

使用同步版本就是**等一件事做好才做下一件事**，很浪費時間，但我們先來實作這個方法

### 範例一：同步方式準備早餐

在這個範例中，我們將使用同步方式來準備早餐。這意味著每個任務都必須等前一個任務完成後才能開始。

```javascript
function makeCoffee() {
    console.log("開始煮咖啡...");
    // 模擬煮咖啡需要2秒
    const start = Date.now();
    while (Date.now() - start < 2000) {} // 等待2秒
    console.log("咖啡好了！");
}

function makeToast() {
    console.log("開始烤吐司...");
    // 模擬烤吐司需要1.5秒
    const start = Date.now();
    while (Date.now() - start < 1500) {} // 等待1.5秒
    console.log("吐司烤好了！");
}

function fryEgg() {
    console.log("開始煎蛋...");
    // 模擬煎蛋需要1秒
    const start = Date.now();
    while (Date.now() - start < 1000) {} // 等待1秒
    console.log("蛋煎好了！");
}

// 同步執行所有任務
function prepareBreakfastSync() {
    makeCoffee();
    makeToast();
    fryEgg();
    
    console.log("早餐準備完成，可以享用了！");
}

// 調用同步準備早餐的函數
prepareBreakfastSync();
```

#### 同步範例解說

在這個範例中，`makeCoffee`、`makeToast` 和 `fryEgg` 函數都使用了 `while` 迴圈來模擬耗時操作。這意味著在每個任務完成之前，程式會被阻塞，無法執行其他任何操作。最終的輸出會是：

```
開始煮咖啡...
咖啡好了！
開始烤吐司...
吐司烤好了！
開始煎蛋...
蛋煎好了！
早餐準備完成，可以享用了！
```

### 範例二：異步方式準備早餐

在這個範例中，我們將使用異步方式來準備早餐。這樣可以在等待某個任務完成的同時執行其他任務。

::: info 小知識
`setTimeout()`是一個非同步的函數喔。當你使用`setTimeout()`設定一段延遲後執行某個函數時，JavaScript 不會等待這段時間結束，而是會繼續執行後面的程式碼。這使得 `setTimeout()` 能夠在背景中計時，同時不會阻塞主執行緒。
:::

```javascript
function makeCoffee() {
    return new Promise((resolve) => {
        console.log("開始煮咖啡...");
        setTimeout(() => {
            resolve("咖啡好了！"); // 模擬煮咖啡需要2秒
        }, 2000);
    });
}

function makeToast() {
    return new Promise((resolve) => {
        console.log("開始烤吐司...");
        setTimeout(() => {
            resolve("吐司烤好了！"); // 模擬烤吐司需要1.5秒
        }, 1500);
    });
}

function fryEgg() {
    return new Promise((resolve) => {
        console.log("開始煎蛋...");
        setTimeout(() => {
            resolve("蛋煎好了！"); // 模擬煎蛋需要1秒
        }, 1000);
    });
}

// 使用 async/await 函數來準備早餐
async function prepareBreakfastAsync() {
    const coffee = await makeCoffee(); // 等待咖啡做好
    console.log(coffee); // 輸出: 咖啡好了！

    const toast = await makeToast(); // 等待吐司烤好
    console.log(toast); // 輸出: 吐司烤好了！

    const egg = await fryEgg(); // 等待蛋煎好
    console.log(egg); // 輸出: 蛋煎好了！

    console.log("早餐準備完成，可以享用了！");
}

// 調用異步準備早餐的函數
prepareBreakfastAsync();
```

#### 異步範例解說

在這個範例中，`makeCoffee`、`makeToast` 和 `fryEgg` 函數返回 Promise，並使用 `setTimeout` 來模擬耗時操作。在 `prepareBreakfastAsync` 函數中，我們使用 `await` 等待每個任務完成，但因為每個任務都是異步的，所以整體過程不會被阻塞。

#### 最終輸出

當你執行這段異步代碼時，你會看到類似以下的輸出（大約需要 2 秒）：

```
開始煮咖啡...
開始烤吐司...
開始煎蛋...
咖啡好了！
吐司烤好了！
蛋煎好了！
早餐準備完成，可以享用了！
```

透過以上兩個範例，我們可以清楚地看到異步編程的優勢。<br>
在同步方式中，每個任務必須等前一個完成後才能開始，導致整體過程變慢。<br>
而在異步方式中，所有任務可以同時進行，提高了效率，使得整體流程更加流暢。

