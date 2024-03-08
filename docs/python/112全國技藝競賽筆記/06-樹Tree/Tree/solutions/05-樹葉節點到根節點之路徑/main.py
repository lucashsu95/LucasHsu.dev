for _ in range(int(input())):
    m = int(input())
    parents = []
    children = []

    for _ in range(m):
        i, j = map(int, input().split(','))
        parents.append(j)
        children.append(i)

    leaves = set(children) - set(parents)
    
    for leaf in sorted(leaves):
        print(f'{leaf}: ', end='')
        paths = []
        while leaf in children:
            paths.append(leaf)
            leaf = parents[children.index(leaf)]
        
        middle_paths = paths[1:-1]
        if len(middle_paths) == 0:
            print('N')
        else:
            print('{' + ", ".join(map(str, middle_paths)) + '}')

    print()
    input()