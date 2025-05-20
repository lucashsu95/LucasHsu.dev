# git log 查找特定檔案的歷史紀錄


## ✅ 方法一：`git log -- <file-path>` 查找檔案歷史紀錄

這是最常用的方法，可以讓你查看特定檔案的所有 commit 紀錄。

### 範例：

```bash
git log -- path/to/your/file.txt
```

這個命令會列出所有與該檔案有關的 commit 記錄，包含每個 commit 的訊息、作者、日期等等。

### 顯示範例：

```bash
commit abc1234def5678
Author: Your Name <your-email@example.com>
Date:   Tue Apr 20 14:34:56 2023 +0800

    修改了 file.txt

commit 1234abcd5678efg
Author: Another Developer <another-email@example.com>
Date:   Mon Apr 19 10:11:22 2023 +0800

    更新 file.txt
```

---

## ✅ 方法二：`git log --follow -- <file-path>` 查找檔案的歷史紀錄（即使檔案有改名或移動過）

如果檔案被重命名或移動過，使用 `--follow` 參數可以讓你追蹤檔案歷史，並包括檔案改名或移動後的紀錄。

### 範例：

```bash
git log --follow -- path/to/your/file.txt
```

這個命令會顯示檔案的歷史紀錄，即使它曾經被移動或重命名。

---

## ✅ 方法三：查看特定檔案的變更細節（`git log -p`）

如果你希望查看每個 commit 中該檔案的具體變更，可以使用 `-p` 參數來顯示每次 commit 的 diff。

### 範例：

```bash
git log -p -- path/to/your/file.txt
git log -p --word-diff -- path/to/your/file.txt
```

這會顯示該檔案在每次 commit 中的具體改動，類似於 diff 的顯示方式。

---

## ✅ 方法四：查詢某個檔案特定版本的內容（`git show`）

如果你知道某個 commit ID，可以直接查看檔案在該版本的內容。

### 範例：

```bash
git show <commit-id>:path/to/your/file.txt
```

這會顯示特定 commit 中該檔案的內容。

---

## ✅ 方法五：使用 `git blame` 查找檔案每行的作者

如果你想了解檔案每一行是誰寫的，可以使用 `git blame`：

### 範例：

```bash
git blame path/to/your/file.txt
```

這會顯示每行代碼的作者、日期及其對應的 commit ID。

---

## 🔚 小結

| 目的                | 指令                                  |
| ----------------- | ----------------------------------- |
| 查找檔案所有歷史紀錄        | `git log -- path/to/file`           |
| 查找檔案歷史紀錄（含重命名或移動） | `git log --follow -- path/to/file`  |
| 查看每個 commit 的具體變更 | `git log -p -- path/to/file`        |
| 查看特定 commit 的檔案內容 | `git show <commit-id>:path/to/file` |
| 查詢檔案每行的作者         | `git blame path/to/file`            |

---