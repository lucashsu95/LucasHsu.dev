---
outline: "deep"

head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: git-fetch, git-push, git-教學, git-新手, git-指令, git-fetch-用法, git-push-用法, git-遠端倉庫, git-分支, git-pull-差異, git-強制push, git-追蹤分支
  - - meta
    - name: og:title
      content: Git Fetch 與 Push 新手教學｜指令用法、差異比較與常見問題解答
  - - meta
    - name: og:description
      content: Git fetch 和 push 怎麼用？本篇詳細說明 git fetch 與 git push 的用法差異、實用技巧與新手常見問題，包含強制推送、分支追蹤等進階操作，幫助你正確管理遠端倉庫。
  - - meta
    - name: og:type
      content: article
  - - meta
    - name: og:image
      content: ./imgs/git-cover.png
---

# Git Fetch 與 Push 新手教學

## 什麼是 Fetch？

`git fetch` 是**下載**遠端倉庫的最新資料到本地，但**不會自動合併**到你的工作分支。

### 🔸 基本用法

**下載所有分支的更新：**
```bash
git fetch origin
```

**只下載特定分支：**
```bash
git fetch origin main
```

### 🔸 為什麼要用 Fetch？

想像一下：
- 你的同事在遠端倉庫更新了程式碼
- 你想知道他們改了什麼，但還不想立刻合併到你的程式碼
- 這時候用 `git fetch` 就對了！

### 🔸 實用技巧

**1. 清理已刪除的遠端分支**
```bash
git fetch origin --prune
```
> 移除遠端已經刪除的分支追蹤

**2. 查看剛下載的更新**
```bash
git log -p FETCH_HEAD
```
> 看看剛才下載了什麼變更

**3. 查看所有遠端分支**
```bash
git branch -r
```
> 列出所有追蹤的遠端分支

---

## 什麼是 Push？

`git push` 是**上傳**你的本地變更到遠端倉庫。

### 🔸 基本語法

```bash
git push <遠端名稱> <本地分支>:<遠端分支>
```

**如果本地分支和遠端分支名稱相同，可以簡化：**
```bash
git push <遠端名稱> <分支名稱>
```

### 🔸 常見範例

**上傳 main 分支：**
```bash
git push origin main
```

**上傳當前分支：**
```bash
git push
```
> 如果已經設定追蹤分支，可以直接用 `git push`

### 🔸 特殊情況：強制 Push

```bash
git push -f origin main
```

> ⚠️ **危險操作！** 強制推送會覆蓋遠端的歷史記錄，請確認沒有其他人在使用該分支

### 🔸 第一次推送新分支

```bash
git push -u origin feature-branch
```
> `-u` 會設定追蹤關係，之後就可以直接用 `git push`

---

## 🎯 新手常見問題

**Q: Fetch 和 Pull 有什麼差別？**
- `git fetch`：只下載，不合併
- `git pull`：下載 + 自動合併（等於 `git fetch` + `git merge`）

**Q: 什麼時候用 Fetch？**
- 想檢查遠端有什麼更新
- 不確定是否要立刻合併
- 想先看看別人改了什麼

**Q: Push 失敗怎麼辦？**
- 通常是因為遠端有新的提交
- 先 `git pull` 下載並合併最新版本
- 再重新 `git push`