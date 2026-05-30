---
outline: [2,3]
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: fractions,分數運算,python
  - - meta
    - property: og:title
      content: fractions|python
  - - meta
    - property: og:description
      content: Python fractions模組懶人包，精確分數運算
  - - meta
    - property: og:type
      content: article
---
# fractions 懶人包

:::warning 為什麼需要 fractions？
分數運算可以**避免浮點數精度問題**，自動處理通分、約分。
競賽中遇到需要精確分數表示時超好用！
:::

## 快速上手

```python
from fractions import Fraction

# 建立分數
a = Fraction(1, 2)      # 1/2
b = Fraction(3, 4)      # 3/4
c = Fraction('0.5')     # 從字串建立
d = Fraction(0.75)      # 從浮點數建立（可能有精度問題）

# 基本運算
print(a + b)  # 5/4（自動通分）
print(a * b)  # 3/8
print(a / b)  # 2/3
```

## 常用操作

### 分數運算
```python
from fractions import Fraction

a = Fraction(1, 3)
b = Fraction(1, 6)

# 加減乘除
print(a + b)  # 1/2
print(a - b)  # 1/6
print(a * b)  # 1/18
print(a / b)  # 2

# 冪次
print(a ** 2)  # 1/9
```

### 分數特性
```python
f = Fraction(6, 8)

print(f.numerator)    # 3（分子，自動約分）
print(f.denominator)  # 4（分母）
print(f.limit_denominator(100))  # 限制分母大小（用於浮點轉分數）
```

### 浮點數轉分數
```python
from fractions import Fraction

# 自動轉換
f = Fraction(0.75)
print(f)  # 3/4

# 限制分母（找最接近的簡單分數）
f = Fraction(0.123456).limit_denominator(1000)
print(f)  # 11/89
```

## 競賽常用技巧

### 自動約分
```python
from fractions import Fraction

# 不用自己寫 GCD，自動約分
print(Fraction(6, 8))   # 3/4
print(Fraction(10, 5))  # 2
```

### 比較大小
```python
from fractions import Fraction

a = Fraction(1, 3)
b = Fraction(2, 5)

print(a > b)   # False
print(a < b)   # True
print(a == b)  # False
```

### 概率計算
```python
from fractions import Fraction

# 扔兩顆骰子，點數和大於9的概率
total = 36
favorable = 0
for i in range(1, 7):
    for j in range(1, 7):
        if i + j > 9:
            favorable += 1

prob = Fraction(favorable, total)
print(f"概率 = {prob} = {float(prob):.4f}")
```

:::tip 競賽小提醒
- `Fraction` 自動約分，不用手動算 GCD
- 用 `limit_denominator()` 把浮點數轉成分數
- 分數比較大小比浮點數比較更可靠
- 需要輸出小數時用 `float()` 轉換
:::
