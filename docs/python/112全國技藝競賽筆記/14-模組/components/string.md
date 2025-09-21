---
outline: [2,3]
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: ASCII,標點符號,python
  - - meta
    - property: og:title
      content: 生成所有標點符號、ASCII|python|string模組
  - - meta
    - property: og:description
      content: 展示了如何使用Python的string模組中的常量和函式，以便在處理字符串時提高效率與簡潔性
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/python/112全國技藝競賽筆記/14-模組/components/string.html
---

# string模組的應用

## **1. `string.ascii_letters`**
包含所有ASCII字母（大寫和小寫）的字串。

```python
import string

# 使用 string.ascii_letters
letters = string.ascii_letters
print(letters)  # 輸出: abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
```

## **2. `string.ascii_lowercase`**
包含所有ASCII小寫字母的字串。

```python
import string

# 使用 string.ascii_lowercase
lowercase_letters = string.ascii_lowercase
print(lowercase_letters)  # 輸出: abcdefghijklmnopqrstuvwxyz
```

## **3. `string.ascii_uppercase`**
包含所有ASCII大寫字母的字串。

```python
import string

# 使用 string.ascii_uppercase
uppercase_letters = string.ascii_uppercase
print(uppercase_letters)  # 輸出: ABCDEFGHIJKLMNOPQRSTUVWXYZ
```

## **4. `string.digits`**
包含所有數字0到9的字串。

```python
import string

# 使用 string.digits
digits = string.digits
print(digits)  # 輸出: 0123456789
```

## **5. `string.hexdigits`**
包含所有十六進制數字（0-9，a-f，A-F）的字串。

```python
import string

# 使用 string.hexdigits
hex_digits = string.hexdigits
print(hex_digits)  # 輸出: 0123456789abcdefABCDEF
```

## **6. `string.octdigits`**
包含所有八進制數字（0-7）的字串。

```python
import string

# 使用 string.octdigits
oct_digits = string.octdigits
print(oct_digits)  # 輸出: 01234567
```

## **7. `string.punctuation`**
包含所有標點符號的字串。

```python
import string

# 使用 string.punctuation
punctuation_chars = string.punctuation
print(punctuation_chars)  # 輸出: !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
```

## 其他常量與範例

### **1. `string.whitespace`**
包含所有空白字元（空格、制表符、換行符等）的字串。

```python
import string

# 使用 string.whitespace
whitespace_chars = string.whitespace
print(repr(whitespace_chars))  # 輸出: ' \t\n\r\x0b\x0c'
```

### **2. `string.printable`**
包含所有可列印字元的字串（包括字母、數字和標點符號）。

```python
import string

# 使用 string.printable
printable_chars = string.printable
print(printable_chars)  # 輸出: 包含所有可列印字符的字符串。
```

### **3. `string.capwords(s, sep=None)`**
將字串s中的單詞的首字母轉為大寫，其他字母轉為小寫，使用可選的分隔符sep分隔單詞。

```python
import string

# 使用 string.capwords 函式
text = "hello world"
capitalized_text = string.capwords(text)
print(capitalized_text)  # 輸出: Hello World

text_with_sep = "hello,world"
capitalized_text_with_sep = string.capwords(text_with_sep, sep=',')
print(capitalized_text_with_sep)  # 輸出: Hello,World
``` 