import{_ as n,c as h,m as i,a as s,J as p,w as k,V as l,E as t,o as e}from"./chunks/framework.CiAxhH1b.js";const _=JSON.parse('{"title":"Heap Sort(堆積排序法)","description":"","frontmatter":{},"headers":[],"relativePath":"python/112全國技藝競賽筆記/04-排序/堆積排序法.md","filePath":"python/112全國技藝競賽筆記/04-排序/堆積排序法.md","lastUpdated":1729437298000}'),r={name:"python/112全國技藝競賽筆記/04-排序/堆積排序法.md"},d=i("h1",{id:"heap-sort-堆積排序法",tabindex:"-1"},[s("Heap Sort(堆積排序法) "),i("a",{class:"header-anchor",href:"#heap-sort-堆積排序法","aria-label":'Permalink to "Heap Sort(堆積排序法)"'},"​")],-1),A=l(`<h2 id="範例程式碼" tabindex="-1">範例程式碼 <a class="header-anchor" href="#範例程式碼" aria-label="Permalink to &quot;範例程式碼&quot;">​</a></h2><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">import</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> heapq</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">class</span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;"> Heap</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    def</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;"> __init__</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">self</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">):</span></span>
<span class="line"><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">        self</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">heap </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> []</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    </span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    def</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> push</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">self</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> item</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">):</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        heapq</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">heappush</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">self</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">heap</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> item</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        </span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    def</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> pop</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">self</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">):</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">        return</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> heapq</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">heappop</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">self</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">heap</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    </span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># 建立一個最小堆    </span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">minHeap </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> Heap</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># 加入一些數字</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">minHeap</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">push</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">5</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> </span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">minHeap</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">push</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">3</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">minHeap</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">push</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">7</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> </span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">minHeap</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">push</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># 輸出最小值 1</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">print</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">minHeap</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">pop</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">())</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># 輸出最小值 3</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">print</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">minHeap</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">pop</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">())</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># 輸出最小值 5</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">print</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">minHeap</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">pop</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">())</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># 輸出最小值 7</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">print</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">minHeap</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">pop</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">())</span></span></code></pre></div>`,2);function y(g,D,E,c,o,B){const a=t("VPNolebaseInlineLinkPreview");return e(),h("div",null,[d,i("p",null,[s("也可以使用"),p(a,{href:"./../05-佇列queue/"},{default:k(()=>[s("優先佇列")]),_:1}),s("，但是會更慢，因為是用堆積來排序，所以會比較慢。")]),A])}const m=n(r,[["render",y]]);export{_ as __pageData,m as default};
