---
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: fetch(),fetch,javascript
  - - meta
    - name: og:title
      content: 使用 fetch() 進行非同步資料獲取的基礎教學
  - - meta
    - name: og:description
      content: 利用非同步函式fetch()，獲取網路資料
  - - meta
    - name: og:type
      content: article
  - - meta
    - name: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/javascript/basic/fetch
---

### 什麼是 fetch()？

想像你在一家餐廳點餐。當你告訴服務員你想要的食物時，你的請求就像是用 `fetch()` 向一個網路伺服器發送請求。`fetch()` 是一個 JavaScript 函數，它幫助我們從網路上獲取資料，就像你從餐廳獲得食物一樣。

### 如何使用 fetch()

使用 `fetch()` 很簡單。你只需要告訴它你想要去的網址（URL），然後它會幫你去那裡獲取資料。這裡有兩個範例，幫助你理解如何使用 `fetch()` 來打 API（應用程式介面）。

### 範例一：獲取魔法咒語

這個範例將從一個網站獲取魔法咒語的資料，並把它們顯示在網頁上的表格中。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>魔法咒語</title>
</head>
<body>
    <table border="1">
        <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Description</td>
        </tr>
    </table>

    <script>
        fetch("https://hp-api.onrender.com/api/spells") // 使用 fetch() 獲取資料
            .then((res) => res.json()) // 將響應轉換為 JSON 格式
            .then((data) => {
                data.forEach((spell) => {
                    let table = document.querySelector("table");
                    let row = table.insertRow();
                    let cell1 = row.insertCell(0);
                    let cell2 = row.insertCell(1);
                    let cell3 = row.insertCell(2);
                    cell1.innerHTML = spell.id; // 填入 ID
                    cell2.innerHTML = spell.name; // 填入名稱
                    cell3.innerHTML = spell.description; // 填入描述
                });
            });
    </script>
</body>
</html>
```

### 範例二：獲取國家人口資料

這個範例將從另一個網站獲取國家的人口資料，並把它們顯示在網頁上的表格中。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>國家人口</title>
</head>
<body>
    <table border="1">
        <tr>
            <td>ID Nation</td>
            <td>ID Year</td>
            <td>Nation</td>
            <td>Population</td>
            <td>Slug Nation</td>
            <td>Year</td>
        </tr>
    </table>

    <script>
        fetch("https://datausa.io/api/data?drilldowns=Nation&measures=Population") // 使用 fetch() 獲取資料
            .then((res) => res.json()) // 將響應轉換為 JSON 格式
            .then((data) => {
                data.data.forEach((nation) => {
                    let table = document.querySelector("table");
                    let row = table.insertRow();
                    let cell1 = row.insertCell(0);
                    let cell2 = row.insertCell(1);
                    let cell3 = row.insertCell(2);
                    let cell4 = row.insertCell(3);
                    let cell5 = row.insertCell(4);
                    let cell6 = row.insertCell(5);
                    cell1.innerHTML = nation["ID Nation"]; // 填入 ID Nation
                    cell2.innerHTML = nation["ID Year"]; // 填入 ID Year
                    cell3.innerHTML = nation.Nation; // 填入 Nation 名稱
                    cell4.innerHTML = nation.Population; // 填入 Population 人口數
                    cell5.innerHTML = nation["Slug Nation"]; // 填入 Slug Nation
                    cell6.innerHTML = nation.Year; // 填入 Year 年份
                });
            });
    </script>
</body>
</html>
```

### 總結

`fetch()` 就像是一個送餐的服務員，幫助我們從網路上獲取資料。它讓我們可以輕鬆地從不同的網站獲取資訊，然後在我們的網頁上顯示出來。只需要告訴 `fetch()` 我們想要的網址，它就會幫我們完成！
