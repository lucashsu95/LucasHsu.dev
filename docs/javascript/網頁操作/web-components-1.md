# Web Components 基礎篇：從零開始掌握原生元件開發

> 📝 TL;DR
- 由 Custom Elements + Shadow DOM + Templates/Slots 組成，瀏覽器原生支援。
- 元件名稱必須有連字符，Shadow DOM 提供樣式隔離，事件仍可冒泡。
- 適合封裝跨框架 UI，並可與框架共存（自定義元素就是一個 DOM 節點）。

## 前置知識
- ES6 class、繼承 `HTMLElement`
- DOM API：`attachShadow`、`querySelector`
- 基本 HTML/ARIA，可幫元件加上 `role`、`tabindex`

## 1. 什麼是 Web Components？

Web Components 是 W3C 制定的瀏覽器原生元件模型，核心目標為「封裝、重用、框架無關」。它讓開發者能夠創建可重複使用的自定義 HTML 元素，具有以下優勢：

### 1.1 主要特色

* **封裝**：HTML、CSS、JavaScript 打包成單一標籤
* **可重用**：跨專案、跨框架直接使用 `<my-button></my-button>`
* **原生支援**：現代瀏覽器無需額外框架即可執行
* **樣式隔離**：避免 CSS 衝突，不污染全域樣式

### 1.2 與框架的差異

| 特性     | Web Components | React/Vue |
| :------- | :------------- | :-------- |
| 依賴     | 瀏覽器原生     | 需要框架  |
| 體積     | 極小           | 相對較大  |
| 學習成本 | 低             | 中等      |
| 生態系統 | 發展中         | 成熟      |

## 2. 三大核心技術

Web Components 由三個核心技術組成：

### 2.1 Custom Elements（自定義元素）

允許開發者創建自定義的 HTML 標籤並在 JavaScript 中註冊。

```javascript
class HelloWorld extends HTMLElement {
  connectedCallback() {
    this.textContent = 'Hello Web Components!';
  }
}
customElements.define('hello-world', HelloWorld);
```

使用方式：
```html
<hello-world></hello-world>
```

### 2.2 Shadow DOM（影子 DOM）

提供封裝的 DOM 樹和樣式，確保元件內部不受外部影響。

```javascript
class ShadowCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({mode: 'open'});
    shadow.innerHTML = `
      <style>
        p { color: crimson; font-size: 18px; }
      </style>
      <p>這個樣式不會影響外部</p>
    `;
  }
}
customElements.define('shadow-card', ShadowCard);
```

### 2.3 HTML Templates & Slots（模板與插槽）

`<template>` 定義可重複使用的 DOM 結構，`<slot>` 允許外部內容插入。

```html
<template id="card-template">
  <style>
    .card {
      border: 1px solid #ddd;
      padding: 16px;
      border-radius: 8px;
    }
  </style>
  <div class="card">
    <h3><slot name="title">預設標題</slot></h3>
    <slot>預設內容</slot>
  </div>
</template>

<script>
class SimpleCard extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById('card-template').content.cloneNode(true);
    this.attachShadow({mode: 'open'}).appendChild(template);
  }
}
customElements.define('simple-card', SimpleCard);
</script>
```

使用方式：
```html
<simple-card>
  <span slot="title">我的標題</span>
  <p>這是卡片內容</p>
</simple-card>
```

## 3. 生命週期回調

Web Components 提供幾個重要的生命週期方法：

### 3.1 主要生命週期

| 方法                         | 觸發時機        | 用途                    |
| :--------------------------- | :-------------- | :---------------------- |
| `constructor()`              | 元素創建時      | 初始化、設置 Shadow DOM |
| `connectedCallback()`        | 元素插入 DOM 時 | 設置事件監聽、初始渲染  |
| `disconnectedCallback()`     | 元素移除時      | 清理事件監聽、資源釋放  |
| `attributeChangedCallback()` | 屬性變化時      | 響應屬性變化、重新渲染  |

### 3.2 屬性監聽範例

```javascript
class CounterElement extends HTMLElement {
  static get observedAttributes() { 
    return ['count']; 
  }

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'count') {
      this.render();
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .counter {
          font-size: 24px;
          padding: 10px;
          border: 2px solid #007bff;
          border-radius: 5px;
        }
      </style>
      <div class="counter">
        計數器: ${this.getAttribute('count') || 0}
      </div>
    `;
  }
}
customElements.define('counter-element', CounterElement);
```

## 4. 第一個完整範例：互動按鈕

讓我們創建一個具有完整功能的按鈕元件：

```javascript
class MyButton extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({mode: 'open'});
    
    shadow.innerHTML = `
      <style>
        button {
          background: #007bff;
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s;
        }
        button:hover {
          background: #0056b3;
        }
        button:disabled {
          background: #6c757d;
          cursor: not-allowed;
        }
      </style>
      <button>
        ${this.getAttribute('text') || '點擊'}
      </button>
    `;

    // 添加點擊事件
    shadow.querySelector('button').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('my-click', {
        bubbles: true,
        detail: { message: '按鈕被點擊了！' }
      }));
    });
  }

  static get observedAttributes() {
    return ['text', 'disabled'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const button = this.shadowRoot.querySelector('button');
    
    if (name === 'text') {
      button.textContent = newValue || '點擊';
    } else if (name === 'disabled') {
      button.disabled = newValue !== null;
    }
  }
}

customElements.define('my-button', MyButton);
```

使用範例：
```html
<my-button text="送出表單"></my-button>
<my-button text="取消" disabled></my-button>

<script>
document.querySelector('my-button').addEventListener('my-click', (e) => {
  alert(e.detail.message);
});
</script>
```

## 5. 最佳實踐

### 5.1 命名規範
- 元素名稱必須包含連字符（如 `my-button`）
- 使用語義化的名稱
- 考慮命名空間（如 `ui-button`, `app-header`）

### 5.2 性能考量
- 在 `constructor` 中設置 Shadow DOM
- 在 `connectedCallback` 中添加事件監聽
- 在 `disconnectedCallback` 中清理資源

### 5.3 可訪問性
```javascript
constructor() {
  super();
  // 設置 ARIA 屬性
  this.setAttribute('role', 'button');
  this.setAttribute('tabindex', '0');
}
```

## 6. 小結

Web Components 提供了一種原生的方式來創建可重複使用的 UI 元件。通過掌握 Custom Elements、Shadow DOM 和 Templates/Slots，你可以構建出：

- 跨框架的通用元件庫
- 獨立的 Widget 元件
- 漸進增強的傳統網站功能

在下一篇實戰篇中，我們將探討如何在真實專案中應用 Web Components，包括與現有框架的整合、SEO 優化和性能調優等高級主題。

## 實戰練習

### 練習 1：最小元件（簡單）⭐
> 建立一個 `<hello-tag>`，渲染「Hello」並在連接時印出 console 訊息。

:::details 💡 參考答案
```javascript
class HelloTag extends HTMLElement {
  connectedCallback() {
    this.textContent = 'Hello'
    console.log('connected')
  }
}
customElements.define('hello-tag', HelloTag)
```
:::

### 練習 2：屬性監聽（簡單）⭐
> 製作 `<badge-count>`，有 `count` 屬性且會自動重新渲染。

:::details 💡 參考答案
```javascript
class BadgeCount extends HTMLElement {
  static get observedAttributes() { return ['count'] }
  connectedCallback() { this.render() }
  attributeChangedCallback() { this.render() }
  render() { this.textContent = this.getAttribute('count') || 0 }
}
customElements.define('badge-count', BadgeCount)
```
:::

### 練習 3：Slots 與樣式隔離（中等）⭐⭐
> 建立 `<card-box>`，使用 Shadow DOM，提供 `title` 插槽與主要內容插槽。

:::details 💡 參考答案與提示
```javascript
class CardBox extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.innerHTML = `
      <style>
        .card { border: 1px solid #ddd; padding: 16px; border-radius: 8px; }
        h3 { margin: 0 0 8px 0; }
      </style>
      <article class="card">
        <h3><slot name="title">預設標題</slot></h3>
        <slot></slot>
      </article>
    `
  }
}
customElements.define('card-box', CardBox)
```
:::

## 延伸閱讀
- MDN: Custom Elements / Shadow DOM / HTML Templates
- Web.dev: Web Components 基礎指南
- Lit 官方文件：若想要語法糖與更佳 DX

## FAQ
- Q: 為什麼自定義元素名稱要有連字符？
  - A: 避免與原生元素衝突，規範要求必須包含 `-`。
- Q: Shadow DOM 會影響 SEO 嗎？
  - A: 影子樹內的內容搜尋引擎可見度有限，SEO 內容建議放 Light DOM（可在實戰篇用混合策略）。
- Q: 如何在框架中使用？
  - A: 當作一般 DOM 元素引用即可；React 需確保屬性用小寫，事件用 `addEventListener`。