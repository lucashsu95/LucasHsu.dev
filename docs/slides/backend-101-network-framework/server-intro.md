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
    <p class="tc-lead" style="--i:3;margin-top:20px">為什麼 React 只要 build，Next.js 卻還要 start？</p>
  </div>
  <div class="tc-stage__aside" style="align-self:center;width:100%">
    <span class="tc-panel__label" style="--i:4">這一段要回答的問題</span>
    <div class="tc-rows">
      <div class="tc-rowline tc-rowline--auto" style="--i:5"><b>伺服器是什麼</b><span class="tc-rowline__n" style="justify-self:end">一直開著的程式</span></div>
      <div class="tc-rowline tc-rowline--auto" style="--i:6"><b>靜態 vs SSR</b><span class="tc-rowline__n" style="justify-self:end">誰來組出 HTML</span></div>
      <div class="tc-rowline tc-rowline--auto" style="--i:7"><b>build 與 start</b><span class="tc-rowline__n" style="justify-self:end">跑完就結束 vs 一直跑</span></div>
    </div>
  </div>
</div>
<div class="tc-grain"></div>

<!--
開場先丟問題，不急著回答。
問台下：做過 React 的人，部署時是不是只把 dist 資料夾丟上去？那 Next.js 為什麼不行？
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
    <div v-click class="sv-card">
      <div class="sv-card__t">它是「程式」，不是神秘機器</div>
      <div class="sv-card__b">一個 process，開機後掛在背景，綁定一個 port，有人敲門就回應。</div>
    </div>
    <div v-click class="sv-card">
      <div class="sv-card__t">它的特徵是「不會自己結束」</div>
      <div class="sv-card__b">普通指令跑完就退出，伺服器不會。這個差別等一下是關鍵。</div>
    </div>
  </div>
</div>

---
layout: default
---

<div class="tc-head">
  <div class="tc-kicker">01 · React 靜態網站</div>
  <h1 class="tc-h1">build 一次，產出一包檔案，之後只是「遞檔案」</h1>
</div>

<div class="sv">
  <div class="sv-flow">
    <div class="sv-node sv-node--files">
      <div class="sv-node__t">dist/</div>
      <div class="sv-files">
        <span class="sv-file">index.html</span>
        <span class="sv-file">app.js</span>
        <span class="sv-file">app.css</span>
      </div>
    </div>
    <div class="sv-track sv-track--files">
      <span class="sv-lbl sv-lbl--up">原封不動地送出</span>
      <i class="sv-packet sv-packet--file"></i>
      <i class="sv-packet sv-packet--file sv-d1"></i>
      <i class="sv-packet sv-packet--file sv-d2"></i>
    </div>
    <div class="sv-node sv-node--run">
      <div class="sv-node__t">瀏覽器</div>
      <div class="sv-node__s sv-gears">自己執行 app.js，自己畫畫面</div>
    </div>
  </div>

  <div class="sv-cols">
    <div v-click class="sv-card">
      <div class="sv-card__t">誰組出畫面？瀏覽器</div>
      <div class="sv-card__b">拿到的 HTML 幾乎是空殼，只有一個 root 節點，畫面是 JS 在你的電腦上長出來的（CSR）。</div>
    </div>
    <div v-click class="sv-card">
      <div class="sv-card__t">所以伺服器上不需要 Node</div>
      <div class="sv-card__b">Nginx、S3、GitHub Pages 這類「只會遞檔案」的主機就夠了。沒有程式要常駐，當然不用 start。</div>
    </div>
  </div>
</div>

---
layout: default
---

<div class="tc-head">
  <div class="tc-kicker">02 · Next.js SSR</div>
  <h1 class="tc-h1">每次有人來問，伺服器現場把頁面「煮好」再端出去</h1>
</div>

<div class="sv">
  <div class="sv-flow sv-flow--3">
    <div class="sv-node">
      <div class="sv-node__t">瀏覽器</div>
      <div class="sv-node__s">只負責顯示</div>
    </div>
    <div class="sv-track">
      <i class="sv-packet"></i>
      <i class="sv-packet sv-packet--back"></i>
    </div>
    <div class="sv-node sv-node--live sv-node--accent">
      <div class="sv-node__t">Node 伺服器</div>
      <div class="sv-node__s"><i class="sv-dot"></i>next start :3000</div>
      <div class="sv-node__s sv-cook">執行 React，組出 HTML</div>
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
    <div v-click class="sv-step"><b>1</b><span>瀏覽器請求 <code>/products</code></span></div>
    <div v-click class="sv-step"><b>2</b><span>伺服器現場查資料，跑一遍 React 元件</span></div>
    <div v-click class="sv-step"><b>3</b><span>回傳「已經填好內容」的完整 HTML，瀏覽器一收到就能看</span></div>
  </div>

  <div v-click class="tc-note tc-note--warn" style="margin-top:14px">
    <div class="tc-note__t">要跑 React，就得有人在伺服器上執行它</div>
    <div class="tc-note__b">這個「人」就是常駐的 Node process，所以前端專案也需要 <code>npm start</code>。</div>
  </div>
</div>

---
layout: default
---

<div class="tc-head">
  <div class="tc-kicker">03 · 對照</div>
  <h1 class="tc-h1">差別只有一句話：伺服器上有沒有程式在跑</h1>
</div>

<div class="sv">
  <div class="sv-vs">
    <div class="sv-vs__h"></div>
    <div class="sv-vs__h sv-vs__h--a">React 靜態（CSR）</div>
    <div class="sv-vs__h sv-vs__h--b">Next.js（SSR）</div>

    <div v-click class="sv-vs__k">誰組出 HTML</div>
    <div v-click class="sv-vs__v">瀏覽器，執行 JS 後</div>
    <div v-click class="sv-vs__v">伺服器，每次請求時</div>

    <div v-click class="sv-vs__k">伺服器要跑什麼</div>
    <div v-click class="sv-vs__v">什麼都不用，遞檔案</div>
    <div v-click class="sv-vs__v">Node process 常駐</div>

    <div v-click class="sv-vs__k">部署到哪</div>
    <div v-click class="sv-vs__v">Nginx、S3、GitHub Pages</div>
    <div v-click class="sv-vs__v">VM、容器、Vercel 這類能跑 Node 的地方</div>

    <div v-click class="sv-vs__k">首屏與 SEO</div>
    <div v-click class="sv-vs__v">先看到空白，再等 JS</div>
    <div v-click class="sv-vs__v">一收到就有內容，爬蟲也讀得到</div>

    <div v-click class="sv-vs__k">代價</div>
    <div v-click class="sv-vs__v">幾乎沒有，便宜好維運</div>
    <div v-click class="sv-vs__v">要養伺服器，流量大要擴充</div>
  </div>
</div>



---
layout: default
---

<div class="tc-head">
  <div class="tc-kicker">04 · build 與 start</div>
  <h1 class="tc-h1">兩個指令的本質：跑完就結束，和一直跑</h1>
</div>

<div class="sv">
  <div class="sv-term">

```bash {1-2|4-6|all}
# 靜態 React（Vite）
npm run build      # 打包完就結束，產出 dist/，丟給任何靜態主機

# Next.js
npm run build      # 先編譯，產出 .next/，一樣跑完就結束
npm start          # 啟動 Node 伺服器，監聽 3000，不會自己結束
```

  </div>

  <div class="sv-cols">
    <div v-click class="sv-card">
      <div class="sv-card__t">build 是「備料」</div>
      <div class="sv-card__b">編譯、壓縮、打包。通常在 CI 做一次，兩種專案都需要。</div>
    </div>
    <div v-click class="sv-card sv-card--b">
      <div class="sv-card__t">start 是「開店」</div>
      <div class="sv-card__b">只有需要伺服器的專案才有。它要一直開著，才有人可以來問。</div>
    </div>
  </div>

  <div v-click class="tc-note tc-note--accent" style="margin-top:14px">
    <div class="tc-note__t">小提醒：是 <code>npm run build</code>，不是 <code>npm build</code></div>
    <div class="tc-note__b"><code>npm start</code> 是特例，可以省略 run。<code>npm build</code> 則是另一個內建指令，並不會執行你的打包。</div>
  </div>
</div>

---
layout: default
---

<div class="tc-head">
  <div class="tc-kicker">05 · 小結與銜接</div>
  <h1 class="tc-h1">前端工具也長出了後端，所以我們來看後端</h1>
</div>

<div class="sv">
  <div class="sv-cols">
    <div v-click class="sv-card">
      <div class="sv-card__t">Next.js 也能變回靜態</div>
      <div class="sv-card__b">設定 <code>output: 'export'</code> 後 build 會產出純檔案，就不需要 start。判斷標準永遠是：請求進來時，有沒有程式要現場執行。</div>
    </div>
    <div v-click class="sv-card sv-card--b">
      <div class="sv-card__t">一旦要現場執行，就是後端的事</div>
      <div class="sv-card__b">監聽 port、處理請求、回傳狀態碼、連資料庫，這正是接下來 50 分鐘的內容。</div>
    </div>
  </div>

  <div v-click class="sv-flow sv-flow--end">
    <div class="sv-node"><div class="sv-node__t">伺服器是什麼</div></div>
    <div class="sv-track"><i class="sv-packet"></i></div>
    <div class="sv-node sv-node--live"><div class="sv-node__t">網路怎麼運作</div><div class="sv-node__s"><i class="sv-dot"></i>下一段</div></div>
  </div>
</div>

<!--
銜接：Next.js 的 SSR 本質上就是在伺服器上跑程式，所以前端工程師其實也在碰後端的概念。
接著進入 AGENDA，從網路怎麼運作開始。
-->

