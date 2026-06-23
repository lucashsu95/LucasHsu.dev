---
title: Tmux 完整操作手冊 | LucasHsu.dev
description: Tmux 完整操作手冊 — 安裝矩陣、進階操作、快捷鍵完整對照表、面板佈局調整、大師腳本、WSL2 剪貼簿、TPM 插件設定，所有操作一次查。
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: Tmux, 完整手冊, 快捷鍵對照表, 面板佈局, 大師腳本, TPM, WSL2, 終端機多工器, 複製模式, 同步面板
  - - meta
    - property: og:title
      content: Tmux 完整操作手冊
  - - meta
    - property: og:description
      content: Tmux 完整操作手冊 — 安裝矩陣、進階操作、快捷鍵完整對照表、面板佈局調整、大師腳本、WSL2 剪貼簿、TPM 插件設定
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/tmux-cover.webp
---

# Tmux 完整操作手冊

> 📝 這是一份 Tmux 完整操作手冊，適合已經會基本操作的人查閱。如果你是第一次接觸 Tmux，建議先看 [Tmux 終端機多工器完全指南](./tmux-guide)。

## 安裝步驟

### Linux（Debian / Ubuntu）

```bash
sudo apt update
sudo apt install tmux -y
tmux -V
```

### Linux（RHEL / Rocky / CentOS）

```bash
sudo yum install epel-release -y
sudo yum install tmux
```

### 其他 Linux 發行版

```bash
# Fedora
sudo dnf install tmux

# Arch Linux
sudo pacman -S tmux

# OpenSUSE
sudo zypper install tmux

# Alpine Linux
sudo apk add tmux
```

### macOS

```bash
brew install tmux
tmux -V
```

### 從原始碼編譯

如果你想用最新版：

```bash
sudo apt install libevent-dev ncurses-dev -y
git clone https://github.com/tmux/tmux.git
cd tmux
./autogen.sh
./configure
make
sudo make install
tmux -V
```

## 三層架構

```
Session 0
├── Window 0 (Bash)
│   ├── Pane 0 (活動)
│   └── Pane 1
├── Window 1 (Vim)
│   ├── Pane 0
│   └── Pane 1
└── Window 2 (Node.js)
    └── Pane 0 (活動)

Session 1
├── Window 0 (Python)
│   └── Pane 0
└── Window 1 (Docker)
    ├── Pane 0
    ├── Pane 1
    └── Pane 2
```

### Session（會話）

最頂層的容器，持久化運行在伺服器上。即使斷開連接，會話仍在後台運行。

使用場景：
- **不同專案的隔離工作空間**
- **長期運行的後台服務**
- **需要保持活動的開發環境**

### Window（視窗）

每個 session 內的獨立工作區，有自己的尺寸和佈局。

使用場景：
- **在同一專案內分離不同任務（編輯、測試、部署）**
- **為每個工作流程創建專門的視窗**

### Pane（面板）

window 內的細分區域，可在同一視窗內同時看到多個終端。

使用場景：
- **並排查看代碼和輸出**
- **同時監控多個進程**
- **比較檔案內容**

## 設定檔完整參考

設定檔位置 `~/.tmux.conf`，以下為完整版設定，你可以直接複製貼上：

### 完整設定檔（10 區塊）

```ini
# ============================================
# 1. 前置鍵設定
# ============================================

# 把 Ctrl + b 改成 Ctrl + a（比較好按）
unbind C-b
set -g prefix C-a
bind C-a send-prefix

# ============================================
# 2. 基本顯示設定
# ============================================

# 設定預設終端類型
set -g default-terminal "screen-256color"

# 啟用滑鼠支援（2.1+ 版本）
set -g mouse on

# 狀態列更新間隔（毫秒），設為 1 即時更新
set -g status-interval 1

# 設定滾動歷史的行數
set -g history-limit 10000

# ============================================
# 3. 視窗與面板編號
# ============================================

# 視窗編號從 1 開始（而非 0）
set -g base-index 1

# Pane 編號也從 1 開始
setw -g pane-base-index 1

# ============================================
# 4. 分割快捷鍵（更直覺）
# ============================================

# 用 | 水平分割（原本是 %）
unbind %
bind | split-window -h

# 用 - 垂直分割（原本是 "）
unbind '"'
bind - split-window -v

# ============================================
# 5. Vim 風格切換 pane
# ============================================
bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R

# ============================================
# 6. 面板大小調整（Alt + 方向鍵）
# ============================================
bind -n M-Up resize-pane -U 5
bind -n M-Down resize-pane -D 5
bind -n M-Left resize-pane -L 5
bind -n M-Right resize-pane -R 5

# ============================================
# 7. 快速重新載入設定檔
# ============================================
bind r source-file ~/.tmux.conf \; display "Configuration reloaded!"

# ============================================
# 8. 複製模式用 Vim 風格
# ============================================
setw -g mode-keys vi
bind -T copy-mode-vi v send -X begin-selection
bind -T copy-mode-vi y send -X copy-selection-and-cancel
bind -T copy-mode-vi V send -X select-line
bind -T copy-mode-vi C-v send -X rectangle-toggle

# ============================================
# 9. 狀態列美化
# ============================================
set -g status-bg black
set -g status-fg white
set -g window-status-style "bg=colour234,fg=colour245"
set -g window-status-current-style "bg=colour235,fg=colour255"
set -g status-left "#[bg=green,fg=black] #S #[default] | "
set -g status-right "#[fg=cyan]%H:%M:%S "

# ============================================
# 10. 其他有用設定
# ============================================

# 自動重新命名視窗
setw -g automatic-rename on

# 在終端標題欄顯示 session 和視窗名稱
set -g set-titles on
set -g set-titles-string '#H - #S - #W'

# 視窗切換時延遲更短（毫秒）
set -s escape-time 1
```

### 進階狀態列配置

```ini
set -g status-left "#[bg=green]#[fg=black] #S #[default] | #[fg=blue]#H"
set -g status-right "%a %b %d | #[fg=cyan]%H:%M:%S"
set -g status-justify left

setw -g window-status-format "#[fg=cyan]#W"
setw -g window-status-current-format "#[bg=cyan,fg=black] #W #[default]"

set -g pane-border-fg blue
set -g pane-active-border-fg green
```

### TPM 插件設定

先安裝 TPM：

```bash
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
```

在 `~/.tmux.conf` 最底部加入：

```ini
# ============================================
# TPM 插件設定（放在設定檔最底部）
# ============================================

# 插件列表
set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'tmux-plugins/tmux-sensible'          # 智能預設設定
set -g @plugin 'tmux-plugins/tmux-prefix-highlight'  # 前置鍵高亮
set -g @plugin 'tmux-plugins/tmux-sessionist'        # 增強 session 管理
set -g @plugin 'tmux-plugins/tmux-resurrect'         # 儲存/恢復會話
set -g @plugin 'tmux-plugins/tmux-continuum'         # 自動儲存（每 15 分）
set -g @plugin 'tmux-plugins/tmux-yank'              # 增強複製功能
set -g @plugin 'tmux-plugins/tmux-open'              # 快速打開 URL

# 自動恢復（continuum）
set -g @continuum-save-interval '15'
set -g @continuum-restore 'on'

# 初始化 TPM（此行必須位於設定檔最後）
run '~/.tmux/plugins/tpm/tpm'
```

安裝插件：重載設定後按 `Prefix + I`。

## 快捷鍵完整對照表

所有快捷鍵都需要先按前置鍵（預設 `Ctrl + b`，本文示範已改為 `Ctrl + a`）。

### Session 管理

| 快捷鍵 | 命令模式 | 說明 |
|--------|---------|------|
| `Prefix + d` | `:detach` | 分離目前 session |
| `Prefix + s` | `:list-sessions` | 選擇並切換 session |
| `Prefix + $` | `:rename-session` | 重命名目前 session |
| `Prefix + (` | — | 切換到前一個 session |
| `Prefix + )` | — | 切換到下一個 session |
| `Prefix + L` | — | 切換到最後使用的 session |

### Window 管理

| 快捷鍵 | 命令模式 | 說明 |
|--------|---------|------|
| `Prefix + c` | `:new-window` | 創建新 window |
| `Prefix + n` | `:next-window` | 下一個 window |
| `Prefix + p` | `:previous-window` | 上一個 window |
| `Prefix + 0-9` | `:select-window -t n` | 按編號選擇 window |
| `Prefix + w` | `:list-windows` | 列出所有 window |
| `Prefix + f` | `:find-window` | 搜尋 window |
| `Prefix + ,` | `:rename-window` | 重命名 window |
| `Prefix + &` | `:kill-window` | 刪除 window |
| `Prefix + !` | `:break-pane` | 將 pane 分離為 window |

### Pane 管理

| 快捷鍵 | 命令模式 | 說明 |
|--------|---------|------|
| `Prefix + %` | `:split-window -h` | 水平分割 pane |
| `Prefix + "` | `:split-window -v` | 垂直分割 pane |
| `Prefix + ↑` | `:select-pane -U` | 切換到上方 pane |
| `Prefix + ↓` | `:select-pane -D` | 切換到下方 pane |
| `Prefix + ←` | `:select-pane -L` | 切換到左方 pane |
| `Prefix + →` | `:select-pane -R` | 切換到右方 pane |
| `Prefix + o` | `:select-pane -t :.+` | 循環切換 pane |
| `Prefix + ;` | — | 切換到最後使用的 pane |
| `Prefix + x` | `:kill-pane` | 關閉 pane |
| `Prefix + Space` | `:next-layout` | 循環切換佈局 |
| `Prefix + {` | `:swap-pane -U` | 與上方 pane 交換 |
| `Prefix + }` | `:swap-pane -D` | 與下方 pane 交換 |
| `Prefix + z` | `:resize-pane -Z` | 縮放 pane |
| `Prefix + Ctrl+↑` | `:resize-pane -U 5` | 向上調整 5 行 |
| `Prefix + Ctrl+↓` | `:resize-pane -D 5` | 向下調整 5 行 |
| `Prefix + Ctrl+←` | `:resize-pane -L 5` | 向左調整 5 列 |
| `Prefix + Ctrl+→` | `:resize-pane -R 5` | 向右調整 5 列 |

### 複製與選擇

| 快捷鍵 | 說明 |
|--------|------|
| `Prefix + [` | 進入複製模式 |
| `Prefix + ]` | 貼上複製內容 |
| `Space` | 開始選擇（複製模式中） |
| `Enter` | 複製選定文本（複製模式中） |
| `q` | 退出複製模式 |
| `Esc` | 清除選擇 |

### 其他命令

| 快捷鍵 | 命令模式 | 說明 |
|--------|---------|------|
| `Prefix + ?` | `:list-keys` | 顯示所有快捷鍵 |
| `Prefix + :` | — | 進入命令模式 |
| `Prefix + t` | `:clock-mode` | 顯示時鐘 |
| `Prefix + q` | `:display-panes` | 顯示 pane 編號 |
| `Prefix + r` | `:source-file ~/.tmux.conf` | 重新載入配置 |

## 進階操作

### 複製模式詳細操作

進入複製模式：`Prefix + [`。

在複製模式中的移動（Vim 風格）：

| 按鍵 | 說明 |
|------|------|
| `v` | 開始選擇 |
| `V` | 選擇整行 |
| `y` | 複製並退出 |
| `C-v` | 切換矩形選擇 |
| `g` | 跳到開頭 |
| `G` | 跳到末尾 |
| `Page Up / Down` | 上下翻頁 |
| `/` | 向下搜尋 |
| `?` | 向上搜尋 |
| `n` | 搜尋下一個 |
| `N` | 搜尋上一個 |
| `q` | 退出複製模式 |

### 預設面板佈局

按 `Prefix + Space` 循環切換：

1. **even-horizontal** — 所有 pane 寬度相同，從左到右
2. **even-vertical** — 所有 pane 高度相同，從上到下
3. **main-horizontal** — 一個主 pane 在上方，其他在下方
4. **main-vertical** — 一個主 pane 在左方，其他在右方
5. **tiled** — 所有 pane 均勻分配

### 命令模式常用指令

進入命令模式：`Prefix + :`。

```bash
# 創建新 session
new-session -s session-name

# 創建新 window
new-window -n window-name

# 重命名 session
rename-session -t old-name new-name

# 重命名 window
rename-window -t session:window new-name

# 在 session 中執行命令
send-keys -t session:window.pane "command" Enter

# 顯示所有按鍵綁定
list-keys

# 列出所有客户端連接
list-clients
```

### 在 Pane 中執行命令

```bash
# 在指定 pane 中執行命令（從外部）
tmux send-keys -t session:window.pane "command" Enter

# 範例：在 dev session 的 test pane 中執行 npm test
tmux send-keys -t dev:1.0 "npm test" Enter
```

### 同步 Pane

同時在多個 Pane 中輸入相同指令：

1. 進入命令模式（`Prefix + :`）
2. 輸入：`set synchronize-panes on`
3. 所有在當前 window 中的 pane 都會接收相同的輸入
4. 關閉同步：`set synchronize-panes off`

或者在設定檔中定義快捷鍵：

```ini
bind e set synchronize-panes on \; display "Panes synchronized"
bind E set synchronize-panes off \; display "Panes unsynchronized"
```

## 大師操作

### 完整開發環境腳本

```bash
#!/bin/bash
# setup-dev.sh — 一鍵建立開發環境
SESSION="mydev"

# 如果 session 已存在，直接附加
if tmux has-session -t $SESSION 2>/dev/null; then
    tmux attach -t $SESSION
    exit 0
fi

# 建立新 session
tmux new-session -d -s $SESSION -c ~/projects/myapp

# Window 0: editor
tmux rename-window -t $SESSION:0 "editor"
tmux send-keys -t $SESSION:0 "vim ." Enter

# Window 1: server
tmux new-window -t $SESSION:1 -n "server"
tmux send-keys -t $SESSION:1 "npm run dev" Enter

# Window 2: test + log（分割畫面）
tmux new-window -t $SESSION:2 -n "test"
tmux split-window -h -t $SESSION:2
tmux send-keys -t $SESSION:2.0 "npm test" Enter
tmux send-keys -t $SESSION:2.1 "tail -f logs/app.log" Enter

# Window 3: monitor
tmux new-window -t $SESSION:3 -n "monitor"
tmux send-keys -t $SESSION:3 "htop" Enter

# 回到 editor
tmux select-window -t $SESSION:0
tmux attach -t $SESSION
```

### 高級面板佈局腳本

```bash
#!/bin/bash
# 建立一個 4 分割的畫面
SESSION="complex"
tmux new-session -d -s $SESSION

# 預設 pane 分成 2 列
tmux send-keys -t $SESSION "echo Top-Left" Enter
tmux split-window -t $SESSION -h
tmux send-keys -t $SESSION "echo Top-Right" Enter

# 左側創建下層
tmux select-pane -t $SESSION -L
tmux split-window -t $SESSION -v
tmux send-keys -t $SESSION "echo Bottom-Left" Enter

# 右側創建下層
tmux select-pane -t $SESSION -R
tmux split-window -t $SESSION -v
tmux send-keys -t $SESSION "echo Bottom-Right" Enter

tmux attach -t $SESSION
```

### 動態創建 Sessions

根據專案目錄自動建立 tmux 會話：

```bash
#!/bin/bash
# create-all-sessions.sh
for project_dir in ~/projects/*/; do
    project_name=$(basename "$project_dir")
    if ! tmux has-session -t "$project_name" 2>/dev/null; then
        tmux new-session -d -s "$project_name" -c "$project_dir"
        echo "Created session: $project_name"
    fi
done
```

### 快速切換專案 Session

在 `~/.bashrc` 或 `~/.zshrc` 中加入：

```bash
function tmux-project() {
    local project=$1
    if tmux has-session -t "$project" 2>/dev/null; then
        tmux attach -t "$project"
    else
        echo "Session $project not found. Creating..."
        tmux new-session -s "$project" -c ~/projects/"$project"
        tmux attach -t "$project"
    fi
}

# 使用方式
tmux-project myapp
```

### 遠端 Tmux 會話

```bash
# SSH 到遠端並附加到 tmux session
ssh user@host -t tmux attach -t session-name

# 或建立新 session
ssh user@host -t tmux new-session -s remote-session

# 在遠端執行命令並返回
ssh user@host -t "tmux send-keys -t session 'command' Enter"
```

### 監控 Pane 活動

```bash
# 啟用 pane 監控
tmux set-window-option -t session:window monitor-activity on

# 在設定檔中啟用視覺活動通知
set -g status-interval 1
set -g visual-activity on
```

## 常見問題

### Q1：`Ctrl + b [` 是什麼？

這是進入複製模式的快捷鍵。按 `Ctrl + b` 再按 `[` 進入複製模式，就可以用方向鍵或 Vim 快捷鍵選擇文本，按 `Space` 開始選取，`Enter` 複製，`Prefix + ]` 貼上。

### Q2：如何在 tmux 中使用滑鼠？

在 `~/.tmux.conf` 加入：

```ini
set -g mouse on
```

重新載入後就可以點選切換 pane、拖曳邊界調整大小、滾動查看歷史。

### Q3：如何在 Windows 中使用 tmux？

1. **WSL（推薦）** — 在 WSL 環境中安裝 Linux 版本
2. **Git Bash** — 有編譯好的版本
3. **虛擬機** — 裝 Linux 再用

### Q4：如何保存和恢復 tmux 會話？

使用 tmux-resurrect 插件：

```ini
set -g @plugin 'tmux-plugins/tmux-resurrect'
set -g @plugin 'tmux-plugins/tmux-continuum'
set -g @continuum-save-interval '15'
set -g @continuum-restore 'on'
```

- 手動保存：`Prefix + Ctrl + s`
- 手動恢復：`Prefix + Ctrl + r`

### Q5：如何共享 tmux 會話？

```bash
# 使用者 A 建立
tmux new -s pair-programming

# 使用者 B（同機器）
tmux attach -t pair-programming
```

兩個人會看到同一個畫面。

## WSL2 + Tmux 滑鼠拖選複製到 Windows 剪貼簿

如果你在 Windows Terminal + WSL2 + tmux 的環境，滑鼠拖選文字可以直接進 Windows 剪貼簿。

### 原理流程

```
滑鼠拖移
  ↓
root MouseDrag1Pane → copy-mode -M       （強制進 copy-mode）
  ↓
copy-mode-vi MouseDrag1Pane → begin-selection （開始選取）
  ↓
放開滑鼠
  ↓
copy-mode-vi MouseDragEnd1Pane → copy-selection-and-cancel （複製到 tmux buffer）
  ↓
after-set-buffer hook → tmux save-buffer - | clip.exe （推上 Windows 剪貼簿）
  ↓
✅ Ctrl+V 貼上
```

### 步驟

#### 1. 確認 clip.exe 可用

```bash
echo "Hello" | /mnt/c/Windows/system32/clip.exe
```

打開 Windows 記事本按 `Ctrl+V`，確認內容正確。

#### 2. 加入設定檔

把以下內容加到 `~/.tmux.conf`（放在 TPM 的 `run` 之後）：

```ini
# ── 剪貼簿：hook + 覆寫 tmux-yank ──────────────────

# tmux buffer 變更 → 完整路徑餵 clip.exe
set-hook -g after-set-buffer 'run "tmux save-buffer - | /mnt/c/Windows/system32/clip.exe"'

# 覆寫 tmux-yank 的 MouseDragEnd1Pane（不用 pipe）
bind-key -T copy-mode-vi MouseDragEnd1Pane send-keys -X copy-selection-and-cancel
bind-key -T copy-mode    MouseDragEnd1Pane send-keys -X copy-selection-and-cancel

# 強制拖移進 copy-mode（不被應用程式攔截）
bind-key -T root MouseDrag1Pane copy-mode -M
```

#### 3. 重載設定

```bash
tmux source-file ~/.tmux.conf
```

#### 4. 測試

在任何 pane 拖選文字 → 放開 → 去 Windows 記事本按 `Ctrl+V`。

## 實戰練習

### 練習 1：建立完整開發環境（中等）⭐⭐

**任務：** 寫一個腳本 `dev-env.sh`，執行後建立以下架構：

```
Session: myproject
├── Window 0: editor
│   ├── Pane 0: vim .
│   └── Pane 1: git status (watch)
├── Window 1: server
│   ├── Pane 0: npm run dev
│   └── Pane 1: tail -f logs/error.log
├── Window 2: test
│   └── Pane 0: npm test -- --watch
└── Window 3: monitor
    └── Pane 0: htop
```

:::details 參考答案

```bash
#!/bin/bash
SESSION="myproject"

if tmux has-session -t $SESSION 2>/dev/null; then
    tmux attach -t $SESSION
    exit 0
fi

tmux new-session -d -s $SESSION -c ~/projects/myapp

# Window 0: editor + git
tmux rename-window -t $SESSION:0 "editor"
tmux split-window -h -t $SESSION:0
tmux send-keys -t $SESSION:0.0 "vim ." Enter
tmux send-keys -t $SESSION:0.1 "watch -n 5 git status" Enter

# Window 1: server + log
tmux new-window -t $SESSION:1 -n "server"
tmux split-window -v -t $SESSION:1
tmux send-keys -t $SESSION:1.0 "npm run dev" Enter
tmux send-keys -t $SESSION:1.1 "tail -f logs/error.log" Enter

# Window 2: test
tmux new-window -t $SESSION:2 -n "test"
tmux send-keys -t $SESSION:2 "npm test -- --watch" Enter

# Window 3: monitor
tmux new-window -t $SESSION:3 -n "monitor"
tmux send-keys -t $SESSION:3 "htop" Enter

tmux select-window -t $SESSION:0
tmux attach -t $SESSION
```
:::

### 練習 2：WSL2 剪貼簿設定（中等）⭐⭐

**任務：** 在你的 WSL2 + Windows Terminal 環境中設定 tmux 滑鼠拖選複製，並驗證可以貼上到 Windows 應用程式。

:::details 參考答案

1. 確認 `clip.exe` 可用：
   ```bash
   echo "test" | /mnt/c/Windows/system32/clip.exe
   ```
2. 把 WSL2 區段的設定加到 `~/.tmux.conf`（放在 TPM `run` 之後）
3. 重載設定：`Prefix + r`
4. 在任何 pane 拖選文字 → 放開 → `Ctrl+V` 到記事本

如果失敗，檢查：
- `clip.exe` 路徑是否正確
- 設定是否放在 TPM `run` 之後
- 是否重新載入設定
:::

## 推薦插件

| 插件 | 功能 |
|------|------|
| [tmux-sensible](https://github.com/tmux-plugins/tmux-sensible) | 明智的 tmux 默認設置 |
| [tmux-resurrect](https://github.com/tmux-plugins/tmux-resurrect) | 保存和恢復 tmux 會話 |
| [tmux-continuum](https://github.com/tmux-plugins/tmux-continuum) | 自動保存會話 |
| [tmux-yank](https://github.com/tmux-plugins/tmux-yank) | 增強的複製功能 |
| [tmux-open](https://github.com/tmux-plugins/tmux-open) | 快速打開 URL 和文件 |
| [tmux-pain-control](https://github.com/tmux-plugins/tmux-pain-control) | 簡化面板控制 |
| [tmux-prefix-highlight](https://github.com/tmux-plugins/tmux-prefix-highlight) | 前置鍵視覺反饋 |
| [tmux-sessionist](https://github.com/tmux-plugins/tmux-sessionist) | 增強 session 管理 |

## 延伸閱讀

### 本站相關文章

- [Tmux 終端機多工器完全指南](./tmux-guide) — 新手入門請先看這篇
- [WSL 安裝與 VS Code 連線指南](./install-wsl) — 在 Windows 上啟用 WSL2

### 外部資源

- [Tmux 官方 GitHub](https://github.com/tmux/tmux)
- [Tmux Plugin Manager (TPM)](https://github.com/tmux-plugins/tpm)
- [Tmux Wiki](https://github.com/tmux/tmux/wiki)

---

**本手冊最後更新：2026 年 6 月 9 日**
