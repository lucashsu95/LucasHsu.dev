n = int(input())
from collections import defaultdict

for _ in range(n):
    edges = input().split()
    graph = defaultdict(list)

    # create Tree
    for edge in edges:
        x, y = [int(i) for i in edge.split(',')]
        graph[x].append(y)
        graph[y].append(x)


    # 點 - 1 == 邊
    nodes = list(graph.keys())
    if len(nodes) - 1 != len(edges):
        print('F')
        continue


    # BFS
    visited = set()
    stack = [nodes[0]]
    while stack:
        node = stack.pop()
        visited.add(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                stack.append(neighbor)

    if len(visited) == len(nodes):
        print('T')
    else:
        print('F')
        
