# 樹和樹葉節點 (101歷屆 D)
from collections import defaultdict

for _ in range(int(input())):
    edges = input().split()
    graph = defaultdict(list)
    for edge in edges:
        u, v = edge.split(',')
        graph[u].append(v)
        graph[v].append(u)

    nodes = list(set(graph.keys()))
    if len(nodes) == 0:
        print(0)
        continue

    if len(nodes) != len(edges):
        print('F')
        continue

    visited = set()
    stack = [nodes[0]]
    while stack:
        node = stack.pop()
        visited.add(node)
        for i in graph[node]:
            if i not in visited:
                stack.append(i)

    if len(visited) != len(nodes):
        print('F')
        continue

    end_node = sum(1 for node in graph if len(graph[node]) == 1)
    print(end_node)