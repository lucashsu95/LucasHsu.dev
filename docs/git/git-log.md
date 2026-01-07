---
outline: "deep"
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: Git,git log,commit歷史,git blame,git show,格式化輸出
  - - meta
    - property: og:title
      content: Git Log 完全指南：查詢 Commit 歷史與檔案追蹤
  - - meta
    - property: og:description
      content: 詳解 git log 進階用法，包含格式化輸出、圖形化顯示、檔案歷史追蹤、git blame 與 git show 實戰應用
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/git-cover.jpg
---

# Git Log

>  📝 TL;DR：`git log` 是「時光相簿」，紀錄所有 commit 歷史（或說是犯罪紀錄？）。常用選項：`--oneline`（一行簡潔版）、`--graph`（畫出家譜圖）、`--follow`（追蹤改名檔案）。查看特定檔案用 `git log -- <file>`、查看「誰寫的這行爛 code」用 `git blame`、查看「某次 commit 改了什麼」用 `git show`。考古必備神器！

##  前置知識
- 了解 Git commit 概念
- 知道基本 Git 指令（add、commit）
- 參考：[Git Commit](./git-commit.md)

---

##  基本用法

### 1. 標準輸出

```bash
git log
```

**輸出範例：**
```
commit 1234abc5678def (HEAD -> main, origin/main)
Author: Lucas Hsu <lucas@example.com>
Date:   Tue Dec 25 14:30:00 2023 +0800

    feat: 新增使用者登入功能
    
    - 實作 JWT 認證
    - 新增登入表單驗證
    - 單元測試覆蓋率 85%

commit 9876fed5432cba
Author: Mary Chen <mary@example.com>
Date:   Mon Dec 24 10:15:22 2023 +0800

    fix: 修復購物車計算錯誤
```

 **生活化比喻**：就像「畢業紀念冊」，記錄著每個人（commit）的大頭照、自我介紹和幹過的事！

---

### 2. 簡潔模式（最常用）

```bash
git log --oneline
```

**輸出範例：**
```
1234abc (HEAD -> main) feat: 新增使用者登入功能
9876fed fix: 修復購物車計算錯誤
5555aaa docs: 更新 README
3333bbb refactor: 重構資料庫連線邏輯
```

**一行顯示：前 7 碼 hash + 訊息標題**

 **重點**：99% 的情況用 `--oneline` 就夠了，清爽又快速！

---

### 3. 圖形化顯示分支 

```bash
git log --oneline --graph --all
```

**輸出範例：**
```
* 1234abc (HEAD -> main) feat: 新增登入功能
| * 5678def (feature/cart) feat: 購物車功能
|/  
* 9876fed fix: 修復計算錯誤
* 5555aaa docs: 更新文件
```

 **比喻**：就像「家譜圖」，可以看出誰是主線、誰是分支、哪裡合併了！

---

##  限制輸出範圍

### 1. 顯示最近 N 筆

```bash
# 最近 3 筆
git log -3
# 或
git log -n 3

# 最近 10 筆，簡潔模式
git log --oneline -10
```

---

### 2. 時間範圍 

```bash
# 最近 2 週
git log --since="2 weeks ago"

# 特定日期後
git log --since="2023-12-01"

# 特定日期區間
git log --since="2023-12-01" --until="2023-12-25"

# 最近 3 天
git log --since="3 days ago"
```

 **使用時機**：月底要寫「工作日誌」時超好用，一行指令就能生成這個月的所有 commits！

---

### 3. 作者篩選 

```bash
# 特定作者
git log --author="Lucas"

# 多個作者（正則表達式）
git log --author="Lucas\|Mary"

# 排除特定作者
git log --author="^(?!.*bot).*$"
```

 **小技巧**：用這個找出「某個實習生到底 commit 了什麼東西」超方便（誤）！

---

### 4. 訊息關鍵字 

```bash
# 包含特定關鍵字
git log --grep="fix"

# 多個關鍵字（OR）
git log --grep="fix\|feat"

# 多個關鍵字（AND）
git log --grep="fix" --grep="login" --all-match
```

---

##  查詢特定檔案歷史

### 方法一：基本檔案歷史

```bash
# 查看特定檔案的所有 commit
git log -- path/to/file.txt

# 簡潔模式
git log --oneline -- src/App.vue
```

---

### 方法二：追蹤重命名/移動（重要！）

```bash
# 使用 --follow 追蹤檔案改名
git log --follow -- path/to/file.txt
```

**為什麼需要 `--follow`？**

```mermaid
gitGraph
    commit id: "建立 old-name.js"
    commit id: "修改內容"
    commit id: "重命名為 new-name.js" type: HIGHLIGHT
    commit id: "繼續修改"
```

-  `git log -- new-name.js`：只顯示重命名後的 commits
-  `git log --follow -- new-name.js`：顯示完整歷史（含改名前）

 **重點**：檔案改名不代表歷史消失！用 `--follow` 就能「穿越時空」追蹤完整身世！

---

### 方法三：查看變更內容

```bash
# 顯示每個 commit 的 diff
git log -p -- path/to/file.txt

# 簡化 diff（只顯示變更統計）
git log --stat -- src/utils.js
```

**輸出範例：**
```
commit 1234abc
Author: Lucas Hsu
Date:   Tue Dec 25 14:30:00 2023

    feat: 新增工具函式

 src/utils.js | 15 ++++++++++++---
 1 file changed, 12 insertions(+), 3 deletions(-)
```

---

### 方法四：單字層級差異

```bash
# 顯示單字差異（適合文件）
git log -p --word-diff -- README.md
```

---

##  進階功能

### 1. git show - 查看特定 Commit 內容

```bash
# 查看特定 commit 的完整資訊
git show 1234abc

# 只查看某個 commit 中特定檔案的內容
git show 1234abc:path/to/file.txt

# 查看上一個 commit
git show HEAD~1
```

 **比喻**：就像「翻開某一頁日記」，看看那天寫了什麼！

---

### 2. git blame - 查看每行作者（追兇神器）

```bash
# 顯示檔案每行的作者、日期、commit
git blame path/to/file.txt
```

**輸出範例：**
```
1234abc5 (Lucas Hsu 2023-12-25 14:30:00 +0800  1) function calculateTotal() {
9876fed4 (Mary Chen  2023-12-24 10:15:22 +0800  2)   return items.reduce((sum, item) =>
1234abc5 (Lucas Hsu 2023-12-25 14:30:00 +0800  3)     sum + item.price, 0
9876fed4 (Mary Chen  2023-12-24 10:15:22 +0800  4)   );
1234abc5 (Lucas Hsu 2023-12-25 14:30:00 +0800  5) }
```

**進階選項：**
```bash
# 顯示特定行範圍
git blame -L 10,20 file.txt

# 忽略空白變更
git blame -w file.txt

# 顯示 email
git blame -e file.txt
```

 **警告**：`git blame` 直譯是「追究責任」，但請別真的拿來「抓戰犯」XD 用來追蹤程式碼來源才是正途！

---

### 3. 格式化輸出 

```bash
# 自訂格式（hash + 作者 + 訊息）
git log --pretty=format:"%h - %an: %s"
# 輸出：
# 1234abc - Lucas Hsu: feat: 新增登入功能
# 9876fed - Mary Chen: fix: 修復計算錯誤

# 常用格式變數：
# %h  - 簡短 hash
# %H  - 完整 hash
# %an - 作者名稱
# %ae - 作者 email
# %ad - 作者日期
# %s  - commit 訊息標題
# %b  - commit 訊息內容
```

**實用範例：產生 Changelog**
```bash
git log --pretty=format:"- %s (%an, %ad)" --date=short --since="1 month ago"
```

輸出：
```
- feat: 新增登入功能 (Lucas Hsu, 2023-12-25)
- fix: 修復計算錯誤 (Mary Chen, 2023-12-24)
- docs: 更新文件 (John Doe, 2023-12-20)
```

 **超實用**：自動產生「本月工作成果」或「專案更新日誌」，老闆看了都說讚！

---

### 4. 統計資訊 

```bash
# 顯示變更統計
git log --stat

# 簡短統計
git log --shortstat

# 每個作者的 commit 數量
git shortlog -sn
```

---

##  實用指令組合

### 組合 1：美化的分支圖

```bash
git log --oneline --graph --all --decorate --abbrev-commit
```

**可設定為別名：**
```bash
git config --global alias.lg "log --oneline --graph --all --decorate"
# 使用：git lg
```

 **小技巧**：把常用的長指令設成別名，打字省時又省力！

---

### 組合 2：查看昨天的 commits

```bash
git log --since="yesterday" --oneline
```

---

### 組合 3：找出誰刪除了某行程式碼

```bash
# 先用 blame 找出行號，假設是第 15 行被刪除
git log -p -S"function oldFunction()" -- file.js
```

`-S` 搜尋新增/刪除特定文字的 commits。

 **使用時機**：當你發現「某個函式不見了」，用這招找出「誰刪的、為什麼刪」！

---

##  實戰練習

### 練習 1（簡單）
查看最近 5 筆 commits 的簡潔歷史，並顯示分支圖。

:::details 參考答案
```bash
git log --oneline --graph -5

# 或包含所有分支
git log --oneline --graph --all -5

# 設定別名方便使用
git config --global alias.l5 "log --oneline --graph -5"
# 之後用：git l5
```
:::

### 練習 2（簡單）
找出特定檔案 `README.md` 最近一個月的所有修改記錄，包含作者和日期。

:::details 參考答案
```bash
# 方法一：標準格式
git log --since="1 month ago" -- README.md

# 方法二：自訂格式
git log --pretty=format:"%h - %an (%ad): %s" --date=short --since="1 month ago" -- README.md

# 方法三：顯示差異
git log -p --since="1 month ago" -- README.md

# 驗證：顯示 commit 數量
git log --oneline --since="1 month ago" -- README.md | wc -l
```
:::

### 練習 3（中等）
寫一個 Shell 腳本，產生「本週 Changelog」，格式為：`日期 | 作者 | 訊息`。

:::details 參考答案與思路

```bash
#!/bin/bash

echo " 本週 Changelog（$(date -d 'last monday' +%Y-%m-%d) ~ $(date +%Y-%m-%d)）"
echo "========================================"
echo ""

# 取得本週的 commits
git log --pretty=format:"%ad | %an | %s" --date=short --since="last monday" --until="now"

echo ""
echo ""
echo " 統計資訊："

# 統計本週 commit 數量
commit_count=$(git log --oneline --since="last monday" | wc -l)
echo "總 Commits: $commit_count"

# 統計各類型 commit
echo ""
echo "類型分布："
git log --pretty=format:"%s" --since="last monday" | grep -oE "^(feat|fix|docs|style|refactor|test|chore)" | sort | uniq -c

echo ""
echo "作者貢獻："
git shortlog -sn --since="last monday"
```

**輸出範例：**
```
 本週 Changelog（2023-12-18 ~ 2023-12-25）
========================================

2023-12-25 | Lucas Hsu | feat: 新增登入功能
2023-12-24 | Mary Chen | fix: 修復計算錯誤
2023-12-23 | John Doe | docs: 更新 API 文件
2023-12-22 | Lucas Hsu | refactor: 重構資料庫連線
2023-12-21 | Mary Chen | test: 新增單元測試

 統計資訊：
總 Commits: 5

類型分布：
      1 docs
      2 feat
      1 fix
      1 refactor

作者貢獻：
     3  Lucas Hsu
     2  Mary Chen
     1  John Doe
```

**思路：**
1. 用 `--since="last monday"` 取得本週 commits
2. 用 `--pretty=format` 自訂輸出格式
3. 用 `grep` 提取 commit 類型前綴
4. 用 `shortlog -sn` 統計作者貢獻

 **超實用**：每週五下班前跑一次，自動產生「本週工作成果」給主管看！

**進階：輸出為 Markdown**
```bash
#!/bin/bash

output_file="CHANGELOG_WEEK_$(date +%Y%m%d).md"

cat > "$output_file" << EOF
# Weekly Changelog

> Generated on $(date +"%Y-%m-%d %H:%M:%S")

## Commits

| Date | Author | Message |
| ---- | ------ | ------- |
EOF

git log --pretty=format:"| %ad | %an | %s |" --date=short --since="last monday" >> "$output_file"

echo ""
echo " Changelog 已儲存至：$output_file"
```
:::

---

##  FAQ

### Q: `git log` 輸出太多怎麼辦？
**方法一：限制數量**
```bash
git log -10  # 只顯示 10 筆
```

**方法二：分頁查看**
```bash
git log | less
# 按 Space 下一頁，q 離開
```

**方法三：簡潔模式**
```bash
git log --oneline
```

---

### Q: 如何找出刪除特定檔案的 commit？
```bash
# 找出刪除 old-file.txt 的 commit
git log --diff-filter=D --summary | grep old-file.txt
```

 **使用時機**：當你發現「某個檔案不見了」，用這招找出「誰刪的、什麼時候刪的」！

---

### Q: `git blame` 顯示的都是同一個人？
可能是大規模重構或格式化（如 Prettier）。使用 `--ignore-rev` 忽略特定 commit：

```bash
# 建立 .git-blame-ignore-revs 檔案
echo "1234abc5678def" > .git-blame-ignore-revs

# 設定 Git 使用此檔案
git config blame.ignoreRevsFile .git-blame-ignore-revs

# 執行 blame
git blame file.txt
```

---

### Q: 如何搜尋程式碼歷史（類似 grep）？
```bash
# 搜尋新增/刪除特定文字的 commits
git log -S"function calculateTotal()" --source --all

# 搜尋變更符合正則的 commits
git log -G"function.*calculate.*" --source --all
```

---

##  延伸閱讀
- [Git Commit](./git-commit.md) - 提交變更指南
- [Git Diff](./git-diff.md) - 比較變更差異
- [Pro Git: 檢視提交的歷史記錄](https://git-scm.com/book/zh-tw/v2/Git-基礎-檢視提交的歷史記錄)
- [Git Pretty Formats](https://git-scm.com/docs/pretty-formats)

---

##  總結
1. `git log` 顯示 commit 歷史，`--oneline` 最常用（簡潔清爽）。
2. `--follow` 追蹤檔案重命名，查詢完整歷史（考古必備）。
3. `git blame` 查看每行作者，適合追蹤程式碼來源（但別拿來抓戰犯）。
4. `git show` 查看特定 commit 內容（翻開某一頁日記）。
5. 善用格式化輸出（`--pretty=format`）產生 Changelog（自動化工作日誌）。

**最後一句話**：`git log` 就是專案的「時光相簿」，記錄著每個 commit 的故事。熟練使用它，就能像福爾摩斯一樣追蹤程式碼的前世今生，找出每個 bug 的「犯罪現場」！
