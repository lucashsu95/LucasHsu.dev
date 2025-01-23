# loop 10 question answer

## 第一題
```python
result = ''

for i in range(9):
    for j in range(9):
        if i == j:
            result += "＊"
        else:
            result += "。"
    result += '\n'

print(result)
```

## 第二題
```python
result = ''

for i in range(9):
    for j in range(9):
        if i == 0 or j == 0 or i == 8 or j == 8:
            result += "＊"
        else:
            result += "。"
    result += '\n'

print(result)
```

## 第三題
```python
result = ''

for i in range(9):
    for j in range(9):
        if i == 4 or j == 4:
            result += "＊"
        else:
            result += "。"
    result += '\n'

print(result)
```

## 第四題
```python
for i in range(9):
    for j in range(9):
        if i < 5:
            print('＊',end='')
        else:
            print('．',end='')

    print()
```

## 第五題
```python
result = ''

for i in range(9):
    for j in range(9):
        if i < 5 and j < 5:
            result += "＊"
        else:
            result += "。"
    result += '\n'

print(result)
```

## 第六題
```python
result = ''

for i in range(9):
    for j in range(9, 0, -1):
        if j-1 == i:
            result += "＊"
        else:
            result += "。"
    result += '\n'

print(result)
```

## 第七題
```python
result = ''

for i in range(9, 0, -1):
    for j in range(9):
        if j == i+1 or j == i+3 or j == i+5 or j == i+7 or j == i-1 or j == i-3 or j == i-5 or j == i-7 or j== i-9:
            result += "＊"
        else:
            result += "。"
    result += '\n'

print(result)
```

## 第八題
```python
for i in range(9):
    for j in range(9):
        if (i + j) % 4 == 0:
            print('＊',end='')
        else:
            print('．',end='')
    print()
```

## 第九題
```python
result = ''

for i in range(9, 0, -1):
    for j in range(9):
        if j == i+3 or j == i+7 or j == i-1 or j == i-5 or j == i-9:
            result += "。"
        else:
            result += "＊"
    result += '\n'

print(result)
```

## 第十題
```python
result = ''

for i in range(9):
    for j in range(9):
        if i-1 >= j:
            result += "。"
        else:
            result += "＊"
    result += '\n'

print(result)
```

