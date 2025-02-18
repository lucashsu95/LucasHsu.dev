# String 10 question - answer

<SecretPage password="2024-3-9" />

## 第1題
```python
import sys
for line in sys.stdin.read().splitlines():
    if len(line) == 5 and line.isdigit():
        print('正確')
    else:
        print('不正確')
```

## 第2題
```python
import sys
for line in sys.stdin.read().splitlines():
    if len(line) >= 2 and line[0] == line[-1]:
        print('正確')
    else:
        print('不正確')
```

## 第3題
```python
import sys
for line in sys.stdin.read().splitlines():
    n = len(line)
    if n >= 3 and n % 2 == 1 and line[0] == line[n // 2] == line[-1]:
        print('正確')
    else:
        print('不正確')
```

## 第4題
```python
import sys
for line in sys.stdin.read().splitlines():
    if len(line) >= 5 and line[-1] != '.' and line.count('.') <= 1 and line.replace('.','').isdigit():
        print('正確')
    else:
        print('不正確')
```

## 第4題 V2
```python
import sys
for line in sys.stdin.read().splitlines():
    Lresult = "F"
    if len(line) == 5 and line.replace(".", "").isdigit():
        if line.count(".") == 0:
            Lresult = "T"
        if line.count(".") == 1 and line[-1] != ".":
            Lresult = "T"
    print(Lresult)
```

## 第5題
```python
import sys
for line in sys.stdin.read().splitlines():
    if len(line) >= 5 and line[-1] != '.' and line.count('.') <= 1 and line.replace('.','').isdigit():
        print('正確')
    else:
        print('不正確')
```

## 第5題 V2
```python
import sys

for line in sys.stdin.read().splitlines():

    Lresult = "F"

    if len(line) >= 5 and line.replace(".","").isdigit():
        
        if line.count(".") == 0:
            Lresult = "T"

        if line.count(".") == 1 and line[-1] != ".":
            Lresult = "T"
            
    print(Lresult)
```

## 第6題
```python
import sys
for line in sys.stdin.read().splitlines():
    result = False
    if len(line) == 5 :
        result = True
        for i in range(1,len(line)):
            if line[i-1] >= line[i]:
                result = False
    print(result)
```

## 第7題
```python
import sys
for line in sys.stdin.read().splitlines():
    result = False
    n = len(line)
    if n >= 2:
        result = all(line[i - 1] <= line[i] for i in range(1,n))
    print('正確' if result else '不正確')
```

## 第7題 V2
```python
import sys
for line in sys.stdin.read().splitlines():
    Lresult = "F"
    if len(line) > 1 :
        Lresult = "T"
        for i in range(1,len(line)):
            if line[i-1] > line[i]:
                Lresult = "F"
    print(Lresult)
```

## 第8題
```python
import sys

for line in sys.stdin.read().splitlines():
    result = False
    if len(line) > 1 :
        result = True
        switch = "a"
        
        for i in range(1,len(line)):
            if switch == "a":
                if line[i-1] > line[i]:
                    switch = "d"
            else:
                if line[i-1] < line[i]:
                    result = False

    print('正確' if result else '不正確')
```

## 第8題 V2
```python
import sys
for Lstr in sys.stdin.read().splitlines():
    Lresult = "F"
    if len(Lstr) > 1 :
        Lresult = "T"
        Lswitch = "a"
        for i in range(1,len(Lstr)):

            if Lswitch == "a":
                if Lstr[i-1] > Lstr[i]:
                    Lswitch = "d"
            else:
                if Lstr[i-1] < Lstr[i]:
                    Lresult = "F"
    print(Lresult)
```

## 第9題
```python
import sys
for n in sys.stdin.read().splitlines():
    n = n.strip()
    result = False
    B = n.replace('(','').replace(')','')
    # 字串內容至少有6碼 and 其內容只有數字及小括號 and 其中包括至少一組小括號 and 字串中的左括號及右括號個數相同
    if len(n) >= 6 and (B.isdigit() or B == '') and n.count('(') > 0 and n.count('(') == n.count(')'):
        cnt = 0
        result = True
        for i in n:
            if i == '(':
                cnt += 1
            elif i == ')':
                cnt -= 1
            if cnt < 0:
                result = False
    print('正確' if result else '不正確')
```

## 第10題
```python
import sys
for n in sys.stdin.read().splitlines():
    result = False
    B = n.replace('+','').replace('-','').replace('*','').replace('/','').replace('//','')
    if len(n) >= 3 and B.isdigit():
        result = True
        flag = 'oper'
        for i in n:
            if i.isdigit():
                flag = 'num'
            elif flag == 'num':
                flag = 'oper'
            else:
                result = False
    print('正確' if result else '不正確')
```

## 第10題 V2
```python
import sys
for n in sys.stdin.read().splitlines():
    result = False
    B = n.replace("+", "").replace("-", "").replace("*", "").replace("/", "").replace("//", "")
    if len(n) >= 3 and (B.isdigit()) and n[0].isdigit() and n[-1].isdigit() :
        result = True
        for i in range(1,len(n)):
            oper ="+-*/"
            M = oper.find(n[i-1])
            N = oper.find(n[i])
            if (M >= 0 and N>=0):
                result = False
    print('正確' if result else '不正確')


[看答案](./字串10題ans)
