import math


n = int(input())
nodes = []

for _ in range(n):
    nodes.append(int(input()))

nodes.sort()
print(','.join(map(str, nodes)))

