---
outline: "deep"
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: git,git commit,git reset
  - - meta
    - name: og:title
      content: git commit 提交
  - - meta
    - name: og:description
      content: git commit 提交,git add .、git commit -m、git push教學
  - - meta
    - name: og:type
      content: article
  - - meta
    - name: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/git/git-commit.html
---

# git commit 提交

概述: `git add .`、`git commit -m` 、`git push`教學

## Add

```bash
git add [file1] [file2] // 將變更的檔案增加到暫存區
git add [dir] // 新增指定目錄到暫存區，包括子目錄
git add . // 新增目前目錄下的所有檔案到暫存區
```

## Commit

git commit 指令將暫存區內容新增至本機倉庫。

提交暫存區到本地倉庫中

```bash
git commit -m [message]
```

[message] 可以是一些備註資訊。

提交暫存區的指定文件到倉庫區：

```bash
git commit [file1] [file2] ... -m [message]
```
### reset --hard
```bash
git reset --hard HEAD~1 // 直接銷毀上1個commit
git checkout HEAD~2 // 回溯到2個commit
```

## Push

git push 命令用於從將本機的分支版本上傳到遠端並合併。 命令格式如下：

```bash
git push <远程主机名> <本地分支名>:<远程分支名>
```

如果本機分支名與遠端分支名相同，則可以省略冒號：

```bash
git push <远程主机名> <本地分支名>
```

**實例**

下列指令將本機的 master 分支推送到 origin 主機的 master 分支。

```bash
git push origin master
```

## 強制Push

```bash
git push -f
```