---
outline: "deep"
---

# python-新手上路-Day5

> 📝 TL;DR：Python 函式與演算法練習。學會設計函式、字串處理、列表操作、迴圈控制。共 10 道練習題，從簡單到進階，幫你巩固基礎。

## 練習題 1：設計一個函式，接受兩個參數，並返回其乘積。

**學習目標**：練習函式定義與回傳值。

**解題思路**：
- 使用 `def` 定義函式
- 接受兩個參數，返回它們的乘積
- 注意處理浮點數運算

**參考答案**：
```python
def multiply(a, b):
    return a * b

# 測試
print(multiply(24, 99))      # 2376
print(multiply(12.56, 99.33)) # 1247.5848
```

**輸入輸出範例**：
```
輸入：24, 99
輸出：2376

輸入：12.56, 99.33
輸出：1247.5848
```

---

## 練習題 2：撰寫一個程式，可以將一個字串反轉並輸出

**學習目標**：練習字串處理與切片操作。

**解題思路**：
- 使用字串切片 `[::-1]` 反轉字串
- 注意處理數字字串（包含 0 和負號問題）

**參考答案**：
```python
def reverse_string(s):
    return s[::-1]

# 測試
print(reverse_string("123"))   # 321
print(reverse_string("150"))   # 051 (注意：這裡是字串反轉)
print(reverse_string("-89"))   # 98- (注意：負號會被反轉)
```

**注意**：如果是數字反轉，需要先轉成字串再反轉，然後再轉回數字。

```python
def reverse_number(n):
    return int(str(n)[::-1]) if n >= 0 else -int(str(-n)[::-1])

# 測試
print(reverse_number(123))   # 321
print(reverse_number(150))   # 51
print(reverse_number(-89))   # -98
```

**輸入輸出範例**：
```
輸入：123
輸出：321

輸入：150
輸出：51

輸入：-89
輸出：-98
```

---

## 練習題 3：創建一個包含 5 個整數的列表，找出最大的數字。

**學習目標**：練習列表操作與比較運算。

**解題思路**：
- 使用 `input().split()` 讀取多個數字
- 轉換成整數列表
- 使用 `max()` 函式或迴圈找出最大值

**參考答案**：
```python
# 方法 1：使用內建函式
numbers = list(map(int, input().split()))
print(max(numbers))

# 方法 2：使用迴圈
numbers = list(map(int, input().split()))
max_num = numbers[0]
for num in numbers:
    if num > max_num:
        max_num = num
print(max_num)
```

**輸入輸出範例**：
```
輸入：4 AA -999 9 999 1000
輸出：1000
```

**注意**：輸入中的 "AA" 會導致錯誤，實際使用時需要處理非數字輸入。

---

## 練習題 4：輸入不知道幾個數，第二行的數字是 1 找出最大的數字，第二行的數字是 2 找出最小的數字。

**學習目標**：練習條件判斷與列表操作。

**解題思路**：
- 讀取兩行輸入
- 第一行是數字列表，第二行是選擇（1=最大，2=最小）
- 根據選擇返回相應結果

**參考答案**：
```python
numbers = list(map(int, input().split()))
choice = int(input())

if choice == 1:
    print(max(numbers))
elif choice == 2:
    print(min(numbers))
```

**輸入輸出範例**：
```
輸入：
1 2 3 4
1
輸出：4

輸入：
2 9 0 -99 999
2
輸出：-99
```

---

## 練習題 5：請寫一個程式，輸入一個正整數，然後計算並輸出該數的階乘。

**學習目標**：練習迴圈與累乘計算。

**解題思路**：
- 階乘定義：n! = n × (n-1) × (n-2) × ... × 1
- 使用迴圈從 1 累乘到 n
- 注意處理 0! = 1 的特殊情况

**參考答案**：
```python
def factorial(n):
    if n == 0:
        return 1
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result

# 測試
print(factorial(5))    # 120
print(factorial(10))   # 3628800
```

**輸入輸出範例**：
```
輸入：5
輸出：120

輸入：10
輸出：3628800
```

---

## 練習題 6：寫一個程式，接受使用者輸入一段文字，然後統計該文字中每個字母出現的次數，輸出最大次數的字母和最大的次數。

**學習目標**：練習字串處理與字典操作。

**解題思路**：
- 使用字典統計每個字母出現的次數
- 遍歷字典找出出現次數最多的字母
- 注意只統計字母，忽略其他字符

**參考答案**：
```python
def most_frequent_char(text):
    # 只統計字母，忽略空格和標點
    char_count = {}
    for char in text:
        if char.isalpha():
            char_count[char] = char_count.get(char, 0) + 1
    
    # 找出出現次數最多的字母
    max_char = max(char_count, key=char_count.get)
    return f"{max_char}:{char_count[max_char]}"

# 測試
print(most_frequent_char("Hi I am a good good good good man,very good man"))
# 輸出：o:10
```

**輸入輸出範例**：
```
輸入：Hi I am a good good good good man,very good man
輸出：o:10
```

---

## 練習題 7：請寫一支程式計算班上每位學生國英數三科的總分及平均、班上各科及總成績的平均。

**學習目標**：練習二維列表操作與統計計算。

**解題思路**：
- 讀取學生人數和成績
- 計算每位學生的總分和平均
- 計算全班各科的總分和平均

**參考答案**：
```python
n = int(input())
scores = []
for _ in range(n):
    scores.append(list(map(int, input().split())))

# 計算每位學生的總分和平均
for student_scores in scores:
    total = sum(student_scores)
    average = total / len(student_scores)
    print(f"總分 {total},平圴 {average}")

# 計算全班各科的總分和平均
for subject in range(3):
    subject_total = sum(student[subject] for student in scores)
    subject_average = subject_total / n
    print(f"全班{'國英數'[subject]}文總分 {subject_total},平均 {subject_average}")
```

**輸入輸出範例**：
```
輸入：
3
100 99 80
50 60 70
50 96 77

輸出：
總分 279,平圴 93
總分 180,平圴 60
總分 223,平圴 74
全班國文總分 200,平均 66
全班英文總分 255,平均 85
全班數學總分 227,平均 75
```

---

## 練習題 8：鉛筆一支 5 元，一打 50 元。小明需要幫班上每位同學買一枝鉛筆，請問要多少錢？

**學習目標**：練習優化計算與條件判斷。

**解題思路**：
- 一打 = 12 支，價格 50 元（比單買 12 × 5 = 60 元便宜）
- 盡量買一打，剩下的單買
- 計算最優方案的總價格

**參考答案**：
```python
def calculate_pencil_cost(n):
    # 一打 12 支 50 元，單支 5 元
    dozens = n // 12
    singles = n % 12
    return dozens * 50 + singles * 5

# 測試
print(calculate_pencil_cost(42))  # 180
print(calculate_pencil_cost(11))  # 55
```

**輸入輸出範例**：
```
輸入：42
輸出：180

輸入：11
輸出：55
```

**計算過程**：
- 42 支：3 打（36 支）+ 6 支單買 = 3 × 50 + 6 × 5 = 150 + 30 = 180
- 11 支：0 打 + 11 支單買 = 0 × 50 + 11 × 5 = 55

---

## 練習題 9：字串括號驗證

**學習目標**：練習字串處理與堆疊概念。

**解題思路**：
- 使用堆疊（列表）來追蹤左括號
- 遍歷字串，遇到左括號加入堆疊
- 遇到右括號時，檢查堆疊是否有對應的左括號
- 最後檢查堆疊是否為空

**參考答案**：
```python
def is_valid_parentheses(s):
    stack = []
    for char in s:
        if char == '(':
            stack.append(char)
        elif char == ')':
            if not stack:
                return "不正確"
            stack.pop()
    return "正確" if not stack else "不正確"

# 測試
test_cases = [
    "(123)453",
    "(123)(456)78",
    "((123)(345))",
    "()()()",
    "(())()",
    "(123))(456)",
    ")123))(456)",
    "(123))(456)("
]

for test in test_cases:
    print(is_valid_parentheses(test))
```

**輸入輸出範例**：
```
輸入：
(123)453
(123)(456)78
((123)(345))
()()()
(())()
(123))(456)
)123))(456)
(123))(456)(

輸出：
正確
正確
正確
正確
正確
不正確
不正確
不正確
```

---

## 練習題 10：字串遞增驗證

**學習目標**：練習字串比較與條件判斷。

**解題思路**：
- 字串長度至少為 2
- 除了第 1 碼外，每一碼都大於或等於前一碼
- 但若有某一碼的值小於前一碼，那麼其後的每一碼都小於或等於前一碼

**參考答案**：
```python
def is_valid_sequence(s):
    if len(s) < 2:
        return "不正確"
    
    # 檢查是否遞增或先遞增後遞減
    increasing = True
    for i in range(1, len(s)):
        if s[i] < s[i-1]:
            increasing = False
        elif s[i] > s[i-1] and not increasing:
            return "不正確"
    
    return "正確"

# 測試
test_cases = [
    "11112222233333",
    "111122224444666444433331111",
    "4444333322221111",
    "111222233332222111144444"
]

for test in test_cases:
    print(is_valid_sequence(test))
```

**輸入輸出範例**：
```
輸入：
11112222233333
111122224444666444433331111
4444333322221111
111222233332222111144444

輸出：
正確
正確
正確
不正確
```

---

## 總結

今天練習了 10 道 Python 程式設計題目，涵蓋：

1. **函式設計**：定義函式、參數傳遞、回傳值
2. **字串處理**：反轉、統計、驗證
3. **列表操作**：找出最大/最小值、二維列表
4. **迴圈控制**：for 迴圈、while 迴圈
5. **條件判斷**：if-else、比較運算
6. **優化計算**：最少花費問題

建議先自己嘗試解題，再看參考答案。多練習才能真正掌握 Python 程式設計！
