import{_ as s,c as i,o as a,V as h}from"./chunks/framework.CiAxhH1b.js";const n="/LucasHsu.dev/assets/image.CcSmR-nL.png",c=JSON.parse('{"title":"一元二次方程式的根","description":"","frontmatter":{},"headers":[],"relativePath":"python/112全國技藝競賽筆記/15-其他/一元二次方程式的根.md","filePath":"python/112全國技藝競賽筆記/15-其他/一元二次方程式的根.md","lastUpdated":1729437298000}'),k={name:"python/112全國技藝競賽筆記/15-其他/一元二次方程式的根.md"},p=h('<h1 id="一元二次方程式的根" tabindex="-1">一元二次方程式的根 <a class="header-anchor" href="#一元二次方程式的根" aria-label="Permalink to &quot;一元二次方程式的根&quot;">​</a></h1><p><img src="'+n+`" alt="Alt text" loading="lazy"></p><p>表達式「(-b +- (b^2-4ac)^(1/2))/(2a)」是求二次方程式根的公式。 這裡，「a」、「b」和「c」是二次方程式的係數。</p><p>如果你想在Python中計算表達式<code>(-b + (b**2-4*a*c) ** 0.5) / (2*a)</code>，你可以使用下面的程式碼片段：</p><h2 id="_1-求根" tabindex="-1">1. 求根 <a class="header-anchor" href="#_1-求根" aria-label="Permalink to &quot;1. 求根&quot;">​</a></h2><p>公式為</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>r1 = (-b + (b**2 - 4*a*c)**0.5) / 2*a</span></span>
<span class="line"><span>r2 = (-b - (b**2 - 4*a*c)**0.5) / 2*a</span></span>
<span class="line"><span>我們會利用 b**2 - 4ac來判斷，有三種情況：</span></span>
<span class="line"><span>1. b**2 - 4ac為正，解為兩實數根</span></span>
<span class="line"><span>2. b**2 - 4ac為0，解為一實數根</span></span>
<span class="line"><span>3. b**2 - 4ac為負，沒有實數根</span></span></code></pre></div><p>接下來我們來舉例</p><p>一元二次方程式為</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">2x</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">**</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">2</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> +</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> 5x</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> +</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 6</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">a </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 2</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">b </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 5</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">c </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 6</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">r1 </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">-</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">b </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">+</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">b</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">**</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">2</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> -</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 4</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">*</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">a</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">*</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">c</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">**</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">0.5</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> /</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 2</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">*</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">a</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">r2 </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">-</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">b </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">-</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">b</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">**</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">2</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> -</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 4</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">*</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">a</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">*</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">c</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">**</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">0.5</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> /</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 2</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">*</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">a</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">print</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">r1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">print</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">r2</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span></code></pre></div><h2 id="_2-解聯立" tabindex="-1">2. 解聯立 <a class="header-anchor" href="#_2-解聯立" aria-label="Permalink to &quot;2. 解聯立&quot;">​</a></h2><p>最簡單，有兩條方程式 會給你a、b、c、d、e、f的值</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>ax + by = e</span></span>
<span class="line"><span>cx + dy = f</span></span></code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">假設 </span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">2x</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> +</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> 3y</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 13</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">     x </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">-</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> 2y</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> -</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">4</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">a </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 2</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">b </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 3</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">c </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 1</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">d </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> -</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">2</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">e </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 13</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">f </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> -</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">4</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">x </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">d</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">*</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">e </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">-</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> b</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">*</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">f</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> /</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">a</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">*</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">d </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">-</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> c</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">*</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">b</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">y </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">f</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">*</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">a </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">-</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> c</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">*</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">e</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> /</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">a</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">*</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">d </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">-</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> c</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">*</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">b</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> #若a*d - b*c = 0，此方程式無解</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">print</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">x</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">print</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">y</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span></code></pre></div>`,14),t=[p];function l(e,d,r,y,A,g){return a(),i("div",null,t)}const C=s(k,[["render",l]]);export{c as __pageData,C as default};
