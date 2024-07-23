# ast抽象語法樹

## 介紹

当使用Python的`ast`模块时，你通常会分为两个主要步骤：解析源代码以构建AST，然后遍历AST节点以执行所需的操作。以下是一个简单的示例，演示如何使用`ast`模块来解析Python代码并遍历AST节点以查找函数定义。

首先，我们需要导入`ast`模块：

```python
import ast
```

然后，让我们看一个示例，假设我们有以下Python代码：

```python
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b
```

我们可以使用`ast`模块来解析这段代码并查找其中的函数定义：

```python
source_code = """
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b
"""

# 解析源代码并构建AST
parsed_code = ast.parse(source_code)

# 遍历AST以查找函数定义
for node in ast.walk(parsed_code):
    if isinstance(node, ast.FunctionDef):
        print(f"Found function: {node.name}")
```

在这个示例中，我们首先使用`ast.parse()`函数将源代码解析为AST。然后，我们使用`ast.walk()`函数遍历AST中的所有节点，并检查是否某个节点是`ast.FunctionDef`类型的，如果是，则打印出函数的名称。这将输出：

```
Found function: add
Found function: subtract
```

这是一个简单示例，演示了如何使用`ast`模块解析Python代码并查找特定类型的节点。你可以根据需要执行更复杂的分析和操作。`ast`模块为更复杂的用例提供了丰富的功能，如修改AST以进行代码转换、查找特定模式的代码等。

## 進階

除了函数定义外，`ast`模块还允许你分析Python代码中的其他类型的语句、表达式和结构。以下是一些常见的`ast`模块功能：

1. **Class Definition (类定义)**: 你可以使用`ast.ClassDef`节点来查找和分析类的定义，包括类名、类属性和方法。

2. **Control Flow Statements (控制流语句)**: 你可以分析`ast.If`, `ast.While`, `ast.For`, `ast.With`, `ast.Break`, `ast.Continue`, `ast.Return`等节点，以理解和修改条件语句、循环、异常处理等。

3. **表达式 (Expressions)**: 你可以使用`ast.Expr`节点来查找和分析表达式，包括数学运算、函数调用、变量赋值等。

4. **模块和导入 (Modules and Imports)**: 你可以使用`ast.Module`节点来表示整个模块，以及使用`ast.Import`和`ast.ImportFrom`节点来分析模块导入。

`ast.parse()`函数用于将源代码解析为AST对象。这是第一步，它将源代码转换为AST树，使你能够访问和分析源代码的结构。你可以使用`ast.parse()`函数来创建AST对象，然后使用其他`ast`模块的功能来操作和分析AST。

`ast.walk()`函数用于遍历AST树中的所有节点，允许你访问每个节点并进行操作。它是一个生成器，可用于深度优先遍历AST，以便查找和处理AST中的各种元素。你可以在遍历过程中检查节点的类型，然后执行相应的操作。这对于分析、转换和代码生成非常有用。