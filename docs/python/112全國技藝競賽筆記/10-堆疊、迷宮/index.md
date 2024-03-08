# 迷宮 、 堆疊

可能會用到的模組
- [collections、heapq、PriorityQueue](../15-模組/)

## 1. 迷宮問題#1

```python
# 迷宮問題#1

from collections import deque

def is_valid(x, y, maze):
    return 0 <= x < len(maze[0]) and 0 <= y < len(maze) and maze[y][x] == '.'

def bfs(maze):
    queue = deque([(1, 1, 1)])

    while queue:
        x, y, count = queue.popleft()

        if x == len(maze[0]) - 2 and y == len(maze) - 2:
            return count

        for dx, dy in [(0, 1), (1, 0), (-1, 0), (0, -1)]:
            new_x, new_y = x + dx, y + dy
            if is_valid(new_x, new_y, maze):
                queue.append((new_x, new_y, count + 1))
                maze[new_y][new_x] = '#'  # 将已访问过的位置标记为 '#'

    return 'No solution!'

n = int(input())
maze = [list(input()) for _ in range(n)]

min_path = bfs(maze)

print(min_path)
```


## 2. 二維陣列的應用 
### 100年模擬 Problem 2 子題 1

```python
import sys
import heapq

def is_valid(x, y):
    return 0 <= x < 15 and 0 <= y < 15 and maze[y][x] == '0'


for line in sys.stdin:
    maze = [list(line.strip())]
    for _ in range(14):
        maze.append(list(input().strip()))
    queue = [(0, 0, 0)]
    b = False

    while queue:
        x, y, cost = heapq.heappop(queue)
        if x == y == 14:
            b = True
            break

        maze[y][x] = '1'
        for dx, dy in [(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)]:
            if is_valid(dx, dy):
                heapq.heappush(queue, (dx, dy, cost + 1))

    print(str(b).upper())
    input()
```