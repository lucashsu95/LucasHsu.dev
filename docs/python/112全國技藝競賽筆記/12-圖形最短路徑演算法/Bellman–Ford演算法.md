# 貝爾曼-福特演算法 Bellman–Ford 演算法

## 介紹
- [[演算法] 最短路徑 (Bellman-Ford 演算法)](https://ithelp.ithome.com.tw/articles/10209748)
- [[演算法] 最短路徑 (Bellman-Ford 演算法 - 佇列優化)](https://ithelp.ithome.com.tw/articles/10209845)

貝爾曼-福德演算法是一種用於解決最短路徑問題的演算法，它可以處理包含負權重邊的圖，並找到從一個起點到所有其他節點的最短路徑。這個演算法被廣泛應用於路線導航、網絡路由、金融建模等領域。以下是貝爾曼-福德演算法的主要特點和步驟：

特點：
1. 能夠處理包含負權重邊的圖，這使得它在實際應用中更有彈性。
2. 能夠檢測到圖中是否存在負權重的環路（即負環路），並且在存在負環路時能夠識別出來。

步驟：
1. 初始化：將起點到所有其他節點的距離初始化為無窮大，並將起點到自己的距離設為零。
2. 遍歷邊：對圖中的每條邊，以迴圈方式進行遍歷。
3. 更新距離：對於每條邊，檢查是否可以通過當前節點縮短到達其他節點的距離。如果可以，則更新到達其他節點的最短距離。
4. 重複遍歷：重複上述步驟（遍歷邊、更新距離）V-1 次，其中 V 是圖中節點的數量。這是因為最長的最短路徑不會包含超過 V-1 條邊。
5. 檢查負環路：如果在第 V 次遍歷後仍然可以縮短某些節點的距離，則證明圖中存在負環路。

貝爾曼-福德演算法的複雜度是 O(V*E)，其中 V 是節點數量，E 是邊的數量。這個演算法的主要優勢是它的彈性，它可以處理各種圖形，包括存在負權重邊的情況，並識別出負環路。然而，它在某些情況下可能不如Dijkstra演算法效率高，特別是在圖比較稀疏的情況下。

```python
class Graph:
    def __init__(self, vertices):
        self.V = vertices
        self.graph = []

    def add_edge(self, u, v, w):
        self.graph.append([u, v, w])

    def bellman_ford(self, src):
        # 初始化距離陣列，將源點設為0，其他點設為無限大
        distance = [float('inf')] * self.V
        distance[src] = 0

        # 進行V-1次迭代，每次迭代找到更短的路徑
        for _ in range(self.V - 1):
            for u, v, w in self.graph:
                if distance[u] != float('inf') and distance[u] + w < distance[v]:
                    distance[v] = distance[u] + w

        # 檢查是否存在負權環
        for u, v, w in self.graph:
            if distance[u] != float('inf') and distance[u] + w < distance[v]:
                print("圖中存在負權環")
                return

        # 打印最短路徑
        for i in range(self.V):
            print(f"從源點到節點 {i} 的最短距離是 {distance[i]}")


# 測試程式碼
if __name__ == "__main__":
    g = Graph(5)
    g.add_edge(0, 1, -1)
    g.add_edge(0, 2, 4)
    g.add_edge(1, 2, 3)
    g.add_edge(1, 3, 2)
    g.add_edge(1, 4, 2)
    g.add_edge(3, 2, 5)
    g.add_edge(3, 1, 1)
    g.add_edge(4, 3, -3)

    g.bellman_ford(0)
```

## Bellman-Ford 程式碼
```python
# Bellman-Ford 程式碼範例
def bellman_ford(graph, start):
    n = len(graph)
    distances = [float('inf')] * n
    distances[start] = 0

    for _ in range(n - 1):
        for u in range(n):
            for v, weight in enumerate(graph[u]):
                if distances[u] + weight < distances[v]:
                    distances[v] = distances[u] + weight

    return distances
```


## Bellman-Ford 佇列優化 程式碼
```python
# Bellman-Ford 佇列優化 程式碼範例
from collections import deque

def bellman_ford_queue(graph, start):
    n = len(graph)
    distances = [float('inf')] * n
    distances[start] = 0
    queue = deque([start])

    while queue:
        current_node = queue.popleft()

        for neighbor, weight in enumerate(graph[current_node]):
            if distances[current_node] + weight < distances[neighbor]:
                distances[neighbor] = distances[current_node] + weight
                queue.append(neighbor)

    return distances
```