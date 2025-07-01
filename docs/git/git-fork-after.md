---
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: git-fork, git-upstream, git-同步, git-merge, git-fetch, git-fork-同步, github-fork, git-遠端分支
  - - meta
    - name: og:title
      content: Git Fork 專案後同步遠端分支教學｜完整步驟與指令範例
  - - meta
    - name: og:description
      content: Git fork 專案後如何同步原作者的更新？本篇教學詳細說明設定 upstream、fetch、merge 的完整流程，並提供實用指令範例，讓你輕鬆保持 fork 專案與原專案同步。
  - - meta
    - name: og:type
      content: article
  - - meta
    - name: og:image
      content: ./imgs/git-cover.png
---

# Git Fork 專案後同步遠端分支的方法

當你 fork 別人的專案並 clone 到本地後，原作者可能會持續更新程式碼。這時候你需要同步原作者的更新，讓你的 fork 保持最新狀態。

## 🔍 查看目前的遠端設定

首先檢查你的遠端倉庫設定：

```bash
git remote -v
```

通常會看到：

```
origin  https://github.com/你的帳號/專案.git (fetch)
origin  https://github.com/你的帳號/專案.git (push)
```

如果你想要同步原作者的更新，必須要有原作者倉庫的遠端設定，通常命名為 upstream。

## 1. 設定 upstream

如果你在 fork 後沒有設定 upstream，可以使用以下指令新增：

```bash
git remote add upstream https://github.com/原作者帳號/專案.git
```

設定完成後，再次執行 `git remote -v` 確認設定是否正確：

```
origin  https://github.com/你的帳號/專案.git (fetch)
origin  https://github.com/你的帳號/專案.git (push)
upstream        https://github.com/原作者帳號/專案.git (fetch)
upstream        https://github.com/原作者帳號/專案.git (push)
```

## 2. 獲取原作者的更新

使用 `git fetch` 指令從 upstream 獲取原作者的更新：

```bash
git fetch upstream
```

這個指令不會自動合併變更，只是將原作者的更新下載到本地。

## 3. 合併原作者的更新

接下來，將原作者的更新合併到你的本地分支。首先，切換到你想要更新的分支，通常是 master：

```bash
git checkout master
```

然後執行合併：

```bash
git merge upstream/master
```

如果有衝突，Git 會提示你手動解決衝突。解決完衝突後，記得執行 `git add` 和 `git commit` 提交變更。

## 4. 推送更新到你的遠端倉庫

最後，將更新推送到你的 GitHub 倉庫：

```bash
git push origin master
```

## 完整指令摘要

以下是從設定 upstream 到同步更新的完整指令摘要：

```bash
git remote add upstream https://github.com/原作者帳號/專案.git
git fetch upstream
git checkout master
git merge upstream/master
git push origin master
```

## 結語

透過以上步驟，你可以輕鬆地將原作者的更新同步到你的 fork 專案中。建議定期檢查並同步更新，保持你的專案與原專案的一致性。
