n = int(input())

for _ in range(n):
    edges = [edge.split(',') for edge in input().split()]
    edges.sort(key=lambda x: int(x[2]))

    parents = [i for i in range(26)]
    def find(x):
        if x == parents[x]:
            return x
        parents[x] = find(parents[x])
        return parents[x]
    
    def union(x, y):
        x = find(x)
        y = find(y)
        parents[x] = y

    cost = 0
    for edge in edges:
        u = ord(edge[0]) - ord('A')
        v = ord(edge[1]) - ord('A')
        if find(u) != find(v):
            union(u, v)
            cost += int(edge[2])
    
    print(cost)
    

