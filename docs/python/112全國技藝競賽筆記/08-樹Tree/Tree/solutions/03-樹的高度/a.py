for _ in range(int(input())):
    n = int(input())
    tree = [input().strip().split(',') for _ in range(n - 1)]

    def dfs(n, h):
        global height
        height = max(height, h)
        for l, r in tree:
            if r == n:
                dfs(l, h + 1)
    height = 0
    dfs('0', 1)
    print(height)
