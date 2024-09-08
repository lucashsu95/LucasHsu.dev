---
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: eslint,prettier,eslin prettier,vite,eslint vite,prettier vite
  - - meta
    - name: og:title
      content: 設定 ESLint 和 Prettier
  - - meta
    - name: og:description
      content: 在 npm / pnpm 的專案中設定 ESLint 和 Prettier, 並且在 vite 中使用
  - - meta
    - name: og:type
      content: article
---

# 使用 npm / pnpm 的專案中設定 ESLint 和 Prettier

## 1. 安裝 ESLint 和 Prettier

首先，打開你的終端機，並導航到你的專案目錄。然後執行以下命令來安裝 ESLint 和 Prettier：

### npm
```bash
npm install eslint prettier eslint-plugin-prettier eslint-config-prettier --save-dev
```
或
### pnpm
```bash
pnpm add -D eslint prettier eslint-plugin-prettier eslint-config-prettier
```

這些包的作用如下：

- `eslint`：主 ESLint 包。
- `prettier`：代碼格式化工具。
- `eslint-config-prettier`：關閉 ESLint 中與 Prettier 衝突的規則。
- `eslint-plugin-prettier`：將 Prettier 作為 ESLint 規則運行。

## 2. 配置 Prettier 文件（可選）

創建一個 `.prettierrc` 

```json
{
  "$schema": "https://json.schemastore.org/prettierrc",
  "semi": false,
  "tabWidth": 2,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "none",
}
```

如果使用 tailwindcss 可以加這個
```json
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

記得要先安裝
```bash
npm i -D @prettier/plugin-tailwindcss
```

## 3. 執行 ESLint 和 Prettier

要檢查你的代碼是否符合 ESLint 規則，可以使用以下命令：

```bash
pnpm eslint .
```

要格式化代碼，你可以使用 Prettier：

```bash
pnpm prettier --write src/
```

或是可以加到`package.json`

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint .",
  "format": "prettier --write src/",
  "preview": "vite preview"
},
```