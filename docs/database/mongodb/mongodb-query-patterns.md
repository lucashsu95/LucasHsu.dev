---
title: MongoDB 查詢模式實戰 — 從 $regex 到 $geoNear + $text + $lookup
description: 以 Yelp 分析平台為例，實戰 6 種 MongoDB 查詢模式：分頁搜尋、地理空間、全文檢索、統計彙總、跨集合作業與預聚合讀取
date: 2026-06-18
tags: [MongoDB, Aggregation, $geoNear, $text, $lookup, Prisma]
---

# MongoDB 查詢模式實戰

> **系列文章**：
> - [MongoDB Schema 設計與 ETL 資料處理](./mongodb-schema-etl)
> - 本篇：查詢模式實戰
> - [MongoDB 索引設計與效能優化](./mongodb-indexing)
> - [Prisma + MongoDB 實戰經驗談](./mongodb-prisma-lessons)

## 前言

本文展示專案中使用的 6 種 MongoDB 查詢模式，全部透過 Prisma 的 `aggregateRaw` 直送原生 MQL。每一種模式都會附 Prisma TypeScript 程式碼與對應的 MongoDB Shell 語法。

---

## 模式 1：基礎分頁 + 關鍵字搜尋（`$regex`）

`BusinessService` 使用 `aggregateRaw` 組合 pipeline，支援多欄位模糊搜尋：

```typescript
// Prisma TypeScript
const pipeline = [
  { $match: {
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { categories: { $regex: keyword, $options: 'i' } },
        { search_keywords: { $regex: keyword, $options: 'i' } }
      ]
  }},
  { $sort: { [sortField]: sortOrder === 'asc' ? 1 : -1 } },
  { $skip: (page - 1) * pageSize },
  { $limit: pageSize },
  { $project: {
      _id: 0,
      id: { $toString: '$_id' },
      name: 1, stars: 1, review_count: 1,
      categories: 1, attributes: 1
  }}
];

const items = await this.prisma.business.aggregateRaw({ pipeline });
```

總數用另一個 `aggregateRaw` 平行查詢：

```typescript
const [items, totalAgg] = await Promise.all([
  this.prisma.business.aggregateRaw({ pipeline }),
  this.prisma.business.aggregateRaw({
    pipeline: [{ $match: matchStage }, { $count: 'total' }]
  })
]);
```

對應 MQL：

```javascript
db.business.aggregate([
  { $match: { $or: [
    { name: { $regex: "coffee", $options: "i" } },
    { categories: { $regex: "coffee", $options: "i" } },
    { search_keywords: { $regex: "咖啡", $options: "i" } }
  ]}},
  { $sort: { review_count: -1 } },
  { $skip: 0 },
  { $limit: 20 },
  { $project: {
      _id: 0, id: { $toString: "$_id" },
      name: 1, stars: 1, review_count: 1
  }}
]);

// 總數
db.business.countDocuments({ $or: [
  { name: { $regex: "coffee", $options: "i" } },
  { categories: { $regex: "coffee", $options: "i" } },
]});
```

---

## 模式 2：地理空間搜尋（`$geoNear`）

`SearchService` 實作了四種搜尋模式，其中最完整的 **geoKeyword** 模式：

```typescript
// Prisma — geoKeyword 模式 pipeline
const pipeline = [
  // 第一階段：$geoNear 必須是 pipeline 第一階段
  { $geoNear: {
      near: { type: 'Point', coordinates: [lng, lat] },
      distanceField: 'distance',
      maxDistance: radiusInMeters,
      spherical: true,
      query: { is_open: 1 }
  }},
  // 第二階段：關鍵字過濾
  { $match: {
      $or: [
        { name: { $regex: keywordText, $options: 'i' } },
        { categories: { $regex: keywordText, $options: 'i' } },
        { search_keywords: { $regex: keywordText, $options: 'i' } }
      ]
  }},
  // 第三階段：計算文字相關性分數
  { $addFields: {
      textScore: {
        $add: [
          { $cond: [{ $regexMatch: { input: '$name', regex: keywordText } }, 3, 0] },
          { $cond: [{ $regexMatch: { input: '$categories', regex: keywordText } }, 2, 0] },
          { $cond: [{ $regexMatch: { input: '$search_keywords', regex: keywordText } }, 1, 0] }
        ]
      }
  }}
];
```

### 排序策略

支援 4 種模式 × 2 種優先級：

```typescript
const strategies = {
  geoKeyword: {
    distance:  { distance: 1, stars: -1 },            // 距離優先
    relevance: { textScore: -1, stars: -1, distance: 1 } // 相關性優先
  },
  geoOnly: {
    distance:  { distance: 1, stars: -1 },
    relevance: { distance: 1, stars: -1 }
  },
  keywordOnly: {
    distance:  { textScore: -1, stars: -1 },
    relevance: { textScore: -1, stars: -1 }
  },
  fallback: {
    distance:  { stars: -1, review_count: -1 },
    relevance: { stars: -1, review_count: -1 }
  }
};
```

對應 MQL：

```javascript
db.business.aggregate([
  { $geoNear: {
      near: { type: "Point", coordinates: [-75.1652, 39.9526] },
      distanceField: "distance",
      maxDistance: 5000,
      spherical: true,
      query: { is_open: 1 }
  }},
  { $match: { $text: { $search: "restaurant" } } },
  { $match: { stars: { $gte: 4.0 } } },
  { $sort: { distance: 1, stars: -1 } },
  { $limit: 20 },
  { $project: {
      _id: 0, id: { $toString: "$_id" },
      name: 1, stars: 1, distance: 1
  }}
]);
```

---

## 模式 3：全文檢索（`$text`）

當沒有地理位置參數時，改用 MongoDB Text Index：

```typescript
private buildTextStages(ctx: SearchContext): PipelineStage[] {
  return [
    { $match: { $text: { $search: ctx.keywordText }, is_open: 1 } },
    { $addFields: { textScore: { $meta: 'textScore' } } }
  ];
}
```

MQL：

```javascript
db.business.aggregate([
  { $match: { $text: { $search: "coffee" }, is_open: 1 } },
  { $addFields: { textScore: { $meta: "textScore" } } },
  { $sort: { textScore: -1 } },
  { $project: { name: 1, score: { $meta: "textScore" } } },
  { $limit: 20 }
]);
```

Text Index 的權重設定影響排序結果：

```javascript
db.business.createIndex(
  { name: "text", categories: "text", search_keywords: "text" },
  { weights: { name: 10, categories: 5, search_keywords: 3 } }
);
```

搜尋結果範例（關鍵字 "coffee"）：

| name | textScore |
|------|-----------|
| Ground Up Coffee Shop | 20.57 |
| Odyssey Coffee Shop | 20.54 |
| Ben and Betsy's Coffee and Gifts | 16.03 |
| Jiggy Coffee | 15.36 |
| 9th Street Coffee & Tea | 15.34 |

---

## 模式 4：統計彙總（`$group` / `$bucket` / `$cond`）

`StatisticsService` 實作了三種儀表板查詢。

### 4a. 總覽統計

```typescript
const pipeline = [{
  $group: {
    _id: null,
    totalBusinesses: { $sum: 1 },
    averageRating: { $avg: '$stars' },
    totalReviews: { $sum: '$review_count' },
    openCount: { $sum: { $cond: [{ $eq: ['$is_open', 1] }, 1, 0] } }
  }
}];
```

```javascript
db.business.aggregate([
  { $group: {
      _id: null,
      totalBusinesses: { $sum: 1 },
      averageRating: { $avg: "$stars" },
      totalReviews: { $sum: "$review_count" },
      openRate: { $avg: "$is_open" }
  }}
]);
```

### 4b. 評分分佈（`$bucket`）

```typescript
[{
  $bucket: {
    groupBy: '$stars',
    boundaries: [0, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5.1],
    default: 'other',
    output: { count: { $sum: 1 } }
  }
}];
```

```javascript
db.business.aggregate([
  { $bucket: {
      groupBy: "$stars",
      boundaries: [0, 1, 2, 3, 4, 5],
      default: "Other",
      output: { count: { $sum: 1 }, avgReviewCount: { $avg: "$review_count" } }
  }}
]);
```

### 4c. 類別分詞統計（`$split` + `$unwind` + `$group`）

`categories` 是逗號分隔字串（如 `"Restaurants, Coffee & Tea"`），需先切開再統計：

```typescript
[
  { $project: {
      categoriesArray: {
        $filter: {
          input: {
            $map: {
              input: { $split: ['$categories', ','] },
              as: 'c', in: { $trim: { input: '$$c' } }
            }
          },
          as: 'c', cond: { $ne: ['$$c', ''] }
        }
      }
  }},
  { $unwind: '$categoriesArray' },
  { $group: { _id: '$categoriesArray', count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 10 }
];
```

**5 段式字串處理**：`$split` → `$map`（trim）→ `$filter`（去空）→ `$unwind` → `$group`。

---

## 模式 5：跨集合作業（`$lookup`）

查詢「打卡數最高的前 10 家商家（含名稱）」需要在 `checkin` 和 `business` 之間做 JOIN：

```typescript
[
  { $sort: { total_checkins: -1 } },
  { $limit: 10 },
  { $lookup: {
      from: 'business',
      localField: 'business_id',
      foreignField: 'business_id',
      as: 'biz'
  }},
  { $unwind: '$biz' },
  { $project: {
      businessId: '$business_id',
      name: '$biz.name',
      city: '$biz.city',
      state: '$biz.state',
      stars: '$biz.stars',
      review_count: '$biz.review_count',
      total_checkins: 1
  }}
]
```

MQL：

```javascript
db.checkin.aggregate([
  { $sort: { total_checkins: -1 } },
  { $limit: 10 },
  { $lookup: {
      from: "business",
      localField: "business_id",
      foreignField: "business_id",
      as: "biz"
  }},
  { $unwind: "$biz" },
  { $project: {
      name: "$biz.name",
      stars: "$biz.stars",
      total_checkins: 1
  }}
]);
```

利用 `$lookup` 也可以做更複雜的商業分析，例如找出 **低分高流量的觀光陷阱**：

```javascript
db.business.aggregate([
  { $match: { stars: { $lte: 2.5 } } },
  { $lookup: { from: "checkin", localField: "business_id", foreignField: "business_id", as: "checkin" }},
  { $unwind: "$checkin" },
  { $sort: { "checkin.total_checkins": -1 } },
  { $project: { name: 1, stars: 1, total_checkins: "$checkin.total_checkins" } },
  { $limit: 5 }
]);
```

結果：Geno's Steaks（2.5 星，4959 次打卡）— 費城知名起司牛肉堡地標，當地人嫌貴，觀光客必去。

---

## 模式 6：預聚合資料讀取（O(1) 讀取）

Checkin 資料因為在 ETL 階段已經算好了，Service 層極簡：

```typescript
// Prisma — 直接 findFirst 讀取預聚合資料
async getCheckinTraffic(businessId: string) {
  const checkin = await this.prisma.checkin.findFirst({
    where: { businessId },
    select: { traffic_stats: true, total_checkins: true }
  });

  if (!checkin || !checkin.traffic_stats) return null;

  const stats = checkin.traffic_stats as unknown as TrafficStats;

  // 應用層計算每小時平均（除以 5 天平日 / 2 天週末）
  const weekday = stats.Weekday.map(c => parseFloat((c / 5).toFixed(1)));
  const weekend = stats.Weekend.map(c => parseFloat((c / 2).toFixed(1)));

  return { weekday, weekend, total: checkin.total_checkins };
}
```

MQL（甚至不需要 aggregation，直接 `find()`）：

```javascript
db.checkin.findOne(
  { business_id: "abc123" },
  { traffic_stats: 1, total_checkins: 1 }
);
```

從流量陣列還能推測營業型態 — 例如找出 **平日晚上爆滿、週末沒人的店家**：

```javascript
db.checkin.aggregate([
  { $match: { "traffic_stats.Weekday.19": { $gt: 0 } } },
  { $lookup: { from: "business", localField: "business_id", foreignField: "business_id", as: "biz" }},
  { $unwind: "$biz" },
  { $project: {
      name: "$biz.name",
      categories: "$biz.categories",
      weekday_pm: { $arrayElemAt: ["$traffic_stats.Weekday", 19] },
      weekend_pm: { $arrayElemAt: ["$traffic_stats.Weekend", 19] },
      ratio: {
        $divide: [
          { $arrayElemAt: ["$traffic_stats.Weekday", 19] },
          { $max: [{ $arrayElemAt: ["$traffic_stats.Weekend", 19] }, 1] }
        ]
      }
  }},
  { $sort: { ratio: -1 } },
  { $limit: 5 }
]);
```

結果抓到的是「勞工食堂」和「獸醫院」— 即便 `hours` 欄位是空的，靠流量陣列也能推斷營業型態。

---

## 總結

| 模式 | MQL 關鍵字 | 使用場景 |
|------|-----------|---------|
| 關鍵字分頁 | `$regex` + `$skip/$limit` | 商家列表搜尋 |
| 地理搜尋 | `$geoNear` | 地圖附近商家 |
| 全文檢索 | `$text` | 中英混合關鍵字搜尋 |
| 統計彙總 | `$group/$bucket` | 儀表板 KPI |
| 跨集合 | `$lookup` | 關聯 business ↔ checkin |
| 預聚合 | `findOne` | O(1) 流量讀取 |

---

## 下一步

- [MongoDB 索引設計與效能優化](./mongodb-indexing) — 讓這些查詢跑得更快
- [Prisma + MongoDB 實戰經驗談](./mongodb-prisma-lessons) — 如何用 Prisma 管理 MongoDB
- [MongoDB Schema 設計與 ETL 資料處理](./mongodb-schema-etl) — schema 設計與資料預處理
