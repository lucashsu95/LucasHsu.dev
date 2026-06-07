---
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: jsconfig.json,jsconfig,vite.config.js
  - - meta
    - property: og:title
      content: 設定 jsconfig.json和vite.config.js
  - - meta
    - property: og:description
      content: 初始化 jsconfig.json和vite.config.js
  - - meta
    - property: og:type
      content: article
---

# 初始化 jsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*", "src/**/*.vue"],
  "exclude": ["node_modules", "dist", "src/**/__tests__/*"]
}
```

### 1. `compilerOptions`

- **`baseUrl`**: 設置為 `"."`，這表示基準路徑為當前目錄（通常是項目的根目錄）。這樣可以使得相對路徑的導入更加簡潔。

- **`paths`**: 定義了路徑映射。在這裡，`"@/*"` 被映射到 `"./src/*"`，這意味著你可以使用 `@` 作為 `src` 目錄的別名，從而簡化導入路徑。例如，你可以這樣導入組件：
  ```javascript
  import MyComponent from '@/components/MyComponent.vue';
  ```

### 2. `include`

- **`["src/**/*", "src/**/*.vue"]`**: 這個選項指定了要包含在編譯過程中的文件。這裡包括了 `src` 目錄下的所有文件和子目錄，以及所有的 `.vue` 文件。

### 3. `exclude`

- **`["node_modules", "dist", "src/**/__tests__/*"]`**: 這個選項指定了要排除在編譯過程中的文件和目錄。具體來說：
  - **`node_modules`**: 排除了第三方依賴，因為這些文件不需要進行編譯。
  - **`dist`**: 排除了編譯後的輸出目錄，通常這些文件是由編譯過程生成的，不需要再次編譯。
  - **`src/**/__tests__/*`**: 排除了 `src` 目錄下的所有測試文件，這些文件通常是用於單元測試的，不需要包含在最終的編譯結果中。


# 初始化 vite.config.js
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
```

這是一個 Vite 的配置文件，用於設置 Vite 在構建 React 應用程式時的行為。以下是對每個部分的解釋：

## `defineConfig`

`defineConfig` 是一個 Vite 提供的函數，用於定義配置對象。它接受一個對象作為參數，並返回該對象本身。這樣做的目的是為了提供更好的類型推斷和自動完成。

## `plugins`

`plugins` 是一個數組，用於指定要使用的插件。在這個配置中，我們使用了 `@vitejs/plugin-react` 插件，它提供了對 React 的支持。

## `resolve`

`resolve` 是一個對象，用於配置模塊解析選項。

### `alias`

`alias` 是一個對象，用於定義路徑別名。在這個配置中，我們定義了一個名為 `@` 的別名，它指向 `./src` 目錄。這樣做的目的是為了方便引用源代碼目錄中的模塊。例如，我們可以使用 `@/components/Button` 來引用 `./src/components/Button.js` 文件。

使用路徑別名可以提高代碼的可讀性和可維護性，因為它們提供了一種更簡潔和一致的方式來引用模塊。

總之，這個配置文件設置了 Vite 在構建 React 應用程式時的一些基本選項，包括使用 React 插件和定義路徑別名。這些設置可以根據項目的需求進行調整和擴展。