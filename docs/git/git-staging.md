

# 暫存區（Staging Area）和工作區（Working Directory）之間的操作指令

```shell
git add [file1] [file2] // 將變更的檔案增加到暫存區
git add [dir] // 新增指定目錄到暫存區，包括子目錄
git add . // 新增目前目錄下的所有檔案到暫存區
git restore --staged src/pages/index.tsx // 從暫存區移除
```

## 常用指令

1. **將檔案加入暫存區**
   - `git add `：將指定的**檔案**或**目錄**加入暫存區，使其準備好被提交。
   - `git add .`：將當前目錄下所有的修改和新增檔案加入暫存區。

2. **查看狀態**
   - `git status`：顯示當前工作目錄和暫存區的狀態，告訴你哪些檔案已經被修改、哪些已經被暫存等。

3. **使用暫存功能**
   - `git stash`：將當前工作目錄中的修改暫存起來，恢復到乾淨狀態。
   - `git stash list`：顯示所有暫存的變更清單。
   - `git stash pop`：恢復最近一次暫存的變更並從暫存清單中刪除它。
   - `git stash apply `：恢復指定的暫存變更，但不刪除它。

4. **查看差異**
   - `git diff`：顯示工作目錄與暫存區之間的差異。
   - `git diff --cached`：顯示暫存區與最後一次提交之間的差異。