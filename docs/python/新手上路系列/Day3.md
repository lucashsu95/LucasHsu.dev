---
outline: "deep"
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: Python, python, 新手上路, 索引, for迴圈, while迴圈, 字串切片, range函數
  - - meta
    - property: og:title
      content: Python新手上路 Day3 - 迴圈和字串操作
  - - meta
    - property: og:description
      content: 學習Python的索引、for迴圈、while迴圈、字串切片和range函數
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/python-cover.jpg
---

# python-新手上路-Day3 ｜ for ｜ while ｜字串切片

## 這篇會學到的

##### tag:python

1. index 索引
2. for 迴圈
3. while 迴圈
4. str[::] (字串切片)
5. range()

> 在程式世界裡，錯誤就像是教科書上的答案，你永遠都不知道哪一頁是對的。

## 索引（index）

> 索引就像是程式的街道地址，它告訴你在哪裡可以找到你需要的資訊。不要迷路了！

索引通常是指用於存取序列型數據（如列表、元組、字串等）中特定元素的位置或標識。

Python 使用從 0 開始的索引來識別序列中的元素。換句話說，第一個元素的索引是 0，第二個元素的索引是 1，依此類推。

假如有一個字串

| 字串         | h   | e   | l   | l   | o   |
| ------------ | --- | --- | --- | --- | --- |
| 從前面開始數 | 0   | 1   | 2   | 3   | 4   |
| 從後面開始數 | -5  | -4  | -3  | -2  | -1  |

所以我如果要輸出字串的第一個和最後一個字的話就可以這樣寫。

```python
string = 'hello'
print(string[0]) # 會輸出h
print(string[-1]) # 會輸出o
```

來個小問題:
假設字串的長度一定是奇數，怎麼輸出中間的字呢? :D

---

## 迴圈

在 Python 中，迴圈是一種控制結構，用於重複執行特定的程式碼塊，直到某個條件滿足或循環次數完成為止。Python 提供了兩種主要的迴圈類型：`for` 迴圈和 `while` 迴圈。

### for

> 和 `for` 循環一起工作就像是和一個超級有耐心的小工具人合作，它會按順序處理所有事情。

> 就像你在超市逛過每個過道一樣，`for` 循環也會逛過每個元素，確保沒有被遺漏的東西。

`for` 迴圈遍歷一個序列（如列表、元組、字串等）中的每個元素，並對每個元素執行特定的程式碼

```python
sequence = 'hello'
for element in sequence:
    print(element)
# 會印出
# h
# e
# l
# l
# o
```

也可以這樣寫
針對長度來去跑索引

```python
sequence = 'hello'
for index in range(len(sequence)):
    print(sequence[index])
# 一樣會印出
# h
# e
# l
# l
# o
```

---

### range

`range()` 函式用於生成一個整數序列，通常用於迴圈中，特別是在 for 迴圈中，用於指定迭代的次數或索引值。

`range()` 函式有三種常見的用法：

#### 指定終止值：

```python
for i in range(5):
    print(i)
```

這將會生成一個從 0 到 4（不包括 5）的整數序列，並在每個迭代中將該值賦給變數 i。

#### 指定開始值和終止值：

```python
for i in range(2, 6):
    print(i)
```

這將會生成一個從 2 到 5（不包括 6）的整數序列。

#### 指定開始值、終止值和步長：

```python
for i in range(0, 10, 2):
    print(i)
```

這將會生成一個從 0 到 8（不包括 10），步長為 2 的整數序列，即每次迭代增加 2。

---

### while

> 程式設計師的睡眠時間就像是無限迴圈，永遠不知道什麼時候會跳出來。

> 程式設計師最怕的就是自己寫了一個永遠跑不完的迴圈，然後就變成了程式設計界的吉尼斯世紀錄保持者。

`while` 迴圈根據一個條件來重複執行程式碼塊，只要條件滿足。`while` 迴圈的語法如下：

```python
while condition:
    # 執行程式碼塊
```

這裡的 condition 是一個布林表達式，當該表達式為真時，迴圈會繼續執行。

```python
count = 0
while count < 5:
    print(count)
    count += 1
# 會印出
# 0
# 1
# 2
# 3
# 4
```

---

## 字串切片

> 字串切片就像是糖果店的切蛋糕師傅，可以根據你的要求，把蛋糕切成不同的片段。

字串切片（String Slicing）是一種用於從字串中獲取子字串的操作。通過指定起始索引和終止索引，你可以從原始字串中提取出一部分子字串。

```
substring = string[start:end]
```

這裡的 string 是原始的字串，start 是起始索引（包含），end 是終止索引（不包含）。切片操作會返回從起始索引到終止索引之前的子字串。

需要注意的是，切片的範圍是左閉右開的，即包含起始索引對應的字元，但不包含終止索引對應的字元。

```python
text = "Hello, World!"

substring1 = text[7:12]
print(substring1)  # 輸出：World

substring2 = text[0:5]
print(substring2)  # 輸出：Hello

substring3 = text[7:]
print(substring3)  # 輸出：World!

```

另外，Python 還支持使用負數索引進行切片，負數索引從字串的末尾開始計數，例如 -1 表示最後一個字元，-2 表示倒數第二個字元，依此類推。

```python
text = "Hello, World!"

substring4 = text[-6:-1]
print(substring4)  # 輸出：World
```

如果 start 省略，則默認從字串的開頭開始；如果 end 省略，則默認到字串的結尾。另外，還可以使用步長來指定切片中字符的間隔。

字串切片的特性其實跟`range`一樣，可以放三個值。

```python
text = "Hello, World!"

substring5 = text[0::2]
print(substring5)  # 輸出：Hlo ol!
```

---

## 範例

~~真懂了?~~

### 範例 1:雙迴圈

```python
output = ''

for i in range(1, 4):
    for j in range(i + 1, i * 2 + 1):
        output += str(j)

print(output)
```

輸出:

```
234456
```

### 範例 2:三角型

```python
output = ''

for i in range(1, 5):
    for j in range(i + 1, i * 2 + 1):
        output += '*'
    output += '\n'  # 換行

print(output)
```

輸出:

```
*
**
***
****
```

---

## 迴圈 Q&A

### Q1：什麼候後要用`for`，什麼時要用`while`?

1. 使用 `for` 迴圈：

   - 當你已知要迭代的次數時，通常更適合使用 `for` 迴圈。例如，遍歷列表、字串、集合或範圍內的元素。
   - `for` 迴圈對於遍歷資料結構非常有用，因為你可以直接訪問每個元素。
   - 當你需要將某個操作應用到一組元素上時，`for` 迴圈是更自然的選擇。

2. 使用 `while` 迴圈：

   - 當你不確定要執行多少次迴圈時，或者當你需要在某個特定條件成立時才停止迴圈，通常使用 `while` 迴圈。
   - `while` 迴圈使用一個條件來決定是否繼續執行，當條件為假時迴圈停止。
   - 當你需要實現一些需要不斷檢查條件的邏輯時，`while` 迴圈是更適合的選擇。
   - ~~想讓電腦燒起來的時候~~

   總結來說，選擇使用 `for` 還是 `while` 迴圈取決於你的問題和需求。
   如果你已經知道迭代次數或要遍歷的資料結構，則 `for` 迴圈通常更適合。
   如果你需要根據特定條件重複執行，則 `while` 迴圈是更適合的選擇。

### Q2：雙迴圈的使用時機?

1. 巢狀資料結構遍歷：當你需要遍歷巢狀的資料結構，例如二維陣列或嵌套的字典時，雙迴圈非常有用。外迴圈用於遍歷主要結構，而內迴圈用於遍歷內部結構。
2. 排列組合：當你需要生成所有可能的排列或組合時，雙迴圈也很常見。例如，找到一個列表中所有元素的組合。
3. 矩陣操作：在處理矩陣時，你可能需要使用雙迴圈來遍歷矩陣中的每個元素。
4. 多層迴圈的演算法：某些演算法需要多層嵌套迴圈，例如圖形搜索或回溯演算法。這些演算法通常需要在不同的迴圈中控制不同的狀態。

---

## 牛刀小試

- [TQC+ 程式語言 Python 第 3 類：迴圈敘述](./tqc/tqc3/301)
- [TQC+ 程式語言 Python 第 4 類：進階控制流程](./tqc/tqc4/401)
