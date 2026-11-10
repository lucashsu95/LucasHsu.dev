---
layout: cover
transition: slide-left
---

<div class="tc-ambient"></div>
<div class="tc-stage">
  <div class="tc-stage__main tc-in">
    <div class="tc-kicker tc-kicker--cmd" style="--i:0">$ npm start<span class="tc-caret"></span></div>
    <h1 class="tc-display" style="--i:1;margin-top:14px">先從 <em>伺服器</em> 說起</h1>
    <div class="tc-stage__rule" style="--i:2"></div>
    <p class="tc-lead" style="--i:3;margin-top:20px">同一個網址，HTML 到底是誰組出來的？</p>
  </div>

  <div class="tc-stage__aside" style="align-self:center;width:100%">
    <span class="tc-panel__label" style="--i:4">這一段要回答的問題</span>
    <div class="tc-rows">
      <div class="tc-rowline tc-rowline--auto" style="--i:5"><b>伺服器是什麼</b><span class="tc-rowline__n" style="justify-self:end">一直開著的程式</span></div>
      <div class="tc-rowline tc-rowline--auto" style="--i:6"><b>CSR vs SSR</b><span class="tc-rowline__n" style="justify-self:end">誰來組出 HTML</span></div>
      <div class="tc-rowline tc-rowline--auto" style="--i:7"><b>build 與 start</b><span class="tc-rowline__n" style="justify-self:end">跑完就結束 vs 一直跑</span></div>
    </div>
  </div>
</div>
<div class="tc-grain"></div>

<!--
開場先丟問題，不急著回答。
問台下：打開 `/products` 時，瀏覽器拿到的是現成 HTML，還是等 JavaScript 執行後才組出來？
這一段約 6 分鐘，之後才進入「網路怎麼運作」。
-->

---
layout: default
---

<div class="tc-head">
  <div class="tc-kicker">00 · 伺服器</div>
  <h1 class="tc-h1">伺服器，就是一個一直開著、等人來問的程式</h1>
</div>

<div class="sv">
  <div class="sv-flow">
    <div class="sv-node">
      <div class="sv-node__t">瀏覽器</div>
      <div class="sv-node__s">你的手機或筆電</div>
    </div>
    <div class="sv-track">
      <span class="sv-lbl sv-lbl--up">GET /products</span>
      <i class="sv-packet"></i>
      <i class="sv-packet sv-packet--back"></i>
      <span class="sv-lbl sv-lbl--down sv-lbl--b">200 OK + 內容</span>
    </div>
    <div class="sv-node sv-node--live">
      <div class="sv-node__t">伺服器</div>
      <div class="sv-node__s"><i class="sv-dot"></i>監聽 :3000，等待中</div>
    </div>
  </div>

  <div class="sv-cols">
    <div class="sv-card">
      <div class="sv-card__t">它是「程式」，不是神秘機器</div>
      <div class="sv-card__b">一個 process，開機後掛在背景，綁定一個 port，有人敲門就回應。</div>
    </div>
    <div class="sv-card">
      <div class="sv-card__t">它的特徵是「不會自己結束」</div>
      <div class="sv-card__b">普通指令跑完就退出，伺服器不會。這個差別等一下是關鍵。</div>
    </div>
  </div>
</div>

---
layout: default
---

<div class="tc-head">
  <div class="tc-kicker">01 · CSR</div>
  <h1 class="tc-h1">瀏覽器收到檔案，再由 JavaScript 組出畫面</h1>
</div>

<div class="sv">
  <div class="sv-flow">
    <div class="sv-node sv-node--run">
      <div class="sv-node__t">瀏覽器</div>
      <div class="sv-node__s sv-gears">收到檔案，執行 JavaScript 組畫面</div>
    </div>
    <div class="sv-track sv-track--files">
      <span class="sv-lbl sv-lbl--up">原封不動地送出</span>
      <i class="sv-packet sv-packet--file"></i>
      <i class="sv-packet sv-packet--file sv-d1"></i>
      <i class="sv-packet sv-packet--file sv-d2"></i>
    </div>
    <div class="sv-node sv-node--files">
      <div class="sv-node__t">靜態主機</div>
      <div class="sv-node__s">dist/</div>
      <div class="sv-node__s">遞送 HTML、JS、CSS</div>
      <div class="sv-files">
        <span class="sv-file">index.html</span>
        <span class="sv-file">app.js</span>
        <span class="sv-file">app.css</span>
      </div>
    </div>
  </div>

  <div class="sv-cols">
    <div class="sv-card">
      <div class="sv-card__t">誰組出畫面？瀏覽器</div>
      <div class="sv-card__b">靜態主機遞送 HTML、JavaScript 和 CSS，瀏覽器執行 JavaScript 後才組出主要畫面。這種渲染方式叫 CSR。</div>
    </div>
    <div class="sv-card">
      <div class="sv-card__t">所以不需要常駐的應用伺服器</div>
      <div class="sv-card__b">如果檔案已經在 build 時產生，Nginx、S3、GitHub Pages 這類能遞送靜態檔案的主機就夠了。</div>
    </div>
  </div>
</div>

---
layout: default
---

<div class="tc-head">
  <div class="tc-kicker">02 · SSR</div>
  <h1 class="tc-h1">伺服器先組好 HTML，再回傳給瀏覽器</h1>
</div>

<div class="sv">
  <div class="sv-flow sv-flow--3">
    <div class="sv-node">
      <div class="sv-node__t">瀏覽器</div>
      <div class="sv-node__s">先顯示 HTML，再執行 JS</div>
    </div>
    <div class="sv-track">
      <i class="sv-packet"></i>
      <i class="sv-packet sv-packet--back"></i>
    </div>
    <div class="sv-node sv-node--live sv-node--accent">
      <div class="sv-node__t">應用伺服器</div>
      <div class="sv-node__s"><i class="sv-dot"></i>收到請求，開始處理</div>
      <div class="sv-node__s sv-cook">取得資料，組出 HTML</div>
    </div>
    <div class="sv-track">
      <i class="sv-packet sv-d1"></i>
      <i class="sv-packet sv-packet--back sv-d1"></i>
    </div>
    <div class="sv-node">
      <div class="sv-node__t">資料庫 / API</div>
      <div class="sv-node__s">商品、使用者</div>
    </div>
  </div>

  <div class="sv-steps">
    <div class="sv-step"><b>1</b><span>瀏覽器請求 <code>/products</code></span></div>
    <div class="sv-step"><b>2</b><span>伺服器查資料，必要時等待非同步結果</span></div>
    <div class="sv-step"><b>3</b><span>資料準備好後，組出並回傳 HTML，瀏覽器先顯示初始內容</span></div>
    <div class="sv-step"><b>4</b><span>瀏覽器載入 JavaScript，接手按鈕、表單等互動</span></div>
  </div>

</div>

---
layout: default
---

<div class="tc-head">
  <div class="tc-kicker">03 · 為什麼後端要懂</div>
  <h1 class="tc-h1">同一個 <code>/orders</code>，工作可以放在哪裡？</h1>
</div>

<div class="sv">
  <div class="sv-request">
    <div class="sv-request__head">
      <span>使用者打開訂單頁</span>
      <code>GET /orders</code>
    </div>
    <div class="sv-request__lane">
      <div class="sv-request__who">CSR</div>
      <div class="sv-request__step">靜態主機回傳程式</div>
      <span class="sv-request__arrow">→</span>
      <div class="sv-request__step">瀏覽器打 API</div>
      <span class="sv-request__arrow">→</span>
      <div class="sv-request__step">伺服器驗證、查資料</div>
    </div>
    <div class="sv-request__lane sv-request__lane--ssr">
      <div class="sv-request__who">SSR</div>
      <div class="sv-request__step">伺服器驗證、查資料</div>
      <span class="sv-request__arrow">→</span>
      <div class="sv-request__step">伺服器先回 HTML</div>
      <span class="sv-request__arrow">→</span>
      <div class="sv-request__step">瀏覽器再接手互動</div>
    </div>
  </div>

  <div class="sv-cols">
    <div class="sv-card">
      <div class="sv-card__t">請求在哪裡被處理</div>
      <div class="sv-card__b">CSR 把「第一次組畫面」交給瀏覽器。SSR 把這一步提前到伺服器，但兩者都可能呼叫同一個後端 API。</div>
    </div>
    <div class="sv-card sv-card--b">
      <div class="sv-card__t">為什麼有些服務需要常駐</div>
      <div class="sv-card__b">只遞送檔案的主機可以在 build 後結束。要驗證請求、查資料、回應 API 的應用伺服器則必須持續運作。</div>
    </div>
  </div>

  <div class="sv-card">
    <div class="sv-card__t">前後端的責任邊界</div>
    <div class="sv-card__b">瀏覽器負責呈現與互動。驗證身分、判斷能不能看訂單、查詢資料，必須由後端決定。</div>
  </div>
</div>
