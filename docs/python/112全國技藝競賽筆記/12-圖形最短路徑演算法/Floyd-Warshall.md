# Floyd-Warshall


## 學習資源
- [[演算法] 最短路徑 (Floyd-Warshall 演算法)](https://ithelp.ithome.com.tw/articles/10209186)


## 牛刀小試
Leetcode的
- [1334. Find the City With the Smallest Number of Neighbors at a Threshold Distance](https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/description/?envType=daily-question&envId=2024-07-26)
- [2976. Minimum Cost to Convert String I](https://leetcode.com/problems/minimum-cost-to-convert-string-i/description/?envType=daily-question&envId=2024-07-27)


## 程式碼範例
```python
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