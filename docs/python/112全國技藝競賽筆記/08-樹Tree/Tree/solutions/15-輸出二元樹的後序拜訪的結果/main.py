n = int(input())

for _ in range(n):
    x = int(input())
    nodes = list(map(int, input().split(',')))[:x]
    tree = {}

    for node in nodes:
        index = 1
        while index in tree:
            if node < tree[index]:
                index *= 2
            else:
                index = index * 2 + 1

        tree[index] = node

    postorder = []
    def postorder_traversal(index = 1):
        if index in tree:
            postorder_traversal(index * 2)
            postorder_traversal(index * 2 + 1)
            postorder.append(tree[index])

    postorder_traversal()
    print(','.join(map(str, postorder)))


