class Tree:
    def __init__(self, value) -> None:
        self.left = None
        self.right = None
        self.value = value


def insert(root, value):
    if root is None:
        return Tree(value)

    if root.value > value:
        root.right = insert(root.right, value)
    else:
        root.left = insert(root.left, value)

    return root

def print_tree(root):
    if root is not None:
        print_tree(root.right)
        print_tree(root.left)
        result.append(root.value)


for _ in range(int(input())):
    n = int(input())
    tree = list(map(int, input().split(',')))
    root = None
    for node in tree:
        root = insert(root, node)
    result = []
    print_tree(root)
    print(*result,sep=',')
