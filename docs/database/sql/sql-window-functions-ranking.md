---
title: SQL 排名函數（ROW_NUMBER、RANK、DENSE_RANK）完全指南 | LucasHsu.dev
description: SQL 排名函數教學：ROW_NUMBER 連續編號、RANK 跳躍排名、DENSE_RANK 密集排名、NTILE 分組。附比較範例與實際應用情境。
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: SQL ROW_NUMBER, RANK, DENSE_RANK, NTILE, 排名函數, SQL教學, 資料分析
  - - meta
    - property: og:title
      content: SQL 排名函數完全指南
  - - meta
    - property: og:description
      content: ROW_NUMBER、RANK、DENSE_RANK、NTILE 完整教學與比較範例
  - - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/sql-cover.webp
---

# SQL 排名函數（ROW_NUMBER、RANK、DENSE_RANK、NTILE）

> 📝 排名函數用於為查詢結果的每一行分配排名編號。本文詳細比較 ROW_NUMBER、RANK、DENSE_RANK、NTILE 四種排名函數的差異與適用情境。

## 前言

排名函數是 SQL 視窗函數（Window Functions）中的一類，用於為結果集中的每一行分配排名編號。它們的差異在於處理相同值（平手）時的行為不同。

:::details 🔗 想看更完整的介紹？
- [SQL 視窗函數完全指南](/database/sql/sql-window-functions) — 包含基本概念、語法、聚合函數 OVER、實際範例與練習
:::

## 排名函數比較

| 函數         | 說明                         | 特點                                         |
| ------------ | ---------------------------- | -------------------------------------------- |
| ROW_NUMBER() | 連續編號，無論值是否相同     | 即使值相同也分配不同編號（1,2,3,4...）       |
| RANK()       | 跳躍排名，相同值使用相同排名 | 相同值排名相同，跳過後續排名（1,1,3,4...）   |
| DENSE_RANK() | 密集排名，相同值使用相同排名 | 相同值排名相同，不跳過後續排名（1,1,2,3...） |
| NTILE(n)     | 將行分配到 n 個等分組        | 將結果集分成 n 組，每組分配組別編號          |

## 排名函數比較範例

:::details 📋 建立資料表與假資料
```sql
-- 建立學生表
CREATE TABLE students (
    student_id INT PRIMARY KEY,
    name VARCHAR(50),
    score INT
);

-- 插入假資料
INSERT INTO students (student_id, name, score) VALUES
(1, '張三', 95),
(2, '李四', 95),
(3, '王五', 90),
(4, '趙六', 85),
(5, '孫七', 85),
(6, '周八', 80),
(7, '吳九', 75);
```
:::

```sql
SELECT
    name,
    score,
    ROW_NUMBER() OVER (ORDER BY score DESC) AS row_num,
    RANK() OVER (ORDER BY score DESC) AS rank_num,
    DENSE_RANK() OVER (ORDER BY score DESC) AS dense_rank
FROM students;

-- 輸出結果：
-- name  | score | row_num | rank_num | dense_rank
-- ------|-------|----------|----------|------------
-- 張三  | 95    | 1        | 1        | 1
-- 李四  | 95    | 2        | 1        | 1
-- 王五  | 90    | 3        | 3        | 2
-- 趙六  | 85    | 4        | 4        | 3
```

**程式碼說明：**
- `ROW_NUMBER`：即使分數相同，也有不同編號
- `RANK`：相同分數排名相同，跳過下一個排名
- `DENSE_RANK`：相同分數排名相同，不跳過排名

## 什麼時候該用哪一個？

| 函數       | 適用場景                   | 範例         |
| ---------- | -------------------------- | ------------ |
| ROW_NUMBER | 需要唯一連續編號           | 分頁查詢、去重取第一名 |
| RANK       | 相同排名可跳過（競賽排名） | 考試成績排名、競賽獎牌 |
| DENSE_RANK | 相同排名不跳過（密集排名） | 薪資等級分類、評等 |
| NTILE      | 將資料分成均勻的群組       |  quartile 分析、分級 |

## 延伸閱讀

- [偏移函數（LAG、LEAD）](/database/sql/sql-window-functions-offset)
- [聚合函數與視窗框](/database/sql/sql-window-functions-aggregate)
- [實際範例與練習](/database/sql/sql-window-functions-examples)
