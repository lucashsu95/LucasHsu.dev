import math


n = int(input())
tree = {}

for _ in range(n):
    node = int(input())
    index = 1

    while index in tree:
        if node < tree[index]:
            index = index * 2
        else:
            index = index * 2 + 1

    tree[index] = node

max_index = max(tree.keys())
depth = math.floor(math.log2(max_index))
print(depth)

