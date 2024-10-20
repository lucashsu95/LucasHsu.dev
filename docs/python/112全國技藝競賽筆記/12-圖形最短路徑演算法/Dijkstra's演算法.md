# 戴克斯特拉 Dijkstra's演算法

## 介紹

Dijkstra演算法是一種用於解決**最短路徑問題**的演算法。它可以用來找出從一個起點到所有其他節點的最短路徑，或者找出兩個特定節點之間的最短路徑。Dijkstra演算法通常應用在以下情況：

1. **單源最短路徑問題**：當你需要找出從一個特定起點到所有其他節點的最短路徑時，Dijkstra演算法非常有用。這在許多應用中都很常見，如路線導航、網絡路由、城市交通規劃等。

2. **無向圖或有向圖**：Dijkstra演算法適用於無向圖和有向圖。你可以使用它來解決各種路徑尋找問題。

3. **非負權重邊**：Dijkstra演算法假定圖中的邊權重必須是非負的。這意味著它不適用於包含負權重邊的圖，否則可能導致不正確的結果。

4. **最短路徑查詢**：你可以使用Dijkstra演算法來回答特定節點對之間的最短路徑查詢，例如找到兩個城市之間的最短路徑。

5. **最小生成樹**：Dijkstra演算法的變體也可用於<mark>構建最小生成樹</mark>，這在最小生成樹問題中非常有用，也可以使用[併查集 Disjoint Set 與 Union Find](../08-樹Tree/最小成本生成樹.md)。

需要注意的是，Dijkstra演算法<mark>無法處理包含負權重</mark>邊的圖，如果圖中存在負權重邊，則可能需要使用[貝爾曼-福德(Bellman–Ford)演算法](./Bellman–Ford演算法.md)。此外，對於<mark>密集圖和大型圖，Dijkstra演算法的效能可能不佳</mark>，而其他演算法如`A*搜索`等可能更為適用。


## 學習資源
- [達標好文 [演算法] 最短路徑 (Dijkstra 演算法)](https://ithelp.ithome.com.tw/articles/10209593)

## 牛刀小試
Leetcode的
- [2045. Second Minimum Time to Reach Destination](https://leetcode.com/problems/second-minimum-time-to-reach-destination/description/?envType=daily-question&envId=2024-07-28)~~這題好像用BFS就可以做了...但我還是要放~~

## 程式碼範例
```python
def dijkstra(maze):
    import heapq
    
    w = len(maze[0])
    h = len(maze)

    pq = [(maze[0][0], 0, 0)]
    dist = [[float("inf")] * w for _ in range(h)]
    dist[0][0] = maze[0][0]

    while pq:
        val, x, y = heapq.heappop(pq)
        maze[y][x] = "X"

        for dx, dy in [(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)]:
            if 0 <= dx < w and 0 <= dy < h and maze[dy][dx] != "X":
                new_dist = dist[y][x] + maze[dy][dx]

                if new_dist < dist[dy][dx]:
                    dist[dy][dx] = new_dist
                    heapq.heappush(pq, (new_dist, dx, dy))

    return dist[h - 1][w - 1]


# 定義一個示例圖，這是一個鄰接矩陣表示的有向圖
# 在這個示例中，0表示無法到達的節點，正整數表示邊的權重
graph = [
    [0, 4, 0, 0, 0, 0, 0, 8, 0],
    [4, 0, 8, 0, 0, 0, 0, 11, 0],
    [0, 8, 0, 7, 0, 4, 0, 0, 2],
    [0, 0, 7, 0, 9, 14, 0, 0, 0],
    [0, 0, 0, 9, 0, 10, 0, 0, 0],
    [0, 0, 4, 14, 10, 0, 2, 0, 0],
    [0, 0, 0, 0, 0, 2, 0, 1, 6],
    [8, 11, 0, 0, 0, 0, 1, 0, 7],
    [0, 0, 2, 0, 0, 0, 6, 7, 0],
]

# 選擇起點節點，這裡選擇節點0作為起點

shortest_dists = dijkstra(graph)
for node, dist in enumerate(shortest_dists):
    print(f"從節點 0,0 到節點 {node} 的最短路徑長度是 {dist}")
```


## 程式碼範例2
```python
import heapq

def dijkstra(graph, start):
    n = len(graph)
    distances = [float('inf')] * n
    distances[start] = 0
    priority_queue = [(0, start)]

    while priority_queue:
        current_distance, current_node = heapq.heappop(priority_queue)

        if current_distance > distances[current_node]:
            continue

        for neighbor, weight in enumerate(graph[current_node]):
            distance = current_distance + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(priority_queue, (distance, neighbor))

    return distances
```