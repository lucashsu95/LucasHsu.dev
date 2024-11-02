---
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: CSS, Tailwind CSS, 初始化, 安裝, 配置
  - - meta
    - name: og:title
      content: Tailwind CSS 初始化設置指南
  - - meta
    - name: og:description
      content: 學習如何安裝、初始化和配置Tailwind CSS，包括創建配置文件和添加指令到CSS中
  - - meta
    - name: og:type
      content: article
---

# Tailwind CSS 初始化設置指南

## 1. install Tailwind CSS

```shell
# npm
npm install -D tailwindcss postcss autoprefixer

# pnpm
pnpm add -D tailwindcss postcss autoprefixer
```

創建/初始化`postcss.config.js`和`tailwind.config.js`

```shell
npx tailwindcss init -p
```

## 2. 配置 `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */

const content = [
  "./index.html",
  "./src/**/*.{js,jsx}",
],
const plugins = []
const theme = { extend: {} }
export { content, plugins, theme }
```

## 3. 將 Tailwind 指令添加到 CSS 文件中

在CSS 文件中（通常是 `src/index.css` 或 `src/styles/main.css`），添加指令：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

在`main.js`或`main.jsx`中匯入

```js
import './assets/index.css'
```

## 4. 在 HTML 中開始使用 Tailwind

```html
<h1 class="text-3xl font-bold underline">
  Hello world!
</h1>
```