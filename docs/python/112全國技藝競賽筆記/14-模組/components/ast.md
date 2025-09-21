---
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: ast,python,抽象語法樹
  - - meta
    - property: og:title
      content: 抽象語法樹|python
  - - meta
    - property: og:description
      content: 本章節介紹抽象語法樹，python程式碼提供範例。
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/python/112全國技藝競賽筆記/14-模組/components/ast.html
---

# ast抽象語法樹

## 介紹

當使用Python的`ast`模組時，你通常會分為兩個主要步驟：解析原始程式碼以構建AST，然後遍歷AST節點以執行所需的操作。以下是一個簡單的示例，演示如何使用`ast`模組來解析Python代碼並遍歷AST節點以查找函式定義。

首先，我們需要導入`ast`模組：

```python
import ast
```

然後，讓我們看一個示例，假設我們有以下Python代碼：

```python
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b
```

我們可以使用`ast`模組來解析這段代碼並查找其中的函式定義：

```python
source_code = """
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b
"""

# 解析原始程式碼並構建AST
parsed_code = ast.parse(source_code)

# 遍歷AST以查找函式定義
for node in ast.walk(parsed_code):
    if isinstance(node, ast.FunctionDef):
        print(f"Found function: {node.name}")
```

在這個示例中，我們首先使用`ast.parse()`函數將原始程式碼解析為AST。然後，我們使用`ast.walk()`函數遍歷AST中的所有節點，並檢查是否某個節點是`ast.FunctionDef`類型的，如果是，則列印出函數的名稱。這將輸出：

```
Found function: add
Found function: subtract
```

這是一個簡單示例，演示了如何使用`ast`模組解析Python代碼並查找特定類型的節點。你可以根據需要執行更複雜的分析和操作。`ast`模組為更複雜的用例提供了豐富的功能，如修改AST以進行代碼轉換、查找特定模式的代碼等。

## 進階

除了函式定義外，`ast`模組還允許你分析Python代碼中的其他類型的語句、運算式和結構。以下是一些常見的`ast`模組功能：

1. **Class Definition (類定義)**: 你可以使用`ast.ClassDef`節點來查找和分析類的定義，包括類名、類屬性和方法。

2. **Control Flow Statements (控制流語句)**: 你可以分析`ast.If`, `ast.While`, `ast.For`, `ast.With`, `ast.Break`, `ast.Continue`, `ast.Return`等節點，以理解和修改條件陳述式、迴圈、異常處理等。

3. **運算式 (Expressions)**: 你可以使用`ast.Expr`節點來查找和分析運算式，包括數學運算、函式呼叫、變數賦值等。

4. **模組和導入 (Modules and Imports)**: 你可以使用`ast.Module`節點來表示整個模組，以及使用`ast.Import`和`ast.ImportFrom`節點來分析模組導入。

`ast.parse()`函數用於將原始程式碼解析為AST物件。這是第一步，它將原始程式碼轉換為AST樹，使你能夠訪問和分析原始程式碼的結構。你可以使用`ast.parse()`函數來創建AST物件，然後使用其他`ast`模組的功能來操作和分析AST。

`ast.walk()`函數用於遍歷AST樹中的所有節點，允許你訪問每個節點並進行操作。它是一個生成器，可用于深度優先遍歷AST，以便查找和處理AST中的各種元素。你可以在遍歷過程中檢查節點的類型，然後執行相應的操作。這對於分析、轉換和代碼生成非常有用。