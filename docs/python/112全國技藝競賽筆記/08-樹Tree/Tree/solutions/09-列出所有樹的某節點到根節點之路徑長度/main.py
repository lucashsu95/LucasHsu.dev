n = int(input())


for _ in range(n):
    m, k, v = map(int, input().split(','))

    trees = {}
    for _ in range(m):
        node, *parents = map(int, input().split()[:k+1])
        trees[node] = parents

    lengths = []
    for i in range(k):
        node = trees[v][i]
        length = 0
        while node != 999:
            node = trees[node][i]
            length += 1

        lengths.append(length)

    print(','.join(map(str, lengths)))

