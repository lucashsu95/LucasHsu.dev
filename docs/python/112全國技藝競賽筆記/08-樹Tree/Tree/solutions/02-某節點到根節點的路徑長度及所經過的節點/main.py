n, start_node = map(int, input().split(','))

for _ in range(n):
    node_count, *edges = input().split()
    parents = []
    children = []

    for edge in edges:
        i, j = map(int, edge.split(','))
        parents.append(j)
        children.append(i)

    paths = [start_node]
    while paths[-1] != 0:
        paths.append(parents[children.index(paths[-1])])

    print(f'路徑長度為{len(paths)}: ' + '->'.join(map(str, paths)))
