---
outline: "deep"
---

# python-新手上路-Day6｜dict｜set

> 字典就像是程式設計的魔法書，只要知道了魔咒（鍵），就能召喚出所需的魔法（值）

今天要講的是python 的兩個形態一個是<span class='m'>字典dict</span>一個是<span class='m'>集合set</span>

## 字典（Dictionary）介紹

:::info 格式
key：value
:::

字典是 Python 中的一種<span class='m'>資料結構</span>，用於儲存<span class='m'>鍵（key）</span>與相應的<span class='m'>值（value）</span>之間的映射關係。

字典的特點包括：

1. 鍵（key）是唯一的：每個鍵在字典中只能出現一次。
2. 鍵（key）必須是不可變的資料類型，例如字串、數字或元組，而值（value）可以是任意資料類型。
3. 字典是無序的，無法通過索引訪問元素，而是通過鍵（key）來訪問相應的值。
以下是字典的一個簡單示例：

```py
student_scores = {
    "Alice": 85, # key : value
    "Bob": 70,
    "Charlie": 92,
    "David": 78
}
```

在這個示例中，student_scores 是一個字典，每個學生的名字作為鍵，他們的分數作為<span class='m'>值</span>。你可以通過<span class='m'>鍵</span>來訪問每個學生的分數，例如 student_scores["Alice"] 將返回 85。

### 字典的操作範例

> 字典就像是一本魔法書，你可以用鑰匙（鍵）查找任何東西的位置，當然前提是你記得在哪頁寫了它。

* 添加鍵值對：你可以使用 `字典名[鍵] = 值` 的方式來添加新的鍵值對。
* 獲取值：通過鍵來獲取相應的值，例如 `字典名[鍵]`。
* 修改值：直接將指定鍵的值進行修改，例如 `字典名[鍵] = 新值`。
* 刪除鍵值對：使用 `del 字典名[鍵]` 來刪除指定的鍵值對。
* 鍵是否存在：使用 `鍵 in 字典名` 來檢查指定的鍵是否存在於字典中。

```py{1,5,9,13} [number]
# 添加鍵值對：
student_scores["Eve"] = 95
# 現在字典變為 {"Alice": 85, "Bob": 70, "Charlie": 92, "David": 78, "Eve": 95}

# 修改值：
student_scores["Charlie"] = 88
# 現在字典變為 {"Alice": 85, "Bob": 70, "Charlie": 88, "David": 78, "Eve": 95}

# 刪除鍵值對：
del student_scores["Bob"]
# 現在字典變為 {"Alice": 85, "Charlie": 88, "David": 78, "Eve": 95}

# 檢查鍵是否存在：
is_alice_present = "Alice" in student_scores  # 結果為 True
is_bob_present = "Bob" in student_scores  # 結果為 False
```

### 字典的常用函式和方法
* `len(dict)`: 返回字典中的鍵值對數量。
* `dict.keys()`: 返回包含所有鍵的列表。
* `dict.values()`: 返回包含所有值的列表。
* `dict.items()`: 返回包含所有鍵值對的列表，每個鍵值對都以元組形式（key, value）存在。

```py {8,12,16,20}
student_scores = {
    "Alice": 85,
    "Bob": 70,
    "Charlie": 92,
    "David": 78
}

# 獲取字典中的鍵值對數量
num_entries = len(student_scores)
# 結果為 4

# 獲取所有鍵的列表
keys_list = list(student_scores.keys())
# 結果為 ["Alice", "Bob", "Charlie", "David"]

# 獲取所有值的列表
values_list = list(student_scores.values())
# 結果為 [85, 70, 92, 78]

# 獲取所有鍵值對的列表
items_list = list(student_scores.items())
# 結果為 [("Alice", 85), ("Bob", 70), ("Charlie", 92), ("David", 78)]
```

### Dict 牛刀小試

#### 練習題目 1: 成績統計
假設你有一個字典，其中存儲了一個班級的學生姓名和對應的數學成績。請完成以下任務：
```py
student_scores = {
    "Alice": 85,
    "Bob": 70,
    "Charlie": 92,
    "David": 78
}
```
1. 創建一個字典 student_scores，包含至少 5 個學生的姓名和成績。
2. 計算所有學生的平均成績。
3. 找出成績最高的學生姓名和分數。
4. 找出成績最低的學生姓名和分數。
5. 刪除一個學生的鍵值對。

#### 練習題目 2: 電子字典
你想創建一個簡單的英文單詞電子字典，用於查詢單詞的定義。請完成以下任務：
```py
english_dictionary = {
    "apple": "a round fruit with red or green skin and firm white flesh",
    "banana": "a long curved fruit with a thick yellow skin",
    "cat": "a small domesticated carnivore",
    "dog": "a domesticated mammal that is commonly kept as a pet",
    "elephant": "a large plant-eating mammal with a long trunk and tusks"
}

```
1. 創建一個字典 english_dictionary，其中包含至少 5 個英文單詞作為鍵，並對應它們的定義作為值。
2. 提示使用者輸入一個英文單詞，然後顯示該單詞的定義。如果字典中沒有這個單詞，則顯示一條提示訊息。


## 集合（Set）介紹

> 集合就像是一場派對，每個人都只能來一次，不管你有多少個相同的名牌。

::: danger 重要特性
集合是一種用於存儲多個獨一無二元素的數據結構，它不允許<span class='m'>重複的值</span>存在其中。在程式設計中，集合常常用於需要確保元素唯一性的場合。
:::

### 集合的操作範例

```py {1,6,10}
# 新增
# 使用花括號 {} 或者內建的 set() 函數來創建一個集合。
my_set = {1, 2, 3, 4, 5}
another_set = set([3, 4, 5, 6, 7])

# 添加元素
# 使用 add() 方法來向集合中添加元素，如果元素已經存在，則不會重複添加。
my_set.add(6)

# 刪除元素
# remove() 或 discard() 方法來刪除集合中的元素，如果元素不存在，remove() 會引發錯誤，而 discard() 不會。
my_set.remove(2)
my_set.discard(2)
```

### 集合操作
> 集合的交集就像是朋友的共同興趣，如果你們共同喜歡吃披薩，那就是你們的交集。

你可以進行集合間的<span class='m'>交集、聯集、差集</span>等操作。
```py
set1 = {1, 2, 3, 4, 5}
set2 = {4, 5, 6, 7, 8}

intersection = {4, 5}  # 交集
union = {1, 2, 3, 4, 5, 6, 7, 8}  # 聯集
difference = {1, 2, 3}  # 差集
```

迭代集合
你可以使用迴圈來迭代集合中的元素。
```py
for item in my_set:
    print(item)
```

### Set 牛刀小試

#### 子集合與超集合

請撰寫一程式，依序輸入五個、三個、九個整數，並各自儲存到集合set1、set2、set3中。<br>
接著回答：set2是否為set1的子集合（subset）？set3是否為set1的超集合（superset）？<br>
輸入與輸出會交雜如下，輸出的部份以粗體字表示

[TQC+ 程式語言Python 705 子集合與超集合](https://jbprogramnotes.com/2020/05/tqc-%e7%a8%8b%e5%bc%8f%e8%aa%9e%e8%a8%80python-705-%e5%ad%90%e9%9b%86%e5%90%88%e8%88%87%e8%b6%85%e9%9b%86%e5%90%88/)

```
3
28
-2
7
39
Input to set2:
2
77
0
Input to set3:
3
28
12
99
39
7
-1
-2
65
set2 is subset of set1: False
set3 is superset of set1: True
```