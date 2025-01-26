---
outline: "deep"
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: git,git branch,分支
  - - meta
    - name: og:title
      content: git branch 分支
  - - meta
    - name: og:description
      content: git branch教學和範例
  - - meta
    - name: og:type
      content: article
  - - meta
    - name: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/git/git-branch.html
---
# Git Branch 分支

## 介紹
`Git Branch` 是 `Git` 的一個功能，能夠幫助我們在不同的開發階段中，管理不同的代碼版本。例如，我們可以在開發新功能時，使用一個新的`branch`，當功能完成後，我們可以將這個`branch`合并回master分支，或者將這個branch刪除。這樣能夠幫助我們更好地管理代碼，避免在開發過程中引入`bug`。

## 基本命令

```shell
git checkout feature // 切換分支
git branch // 查看分支
git branch -r // 查看遠端分支
git branch -a // 查看所有分支
```

## 新增/刪除**分支**
```shell
git branch <new-branch-name> // 新增
git checkout -b <new-branch-name> // 新增，並且直接切過去
git branch -d <branch_name> // 刪除
git branch -D <branch_name> // 強制刪除
```

## 新增/刪除**遠端分支**
```shell
git push origin <branch-name> // 分支推送到遠端
git push origin --delete <branch_name> // 刪除遠端
git push origin :<branch_name> // 刪除遠端
git branch -d -r origin/<branchname> //刪除遠端分支，刪除后還需推送到服務器

git remote add <name> <repositori_url> // 增加遠端分支
git remote remove origin // 刪除全部遠端分支
```

## 設置上游追蹤

如果你希望在未來能夠簡單地使用 git push 和 git pull，可以在首次推送時設置上游追蹤：

```shell
git push -u origin <branch-name>
```

## cherry-pick

假如有兩個branch:`main`、`dev`，我想要dev的其中一個commit加到main中就可以使用`cherry-pick`。

```shell
git cherry-pick <commit-id>
```

## Merge & Rebase

- [git rebase VS git merge？ 更優雅的 git 合併方式值得擁有](https://www.cnblogs.com/FraserYu/p/11192840.html)

## Rebase -i

在 Git 中，`rebase` 是一個強大的工具，特別是在進行版本控制時。使用 `git rebase -i`（互動式重寫）可以讓您更靈活地管理提交歷史。以下是一些常用的指令及其功能介紹：

### 常用指令

1. **pick**：
   - **功能**：保留此提交。
   - **用法**：這是默認選項，表示選擇該提交並將其應用到新的基礎上。

2. **reword**：
   - **功能**：保留此提交，但允許您在執行到該步驟時修改提交訊息。
   - **用法**：當您需要更改提交的描述時使用。

3. **edit**：
   - **功能**：保留此提交，但在執行到此步驟時會暫停，以便您可以進行修改（例如，添加或刪除文件）。
   - **用法**：當您需要對提交內容進行更改時使用。

4. **squash**：
   - **功能**：將此提交與前一個提交合併，並提示您編輯合併後的提交訊息。
   - **用法**：通常用於清理歷史，將多個小的修改合併為一個更有意義的提交。

5. **fixup**：
   - **功能**：類似於 `squash`，但不會提示您編輯提交訊息，而是直接使用前一個提交的訊息。
   - **用法**：當您只想修正前一個提交而不需要額外的描述時使用。

6. **drop**：
   - **功能**：完全移除某個提交。
   - **用法**：當某些提交不再需要或是錯誤的時候，可以使用此選項來清除它們。

7. **exec**：
   - **功能**：在 rebase 過程中執行一個 shell 命令。
   - **用法**：當您需要在某些提交之間執行特定命令時使用。

8. **break**：
   - **功能**：在指定的提交處停止 rebase，允許您進行手動操作。
   - **用法**：這對於需要在某些步驟中進行調整的情況非常有用。

### 使用範例

要啟動互動式重寫，可以使用以下命令：
```bash
git rebase -i <commit-id>
```
這裡的 `<commit-id>` 是您想要開始重寫的基準提交。當編輯器打開後，您可以根據需要修改每一行的指令。

### 最近的四個commit

```shell
git rebase -i HEAD~4
```
### Commit Id

```shell
git rebase -i <commit-id>
git rebase -i <commit-id>^ // 包含當前commit
```