# 資料夾路徑README生成器

[Github](https://github.com/lucashsu95/folder_path_readme_generator)

這支程式是用來生成文件夾結構的 README.md 檔案，讓你可以清楚地了解指定資料夾的結構和檔案分佈。

## 功能

這個程式具有以下功能：

- 遞迴地掃描指定資料夾下的所有子資料夾和檔案。
- 根據資料夾的深度生成對應的標題，最多支援到第 9999 層資料夾(可以自己設定)。
- 將掃描到的檔案和資料夾結構以 Markdown 格式寫入到指定的 README.md 檔案中。

## 使用方式

1. 確保程式中的 `folder_name` 變數指定了你要生成 README.md 檔案的資料夾路徑。
2. 執行程式，它會在指定的資料夾中生成一個名為 `demo.md` 的 README 檔案，其中包含了該資料夾的結構和檔案清單。

## 注意事項

- 請確保程式執行的資料夾中包含欲生成 README.md 檔案的目標資料夾。
- 請注意程式會忽略指定的檔案名單，預設情況下會忽略 `.git`、`README.md`、`demo.md` 和 `folder_path_readme_generator.py` 這些檔案。
