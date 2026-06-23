---
outline: "deep"
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: Python, python, 新手上路, List Comprehension, 列表生成式, python一行寫法
  - - meta
    - property: og:title
      content: Python新手上路 Day10 - List Comprehension
  - - meta
    - property: og:description
      content: 學習如何使用Python中的List Comprehension來創建和操作列表
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/python-cover.webp
---

# python-新手上路-Day10 ｜ List Comprehension

在 Python 中，有一種稱為「List Comprehension」的技巧，可以讓你以一行簡潔的方式創建新的 List。這個技巧可以將迴圈和條件語句壓縮成單一的表達式。

## IF

```python
a = "🔥" if weight >= 60 else "😭"
```

這行程式碼使用了條件表達式，根據 weight 的值來賦值給變數 a。如果 weight 大於等於 60，a 將被賦值為 🔥 表情；如果 weight 小於 60，則 a 將被賦值為 😭 表情。這是一種簡潔的寫法，

## FOR

```python
squares = [x ** 2 for x in range(1, 6)]
# 結果為 [1, 4, 9, 16, 25]
```

### 範例 1: 創建一個包含平方數的 List

```python
even_numbers = [x for x in range(1, 11) if x % 2 == 0]
```

它的結果會是 [2, 4, 6, 8, 10]，這個 List 包含了範圍從 1 到 10 中的所有偶數數字。

### 範例 2: 將字串中的字母轉換成大寫

```python
text = "hello world"
uppercase_letters = [letter.upper() for letter in text if letter.isalpha()]
# 結果為 ['H', 'E', 'L', 'L', 'O', 'W', 'O', 'R', 'L', 'D']
```

### if 和 for 的結合

```python
a = ["🔥" if weight >= 60 else "😭" for weight in [80, 70, 50, 40]]
# a = ["🔥","🔥","😭","😭"]
```

### 範例 3: 使用嵌套一行寫法創建九九乘法表

```python
[print(f'{i} * {j} = {i*j}', end='\n') if j == 9 else print(f'{i} * {j} = {i*j:<3d}', end=' ') for i in range(10) for j in range(10)]
'''
0 * 0 = 0   0 * 1 = 0   0 * 2 = 0   0 * 3 = 0   0 * 4 = 0   0 * 5 = 0   0 * 6 = 0   0 * 7 = 0   0 * 8 = 0   0 * 9 = 0
1 * 0 = 0   1 * 1 = 1   1 * 2 = 2   1 * 3 = 3   1 * 4 = 4   1 * 5 = 5   1 * 6 = 6   1 * 7 = 7   1 * 8 = 8   1 * 9 = 9
2 * 0 = 0   2 * 1 = 2   2 * 2 = 4   2 * 3 = 6   2 * 4 = 8   2 * 5 = 10  2 * 6 = 12  2 * 7 = 14  2 * 8 = 16  2 * 9 = 18
3 * 0 = 0   3 * 1 = 3   3 * 2 = 6   3 * 3 = 9   3 * 4 = 12  3 * 5 = 15  3 * 6 = 18  3 * 7 = 21  3 * 8 = 24  3 * 9 = 27
4 * 0 = 0   4 * 1 = 4   4 * 2 = 8   4 * 3 = 12  4 * 4 = 16  4 * 5 = 20  4 * 6 = 24  4 * 7 = 28  4 * 8 = 32  4 * 9 = 36
5 * 0 = 0   5 * 1 = 5   5 * 2 = 10  5 * 3 = 15  5 * 4 = 20  5 * 5 = 25  5 * 6 = 30  5 * 7 = 35  5 * 8 = 40  5 * 9 = 45
6 * 0 = 0   6 * 1 = 6   6 * 2 = 12  6 * 3 = 18  6 * 4 = 24  6 * 5 = 30  6 * 6 = 36  6 * 7 = 42  6 * 8 = 48  6 * 9 = 54
7 * 0 = 0   7 * 1 = 7   7 * 2 = 14  7 * 3 = 21  7 * 4 = 28  7 * 5 = 35  7 * 6 = 42  7 * 7 = 49  7 * 8 = 56  7 * 9 = 63
8 * 0 = 0   8 * 1 = 8   8 * 2 = 16  8 * 3 = 24  8 * 4 = 32  8 * 5 = 40  8 * 6 = 48  8 * 7 = 56  8 * 8 = 64  8 * 9 = 72
9 * 0 = 0   9 * 1 = 9   9 * 2 = 18  9 * 3 = 27  9 * 4 = 36  9 * 5 = 45  9 * 6 = 54  9 * 7 = 63  9 * 8 = 72  9 * 9 = 81
'''
```

## DICT

### 使用一行寫法創建字典，將數字作為鍵，其平方作為值

```python
square_dict = {x: x ** 2 for x in range(1, 6)}
# 結果為 {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}
```
