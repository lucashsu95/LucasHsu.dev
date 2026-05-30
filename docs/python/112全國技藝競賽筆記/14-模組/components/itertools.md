---
outline: [2,3]
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: itertools,迭代,python
  - - meta
    - property: og:title
      content: itertools|python
  - - meta
    - property: og:description
      content: 本章節介紹python模組itertools的運用，python程式碼提供範例。
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/python/112全國技藝競賽筆記/14-模組/components/itertools.html
---

# 高效迭代器 itertools

`permutations` 和 `combinations` 是 Python 的 `itertools` 模組中兩個常用的函數，用於生成排列和組合。

## permutations
`permutations` 函數用於生成給定序列的所有排列。排列是指在不考慮順序的情況下，從序列中選取元素並重新排列的所有可能方式。

### 語法
```python
itertools.permutations(iterable, r=None)
```
- `iterable`：要生成排列的序列。
- `r`：排列的長度。如果未指定，則默認為序列的長度。

### 範例1
```python
import itertools

data = ['A', 'B', 'C']
result = list(itertools.permutations(data))
print(result)
```
輸出：
```
[('A', 'B', 'C'), ('A', 'C', 'B'), ('B', 'A', 'C'), ('B', 'C', 'A'), ('C', 'A', 'B'), ('C', 'B', 'A')]
```

### 範例2
```python
from itertools import permutations
a = '123'
print(list(permutations(a)))
```
輸出：
```
[('1', '2', '3'), ('1', '3', '2'), ('2', '1', '3'), ('2', '3', '1'), ('3', '1', '2'), ('3', '2', '1')]
```

## combinations
`combinations` 函數用於生成給定序列的所有組合。組合是指在不考慮順序的情況下，從序列中選取元素的所有可能方式。

:::info 小知識
生成的組合中不允許有重複的元素。這意味著每個元素在組合中只能出現一次。
:::

### 語法
```python
itertools.combinations(iterable, r)
```
- `iterable`：要生成組合的序列。
- `r`：組合的長度。

### 範例1
```python
import itertools

data = ['A', 'B', 'C']
result = list(itertools.combinations(data, 2))
print(result)
```
輸出：
```
[('A', 'B'), ('A', 'C'), ('B', 'C')]
```

### 範例1
```python
from itertools import combinations
table = ['肉', '菜', '蛋', '果']
print(list(combinations(table,2)))
```
輸出：
```
[('肉', '菜'), ('肉', '蛋'), ('肉', '果'), ('菜', '蛋'), ('菜', '果'), ('蛋', '果')]
```

### combinations_with_replacement 

:::info 小知識
生成的組合中允許有重複的元素。這表示同一個元素可以在組合中出現多次。
:::

例如，對於相同的集合 `['A', 'B', 'C']`，調用 `combinations_with_replacement('ABC', 2)` 會產生 `('A', 'A'), ('A', 'B'), ('A', 'C'), ('B', 'B'), ('B', 'C'), ('C', 'C')` 這樣的結果`23`。

## product（笛卡爾積）

產生多個可迭代物件的**所有組合**（含重複），等同於多層 for 迴圈。

```python
from itertools import product

# 等同於 for i in [1,2]: for j in ['a','b']:
print(list(product([1, 2], ['a', 'b'])))
# [(1,'a'), (1,'b'), (2,'a'), (2,'b')]

# 重複自己的多次
print(list(product('AB', repeat=2)))
# [('A','A'), ('A','B'), ('B','A'), ('B','B')]
```

:::info 與 combinations 的差異
- `combinations`：**不重複、不計順序**
- `product`：**可重複、計順序**
:::

```python
# 競賽常用：枚舉所有可能性
# 例如：N個位置，每個位置可以選 0~9
for digits in product(range(10), repeat=N):
    # digits 是一個 N 元組
    pass
```

---

## chain（串接多個序列）

把多個可迭代物件串成一個連續的序列。

```python
from itertools import chain

a = [1, 2, 3]
b = ['a', 'b']
c = [10, 20]

print(list(chain(a, b, c)))
# [1, 2, 3, 'a', 'b', 10, 20]
```

:::info 與 + 的差異
`chain` 是**惰性求值（lazy）**，不會一次性建立新列表，記憶體更省。
:::

```python
# 也可接受多個可迭代物件
from itertools import chain
lists = [[1, 2], [3, 4], [5, 6]]
flat = list(chain.from_iterable(lists))
print(flat)  # [1, 2, 3, 4, 5, 6]
```

---

## islice（序列切片）

對**迭代器**做切片，不會把整個序列載入記憶體。

```python
from itertools import islice

data = range(1000000)

# 取第 100~200 項（index 100~199）
print(list(islice(data, 100, 200)))

# 取前 5 項
print(list(islice(data, 5)))

# 每隔 2 項取一個（step）
print(list(islice(data, 0, 20, 2)))
# [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
```

:::tip 競賽常用
讀取大量輸入時，用 `islice` 取前 N 筆：
```python
import sys
from itertools import islice

for line in islice(sys.stdin, 100):
    print(line.strip())
```
:::

---

## groupby（分組）

將**已排序**的序列按 key 分組。⚠️ **必須先排序**！

```python
from itertools import groupby

data = [('A', 1), ('B', 2), ('A', 3), ('B', 4), ('A', 5)]

# 先排序（按第一個元素）
data.sort(key=lambda x: x[0])

for key, group in groupby(data, key=lambda x: x[0]):
    print(key, list(group))
```
輸出：
```
A [('A', 1), ('A', 3), ('A', 5)]
B [('B', 2), ('B', 4)]
```

```python
# 競賽常見：統計連續相同元素
s = "aaabbbcc"
for char, group in groupby(s):
    print(char, sum(1 for _ in group))
# a 3, b 3, c 2
```

---

## accumulate（累加）

產生累計運算的結果序列。

```python
from itertools import accumulate
import operator

data = [1, 2, 3, 4, 5]

# 預設：累加
print(list(accumulate(data)))
# [1, 3, 6, 10, 15]

# 自訂運算：累乘
print(list(accumulate(data, operator.mul)))
# [1, 2, 6, 24, 120]

# 最大值
print(list(accumulate(data, max)))
# [1, 2, 3, 4, 5]
```

:::tip 競賽常用
- 前綴和（prefix sum）直接用 `accumulate`
- 動態規劃的狀態轉移也可搭配
:::

---

## compress（條件篩選）

根據布林遮罩篩選元素。

```python
from itertools import compress

data = ['A', 'B', 'C', 'D', 'E']
mask = [1, 0, 1, 0, 1]  # True/False 都行

print(list(compress(data, mask)))
# ['A', 'C', 'E']
```

---

## 總結

| 函式 | 用途 | 競賽場景 |
|------|------|----------|
| `permutations` | 排列（計順序） | 全排列枚舉 |
| `combinations` | 組合（不計順序） | 選取、子集 |
| `combinations_with_replacement` | 可重複組合 | 有放回選取 |
| `product` | 笛卡爾積 | 多層枚舉、N進位 |
| `chain` | 串接序列 | 合併多個輸入 |
| `islice` | 迭代器切片 | 大量資料取前N筆 |
| `groupby` | 分組（需先排序） | 統計連續元素 |
| `accumulate` | 累計運算 | 前綴和 |
| `compress` | 條件篩選 | 根據遮罩選取 |