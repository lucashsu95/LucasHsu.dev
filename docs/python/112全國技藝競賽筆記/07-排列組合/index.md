# 排列組合

## 基本排列

123的排列組合有
123
132
213
231
312
321

::: warning
順序是有差的
:::

### 程式碼
```python
def permutations(nums):
    if len(nums) == 1:
        yield nums
    else:
        for i in range(len(nums)):
            for j in permutations(nums[:i] + nums[i+1:]):
                yield [nums[i]] + j

nums = [1, 2, 3]
a = list(permutations(nums))
print(a)
```

## 條件排列

希望 ['肉', '菜', '蛋', '果']

變成

('肉', '菜'), ('肉', '蛋'), ('肉', '果')
, ('菜', '蛋'), ('菜', '果'), ('蛋', '果')

### 程式碼
```python
def combinations(nums, r):
    if r == 1:
        for i in nums:
            yield [i]
    else:
        for i in range(len(nums)):
            for j in combinations(nums[i+1:], r-1):
                yield [nums[i]] + j


nums = [1, 2, 3]
a = list(combinations(nums, 2))
print(a)
```

## itertools 高級迭帶器

可以自己寫,但也可以引用別人己經做好的
[連結](../15-模組/components/itertools.md)