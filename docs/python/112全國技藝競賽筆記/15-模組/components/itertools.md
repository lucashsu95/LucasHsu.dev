# 高效迭代器 itertools

排列組合神器

## permutations
```python
from itertools import permutations
a = '123'
print(list(permutations(a)))

'''
[('1', '2', '3'), ('1', '3', '2'), ('2', '1', '3'), 
('2', '3', '1'), ('3', '1', '2'), ('3', '2', '1')]
'''
```

## combinations
```python
from itertools import combinations
table = ['肉', '菜', '蛋', '果']
print(list(combinations(table,2)))

'''
[('肉', '菜'), ('肉', '蛋'), ('肉', '果')
, ('菜', '蛋'), ('菜', '果'), ('蛋', '果')]
'''
```

