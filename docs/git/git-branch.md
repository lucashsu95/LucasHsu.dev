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

## Merge & Rebase

- [git rebase VS git merge？ 更優雅的 git 合併方式值得擁有](https://www.cnblogs.com/FraserYu/p/11192840.html)
