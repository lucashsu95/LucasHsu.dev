---
outline: "deep"
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: Python, python, 新手上路, 函式, def
  - - meta
    - name: og:title
      content: Python新手上路 Day8 - 函式與def
  - - meta
    - name: og:description
      content: 學習如何使用Python中的函式與def關鍵字來定義和呼叫函式
  - - meta
    - name: og:type
      content: article
---

# python-新手上路-Day8 ｜函式｜ def

## 介紹

`def`是 python 中的一個自訂函數，而自訂函數就是將自己所寫的程式碼定義成一個 function 的物件，而且可以在裡面任意的修改並且可以重複用，這樣如果遇到需要打到重複的程式碼的時候不用一直打只要執行這個函數即可

```python
def 函數名稱(參數)：
    程式碼
```

```python
def say():
    print("Hello")
    print("Hi")

say() # 在這裡呼叫
      # 如果沒有呼叫程式是不會執行的
```

在`def` 函式裡可以`回傳(return)` 東西

```python
def parity(number):
    a = number * 2
    return a
print(parity(2)) # 這時候呼叫完，parity(2) 就會變成4 然後就print(4)
```

## 區域變數(Local Variable)

在函式中所定義的變數就是區域變數。只有在函式的範圍中都可以進行存取，而函式以外的其它地方，則無法進行存取

```python
def calc_number():
    # 區域變數
    x = 20
print(x)
```

這樣會報錯 因為找不到 x 變數

找不到 x 是因為 x 是區域變數

## 全域變數(Global Variable)

可以使用`global`

```python
# 全域變數
x = 200

def calc_number():
    global x # 要下global才可以更改外面的值
    # 區域變數
    x = 20
calc_number()
print(x)
```

## 帶參數

> 就想成是到了一個變裝派對，你只是帶上了面具，但你還是你

在剛剛範例程式裡的函式`calc_number()` 的後面不是有括號嗎?
可以利用這個括號把變數或是值帶進去
在帶入`function`的時候參數名稱可能會不一樣

```python
def compute(a,b): #宣告函式且加入參數a,b
    return a+b  #回傳a+b

num,num2 = 5,10
print(compute(num,num2))
```

輸出 15

## 範例

接著，來看看 你是否真的懂了?

### 範例 1

```python
x = 200

def calc_number():
    x = 20 + 25
    print(x)

calc_number()
x -= 180
print(x)
```

::: details 看答案
輸出
45
20
:::

### 範例 2

```python
x = 20

def calc_number():
    print(x)

x = 3
calc_number()
print(x)
```

::: details 看答案
輸出
3
3
:::

### 範例 3

為了告訴 Python 我們要修改外部的 count 變數，我們使用 nonlocal 關鍵字，這樣 Python 就知道我們指的是外部的 count 變數，而不是創建一個新的局部變數。

```python
def fs():
    count = 0

    def inner():
        nonlocal count
        count += 1
        print(count)
    return inner

A = fs()
B = fs()
A()
B()
```

::: details 看答案
輸出
1
1
:::

## Def 函數優點

1. **重複利用性**：只要是需要重複的利用到一段程式碼時只要將程式碼寫成一個函數這樣需要用到時只要呼叫函數就好而不用一直重複打那段程式碼
2. **易讀性**：當寫成一個函數時在閱讀時只需要看函數裡面的程式碼而不用當個無頭蒼蠅一樣不知從何看起
3. **易除錯性**：當一個函數輸出不如所要的時候可以很方便的去檢查函數裡面是否有錯誤
4. **一致性**：當需要共同寫一個專案時，如果將程式包裝成一個函數後方便別人繼續接手以及後續的除錯跟維護
5. **模組化**：由上面的範例可得知，可以寫很多不同功能的函數，就像上面簡單的示範來說可以有輸出文字也可以有判斷奇偶數，每一個函數有其功能而不互相影響

## 牛刀小試

[程式語言 Python 第 5 類：函式(Function)](https://jbprogramnotes.com/2020/05/tqc-%e7%a8%8b%e5%bc%8f%e8%aa%9e%e8%a8%80python-%e7%ac%ac5%e9%a1%9e%ef%bc%9a%e5%87%bd%e5%bc%8ffunction/)
