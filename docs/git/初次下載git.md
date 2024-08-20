---
outline: "deep"
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: git,git init,git開始,git安裝
  - - meta
    - name: og:title
      content: git init 初始化｜建立github Repo
  - - meta
    - name: og:description
      content: git init 初始化｜建立github Repo,電腦第一次裝git要做的事,檢查電腦有無GIT,新增USER 和EMAIL
  - - meta
    - name: og:type
      content: article
---

# 初次下載 Git

## 檢查電腦有無GIT

去官網下載：https://git-scm.com/

檢查方法：`win + r`然後`cmd` →打git，如果有跳出很多指令就是已安裝

## 檢查有沒有上一個使用者

到認證管理員

找到windows認證

找到 git 看是不是自己

## 建立github Repo

- 去github.com官網創建新帳號(如果沒有的話)

## 新增USER 和EMAIL

`<username>`、`<useremail>` 要改成自己github的喔
```bash
git config --global user.name <username>
git config --global user.email <useremail>
```

## NEW新增

按綠色按鈕

## 取名字輸入檔名

![](./imgs/1.png)

## 複製(上傳)

### 在要上傳的資料夾上打cmd 進到終端

![](./imgs/2.png)

### 貼上下面這些

`<username>`、`<your-repo>`要記得改成自己的username和repo名稱
```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/<username>/<your-repo>.git
git push -u origin main
```
![Untitled](./imgs/3.png)

## 發布網站

![alt text](imgs/image.png)