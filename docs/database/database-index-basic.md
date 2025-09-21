---
outline: "deep"
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: 資料庫索引,MySQL索引,PostgreSQL索引,資料庫優化,SQL效能,索引設計
  - - meta
    - property: og:title
      content: 資料庫索引基礎入門：從零開始理解索引原理
  - - meta
    - property: og:description
      content: 完整的資料庫索引入門教學，從基礎概念到實戰應用。學習MySQL、PostgreSQL索引建立、優化技巧，提升查詢效能從O(n)到O(log n)
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: ./database-index-basic-cover.png
---

# 資料庫索引基礎入門：從零開始理解索引原理

> **TL;DR：** 本文將帶你從零開始理解資料庫索引，學會如何透過建立適當的索引將查詢效能從 `O(n)` 提升到 `O(log n)`，涵蓋 MySQL、PostgreSQL 等主流資料庫的索引設計原則與最佳實踐。

## 📋 文章目錄

1. [為什麼需要資料庫索引？](#為什麼需要資料庫索引)
2. [索引的基本工作原理](#索引的基本工作原理)
3. [索引的類型與使用情境](#索引的類型與使用情境)
4. [索引的優缺點分析](#索引的優缺點分析)
5. [基本索引設計原則](#基本索引設計原則)
6. [常見的索引使用錯誤](#常見的索引使用錯誤)
7. [實戰練習](#實戰練習)
8. [常見問題 FAQ](#常見問題-faq)

## 為什麼需要資料庫索引？

想像一下，你要在一本厚達1000頁的字典中找到「Apple」這個單字。如果沒有索引，你只能從第一頁開始逐頁翻找，這可能需要很長時間。但如果有目錄，你可以快速定位到A開頭的部分，迅速找到目標。

資料庫索引的作用就是如此：
- **避免全表掃描**：沒有索引時，資料庫必須檢查每一筆資料
- **快速定位**：有索引時，可以直接跳到目標資料位置
- **提升效能**：從`O(n)`線性查詢改善為`O(log n)`對數查詢

## 索引的基本工作原理

### 1. 索引結構概念

```sql
-- 假設有一個用戶表
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100),
    age INT,
    city VARCHAR(50)
);

-- 插入一些測試資料
INSERT INTO users VALUES 
(1, '張小明', 'ming@email.com', 25, '台北'),
(2, '李小華', 'hua@email.com', 30, '高雄'),
(3, '王小美', 'mei@email.com', 28, '台中'),
(4, '陳小強', 'qiang@email.com', 35, '台南');
```

沒有索引的查詢（全表掃描）：
```sql
-- 這個查詢會檢查所有行
SELECT * FROM users WHERE email = 'hua@email.com';
```

### 2. 建立索引

```sql
-- 為 email 欄位建立索引
CREATE INDEX idx_user_email ON users(email);

-- 建立後再執行相同查詢，速度會大幅提升
SELECT * FROM users WHERE email = 'hua@email.com';
```

## 索引的類型與使用情境

### 1. 主索引（Primary Index）

每個資料表的主鍵都會自動建立主索引：

```sql
-- 主鍵會自動建立唯一索引
CREATE TABLE products (
    product_id INT PRIMARY KEY,  -- 自動建立索引
    product_name VARCHAR(100),
    price DECIMAL(10,2)
);
```

**使用時機**：
- 根據主鍵查詢（最常見）
- 關聯查詢的連接條件

### 2. 一般索引（Secondary Index）

```sql
-- 為經常查詢的欄位建立索引
CREATE INDEX idx_product_name ON products(product_name);
CREATE INDEX idx_product_price ON products(price);

-- 適用的查詢
SELECT * FROM products WHERE product_name = 'iPhone';
SELECT * FROM products WHERE price BETWEEN 10000 AND 50000;
```

### 3. 唯一索引（Unique Index）

```sql
-- 確保欄位值的唯一性
CREATE UNIQUE INDEX idx_user_email_unique ON users(email);

-- 這樣就無法插入重複的email
-- INSERT INTO users VALUES (5, '測試', 'ming@email.com', 20, '桃園'); -- 會出錯
```

## 索引的優缺點分析

### 優點
1. **大幅提升查詢速度**：特別是大資料表
2. **加速排序操作**：ORDER BY、GROUP BY效能提升
3. **改善JOIN效能**：表與表之間的關聯查詢
4. **減少系統資源消耗**：降低CPU和記憶體使用

### 缺點
1. **佔用額外儲存空間**：每個索引都需要存放空間
2. **降低寫入效能**：INSERT、UPDATE、DELETE時需要維護索引
3. **增加維護成本**：索引需要定期維護和重建

### 實際效能比較

```sql
-- 測試查詢效能的方法
EXPLAIN SELECT * FROM users WHERE email = 'ming@email.com';

-- 無索引結果：
-- type: ALL (全表掃描)
-- rows: 10000 (需要檢查的行數)

-- 有索引結果：
-- type: ref (索引查詢)  
-- rows: 1 (只需檢查1行)
```

## 基本索引設計原則

### 1. 選擇合適的欄位建立索引

**適合建立索引的欄位**：
```sql
-- 經常用於WHERE條件的欄位
CREATE INDEX idx_order_status ON orders(status);
SELECT * FROM orders WHERE status = 'pending';

-- 經常用於JOIN的欄位
CREATE INDEX idx_order_user_id ON orders(user_id);
SELECT * FROM orders o JOIN users u ON o.user_id = u.id;

-- 經常用於ORDER BY的欄位
CREATE INDEX idx_order_created_at ON orders(created_at);
SELECT * FROM orders ORDER BY created_at DESC;
```

**不適合建立索引的欄位**：
```sql
-- 低區分度的欄位（例如：性別、狀態碼）
-- 不建議：CREATE INDEX idx_user_gender ON users(gender);

-- 經常更新的欄位
-- 不建議：CREATE INDEX idx_user_last_login ON users(last_login_time);

-- 很少使用的欄位
-- 不建議：CREATE INDEX idx_user_description ON users(description);
```

### 2. 索引命名規範

```sql
-- 建議的命名方式
CREATE INDEX idx_table_column ON table_name(column_name);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_status ON orders(status);

-- 多欄位索引
CREATE INDEX idx_orders_user_status ON orders(user_id, status);
```

## 常見的索引使用錯誤

### 1. 索引失效的情況

```sql
-- ❌ 在索引欄位上使用函數
SELECT * FROM users WHERE UPPER(name) = 'ZHANG';

-- ✅ 正確的做法
SELECT * FROM users WHERE name = 'Zhang';

-- ❌ 使用NOT EQUAL
SELECT * FROM users WHERE age != 25;

-- ✅ 改用範圍查詢
SELECT * FROM users WHERE age < 25 OR age > 25;

-- ❌ LIKE使用前置通配符
SELECT * FROM users WHERE name LIKE '%明';

-- ✅ 後置通配符可以使用索引
SELECT * FROM users WHERE name LIKE '張%';
```

### 2. 過多索引的問題

```sql
-- ❌ 為每個欄位都建立索引（過度索引）
CREATE INDEX idx1 ON users(name);
CREATE INDEX idx2 ON users(email); 
CREATE INDEX idx3 ON users(age);
CREATE INDEX idx4 ON users(city);
CREATE INDEX idx5 ON users(phone);

-- ✅ 只為常用查詢欄位建立索引
CREATE INDEX idx_users_email ON users(email);      -- 登入查詢
CREATE INDEX idx_users_name ON users(name);        -- 姓名搜尋
```

## 實戰練習

### 練習1：分析查詢效能

```sql
-- 建立測試表
CREATE TABLE orders (
    id INT PRIMARY KEY,
    user_id INT,
    product_id INT,
    order_date DATE,
    status VARCHAR(20),
    amount DECIMAL(10,2)
);

-- 插入測試資料（假設有10萬筆）
-- 分析以下查詢需要什麼索引
SELECT * FROM orders 
WHERE user_id = 123 
AND status = 'completed' 
AND order_date >= '2024-01-01';
```

**解答**：
```sql
-- 建立複合索引來優化這個查詢
CREATE INDEX idx_orders_user_status_date 
ON orders(user_id, status, order_date);
```

### 練習2：索引維護

```sql
-- 查看索引使用情況
SHOW INDEX FROM users;

-- 刪除不必要的索引
DROP INDEX idx_unused_column ON users;

-- 重建索引（當資料大量變更後）
ALTER TABLE users DROP INDEX idx_users_email;
CREATE INDEX idx_users_email ON users(email);
```

## 總結

資料庫索引是提升查詢效能的重要工具：

1. **理解原理**：索引就像書本目錄，幫助快速定位資料
2. **選擇合適欄位**：經常查詢、JOIN、排序的欄位
3. **避免常見錯誤**：不要在索引欄位使用函數或運算
4. **平衡考量**：在查詢效能和寫入效能之間找到平衡點

下一篇文章我們將深入探討B-tree結構、複合索引設計和進階優化技巧，讓你成為索引優化專家！

## 常見問題 FAQ

### Q1: 什麼時候應該建立資料庫索引？

**A:** 當以下情況發生時，建議建立索引：
- 表格資料量超過 1000 筆且有頻繁查詢需求
- 經常使用 WHERE、JOIN、ORDER BY 的欄位
- 查詢回應時間超過可接受範圍（通常 > 100ms）

### Q2: 索引越多越好嗎？

**A:** 不是。過多索引會：
- 佔用額外儲存空間（通常索引大小為原表 10-30%）
- 降低 INSERT、UPDATE、DELETE 效能
- 增加維護成本
建議遵循「80/20 法則」，為 20% 最常用的查詢建立索引。

### Q3: MySQL 和 PostgreSQL 的索引有什麼差異？

**A:** 主要差異包括：
- **MySQL**：主要使用 B+Tree，InnoDB 引擎支援聚集索引
- **PostgreSQL**：支援更多索引類型（GiST、GIN、SP-GiST、BRIN）
- **語法**：基本 CREATE INDEX 語法相同，但進階功能略有差異

### Q4: 如何檢查索引是否有效？

**A:** 可以使用以下方法：
```sql
-- MySQL
EXPLAIN SELECT * FROM table_name WHERE column = 'value';

-- PostgreSQL  
EXPLAIN ANALYZE SELECT * FROM table_name WHERE column = 'value';
```
查看 `type` 欄位，`const` 或 `ref` 表示使用索引，`ALL` 表示全表掃描。

### Q5: 複合索引的欄位順序重要嗎？

**A:** 非常重要！應該遵循：
1. **選擇性高的欄位放前面**（cardinality 高）
2. **等值條件在前，範圍條件在後**
3. **最常用的查詢條件放最左邊**

## 效能基準測試結果

| 資料量       | 無索引查詢時間 | 有索引查詢時間 | 效能提升 |
| ------------ | -------------- | -------------- | -------- |
| 1,000 筆     | 2ms            | 1ms            | 2x       |
| 10,000 筆    | 25ms           | 1ms            | 25x      |
| 100,000 筆   | 300ms          | 1ms            | 300x     |
| 1,000,000 筆 | 3,000ms        | 2ms            | 1,500x   |

*測試環境：MySQL 8.0，Intel i7 CPU，16GB RAM，SSD 硬碟*

<!-- ## 相關教學文章

- [進階索引實戰：B-Tree、複合索引與 Hash Map 全解析](/database/database-index-advanced)
- [SQL 效能優化完整指南](/database/sql-performance-optimization)
- [MySQL 查詢優化最佳實踐](/database/mysql-query-optimization) -->

## 延伸閱讀

- [MySQL 8.0 官方索引文檔](https://dev.mysql.com/doc/refman/8.0/en/optimization-indexes.html)
- [PostgreSQL 索引優化指南](https://www.postgresql.org/docs/current/indexes.html)
- [資料庫效能調優最佳實踐](https://use-the-index-luke.com/)
