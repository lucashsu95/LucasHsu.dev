---
title: Dev Container 寫 LaTeX 完整教學 | LucasHsu.dev
description: 不需要在本機安裝 MiKTeX 或 TeX Live，只要 VSCode + Docker 就能編譯 LaTeX。這篇教你用 Dev Container 建立零環境的 LaTeX 開發環境，包含 Dockerfile、devcontainer.json 配置、中文支援、xelatex 編譯與 Git 整合。
head:
- - meta
  - name: author
    content: 許恩綸
- - meta
  - name: keywords
    content: LaTeX, Dev Container, Docker, VSCode, TeX Live, xelatex, xeCJK, 中文排版, 容器開發, DevOps
- - meta
  - property: og:title
    content: Dev Container 寫 LaTeX 完整教學 — 零環境安裝
- - meta
  - property: og:description
    content: 只需要 VSCode + Docker，不需要安裝任何 TeX 發行版。完整教學包含 Dockerfile 配置、devcontainer.json、中文 xelatex 編譯與多專案共用 image。
- - meta
  - property: og:type
    content: article
- - meta
  - property: og:image
    content: https://lucashsu95.github.io/LucasHsu.dev/images/latex-devcontainer-cover.webp
---

# 用 Dev Container 寫 LaTeX — 零環境安裝教學

> 只需要 **VSCode + Docker**，不需要安裝 MiKTeX 或 TeX Live，任何電腦都能編譯。
>
## 前置需求

| 工具 | 說明 |
|------|------|
| [VSCode](https://code.visualstudio.com/) | 編輯器 |
| [Docker Desktop](https://www.docker.com/products/docker-desktop/) | 容器環境（Windows/Mac 裝這個） |
| VSCode 插件：Dev Containers | `ms-vscode-remote.remote-containers` |
| VSCode 插件：LaTeX Workshop | `James-Yu.latex-workshop` |

## 專案結構

```
your-project/
├── .devcontainer/
│   ├── devcontainer.json
│   └── Dockerfile
├── .vscode/
│   └── settings.json
└── main.tex
```

## 步驟一：建立 Dockerfile

新增 `.devcontainer/Dockerfile`：

```dockerfile
FROM texlive/texlive:latest

# 安裝常用工具
RUN apt-get update && apt-get install -y \
    git \
    latexmk \
    && rm -rf /var/lib/apt/lists/*

# 安裝自訂字型
COPY ./fonts/ /usr/local/share/fonts/
RUN fc-cache -fv
```

> `texlive/texlive:latest` 已包含完整 TeX Live，xelatex、xeCJK 等套件全部內建。
>
## 步驟二：建立 devcontainer.json

新增 `.devcontainer/devcontainer.json`：

```json
{
  "name": "LaTeX",
  "build": {
    "dockerfile": "Dockerfile"
  },
  "customizations": {
    "vscode": {
      "extensions": [
        "James-Yu.latex-workshop"
      ]
    }
  },
  "workspaceMount": "source=${localWorkspaceFolder},target=/workspace,type=bind",
  "workspaceFolder": "/workspace"
}
```

## 步驟三：建立 VSCode settings.json

新增 `.vscode/settings.json`：

```json
{
  "latex-workshop.latex.recipes": [
    {
      "name": "xelatex × 2",
      "tools": ["xelatex", "xelatex"]
    },
    {
      "name": "latexmk (xelatex)",
      "tools": ["latexmk-xelatex"]
    }
  ],
  "latex-workshop.latex.tools": [
    {
      "name": "xelatex",
      "command": "xelatex",
      "args": [
        "-synctex=1",
        "-interaction=nonstopmode",
        "-file-line-error",
        "%DOC%"
      ]
    },
    {
      "name": "latexmk-xelatex",
      "command": "latexmk",
      "args": [
        "-xelatex",
        "-synctex=1",
        "-interaction=nonstopmode",
        "%DOC%"
      ]
    }
  ],
  "latex-workshop.view.pdf.viewer": "tab",
  "latex-workshop.latex.autoBuild.run": "onSave"
}
```

## 步驟四：撰寫 main.tex（中文範例）

```latex
\documentclass{article}
\usepackage{fontspec}
\usepackage{xeCJK}

\setCJKmainfont{Noto Serif CJK TC}

\title{我的第一份 LaTeX 文件}
\author{你的名字}
\date{\today}

\begin{document}
\maketitle

\section{介紹}
這是一份用 Dev Container 編譯的 LaTeX 文件。

\end{document}
```

> 容器內預設有 Noto CJK 字型，直接使用即可。
>
## 步驟五：啟動 Dev Container

1. 用 VSCode 開啟專案資料夾
2. 按左下角 `><` 藍色按鈕，選擇 **Reopen in Container**
3. 第一次會 build Docker image，約等 3–5 分鐘
4. 完成後環境自動就緒

## 步驟六：編譯

開啟 `main.tex`，有三種方式觸發編譯：

| 方式 | 操作 |
|------|------|
| 存檔自動編譯 | `Ctrl + S` |
| 手動編譯 | 點右上角 ▶ 按鈕 |
| CLI 編譯 | 在 VSCode 終端機輸入 `xelatex main.tex` |

PDF 會在側欄自動開啟預覽。

**也可以用(這樣連VSCode都不用開)**

```bash
cd "/home/user/birc-contest/"
     docker run --rm -v "$(pwd):/workspace" -w /workspace lucas0423/latex-devcontainer:latest xelatex problem.tex
     docker run --rm -v "$(pwd):/workspace" -w /workspace lucas0423/latex-devcontainer:latest xelatex problem.tex  # 第二次
```

用 Docker 跑 XeLaTeX 把 problem.tex 編譯成 PDF，編譯完容器自動刪除。

## 進階：多個專案共用同一個 image

如果有多個 LaTeX 專案（例如出題目、筆記），可以把 image 推到 Docker Hub，所有專案共用，不需要每個都放 Dockerfile

**build 並推上 Docker Hub：**

```bash

cd .devcontainer

docker build -t yourname/latex-devcontainer:latest .

docker push yourname/latex-devcontainer:latest

```

**其他專案的 `devcontainer.json` 改用 image：**

```json
{
  "name": "LaTeX",
  "image": "lucas0423/latex-devcontainer:latest",
  "customizations": {
    "vscode": {
      "extensions": [
        "James-Yu.latex-workshop"
      ]
    }
  },
  "workspaceMount": "source=${localWorkspaceFolder},target=/workspace,type=bind",
  "workspaceFolder": "/workspace"
}
```

這樣其他專案 Reopen in Container 直接 pull image，不需要重 build。

## 常見問題

**Q：第一次 build 很慢？**  
A：`texlive/texlive:latest` 映像檔約 4 GB，只需下載一次，之後秒開。

**Q：中文字型跑版或找不到字型？**  
A：容器內執行 `fc-list | grep -i noto` 確認字型名稱，再填入 `\setCJKmainfont{}`。

**Q：想加入自訂套件？**  
A：在 `Dockerfile` 的 `RUN` 加上 `tlmgr install <套件名>` 即可。

```dockerfile
RUN tlmgr install forest pgf-pie
```

## 搭配 Git 使用

建議在 `.gitignore` 加入編譯產生的暫存檔：

```
*.aux
*.log
*.out
*.toc
*.synctex.gz
*.fls
*.fdb_latexmk
*.pdf
```

> 如果 PDF 需要版控（例如交報告），可以移除最後一行。
