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

## 總結
- **`permutations`**：生成所有可能的排列，考慮順序。
- **`combinations`**：生成所有可能的組合，不考慮順序。