---
title: SQL 偏移函數（LAG、LEAD、FIRST_VALUE、LAST_VALUE）指南 | LucasHsu.dev
description: SQL 偏移函數教學：LAG 取前一行、LEAD 取後一行、FIRST_VALUE、LAST_VALUE、NTH_VALUE。附月度銷售對比與增長率計算範例。
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: SQL LAG, LEAD, FIRST_VALUE, LAST_VALUE, NTH_VALUE, 偏移函數, 同比環比, SQL教學
  - - meta
    - property: og:title
      content: SQL 偏移函數完全指南
  - - meta
    - property: og:description
      content: LAG、LEAD、FIRST_VALUE、LAST_VALUE 完整教學與應用範例
  - - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/sql-cover.webp
---

# SQL 偏移函數（LAG、LEAD、FIRST_VALUE、LAST_VALUE）

> 📝 偏移函數用於訪問視窗內其他行的值，適合計算同比環比、移動平均、前後行比較等場景。

## 前言

偏移函數（Offset Functions）是 SQL 視窗函數中的一類，允許你訪問當前行之外其他行的資料，而無需自關聯或複雜的子查詢。

:::details 🔗 想看更完整的介紹？
- [SQL 視窗函數完全指南](/database/sql/sql-window-functions) — 包含基本概念、語法、排名函數、實際範例與練習
- [排名函數（ROW_NUMBER、RANK）](/database/sql/sql-window-functions-ranking)
- [聚合函數與視窗框](/database/sql/sql-window-functions-aggregate)
:::

## 偏移函數比較

| 函數          | 說明                        | 語法                            |
| ------------- | --------------------------- | ------------------------------- |
| LAG(expr, n)  | 獲取當前行**前**第 n 行的值 | LAG(salary, 1) OVER (...)       |
| LEAD(expr, n) | 獲取當前行**後**第 n 行的值 | LEAD(salary, 1) OVER (...)      |
| FIRST_VALUE() | 獲取視窗內**第一**行的值    | FIRST_VALUE(salary) OVER (...)  |
| LAST_VALUE()  | 獲取視窗內**最後**一行的值  | LAST_VALUE(salary) OVER (...)   |
| NTH_VALUE(n)  | 獲取視窗內第 n 行的值       | NTH_VALUE(salary, 2) OVER (...) |

## LAG/LEAD 範例：月度銷售對比

:::details 📋 建立資料表與假資料
```sql
-- 建立月度銷售表
CREATE TABLE monthly_sales (
    month DATE PRIMARY KEY,
    sales_amount DECIMAL(10, 2)
);

-- 插入假資料
INSERT INTO monthly_sales (month, sales_amount) VALUES
('2024-01-01', 100000),
('2024-02-01', 120000),
('2024-03-01', 150000),
('2024-04-01', 140000),
('2024-05-01', 165000),
('2024-06-01', 180000);
```
:::

```sql
SELECT
    month,
    sales_amount,
    LAG(sales_amount, 1, 0) OVER (ORDER BY month) AS prev_month_sales,
    LEAD(sales_amount, 1, 0) OVER (ORDER BY month) AS next_month_sales,
    ROUND(
        (sales_amount - LAG(sales_amount, 1) OVER (ORDER BY month)) /
        LAG(sales_amount, 1) OVER (ORDER BY month) * 100, 2
    ) AS growth_rate
FROM monthly_sales
ORDER BY month;

-- 輸出結果：
-- month     | sales_amount | prev_month_sales | next_month_sales | growth_rate
-- ----------|--------------|-----------------|-----------------|------------
-- 2024-01   | 100000       | 0               | 120000          | NULL
-- 2024-02   | 120000       | 100000          | 150000          | 20.00
-- 2024-03   | 150000       | 120000          | 140000          | 25.00
-- 2024-04   | 140000       | 150000          | 0               | -6.67
```

**程式碼說明：**
- `LAG(sales_amount, 1, 0)`：獲取前 1 行的值，如果沒有前 1 行則返回 0
- 計算增長率公式：（本月 - 上月）/ 上月 × 100
- 第一行沒有前一個月，增長率為 NULL

## 常見應用場景

1. **同比環比分析**：使用 `LAG(value, 12)` 比較去年同期數據
2. **移動平均**：配合 `AVG() OVER (ROWS BETWEEN n PRECEDING AND CURRENT ROW)` 計算
3. **前后對比**：使用 `LAG`/`LEAD` 計算變化量或變化率
4. **首尾值提取**：使用 `FIRST_VALUE`/`LAST_VALUE` 取得分組的首末記錄

## 延伸閱讀

- [排名函數（ROW_NUMBER、RANK）](/database/sql/sql-window-functions-ranking)
- [聚合函數與視窗框](/database/sql/sql-window-functions-aggregate)
- [實際範例與練習](/database/sql/sql-window-functions-examples)
