import{_ as l,c as i,m as t,J as a,w as o,V as c,E as s,o as d,a as h}from"./chunks/framework.RK-3fdBv.js";const f=JSON.parse('{"title":"python-新手上路-Day4 ｜字串 10 題","description":"","frontmatter":{},"headers":[],"relativePath":"python/新手上路系列/Day4.md","filePath":"python/新手上路系列/Day4.md","lastUpdated":1729448933000}'),r={name:"python/新手上路系列/Day4.md"},v=c(`<h1 id="python-新手上路-day4-字串-10-題" tabindex="-1">python-新手上路-Day4 ｜字串 10 題 <a class="header-anchor" href="#python-新手上路-day4-字串-10-題" aria-label="Permalink to &quot;python-新手上路-Day4 ｜字串 10 題&quot;">​</a></h1><p>先建一個資料夾創一個檔案<code>in</code>然後在創 py 檔<code>1.py、2.py...</code><br> 然後在 cmd 裡打下面的指令</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>python 1.py &lt; in</span></span></code></pre></div><p><code>in</code>這個檔案裡的文字就會導入<code>1.py</code></p><h2 id="第-1-題" tabindex="-1">第 1 題 <a class="header-anchor" href="#第-1-題" aria-label="Permalink to &quot;第 1 題&quot;">​</a></h2><p>字串長度為 5, 內容只能有數字.</p><h3 id="輸入" tabindex="-1">輸入 <a class="header-anchor" href="#輸入" aria-label="Permalink to &quot;輸入&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>54345</span></span>
<span class="line"><span>42*a2</span></span></code></pre></div><h3 id="輸出" tabindex="-1">輸出 <a class="header-anchor" href="#輸出" aria-label="Permalink to &quot;輸出&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>正確</span></span>
<span class="line"><span>不正確</span></span></code></pre></div><h2 id="第-2-題" tabindex="-1">第 2 題 <a class="header-anchor" href="#第-2-題" aria-label="Permalink to &quot;第 2 題&quot;">​</a></h2><p>字串的長度是至少為 2, 而且(第 1 碼)與(最後 1 碼)相同.</p><h3 id="輸入-1" tabindex="-1">輸入 <a class="header-anchor" href="#輸入-1" aria-label="Permalink to &quot;輸入&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>a5322121a</span></span>
<span class="line"><span>a12321b</span></span></code></pre></div><h3 id="輸出-1" tabindex="-1">輸出 <a class="header-anchor" href="#輸出-1" aria-label="Permalink to &quot;輸出&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>正確</span></span>
<span class="line"><span>不正確</span></span></code></pre></div><h2 id="第-3-題" tabindex="-1">第 3 題 <a class="header-anchor" href="#第-3-題" aria-label="Permalink to &quot;第 3 題&quot;">​</a></h2><p>字串長度是至少為 3 的奇數, 而且(第 1 碼)/(最後 1 碼)/(最中間碼) 3 碼相同.</p><h3 id="輸入-2" tabindex="-1">輸入 <a class="header-anchor" href="#輸入-2" aria-label="Permalink to &quot;輸入&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>a12a34a</span></span>
<span class="line"><span>B323B121B</span></span>
<span class="line"><span>B323B121C</span></span></code></pre></div><h3 id="輸出-2" tabindex="-1">輸出 <a class="header-anchor" href="#輸出-2" aria-label="Permalink to &quot;輸出&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>正確</span></span>
<span class="line"><span>正確</span></span>
<span class="line"><span>不正確</span></span></code></pre></div><h2 id="第-4-題" tabindex="-1">第 4 題 <a class="header-anchor" href="#第-4-題" aria-label="Permalink to &quot;第 4 題&quot;">​</a></h2><p>字串長度為 5, 內容只能有數字及小數點.</p><p>字串內容可以沒有小數點, 但如果內容有小數點, 只能有 1 個, 而且小數點之後一定要有其他數字.</p><h3 id="輸入-3" tabindex="-1">輸入 <a class="header-anchor" href="#輸入-3" aria-label="Permalink to &quot;輸入&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>54221</span></span>
<span class="line"><span>543.1</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>5.3.1</span></span>
<span class="line"><span>1.1*9</span></span>
<span class="line"><span>1.1A7</span></span></code></pre></div><h3 id="輸出-3" tabindex="-1">輸出 <a class="header-anchor" href="#輸出-3" aria-label="Permalink to &quot;輸出&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>正確</span></span>
<span class="line"><span>正確</span></span>
<span class="line"><span>不正確</span></span>
<span class="line"><span>不正確</span></span>
<span class="line"><span>不正確</span></span>
<span class="line"><span>不正確</span></span></code></pre></div><h2 id="第-5-題" tabindex="-1">第 5 題 <a class="header-anchor" href="#第-5-題" aria-label="Permalink to &quot;第 5 題&quot;">​</a></h2><p>字串長度至少為 5, 內容只能有數字及小數點.</p><p>字串內容可以沒有小數點, 但如果內容有小數點, 只能有 1 個, 而且小數點之後一定要有其他數字.</p><h3 id="輸入-4" tabindex="-1">輸入 <a class="header-anchor" href="#輸入-4" aria-label="Permalink to &quot;輸入&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>553452341123</span></span>
<span class="line"><span>32143</span></span>
<span class="line"><span>5321.32123</span></span>
<span class="line"><span>5123.322.1</span></span>
<span class="line"><span>1</span></span></code></pre></div><h3 id="輸出-4" tabindex="-1">輸出 <a class="header-anchor" href="#輸出-4" aria-label="Permalink to &quot;輸出&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>正確</span></span>
<span class="line"><span>正確</span></span>
<span class="line"><span>正確</span></span>
<span class="line"><span>不正確</span></span>
<span class="line"><span>不正確</span></span></code></pre></div><h2 id="第-6-題" tabindex="-1">第 6 題 <a class="header-anchor" href="#第-6-題" aria-label="Permalink to &quot;第 6 題&quot;">​</a></h2><p>字串長度為 5, 除了第 1 碼外, 每一碼都比前一碼的值大.</p><h3 id="輸入-5" tabindex="-1">輸入 <a class="header-anchor" href="#輸入-5" aria-label="Permalink to &quot;輸入&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>13478</span></span>
<span class="line"><span>abekm</span></span>
<span class="line"><span>24538</span></span></code></pre></div><h3 id="輸出-5" tabindex="-1">輸出 <a class="header-anchor" href="#輸出-5" aria-label="Permalink to &quot;輸出&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>正確</span></span>
<span class="line"><span>正確</span></span>
<span class="line"><span>不正確</span></span></code></pre></div><h2 id="第-7-題" tabindex="-1">第 7 題 <a class="header-anchor" href="#第-7-題" aria-label="Permalink to &quot;第 7 題&quot;">​</a></h2><p>字串長度為至少為 2, 除了第 1 碼外, 每一碼都大於或等於前一碼.</p><h3 id="輸入-6" tabindex="-1">輸入 <a class="header-anchor" href="#輸入-6" aria-label="Permalink to &quot;輸入&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>111222336666778</span></span>
<span class="line"><span>aaaeeegggkkm</span></span>
<span class="line"><span>dddeeeaaa</span></span></code></pre></div><h3 id="輸出-6" tabindex="-1">輸出 <a class="header-anchor" href="#輸出-6" aria-label="Permalink to &quot;輸出&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>正確</span></span>
<span class="line"><span>正確</span></span>
<span class="line"><span>不正確</span></span></code></pre></div><h2 id="第-8-題" tabindex="-1">第 8 題 <a class="header-anchor" href="#第-8-題" aria-label="Permalink to &quot;第 8 題&quot;">​</a></h2><p>字串長度為至少為 2, 除了第 1 碼外, 每一碼都大於或等於前一碼;</p><p>但若有某一碼的值小於前一碼, 那麼其後的每一碼都小於或等於前一碼.</p><h3 id="輸入-7" tabindex="-1">輸入 <a class="header-anchor" href="#輸入-7" aria-label="Permalink to &quot;輸入&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>11112222233333</span></span>
<span class="line"><span>111122224444666444433331111</span></span>
<span class="line"><span>111222233332222111144444</span></span>
<span class="line"><span>4444333322221111</span></span></code></pre></div><h3 id="輸出-7" tabindex="-1">輸出 <a class="header-anchor" href="#輸出-7" aria-label="Permalink to &quot;輸出&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>正確</span></span>
<span class="line"><span>正確</span></span>
<span class="line"><span>不正確</span></span>
<span class="line"><span>正確</span></span></code></pre></div><h2 id="第-9-題" tabindex="-1">第 9 題 <a class="header-anchor" href="#第-9-題" aria-label="Permalink to &quot;第 9 題&quot;">​</a></h2><p>字串內容至少有 6 碼, 其內容只有數字及小括號.</p><p>其中包括至少一組小括號,</p><p>由左向右逐字查看輸入的字串, 如果查到 1 個右括號, 那麼在它之前應該至少有一個左括號.</p><p>字串中的左括號及右括號個數相同.</p><h3 id="輸入-8" tabindex="-1">輸入 <a class="header-anchor" href="#輸入-8" aria-label="Permalink to &quot;輸入&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>(123)453</span></span>
<span class="line"><span>(123)(456)78</span></span>
<span class="line"><span>((123)(345))</span></span>
<span class="line"><span>()()()</span></span>
<span class="line"><span>(())()</span></span>
<span class="line"><span>(123))(456)</span></span>
<span class="line"><span>)123))(456)</span></span>
<span class="line"><span>(123))(456)(</span></span>
<span class="line"><span>(a) + (b)</span></span>
<span class="line"><span>(%)()</span></span>
<span class="line"><span>1234</span></span></code></pre></div><h3 id="輸出-8" tabindex="-1">輸出 <a class="header-anchor" href="#輸出-8" aria-label="Permalink to &quot;輸出&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>正確</span></span>
<span class="line"><span>正確</span></span>
<span class="line"><span>正確</span></span>
<span class="line"><span>正確</span></span>
<span class="line"><span>正確</span></span>
<span class="line"><span>不正確</span></span>
<span class="line"><span>不正確</span></span>
<span class="line"><span>不正確</span></span>
<span class="line"><span>不正確</span></span>
<span class="line"><span>不正確</span></span>
<span class="line"><span>不正確</span></span></code></pre></div><h2 id="第-10-題" tabindex="-1">第 10 題 <a class="header-anchor" href="#第-10-題" aria-label="Permalink to &quot;第 10 題&quot;">​</a></h2><p>字串長度至少有 3 碼, 其內容只有數字及加減乘除 4 個運算符號.</p><p>判斷字串內容是否為一個正確的計算式(假設運算數字都是正整數).</p><h3 id="輸入-9" tabindex="-1">輸入 <a class="header-anchor" href="#輸入-9" aria-label="Permalink to &quot;輸入&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>5+3-44+2</span></span>
<span class="line"><span>54+32-11*3</span></span>
<span class="line"><span>42*/3+2</span></span>
<span class="line"><span>*9-3+-3</span></span>
<span class="line"><span>-32+4</span></span></code></pre></div><h3 id="輸出-9" tabindex="-1">輸出 <a class="header-anchor" href="#輸出-9" aria-label="Permalink to &quot;輸出&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>正確</span></span>
<span class="line"><span>正確</span></span>
<span class="line"><span>不正確</span></span>
<span class="line"><span>不正確</span></span>
<span class="line"><span>不正確</span></span></code></pre></div><hr>`,72);function u(b,k,g,m,y,q){const n=s("VPNolebaseInlineLinkPreview"),e=s("NolebaseGitContributors"),p=s("NolebaseGitChangelog");return d(),i("div",null,[v,t("p",null,[a(n,{href:"./字串10題ans"},{default:o(()=>[h("看答案")]),_:1})]),a(e),a(p)])}const P=l(r,[["render",u]]);export{f as __pageData,P as default};
