# 簡易計數器

<SecretPage password="簡易計數器-ans" />

## 目標
1. 點擊向上箭頭，中間的數字會增加
2. 點擊向下箭頭，中間的數字會減少


<video controls="controls" src="../assets/網頁操作/簡意計數器/簡意計數器-demo.mp4"></video>

## 進階

如果做完了~可以加個條件，如果不能讓中間的數字為0要怎麼做?(中間數字不能出現小於等於0的狀況)

::: details 看答案
::: code-group

```html  [普通題]
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>簡易計數器</title>
    <style>
        .counter-container {
            text-align: center;
            padding: 20px;
        }
        .counter {
            font-size: 24px;
            margin: 10px 0;
        }
        .button {
            border: none;
            text-decoration: none;
            display: inline-block;
            background: transparent;
            margin: 4px 2px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="counter-container">
        <button class="button" onclick="increment()">⬆️</button>
        <div class="counter" id="count">0</div>
        <button class="button" onclick="decrement()">⬇️</button>
    </div>

    <script>
        let count = 0;
        const countElement = document.getElementById('count');

        function increment() {
            count++;
            countElement.textContent = count;
        }

        function decrement() {
            count--;
            countElement.textContent = count;
        }
    </script>
</body>
</html>
```


```html [進階題]
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>簡易計數器</title>
    <style>
        .counter-container {
            text-align: center;
            padding: 20px;
        }
        .counter {
            font-size: 24px;
            margin: 10px 0;
        }
        .button {
            border: none;
            text-decoration: none;
            display: inline-block;
            background: transparent;
            margin: 4px 2px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="counter-container">
        <button class="button" onclick="increment()">⬆️</button>
        <div class="counter" id="count">0</div>
        <button class="button" onclick="decrement()">⬇️</button>
    </div>

    <script>
        let count = 0;
        const countElement = document.getElementById('count');

        function increment() {
            count++;
            countElement.textContent = count;
        }

        function decrement() {
            count = Math.max(0,count - 1)
            // if(count < 0){
            //     count++;
            // }
            countElement.textContent = count;
        }
    </script>
</body>
</html>
```
:::