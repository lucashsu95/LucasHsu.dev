---
title: SQL 聚合函數 OVER 與視窗框（ROWS BETWEEN）指南 | LucasHsu.dev
description: SQL 聚合函數搭配 OVER 子句教學：累計總和 SUM、移動平均 AVG、計數 COUNT。含視窗框 ROWS BETWEEN、RANGE BETWEEN 完整解說。
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: SQL SUM OVER, AVG OVER, COUNT OVER, 視窗框, ROWS BETWEEN, RANGE BETWEEN, 累計, 移動平均, SQL教學
  - - meta
    - property: og:title
      content: SQL 聚合函數 OVER 與視窗框指南
  - - meta
    - property: og:description
      content: SUM、AVG、COUNT 搭配 OVER 子句計算累計值與移動平均，含 ROWS/RANGE 視窗框完整解說
  - - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/sql-cover.webp
---

# SQL 聚合函數 OVER 與視窗框（ROWS BETWEEN）

> 📝 將 SUM、AVG、COUNT 等聚合函數與 OVER 子句結合，可計算累計值、移動平均等進階分析。配合視窗框（ROWS BETWEEN）可精確控制計算範圍。

## 前言

聚合函數搭配 OVER 子句是 SQL 視窗函數最常用的用法之一。它讓我們能在保留原始行的同時，計算累計總和、移動平均、分組計數等進階統計。

:::details 🔗 想看更完整的介紹？
- [SQL 視窗函數完全指南](/database/sql/sql-window-functions) — 包含基本概念、語法、排名函數、實際範例與練習
- [排名函數（ROW_NUMBER、RANK）](/database/sql/sql-window-functions-ranking)
- [偏移函數（LAG、LEAD）](/database/sql/sql-window-functions-offset)
:::

## 聚合函數 OVER 範例

將 SUM、AVG、COUNT 等聚合函數與 OVER 子句結合，計算累計值、移動平均等。

:::details 📋 建立資料表與假資料
```sql
-- 建立銷售表
CREATE TABLE sales (
    sale_id INT PRIMARY KEY AUTO_INCREMENT,
    sale_date DATE,
    product_id INT,
    amount DECIMAL(10, 2)
);

-- 插入假資料
INSERT INTO sales (sale_date, product_id, amount) VALUES
('2024-01-01', 1, 100),
('2024-01-02', 1, 150),
('2024-01-03', 1, 200),
('2024-01-04', 1, 180),
('2024-01-05', 2, 300),
('2024-01-06', 2, 250),
('2024-01-07', 1, 220),
('2024-01-08', 1, 190);
```
:::

```sql
SELECT
    sale_date,
    product_id,
    amount,
    SUM(amount) OVER (ORDER BY sale_date) AS cumulative_sum,
    AVG(amount) OVER (ORDER BY sale_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_avg_3,
    COUNT(*) OVER (PARTITION BY product_id) AS product_count
FROM sales
ORDER BY sale_date;

-- 輸出結果：
-- sale_date  | product_id | amount | cumulative_sum | moving_avg_3 | product_count
-- ----------|-----------|--------|----------------|-------------|---------------
-- 2024-01-01| 1         | 100    | 100            | 100         | 4
-- 2024-01-02| 1         | 150    | 250            | 125         | 4
-- 2024-01-03| 1         | 200    | 450            | 150         | 4
-- 2024-01-04| 1         | 180    | 630            | 176.67      | 4
-- 2024-01-05| 2         | 300    | 930            | 226.67      | 2
```

**程式碼說明：**
- `SUM(amount) OVER (ORDER BY sale_date)`：累計總和
- `AVG(... ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)`：3 天移動平均
- `COUNT(*) OVER (PARTITION BY product_id)`：每個產品的銷售次數

## 視窗框（Window Frame）詳解

視窗框精確定義計算範圍，必須配合 ORDER BY 使用。

### 語法結構

```sql
function_name(expr) OVER (
    ORDER BY column
    ROWS BETWEEN {start_frame} AND {end_frame}
)

-- 或

function_name(expr) OVER (
    ORDER BY column
    RANGE BETWEEN {start_frame} AND {end_frame}
)
```

### Frame 選項

| 語法                | 說明                     | 範例                                       |
| ------------------- | ------------------------ | ------------------------------------------ |
| UNBOUNDED PRECEDING | 視窗的第一行（無上限）   | `ROWS BETWEEN UNBOUNDED PRECEDING`         |
| n PRECEDING         | 前 n 行                  | `ROWS BETWEEN 2 PRECEDING`                 |
| CURRENT ROW         | 當前行                   | `ROWS BETWEEN ... AND CURRENT ROW`         |
| n FOLLOWING         | 後 n 行                  | `ROWS BETWEEN ... AND 1 FOLLOWING`         |
| UNBOUNDED FOLLOWING | 視窗的最後一行（無下限） | `ROWS BETWEEN ... AND UNBOUNDED FOLLOWING` |

### 視窗框範例

```sql
SELECT
    sale_date,
    amount,
    -- 累計從開始到當前
    SUM(amount) OVER (
        ORDER BY sale_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS cumulative_sum,
    -- 3 天移動平均
    AVG(amount) OVER (
        ORDER BY sale_date
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ) AS moving_avg_3,
    -- 計算當前與前後各 1 行的平均
    AVG(amount) OVER (
        ORDER BY sale_date
        ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING
    ) AS centered_avg_3
FROM sales;
```

:::tip 💡 ROWS vs RANGE
- **ROWS**：基於物理行數（第幾行）
- **RANGE**：基於值範圍（如日期區間、數值區間）
- 例如：`RANGE BETWEEN INTERVAL '7' DAY PRECEDING AND CURRENT ROW` 表示過去 7 天內的數據，不管實際有幾行
:::

## 常見組合模式

| 需求 | SQL 寫法 | 說明 |
|------|----------|------|
| 累計總和 | `SUM(x) OVER (ORDER BY date)` | 從頭累計到當前行 |
| 移動平均 | `AVG(x) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)` | 最近 7 天平均 |
| 分組總計 | `COUNT(*) OVER (PARTITION BY group_col)` | 每組的總行數 |
| 居中平均 | `AVG(x) OVER (ORDER BY date ROWS BETWEEN 3 PRECEDING AND 3 FOLLOWING)` | 前後各 3 行 |

## 延伸閱讀

- [排名函數（ROW_NUMBER、RANK）](/database/sql/sql-window-functions-ranking)
- [偏移函數（LAG、LEAD）](/database/sql/sql-window-functions-offset)
- [實際範例與練習](/database/sql/sql-window-functions-examples)
