# loop 10 question answer

<SecretPage password="potato" />

### 第 1 題：判斷相加後是否為迴文

```python

import sys

for line in sys.stdin.read().splitlines():
    a, b = map(int, line.split())
    s = str(a + b)
    print(s, s == s[::-1])
```

---

### 第 2 題：重複文字只保留一個

```python
s = input()

# 最早出現的保留
seen = set()
first = ""
for ch in s:
    if ch not in seen:
        seen.add(ch)
        first += ch

# 最晚出現的保留
seen = set()
last = ""
for ch in reversed(s):
    if ch not in seen:
        seen.add(ch)
        last = ch + last

print(first)
print(last)
```

---

### 第 3 題：密碼強度等級判斷

```python
import re

def password_strength(pw):
    score = 0
    if len(pw) >= 8:
        score += 1
    if re.search(r'[A-Za-z]', pw) and re.search(r'\d', pw):
        score += 1
    if re.search(r'[A-Z]', pw):
        score += 1
    if re.search(r'[~!@#$%^&_()\[\]{}<>.,+\\/-]', pw):
        score += 1

    return ["Week", "Normal", "Nice", "Good", "Strong"][score]

try:
    while True:
        pw = input().strip()
        if pw == "":
            break
        print(password_strength(pw))
except EOFError:
    pass
```

---

### 第 4 題：連續數字的最長子字串長度

```python
import re

s = input()
numbers = re.findall(r'\d+', s)

if numbers:
    print(max(len(num) for num in numbers))
else:
    print(0)
```

---

### 第 5 題：賣鴨子倒推

```python
def duck(n, remain, steps=[]):
    if n == 0:
        print("出發時共", remain, "隻")
        return remain
    sold = remain + 1
    total = sold * 2
    steps.append((n, sold, remain))
    result = duck(n - 1, total, steps)
    if n == len(steps):
        for i in reversed(steps):
            print(f"經過第 {i[0]} 個村莊 賣 {i[1]} 隻,剩 {i[2]} 隻鴨")
    return result

n, m = map(int, input().split())
duck(n, m)
```

---

### 第 6 題：巴斯卡三角形

```python
def pascal(n):
    if n == 1:
        return [[1]]
    else:
        triangle = pascal(n - 1)
        prev_row = triangle[-1]
        new_row = [1]
        for i in range(1, len(prev_row)):
            new_row.append(prev_row[i - 1] + prev_row[i])
        new_row.append(1)
        triangle.append(new_row)
        return triangle

n = int(input())

triangle = pascal(n)
for row in triangle:
    print(row)
```