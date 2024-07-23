n = int(input())

for _ in range(n):
    tree = list(map(int, input().split(',')))
    n = len(tree)

    # 最大堆積樹
    is_max_heap = True
    for i in range(1, n):
        if tree[i] > tree[(i - 1) // 2]:
            is_max_heap = False
            break

    # 最小堆積樹
    is_min_heap = True
    for i in range(1, n):
        if tree[i] < tree[(i - 1) // 2]:
            is_min_heap = False
            break

    # 二元樹
    is_bst = True
    for i in range(1, n):
        if i % 2 == 0:
            if tree[i] < tree[(i - 1) // 2]:
                is_bst = False
                break
        else:
            if tree[i] > tree[(i - 1) // 2]:
                is_bst = False
                break

    if is_max_heap or is_min_heap:
        print('H')
    elif is_bst:
        print('B')
    else:
        print('F')


