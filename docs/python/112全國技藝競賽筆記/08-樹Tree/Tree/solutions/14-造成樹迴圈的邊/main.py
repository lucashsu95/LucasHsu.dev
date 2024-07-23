n = int(input())

for _ in range(n):
    edges = input().split()

    parent = [i for i in range(20 + 1)]
    def find_parent(x):
        if parent[x] == x:
            return x
        return find_parent(parent[x])

    nodes = set()
    loop_edges = []
    for edge in edges:
        x, y = map(int, edge.split(','))
        nodes.add(x)
        nodes.add(y)
        x = find_parent(x)
        y = find_parent(y)

        if x != y:
            parent[y] = x
        else:
            loop_edges.append(edge)

    if len(loop_edges) == 0:
        if len(nodes) == len(edges) + 1:
            print('T')
        else:
            print('F')
    else:
        print(' '.join(loop_edges))

