# python 模組介紹

## sys
如獲取命令列引數、標準輸入輸出錯誤流、程式終止等。

## collections
[官方文檔](https://docs.python.org/3/library/collections.html) [懶人包](./components/collections.md)

## itertools
[所有函式連結](https://steam.oxxostudio.tw/category/python/library/itertools.html)、[官方文檔](https://docs.python.org/zh-cn/3/library/itertools.html)、[懶人包](./components/itertools.md)

## math
求最大公因數、求最小公倍數、還有PI、`將 4 的值傳回 3 的冪（與 4 * 4 * 4 相同）pow(4,3)`、`平方sqrt()`。

## heapq
堆積、堆佇列演、`heappush`、`heappop`，[官方文檔](https://docs.python.org/3/library/heapq.html)

## bisect:
二分搜尋法:通常會用到`bisect_left()`、`bisect_right()`，[官方文檔](https://docs.python.org/3/library/bisect.html)
  
## ast抽象语法树(Abstract Syntax Tree, AST)
[懶人包](./components/ast.md)

## ipaddress
要算IP或是什麼遮罩什麼網段位子用這個就好啦!不需要在用什麼OR AND XOR 運算了!

## decimal
在python中浮點數相乘會有誤差<br>
在python中`0.0001 * 3 = 0.000300000003`，很奇怪對吧,用decimal就不用怕了
```python
from decimal import *
a = Decimal(a) 
b = Decimal(b)
print(a * b)
```

## functools
把`@catch`放在def函式的上面。這樣就不怕超時了[官方文檔](https://docs.python.org/3/library/functools.html)。

## string
`string.punctuation`包含了所有标点符号的字符串，`string.ascii_letters`包含了所有 ASCII 字母等。[懶人包](./components/string.md)、[官方文檔](https://docs.python.org/3/library/string.html)。

## queue
`queue.Queue()`、`queue.PriorityQueue()`、`queue.LifoQueue()`

## fractions
做分數運算，這樣就不用考慮分母不一樣還要通分之類的。[官方文檔](https://docs.python.org/3/library/fractions.html)、[菜鳥教程](https://www.runoob.com/note/24857)

## re
提供了正規表示式的功能，可以用來進行複雜的字串比對和處理。`re.find_all(pattern,st)`、`re.split(r'[,.:;]',st)`

## json
輸入輸出json格式

## statistics
提供了替數值資料計算基本統計量的功能，如平均、中位數、變異量數等。[懶人包](./components/statistics.md)

<br>

# 可能用不到的但還是列出來

## unicodedata
`unicodedata`模块提供了 Unicode 字符数据的访问接口。它包含了一些函数，例如`normalize()`用于字符串的 Unicode 规范化，`category()`用于获取字符的 Unicode 类别，`name()`用于获取字符的 Unicode 名称等。。

## textwrap
`textwrap`模块提供了用于文本包装和填充的函数。它可以将文本分成固定宽度的段落，进行自动换行，以及添加缩进和填充等操作。。

## argparse
提供了一種解析命令列引數和選項的機制，可以方便地設計友好的命令列介面。
