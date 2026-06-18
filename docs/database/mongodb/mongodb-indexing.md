---
title: MongoDB 索引設計與效能優化 — COLLSCAN 到 IXSCAN 實戰
description: 從 Yelp 分析平台的實際查詢瓶頸出發，實戰 MongoDB ESR 索引原則、explain("executionStats") 分析，以及複合索引從 COLLSCAN 到 IXSCAN 的 8 倍效能提升
date: 2026-06-18
tags: [MongoDB, Index, Performance, EXPLAIN, ESR]
---

# MongoDB 索引設計與效能優化

> **系列文章**：
> - [MongoDB Schema 設計與 ETL 資料處理](./mongodb-schema-etl)
> - [MongoDB 查詢模式實戰](./mongodb-query-patterns)
> - 本篇：索引設計與效能優化
> - [Prisma + MongoDB 實戰經驗談](./mongodb-prisma-lessons)

## 前言

索引是 MongoDB 效能的命脈。沒有正確的索引，即使 ETL 預聚合做得再好，查詢仍然會全表掃描（COLLSCAN）。

本文透過專案中實際遇到的效能瓶頸，展示 **如何使用 `explain()` 診斷、根據 ESR 原則設計索引、並驗證優化成果**。

---

## 1. 索引總表

專案在 `init-mongo.sh` 中建立的 6 個核心索引：

```javascript
// 1. 地理空間索引（$geoNear 必備）
//    $geoNear 需要 2dsphere 索引才能做球面距離計算
db.business.createIndex({ location: "2dsphere" });

// 2. 全文檢索索引（中英混搜）
//    一個 collection 只能有一個 text index
db.business.createIndex({ search_keywords: "text" });

// 3. 複合索引 — ESR 原則
//    查詢：{ "attributes.WiFi": "free" } + sort({ stars: -1 })
db.business.createIndex({ "attributes.WiFi": 1, stars: -1 });

// 4. 排序索引
//    預設列表排序：review_count DESC
db.business.createIndex({ review_count: -1 });

// 5. Review 關聯索引
//    加速 review → business 與 review 日期排序
db.review.createIndex({ business_id: 1 });
db.review.createIndex({ date: -1 });

// 6. Checkin 關聯與排序索引
db.checkin.createIndex({ business_id: 1 });
db.checkin.createIndex({ total_checkins: -1 });
```

---

## 2. ESR 原則

MongoDB 官方推薦的複合索引設計原則：**Equality → Sort → Range**。

| 順序 | 條件類型 | 說明 | 範例 |
|------|---------|------|------|
| 1st | Equality（等值） | 精確比對的欄位 | `attributes.WiFi = "free"` |
| 2nd | Sort（排序） | 排序欄位 | `sort({ stars: -1 })` |
| 3rd | Range（範圍） | 範圍篩選欄位 | `stars: { $gte: 4.0 }` |

### 實戰對照

以「數位遊牧」查詢為例：

```javascript
// 查詢：免費 WiFi + 高評分，按評論數排序
db.business.find({
  "attributes.WiFi": "free",    // Equality
  stars: { $gte: 4.0 }          // Range
}).sort({ review_count: -1 })    // Sort
```

按照 ESR 原則，索引順序應該是：

```javascript
{ "attributes.WiFi": 1, review_count: -1, stars: 1 }
//       Equality               Sort         Range
```

但實務上因為 `attributes.WiFi` 是稀疏資料（sparse），且 `stars` 的選擇性（selectivity）更高，最終採用的索引是：

```javascript
db.business.createIndex({ "attributes.WiFi": 1, stars: -1 });
```

省略 `review_count` 是因為 `stars DESC` 已經提供了足夠的排序效果，且這是一個 2-field index，體積更小、維護成本更低。

---

## 3. 使用 explain() 診斷效能

### 3.1 優化前：COLLSCAN

```javascript
db.business.find({
  stars: { $gte: 4.0 },
  'attributes.WiFi': 'free'
}).sort({ review_count: -1 }).explain('executionStats');
```

輸出：

```json
{
  "winningPlan": {
    "stage": "SORT",
    "sortPattern": { "review_count": -1 },
    "inputStage": {
      "stage": "COLLSCAN"    // ← 全表掃描！
    }
  },
  "executionStats": {
    "nReturned": 1726,
    "totalDocsExamined": 14568,   // ← 翻了 14,568 筆
    "executionTimeMillis": 57,
    "totalKeysExamined": 0        // ← 完全沒用索引
  }
}
```

**問題分析**：
- `COLLSCAN`：沒有索引可用，掃描整個 collection
- `SORT`：MongoDB 必須在記憶體中做 blocking sort
- `totalDocsExamined` 14,568 vs `nReturned` 1,726：**8.4 倍的浪費**

### 3.2 建立索引

```javascript
db.business.createIndex({ "attributes.WiFi": 1, stars: -1 });
```

### 3.3 優化後：IXSCAN

再次執行同樣的查詢：

```json
{
  "winningPlan": {
    "stage": "FETCH",
    "inputStage": {
      "stage": "IXSCAN",       // ← 索引掃描！
      "indexName": "attributes.WiFi_1_stars_-1",
      "direction": "forward"
    }
  },
  "executionStats": {
    "nReturned": 1726,
    "totalDocsExamined": 1726,     // ← 精準命中！
    "executionTimeMillis": 24,     // ← 快了 2.3 倍
    "totalKeysExamined": 1726
  }
}
```

### 3.4 對比

| 指標 | 優化前（COLLSCAN） | 優化後（IXSCAN） | 進步幅度 |
|------|-------------------|-----------------|---------|
| 執行時間 | 57ms | 24ms | **快 2.3 倍** |
| 掃描文檔數 | 14,568 | 1,726 | **減少 8.4 倍** |
| 索引鍵掃描 | 0（沒索引） | 1,726 | 精準定位 |
| 命中率 | 8.4:1 | 1:1 | **100% 精準** |

---

## 4. 索引設計的取捨

### 4.1 Text Index 的限制

- **一個 Collection 只能有一個 Text Index**
- 如果要對多組欄位做全文檢索，必須合併到同一個 index

```javascript
// ✅ 正確：name + categories + search_keywords 合併為一個 text index
db.business.createIndex(
  { name: "text", categories: "text", search_keywords: "text" },
  { weights: { name: 10, categories: 5, search_keywords: 3 } }
);

// ❌ 錯誤：不能在 business 上建第二個 text index
db.business.createIndex({ name: "text" });  // 會報錯
```

### 4.2 2dsphere 索引

`$geoNear` 必須依賴地理空間索引：

```javascript
// 基本 2dsphere 索引
db.business.createIndex({ location: "2dsphere" });

// 也可以與其他欄位組合（但 2dsphere 必須在最後）
db.business.createIndex({ is_open: 1, location: "2dsphere" });
```

### 4.3 複合索引 vs 單一索引

```javascript
// 單一索引（各自獨立）
db.business.createIndex({ "attributes.WiFi": 1 });
db.business.createIndex({ stars: -1 });

// 複合索引（等值 + 排序）
db.business.createIndex({ "attributes.WiFi": 1, stars: -1 });
```

複合索引可以服務以下所有查詢：
- `find({ "attributes.WiFi": "free" })` — 只用 prefix
- `find({ "attributes.WiFi": "free" }).sort({ stars: -1 })` — 完整索引
- `find({ "attributes.WiFi": "free", stars: { $gte: 4.0 } })` — 等值 + 範圍

但**不能**服務：
- `find({}).sort({ stars: -1 })` — 沒有 prefix 欄位
- `find({ stars: { $gte: 4.0 } })` — 沒有 prefix 欄位

### 4.4 索引選擇性（Selectivity）

選擇性越高（資料越分散），索引效果越好：

| 欄位 | 值域 | 選擇性 | 是否適合索引 |
|------|------|--------|------------|
| `business_id` | 每個商家唯一 | 極高 | ✅ 適合（unique index） |
| `is_open` | 0 或 1 | 極低 | ❌ 不適合單獨索引 |
| `stars` | 0.0 - 5.0 | 中高 | ✅ 適合 |
| `attributes.WiFi` | "free" / "no" / null | 中 | ✅ 適合（做複合索引 prefix） |

---

## 5. 查詢分析工具

### 5.1 查看現有索引

```javascript
db.business.getIndexes();
```

### 5.2 查詢執行計畫

```javascript
// 查看查詢使用了哪個索引
db.business.find({
  stars: { $gte: 4.0 },
  "attributes.WiFi": "free"
}).explain("executionStats");

// 聚合管道的執行計畫
db.business.aggregate([
  { $match: { stars: { $gte: 4.0 } } },
  { $sort: { review_count: -1 } },
  { $limit: 20 }
], { explain: true });
```

### 5.3 索引使用統計

```javascript
db.business.stats();                 // collection 統計
db.business.dataSize();              // 資料大小
db.business.totalIndexSize();        // 索引大小
```

### 5.4 索引命中率推斷

```javascript
// 用 explain 比較不同索引的掃描量
// 掃描量越接近回傳量，索引效果越好
db.business.find({ ... }).explain("executionStats");
// 關注：totalDocsExamined / nReturned 越接近 1 越好
```

---

## 6. 索引維護注意事項

1. **索引不是越多越好**，每個索引都會增加寫入開銷
2. **監控慢查詢**：
   ```javascript
   db.setProfilingLevel(1, 100);  // 記錄超過 100ms 的查詢
   db.system.profile.find().sort({ ts: -1 }).limit(20);
   ```
3. **定期檢查未使用的索引**：MongoDB 4.2+ 用 `$indexStats` 查看使用情況
4. **重建索引**：大量寫入後索引可能碎片化，需要重建
   ```javascript
   db.business.reIndex();
   ```

---

## 下一步

- [Prisma + MongoDB 實戰經驗談](./mongodb-prisma-lessons) — Prisma 如何管理 MongoDB，Docker 部署
- [MongoDB 查詢模式實戰](./mongodb-query-patterns) — 這些索引在服務了哪些查詢
- [MongoDB Schema 設計與 ETL 資料處理](./mongodb-schema-etl) — schema 設計與資料預處理
