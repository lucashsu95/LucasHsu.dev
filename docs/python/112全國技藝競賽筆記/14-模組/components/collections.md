---
outline: [2,3]
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: collections,Counter,defaultdict,python
  - - meta
    - property: og:title
      content: collections|python
  - - meta
    - property: og:description
      content: 實作了專門的容器資料類型，為 Python 的通用內建容器dict、list、set和tuple提供了替代方案
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/python/112全國技藝競賽筆記/14-模組/components/collections.html
---
# collections

## Counter
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

## defaultdict

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

好,最後是我們的`defaultdict`
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

---

## deque（雙端佇列）

`deque` 是雙端佇列，兩端新增刪除都是 O(1)，比 list 的 `pop(0)` 快很多。

```python
from collections import deque

dq = deque([1, 2, 3])

dq.append(4)        # 右端加入 → [1,2,3,4]
dq.appendleft(0)    # 左端加入 → [0,1,2,3,4]
dq.pop()            # 右端彈出 → [0,1,2,3]
dq.popleft()        # 左端彈出 → [1,2,3]
dq.rotate(1)        # 右旋轉 → [3,1,2]
dq.rotate(-1)       # 左旋轉 → [1,2,3]
```

:::tip 競賽常見用途
- **BFS/DFS** 用 `deque` 當佇列，`popleft()` 是 O(1)
- **滑動視窗** 用 `deque(maxlen=k)` 自動保持視窗大小
- **旋轉問題** 用 `rotate()`
:::

```python
# 滑動視窗
dq = deque(maxlen=3)
for x in [1, 2, 3, 4, 5]:
    dq.append(x)
    print(list(dq))  # [1,2,3] → [2,3,4] → [3,4,5]
```

---

## namedtuple

為 tuple 加上欄位名稱，讓程式碼更可讀。

```python
from collections import namedtuple

# 定義
Point = namedtuple('Point', ['x', 'y'])
# 或
Point = namedtuple('Point', 'x y')

# 使用
p = Point(3, 4)
print(p.x, p.y)    # 3 4
print(p[0], p[1])   # 3 4（也可以用索引）
print(p._asdict())  # {'x': 3, 'y': 4}

# 替換某個欄位
p2 = p._replace(x=10)
print(p2)  # Point(x=10, y=4)
```

:::tip 競賽常見用途
- DFS/BFS 回傳 `(座標, 距離)` 時，用 `namedtuple` 比 tuple 更清楚
- 排序時用 `key=lambda x: x.distance` 與 namedtuple 搭配
:::

---

## OrderedDict（有序字典）

Python 3.7+ 的 `dict` 已經保序了，但在舊版本或需要 `.move_to_end()` 時仍有用。

```python
from collections import OrderedDict

od = OrderedDict()
od['a'] = 1
od['b'] = 2
od['c'] = 3

od.move_to_end('a')      # 把 'a' 移到最後
od.move_to_end('c', last=False)  # 把 'c' 移到最前
print(list(od.keys()))   # ['c', 'b', 'a']

od.popitem(last=True)    # 彈出最後一項
od.popitem(last=False)   # 彈出第一項
```

---

## ChainMap（鏈式映射）

把多個 dict 合成一個視圖，查詢時按順序找。

```python
from collections import ChainMap

defaults = {'color': 'red', 'user': 'guest'}
env = {'color': 'blue'}

config = ChainMap(env, defaults)
print(config['color'])  # blue（env 優先）
print(config['user'])   # guest（env 沒有，找 defaults）

# 有新的 override
override = {'color': 'green', 'debug': True}
config2 = config.new_child(override)
print(config2['color'])  # green
```

:::tip 競賽常見用途
- 預設值 + 覆蓋值的合併
- 多層作用域查詢
:::

