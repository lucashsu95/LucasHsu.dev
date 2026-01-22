---
outline: "deep"

head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta  
    - name: keywords
      content: SPF最小質因數, Smallest Prime Factor, Python質因數分解, 篩法演算法, 數論演算法Python, 質數判別, Python競賽程式, 全國技藝競賽, GCD最大公因數, LCM最小公倍數, Python SPF篩法, 質因數分解優化, 非質因數計算, 數論競賽技巧
  - - meta
    - name: description
      content: 深入解析SPF（Smallest Prime Factor）最小質因數演算法！從概念到Python實作，完整學習篩法預處理、質因數分解、質數判別等技巧。涵蓋O(log n)快速分解、非質因數計算、GCD/LCM應用，適合全國技藝競賽與數論問題解題。附完整Python程式碼範例。
  - - meta
    - property: og:title  
      content: SPF最小質因數完全解析 | Python質因數分解演算法實戰教學
  - - meta
    - property: og:description
      content: 完整學習SPF篩法演算法！從最小質因數概念到Python實作，掌握O(log n)快速質因數分解技巧。涵蓋質數判別、非質因數計算、GCD/LCM應用，適合程式競賽與數論問題。
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/python-cover.jpg
  - - meta
    - property: og:url
      content: https://lucashsu95.github.io/LucasHsu.dev/python/112全國技藝競賽筆記/15-其他/spf.html  
  - - meta
    - property: og:site_name
      content: LucasHsu.dev - 程式開發教學
  - - meta
    - property: article:author
      content: 許恩綸
  - - meta
    - property: article:published_time
      content: 2025-11-16T00:00:00+08:00
  - - meta
    - property: article:modified_time  
      content: 2025-11-16T00:00:00+08:00
  - - meta
    - property: article:section
      content: Python演算法與數論
  - - meta
    - property: article:tag
      content: SPF最小質因數
  - - meta
    - property: article:tag  
      content: Python演算法
  - - meta
    - property: article:tag
      content: 質因數分解
  - - meta
    - property: article:tag
      content: 數論競賽
  - - meta
    - property: article:tag
      content: 篩法演算法
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:site
      content: "@lucashsu95"
  - - meta
    - name: twitter:creator
      content: "@lucashsu95"  
  - - meta
    - name: twitter:title
      content: SPF最小質因數完全解析 | Python質因數分解演算法實戰教學
  - - meta
    - name: twitter:description
      content: 完整學習SPF篩法演算法與Python實作！掌握O(log n)快速質因數分解，涵蓋質數判別、非質因數計算等競賽技巧，附完整程式碼範例。
  - - link
    - rel: canonical
      href: https://lucashsu95.github.io/LucasHsu.dev/python/112全國技藝競賽筆記/15-其他/spf.html
  - - meta
    - name: robots
      content: index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1
  - - script
    - type: application/ld+json
      content: |
        {
          "@context": "https://schema.org",
          "@type": "TechnicalArticle",
          "headline": "SPF最小質因數完全解析 | Python質因數分解演算法實戰教學",
          "description": "深入解析SPF（Smallest Prime Factor）最小質因數演算法！從概念到Python實作，完整學習篩法預處理、質因數分解、質數判別等技巧，適合全國技藝競賽與數論問題解題。",
          "author": {
            "@type": "Person", 
            "name": "許恩綸",
            "url": "https://lucashsu95.github.io/LucasHsu.dev/"
          },
          "publisher": {
            "@type": "Organization",
            "name": "LucasHsu.dev",
            "url": "https://lucashsu95.github.io/LucasHsu.dev/"
          },
          "datePublished": "2025-11-16T00:00:00+08:00",
          "dateModified": "2025-11-16T00:00:00+08:00",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://lucashsu95.github.io/LucasHsu.dev/python/112全國技藝競賽筆記/15-其他/spf.html"
          },
          "image": "https://lucashsu95.github.io/LucasHsu.dev/images/python-cover.jpg",
          "articleSection": "Python演算法與數論",
          "keywords": ["SPF最小質因數", "Smallest Prime Factor", "質因數分解", "Python篩法", "數論演算法", "質數判別", "全國技藝競賽", "Python競賽程式"],
          "about": [
            {
              "@type": "Thing",
              "name": "SPF最小質因數",
              "description": "Smallest Prime Factor演算法原理與應用"
            },
            {
              "@type": "Thing", 
              "name": "質因數分解",
              "description": "利用SPF陣列進行O(log n)快速分解"
            },
            {
              "@type": "Thing",
              "name": "篩法演算法",
              "description": "預處理最小質因數的高效篩法技巧"
            }
          ],
          "teaches": [
            "SPF最小質因數概念",
            "篩法演算法實作",
            "質因數分解技巧",
            "質數判別方法",
            "非質因數計算",
            "GCD與LCM應用"
          ],
          "audience": {
            "@type": "Audience",
            "audienceType": "Python程式設計與競賽學習者"
          },
          "educationalLevel": "中級",
          "learningResourceType": "演算法教學與競賽筆記",
          "programmingLanguage": "Python",
          "typicalAgeRange": "18-45"
        }
---

# SPF（Smallest Prime Factor）

## SPF 是什麼？
SPF 指的是「最小質因數」，即一個整數除了1之外的最小質因數。例如，12 的 SPF 是 2，15 的 SPF 是 3，質數的 SPF 是其本身。

## 為什麼要得到每個數的最小質因數？
- **快速質因數分解**：利用 SPF 陣列，可以在 O(log n) 時間內快速分解數字，避免暴力除法。
- **判別質數**：如果一個數的 SPF 等於它自己，代表它是質數。
- **求最大公因數（GCD）和最小公倍數（LCM）**：透過質因數分解結果可以更方便計算。
- **提高數論相關演算法效率**：在競賽與複雜數論問題中非常重要。

## SPF 質因數分解實例

假設我們要分解數字 **84**，使用 SPF 陣列的步驟如下：

1. 利用 SPF 陣列，我們先知道 84 的最小質因數是 **2**。
2. 我們用 2 去除 84，得到 **42**。
3. 對 42，再用 SPF 陣列知道其最小質因數還是 **2**。
4. 42 除以 2 得到 **21**。
5. 21 的最小質因數是 **3**，用 3 去除得到 **7**。
6. 7 的最小質因數是它自己 **7**，說明 7 是質數，分解完成。

質因數分解結果是 $$84 = 2 \times 2 \times 3 \times 7$$。

### 優勢分析

這個過程中，透過 SPF 陣列，我們不需從頭檢查除數，能直接找出最小質因數，快速完成分解。

**應用延伸：**
- **求 GCD/LCM**：把質因數拿來求最大公因數（GCD）或最小公倍數（LCM）時也很方便，因為質因數與次數都已知。
- **質數判別**：若檢查一個數的 SPF 等於它本身，代表它是質數，可快速判斷質數。

**總結**：SPF 陣列透過記錄每個數的最小質因數，使質因數分解與質數判斷大幅加速，適合解決數論、競賽等相關問題。

## 遇到的問題與解決方案

| 問題                           | 解決方案                                        |
| ------------------------------ | ----------------------------------------------- |
| 如何在大量數字中快速分解質因數 | 使用 SPF 篩法預先計算，避免重複計算；節省時間。 |
| 如何記錄每個數的最小質因數     | 建立 SPF 陣列，每個位置存最小質因數。           |
| 如何用 SPF 進行質因數分解      | 迴圈利用 SPF 持續除以最小質因數直到剩 1。       |
| 判断非質因數問題怎麼解決       | 用 SPF 判斷質因數後，從所有因數中挑出非質因數。 |

## SPF 範例程式碼（Python）

### 1. 建立 SPF 陣列（篩法）

```python
def sieve_spf(max_n):
    """
    使用篩法建立 SPF（最小質因數）陣列
    
    參數:
        max_n: 要處理的最大數字
    
    返回:
        spf: SPF 陣列，spf[i] 表示 i 的最小質因數
    
    時間複雜度: O(n log log n)
    """
    spf = [0] * (max_n + 1)
    spf[1] = 1  # 1 的 SPF 定義為 1
    
    # 初始化：每個數的 SPF 先設為自己
    for i in range(2, max_n + 1):
        spf[i] = i
    
    # 篩法：從 2 開始標記倍數
    for i in range(2, int(max_n**0.5) + 1):
        if spf[i] == i:  # i 是質數
            # 標記所有 i 的倍數，從 i*i 開始（更小的倍數已被處理過）
            for j in range(i * i, max_n + 1, i):
                if spf[j] == j:  # 如果 j 還沒被標記過
                    spf[j] = i   # 將 i 設為 j 的最小質因數
    return spf
```

**程式碼解析：**
- 第 10-11 行：初始化每個數的 SPF 為自己，質數的 SPF 就是它本身
- 第 14 行：只需檢查到 √n，因為更大的因數必定已被處理
- 第 15 行：`if spf[i] == i` 確認 i 是質數（未被更小的數標記過）
- 第 17 行：從 i² 開始標記，因為更小的倍數（如 2i, 3i...）已被更小的質數處理過
- 第 18-19 行：只在第一次遇到時標記，確保記錄的是**最小**質因數

### 2. 取得所有因數

```python
def get_factors(x):
    """
    取得數字 x 的所有因數
    
    參數:
        x: 要求因數的數字
    
    返回:
        factors: 包含所有因數的集合
    
    時間複雜度: O(√x)
    """
    factors = set()
    # 只需檢查到 √x
    for i in range(1, int(x**0.5) + 1):
        if x % i == 0:
            factors.add(i)        # i 是因數
            factors.add(x // i)   # x/i 也是因數
    return factors
```

**程式碼解析：**
- 使用 `set` 避免重複（例如 x=16 時，4 只會出現一次）
- 第 15-18 行：如果 i 是因數，那麼 x/i 也必定是因數，一次找到兩個因數
- 只需檢查到 √x，大幅提升效率

### 3. 取得非質因數

```python
def get_non_prime_factors(x, spf):
    """
    取得數字 x 的所有非質因數（合數因數）
    
    參數:
        x: 要求非質因數的數字
        spf: SPF 陣列
    
    返回:
        non_prime_factors: 排序後的非質因數列表
    """
    factors = get_factors(x)
    non_prime_factors = []
    
    for f in factors:
        # 排除 1，並判斷是否為合數
        # spf[f] != f 表示 f 不是質數（有更小的質因數）
        if f != 1 and spf[f] != f:
            non_prime_factors.append(f)
    
    return sorted(non_prime_factors)
```

**程式碼解析：**
- 第 18 行：`spf[f] != f` 是判斷合數的關鍵
  - 如果 `spf[f] == f`，表示 f 是質數（最小質因數是自己）
  - 如果 `spf[f] != f`，表示 f 有更小的質因數，是合數
- 第 17 行：排除 1，因為 1 既不是質數也不是合數

### 4. 完整範例

```python
# 範例：處理多筆查詢
max_n = 2 * 10 ** 5 + 1
spf = sieve_spf(max_n)  # 預先建立 SPF 陣列（只需一次）

# 讀取查詢次數
for _ in range(int(input())):
    num = int(input())
    non_prime_factors = get_non_prime_factors(num, spf)
    # 輸出非質因數數量 + 1（包含數字本身）
    print(len(non_prime_factors) + 1)
```

**使用範例：**

輸入：
```
3
12
15
20
```

處理過程：
- **12 的因數**：1, 2, 3, 4, 6, 12
  - 非質因數：4, 6, 12（2, 3 是質數）
  - 輸出：`4`（3個非質因數 + 1）

- **15 的因數**：1, 3, 5, 15
  - 非質因數：15（3, 5 是質數）
  - 輸出：`2`（1個非質因數 + 1）

- **20 的因數**：1, 2, 4, 5, 10, 20
  - 非質因數：4, 10, 20（2, 5 是質數）
  - 輸出：`4`（3個非質因數 + 1）