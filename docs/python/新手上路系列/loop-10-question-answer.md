# loop 10 question answer

<SecretPage password="2025-1-11" />

## 第一題
```python
result = ''

for i in range(9):
    for j in range(9):
        if i == j:
            result += "＊"
        else:
            result += "．"
    result += '\n'

print(result)
```

## 第二題
```python
result = ''

for i in range(9):
    for j in range(9):
        if i in (0, 8) or j in (0, 8):
            result += "＊"
        else:
            result += "．"
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
            result += "．"
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
            result += "．"
    result += '\n'

print(result)
```

## 第六題
```python
result = ''

for i in range(8,-1,-1):
    for j in range(9):
        if i == j:
            result += "＊"
        else:
            result += "．"
    result += '\n'

print(result)
```

## 第七題
```python
result = ''

for i in range(9):
    for j in range(9):
        if (i + j) % 2 == 0:
            result += "＊"
        else:
            result += "．"
    result += '\n'

print(result)
```

## 第八題
```python
for i in range(9):
    for j in range(9):
        if (i + j) % 4 == 0:
            print('＊', end='')
        else:
            print('．', end='')
    print()
```

## 第九題
```python
result = ''

for i in range(8,-1,-1):
    for j in range(9):
        if (i + j) % 4 == 0:
            result += "＊"
        else:
            result += "．"
    result += '\n'

print(result)
```

## 第十題
```python
result = ''

for i in range(9):
    for j in range(9):
        if i <= j:
            result += "＊"
        else:
            result += "．"
    result += '\n'

print(result)
```