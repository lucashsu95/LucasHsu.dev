# Floyd-Warshall

- [[演算法] 最短路徑 (Floyd-Warshall 演算法)](https://ithelp.ithome.com.tw/articles/10209186)


### Floyd-Warshall 程式碼
```python
# Floyd-Warshall 程式碼範例
def floyd_warshall(graph):
    # 初始化最短路徑矩陣
    n = len(graph)
    dist = [[float('inf')] * n for _ in range(n)]

    # 將圖中的邊權重填入矩陣
    for i in range(n):
        for j in range(n):
            dist[i][j] = graph[i][j]

    # Floyd-Warshall 算法核心
    for k in range(n):
        for i in range(n):
            for j in range(n):
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])

    return dist
```