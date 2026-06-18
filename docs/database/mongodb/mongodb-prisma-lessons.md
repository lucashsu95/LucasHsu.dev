---
title: Prisma + MongoDB 實戰經驗談 — 取捨、陷阱與 Docker 部署
description: 從 Yelp 分析平台實戰經驗，探討 Prisma + MongoDB 的架構取捨、aggregateRaw 使用技巧、Docker 容器化部署與 Lessons Learned
date: 2026-06-18
tags: [MongoDB, Prisma, Docker, ORM, TypeScript]
---

# Prisma + MongoDB 實戰經驗談

> **系列文章**：
> - [MongoDB Schema 設計與 ETL 資料處理](./mongodb-schema-etl)
> - [MongoDB 查詢模式實戰](./mongodb-query-patterns)
> - [MongoDB 索引設計與效能優化](./mongodb-indexing)
> - 本篇：實戰經驗談

## 前言

大多數 Node.js + MongoDB 專案選擇 Mongoose 做 ODM，但這個專案選擇了 Prisma。經過完整的開發週期後，這裡整理 Prisma + MongoDB 組合的真實體驗：**哪些地方好用、哪些地方踩坑、以及如何補足 ORM 的不足**。

---

## 1. Prisma vs Mongoose 對比

| 層面 | Mongoose | Prisma |
|------|----------|--------|
| **Type Safety** | Schema 定義在 JS，型別靠推斷 | Schema-First，自動生成完整 TS 型別 |
| **Schema 管理** | Code-First（JS 中定義） | 單一 `schema.prisma` 檔案 |
| **複雜查詢** | `.aggregate()` 原生支援 | 簡單查詢用 ORM，複雜查詢用 `aggregateRaw` |
| **Migration** | 無內建 Migration | `prisma generate` + schema push |
| **MongoDB 特有** | 完整支援（middleware, virtual, plugin） | 部分支援（無 Change Streams, 無 Transaction） |
| **Relation** | populate / 手動 | `@relation` 宣告式（但不如 SQL 成熟） |

### 選擇 Prisma 的關鍵原因

**Type Safety** 是最大優勢。Schema 定義在 `.prisma` 檔案中，執行 `prisma generate` 後自動產出完整的 TypeScript 型別：

```typescript
// Prisma 自動生成
interface Business {
  id: string;
  businessId: string;
  name: string;
  stars: number;
  review_count: number;
  attributes: BusinessAttributes | null;
  location: Location | null;
  // ...
}
```

這讓 Controller 和 Service 層的資料傳遞完全型別安全，不用手動寫 interface。

---

## 2. aggregateRaw 模式

Prisma 的 `aggregateRaw` 是整個專案的關鍵 API。它允許直送原生 MQL 給 MongoDB，同時保留 Prisma 的連線管理。

### 基本用法

```typescript
import { PrismaClient, Prisma } from '@prisma/client';

type PipelineStage = Prisma.InputJsonValue;

const pipeline: PipelineStage[] = [
  { $match: { is_open: 1 } },
  { $group: { _id: null, total: { $sum: 1 } } }
];

const result = await this.prisma.business.aggregateRaw({ pipeline });
```

### 型別處理（痛點）

`aggregateRaw` 的回傳型別是 `Prisma.InputJsonValue`，需要手動轉型：

```typescript
// 原始回傳
const raw = await this.prisma.business.aggregateRaw({ pipeline });

// 需要強制轉型
const result = raw as unknown as Array<{
  totalBusinesses?: number;
  averageRating?: number;
}>;

// 或寫輔助函數
function parseTotalCount(agg: Prisma.InputJsonValue): number {
  if (!Array.isArray(agg)) return 0;
  const first = agg[0];
  if (typeof first !== 'object' || first === null) return 0;
  const total = (first as Record<string, unknown>).total;
  return typeof total === 'number' ? total : 0;
}
```

### 混合使用建議

```typescript
export class BusinessService {
  constructor(private prisma: PrismaClient) {}

  // ✅ 簡單查詢用 Prisma ORM
  async getById(id: string) {
    return this.prisma.business.findUnique({
      where: { id },
      include: {
        reviews: { take: 10, orderBy: { date: 'desc' }, include: { user: true } }
      }
    });
  }

  // ✅ 複雜聚合用 aggregateRaw
  async searchAdvanced(params: SearchParams) {
    const pipeline = this.buildPipeline(params);
    return this.prisma.business.aggregateRaw({ pipeline });
  }

  // ✅ 平行查詢（分頁 + 總數）
  async getList(page: number) {
    const [items, total] = await Promise.all([
      this.prisma.business.aggregateRaw({ pipeline: this.buildListPipeline(page) }),
      this.prisma.business.aggregateRaw({ pipeline: [{ $count: 'total' }] })
    ]);
    return { items, total: parseTotalCount(total) };
  }
}
```

---

## 3. Prisma Schema 細節

### 3.1 MongoDB 專屬設定

```prisma
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")  // mongodb://mongodb:27017/yelp_db
}

model Business {
  id   String @id @default(auto()) @map("_id") @db.ObjectId
  //              ↑ auto() 讓 MongoDB 自動產生 ObjectId
  //              ↑ @db.ObjectId 告訴 Prisma 這是 ObjectId 類型
  name String
}
```

### 3.2 修改 Schema 後的步驟

```bash
# 每次修改 schema.prisma 後執行
npx prisma generate

# MongoDB 不需要 migration（schema-less）
# 但必須確保 generate 後的 Client 與資料庫中的欄位一致
```

### 3.3 雙 ID 策略的 Prisma 實作

```prisma
model Business {
  id             String    @id @default(auto()) @map("_id") @db.ObjectId
  businessId     String    @unique @map("business_id")
  //             ↑ Yelp 字串 ID，用於 review/checkin/tip 關聯
  //             ↑ @unique 是 Prisma @relation 的必要條件
}

model Review {
  businessId  String   @map("business_id")
  business    Business @relation(fields: [businessId], references: [businessId])
  //                                          ↑ 指向 Business.businessId（字串）
}
```

---

## 4. Docker 部署

### 4.1 容器架構

```yaml
services:
  mongodb:
    image: mongo:7
    ports: ["27017:27017"]
    environment:
      MONGO_INITDB_DATABASE: yelp_db
    volumes:
      - yelp_mongodb_data:/data/db
    healthcheck:
      test: ["CMD", "mongosh", "--eval", "db.adminCommand('ping')"]
      interval: 10s
      start_period: 30s

  mongo-init:
    build:
      context: .
      dockerfile: scripts/Dockerfile    # 基於 mongo:7 映像
    depends_on:
      mongodb: { condition: service_healthy }
    volumes:
      - ./datas:/import_data:ro          # JSON 資料檔
      - ./mongo-backup:/dump:ro          # mongodump 備份（快速恢復用）

  server:
    build: ./server
    environment:
      DATABASE_URL: mongodb://mongodb:27017/yelp_db
    depends_on:
      mongodb: { condition: service_healthy }
      mongo-init: { condition: service_completed_successfully }
```

### 4.2 啟動順序

```
1. mongodb 啟動 → healthcheck 通過
2. mongo-init 啟動 → 匯入資料 + 建立索引 → 完成後退出
3. server 啟動 → 確保資料已經就緒
4. client 啟動 → 連接 server
```

### 4.3 資料初始化流程（init-mongo.sh）

```bash
# 1. 等到 MongoDB 就緒
until mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1; do sleep 2; done

# 2. 檢查是否已有資料（支援重啟不重複匯入）
COUNT=$(mongosh --quiet --eval "db.business.countDocuments()")
[ "$COUNT" -gt "0" ] && exit 0

# 3. mongoimport 匯入 5 個 collection
mongoimport --db yelp_db --collection business --file /import_data/business.json
mongoimport --db yelp_db --collection review --file /import_data/review.json --numInsertionWorkers 4

# 4. 建立索引
mongosh <<EOF
  db.business.createIndex({ location: "2dsphere" });
  db.business.createIndex({ search_keywords: "text" });
  db.business.createIndex({ "attributes.WiFi": 1, stars: -1 });
  db.business.createIndex({ review_count: -1 });
  db.review.createIndex({ business_id: 1 });
  db.review.createIndex({ date: -1 });
EOF

# 5. 驗證
echo "Business: $(db.business.countDocuments()) 筆"
```

### 4.4 環境變數

```env
# 開發環境（Docker）
DATABASE_URL=mongodb://mongodb:27017/yelp_db

# 開發環境（本機）
DATABASE_URL=mongodb://localhost:27017/yelp_db
```

---

## 5. Lessons Learned

### 5.1 aggregateRaw 的型別是最大痛點

`aggregateRaw` 雖然保留了完整的 MQL 能力，但回傳型別需要手動 `as unknown as X`。解法是為每個 pipeline 定義輸出 interface：

```typescript
interface OverviewStats {
  totalBusinesses: number;
  averageRating: number;
  totalReviews: number;
}

const result = await this.prisma.business.aggregateRaw({ pipeline })
  as unknown as OverviewStats[];
```

### 5.2 ObjectId 驗證

使用 `findUnique({ where: { id } })` 前，必須先驗證 id 是否為合法的 ObjectId 格式，否則 Prisma 會報錯：

```typescript
// BusinessUtils.ts
export function isValidObjectId(id: string): boolean {
  return /^[a-fA-F0-9]{24}$/.test(id);
}

// 使用
async getBusinessById(id: string) {
  if (!isValidObjectId(id)) {
    throw new AppError('Invalid business id', 400);
  }
  return this.prisma.business.findUnique({ where: { id }, include: { ... } });
}
```

### 5.3 Prisma 的 MongoDB Relation 支援

雖然 Prisma 支援 MongoDB 的 `@relation`，但不如 SQL 資料庫成熟：

- **不支援 CASCADE delete** — 刪除 business 不會自動刪除關聯的 review
- **不支援複合 foreign key** — 只能用單一欄位關聯
- **`include` 會產生多條查詢** — Prisma 不是用 `$lookup`，而是分別查詢後在應用層組合
- **巢狀 include 可能產生 N+1 問題** — 需要小心使用 `select` 限制欄位

### 5.4 Index 管理不在 Prisma 層

Prisma 的 MongoDB provider **不支援 `prisma migrate`**（MongoDB 是 schema-less）。索引必須透過 `mongosh` 或 `aggregateRaw({ $createIndexes })` 手動管理。

專案的做法是在 `init-mongo.sh` 中集中管理索引建立腳本。

### 5.5 預聚合設計模式的適用場景

不是所有資料都適合預聚合。判斷標準：

| 適合預聚合 | 不適合預聚合 |
|-----------|------------|
| 寫入後很少變動的歷史資料 | 頻繁更新的即時資料 |
| 查次数 >> 寫入次數 | 寫入次數 >> 查詢次數 |
| 查詢延遲要求嚴格（<10ms） | 可以接受 >100ms 的查詢 |
| 聚合邏輯固定不變 | 聚合條件經常變化 |

Checkin 資料完全符合前兩項 — 歷史打卡資料不會變動，讀取次數遠高於寫入。

---

## 6. 總結

**Prisma + MongoDB 的殺手級組合**：Schema-First 的型別安全 + `aggregateRaw` 的 MQL 完整能力。

- 日常 CRUD 用 Prisma ORM，簡單、安全、型別完整
- 複雜聚合用 `aggregateRaw`，保留 MQL 的全部彈性
- 索引和資料初始化交給 shell script，保持 Prisma Schema 的乾淨

這個模式不是萬能的，但在 **型別安全優先、需要複雜聚合、不依賴 MongoDB 特有功能（Change Streams、Transaction）** 的專案中，是非常值得考慮的架構選擇。

---

## 下一步

- [MongoDB Schema 設計與 ETL 資料處理](./mongodb-schema-etl) — 雙 ID 策略與預聚合
- [MongoDB 查詢模式實戰](./mongodb-query-patterns) — 6 種查詢模式完整範例
- [MongoDB 索引設計與效能優化](./mongodb-indexing) — ESR 原則與 explain 分析
