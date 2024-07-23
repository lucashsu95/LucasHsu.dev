n = int(input())

def find_max_depth(node, parents, children):
    next_nodes = [children[i] for i in range(len(parents)) if parents[i] == node]
    if len(next_nodes) == 0:
        return 0
    
    return max([find_max_depth(next_node, parents, children) for next_node in next_nodes]) + 1

for _ in range(n):
    m = int(input())
    parents = []
    children = []

    for _ in range(m - 1):
        i, j = map(int, input().split(',')) 
        parents.append(j)
        children.append(i)

    max_height = find_max_depth(0, parents, children) + 1
    print(max_height)

    input()
