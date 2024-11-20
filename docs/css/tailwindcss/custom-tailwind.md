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


::: details 自定樣式


### `index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  /* Components Start */

  .navbar {
    @apply fixed left-0 right-0 top-0 z-10 flex justify-center space-x-4 bg-white p-5 shadow-md shadow-gray-300;
  }

  .wraps {
    @apply flex min-h-screen w-full items-center justify-center bg-slate-200;
  }

  .wrap {
    @apply flex flex-col rounded-xl border-2 border-sky-100 bg-slate-100 px-12 py-20 shadow-[2px_2px_15px] shadow-gray-300;
  }

  /* Components End */

  /* Tag Start */

  .input {
    @apply mb-1 w-full rounded-md border border-gray-200 bg-slate-200 p-2 shadow-md shadow-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-sky-500 md:min-w-[300px] lg:w-80;
  }

  .btn {
    @apply cursor-pointer rounded-md px-3 py-1.5 transition-transform duration-300 hover:brightness-90 active:scale-95;
  }

  .btn-primary {
    @apply btn bg-primary text-white;
  }

  .btn-secondary {
    @apply btn bg-slate-200;
  }

  .btn-success {
    @apply btn bg-success;
  }
  .btn-danger {
    @apply btn bg-danger;
  }

  .btn-warning {
    @apply btn bg-warning;
  }

  .btn-info {
    @apply btn bg-info;
  }

  .link {
    @apply cursor-pointer text-sky-500;
  }

  /* Tag End */

  /* Transform Start */

  .underline-effect {
    @apply relative pb-3 before:h-1 before:w-full before:content-[''];
    @apply before:absolute before:bottom-0 before:left-0 before:bg-primary;
    @apply before:scale-x-0 before:transition-all before:duration-300 hover:before:scale-x-100;
  }

  .transform-300 {
    @apply transform transition-transform duration-300;
  }

  /* Transform End */
}
```


### `tailwindcss.config.js`

```javascript
/** @type {import('tailwindcss').Config} */

export const content = ['./src/**/*.{vue,js,ts,jsx,tsx}']
export const plugins = []
export const theme = {
  extend: {
    colors: {
      primary: '#67c',
      success: '#63e2b7',
      warning: '#f2c97d',
      danger: '#e88080',
      info: '#70c0e8'
    }
  }
}
```

:::