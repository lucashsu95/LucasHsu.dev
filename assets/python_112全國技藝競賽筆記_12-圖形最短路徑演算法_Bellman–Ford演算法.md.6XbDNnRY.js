import{_ as l,c as p,m as i,a as s,J as h,w as k,V as n,E as t,o as e}from"./chunks/framework.CiAxhH1b.js";const m=JSON.parse('{"title":"貝爾曼-福特演算法 Bellman–Ford 演算法","description":"","frontmatter":{},"headers":[],"relativePath":"python/112全國技藝競賽筆記/12-圖形最短路徑演算法/Bellman–Ford演算法.md","filePath":"python/112全國技藝競賽筆記/12-圖形最短路徑演算法/Bellman–Ford演算法.md","lastUpdated":1729437298000}'),d={name:"python/112全國技藝競賽筆記/12-圖形最短路徑演算法/Bellman–Ford演算法.md"},r=n('<h1 id="貝爾曼-福特演算法-bellman–ford-演算法" tabindex="-1">貝爾曼-福特演算法 Bellman–Ford 演算法 <a class="header-anchor" href="#貝爾曼-福特演算法-bellman–ford-演算法" aria-label="Permalink to &quot;貝爾曼-福特演算法 Bellman–Ford 演算法&quot;">​</a></h1><h2 id="介紹" tabindex="-1">介紹 <a class="header-anchor" href="#介紹" aria-label="Permalink to &quot;介紹&quot;">​</a></h2><p>貝爾曼-福德演算法是一種用於解決最短路徑問題的演算法，它<span class="m">可以處理包含負權重</span>邊的圖，並找到從一個起點到所有其他節點的最短路徑。這個演算法被廣泛應用於路線導航、網絡路由、金融建模等領域。以下是貝爾曼-福德演算法的主要特點和步驟：</p><p><strong>特點：</strong></p><ol><li>能夠處理包含負權重邊的圖，這使得它在實際應用中更有彈性。</li><li>能夠檢測到圖中是否存在負權重的環路（即負環路），並且在存在負環路時能夠識別出來。</li></ol><p><strong>步驟：</strong></p><ol><li>初始化：將起點到所有其他節點的距離初始化為無窮大，並將起點到自己的距離設為零。</li><li>遍歷邊：對圖中的每條邊，以迴圈方式進行遍歷。</li><li>更新距離：對於每條邊，檢查是否可以通過當前節點縮短到達其他節點的距離。如果可以，則更新到達其他節點的最短距離。</li><li>重複遍歷：重複上述步驟（遍歷邊、更新距離）<code>V-1</code> 次，其中 <code>V</code> 是圖中節點的數量。這是因為最長的最短路徑不會包含超過 <code>V-1</code> 條邊。</li><li>檢查負環路：如果在第 <code>V</code> 次遍歷後仍然可以縮短某些節點的距離，則證明圖中存在負環路。</li></ol>',7),g=i("code",null,"O(V*E)",-1),y=i("code",null,"V",-1),A=i("code",null,"E",-1),D=i("h2",{id:"學習資源",tabindex:"-1"},[s("學習資源 "),i("a",{class:"header-anchor",href:"#學習資源","aria-label":'Permalink to "學習資源"'},"​")],-1),E=n(`<h2 id="程式碼範例" tabindex="-1">程式碼範例 <a class="header-anchor" href="#程式碼範例" aria-label="Permalink to &quot;程式碼範例&quot;">​</a></h2><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">class</span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;"> Graph</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    def</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;"> __init__</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">self</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> vertices</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">):</span></span>
<span class="line"><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">        self</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">V </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> vertices</span></span>
<span class="line"><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">        self</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">graph </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> []</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    def</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> add_edge</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">self</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> u</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> v</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> w</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">):</span></span>
<span class="line"><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">        self</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">graph</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">append</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">([</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">u</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> v</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> w</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">])</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    def</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> bellman_ford</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">self</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> src</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">):</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">        # 初始化距離陣列，將源點設為0，其他點設為無限大</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        distance </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> [</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">float</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">inf</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)]</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> *</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> self</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">V</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        distance</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">src</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">]</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">        # 進行V-1次迭代，每次迭代找到更短的路徑</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">        for</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> _ </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">in</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;"> range</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">self</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">V </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">-</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">):</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">            for</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> u</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> v</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> w </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">in</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> self</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">graph</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">                if</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> distance</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">u</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">]</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> !=</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;"> float</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">inf</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> and</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> distance</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">u</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">]</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> +</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> w </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&lt;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> distance</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">v</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">]:</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">                    distance</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">v</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">]</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> distance</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">u</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">]</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> +</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> w</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">        # 檢查是否存在負權環</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">        for</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> u</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> v</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> w </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">in</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> self</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">graph</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">            if</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> distance</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">u</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">]</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> !=</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;"> float</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">inf</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> and</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> distance</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">u</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">]</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> +</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> w </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&lt;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> distance</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">v</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">]:</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">                print</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">圖中存在負權環</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">                return</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">        # 打印最短路徑</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">        for</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> i </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">in</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;"> range</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">self</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">V</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">):</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">            print</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">f</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">&quot;從源點到節點 </span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">{</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">i</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">}</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 的最短距離是 </span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">{</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">distance</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">i</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">]</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">}</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># 測試程式碼</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">if</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;"> __name__</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> ==</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">__main__</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    g </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> Graph</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">5</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    g</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">add_edge</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">0</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> -</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    g</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">add_edge</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">0</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 2</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 4</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    g</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">add_edge</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 2</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 3</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    g</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">add_edge</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 3</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 2</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    g</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">add_edge</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 4</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 2</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    g</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">add_edge</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">3</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 2</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 5</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    g</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">add_edge</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">3</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    g</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">add_edge</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">4</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 3</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> -</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">3</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    g</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">bellman_ford</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">0</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span></code></pre></div><h2 id="bellman-ford-程式碼" tabindex="-1">Bellman-Ford 程式碼 <a class="header-anchor" href="#bellman-ford-程式碼" aria-label="Permalink to &quot;Bellman-Ford 程式碼&quot;">​</a></h2><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># Bellman-Ford 程式碼範例</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">def</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> bellman_ford</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">graph</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> start</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">):</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    n </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;"> len</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">graph</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    distances </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> [</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">float</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">inf</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)]</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> *</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> n</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    distances</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">start</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">]</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    for</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> _ </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">in</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;"> range</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">n </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">-</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">):</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">        for</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> u </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">in</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;"> range</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">n</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">):</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">            for</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> v</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> weight </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">in</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;"> enumerate</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">graph</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">u</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">]):</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">                if</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> distances</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">u</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">]</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> +</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> weight </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&lt;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> distances</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">v</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">]:</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">                    distances</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">v</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">]</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> distances</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">u</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">]</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> +</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> weight</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    return</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> distances</span></span></code></pre></div><h2 id="bellman-ford-佇列優化-程式碼" tabindex="-1">Bellman-Ford 佇列優化 程式碼 <a class="header-anchor" href="#bellman-ford-佇列優化-程式碼" aria-label="Permalink to &quot;Bellman-Ford 佇列優化 程式碼&quot;">​</a></h2><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># Bellman-Ford 佇列優化 程式碼範例</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">from</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> collections </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">import</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> deque</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">def</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> bellman_ford_queue</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">graph</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> start</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">):</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    n </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;"> len</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">graph</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    distances </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> [</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">float</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">inf</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)]</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> *</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> n</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    distances</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">start</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">]</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    queue </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> deque</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">([</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">start</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">])</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    while</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> queue</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        current_node </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> queue</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">popleft</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">        for</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> neighbor</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> weight </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">in</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;"> enumerate</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">graph</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">current_node</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">]):</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">            if</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> distances</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">current_node</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">]</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> +</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> weight </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&lt;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> distances</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">neighbor</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">]:</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">                distances</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">neighbor</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">]</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> distances</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">current_node</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">]</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> +</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> weight</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">                queue</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">append</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">neighbor</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    return</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> distances</span></span></code></pre></div>`,6);function B(C,c,o,_,u,f){const a=t("VPNolebaseInlineLinkPreview");return e(),p("div",null,[r,i("p",null,[s("貝爾曼-福德演算法的複雜度是 "),g,s("，其中 "),y,s(" 是節點數量，"),A,s(" 是邊的數量。這個演算法的主要優勢是它的彈性，它可以處理各種圖形，包括存在負權重邊的情況，並識別出負環路。然而，它在某些情況下可能不如"),h(a,{href:"./Dijkstra's演算法"},{default:k(()=>[s("Dijkstra")]),_:1}),s("演算法效率高，特別是在圖比較稀疏的情況下。")]),D,i("ul",null,[i("li",null,[h(a,{href:"https://ithelp.ithome.com.tw/articles/10209748",target:"_blank",rel:"noreferrer"},{default:k(()=>[s("[演算法] 最短路徑 (Bellman-Ford 演算法)")]),_:1})]),i("li",null,[h(a,{href:"https://ithelp.ithome.com.tw/articles/10209845",target:"_blank",rel:"noreferrer"},{default:k(()=>[s("[演算法] 最短路徑 (Bellman-Ford 演算法 - 佇列優化)")]),_:1})])]),E])}const v=l(d,[["render",B]]);export{m as __pageData,v as default};
