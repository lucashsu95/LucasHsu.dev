---
outline: { level: [2, 3] }

head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: python,新手上路,變數,input,print
  - - meta
    - name: og:title
      content: Python新手上路 Day1 - 變數｜型態
  - - meta
    - name: og:description
      content: 變數、輸入輸出函數
  - - meta
    - name: og:type
      content: article
---

# python-新手上路-Day1 ｜變數｜ 型態

這一篇會學到的

1. 輸入函數 `input()`
2. 輸出函數 `print()`
3. 變數 Value
4. 數學運算子
5. 比較運算子

## 輸入 Input

### 單行輸入

在程式中，我們使用 `input` 函數來接收使用者的輸入

```py
n = input()
nn = input('請輸入一些字')
```

### 多行輸入

::: code-group

```py [第一種方法]
import sys
# for line in sys.stdin.read().splitlines*():
for line in sys.stdin:
    line = line.strip()
    print(line)
```

```py [第二種方法]
while 1:
    try:
        n = input()
        print(n)
    except:
        break
```

:::

### 引入檔案

如果有引入檔`in.txt`的話
先把兩個檔`a.py`、`in.txt`創建好

::: code-group

```py [a.py]
a = input()
b = input()
print(a,b)
```

```py [in.txt]
Everything will get better
12345
```

:::

然後在終端裡輸入(在 vscode 裡按下`ctrl` + `~`可以打開總端)

```sh
python a.py < in.txt
```

就會印出執行程式碼的結果`Everything will get better`

::: details 印在檔案裡、中文輸入

#### 印在檔案裡

在後面加上` > out.txt`

```
python a.py < in.txt > out.txt
```

#### 中文輸入

如果`in.txt`裡面是中文的話<br>
讀進來的資料會是亂碼<br>
加上`reconfigure(encoding="utf-8")`

```py
import sys

a = sys.stdin.reconfigure(encoding="utf-8") # [!code focus]
for line in a:
    print(line)
```

:::

## 輸出 Print

> 當你用 'print' 顯示東西時，程式不會給你掌聲，但至少它不會扔番茄！

`print` 函數能夠將結果呈現在螢幕上

```py
print('hi')
print('hi')
# hi
# hi
```

::: details 取消自動換行

#### 取消自動換行

python 的`print`會自動換行

不要換行在後面加上`end=''`

```py
print('hi',end='')
print('hi')
# hihi
```

:::

## 變數 Value

> 像是在命名寵物一樣，程式中取名變數也是一門藝術，畢竟 'x' 和 'y' 可不是什麼好名字！

在程式中，變數是儲存數據的容器，而在教學中，我們可以將學生的腦袋想像成儲存知識的 '變數'。
Python 中常見的型別有：`int` (整數)、`float` (浮點數)、`str` (字串)、`list`(列表)

1. 我們可用`=`來給變數宣告初始值
2. 我們可用`type()`這個函式來得知變數的型態

```py
int_val = 10
float_val = 12.3
str_val = 'hello python'
boolean_val = True
nv = None

print(int_val, float_val, str_val, boolean_val)
print(type(int_val))
print(type(float_val))
print(type(str_val))
print(type(boolean_val))
print(nv)
```

### 字串和數字

在程式中~~尤其是 python~~很注重資料的型態，舉個例子：<br>
`'hello'` 是字串<br>
`123` 是數字<br>
那...<br>
`'123'` 跟 `123` 是同一個型態嗎?<br>
答案是不一樣!
怎麼分辨? 有加<mark>單引號</mark>或<mark>雙引號</mark>的資料就是字串

### Bollean(布林值)

Bollean 也是一種型態

就只有
True (真)<br>
False (假)

可以利用**邏輯條件生成**

#### 1. 比較運算子

| 運算子 | 效果             |
| ------ | ---------------- |
| x < y  | X 是否小於 Y     |
| x <= y | X 是否小於等於 Y |
| x > y  | X 是否大於 Y     |
| x >= y | X 是否大於等於 Y |
| x == y | X 是否等於 Y     |
| x != y | X 是否不等於 Y   |

```py
10 <= 60 # 會變成 True
123 == 123 # 會變成 True
20 == 40 # 會變成 False
'123' == 123 # 會變成 False
```

#### 2. 複合式

> 當你全都要的時候

| 運算子  | 效果                                                          |
| ------- | ------------------------------------------------------------- |
| a and b | A 或 B 兩個條件都成立才回傳 True                              |
| a or b  | A 或 B 其中一個條件成立就回傳 True                            |
| not A   | 如果 A 為 True，則回傳 False，反之則回傳 True(負負得正的感覺) |

```py
boolean = 12 + 4 > 80
print(boolean) # 會輸出 False
```

```py
# 要是3和5的倍數
number = int(input()) # 輸入一個數字
print(number % 3 == 0 and number % 5 == 0)
```

### 數學運算子

可被用做運算、加減乘除、次方

|    方法    | 程式碼   |
| :--------: | -------- |
|    加法    | n + 2    |
|    減法    | n - 2    |
|    乘法    | n \* 2   |
|    除法    | n / 2    |
| 除法(整除) | n // 2   |
| n 的次方 6 | n \*\* 6 |
|   取餘數   | n % 6    |
