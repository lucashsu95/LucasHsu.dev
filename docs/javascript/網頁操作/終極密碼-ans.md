# 終極密碼 答案

<SecretPage password="終極密碼-ans" />

## 目標
1. 系統會取一個1~100的亂數
2. 選擇一個數字
3. 系統會說 太大 或是 太小
4. 猜到對的答案才停

<video controls="controls" src="../assets/網頁操作/終極密碼/終極密碼-demo.mp4"></video>

::: details 看答案
::: code-group

```html [version1 - 原生JS]
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>終極密碼遊戲</title>
</head>
<body>
    <h1>終極密碼遊戲</h1>
    <p>請猜一個1到100之間的數字：</p>
    <input type="number" id="guess" min="1" max="100">
    <button onclick="checkGuess()">猜測</button>
    <p id="result"></p>
    <script>
        let randomNumber = Math.floor(Math.random() * 100) + 1;
        let guess;

        function checkGuess() {
            guess = document.getElementById('guess').value;
            let message = '';

            if (guess > randomNumber) {
                message = '太大';
            } else if (guess < randomNumber) {
                message = '太小';
            } else {
                message = '恭喜你，猜對了！';
            }

            document.getElementById('result').innerText = message;
        }
    </script>
</body>
</html>
```

```jsx  [version2 - React]
import { useState } from 'react'
import { useRef } from 'react'
import PropTypes from 'prop-types'

export default function PasswordGame({ randomNum }) {
  const inp = useRef(null)
  const [range, setRange] = useState([0, 100])
  const [message, setMessage] = useState('')

  const handleCheckNumber = (e) => {
    e.preventDefault()
    if (randomNum === Number(inp.current.value)) {
      setMessage('恭喜答對了')
    } else {
      if (randomNum > Number(inp.current.value)) {
        setMessage('太小了')
        setRange([Number(inp.current.value), range[1]])
      } else {
        setMessage('太大了')
        setRange([range[0], Number(inp.current.value)])
      }
    }
  }

  return (
    <section>
      <form onSubmit={handleCheckNumber} className="wrap">
        <h2 className="text-lg font-bold">數字準備好了</h2>
        <h3>請輸入數字</h3>
        <input type="text" ref={inp} className="input" />
        <div>
          <span>{range[0]}</span> ~ <span>{range[1]}</span>
        </div>
        <div className={message === '恭喜答對了' ? 'text-success' : 'text-danger'}>{message}</div>
        <button className="btn-primary mt-5">確認</button>
      </form>
    </section>
  )
}
PasswordGame.propTypes = {
  randomNum: PropTypes.number.isRequired
}
```
:::