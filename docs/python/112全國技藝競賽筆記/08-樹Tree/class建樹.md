# class建樹


本來跟是用dict 或是 陣列來建樹、跑樹
今天來試試 用class建樹、跑樹
順便輸出node 的parent、children、depth、height

```python
class Node:
    def __init__(self, name):
        self.name = name
        self.parent = None
        self.children = []
        self.height = -1
        self.depth = -1


class Tree:
    def __init__(self):
        self.nodes = {}

    def add_edge(self, parent_name, child_name):
        if parent_name not in self.nodes:
            self.nodes[parent_name] = Node(parent_name)
        if child_name not in self.nodes:
            self.nodes[child_name] = Node(child_name)

        parent_node = self.nodes[parent_name]
        child_node = self.nodes[child_name]

        parent_node.children.append(child_node)
        child_node.parent = parent_node

    def update_depths_heights(self):
        for node in self.nodes.values():
            self.update_depth(node)
            self.update_height(node)

    def update_depth(self, node):
        depth = 0
        while node.parent is not None:
            depth += 1
            node = node.parent
        node.depth = depth

    def update_height(self, node):
        if not node.children:
            node.height = 0
        else:
            node.height = 1 + max(self.update_height(child) for child in node.children)
        return node.height


edges = ["1,2", "1,3", "2,4", "2,5"]

tree = Tree()
for edge in edges:
    parent, child = edge.split(",")
    tree.add_edge(parent, child)

tree.update_depths_heights()

for node in tree.nodes.values():
    name = node.parent.name if node.parent else None
    children = [child.name for child in node.children]

    print(
        f"Node {node.name}: Parent={name}, Children={children}, Depth={node.depth}, Height={node.height}"
    )
```
還是用dict字典建樹好了
