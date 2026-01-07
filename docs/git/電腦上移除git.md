---
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: Git,移除Git認證,Windows認證管理員,清除GitHub帳號
  - - meta
    - property: og:title
      content: 移除 Git 認證教學：清除 Windows 儲存的 GitHub 帳號
  - - meta
    - property: og:description
      content: 教你如何從 Windows 認證管理員移除 Git 認證，解決切換 GitHub 帳號或權限問題
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/git-cover.jpg
---

# 移除 Git 認證教學 

>  📝 TL;DR：Windows 會在認證管理員偷偷儲存 GitHub 帳號密碼（就像瀏覽器記住密碼一樣）。切換帳號或遇到權限問題時，需要手動「清除記憶」。路徑：控制台  使用者帳戶  認證管理員  Windows 認證  移除 `git:https://github.com`。就像「登出帳號」一樣簡單，但很多人不知道在哪裡登出！

##  前置知識
- 知道如何開啟 Windows 控制台
- 了解 Git 基本概念

##  為什麼需要移除認證？

### 常見情境

1. **切換 GitHub 帳號** 
   - 公司電腦曾登入個人帳號
   - 想切換到工作帳號

2. **權限問題** 
   - 推送時出現 `Permission denied`
   - 認證過期或被撤銷

3. **多帳號管理** 
   - 需要在不同專案使用不同帳號

 **真實案例**：小明在公司電腦登入個人 GitHub，離職後新同事用同一台電腦，結果一直推送到小明的個人帳號！清除認證就能避免這種尷尬。


##  移除步驟（Windows）

### 方法一：透過設定（Windows 10/11）

1. **開啟設定**
   - 按 `Win + I`
   - 或點擊開始  設定

2. **進入認證管理員**
   - 搜尋「認證管理員」
   - 或依序點擊：帳戶  登入選項  認證管理員

3. **移除 Git 認證**
   - 點擊「Windows 認證」
   - 找到 `git:https://github.com`
   - 點擊旁邊的 **** 展開
   - 點擊 **移除**

 **小技巧**：直接搜尋「認證管理員」最快，不用在設定裡面翻來翻去！

---

### 方法二：透過控制台（所有 Windows 版本）

1. **開啟控制台**
   - 按 `Win + R`  輸入 `control`  確定
   - 或搜尋「控制台」

2. **進入認證管理員**
   - 點擊「使用者帳戶」
   - 點擊「認證管理員」

3. **移除認證**
   - 點擊「Windows 認證」
   - 找到 `git:https://github.com`
   - 展開後點擊「移除」

---

### 方法三：命令列（進階）

```powershell
# 列出所有認證
cmdkey /list

# 刪除 GitHub 認證
cmdkey /delete:git:https://github.com
```

 **適合誰？** 喜歡打指令的工程師，或需要批次刪除多個認證的情況！

##  驗證移除成功

### 1. 檢查認證管理員

重新開啟認證管理員，確認 `git:https://github.com` 已消失。

---

### 2. 測試 Git 操作

```bash
# 嘗試推送到遠端
git push origin main
```

應該會要求重新輸入帳號密碼（或提示使用 Token）。

 **成功！** 如果跳出登入視窗，代表認證已經清除乾淨！

##  實戰練習

### 練習 1（簡單）
移除電腦上的 Git 認證，並驗證是否成功。

:::details 參考答案
**步驟一：移除認證**
1. 按 `Win + R`  輸入 `control`
2. 使用者帳戶  認證管理員
3. Windows 認證  找到 `git:https://github.com`
4. 展開  移除

**步驟二：驗證**
```bash
# 嘗試推送（會要求重新認證）
cd 任意Git專案
git push
# 應提示輸入帳號密碼
```

**步驟三：檢查認證管理員**
- 重新開啟認證管理員
- 確認 `git:https://github.com` 不存在

 **小技巧**：如果沒有 Git 專案可以測試，用 `git clone` 任意公開專案也可以驗證！
:::

### 練習 2（簡單）
使用命令列刪除 Git 認證。

:::details 參考答案
```powershell
# 1. 列出所有認證
cmdkey /list

# 2. 找到類似以下的項目：
#    Target: git:https://github.com
#    Type: Generic

# 3. 刪除認證
cmdkey /delete:git:https://github.com

# 4. 驗證
cmdkey /list
# 應不再顯示 git:https://github.com
```

**優點：**
-  快速方便
-  適合批次處理

**缺點：**
-  需要記住指令
-  無圖形介面確認

 **記憶口訣**：`cmdkey` = Command Key（指令鑰匙），用來管理所有儲存的帳號密碼！
:::

### 練習 3（中等）
寫一個 PowerShell 腳本，自動檢查並移除 Git 認證，並提示使用者。

:::details 參考答案與思路
```powershell
# clean-git-credentials.ps1

Write-Host " 檢查 Git 認證..." -ForegroundColor Cyan

# 列出所有認證
$credentials = cmdkey /list | Select-String "git:https://github.com"

if ($credentials) {
    Write-Host " 找到 Git 認證：" -ForegroundColor Yellow
    Write-Host $credentials
    
    $confirm = Read-Host "`n是否要移除？(Y/N)"
    
    if ($confirm -eq 'Y' -or $confirm -eq 'y') {
        # 移除認證
        cmdkey /delete:git:https://github.com
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host " Git 認證已移除" -ForegroundColor Green
        } else {
            Write-Host " 移除失敗" -ForegroundColor Red
        }
    } else {
        Write-Host " 已取消操作" -ForegroundColor Yellow
    }
} else {
    Write-Host " 未找到 Git 認證" -ForegroundColor Red
    Write-Host "可能已經移除，或使用 SSH 金鑰" -ForegroundColor Gray
}

Write-Host "`n 提示：建議使用 SSH 金鑰代替 HTTPS 認證" -ForegroundColor Cyan
Write-Host "參考：https://docs.github.com/authentication/connecting-to-github-with-ssh" -ForegroundColor Gray
```

**使用方式：**
```powershell
# 設定執行原則（首次需要）
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned

# 執行腳本
.\clean-git-credentials.ps1
```

**思路：**
1. 用 `cmdkey /list` 列出所有認證
2. 用 `Select-String` 搜尋 Git 認證
3. 如果找到，詢問使用者是否移除
4. 執行 `cmdkey /delete` 並檢查結果
5. 提示使用 SSH 金鑰

 **超實用**：把這個腳本存起來，以後切換帳號時一鍵執行，超方便！

**進階：支援多個 Git 服務**
```powershell
$git_services = @(
    "git:https://github.com",
    "git:https://gitlab.com",
    "git:https://bitbucket.org"
)

foreach ($service in $git_services) {
    $cred = cmdkey /list | Select-String $service
    if ($cred) {
        Write-Host "找到：$service"
        cmdkey /delete:$service
    }
}
```
:::

##  FAQ

### Q: 移除認證後還能用 Git 嗎？
**可以**。移除後：
-  HTTPS 方式會要求重新輸入帳號密碼
-  SSH 方式不受影響（因為用金鑰認證）

 **比喻**：就像「登出帳號」，下次要用時再重新登入就好！

### Q: 為什麼推薦用 SSH 而非 HTTPS？
**SSH 優點：**
-  無需重複輸入密碼
-  更安全（金鑰認證）
-  不會儲存在認證管理員

**設定教學：** [初次下載 Git](./初次下載git.md#ssh-金鑰設定)

 **比喻**：HTTPS = 每次進門都要出示證件、SSH = 有指紋辨識直接進！

### Q: 可以儲存多個 GitHub 帳號嗎？
Windows 認證管理員只能儲存一組 `git:https://github.com`。

**解決方案：**
1. **使用 SSH 金鑰**（推薦） 
   - 每個帳號產生獨立金鑰
   - 用 SSH config 管理多帳號
   
2. **使用 Git Credential Manager**
   - 支援多帳號管理
   - 自動選擇對應認證

 **最佳實踐**：工作帳號用 SSH、個人帳號也用 SSH，各自有獨立金鑰，互不干擾！

### Q: macOS/Linux 如何清除認證？
**macOS：**
```bash
# 刪除鑰匙圈中的 GitHub 認證
git credential-osxkeychain erase
host=github.com
protocol=https
# 按 Enter 兩次
```

**Linux：**
```bash
# 刪除儲存的認證
rm ~/.git-credentials

# 或使用 credential helper
git config --global --unset credential.helper
```

##  延伸閱讀
- [初次下載 Git](./初次下載git.md) - 安裝與設定 SSH
- [Git Clone](./git-clone.md) - HTTPS vs SSH 差異
- [GitHub Docs: 管理認證](https://docs.github.com/en/get-started/getting-started-with-git/caching-your-github-credentials-in-git)

##  總結
1. Windows 認證管理員會偷偷儲存 Git HTTPS 認證（就像瀏覽器記住密碼）。
2. 切換帳號需手動移除舊認證（控制台  認證管理員  刪除）。
3. 命令列方式：`cmdkey /delete:git:https://github.com`（工程師專用）。
4. 建議改用 SSH 金鑰，避免認證管理問題（一勞永逸）。
5. 移除後首次推送會要求重新輸入帳號密碼（正常現象）。

**最後一句話**：移除 Git 認證就像「清除瀏覽器記住的密碼」，當你要切換帳號或遇到權限問題時，這招能解決 90% 的登入問題！記得：Origin 我家、Upstream 別人家，搞清楚自己在推送到誰的 GitHub 很重要！
