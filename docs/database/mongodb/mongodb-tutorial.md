---
title: MongoDB 實戰系列 — 從 Yelp 分析平台學 MongoDB
description: 以 Yelp 商業地理與情感智慧系統為案例，四篇文章深入 MongoDB Schema 設計、ETL 資料處理、查詢模式、索引優化與 Prisma 實戰
date: 2026-06-18
tags: [MongoDB, 系列總覽]
---

# MongoDB 實戰系列總覽

本系列源自 **Yelp 商業地理與情感智慧系統**（Yelp Business Geography & Sentiment Intelligence System）的真實開發經驗。該專案採用 MEVN 架構（MongoDB + Express + Vue + Node.js），處理 Yelp Open Dataset 的 Philadelphia 區域資料，實現了中文跨語搜尋、地理空間探索、打卡流量分析等功能。

不同於一般的 MongoDB 教學，這個系列從 **真實專案的程式碼與決策** 出發，展示 Schema 設計、查詢模式、索引優化與 ORM 選擇的完整思考脈絡。

---

## 系列文章

### ① [MongoDB Schema 設計與 ETL 資料處理](./mongodb-schema-etl)

最關鍵也最容易被忽略的環節。涵蓋：

- **雙 ID 策略**：同時保留 MongoDB ObjectId 與 Yelp 原始字串 ID
- **嵌入式型別**：用 Prisma `type` 定義巢狀屬性與 GeoJSON
- **GeoJSON 轉換**：`latitude/longitude` → `{ type: "Point", coordinates }`
- **中文關鍵字注入**：140+ 類別英中映射，實現「搜中文、找英文店」
- **Checkin 預聚合**：將 Runtime 無法負擔的計算移到 ETL 階段，查詢從 300ms→5ms
- **屬性髒資料清洗**：用 Python `ast.literal_eval` 解析非標準格式

### ② [MongoDB 查詢模式實戰](./mongodb-query-patterns)

6 種查詢模式，每種都附 Prisma TypeScript 與 MQL 對照：

- `$regex` 多欄位模糊搜尋 + 分頁
- `$geoNear` 地理空間搜尋 + 4 種排序策略
- `$text` 全文檢索與相關性分數
- `$group/$bucket/$cond` 統計彙總
- `$lookup` 跨集合作業
- 預聚合資料的 O(1) 讀取

### ③ [MongoDB 索引設計與效能優化](./mongodb-indexing)

從 COLLSCAN 到 IXSCAN 的完整實戰：

- **ESR 原則**：Equality → Sort → Range
- **6 個核心索引**的設計理由
- **explain("executionStats")** 診斷：57ms→24ms，掃描量減少 8.4 倍
- 複合索引 vs 單一索引的選擇
- Text Index 的限制與注意事項

### ④ [Prisma + MongoDB 實戰經驗談](./mongodb-prisma-lessons)

為什麼選 Prisma 而不是 Mongoose：

- Prisma vs Mongoose 完整對比
- `aggregateRaw` 的使用技巧與型別處理
- Schema 設計細節與雙 ID 策略
- Docker 容器化部署（MongoDB 7 + mongo-init + Express）
- Lessons Learned：ObjectId 驗證、Relation 限制、預聚合適用場景

---

## 專案資訊

- **原始碼**：[yelp-analysis-vue-express-mongodb](https://github.com/LucasHsu/yelp-analysis-vue-express-mongodb)
- **技術棧**：MongoDB 7 + Express + Prisma + Vue 3 / Next.js 16 + Docker
- **資料集**：Yelp Open Dataset（Philadelphia）
