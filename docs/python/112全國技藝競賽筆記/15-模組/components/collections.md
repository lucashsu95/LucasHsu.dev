# collections

## collections.Counter
計數神器

```python
from collections import Counter
nums = ['gfg','gfg','ttu','aoq','gfg','ttu']
c = Counter(nums)

# 全部列出來
print(list(c.items()))# [('gfg', 3), ('ttu', 2), ('aoq', 1)]

# 找最大
print(c.most_common(1)) # [('gfg', 3)]

# 找第二大
cc = c.most_common(2)
# cc = [('gfg', 3), ('ttu', 2)]
print(cc[1])
```

---

## collections.defaultdict
英 -> 中
default : 預設
dict : 字典

像是普通我們用`dict`做記算字串出現的時候會這樣做
這是會輸入的資料
```python
inp = ['a','a','b','c','a','b']
```
```python
Ldict = dict()
for i in inp:
    if i not in Ldict:
        Ldict[i] = 0
    Ldict[i] += 1
```

但也可以這樣做
利用get函式的預設屬性
```python
Ldict = dict()
for i in inp:
    Ldict[i] = Ldict.get(i,0) + 1
```

好,最後是我們的
```python
Ldict = defaultdict(int)
for i in inp:
    Ldict[i] += 1
```
這只是簡單的範例操作,做樹或圖的題目的時候會先把資料結構用好,會比較覺得好用,字數計算出現次數就直接用`Counter`就好了



## 操作

1. **`elements()`方法**：返回一個反覆運算器，按照計數的順序依次重複每個元素。如果元素的計數小於1，則不會包括在返回的反覆運算器中。

2. **`subtract()`方法**：從當前計數器中減去另一個可反覆運算物件中的元素。它會更新計數器中元素的計數。

3. **`update()`方法**：將另一個可反覆運算物件中的元素添加到當前計數器中。它會增加計數器中元素的計數。

4. **`clear()`方法**：清空計數器，將所有元素的計數重置為零。

5. **`copy()`方法**：創建並返回計數器的一個副本。

6. **`keys()`方法**：返回計數器中的唯一元素，以清單形式返回。

7. **`values()`方法**：返回計數器中的計數值，以列表形式返回。

8. **`items()`方法**：返回計數器中的元素及其計數值，以元組形式的列表返回。

9. **`most_common(n)`方法**：返回計數器中出現次數最多的前n個元素及其計數，以清單形式返回。

10. **`__getitem__(elem)`方法**：以元素作為鍵，返回元素的計數值。



