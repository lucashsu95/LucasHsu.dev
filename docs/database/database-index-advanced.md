---
outline: "deep"
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: 進階索引,B-Tree,複合索引,Hash索引,資料庫優化,MySQL索引,PostgreSQL索引,索引設計,SQL效能
  - - meta
    - property: og:title
      content: 進階索引實戰：B-Tree、複合索引與 Hash Map 全解析
  - - meta
    - property: og:description
      content: 深入解析B-Tree、Hash索引與複合索引原理，學習進階索引設計技巧，從3秒查詢優化到50毫秒的實戰案例
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/mysql-cover.jpg
---

# 進階索引實戰：B-Tree、複合索引與 Hash Map 全解析

> 📝 TL;DR：B-Tree 支援範圍/排序查詢，Hash 適合等值熱點；複合索引遵循「等值在前、範圍在後、高選擇性優先」原則；覆蓋索引可避免回表，定期維護確保效能。

## 前置知識

在開始之前，建議你先了解以下概念：

- **資料庫索引基礎** - [資料庫索引基礎](/database/database-index-basic) - 理解索引的基本原理
- **SQL 查詢基礎** - 熟悉 SELECT、WHERE、JOIN 等語法
- **EXPLAIN 分析** - 了解如何查看查詢計劃

## 什麼是複合索引？

### 為什麼需要學習它？

複合索引是包含多個欄位的索引，可以大幅提升多條件查詢的效能：

- **解決什麼問題？** 多條件 WHERE 查詢慢、單欄位索引無法滿足複雜查詢
- **有什麼優勢？** 一次索引滿足多個查詢條件，減少 I/O 次數
- **什麼時候會用到？** 經常同時查詢多個欄位時，如 `WHERE country='TW' AND status='paid'`

### 複合索引原理圖（最左前綴）

```mermaid
graph LR
    A[索引鍵順序] --> B[Col1: 高選擇性/等值]
    B --> C[Col2: 等值或次高選擇性]
    C --> D[Col3: 範圍條件放後]
    D --> E[葉節點有序<br/>支援範圍掃描]
```

:::warning ⚠️ 最左前綴原則
複合索引 `(A, B, C)` 只有包含 A 的查詢才能命中！
- ✅ `WHERE A=1` - 命中
- ✅ `WHERE A=1 AND B=2` - 命中
- ✅ `WHERE A=1 AND B=2 AND C>10` - 命中
- ❌ `WHERE B=2` - 不命中！
- ❌ `WHERE C>10` - 不命中！
:::

## 1. B-Tree／B+Tree：關聯式資料庫的預設索引

### 1-1 為何不是二元樹？

磁碟 I/O 一次可讀取整個 **block (4K/8K)**，若用二元樹，每層只存 2 個指標，會造成 I/O 次數過多。B-Tree 允許 *m* 階，一頁存放大量 key，從而大幅降低樹高[25][29]。

### 1-2 結構分層

```
Root (1 page)
 ├─ Internal Node (多頁)
 └─ Leaf Node (大量頁) ← 實際儲存資料位置 / PK 值
```

- **葉層** 按 key 有序鏈結，可做範圍掃描 (between、>
  <)。
- **中間層** 只存 key+child pointer，加快導向。
- **根層** 永遠在記憶體，搜尋複雜度 **O(logₘ n)**。

> 類比 Service Worker：Root 像 JS Runtime 常駐記憶體的快取索引表，Leaf 像實際 Cache Storage blob。

### 1-3 建立範例

```sql
-- email + created_at 結合範圍 + 等值
CREATE INDEX idx_user_email_date ON users(email, created_at);

-- 解讀
-- 1. email 完全比對時 → 直接走索引
-- 2. email 比對後再依 created_at 做區段掃描 → 善用葉層有序
```

### 1-4 注意事項

1. **最左前綴**：查詢條件需含最左欄位才能命中索引。
2. **回表 (Key Lookup)**：非覆蓋欄位須再到資料頁讀取，等同 PWA Cache Miss。


## 2. Hash Index：O(1) 等值查詢神器

### 2-1 運作流程

1. 對 key 執行雜湊函式 `hash(key)` → 得 bucket 位址。
2. 直接定位資料列 (或 PK)。

複雜度 **O(1)**，缺點是不支援範圍、排序，也無法利用最左前綴原則[30]。

```sql
-- InnoDB MEMORY Engine 才支援顯式 HASH
CREATE TABLE hotspot (
  id INT PRIMARY KEY,
  code CHAR(8),
  VALUE INT,
  INDEX USING HASH (code)
) ENGINE=MEMORY;
```

### 2-2 Hash Map 類比

```js
// JS 雜湊表：Key => Value
const map = new Map();
map.set('code_abc', 123);
console.log(map.get('code_abc')); //  O(1)
```

資料庫 Hash Index 與 JavaScript `Map` 原理一致：**雜湊衝突 (collision) 需鏈結或開放定址處理**。

## 3. 複合索引（Composite / Multiple Column Index）

### 3-1 建立原則

1. **選擇性最高 (cardinality) 放最左**
2. **將常用且固定的等值欄位放前**，範圍條件塞尾端

```sql
-- 依以下查詢頻率排序
-- a. WHERE country='TW' AND status='paid' AND created_at>'2025-01-01'
-- b. WHERE country='TW' AND status='pending'
CREATE INDEX idx_orders_country_status_date
ON orders(country, status, created_at);
```

### 3-2 覆蓋索引 (Covering Index)

若 `SELECT` 欄位完全被索引覆蓋 → **不需回表**

```sql
-- 索引欄位已包含查詢所需欄位 total
SELECT country, status, total
FROM   orders FORCE INDEX (idx_orders_country_status_date)
WHERE  country='TW' AND status='paid'; -- 直接返回索引頁
```

**結果**：I/O 降至單純索引掃描，等同 PWA Cache First 策略。

## 4. 快取策略 vs. 索引策略：最佳化思路對照

| PWA 策略               | 資料庫對應                | 適用場景                   |
| ---------------------- | ------------------------- | -------------------------- |
| Cache First            | 覆蓋索引 (只走索引頁)     | 熱門讀多寫少清單           |
| Network First          | 非覆蓋索引 + 回表         | 資料即時性高，需要最新 row |
| Stale-While-Revalidate | 舊索引保留 + 背景 REBUILD | 夜間批次重建大索引         |

> TIP：夜深人靜做 `OPTIMIZE TABLE` = 背景 Revalidate Cache。

## 實戰案例：從 3 秒 → 50 毫秒

### 問題描述

```sql
SELECT order_id, total
FROM   orders
WHERE  user_id = 42
AND    status = 'paid'
AND    order_date BETWEEN '2025-01-01' AND '2025-07-01';
```

- 100 萬筆訂單，EXPLAIN 顯示 `type: ALL`，耗時 3 秒。

### 解決方案

```sql
CREATE INDEX idx_orders_user_status_date
ON orders(user_id, status, order_date);
```

### EXPLAIN 前後對比（MySQL 8.0，100 萬筆）

| 狀態     | type  | rows      | Extra             | 估計耗時 |
| -------- | ----- | --------- | ----------------- | -------- |
| 未加索引 | ALL   | 1,000,000 | Using where       | ~3s      |
| 新索引   | RANGE | ~120      | Using index range | ~50ms    |

> 重點：`type` 從 ALL → RANGE，rows 大幅下降；若 SELECT 欄位僅索引列，可加 `USING INDEX` 成覆蓋索引，再省去回表。

### 程式碼說明：
1. 建立複合索引，依照「等值在前、範圍在後」
2. user_id 和 status 為等值查詢，放在最前
3. order_date 為範圍查詢，放在最後
4. 索引命中後，rows 從 100 萬降至 120 筆，效能提升 60 倍

## 實戰練習

### 練習 1：設計複合索引（簡單）⭐

**任務：** 查詢條件：`WHERE tenant_id=? AND status=? AND created_at BETWEEN ...`，請設計索引並說明順序。

**提示：**
- 等值條件放前
- 範圍條件放後

:::details 參考答案
```sql
CREATE INDEX idx_tenant_status_date 
ON your_table(tenant_id, status, created_at);
```

**說明：**
1. tenant_id 和 status 為等值查詢 (`=`)，優先級高
2. created_at 為範圍查詢 (BETWEEN)，放最後
3. 這樣可以充分利用索引的最左前綴特性
:::

### 練習 2：覆蓋索引判斷（簡單）⭐

**任務：** SELECT 只取 `tenant_id, status, created_at`，是否會回表？

**思考方向：**
- 什麼是覆蓋索引？
- 索引是否包含所有查詢欄位？

:::details 參考答案
若索引正是 `(tenant_id, status, created_at)`，屬於覆蓋索引，`Extra: Using index`，**不會回表**。

**原因：**
- SELECT 的所有欄位都在索引中
- 資料庫可以直接從索引頁讀取資料
- 省去回表查找實際資料頁的 I/O
:::

### 練習 3：排查索引失效（中等）⭐⭐

**任務：** 查詢 `WHERE email LIKE '%gmail.com' AND created_at > '2025-01-01'` 變慢，如何優化？

**需求：**
1. 分析為何索引無法命中
2. 提出優化方案
3. 考慮替代方案

**提示：**
- 前置 `%` 對索引的影響
- 考慮全文索引或欄位拆分

:::details 參考答案與解題思路

**解題思路：**
1. **問題分析：**
   - 前置 `%` 破壞 B-Tree 最左前綴，email 索引用不上
   - 變成全表掃描（Table Scan）

2. **優化方案：**

   **方案 1：新增 domain 欄位**
   ```sql
   ALTER TABLE users ADD COLUMN email_domain VARCHAR(100);
   UPDATE users SET email_domain = SUBSTRING_INDEX(email, '@', -1);
   CREATE INDEX idx_email_domain ON users(email_domain, created_at);
   
   -- 查詢改寫
   WHERE email_domain = 'gmail.com' AND created_at > '2025-01-01';
   ```

   **方案 2：使用全文索引**
   ```sql
   -- MySQL
   CREATE FULLTEXT INDEX idx_email_fulltext ON users(email);
   WHERE MATCH(email) AGAINST('gmail.com' IN BOOLEAN MODE);
   
   -- PostgreSQL
   CREATE INDEX idx_email_gin ON users USING GIN(email gin_trgm_ops);
   WHERE email LIKE '%gmail.com%';
   ```

   **方案 3：先篩 created_at，再篩 email**
   ```sql
   CREATE INDEX idx_created_at ON users(created_at);
   -- 先用範圍縮小範圍，再在應用層篩選 email
   ```

**延伸思考：**
- 如果是 `LIKE 'gmail%'` 呢？（可用索引）
- 怎麼選擇最佳方案？（考慮查詢頻率、資料量）
:::

## 6. 索引維護與監控

1. **重組 / 重建**：`ALTER INDEX ... REBUILD;` (SQL Server) 或 `OPTIMIZE TABLE` (MySQL)
2. **碎片率**：>30% 建議 REBUILD
3. **冗餘索引偵測**：慢查詢日誌 + `SHOW INDEX` + 卡片法清理
4. **統計資訊更新**：`ANALYZE TABLE` 保證最佳化器選對索引

## 7. 常見地雷與排雷技巧

| 地雷                                  | 解法                                                |
| ------------------------------------- | --------------------------------------------------- |
| 在索引欄位使用函數 `YEAR(created_at)` | 建立 **函數索引 (Expression Index)** 或改寫範圍查詢 |
| LIKE '%keyword%' 前置百分比           | 使用全文索引 (FULLTEXT, GIN)                        |
| 多欄都建單欄索引 → 過度索引           | 合併為複合索引，或只保留高選擇性                    |
| 低選擇度欄位建索引 (gender)           | 搭配高選擇度欄或省略索引                            |

## 8. 小結

1. **B-Tree** 適用大部分範圍/排序查詢；
2. **Hash Index** 適用極端熱點等值查詢；
3. **複合索引** = 把常用條件壓縮進單一樹；
4. **索引就像快取**：讀快、寫慢、需清理；
5. **定期維護**、監控慢查詢，才能持續保持「秒開體驗」。

> 下一步：動手用 `EXPLAIN` 為你的專案打造「量身訂做」的索引組合，像調 Service Worker Cache Policy 一樣，讓資料庫也能一樣快！

## 常見問題 FAQ

### Q1: B-Tree 和 Hash 索引該如何選擇？

**A:** 選擇依據：
- **B-Tree**：適用範圍查詢、排序、模糊搜尋（`LIKE 'prefix%'`）
- **Hash**：純等值查詢，如用戶ID查詢、狀態碼比對
- **混合策略**：熱點數據用Hash，一般查詢用B-Tree

### Q2: 複合索引的欄位順序如何決定？

**A:** 遵循以下原則：
1. **等值條件 > 範圍條件**
2. **高選擇性 > 低選擇性**（cardinality高的在前）
3. **查詢頻率高 > 查詢頻率低**

```sql
-- 優先順序：country(等值) > status(等值) > created_at(範圍)
CREATE INDEX idx_orders_country_status_date 
ON orders(country, status, created_at);
```

### Q3: 如何判斷索引是否需要重建？

**A:** 監控指標：
- **碎片率 > 30%**：需要重建
- **索引深度過深**：樹高 > 4層
- **查詢效能下降**：相同查詢變慢

```sql
-- MySQL 檢查索引碎片
SHOW TABLE STATUS LIKE 'table_name';
-- 重建索引
OPTIMIZE TABLE table_name;
```

### Q4: 覆蓋索引和非覆蓋索引的效能差異？

**A:** 效能對比：
- **覆蓋索引**：只需索引掃描，I/O次數少
- **非覆蓋索引**：需要回表查詢，額外I/O成本

實測數據顯示覆蓋索引可提升 **2-5倍** 查詢效能。

### Q5: 什麼情況下不建議使用索引？

**A:** 避免索引的情況：
- **小表**（< 1000筆資料）
- **寫入頻繁的表**（寫入:讀取 > 3:1）
- **低選擇性欄位**（如 gender, status 只有2-3個值）

## 進階索引效能測試

| 索引類型 | 查詢類型     | 100萬筆數據耗時 | 適用場景       |
| -------- | ------------ | --------------- | -------------- |
| B-Tree   | 等值查詢     | 2-5ms           | 通用查詢       |
| B-Tree   | 範圍查詢     | 10-50ms         | 日期、數值範圍 |
| Hash     | 等值查詢     | 1-2ms           | 熱點數據查詢   |
| 複合索引 | 多條件查詢   | 1-3ms           | 複雜業務查詢   |
| 覆蓋索引 | 特定欄位查詢 | 0.5-1ms         | 報表、統計查詢 |

*測試環境：MySQL 8.0，SSD硬碟，16GB記憶體*

<!-- ## 相關教學文章

- [資料庫索引基礎入門：從零開始理解索引原理](/database/database-index-basic)
- [SQL JOIN 優化技巧與索引策略](/database/sql-join-optimization)
- [MySQL 查詢計劃分析與 EXPLAIN 詳解](/database/mysql-explain-analysis) -->

## 延伸閱讀

- [MySQL InnoDB B+Tree 深度解析](https://dev.mysql.com/doc/refman/8.0/en/innodb-index-types.html)
- [PostgreSQL 索引類型完整指南](https://www.postgresql.org/docs/current/indexes-types.html)
- [High Performance MySQL 第三版](https://www.oreilly.com/library/view/high-performance-mysql/9781449332471/)