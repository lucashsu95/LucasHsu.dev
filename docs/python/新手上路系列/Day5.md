---
outline: "deep"
---
<style>
.mm {
    color:tomato;
}
</style>
# python-新手上路-Day5｜List

> 程式設計師的生物鐘只有兩個狀態：coding和還沒寫完的coding。

列表是 Python 中常用的資料結構，用於儲存一系列元素。它具有彈性，可以容納不同類型的元素，如數字、字串、物件等。

## 建立列表

您可以使用以下方式建立一個列表：

```py
my_list = [元素1, 元素2, 元素3]
```


在這裡，您可以將任何想要儲存的元素放入方括號內，以逗號分隔。

## 訪問元素

列表中的元素可以通過索引訪問，索引從 0 開始。例如：

```py
first_element = my_list[0]
```

您還可以使用切片來獲取子列表：

```py
sub_list = my_list[1:]
```

## 列表方法

### 方法

Python 提供了多種方法來操作列表。以下是一些常用的方法示例：

- `append`：將新元素<span class='mm'>增加</span>到列表末尾。

    ```py
    my_list.append(新元素)
    ```

- `remove`：<span class='mm'>刪除</span>特定的元素。

    ```py
    my_list.remove(要刪除的元素)
    ```

- `insert`：在指定位置<span class='mm'>插入</span>新元素。

    ```py
    my_list.insert(位置, 新元素)
    ```
    
### 範例
還是看不懂，範例不就來了嗎

- append：將新元素<span class='mm'>增加</span>到列表末尾。
    ```py
    my_list = [1, 2, 3]
    my_list.append(4)
    print(my_list)  # 輸出：[1, 2, 3, 4]
    ```
- remove：<span class='mm'>刪除</span>特定的元素。
    ```py
    my_list = [1, 2, 3, 4, 3]
    my_list.remove(3)  # 刪除第一個出現的3
    print(my_list)  # 輸出：[1, 2, 4, 3]
    ```
- insert：在指定位置<span class='mm'>插入</span>新元素。
    ```py
    my_list = [1, 2, 3]
    my_list.insert(1, 4)  # 在索引1的位置插入4
    print(my_list)  # 輸出：[1, 4, 2, 3]
    ``` 

## 列表操作

除了上述方法外，您還可以進行其他操作，如<span class='mm'>排序、反轉</span>等。例如：

- ### 排序列表
    ```py
    my_list.sort()
    ```

- ### 反轉列表
    ```py
    my_list.reverse()
    ```

## 範例
來確任看看到底有沒有懂?

### 氣泡排序
```py
A = [21, 1, 3]
for i in range(len(A)):
    for j in range(i + 1, len(A)):
        if A[i] > A[j]:
            A[i], A[j] = A[j], A[i]
print(A)
```
輸出:
```
[1, 3, 9, 21]
```
## 牛刀小試

[TQC+ 程式語言Python 第6類：串列(List)的運作](https://jbprogramnotes.com/2020/05/tqc-%e7%a8%8b%e5%bc%8f%e8%aa%9e%e8%a8%80python-%e7%ac%ac6%e9%a1%9e%ef%bc%9a%e4%b8%b2%e5%88%97list%e7%9a%84%e9%81%8b%e4%bd%9c%e4%b8%80%e7%b6%ad%e3%80%81%e4%ba%8c%e7%b6%ad%e4%bb%a5%e5%8f%8a%e5%a4%9a/)
