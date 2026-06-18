---
title: MongoDB Schema 設計與 ETL 資料處理 — Yelp 分析平台實戰
description: 從 Yelp Open Dataset 實戰，看 MongoDB 的雙 ID 策略、嵌入式型別，以及 ETL 階段的 GeoJSON 轉換、中文關鍵字注入與 Checkin 預聚合
date: 2026-06-18
tags: [MongoDB, Schema, ETL, GeoJSON, Pre-aggregation]
---

# MongoDB Schema 設計與 ETL 資料處理

> **系列文章**：
> - 本篇：Schema 設計與 ETL 資料處理
> - [MongoDB 查詢模式實戰](./mongodb-query-patterns)
> - [MongoDB 索引設計與效能優化](./mongodb-indexing)
> - [Prisma + MongoDB 實戰經驗談](./mongodb-prisma-lessons)

## 前言

本系列源自 **Yelp 商業地理與情感智慧系統** 的實戰經驗。該專案使用 Yelp Open Dataset（Philadelphia 區域），透過 ETL 處理、MongoDB 儲存分析，實現中文跨語搜尋、地圖探索與打卡流量分析。

本文聚焦 **Schema 設計決策** 與 **ETL 資料處理** — 這兩個環節決定了後續查詢效能的上限。

---

## 1. 五個 Collection 總覽

| Collection | 用途 | 關鍵欄位 |
|---|---|---|
| `business` | 商家主資料 | `location`（GeoJSON）、`search_keywords`（中文關鍵字）、`attributes`（巢狀屬性） |
| `review` | 評論 | `business_id` → business、`user_id` → user |
| `user` | 用戶資料 | `user_id`（Yelp 原始 ID） |
| `checkin` | 打卡資料（預聚合） | `traffic_stats`（平日/週末各 24 小時陣列）、`total_checkins` |
| `tip` | 簡短 tip | 參考 business + user |

---

## 2. 雙 ID 策略（Dual-ID Strategy）

### 2.1 為什麼需要雙 ID？

Yelp 資料集使用自訂的字串 ID 做關聯（如 `MTSW_...`），但 MongoDB 的 `_id` 是 ObjectId。如果堅持只用 `_id`，ETL 階段會需要：

1. 先 insert business，拿到 `_id`
2. 再用 `_id` 更新 review、checkin 等關聯資料

這個流程完全無法平行處理，而且 debug 時無法直接從 JSON 檔案看出關聯。

### 2.2 Prisma Schema 實作

```prisma
model Business {
  id             String    @id @default(auto()) @map("_id") @db.ObjectId
  // ↑ MongoDB 內部主鍵，Prisma findUnique 用

  businessId     String    @unique @map("business_id")
  // ↑ Yelp 原始字串 ID，review/checkin/tip 透過這個關聯
  name           String
  stars          Float
  review_count   Int
  location       Location?      // GeoJSON Point
  attributes     BusinessAttributes?  // 巢狀屬性
  categories     String?
  search_keywords String?        // 中文關鍵字
  // ...
}
```

關聯這樣宣告：

```prisma
model Review {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  businessId  String   @map("business_id")
  business    Business @relation(fields: [businessId], references: [businessId])
  //                                            ↑ 指向 Business.businessId（字串）
  userId      String   @map("user_id")
  user        User     @relation(fields: [userId], references: [userId])
  stars       Float
  text        String
  date        String
}
```

> **注意**：Prisma 的 `@relation` 必須指向 `@unique` 欄位，所以 `businessId` 和 `userId` 都加了 `@unique`。

---

## 3. 嵌入式型別（Embedded Types）

MongoDB 的 Document Model 允許內嵌結構化資料。Prisma 用 `type` 關鍵字對應：

```prisma
type Location {
  type        String    // "Point"
  coordinates Float[]   // [經度, 緯度]
}

type TrafficStats {
  Weekday Int[]   // 24 個元素，0-23 小時
  Weekend Int[]   // 24 個元素，0-23 小時
}

type BusinessParking {
  garage    Boolean?
  street    Boolean?
  validated Boolean?
  lot       Boolean?
  valet     Boolean?
}

type Ambience {
  romantic  Boolean?
  intimate  Boolean?
  classy    Boolean?
  hipster   Boolean?
  divey     Boolean?
  touristy  Boolean?
  trendy    Boolean?
  upscale   Boolean?
  casual    Boolean?
}

type BusinessAttributes {
  WiFi                      String?
  BusinessParking           BusinessParking?    // 巢狀嵌入
  RestaurantsGoodForGroups  Boolean?
  RestaurantsReservations   Boolean?
  RestaurantsTakeOut        Boolean?
  RestaurantsDelivery       Boolean?
  RestaurantsAttire         String?
  RestaurantsPriceRange2    String?
  Ambience                  Ambience?           // 巢狀嵌入
  NoiseLevel                String?
  OutdoorSeating            Boolean?
  HasTV                     Boolean?
  GoodForKids               Boolean?
  BusinessAcceptsCreditCards Boolean?
  Caters                    Boolean?
  BikeParking               Boolean?
  ByAppointmentOnly         Boolean?
}
```

使用 `type`（而非 `model`）定義的優勢：
- 資料直接內嵌在父 Document 中，不需 JOIN
- Prisma 自動生成對應的 TypeScript 型別
- MongoDB 查詢時可用 dot notation 直接過濾（如 `"attributes.WiFi": "free"`）

---

## 4. ETL 資料處理

原始 Yelp JSON 資料不能直接倒入 MongoDB 就用，需要三層轉換。

### 4.1 GeoJSON 轉換

原始資料經緯度分離儲存，無法使用 `$geoNear`：

```python
# 轉換前
{
    "latitude": 39.9526,
    "longitude": -75.1652
}

# 轉換後
doc['location'] = {
    "type": "Point",
    "coordinates": [doc['longitude'], doc['latitude']]  # GeoJSON 順序：[經度, 緯度]
}
```

啟用 `2dsphere` 索引後就能進行球面距離計算：

```javascript
db.business.createIndex({ location: "2dsphere" });

db.business.aggregate([
  { $geoNear: {
      near: { type: "Point", coordinates: [-75.1652, 39.9526] },
      distanceField: "distance",
      maxDistance: 5000,
      spherical: true
  }}
]);
```

### 4.2 屬性髒資料清洗

Yelp 的 `attributes` 欄位不是標準 JSON，而是 Python 的 `repr()` 輸出：

```
"{u'WiFi': u'free', u'BusinessParking': {u'garage': False}}"
```

直接用 `json.loads()` 會報錯。解法是利用 Python `ast.literal_eval` 安全解析：

```python
import ast

def clean_attributes(attr_str):
    """將 Python repr 字串安全轉換為標準 JSON"""
    if not attr_str or attr_str == 'None' or attr_str == '{}':
        return None
    try:
        return ast.literal_eval(attr_str)
    except (ValueError, SyntaxError):
        return None
```

### 4.3 中文關鍵字注入

為了讓使用者可以用中文搜到英文商家，ETL 維護了一份 **140+ 類別的英中映射表**：

```python
CATEGORY_MAP = {
    "Restaurants": "餐廳",
    "Coffee & Tea": "咖啡, 茶, 飲料",
    "Sushi Bars": "壽司, 日式",
    "Bakeries": "麵包, 蛋糕, 烘焙",
    "Barbeque": "烤肉, 燒烤",
    "Hot Dogs": "熱狗",
    "Fast Food": "速食",
    "Vietnamese": "越南, 河粉",
    "Thai": "泰式, 泰國",
    "Chinese": "中式, 中餐",
    "Japanese": "日式, 日本",
    "Korean": "韓式, 韓國",
    # ... 共 140+ 個
}

def inject_keywords(doc):
    categories = doc.get('categories', '')
    chinese_keywords = ', '.join(
        CATEGORY_MAP.get(c.strip(), '')
        for c in categories.split(',')
        if c.strip() in CATEGORY_MAP
    )
    doc['search_keywords'] = (
        f"{doc.get('name', '')} "
        f"{doc.get('address', '')} "
        f"{categories} "
        f"{chinese_keywords}"
    )
    return doc
```

這個欄位讓前端可以用中文搜尋「咖啡 費城」，找到 Philadelphia 的 Coffee Shop。

### 4.4 Checkin 預聚合 — 最重要的效能決策

原始 Checkin 資料長這樣：

```
"business_id": "abc123",
"date": "2015-01-01 12:00, 2015-01-02 14:00, 2015-01-03 09:30, ..."
```

如果直接在 MongoDB Runtime 做 `$split` + `$unwind` + `$dateFromString` + `$group`：

- 資料庫需要把數萬筆日期字串展開成個別 document
- 記憶體用量暴增
- 查詢時間約 300ms

**解法：ETL 階段就預先算好**。

```python
def process_checkin_data(date_str):
    """將逗號分隔的日期字串轉換為平日/週末的小時統計"""
    stats = {"Weekday": [0]*24, "Weekend": [0]*24}
    total = 0
    if not date_str:
        return stats, total
    for d in date_str.split(', '):
        dt = datetime.strptime(d.strip(), "%Y-%m-%d %H:%M:%S")
        hour = dt.hour
        if dt.weekday() >= 5:  # 週末
            stats["Weekend"][hour] += 1
        else:
            stats["Weekday"][hour] += 1
        total += 1
    return stats, total
```

存入 MongoDB 的就是可直接讀取的結構：

```json
{
  "business_id": "abc123",
  "total_checkins": 52144,
  "traffic_stats": {
    "Weekday": [322, 202, 195, 163, 116, 53, 13, 18, 105, 249, 442, 441, 421, 404, 378, 340, 371, 375, 467, 500, 598, 603, 471, 443],
    "Weekend": [289, 191, 167, 169, 114, 49, 16, 15, 67, 176, 339, 343, 354, 317, 348, 278, 324, 332, 448, 497, 597, 572, 395, 419]
  }
}
```

**效能對比**：

| 指標 | Runtime 計算 | ETL 預聚合 |
|------|-------------|-----------|
| 查詢時間 | ~300ms | **~5ms** |
| 複雜度 | O(n·m) | **O(1)** |
| 記憶體用量 | 高（需 unwind 數萬筆） | 極低（直接讀取） |

---

## 5. Docker 資料初始化

`init-mongo.sh` 將 ETL 產出的 JSON 匯入 MongoDB：

```bash
# 等待 MongoDB 就緒
until mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1; do sleep 2; done

# 檢查是否已有資料（支援重啟不重複匯入）
COUNT=$(mongosh --quiet --eval "db.business.countDocuments()")
if [ "$COUNT" -gt "0" ]; then exit 0; fi

# 依序匯入 5 個 collection
mongoimport --db yelp_db --collection business --file /import_data/business.json
mongoimport --db yelp_db --collection review --file /import_data/review.json --numInsertionWorkers 4

# 建立索引（詳見索引篇）
mongosh <<EOF
  db.business.createIndex({ location: "2dsphere" });
  db.business.createIndex({ search_keywords: "text" });
  db.business.createIndex({ "attributes.WiFi": 1, stars: -1 });
EOF
```

---

## 下一步

- [MongoDB 查詢模式實戰](./mongodb-query-patterns) — `$geoNear`、`$text`、`$lookup`、`$bucket` 等 6 種查詢模式
- [MongoDB 索引設計與效能優化](./mongodb-indexing) — ESR 原則、COLLSCAN→IXSCAN 實戰對比
- [Prisma + MongoDB 實戰經驗談](./mongodb-prisma-lessons) — Prisma vs Mongoose 取捨、Docker 部署
