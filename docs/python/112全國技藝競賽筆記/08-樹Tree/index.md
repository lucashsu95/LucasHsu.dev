# 樹(Tree)

是一種重要的資料結構，具有層次性結構，常用於模擬自然界中的樹狀結構，例如家譜、組織架構、網頁結構等。以下是樹的基本概念：

1. **節點(Node)：** 樹中的每個元素稱為節點。每個節點可以有零個或多個子節點。

2. **根節點(Root Node)：** 樹的頂端節點稱為根節點，它沒有父節點，並且是樹的入口點。

3. **子節點(Child Node)：** 每個節點下面的節點稱為子節點。一個節點可以有零個或多個子節點。

4. **父節點(Parent Node)：** 每個節點的直接上一層節點稱為父節點。一個節點只能有一個父節點。

5. **葉子節點(Leaf Node)：** 沒有子節點的節點稱為葉子節點或葉節點。它們位於樹的最底層。

6. **深度(Depth)：** 節點所在的層級稱為節點的深度。根節點的深度為0，每向下一層深度增加1。

7. **高度(Height)：** 樹的高度是指從根節點到葉子節點的最長路徑的長度。樹的高度取決於最深的葉子節點到根節點的距離。

8. **子樹(Subtree)：** 樹中的任何節點及其子孫節點組成的集合稱為子樹。

樹的應用十分廣泛，它可以用於實現各種資料結構和算法，如二元樹、二元搜索樹、堆、表達式樹等。透過樹的結構，我們可以有效地組織和管理資料，提高查找、插入和刪除的效率。

```python


def create_tree(root_value, children):
    return {'value': root_value, 'children': children}

def add_child(parent_node, child_value):
    parent_node['children'].append({'value': child_value, 'children': []})

def print_tree(node, depth=0):
    print('\t' * depth + str(node['value']))
    for child in node['children']:
        print_tree(child, depth + 1)

# 創建樹的節點
tree = create_tree('A', [])

# 加入子節點
add_child(tree, 'B')
add_child(tree, 'C')
add_child(tree, 'D')
add_child(tree['children'][0], 'E')
add_child(tree['children'][0], 'F')
add_child(tree['children'][1], 'G')

# 輸出樹的結構
print_tree(tree)

```