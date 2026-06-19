---
theme: seriph
base: /LucasHsu.dev/slides/python-day01/
title: python Day01
layout: cover
---

# python Day01

<p class="text-lg text-gray-400 mt-2">Variables · Input/Output Functions</p>

<div class="mt-16 text-center">
  <p class="text-base text-gray-500">Master variables, input, and output functions through this Python tutorial</p>
  <p class="text-xs text-gray-600 mt-1">2026 — Python Beginner Series</p>
</div>

---

# Input Functions

## Single Line Input

In Python, we use the `input()` function to receive user input:

```python
n = input()
nn = input('請輸入一些字')
```

### Code Examples

```python
# Basic input
name = input()
print(f"Hello, {name}!")

# With prompt
age = input('請輸入年齡: ')
print(f"You are {age} years old")
```

---

# Multi-Line Input

## Method 1: Using sys.stdin

```python
import sys

# Read all lines from standard input
for line in sys.stdin:
    line = line.strip()
    print(line)
```

## Method 2: Using while loop

```python
while True:
    try:
        n = input()
        print(n)
    except:
        break
```

## File Input Example

Create `a.py`:

```python
a = input()
b = input()
print(a,b)
```

Create `in.txt`:

```
Everything will get better
12345
```

Run in terminal:

```sh
python a.py < in.txt
```

Output:
```
Everything will get better 12345
```

---

# File Input with Chinese Characters

If `in.txt` contains Chinese characters:

```python
import sys

# Configure UTF-8 encoding
sys.stdin.reconfigure(encoding="utf-8")
for line in sys.stdin:
    print(line)
```

Save output to file:

```sh
python a.py < in.txt > out.txt
```

---

# Output Functions

## Basic Print

The `print()` function displays results on screen:

```python
print('hi')
print('hi')
# Output:
# hi
hi
```

## Disable Automatic Line Break

Python's `print()` automatically adds newlines:

```python
print('hi', end='')
print('hi')
# Output:
# hihi
```

---

# Variables and Data Types

## Variable Declaration

Variables store data in Python. Think of them like containers:

```python
int_val = 10
float_val = 12.3
str_val = 'hello python'
boolean_val = True
nv = None

print(int_val, float_val, str_val, boolean_val)
print(type(int_val))
print(type(float_val))
print(type(str_val))
print(type(boolean_val))
print(nv)
```

## Common Python Types

- `int` (整數): 10
- `float` (浮點數): 12.3
- `str` (字串): 'hello python'
- `bool` (布林值): True/False
- `None`: null value

---

# Strings vs Numbers

## Type Distinction

In Python, data type matters:

```python
'hello'  # String
123      # Number
```

## Key Question

Is `'123'` the same type as `123`?

**Answer: No!**

How to distinguish:
- Single quotes `'` or double quotes `"` → String
- No quotes → Number

---

# Boolean Values

## Boolean Type

Boolean is a data type with only two values:

- `True` (真)
- `False` (假)

## Comparison Operators

| Operator | Effect |
|----------|--------|
| `x < y` | X 是否小於 Y |
| `x <= y` | X 是否小於等於 Y |
| `x > y` | X 是否大於 Y |
| `x >= y` | X 是否大於等於 Y |
| `x == y` | X 是否等於 Y |
| `x != y` | X 是否不等於 Y |

```python
10 <= 60      # True
123 == 123    # True
20 == 40      # False
'123' == 123  # False
```

## Compound Conditions

### Logical AND

`a and b` - Both conditions must be true

### Logical OR

`a or b` - Either condition must be true

### Logical NOT

`not A` - If A is True, returns False; if A is False, returns True

```python
boolean = 12 + 4 > 80
print(boolean)  # False
```

## Practical Example

```python
# Check if number is multiple of 3 and 5
number = int(input())  # Input a number
print(number % 3 == 0 and number % 5 == 0)
```

---

# Mathematical Operators

## Available Operations

| Method | Code |
|--------|------|
| Addition | `n + 2` |
| Subtraction | `n - 2` |
| Multiplication | `n * 2` |
| Division | `n / 2` |
| Integer Division | `n // 2` |
| Power | `n ** 6` |
| Modulo (Remainder) | `n % 6` |

## Examples

```python
n = 10
print(n + 2)    # 12
print(n - 2)    # 8
print(n * 2)    # 20
print(n / 2)    # 5.0
print(n // 2)   # 5
print(n ** 6)   # 1000000
print(n % 6)    # 4
```

---

# Summary

## What We've Learned

1. **Input Functions**: `input()` for single-line, `sys.stdin` for multi-line
2. **Output Functions**: `print()` with optional `end=''` parameter
3. **Variables**: Declaration with `=`, type checking with `type()`
4. **Data Types**: int, float, str, bool, None
5. **Type Distinction**: Strings vs Numbers
6. **Boolean Logic**: Comparison operators, compound conditions
7. **Math Operations**: +, -, *, /, //, **, %

## Practice Exercise

```python
# Create a program that:
1. Asks for user's name
2. Asks for age
3. Prints greeting with name and age
4. Checks if age is even or odd

name = input("What's your name? ")
age = int(input("How old are you? "))
print(f"Hello, {name}! You are {age} years old.")
print(f"Your age is {'even' if age % 2 == 0 else 'odd'}.")
```

---

# Thank You

<p class="text-lg text-gray-400">Python Day01 Complete</p>

<div class="mt-16 text-center">
  <p class="text-base text-gray-500">Continue your Python learning journey</p>
  <p class="text-xs text-gray-600 mt-1">Next: Python Day02 - Control Flow</p>
</div>
