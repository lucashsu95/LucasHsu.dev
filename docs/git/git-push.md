
# git Fetch & Push

## Fetch

`git fetch` 是一個從遠端倉庫獲取最新資訊的 Git 指令，但不會自動合併到你的本地分支。以下是一些關於 `git fetch` 的更多操作和使用場景：

**基本用法**

*   `git fetch `：從指定的遠端倉庫獲取所有分支的最新更改。通常遠端倉庫名是 `origin`。 例如：`git fetch origin`。
*   `git fetch  `：僅獲取特定分支的更新。 例如：`git fetch origin master`。

**進階用法與選項**

*   `git fetch` 的完整格式 `git fetch [options] [repository] [refspec]`。
*   `options`：可選參數，例如 `-p` 或 `--prune`，用於移除遠端倉庫已刪除的遠端分支追蹤關係。
*   `repository`：遠端倉庫名稱，預設為 `origin`。
*   `refspec`：用於指定要獲取哪些分支或標籤。預設情況下，會獲取所有遠端分支。

**使用場景與技巧**

*   **保持本地倉庫最新**：定期使用 `git fetch`，確保本地倉庫包含遠端倉庫的最新資訊。這有助於及時了解團隊成員的變更，並避免合併時出現衝突。
*   **在合併前檢視變更**：在執行 `git merge` 或 `git rebase` 之前，先檢視 `.git/FETCH_HEAD` 檔案中的遠端變更。這可以幫助你了解即將合併的程式碼變更，並在必要時解決衝突。
*   **清理已刪除的遠端分支**：使用 `--prune` 選項，移除不再存在於遠端倉庫的本地追蹤分支。這有助於保持本地倉庫整潔，並避免不必要的混淆。例如：`git fetch origin --prune`。
*   **查看遠端分支**：使用 `git branch -r` 指令，檢視遠端追蹤分支的列表。這將幫助你了解遠端倉庫的分支結構和最新的提交資訊。

**FETCH_HEAD**

*   `FETCH_HEAD` 可以理解成一個臨時分支，儲存的是剛剛 `fetch` 到的變更集合（因為 `fetch` 的那個分支可能不止一次變更）。
*   可以使用 `git log -p FETCH_HEAD` 查看剛取回的更新資訊。


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