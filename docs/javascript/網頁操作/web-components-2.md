# Web Components 實戰篇：企業級應用與最佳實踐

## 1. 實戰專案：構建元件庫

在這個實戰篇中，我們將構建一個完整的元件庫，並探討在真實專案中的應用場景。

### 1.1 專案結構設計

```
components/
├── base/
│   ├── BaseElement.js      # 基礎元件類
│   └── styles.js          # 共用樣式
├── ui/
│   ├── AlertCard.js       # 警告卡片
│   ├── UserCard.js        # 用戶卡片
│   └── ModalDialog.js     # 模態框
├── forms/
│   ├── InputField.js      # 輸入框
│   └── SubmitButton.js    # 提交按鈕
└── index.js               # 統一匯出
```

### 1.2 基礎元件類

首先創建一個基礎類來統一管理共同功能：

```javascript
// base/BaseElement.js
export class BaseElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._isConnected = false;
  }

  connectedCallback() {
    if (!this._isConnected) {
      this.render();
      this.setupEventListeners();
      this._isConnected = true;
    }
  }

  disconnectedCallback() {
    this.cleanup();
    this._isConnected = false;
  }

  // 子類需要實現的方法
  render() {
    throw new Error('render() method must be implemented');
  }

  setupEventListeners() {
    // 可選實現
  }

  cleanup() {
    // 可選實現
  }

  // 工具方法
  $(selector) {
    return this.shadowRoot.querySelector(selector);
  }

  $$(selector) {
    return this.shadowRoot.querySelectorAll(selector);
  }

  emit(eventName, detail = {}) {
    this.dispatchEvent(new CustomEvent(eventName, {
      bubbles: true,
      cancelable: true,
      detail
    }));
  }
}
```

## 2. 實戰元件一：SEO 友善的文章卡片

這個元件展示如何兼顧封裝性和 SEO：

```javascript
// ui/ArticleCard.js
import { BaseElement } from '../base/BaseElement.js';

export class ArticleCard extends BaseElement {
  static get observedAttributes() {
    return ['title', 'description', 'author', 'date', 'image', 'url'];
  }

  constructor() {
    super();
    this.addStructuredData();
  }

  render() {
    // 使用 Light DOM 確保 SEO 友善
    this.innerHTML = `
      <article class="article-card" itemscope itemtype="https://schema.org/Article">
        <img src="${this.image}" alt="${this.title}" loading="lazy" itemprop="image">
        <div class="content">
          <h2 itemprop="headline">${this.title}</h2>
          <p itemprop="description">${this.description}</p>
          <div class="meta">
            <span itemprop="author" itemscope itemtype="https://schema.org/Person">
              <span itemprop="name">${this.author}</span>
            </span>
            <time datetime="${this.date}" itemprop="datePublished">${this.formatDate(this.date)}</time>
          </div>
        </div>
      </article>
      <style>
        .article-card {
          display: flex;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: box-shadow 0.3s ease;
        }
        .article-card:hover {
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        .article-card img {
          width: 200px;
          height: 150px;
          object-fit: cover;
        }
        .content {
          padding: 16px;
          flex: 1;
        }
        .content h2 {
          margin: 0 0 8px 0;
          font-size: 1.25rem;
          color: #333;
        }
        .content p {
          margin: 0 0 16px 0;
          color: #666;
          line-height: 1.5;
        }
        .meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.875rem;
          color: #888;
        }
      </style>
    `;
  }

  addStructuredData() {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": this.title,
      "description": this.description,
      "author": {
        "@type": "Person",
        "name": this.author
      },
      "datePublished": this.date,
      "image": this.image,
      "url": this.url
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }

  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Getter properties
  get title() { return this.getAttribute('title') || ''; }
  get description() { return this.getAttribute('description') || ''; }
  get author() { return this.getAttribute('author') || ''; }
  get date() { return this.getAttribute('date') || ''; }
  get image() { return this.getAttribute('image') || ''; }
  get url() { return this.getAttribute('url') || ''; }
}

customElements.define('article-card', ArticleCard);
```

使用方式：
```html
<article-card 
  title="Web Components 實戰指南"
  description="深入探討 Web Components 在企業級專案中的應用"
  author="張小明"
  date="2025-01-15"
  image="/images/web-components.jpg"
  url="/articles/web-components-guide">
</article-card>
```

## 3. 實戰元件二：高性能模態框

```javascript
// ui/ModalDialog.js
import { BaseElement } from '../base/BaseElement.js';

export class ModalDialog extends BaseElement {
  static get observedAttributes() {
    return ['open', 'title', 'size'];
  }

  constructor() {
    super();
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleBackdropClick = this.handleBackdropClick.bind(this);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1000;
        }
        
        :host([open]) {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .backdrop {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          animation: fadeIn 0.3s ease;
        }
        
        .modal {
          background: white;
          border-radius: 8px;
          max-width: 90vw;
          max-height: 90vh;
          overflow: auto;
          position: relative;
          animation: slideIn 0.3s ease;
        }
        
        .modal.size-small { width: 400px; }
        .modal.size-medium { width: 600px; }
        .modal.size-large { width: 800px; }
        
        .header {
          padding: 20px 24px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .title {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0;
        }
        
        .close-btn {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          padding: 4px;
          color: #666;
        }
        
        .content {
          padding: 20px 24px 24px;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: scale(0.9) translateY(-10px);
          }
          to { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      </style>
      
      <div class="backdrop"></div>
      <div class="modal size-${this.size}">
        <div class="header">
          <h2 class="title">${this.title}</h2>
          <button class="close-btn" aria-label="關閉">&times;</button>
        </div>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    this.$('.close-btn').addEventListener('click', () => this.close());
    this.$('.backdrop').addEventListener('click', this.handleBackdropClick);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this._isConnected) return;

    if (name === 'open') {
      if (newValue !== null) {
        this.show();
      } else {
        this.hide();
      }
    } else if (name === 'title') {
      const titleEl = this.$('.title');
      if (titleEl) titleEl.textContent = newValue || '';
    } else if (name === 'size') {
      const modal = this.$('.modal');
      if (modal) {
        modal.className = `modal size-${this.size}`;
      }
    }
  }

  show() {
    document.addEventListener('keydown', this.handleKeydown);
    document.body.style.overflow = 'hidden';
    this.emit('modal-open');
  }

  hide() {
    document.removeEventListener('keydown', this.handleKeydown);
    document.body.style.overflow = '';
    this.emit('modal-close');
  }

  open() {
    this.setAttribute('open', '');
  }

  close() {
    this.removeAttribute('open');
  }

  handleKeydown(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      this.close();
    }
  }

  cleanup() {
    document.removeEventListener('keydown', this.handleKeydown);
    document.body.style.overflow = '';
  }

  get title() { return this.getAttribute('title') || ''; }
  get size() { return this.getAttribute('size') || 'medium'; }
}

customElements.define('modal-dialog', ModalDialog);
```

## 4. 與現有框架整合

### 4.1 React 整合

```jsx
// React wrapper for Web Components
import React, { useRef, useEffect } from 'react';

function WebComponentWrapper({ tag, children, ...props }) {
  const ref = useRef();

  useEffect(() => {
    const element = ref.current;
    
    // 設置屬性
    Object.keys(props).forEach(key => {
      if (key.startsWith('on') && typeof props[key] === 'function') {
        // 處理事件
        const eventName = key.slice(2).toLowerCase();
        element.addEventListener(eventName, props[key]);
        return () => element.removeEventListener(eventName, props[key]);
      } else {
        // 設置屬性
        element.setAttribute(key, props[key]);
      }
    });
  }, [props]);

  return React.createElement(tag, { ref }, children);
}

// 使用範例
function App() {
  return (
    <WebComponentWrapper
      tag="modal-dialog"
      title="確認刪除"
      size="small"
      open={isOpen}
      onModalClose={() => setIsOpen(false)}
    >
      <p>確定要刪除這個項目嗎？</p>
    </WebComponentWrapper>
  );
}
```

### 4.2 Vue 整合

```vue
<template>
  <modal-dialog 
    :title="title"
    :open="isOpen"
    @modal-close="handleClose"
  >
    <slot></slot>
  </modal-dialog>
</template>

<script>
export default {
  name: 'ModalWrapper',
  props: ['title', 'isOpen'],
  emits: ['close'],
  methods: {
    handleClose() {
      this.$emit('close');
    }
  }
}
</script>
```

## 5. 性能優化與 Core Web Vitals

### 5.1 延遲載入策略

```javascript
// 元件延遲註冊
class LazyLoader {
  static async loadComponent(name, path) {
    if (!customElements.get(name)) {
      await import(path);
    }
  }

  static setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const componentName = element.tagName.toLowerCase();
          
          // 根據元件名稱動態載入
          this.loadComponent(componentName, `/components/${componentName}.js`);
          observer.unobserve(element);
        }
      });
    });

    // 監控尚未定義的自定義元素
    document.querySelectorAll(':not(:defined)').forEach(el => {
      observer.observe(el);
    });
  }
}
```

### 5.2 記憶體管理

```javascript
export class MemoryEfficientElement extends BaseElement {
  constructor() {
    super();
    this._listeners = new Map();
    this._timeouts = new Set();
    this._intervals = new Set();
  }

  addEventListener(type, listener, options) {
    super.addEventListener(type, listener, options);
    this._listeners.set(listener, { type, options });
  }

  setTimeout(callback, delay) {
    const id = setTimeout(() => {
      callback();
      this._timeouts.delete(id);
    }, delay);
    this._timeouts.add(id);
    return id;
  }

  setInterval(callback, interval) {
    const id = setInterval(callback, interval);
    this._intervals.add(id);
    return id;
  }

  cleanup() {
    // 清理事件監聽器
    this._listeners.forEach((config, listener) => {
      this.removeEventListener(config.type, listener, config.options);
    });
    this._listeners.clear();

    // 清理定時器
    this._timeouts.forEach(id => clearTimeout(id));
    this._timeouts.clear();
    
    this._intervals.forEach(id => clearInterval(id));
    this._intervals.clear();
  }
}
```

## 6. 測試策略

### 6.1 單元測試

```javascript
// 使用 Jest 和 jsdom 測試
import { ModalDialog } from '../ui/ModalDialog.js';

describe('ModalDialog', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('should open and close modal', async () => {
    const modal = document.createElement('modal-dialog');
    modal.setAttribute('title', 'Test Modal');
    document.body.appendChild(modal);

    // 測試開啟
    modal.open();
    expect(modal.hasAttribute('open')).toBe(true);

    // 測試關閉
    modal.close();
    expect(modal.hasAttribute('open')).toBe(false);
  });

  test('should emit events', (done) => {
    const modal = document.createElement('modal-dialog');
    document.body.appendChild(modal);

    modal.addEventListener('modal-open', (e) => {
      expect(e.type).toBe('modal-open');
      done();
    });

    modal.open();
  });
});
```

### 6.2 視覺測試

```javascript
// 使用 Playwright 進行 E2E 測試
import { test, expect } from '@playwright/test';

test('modal dialog visual test', async ({ page }) => {
  await page.goto('/test-modal.html');
  
  const modal = page.locator('modal-dialog');
  await modal.evaluate(el => el.open());
  
  // 視覺回歸測試
  await expect(page).toHaveScreenshot('modal-open.png');
  
  // 測試互動
  await page.click('[data-testid="close-button"]');
  await expect(modal).not.toHaveAttribute('open');
});
```

## 7. 發布與版本管理

### 7.1 NPM 套件結構

```json
{
  "name": "@company/web-components",
  "version": "1.0.0",
  "type": "module",
  "main": "dist/index.js",
  "module": "src/index.js",
  "files": ["dist", "src"],
  "exports": {
    ".": {
      "import": "./src/index.js",
      "require": "./dist/index.cjs"
    },
    "./components/*": "./src/components/*"
  },
  "scripts": {
    "build": "rollup -c",
    "test": "jest",
    "storybook": "start-storybook"
  }
}
```

### 7.2 文檔生成

```javascript
// 自動生成元件文檔
class DocumentationGenerator {
  static generateDocs(componentClass) {
    const docs = {
      name: componentClass.name,
      attributes: componentClass.observedAttributes || [],
      events: this.extractEvents(componentClass),
      slots: this.extractSlots(componentClass),
      cssProperties: this.extractCSSProperties(componentClass)
    };
    
    return docs;
  }

  static extractEvents(componentClass) {
    // 分析程式碼，提取 dispatchEvent 呼叫
    const source = componentClass.toString();
    const eventMatches = source.match(/dispatchEvent.*?new CustomEvent\(['"`]([^'"`]+)/g);
    return eventMatches ? eventMatches.map(match => 
      match.match(/['"`]([^'"`]+)/)[1]
    ) : [];
  }
}
```

## 8. 總結

Web Components 在企業級應用中具有巨大潛力：

### 8.1 適用場景
- **設計系統**：跨團隊、跨專案的統一 UI 元件
- **微前端**：獨立部署的功能模組
- **第三方整合**：嵌入式 Widget 和工具
- **漸進式現代化**：逐步重構舊系統

### 8.2 成功關鍵因素
1. **良好的架構設計**：基礎類別、統一規範
2. **性能優化**：延遲載入、記憶體管理
3. **測試覆蓋**：單元測試、視覺測試、E2E 測試
4. **文檔完善**：API 文檔、使用範例、最佳實踐

### 8.3 未來展望
隨著瀏覽器支援度提升和生態系統成熟，Web Components 將成為前端開發的重要選擇，特別是在需要跨框架相容性和長期維護的企業環境中。

開始嘗試將你的下一個專案組件重構為 Web Components，體驗「一次編寫，處處運行」的開發效率！
