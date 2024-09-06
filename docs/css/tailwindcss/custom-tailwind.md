---
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: CSS, Tailwind CSS, 客製化, 配置, @layer, 擴展
  - - meta
    - name: og:title
      content: Tailwind CSS 客製化指南
  - - meta
    - name: og:description
      content: 學習如何使用@layer語法和tailwind.config.js文件來客製化Tailwind CSS，包括擴展基礎樣式、組件和工具類
  - - meta
    - name: og:type
      content: article
---

# Tailwind CSS 客製化指南

## **1. 使用 @layer**

語法分別去對 base、components、utilities 新增自訂樣式

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* 擴充專案的全站樣式 */
  /* 這裡可以定義基礎樣式，例如全局字體、顏色等 */
  /* 
  body {
    font-family: 'Arial', sans-serif;
    color: #333;
  }
  */
}

@layer components {
  /* 自組元件 */
  /* 這裡可以定義可重複使用的組件樣式 */
  /* 
  .btn-primary {
    @apply bg-blue-500 text-white py-2 px-4 rounded;
  }
  */
}

@layer utilities {
  /* 自組樣式 */
  /* 這裡可以定義自定義的工具類 */
  /* 
  .text-shadow {
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  }
  */
}
```
## **2. 創建/初始化`tailwind.config.js`**
```js
/** @type {import('tailwindcss').Config} */

const content = ['./src/**/*.{vue,js,ts,jsx,tsx}']
const plugins = []
const theme = {
  extend: {
    colors: {
      primary: '#63e2b7',
      warning: '#f2c97d',
      danger: '#e88080',
      info: '#70c0e8'
    }
  }
}
export { content, plugins, theme }
```
