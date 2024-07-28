---
outline: {
    level: [2,3],
}
---


# python-新手上路-Day1｜變數｜if...else

這一篇會學到的

1. 註解
2. 輸入函數 `input()`
3. 輸出函數 `print()`
4. 變數 Value
5. 判斷式 `if...else...`
6. `f-string` 格式化

## 註解
> 註解就像是語言學家為了未來的自己寫下的筆記，因為連當初寫程式的自己都不會記得這是在幹嘛。
```py
# print('hi 1')
print('hi 2')

'''
多行註解
123 test
'''
```

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

然後在終端裡輸入(在vscode裡按下`ctrl` + `~`可以打開總端)
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
python的`print`會自動換行

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
Python中常見的型別有：`int` (整數)、`float` (浮點數)、`str` (字串)、`list`(列表)

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

在程式中~~尤其是python~~很注重資料的型態，來個例子：<br>
`'hello'` 是字串<br>
`123` 是數字<br>
那...<br>
`'123'` 跟 `123` 是同一個型態嗎?<br>
答案是不一樣!
怎麼分辨? 有加<span class='m'>單引號</span>或<span class='m'>雙引號</span>的資料就是字串

### Bollean(布林值)
也是一種型態

True (真)<br>
False (假)

可以利用邏輯條件生成

#### 1. 比較運算子

| 運算子 | 效果           |
| ------ | -------------- |
| x < y  | X是否小於Y     |
| x <= y | X是否小於等於Y |
| x > y  | X是否大於Y     |
| x >= y | X是否大於等於Y |
| x == y | X是否等於Y     |
| x != y | X是否不等於Y   |

```py
10 <= 60 # 會變成 True

123 == 123 # 會變成 True

20 == 40 # 會變成 False

'123' == 123 # 會變成 False
```
---
#### 2. 複合式
> 當你全都要的時候

| 運算子  | 效果                                     |
| ------- | ---------------------------------------- |
| a or b  | A或B其中一個條件成立就回傳True           |
| a and b | A或B兩個條件都成立才回傳True             |
| not A   | 如果A為True，則回傳False，反之則回傳True |

```py
# 要是3和5的倍數
number = int(input()) # 輸入一個數字
number % 3 == 0 and number % 5 == 0
```

```py
boolean = 12 + 4 > 80
print(boolean) # 會輸出 False
```


### 數學運算子

可被用做運算、加減乘除、次方

|    方法    | 程式碼 |
| :--------: | ------ |
|    加法    | n + 2  |
|    減法    | n - 2  |
|    乘法    | n * 2  |
|    除法    | n / 2  |
| 除法(整除) | n // 2 |
|  n的次方6  | n ** 6 |
|   取餘數   | n % 6  |


## 流程控制 if...else...

> 有人說，程式設計師就像是翻譯員，將你的思想翻譯成電腦能理解的語言，然後再生氣地問你為什麼想的這麼亂。

> 邏輯就像是去迷宮，只不過是在完全黑暗的房間裡，而且迷宮裡的牆還會隨機改變位置

在Python中，使用if、elif（相當於其他語言的elseif）、else結構可以實現條件判斷和控制流程。

::: warning 注意
請注意，在Python中，不同於其他語言，它使用 <span class='m'>縮排</span>（Tab）來表示程式碼塊的層次結構，這是確保代碼的正確執行的關鍵。
:::

### 發揮你的想像力

1. 草稿

```py
如果 (條件1):
    條件1成立，才做這裡的事情
(條件2):
    條件2成立，才做這裡的事情
都不成立:
    條件不成立，才做這裡的事情
```

2. 把邏輯加上

```py
如果n可以被2整除:
    輸出【是偶數】
如果可以被3整除:
    輸出【是3的倍數】
都不成立:
    輸出【不是偶數也不是3個倍數】
```

3. 最後變成程式碼

(換成程式)
你設定的條件(邏輯判斷)，
用`if`開頭，用 `:` 結尾
#### 範例1
```py
if n % 2 == 0:
    print('是偶數')
elif n % 3 == 0:
    print('是3的倍數')
else:
    print('不是偶數也不是3個倍數')
```
看懂了，對吧?<br>
再看一個範例

#### 範例2
如果今天出太陽，那就去菜市場；否則就不去<br>
去了菜市場以後，如果蘋果的價格低於50，那就買蘋果；否則就不買<br>

**輸入**<br>
會輸入sun和apple<br>
1代表出太陽，0代表沒有出太陽<br>
apple代表蘋果的價格<br>

**輸出**<br>
有沒有去市場  有沒有買蘋果<br>

::: details 答案
```py
# 範例2
sun = input()
apple = input()
if sun == 1:
    if apple < 50:
        print('有去菜市場 有買蘋果')
    else:
        print('有去菜市場 沒有買蘋果')
else:
    print('沒有去菜市場 沒有買蘋果')
```
:::


## 格式化 f-string

```python
name = "小明"
age = 20
print(f"我的名字是 {name}，今年 {age} 岁。")
```
输出结果为：
```
我的名字是小明，今年 20 岁。
```

當然！在Python中，**F-strings**提供了一種簡潔而強大的方法來插值和格式化字符串。引入於Python 3.6版本，通常比傳統的字符串插值方法如`%`運算符和`.format()`方法更受偏愛。讓我們深入了解一下`f-strings`的細節：

1. **基本用法**：
   - f-string是通過在字符串前加上字母`f`來創建的。例如：
     ```python
     name = 'World'
     s = f'Hello {name}'
     print(s)  # 輸出: Hello World
     ```
   - 大括號`{}`用於包含應該插值到字符串中的表達式或變量。

2. **字符串長度和對齊**：
   - 您可以使用冒號`:`後跟所需寬度來指定插值值的最小寬度。例如：
     ```python
     name = 'Jon'
     s = f'^{name:20}$'
     print(s)  # 輸出: ^Jon                 $
     ```
   - 要將值對齊到右側，請使用`:>`，對齊到左側，請使用`:<`，對於居中對齊，請使用`:^`。

3. **填充和填充字符**：
   - 您可以使用語法`<fill_character>`指定填充字符（不是空格）。例如：
     ```python
     num = 1_000_000
     s = f'{num:*<12}'
     print(s)  # 輸出: 1000000******
     ```
   - 要使用零填充，請將`0`作為填充字符。

4. **千位分隔符和百分比格式**：
   - 要將千位分隔符添加到數字中，只需使用逗號`,`或下劃線`_`。例如：
     ```python
     num = 1_000_000
     s = f'{num:,}'  # 輸出: 1,000,000
     ```
   - 要顯示百分比，請使用`%`符號。您可以使用`.2%`來控制精度（保留2位小數）：
     ```python
     a = 0.5555
     s = f'{a:.2%}'  # 輸出: 55.55%
     ```

## 牛刀小試

[TQC+ 程式語言Python 第2類：選擇敘述](https://jbprogramnotes.com/2020/05/tqc-%e7%a8%8b%e5%bc%8f%e8%aa%9e%e8%a8%80python-%e7%ac%ac2%e9%a1%9e%ef%bc%9a%e9%81%b8%e6%93%87%e6%95%98%e8%bf%b0/)
