# siteData.js 修改指南

`siteData.js` 是首頁與作品集的資料核心。以下說明每個區塊的用途與修改方式。

---

## `stats` — 首頁數字統計

顯示在首頁 Hero 區塊的 4 個數字方塊。

```js
{ value: 1, suffix: "",  label: "國手選拔備取", detail: "國際技能競賽" },
```

| 欄位 | 說明 |
|---|---|
| `value` | 數字（必填） |
| `suffix` | 數字後綴，例如 `"rd"` → `3rd`，沒後綴就給空字串 `""` |
| `label` | 主標題文字 |
| `detail` | 副標題/補充說明（選填，可省略） |

---

## `featuredWorks` — 首頁精選作品

顯示在 stats 下方的作品卡片（最多 4 個）。

```js
{
  title: "54 屆 線上點餐系統",
  description: "全國技能競賽模組 E — Vue + Vite + Bootstrap",
  image: "/portfolio/web-global/54_Module_E_Frontend/image.webp",
  tags: ["Vue", "Vite", "Bootstrap"],
  demo: "https://...",        // 選填：外部連結
  link: "/portfolio/...",     // 選填：站內連結
}
```

| 欄位 | 說明 |
|---|---|
| `title` | 作品名稱 |
| `description` | 簡短描述（顯示在卡片上） |
| `image` | 卡片縮圖（建議比例 16:9，webp 格式） |
| `tags` | 技術標籤陣列 |
| `demo` | 選填，外部 Demo 連結 |
| `link` | 選填，站內詳細頁面連結（路徑需以 `/` 開頭） |

> 若同時有 `demo` 和 `link`，卡片上會顯示兩個按鈕。

---

## `skillTags` — 技術標籤

純字串陣列，沒特殊結構，直接增減即可。

---

## `awardTimeline` — 獎項時間線

網站最主要的區塊，依日期降冪排列。

```js
{
  date: "2026/06/06",          // 排序用，格式 "YYYY/MM/DD" 或 "YYYY"
  year: "2026",                // 時間線顯示的年份
  category: "程式競賽",        // 分類，支援：程式競賽 | 專題競賽 | 榮譽
  title: "跨校聯盟程式設計競賽（進階組）",
  rank: "優選",                // 獎項名稱/名次
  medal: "silver",             // medal 值 → 徽章顏色（見下方對照表）
  featured: true,              // true = 重點標註（特殊底色 + 粗體）
  photosDir: "inter-school-programming-2026",  // 選填，對應 docs/public/awards/ 下的資料夾名稱
}
```

### medal 對照表

| 值 | 意義 | UI 顏色 |
|---|---|---|
| `"gold"` | 金牌 / 第一名 | 🟡 金黃色 |
| `"silver"` | 銀牌 / 第二名 | ⚪ 銀灰色 |
| `"bronze"` | 銅牌 / 第三名 | 🟠 古銅色 |
| `"honor"` | 佳作 / 優選 / 入選 / 研習 | 🔘 一般榮譽 |

### 新增獎項的完整流程

1. **編輯 `siteData.js`** — 按照格式加入一筆新物件到 `awardTimeline` 陣列
2. **放照片**（可選）— 照片放到 `docs/public/awards/<photosDir>/`
3. **轉 WebP** — `node scripts/convert-awards-to-webp.mjs`
4. **更新 manifest** — `node scripts/awards-scan.mjs`
5. **重新整理頁面**即可看到

### 注意

- 陣列順序不重要 — `date` 欄位決定顯示排序，新的在前
- 沒照片的獎項不要加 `photosDir` 欄位（或留 undefined）
- 照片支援 `.webp`、`.jpg`、`.jpeg`、`.png`，但建議統一用 webp

---

## `certifications` — 證照清單

顯示在獎項時間線下方的證照區塊。

```js
{ title: "乙级技術士證照 — 網頁設計", featured: true },
```

- `featured: true` 的證照會以較大字體強調顯示

---

## `liveSystems` — 實際上線系統

顯示可點擊的上線系統連結。

```js
{
  title: "穀保家商學校校網設備故障報修系統",
  url: "https://repair.kpvs.ntpc.edu.tw/repair-system/",
  featured: true,
}
```

---

## `workGridSections` — 作品集網格

以分類為單位的作品列表，顯示在作品集頁面。

```js
{
  title: "全國技能競賽",
  items: [
    {
      title: "54 屆 模組 E 線上點餐系統",
      year: "2024",
      link: "/portfolio/web-global/54_Module_E_Frontend",
      image: "/portfolio/web-global/54_Module_E_Frontend/image.webp",  // 選填
      tags: ["Vue", "Vite"],
      demo: "https://...",  // 選填
    },
  ],
}
```

| 欄位 | 說明 |
|---|---|
| `title` | 作品名稱 |
| `year` | 年份（選填） |
| `link` | 站內詳細頁面路徑 |
| `image` | 選填，卡片縮圖 |
| `tags` | 技術標籤陣列 |
| `demo` | 選填，外部 Demo 連結 |

---

## 相關腳本

| 腳本 | 用途 |
|---|---|
| `node scripts/awards-scan.mjs` | 掃描 `docs/public/awards/` 下各資料夾的圖片，產生 `awardPhotos.generated.js` |
| `node scripts/convert-awards-to-webp.mjs` | 將 awards 資料夾內的 jpg/png 批次轉為 webp（需要 `cwebp` CLI） |
| `node scripts/convert-awards-to-webp.mjs --dry` | 預覽轉換結果，不實際執行 |
| `pnpm generate-sidebar` | 重新產生側邊欄資料（新增頁面時需要） |

建議流程：新增照片 → 轉 webp → 掃描 manifest → 重整頁面。
