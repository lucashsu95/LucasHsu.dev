---
outline: [2,3]
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: decimal,精確運算,python
  - - meta
    - property: og:title
      content: decimal|python
  - - meta
    - property: og:description
      content: Python decimal模組懶人包，解決浮點數精度問題
  - - meta
    - property: og:type
      content: article
---
# decimal 懶人包

:::warning 為什麼需要 decimal？
Python 預設的浮點數運算會有精度問題：
```python
print(0.1 + 0.2)  # 0.30000000000000004
print(0.1 * 3)    # 0.30000000000000004
```
`decimal` 提供精確的小數運算，**競賽中遇到需要精確浮點數計算時必用**。
:::

## 快速上手

```python
from decimal import Decimal, getcontext

# 設定精確度（位數）
getcontext().prec = 50

# ⚠️ 必須用字串初始化，不能直接用浮點數
a = Decimal('0.1')
b = Decimal('0.2')
print(a + b)  # 0.3 ✅
```

## 常用操作

### 基本運算
```python
from decimal import Decimal, getcontext
getcontext().prec = 100  # 設定精度

a = Decimal('1') / Decimal('3')  # 除法
b = Decimal('1') % Decimal('3')  # 餘數
c = Decimal('2') ** Decimal('10')  # 冪次
d = a.quantize(Decimal('0.01'))  # 四捨五入到小數點後2位
```

### 精度設定
```python
from decimal import Decimal, getcontext, localcontext

# 全域精度
getcontext().prec = 50

# 局部精度（不影響全域）
with localcontext() as ctx:
    ctx.prec = 200
    result = Decimal('1') / Decimal('7')
```

### 常用方法
```python
x = Decimal('3.14159')

x.quantize(Decimal('0.01'))      # 四捨五入到小數點後2位
x.normalize()                     # 移除尾部的零
x.as_tuple()                      # 轉為命名元組 (sign, digits, exponent)
x.to_eng_string()                 # 工程記號表示
```

## 競賽常用技巧

### 高精度除法
```python
from decimal import Decimal, getcontext
getcontext().prec = 100  # 設定足夠精度

# 計算 1/7 到小數點後100位
result = Decimal(1) / Decimal(7)
print(f"{result:.100f}")
```

### 比較大小（避免浮點誤差）
```python
from decimal import Decimal

a = Decimal('0.3')
b = Decimal('0.1') * 3

# ❌ 直接比較可能有問題
# print(a == b)  # 可能 False

# ✅ 用 quantize 統一精度後比較
print(a.quantize(Decimal('0.0001')) == b.quantize(Decimal('0.0001')))  # True
```

:::tip 競賽小提醒
- 初始化 Decimal 時**一定要用字串** `'0.1'`，不能用浮點數 `0.1`
- `getcontext().prec` 設太大會變慢，根據題目需求設定
- 需要四捨五入時用 `quantize()`，不要用 `round()`
:::
