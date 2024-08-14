---
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: git,git clone,clone
  - - meta
    - name: og:title
      content: git clone 克隆
  - - meta
    - name: og:description
      content: git clone 克隆,到電腦上克隆雲端上github的repo,只下載最近三次commit教學
---

# git clone 克隆

概述: 到電腦上克隆雲端上github的repo

# 克隆clone

```bash
git clone <url>
```
## 範例
```bash
git clone https://github.com/lucashsu95/python-noob-drives
```

## 只下載最近三次commit

```bash
git clone <url> --depth=3
```
## 範例
```bash
git clone https://github.com/lucashsu95/python-noob-drives --depth=3
```