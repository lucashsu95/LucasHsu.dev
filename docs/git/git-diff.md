你在使用 `git diff` 比較某個 commit（例如 `9d0e107`）的時候，**如果只想看特定檔案的差異**，可以直接在指令後面加上檔案的路徑 ✅

---

### ✅ 查看特定檔案的差異

```bash
git diff 9d0e107 -- path/to/your/file.txt
```

### 🔁 比較兩個 commit 的某個檔案

```bash
git diff COMMIT1 COMMIT2 -- path/to/file.txt
```

範例：

```bash
git diff 9d0e107 4f3c2b1 -- src/App.vue
```

---

### 📁 如果你要比的是整個資料夾也可以：

```bash
git diff 9d0e107 -- src/components/
```

這樣會顯示整個 `components` 資料夾下所有檔案的變化。

---

### 🧹 額外參數（可選）：

* `--color` → 強制使用彩色 diff
* `--stat` → 顯示統計（變動幾行）
* `--word-diff` → 更細節地看單字變動

```bash
git diff 9d0e107 --word-diff -- src/views/Home.vue
```

---

有需要我幫你解析某一份 diff 結果嗎？也可以傳給我一起看 👍
