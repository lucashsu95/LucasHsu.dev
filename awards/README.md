# 得獎照片

把照片放進對應 slug 資料夾後，About 時間線會自動出現「可點開燈箱」。

## 規則

```
docs/public/awards/<slug>/01.webp
docs/public/awards/<slug>/02.jpg
```

- `<slug>` 必須與 `docs/.vitepress/theme/data/siteData.js` 裡該獎項的 `photosDir` 一致
- 支援：`.webp` / `.jpg` / `.jpeg` / `.png`
- 顯示順序：檔名字母排序（建議用 `01`、`02`… 控制順序）
- **沒有資料夾、或資料夾內沒有圖片** → 該事蹟不可點、不會顯示相機圖示

## 精選獎項 slug 一覽

| slug                             | 事蹟                                   |
| -------------------------------- | -------------------------------------- |
| `tupc-2026`                      | TUPC 2026 銅牌                         |
| `inter-school-programming-2026`  | 跨校聯盟程式設計競賽（進階組）優選     |
| `kpvs-outstanding-alumni-2026`   | 穀保家商傑出校友                       |
| `worldskills-48-national-team`   | 第 48 屆國手選拔備取                   |
| `nine-school-programming-2025`   | 九校聯盟程式設計競賽第二名             |
| `54-national-skills-3rd`         | 第 54 屆全國技能競賽第三名             |
| `112-project-competition`        | 112 專題競賽複賽優勝 / 決賽入選        |
| `moe-humanities-innovation-2024` | 教育部人文社會永續行動創新應用競賽優選 |
| `112-programming-gold-hand`      | 112 全國技藝競賽程式設計金手獎         |
| `ten-school-xunlian-2026`        | 2026 十校技職聯盟程式設計競賽研習營    |

`pnpm dev` / `pnpm build` 會自動掃圖；也可手動執行：

```bash
pnpm awards:scan
```

以後如果要批量加圖片，放好後跑：

```bash
node scripts/convert-awards-to-webp.mjs   # jpg/png → webp
node scripts/awards-scan.mjs              # 更新 manifest
```
