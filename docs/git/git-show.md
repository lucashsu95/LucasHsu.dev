---
outline: "deep"
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: Git,git show,查看 commit,檢視變更,commit 內容,git 查詢
  - - meta
    - property: og:title
      content: Git Show 完全指南：深入檢視 Commit 內容與變更
  - - meta
    - property: og:description
      content: 詳解 git show 指令用法，包含查看 commit 詳情、檔案內容、標籤資訊、物件內容，以及實戰情境應用
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/git-cover.jpg
---

# Git Show

> 📝 TL;DR：`git show` 是「時光機顯微鏡」，可以看穿任何 commit 的完整內容！無參數預設看「最新 commit 的所有改動」、`git show <hash>` 看「指定 commit 的變更」、`git show <hash>:<file>` 直接讀取「過去某個版本的檔案內容」。像是「快遞追蹤系統」，可以看到每個包裹（commit）裡面裝了什麼東西！

## 前置知識
- 了解 Git commit 概念
- 知道 Git 物件模型（commit、tree、blob）
- 參考：[Git Commit](./git-commit.md)、[Git Log](./git-log.md)

## 開場情境：Bug 追蹤驚魂記

**情境：** 週一早上 9 點，測試團隊回報「使用者無法登入」。你查了 `git log`，發現週五下班前有三個 commits：

```bash
git log --oneline -3
```
```
a1b2c3d (HEAD -> main) feat: 優化效能
e4f5g6h fix: 修復購物車問題
i7j8k9l feat: 更新登入邏輯
```

**你知道「登入有問題」，但不確定是哪個 commit 造成的。**

這時 `git show` 就像「犯罪現場 CSI」，讓你逐一檢查每個 commit 到底改了什麼：

```bash
# 檢查「更新登入邏輯」這個 commit
git show i7j8k9l
```

**輸出會顯示：**
```diff
commit i7j8k9l
Author: 菜鳥工程師 <junior@example.com>
Date:   Fri Jan 3 17:55:00 2026 +0800

    feat: 更新登入邏輯

diff --git a/src/auth/login.js b/src/auth/login.js
--- a/src/auth/login.js
+++ b/src/auth/login.js
@@ -15,7 +15,7 @@ function validateUser(username, password) {
-  if (username && password) {
+  if (username || password) {  // ← 找到了！&& 改成 ||
     return authenticateUser(username, password);
   }
```

**🎯 發現問題：** `&&` 被改成 `||`，導致「只要輸入帳號或密碼其中一個就能登入」！

💡 **這個情境展示了 `git show` 的核心價值：快速檢視特定 commit 的完整變更內容。**

## 基本用法

### 1. 查看最新 Commit（預設）

```bash
git show
# 等同於
git show HEAD
```

**輸出包含：**
1. Commit 資訊（hash、作者、日期、訊息）
2. 完整的 diff（所有變更的檔案）

💡 **使用時機：** 剛提交完想確認「我剛才到底改了什麼」。

---

### 2. 查看指定 Commit

```bash
# 使用完整 hash
git show 1a2b3c4d5e6f7g8h9i0j

# 使用縮短 hash（前 7 碼）
git show 1a2b3c4

# 使用相對位置
git show HEAD~1    # 上一個 commit
git show HEAD~2    # 上上個 commit
git show HEAD^     # 父 commit（merge 時有多個）
```

---

### 3. 只看 Commit 資訊（不看 Diff）

```bash
git show --no-patch 1a2b3c4
# 或
git show -s 1a2b3c4
```

**輸出：**
```
commit 1a2b3c4
Author: Lucas Hsu <lucas@example.com>
Date:   Mon Jan 6 14:30:00 2026 +0800

    feat: 新增使用者登入功能
    
    - 實作 JWT 認證
    - 新增登入表單驗證
```

💡 **使用時機：** 只想看「這個 commit 的訊息寫了什麼」，不需要看程式碼。

## 查看特定檔案

### 情境：版本回溯查詢

**情境：** 你的同事說「上週的 README 寫得比較清楚」，但你已經改了很多次，不記得哪個版本了。

```bash
# 先用 git log 找到那個 commit
git log --oneline -- README.md -5
```
```
a1b2c3d docs: 更新安裝步驟
e4f5g6h docs: 修正錯字
i7j8k9l docs: 重寫 README  ← 就是這個！
```

```bash
# 查看那個版本的 README 完整內容
git show i7j8k9l:README.md
```

**會直接顯示當時的檔案內容（不是 diff）：**
```markdown
# 我的專案

## 安裝

1. 先安裝 Node.js 18+
2. 執行 `npm install`
3. 建立 `.env` 檔案（參考 `.env.example`）
...
```

💡 **這招超實用！** 可以「時光倒流」看任何版本的檔案，不用真的切換分支或 checkout。

---

### 查看特定檔案的變更（Diff）

```bash
# 只看這個 commit 中特定檔案的變更
git show 1a2b3c4 -- src/App.vue

# 多個檔案
git show 1a2b3c4 -- src/App.vue src/utils.js

# 整個資料夾
git show 1a2b3c4 -- src/components/
```

## 格式化輸出

### 1. 單字差異（適合文件）

```bash
git show --word-diff 1a2b3c4
```

**輸出：**
```diff
-message: 'Hello[-World-]{+Vue+}'
```

💡 **使用時機：** 查看「文件改了哪個字」時超清楚。

---

### 2. 只顯示變更的檔案名稱

```bash
# 只顯示檔案名稱
git show --name-only 1a2b3c4

# 顯示檔案名稱 + 變更類型（M=修改、A=新增、D=刪除）
git show --name-status 1a2b3c4
```

**輸出：**
```
M    src/App.vue
A    src/components/Login.vue
D    src/components/OldLogin.vue
```

---

### 3. 統計資訊

```bash
git show --stat 1a2b3c4
```

**輸出：**
```
 src/App.vue           | 15 +++++++++------
 src/components/Login  | 42 ++++++++++++++++++++++++++++++++++++++++++
 2 files changed, 51 insertions(+), 6 deletions(-)
```

💡 **使用時機：** 快速了解「這個 commit 改了幾個檔案、幾行」。

## 查看 Tag 與其他 Git 物件

### 查看標籤資訊

```bash
# 查看輕量標籤（只顯示對應的 commit）
git show v1.0.0

# 查看註解標籤（顯示標籤資訊 + commit）
git show v2.0.0
```

**輸出範例（註解標籤）：**
```
tag v2.0.0
Tagger: Lucas Hsu <lucas@example.com>
Date:   Mon Jan 6 10:00:00 2026 +0800

Release v2.0.0 - 新增會員系統

commit 1a2b3c4d5e6f7g8h
Author: Lucas Hsu
...
```

---

### 查看 Tree 物件（檔案樹）

```bash
# 查看某個 commit 的檔案樹
git show 1a2b3c4^{tree}

# 查看某個子目錄的樹
git show 1a2b3c4:src/
```

## 實戰情境案例

### 情境 1：追蹤 Bug 引入時間點（二分搜尋法）

**情境：** 你發現「購物車總價計算錯誤」，但不確定是哪個 commit 造成的。你決定用「二分法」追蹤。

```bash
# 1. 先用 git log 找到可能的範圍
git log --oneline -- src/cart/calculate.js -10

# 2. 逐一檢查中間的 commit
git show e4f5g6h -- src/cart/calculate.js
```

**輸出：**
```diff
-  total = items.reduce((sum, item) => sum + item.price, 0);
+  total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
```

**發現：** 這個 commit 加入了 `* item.quantity`，可能就是這裡出問題！

💡 **搭配技巧：** 可以用 `git bisect` 自動化這個過程（進階篇會介紹）。

---

### 情境 2：Code Review 時快速查看變更

**情境：** 同事請你 review 他的 commit，你想快速瀏覽他改了什麼。

```bash
# 先看統計資訊（了解規模）
git show --stat a1b2c3d

# 如果檔案很多，只看特定檔案
git show a1b2c3d -- src/api/user.js

# 如果只想確認「有沒有動到敏感檔案」
git show --name-only a1b2c3d | grep -E '(config|secret|password)'
```

---

### 情境 3：找回誤刪的程式碼

**情境：** 你刪除了一個函式，現在想要恢復，但不確定當時的完整內容。

```bash
# 1. 用 git log 找到刪除前的 commit
git log --all --full-history -- src/utils/helper.js

# 2. 查看刪除前的檔案內容
git show abc123:src/utils/helper.js > recovered_helper.js

# 或直接複製特定函式
git show abc123:src/utils/helper.js | grep -A 20 "function calculate"
```

💡 **這招可以「時光倒流」救回任何刪除的程式碼！**

---

### 情境 4：比較「合併前後」的差異

**情境：** 你剛完成一個 merge，想看「合併進來的 commit 改了什麼」。

```bash
# 查看 merge commit
git show HEAD

# 會顯示所有合併進來的變更（可能很長）

# 只看檔案清單
git show --name-status HEAD

# 比較「合併前」與「合併後」
git show HEAD^1  # 主分支的上一個 commit
git show HEAD^2  # 被合併進來的分支的最後 commit
```

---

### 情境 5：製作 Changelog 時引用變更內容

**情境：** 你要寫「本週更新內容」，需要引用特定 commit 的變更。

```bash
# 取得 commit 訊息
git show -s --format="%s%n%n%b" a1b2c3d > changelog_entry.md

# 加上變更檔案清單
git show --name-status a1b2c3d >> changelog_entry.md

# 或直接產生 Markdown 格式
echo "### $(git show -s --format=%s a1b2c3d)" > temp.md
echo "" >> temp.md
git show -s --format="%b" a1b2c3d >> temp.md
echo "" >> temp.md
echo "**變更檔案：**" >> temp.md
git show --name-status a1b2c3d >> temp.md
```

## 與 Git Diff 的差異

| 功能         | `git show`                    | `git diff`             |
| ------------ | ----------------------------- | ---------------------- |
| **預設行為** | 顯示「單一 commit」的完整資訊 | 比較「兩個狀態」的差異 |
| **主要用途** | 檢視歷史 commit 的內容        | 比較當前變更           |
| **輸出內容** | Commit 資訊 + Diff            | 只有 Diff              |
| **常見情境** | "這個 commit 改了什麼？"      | "我現在改了什麼？"     |

### 實際範例

```bash
# git show：看「過去某個 commit」改了什麼
git show abc123

# git diff：看「現在工作目錄」與「暫存區」的差異
git diff

# git diff 也可以比較兩個 commits（功能重疊）
git diff abc123 def456
# 等同於
git show def456  # 但 show 會顯示 commit 資訊
```

💡 **記憶口訣：**
- `git show` = 「翻開歷史相簿的某一頁」
- `git diff` = 「比較兩張照片的差異」

## 與 Git Log 的配合使用

### 典型工作流程

```bash
# 1. 用 git log 找到感興趣的 commit
git log --oneline -10
```
```
a1b2c3d feat: 新增登入功能
e4f5g6h fix: 修復購物車
i7j8k9l docs: 更新文件
...
```

```bash
# 2. 用 git show 查看詳細內容
git show a1b2c3d

# 3. 如果只想看某個檔案
git show a1b2c3d -- src/auth/login.js

# 4. 如果想看這個 commit 前後的差異
git diff a1b2c3d~1 a1b2c3d
```

## 進階技巧

### 技巧 1：查看 Merge Commit 的內容

```bash
# Merge commit 通常有兩個父 commit
git show HEAD^1  # 主分支的父 commit
git show HEAD^2  # 被合併分支的父 commit

# 查看合併時解決的衝突
git show HEAD
```

---

### 技巧 2：美化輸出（搭配 Less 分頁器）

```bash
# 自動分頁顯示
git show 1a2b3c4 | less

# 或設定 Git 預設使用分頁器
git config --global core.pager 'less -R'
```

---

### 技巧 3：匯出 Patch 檔案

```bash
# 將 commit 匯出為 patch 檔
git show 1a2b3c4 > my_commit.patch

# 稍後可以套用
git apply my_commit.patch
```

💡 **使用時機：** 想要「分享某個 commit 的變更」給沒有 Git 權限的人。

---

### 技巧 4：批次查看多個 Commits

```bash
# 查看最近 3 個 commits
git show HEAD HEAD~1 HEAD~2

# 查看特定範圍的所有 commits
git log --oneline abc123..def456 | while read hash msg; do
  echo "========== $hash: $msg =========="
  git show --stat $hash
  echo ""
done
```

## 實戰練習

### 練習 1（簡單）：檢視昨天的最後一個 Commit

找到昨天最後一個 commit，並查看它的變更內容。

:::details 參考答案
```bash
# 方法一：使用時間篩選
git log --since="yesterday" --until="today" --oneline | head -1
# 假設得到：a1b2c3d feat: 新增功能

git show a1b2c3d

# 方法二：直接組合指令
last_commit=$(git log --since="yesterday" --until="today" --format="%H" | head -1)
git show $last_commit

# 方法三：只看統計資訊
git show --stat $last_commit
```
:::

---

### 練習 2（中等）：找回誤刪的函式

假設你在 `src/utils.js` 中刪除了 `formatDate` 函式，現在想要恢復它。

:::details 參考答案與思路

```bash
# 1. 找到包含這個函式的最後一個 commit
git log --all --full-history -p -- src/utils.js | grep -B 5 "formatDate"

# 2. 假設找到 commit hash 是 abc123
# 查看完整內容
git show abc123:src/utils.js | grep -A 30 "function formatDate"

# 3. 方法一：整個檔案恢復到舊版本
git show abc123:src/utils.js > src/utils.js

# 4. 方法二：只恢復特定函式（手動）
git show abc123:src/utils.js | sed -n '/function formatDate/,/^}/p' >> src/utils.js

# 5. 驗證恢復結果
git diff src/utils.js
```

**思路：**
1. 使用 `git log --all --full-history` 確保搜尋所有歷史
2. 用 `-p` 顯示 diff，用 `grep` 搜尋函式名稱
3. 找到 commit 後用 `git show <hash>:<file>` 取得舊版本內容
4. 可以整個檔案恢復，或用 `grep`/`sed` 只提取特定部分

:::

---

### 練習 3（進階）：製作「變更摘要報告」腳本

寫一個腳本，產生「最近 10 個 commits 的變更摘要」，格式包含：
- Commit 訊息
- 作者
- 變更檔案數量
- 新增/刪除行數

:::details 參考答案與思路

```bash
#!/bin/bash

echo "# 變更摘要報告"
echo "> 產生時間：$(date '+%Y-%m-%d %H:%M:%S')"
echo ""

# 取得最近 10 個 commits
commits=$(git log --format="%H" -10)

count=1
for hash in $commits; do
    echo "## $count. $(git show -s --format=%s $hash)"
    echo ""
    
    # 作者與時間
    author=$(git show -s --format="%an" $hash)
    date=$(git show -s --format="%ad" --date=short $hash)
    echo "**作者：** $author  "
    echo "**日期：** $date  "
    echo "**Commit：** \`$hash\`"
    echo ""
    
    # 統計資訊
    stats=$(git show --shortstat $hash | tail -1)
    echo "**變更：** $stats"
    echo ""
    
    # 變更檔案清單
    echo "**變更檔案：**"
    echo '```'
    git show --name-status $hash | grep -E '^[AMD]'
    echo '```'
    echo ""
    
    # 如果有 commit body，顯示它
    body=$(git show -s --format=%b $hash)
    if [ -n "$body" ]; then
        echo "**詳細說明：**"
        echo "$body"
        echo ""
    fi
    
    echo "---"
    echo ""
    
    ((count++))
done
```

**進階版：加入圖表統計**

```bash
#!/bin/bash

echo "# 變更摘要報告"
echo ""

# 統計每個作者的 commit 數量
echo "## 貢獻者統計"
echo ""
git shortlog -sn --since="10 commits ago"
echo ""

# 統計變更類型
echo "## Commit 類型分布"
echo ""
git log --format=%s -10 | grep -oE '^(feat|fix|docs|style|refactor|test|chore)' | sort | uniq -c
echo ""

# 詳細 commits
echo "## 詳細變更"
echo ""

# ...(上面的腳本內容)...
```

**思路：**
1. 用 `git log --format="%H"` 取得 commit hash 列表
2. 用迴圈逐一處理每個 commit
3. 用 `git show` 搭配不同選項取得各種資訊：
   - `-s --format`: 取得 commit 訊息、作者等
   - `--shortstat`: 取得變更統計
   - `--name-status`: 取得檔案變更清單
4. 格式化輸出為 Markdown

:::

## FAQ

### Q: `git show` 和 `git log -p` 有什麼差別？

**答：**
- `git show <hash>`：顯示「單一 commit」的完整資訊
- `git log -p`：顯示「多個 commits」的完整資訊（包含 diff）

```bash
# 只看一個 commit
git show abc123

# 看多個 commits
git log -p -3  # 最近 3 個 commits 的 diff
```

---

### Q: 如何查看「某個檔案的完整歷史變更」？

**答：** 組合 `git log` 和 `git show`

```bash
# 方法一：用 git log -p（推薦）
git log -p --follow -- path/to/file.txt

# 方法二：自己寫腳本
for commit in $(git log --format=%H --follow -- path/to/file.txt); do
  echo "========== $commit =========="
  git show $commit -- path/to/file.txt
done
```

---

### Q: `git show` 輸出太長怎麼辦？

**答：** 使用分頁器或限制輸出

```bash
# 方法一：使用分頁器
git show abc123 | less

# 方法二：只看統計資訊
git show --stat abc123

# 方法三：只看特定檔案
git show abc123 -- src/App.vue

# 方法四：不顯示 diff
git show --no-patch abc123
```

---

### Q: 如何查看「重命名」前的檔案內容？

**答：** 使用 `git log --follow` 找到舊檔名，再用 `git show` 查看

```bash
# 1. 找到檔案的完整歷史（包含重命名）
git log --follow --oneline -- new-name.js

# 2. 假設找到重命名前的 commit 是 abc123
git show abc123:old-name.js
```

## 🔗 延伸閱讀
- [Git Log](./git-log.md) - 查詢 Commit 歷史
- [Git Diff](./git-diff.md) - 比較變更差異
- [Git Commit](./git-commit.md) - 提交變更指南
- [Pro Git: 查看提交歷史](https://git-scm.com/book/zh-tw/v2/Git-基礎-檢視提交的歷史記錄)

## 📝 總結

1. **`git show` 預設顯示最新 commit**（等同於 `git show HEAD`）。
2. **查看特定 commit：** `git show <hash>`（像翻開歷史相簿的某一頁）。
3. **查看舊版本檔案內容：** `git show <hash>:<file>`（時光倒流救回刪除的程式碼）。
4. **只看 commit 訊息：** `git show -s <hash>`（不需要看 diff 時用）。
5. **搭配 `git log` 使用：** 先用 `log` 找 commit，再用 `show` 看內容（考古必備組合技）。

**最後一句話：** `git show` 就是「Git 的放大鏡」，讓你看清每個 commit 的所有細節。無論是追蹤 bug、code review、還是找回誤刪的程式碼，都是必備神器！

## 🎯 快速指令參考表

| 指令                          | 說明             | 使用時機           |
| ----------------------------- | ---------------- | ------------------ |
| `git show`                    | 查看最新 commit  | 剛提交完想確認內容 |
| `git show <hash>`             | 查看指定 commit  | 追蹤特定變更       |
| `git show <hash>:<file>`      | 查看舊版本檔案   | 找回誤刪的程式碼   |
| `git show --stat <hash>`      | 只看統計資訊     | 快速了解變更規模   |
| `git show -s <hash>`          | 只看 commit 訊息 | 不需要看 diff      |
| `git show --name-only <hash>` | 只看檔案清單     | 確認影響範圍       |
| `git show --word-diff <hash>` | 單字層級差異     | 查看文件變更       |

---

🎉 **恭喜！你已經掌握 `git show` 的所有精髓！**
