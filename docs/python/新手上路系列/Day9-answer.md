# loop 10 question answer

<SecretPage password="2025-7-10" />

### 第 1 題：奇偶數分類

```python
nums = list(map(int, input().split()))
odd = [str(n) for n in nums if n % 2 == 1]
even = [str(n) for n in nums if n % 2 == 0]
print("奇數列表:" + " ".join(odd))
print("偶數列表:" + " ".join(even))
```

---

### 第 2 題：列表元素去重複

```python
nums = list(map(int, input().split()))
unique = []
for n in nums:
    if n not in unique:
        unique.append(n)
print(" ".join(map(str, unique)))
```

---

### 第 3 題：找出重複元素，並且用逗號分開

```python
nums = list(map(int, input().split()))
seen = set()
dups = set()
for n in nums:
    if n in seen:
        dups.add(n)
    else:
        seen.add(n)
print(",".join(map(str, sorted(dups))))
```

---

### 第 4 題：列表切片

```python
nums = list(map(int, input().split()))
start, end = input().split(":")
start = int(start)
end = int(end)
print(" ".join(map(str, nums[start:end])))
```

---

### 第 5 題：排序遞增或遞減

```python
nums = list(map(int, input().split()))
mode = int(input())
if mode == 1:
    nums.sort()
else:
    nums.sort(reverse=True)
print(" ".join(map(str, nums)))
```

---

### 第 6 題：顯示最大三個數

```python
nums = [int(input()) for _ in range(6)]
nums.sort(reverse=True)
print(" ".join(map(str, nums[:3])))
```

---

### 第 7 題：奇偶位置交換

```python
nums = list(map(int, input().split()))
for i in range(0, len(nums), 2):
    nums[i], nums[i+1] = nums[i+1], nums[i]
print(" ".join(map(str, nums)))
```

---

### 第 8 題：是否為單調陣列（不含重複值）

```pythonw
    nums = list(map(int, line.split(',')))
    if len(nums) != len(set(nums)):
        print("false")
    else:
        if all(nums[i] < nums[i+1] for i in range(len(nums)-1)) or all(nums[i] > nums[i+1] for i in range(len(nums)-1)):
            print("true")
        else:
            print("false")
```
