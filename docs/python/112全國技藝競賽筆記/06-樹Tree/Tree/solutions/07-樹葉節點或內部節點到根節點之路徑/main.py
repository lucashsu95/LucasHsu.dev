n = int(input())


for _ in range(n):
    m, k = map(int, input().split(','))
    
    parents = []
    children = []

    for _ in range(m):
        i, j = map(int, input().split(','))
        parents.append(j)
        children.append(i)

    depths = [0] * m
    for i in range(m):
        node = parents[i]
        while node != 99:
            depths[i] += 1
            node = parents[children.index(node)]

    nodes = [children[i] for i in range(m) if depths[i] == k]
    print(len(nodes))


    input()

