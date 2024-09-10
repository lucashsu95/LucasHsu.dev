---
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: jsconfig.json,jsconfig,
  - - meta
    - name: og:title
      content: 設定 jsconfig.json田
  - - meta
    - name: og:description
      content: 初始化 jsconfig.json
  - - meta
    - name: og:type
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