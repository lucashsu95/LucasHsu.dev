---
theme: seriph
base: /LucasHsu.dev/slides/python-day01/
title: Python Day01
layout: cover
ui:
  nav: false
transition: slide-left
mdc: true
download: true
lineNumbers: true
routerMode: hash
colorSchema: dark
fonts:
  sans: 'Inter'
  mono: 'JetBrains Mono'
css: unocss
---

<style>
:root {
  --py-blue: #4B8BBE;
  --py-yellow: #FFD43B;
  --term-bg: #0d1117;
  --term-green: #7ee787;
}
.slidev-layout {
  font-family: 'Inter', sans-serif;
}
.font-mono, code, pre {
  font-family: 'JetBrains Mono', monospace !important;
}
.prompt::before {
  content: ">>> ";
  color: var(--py-yellow);
  font-weight: bold;
}
</style>

<div class="absolute inset-0 bg-gradient-to-br from-[#0d1117] via-[#0d1117] to-[#13202c]"></div>

<div class="relative z-10">
  <div class="font-mono text-sm text-[#7ee787] opacity-70 mb-6">
    $ python3 day01.py
  </div>

  <h1 class="text-6xl font-bold">
    <span class="text-[#4B8BBE]">Py</span><span class="text-[#FFD43B]">thon</span> Day01
  </h1>

  <p class="text-xl text-gray-300 mt-4 font-mono">
    變數・型別・輸入輸出
  </p>

  <div class="mt-20 font-mono text-sm text-gray-500 border-l-2 border-[#4B8BBE]/40 pl-4">
    <p><span class="prompt"></span>print("從今天開始，學會跟程式對話")</p>
  </div>
</div>

<div class="abs-br m-6 flex gap-2 z-10">
  <a href="https://github.com" target="_blank" alt="GitHub" class="text-xl icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

<!--
歡迎來到 Python Day01！
今天的主軸：先建立「型別」的心智模型，再學變數、輸入輸出，最後用數學運算子跟條件判斷串起來。
-->

---
layout: default
hideInToc: true
---

<div class="font-mono text-xs text-gray-500 mb-4">$ cat agenda.md</div>

# 今日大綱

<Toc maxDepth="1" />

<!--
今天的順序跟教科書不太一樣：我們先懂「資料長什麼樣子」，再學怎麼跟使用者要資料、怎麼把資料印出來。
這樣等一下講 input() 的時候，你才會懂為什麼它「永遠」回傳字串——因為你已經知道字串長什麼樣子了。
-->

---
layout: section
---

<div class="font-mono text-[#FFD43B] text-sm mb-2">PART 01</div>

# 資料型別
## 程式眼中的世界，只有幾種「形狀」

---

# 一個容器，五種形狀

Python 把資料分成幾種基本「形狀」(type)，每種形狀能做的事情不一樣：

<div class="grid grid-cols-5 gap-3 mt-8">

<div v-click="1" class="p-4 rounded-lg border border-[#4B8BBE]/40 bg-[#4B8BBE]/5 text-center">
<div class="text-2xl font-mono text-[#4B8BBE]">10</div>
<div class="text-xs text-gray-400 mt-2 font-mono">int</div>
<div class="text-xs text-gray-500">整數</div>
</div>

<div v-click="2" class="p-4 rounded-lg border border-[#FFD43B]/40 bg-[#FFD43B]/5 text-center">
<div class="text-2xl font-mono text-[#FFD43B]">12.3</div>
<div class="text-xs text-gray-400 mt-2 font-mono">float</div>
<div class="text-xs text-gray-500">浮點數</div>
</div>

<div v-click="3" class="p-4 rounded-lg border border-[#7ee787]/40 bg-[#7ee787]/5 text-center">
<div class="text-lg font-mono text-[#7ee787]">'hi'</div>
<div class="text-xs text-gray-400 mt-2 font-mono">str</div>
<div class="text-xs text-gray-500">字串</div>
</div>

<div v-click="4" class="p-4 rounded-lg border border-pink-400/40 bg-pink-400/5 text-center">
<div class="text-lg font-mono text-pink-400">True</div>
<div class="text-xs text-gray-400 mt-2 font-mono">bool</div>
<div class="text-xs text-gray-500">布林</div>
</div>

<div v-click="5" class="p-4 rounded-lg border border-gray-500/40 bg-gray-500/5 text-center">
<div class="text-lg font-mono text-gray-400">None</div>
<div class="text-xs text-gray-400 mt-2 font-mono">NoneType</div>
<div class="text-xs text-gray-500">空值</div>
</div>

</div>

<div v-click="6" class="mt-10 font-mono text-sm bg-[#0d1117] p-4 rounded-lg border border-gray-700">
<span class="prompt"></span>type(10) <span class="text-gray-500"># &lt;class 'int'&gt;</span><br/>
<span class="prompt"></span>type('hi') <span class="text-gray-500"># &lt;class 'str'&gt;</span>
</div>

<!--
這頁是整堂課的地基。先讓學生對五種型別有畫面，後面所有內容都是在這五種形狀上做事情。
-->

---

# 看起來像，但不是同一種

這是初學者最容易踩的坑：

<div class="grid grid-cols-2 gap-6 mt-8">

<div v-click="1" class="p-5 rounded-lg border border-[#7ee787]/40 bg-[#7ee787]/5">
<div class="font-mono text-lg text-[#7ee787]">'123'</div>
<div class="text-sm text-gray-400 mt-2">有引號包住 → <b>字串</b></div>
<div class="text-xs text-gray-500 mt-1">電話、身分證字號常用這個</div>
</div>

<div v-click="2" class="p-5 rounded-lg border border-[#4B8BBE]/40 bg-[#4B8BBE]/5">
<div class="font-mono text-lg text-[#4B8BBE]">123</div>
<div class="text-sm text-gray-400 mt-2">沒有引號 → <b>數字</b></div>
<div class="text-xs text-gray-500 mt-1">可以拿來做加減乘除</div>
</div>

</div>

<div v-click="3" class="mt-8 font-mono text-sm bg-[#0d1117] p-4 rounded-lg border border-gray-700">
<span class="prompt"></span>'123' == 123<br/>
<span class="text-red-400">False</span> <span class="text-gray-500"># 形狀不同，永遠不相等</span>
</div>

<div v-click="4" class="mt-4 p-3 bg-amber-500/10 rounded-lg border border-amber-500/30 text-sm">
🔑 記住這個結論：等一下講 <code>input()</code> 時會用到它
</div>

---
layout: section
---

<div class="font-mono text-[#FFD43B] text-sm mb-2">PART 02</div>

# 變數
## 幫資料貼上一張可以重複使用的標籤

---

# 變數宣告

用 `=` 把一個值「貼標籤」存起來，之後就能用這個名字取代它：

```python {1-5|7-10|all}
int_val = 10
float_val = 12.3
str_val = 'hello python'
boolean_val = True
nv = None

print(int_val, float_val, str_val, boolean_val)
print(type(int_val))   # <class 'int'>
print(type(str_val))   # <class 'str'>
print(nv)               # None
```

<div v-click class="mt-6 p-3 bg-[#4B8BBE]/10 rounded-lg border border-[#4B8BBE]/30 text-sm">
💡 變數名字是你取的，但型別是 Python 自己根據「值長什麼樣子」判斷出來的
</div>

<!--
強調：= 在這裡不是數學的「等於」，而是「把右邊的值貼上左邊的標籤」。
-->

---

# 命名小提醒

<div class="grid grid-cols-2 gap-6 mt-6">

<div v-click="1" class="p-4 rounded-lg border border-[#7ee787]/40 bg-[#7ee787]/5">

### ✅ 好的命名

```python
age = 18
user_name = 'Lucas'
total_price = 299
```

語意清楚，看名字就懂用途

</div>

<div v-click="2" class="p-4 rounded-lg border border-red-400/40 bg-red-400/5">

### ❌ 避免這樣

```python
a = 18
x1 = 'Lucas'
data = 299
```

過幾天連自己都看不懂

</div>

</div>

<div v-click="3" class="mt-6 font-mono text-sm text-gray-400">
慣例：變數名用小寫 + 底線，例如 <code>user_name</code>（snake_case）
</div>

---
layout: section
---

<div class="font-mono text-[#FFD43B] text-sm mb-2">PART 03</div>

# Output
## 用 print() 把資料說出來

---

# 基本 print()

```python
print('hi')
print('hi')
```

<arrow v-click="1" x1="200" y1="160" x2="320" y2="160" color="#7ee787" width="2" arrowSize="1" />

<div v-click="1" class="mt-2 text-sm text-[#7ee787] font-mono">輸出：</div>

<div v-click="1" class="font-mono text-sm bg-[#0d1117] p-4 rounded-lg border border-gray-700 mt-2 w-fit">
hi<br/>hi
</div>

<div v-click="2" class="mt-8">

`print()` 可以一次印多個值，用逗號隔開，預設用空白接起來：

```python
print(int_val, float_val, str_val, boolean_val)
# 10 12.3 hello python True
```

</div>

---

# 取消自動換行

`print()` 預設每次呼叫都會自動換行（背後是 `end='\n'`）：

```python {1-2|4}
print('hi', end='')
print('hi')
```

<div v-click class="mt-6">

**輸出結果：**

```sh
hihi
```

<div class="mt-4 p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
🔑 關鍵參數：<code>end=''</code> 把預設的換行符號 <code>\n</code> 改成空字串
</div>

</div>

---

# 更易讀的寫法：f-string

當你要把變數「組」進一句話裡，逗號分隔容易變得很亂：

```python
name = 'Lucas'
age = 18
print('Hello,', name, 'you are', age, 'years old')  # 😵 逗號接太多次
```

<v-click>

用 f-string，在字串前面加 `f`，把變數包進 `{}`：

```python
print(f'Hello, {name}! You are {age} years old.')
```

</v-click>

<div v-click="2" class="mt-6 p-3 bg-[#7ee787]/10 rounded-lg border border-[#7ee787]/30 text-sm">
💡 <code>{}</code> 裡面甚至可以直接放運算式，例如 <code>f'{age + 1}'</code>
</div>

---
layout: section
---

<div class="font-mono text-[#FFD43B] text-sm mb-2">PART 04</div>

# Input
## 讓程式可以「聽」使用者說話

---
layout: two-cols
layoutClass: gap-8
---

# 單行輸入

用 `input()` 接收使用者從鍵盤打的內容：

```python {1|2}
n = input()
nn = input('請輸入一些字：')
```

<div v-click class="mt-6 p-3 bg-red-500/10 rounded-lg border border-red-500/30 text-sm">
⚠️ <code>input()</code> 不管你輸入什麼，回傳的<b>永遠是字串</b>（還記得上一節 <code>'123' != 123</code> 嗎？）
</div>

::right::

## 範例程式碼

```python
name = input('你的名字？ ')
print(f'Hello, {name}!')
```

<div v-click="2">

```python
age_str = input('幾歲？ ')
print(type(age_str))  # <class 'str'>

age = int(age_str)     # 轉成整數
print(age + 1)          # 才能做運算
```

</div>

<!--
這頁是整堂課前後呼應的關鍵：因為先講過型別，這裡的 int(input()) 就不再是「背起來的咒語」，而是有道理的轉換。
-->

---

# 多行輸入

<v-clicks>

## 方法一：`sys.stdin`

```python
import sys

for line in sys.stdin:
    line = line.strip()  # 去掉行尾的換行符號
    print(line)
```

## 方法二：`while` + `try`

```python
while True:
    try:
        n = input()
        print(n)
    except EOFError:
        break   # 沒有輸入可讀時離開迴圈
```

</v-clicks>

---

# 檔案輸入：用 `<` 餵資料給程式

<div class="grid grid-cols-2 gap-4">
<div>

建立 `a.py`

```python
a = input()
b = input()
print(a, b)
```

建立 `in.txt`

```txt
Everything will get better
12345
```

</div>
<div v-click>

**終端機執行**

```sh
python a.py < in.txt
```

**輸出結果**

```sh
Everything will get better 12345
```

<div class="mt-4 p-3 bg-[#4B8BBE]/10 rounded-lg border border-[#4B8BBE]/30 text-sm">
💡 <code>&lt;</code> 把檔案內容導向成標準輸入，等於自動幫你打字
</div>

</div>
</div>

---

# 🈶 中文字元的編碼陷阱

如果 `in.txt` 裡有中文字元，預設編碼可能會出問題：

```python {1-2|4-5|7-8|all}
import sys

# 明確指定 UTF-8 編碼
sys.stdin.reconfigure(encoding='utf-8')

for line in sys.stdin:
    print(line)
```

<v-click>

輸出結果存成檔案：

```sh
python a.py < in.txt > out.txt
```

<div class="mt-4 p-3 bg-amber-500/10 rounded-lg border border-amber-500/30 text-sm">
⚠️ 沒設定 UTF-8 編碼時，中文字元在某些系統（尤其 Windows）上可能會變亂碼
</div>

</v-click>

---
layout: section
---

<div class="font-mono text-[#FFD43B] text-sm mb-2">PART 05</div>

# 數學運算子
## 讓數字動起來

---

# 運算子總覽

| 運算         | 程式碼   | 說明              |
| ------------ | -------- | ----------------- |
| 加法         | `n + 2`  | Addition           |
| 減法         | `n - 2`  | Subtraction         |
| 乘法         | `n * 2`  | Multiplication      |
| 除法         | `n / 2`  | Division（一律回傳 float）|
| 整數除法     | `n // 2` | 無條件捨去取整數     |
| 次方         | `n ** 6` | Power               |
| 取餘數       | `n % 6`  | Modulo（常用來判斷奇偶、倍數）|

---

# 實際範例

```python
n = 10
```

<div class="grid grid-cols-2 gap-3 mt-4">

<div v-click="1" class="p-3 rounded border border-gray-600 font-mono"><code>n + 2</code> → <span class="text-[#7ee787] font-bold">12</span></div>
<div v-click="2" class="p-3 rounded border border-gray-600 font-mono"><code>n - 2</code> → <span class="text-[#7ee787] font-bold">8</span></div>
<div v-click="3" class="p-3 rounded border border-gray-600 font-mono"><code>n * 2</code> → <span class="text-[#7ee787] font-bold">20</span></div>
<div v-click="4" class="p-3 rounded border border-gray-600 font-mono"><code>n / 2</code> → <span class="text-[#7ee787] font-bold">5.0</span></div>
<div v-click="5" class="p-3 rounded border border-gray-600 font-mono"><code>n // 2</code> → <span class="text-[#7ee787] font-bold">5</span></div>
<div v-click="6" class="p-3 rounded border border-gray-600 font-mono"><code>n ** 6</code> → <span class="text-[#7ee787] font-bold">1000000</span></div>
<div v-click="7" class="p-3 rounded border border-gray-600 col-span-2 font-mono"><code>n % 6</code> → <span class="text-[#7ee787] font-bold">4</span></div>

</div>

<div v-click="8" class="mt-4 p-3 bg-[#4B8BBE]/10 rounded-lg border border-[#4B8BBE]/30 text-sm">
💡 <code>/</code> 一律回傳 <code>float</code>，<code>//</code> 回傳無條件捨去的整數
</div>

---
layout: section
---

<div class="font-mono text-[#FFD43B] text-sm mb-2">PART 06</div>

# 比較與條件判斷
## 讓程式自己做選擇

---
layout: two-cols
layoutClass: gap-8
---

# 布林值與比較運算子

布林是只有兩個值的型別：

- <mdi-check-circle class="text-[#7ee787] inline"/> `True`（真）
- <mdi-close-circle class="text-red-400 inline"/> `False`（假）

| 運算子 | 效果             |
| ------ | ---------------- |
| `<`    | 小於              |
| `<=`   | 小於等於          |
| `>`    | 大於              |
| `>=`   | 大於等於          |
| `==`   | 等於              |
| `!=`   | 不等於            |

::right::

<v-click>

## 範例

```python
10 <= 60      # True
123 == 123    # True
20 == 40      # False
'123' == 123  # False
```

</v-click>

<v-click>

<div class="mt-4 p-3 bg-red-500/10 rounded-lg border border-red-500/30 text-sm">
⚠️ 字串 <code>'123'</code> 與整數 <code>123</code> 型別不同，比較結果永遠是 <code>False</code>
</div>

</v-click>

---

# 複合條件：and / or / not

<div class="grid grid-cols-3 gap-4 mt-4">

<div v-click="1" class="p-4 rounded-lg border border-[#4B8BBE]/40 bg-[#4B8BBE]/5">

### `and`
邏輯且

兩個條件都要是 `True`

```python
a and b
```

</div>

<div v-click="2" class="p-4 rounded-lg border border-[#7ee787]/40 bg-[#7ee787]/5">

### `or`
邏輯或

任一條件為 `True` 即可

```python
a or b
```

</div>

<div v-click="3" class="p-4 rounded-lg border border-orange-400/40 bg-orange-400/5">

### `not`
邏輯反

`True` 變 `False`，反之亦然

```python
not a
```

</div>

</div>

<v-click at="4">

```python
boolean = 12 + 4 > 80
print(boolean)  # False
```

</v-click>

---

# 🎯 實作：判斷 3 與 5 的倍數

```python {all|1|2|all}
number = int(input())  # 別忘了轉型！input() 回傳的是字串
print(number % 3 == 0 and number % 5 == 0)
```

<v-click>

<div class="mt-6 grid grid-cols-2 gap-4">
<div class="p-4 rounded-lg bg-[#7ee787]/10 border border-[#7ee787]/30 font-mono">
輸入 <code>15</code> → <code>True</code> ✅
</div>
<div class="p-4 rounded-lg bg-red-500/10 border border-red-500/30 font-mono">
輸入 <code>7</code> → <code>False</code> ❌
</div>
</div>

</v-click>

<div v-click="2" class="mt-6 p-3 bg-amber-500/10 rounded-lg border border-amber-500/30 text-sm">
💡 這題剛好串起今天三個主題：<b>input → 轉型 → 條件判斷</b>
</div>

---
layout: center
class: text-center
---

# 📝 課程總結

<div class="grid grid-cols-2 gap-4 mt-8 text-left">

<div v-click="1" class="flex items-start gap-2">
<carbon-checkmark-filled class="text-[#7ee787] mt-1 flex-shrink-0"/>
<div><b>資料型別</b><br/><span class="text-sm text-gray-400">int, float, str, bool, None — 五種基本形狀</span></div>
</div>

<div v-click="2" class="flex items-start gap-2">
<carbon-checkmark-filled class="text-[#7ee787] mt-1 flex-shrink-0"/>
<div><b>變數</b><br/><span class="text-sm text-gray-400">用 = 貼標籤、用 type() 檢查型別</span></div>
</div>

<div v-click="3" class="flex items-start gap-2">
<carbon-checkmark-filled class="text-[#7ee787] mt-1 flex-shrink-0"/>
<div><b>Output</b><br/><span class="text-sm text-gray-400">print()、end=''、f-string</span></div>
</div>

<div v-click="4" class="flex items-start gap-2">
<carbon-checkmark-filled class="text-[#7ee787] mt-1 flex-shrink-0"/>
<div><b>Input</b><br/><span class="text-sm text-gray-400">input() 永遠回傳字串、sys.stdin 多行讀取</span></div>
</div>

<div v-click="5" class="flex items-start gap-2">
<carbon-checkmark-filled class="text-[#7ee787] mt-1 flex-shrink-0"/>
<div><b>數學運算子</b><br/><span class="text-sm text-gray-400">+ - * / // ** %</span></div>
</div>

<div v-click="6" class="flex items-start gap-2">
<carbon-checkmark-filled class="text-[#7ee787] mt-1 flex-shrink-0"/>
<div><b>比較與條件</b><br/><span class="text-sm text-gray-400">比較運算子、and / or / not</span></div>
</div>

</div>

---

# 💪 課後練習

寫一支程式，能夠：

<v-clicks>

1. 詢問使用者的名字
2. 詢問使用者的年齡（記得轉型）
3. 用 f-string 印出包含姓名與年齡的問候語
4. 判斷年齡是奇數還是偶數

</v-clicks>

<v-click>

```python {all|1|2|3|4}
name = input("What's your name? ")
age = int(input('How old are you? '))
print(f'Hello, {name}! You are {age} years old.')
print(f"Your age is {'even' if age % 2 == 0 else 'odd'}.")
```

</v-click>

---
layout: end
---

<div class="font-mono text-sm text-[#7ee787] opacity-70 mb-6">
$ python3 day01.py<br/>
Process finished with exit code 0
</div>

# 謝謝大家！🎉

<p class="text-lg text-gray-400 font-mono">Python Day01 Complete</p>

<div class="mt-16 text-center">
  <p class="text-base text-gray-500">Continue your Python learning journey</p>
  <p class="text-xs text-gray-600 mt-1 font-mono">Next: Python Day02 — Control Flow</p>
</div>