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

```shell
git add [file1] [file2] // 將變更的檔案增加到暫存區
git add [dir] // 新增指定目錄到暫存區，包括子目錄
git add . // 新增目前目錄下的所有檔案到暫存區
git restore --staged src/pages/index.tsx // 從暫存區移除
```

## Commit

git commit 指令將暫存區內容新增至本機倉庫。

提交暫存區到本地倉庫中

```shell
git commit -m [message]
```

[message] 可以是一些備註資訊。

提交暫存區的指定文件到倉庫區：

```shell
git commit [file1] [file2] ... -m [message]
```

## Reset
```shell
git reset --hard // 刪除回退點之前的所有訊息
git reset --hard HEAD~1 // 直接銷毀上1個commit
git checkout HEAD~2 // 回溯到2個commit
git checkout -- src/pages/index.tsx // 取消index.tsx的變動
```

::: info
`--hard` 參數撤銷工作區中所有未提交的修改內容，將暫存區與工作區都回到上一次版本，並刪除先前的所有資訊提交
:::

### HEAD 說明

- HEAD 表示目前版本
- HEAD^ 上一个版本
- HEAD^^ 上上一个版本
- HEAD^^^ 上上上一个版本

可以使用 ～數字表示

- HEAD~0 表示目前版本
- HEAD~1 上一个版本
- HEAD^2 上上一个版本
- HEAD^3 上上上一个版本
## Push

git push 命令用於從將本機的分支版本上傳到遠端並合併。 命令格式如下：

```shell
git push <遠端主機名稱> <本地分支名>:<遠端分支名>
```

如果本機分支名與遠端分支名相同，則可以省略冒號：

```shell
git push <遠端主機名稱> <本地分支名>
```

**實例**

下列指令將本機的 master 分支推送到 origin 主機的 master 分支。

```shell
git push origin master
```

### 強制Push

```shell
git push -f
```

## 查看commit

```shell
git log // 查看
git log --oneline // 簡化只會看到內容
git log n -5 // 只看最近5個
```

可以按`q`退出