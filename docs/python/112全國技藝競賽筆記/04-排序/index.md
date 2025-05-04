---
outline: "deep"
---

# Python的排序

## 排序的函式預設都是由第一個從小到大

```python
ary = [2,1,3]
ary.sort()
# 或
a = sorted(ary)
# 會輸出[1, 2, 3]
```


## 如果今天要從大到小呢?

```python
ary = [2,1,3]
ary.sort(reverse=True)
# 或
a = sorted(ary,reverse=True)

# 會輸出[3, 2, 1]
```


## 如果今天要指定大小呢 ?

x 是參數(名字可以自己取)

```python
ary = [(1,55),(2,11),(3,11)]
ary.sort(key=lambda x: x[1])
a = sorted(ary,key=lambda x: x[1])

# 會輸出[(2, 11), (3, 11), (1, 55)]
```
這樣會依照裡面的第1個值做排序(不是第0個)

好 太好了會針對排序了

## 如果今天要從大到小再從從小到大呢?
如果問題是有二個項目，項目二由大到小，項目二都一樣的話，再依照項目一由小到大呢?

```python
ary = [(1,55),(2,11),(3,11)]
ary.sort(key=lambda x: (-x[1],x[0]))
a = sorted(ary,key=lambda x: (-x[1],x[0]))
```

沒錯 `加個負號`就可以由大到小了(是不是超方便?)
用括號括起來 會先判斷第一個在依序判斷 !

想要練習可以在

- [Domjudge](https://zerojudge.ntub.tw/)裡的 111_1130 的 `I`
- [UVA 的 `c012`](https://zerojudge.tw/ShowProblem?problemid=c012)

## 資料來源
* [那些前端不用會，但是可以會的資料結構與演算法系列 第 17 篇](https://reurl.cc/GKy73d)
