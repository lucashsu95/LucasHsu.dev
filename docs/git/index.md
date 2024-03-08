# git 筆記

```bash
-d // --delete：删除
-D // --delete --force的快捷键
-f // --force：强制
-m // --move：移动或重命名
-M // --move --force的快捷键
-r // --remote：远程
-a / --all：所有
```

## 提交commit

### 直接銷毀上1個commit

```sh
git reset --hard HEAD~1
```

### 回溯到2個commit

```sh
git checkout HEAD~2
```

## 分支branch

### 分支（branch）的基本操作

```bash
git branch -r //查看远程所有分支
git branch -a //查看本地和远程的所有分支
git branch <branchname> //新建分支
git branch -d <branchname> //删除本地分支
git branch -m <oldbranch> <newbranch> //重命名本地分支

git remote add <name> <repositori_url> // 增加遠端分支
git branch -d -r origin/<branchname> //删除远程分支，删除后还需推送到服务器
git remote remove origin // 刪除全部遠端分支
```

### 讓分支同步master

```bash
git fetch origin main // 取得遠端main分支的commit
git log -p FETCH_HEAD // 查看取得下來的main的commit
git rebase main // 合併(可能會有衝突)
```

## 克隆clone

```bash
git clone <url>
git clone <url> --depth=3 // 只下載最近三次commit
```

## fork

可以在github 上面先跟上游同步(面板上會有按鈕)
或
用git fetch upstream
例如:

```sh
git remote add upstream <https://github.com/Xiaoan79/TieHanZi.git>
git fetch upstream
```

之後可能會需要

```sh
git push origin
```

## vim

在git bash裡

```sh
vi ~/.bashrc
```