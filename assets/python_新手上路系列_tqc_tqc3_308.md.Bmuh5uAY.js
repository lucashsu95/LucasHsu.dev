import{_ as s,c as i,o as a,V as t}from"./chunks/framework.CiAxhH1b.js";const A=JSON.parse('{"title":"TQC+ 程式語言Python 308 迴圈位數加總","description":"","frontmatter":{},"headers":[],"relativePath":"python/新手上路系列/tqc/tqc3/308.md","filePath":"python/新手上路系列/tqc/tqc3/308.md","lastUpdated":1729437298000}'),e={name:"python/新手上路系列/tqc/tqc3/308.md"},h=t(`<h1 id="tqc-程式語言python-308-迴圈位數加總" tabindex="-1">TQC+ 程式語言Python 308 迴圈位數加總 <a class="header-anchor" href="#tqc-程式語言python-308-迴圈位數加總" aria-label="Permalink to &quot;TQC+ 程式語言Python 308 迴圈位數加總&quot;">​</a></h1><p>題目說明： 請使用迴圈敘述撰寫一程式，要求使用者輸入一個數字，此數字代表後面測試資料的數量。每一筆測試資料是一個正整數（由使用者輸入），將此正整數的每位數全部加總起來。</p><h3 id="範例輸入1" tabindex="-1">範例輸入1 <a class="header-anchor" href="#範例輸入1" aria-label="Permalink to &quot;範例輸入1&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">1</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">98765</span></span></code></pre></div><h3 id="範例輸出1" tabindex="-1">範例輸出1 <a class="header-anchor" href="#範例輸出1" aria-label="Permalink to &quot;範例輸出1&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">Sum</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> of</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> all</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> digits</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> of</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 98765</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> is</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 35</span></span></code></pre></div><h3 id="範例輸入2" tabindex="-1">範例輸入2 <a class="header-anchor" href="#範例輸入2" aria-label="Permalink to &quot;範例輸入2&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">3</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">32412</span></span></code></pre></div><h3 id="範例輸出2" tabindex="-1">範例輸出2 <a class="header-anchor" href="#範例輸出2" aria-label="Permalink to &quot;範例輸出2&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">Sum</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> of</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> all</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> digits</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> of</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 32412</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> is</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 12</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">Sum</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> of</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> all</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> digits</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> of</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> is</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">Sum</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> of</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> all</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> digits</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> of</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 769</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> is</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 22</span></span></code></pre></div>`,10),l=[h];function n(p,k,d,r,o,c){return a(),i("div",null,l)}const y=s(e,[["render",n]]);export{A as __pageData,y as default};
