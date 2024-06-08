import{_ as a,c as s,o as n,V as e}from"./chunks/framework.Y2m55Jsw.js";const b=JSON.parse('{"title":"python-新手上路-Day3｜字串10題","description":"","frontmatter":{},"headers":[],"relativePath":"python/新手上路系列/Day3.md","filePath":"python/新手上路系列/Day3.md","lastUpdated":1717847093000}'),p={name:"python/新手上路系列/Day3.md"},l=e(`<h1 id="python-新手上路-day3-字串10題" tabindex="-1">python-新手上路-Day3｜字串10題 <a class="header-anchor" href="#python-新手上路-day3-字串10題" aria-label="Permalink to &quot;python-新手上路-Day3｜字串10題&quot;">​</a></h1><p>先建一個資料夾創一個檔案<code>in</code>然後在創py檔<code>1.py、2.py...</code><br> 然後在cmd裡打下面的指令</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>python 1.py &lt; in</span></span></code></pre></div><p><code>in</code>這個檔案裡的文字就會導入<code>1.py</code></p><h2 id="第1題" tabindex="-1">第1題 <a class="header-anchor" href="#第1題" aria-label="Permalink to &quot;第1題&quot;">​</a></h2><p>字串長度為5, 內容只能有數字.</p><h3 id="輸入" tabindex="-1">輸入 <a class="header-anchor" href="#輸入" aria-label="Permalink to &quot;輸入&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>54345</span></span>
<span class="line"><span>42*a2</span></span></code></pre></div><h3 id="輸出" tabindex="-1">輸出 <a class="header-anchor" href="#輸出" aria-label="Permalink to &quot;輸出&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>正確</span></span>
<span class="line"><span>不正確</span></span></code></pre></div><h2 id="第2題" tabindex="-1">第2題 <a class="header-anchor" href="#第2題" aria-label="Permalink to &quot;第2題&quot;">​</a></h2><p>字串的長度是至少為2, 而且(第1碼)與(最後1碼)相同.</p><h3 id="輸入-1" tabindex="-1">輸入 <a class="header-anchor" href="#輸入-1" aria-label="Permalink to &quot;輸入&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>a5322121a</span></span>
<span class="line"><span>a12321b</span></span></code></pre></div><h3 id="輸出-1" tabindex="-1">輸出 <a class="header-anchor" href="#輸出-1" aria-label="Permalink to &quot;輸出&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>正確</span></span>
<span class="line"><span>不正確</span></span></code></pre></div><h2 id="第3題" tabindex="-1">第3題 <a class="header-anchor" href="#第3題" aria-label="Permalink to &quot;第3題&quot;">​</a></h2><p>字串長度是至少為3的奇數, 而且(第1碼)/(最後1碼)/(最中間碼) 3碼相同.</p><h3 id="輸入-2" tabindex="-1">輸入 <a class="header-anchor" href="#輸入-2" aria-label="Permalink to &quot;輸入&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>a12a34a</span></span>
<span class="line"><span>B323B121B</span></span>
<span class="line"><span>B323B121C</span></span></code></pre></div><h3 id="輸出-2" tabindex="-1">輸出 <a class="header-anchor" href="#輸出-2" aria-label="Permalink to &quot;輸出&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>正確</span></span>
<span class="line"><span>正確</span></span>
<span class="line"><span>不正確</span></span></code></pre></div><h2 id="第4題" tabindex="-1">第4題 <a class="header-anchor" href="#第4題" aria-label="Permalink to &quot;第4題&quot;">​</a></h2><p>字串長度為5, 內容只能有數字及小數點.</p><p>字串內容可以沒有小數點, 但如果內容有小數點, 只能有1個, 而且小數點之後一定要有其他數字.</p><h3 id="輸入-3" tabindex="-1">輸入 <a class="header-anchor" href="#輸入-3" aria-label="Permalink to &quot;輸入&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>54221</span></span>
<span class="line"><span>543.1</span></span>
<span class="line"><span>1</span></span>
<span class="line"><span>5.3.1</span></span>
<span class="line"><span>1.1*9</span></span>
<span class="line"><span>1.1A7</span></span></code></pre></div><h3 id="輸出-3" tabindex="-1">輸出 <a class="header-anchor" href="#輸出-3" aria-label="Permalink to &quot;輸出&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>正確</span></span>
<span class="line"><span>正確</span></span>
<span class="line"><span>不正確</span></span>
<span class="line"><span>不正確</span></span>
<span class="line"><span>不正確</span></span>
<span class="line"><span>不正確</span></span></code></pre></div><h2 id="第5題" tabindex="-1">第5題 <a class="header-anchor" href="#第5題" aria-label="Permalink to &quot;第5題&quot;">​</a></h2><p>字串長度至少為5, 內容只能有數字及小數點.</p><p>字串內容可以沒有小數點, 但如果內容有小數點, 只能有1個, 而且小數點之後一定要有其他數字.</p><h3 id="輸入-4" tabindex="-1">輸入 <a class="header-anchor" href="#輸入-4" aria-label="Permalink to &quot;輸入&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>553452341123</span></span>
<span class="line"><span>32143</span></span>
<span class="line"><span>5321.32123</span></span>
<span class="line"><span>5123.322.1</span></span>
<span class="line"><span>1</span></span></code></pre></div><h3 id="輸出-4" tabindex="-1">輸出 <a class="header-anchor" href="#輸出-4" aria-label="Permalink to &quot;輸出&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>正確</span></span>
<span class="line"><span>正確</span></span>
<span class="line"><span>正確</span></span>
<span class="line"><span>不正確</span></span>
<span class="line"><span>不正確</span></span></code></pre></div><h2 id="第6題" tabindex="-1">第6題 <a class="header-anchor" href="#第6題" aria-label="Permalink to &quot;第6題&quot;">​</a></h2><p>字串長度為5, 除了第1碼外, 每一碼都比前一碼的值大.</p><h3 id="輸入-5" tabindex="-1">輸入 <a class="header-anchor" href="#輸入-5" aria-label="Permalink to &quot;輸入&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>13478</span></span>
<span class="line"><span>abekm</span></span>
<span class="line"><span>24538</span></span></code></pre></div><h3 id="輸出-5" tabindex="-1">輸出 <a class="header-anchor" href="#輸出-5" aria-label="Permalink to &quot;輸出&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>正確</span></span>
<span class="line"><span>正確</span></span>
<span class="line"><span>不正確</span></span></code></pre></div><h2 id="第7題" tabindex="-1">第7題 <a class="header-anchor" href="#第7題" aria-label="Permalink to &quot;第7題&quot;">​</a></h2><p>字串長度為至少為2, 除了第1碼外, 每一碼都大於或等於前一碼.</p><h3 id="輸入-6" tabindex="-1">輸入 <a class="header-anchor" href="#輸入-6" aria-label="Permalink to &quot;輸入&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>111222336666778</span></span>
<span class="line"><span>aaaeeegggkkm</span></span>
<span class="line"><span>dddeeeaaa</span></span></code></pre></div><h3 id="輸出-6" tabindex="-1">輸出 <a class="header-anchor" href="#輸出-6" aria-label="Permalink to &quot;輸出&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>正確</span></span>
<span class="line"><span>正確</span></span>
<span class="line"><span>不正確</span></span></code></pre></div><h2 id="第8題" tabindex="-1">第8題 <a class="header-anchor" href="#第8題" aria-label="Permalink to &quot;第8題&quot;">​</a></h2><p>字串長度為至少為2, 除了第1碼外, 每一碼都大於或等於前一碼;</p><p>但若有某一碼的值小於前一碼, 那麼其後的每一碼都小於或等於前一碼.</p><h3 id="輸入-7" tabindex="-1">輸入 <a class="header-anchor" href="#輸入-7" aria-label="Permalink to &quot;輸入&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>11112222233333</span></span>
<span class="line"><span>111122224444666444433331111</span></span>
<span class="line"><span>111222233332222111144444</span></span>
<span class="line"><span>4444333322221111</span></span></code></pre></div><h3 id="輸出-7" tabindex="-1">輸出 <a class="header-anchor" href="#輸出-7" aria-label="Permalink to &quot;輸出&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>正確</span></span>
<span class="line"><span>正確</span></span>
<span class="line"><span>不正確</span></span>
<span class="line"><span>正確</span></span></code></pre></div><h2 id="第9題" tabindex="-1">第9題 <a class="header-anchor" href="#第9題" aria-label="Permalink to &quot;第9題&quot;">​</a></h2><p>字串內容至少有6碼, 其內容只有數字及小括號.</p><p>其中包括至少一組小括號,</p><p>由左向右逐字查看輸入的字串, 如果查到1個右括號, 那麼在它之前應該至少有一個左括號.</p><p>字串中的左括號及右括號個數相同.</p><h3 id="輸入-8" tabindex="-1">輸入 <a class="header-anchor" href="#輸入-8" aria-label="Permalink to &quot;輸入&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>(123)453</span></span>
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
<span class="line"><span>不正確</span></span></code></pre></div><h2 id="第10題" tabindex="-1">第10題 <a class="header-anchor" href="#第10題" aria-label="Permalink to &quot;第10題&quot;">​</a></h2><p>字串長度至少有3碼, 其內容只有數字及加減乘除4個運算符號.</p><p>判斷字串內容是否為一個正確的計算式(假設運算數字都是正整數).</p><h3 id="輸入-9" tabindex="-1">輸入 <a class="header-anchor" href="#輸入-9" aria-label="Permalink to &quot;輸入&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>5+3-44+2</span></span>
<span class="line"><span>54+32-11*3</span></span>
<span class="line"><span>42*/3+2</span></span>
<span class="line"><span>*9-3+-3</span></span>
<span class="line"><span>-32+4</span></span></code></pre></div><h3 id="輸出-9" tabindex="-1">輸出 <a class="header-anchor" href="#輸出-9" aria-label="Permalink to &quot;輸出&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>正確</span></span>
<span class="line"><span>正確</span></span>
<span class="line"><span>不正確</span></span>
<span class="line"><span>不正確</span></span>
<span class="line"><span>不正確</span></span></code></pre></div><hr><p><a href="./字串10題ans.html">看答案</a></p>`,73),i=[l];function t(c,o,d,h,r,v){return n(),s("div",null,i)}const k=a(p,[["render",t]]);export{b as __pageData,k as default};
