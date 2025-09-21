---
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: python,正規表達式,regex,match,抓取
  - - meta
    - property: og:title
      content: Regex 正規表達式 - python
  - - meta
    - property: og:description
      content: 正規表達式是被用來匹配字串中字元組合的模式。
  - - meta
    - property: og:type
      content: article
---

# Regex 正規表達式 - Python

- [學習網站](https://regex101.com/)

## 範例1

```python
import re

with open("in.txt", "r") as f:
    lines = f.readlines()
    pattern = r'question:\s*"([^"]+)"'
    for line in lines:
        matchs = re.findall(pattern, line)
        with open("out.txt", "w") as out:
            for match in matchs:
                out.write(match + "\n")

```