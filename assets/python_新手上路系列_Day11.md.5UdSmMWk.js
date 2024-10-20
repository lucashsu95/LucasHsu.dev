import{_ as e,c as l,J as s,V as i,E as a,o as t}from"./chunks/framework.RK-3fdBv.js";const m=JSON.parse('{"title":"python-新手上路-Day11 ｜ Test-3","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"python/新手上路系列/Day11.md","filePath":"python/新手上路系列/Day11.md","lastUpdated":1728553621000}'),c={name:"python/新手上路系列/Day11.md"},o=i(`<h1 id="python-新手上路-day11-test-3" tabindex="-1">python-新手上路-Day11 ｜ Test-3 <a class="header-anchor" href="#python-新手上路-day11-test-3" aria-label="Permalink to &quot;python-新手上路-Day11 ｜ Test-3&quot;">​</a></h1><h2 id="_1-暖身-最近有點冷" tabindex="-1">1. 暖身(最近有點冷) <a class="header-anchor" href="#_1-暖身-最近有點冷" aria-label="Permalink to &quot;1. 暖身(最近有點冷)&quot;">​</a></h2><p>輸入多列，字串長度至少有 3 碼, 其內容只有數字及加減乘除 4 個運算符號，判斷字串內容是 否為一個正確的計算式(假設運算數字都是正整數)。</p><p>輸入:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>5+3-44+2</span></span>
<span class="line"><span>54+32-11*3</span></span>
<span class="line"><span>42*/3+2</span></span>
<span class="line"><span>*9-3+-3</span></span>
<span class="line"><span>-32+4</span></span></code></pre></div><p>輸出:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>正確</span></span>
<span class="line"><span>正確</span></span>
<span class="line"><span>不正確</span></span>
<span class="line"><span>不正確</span></span>
<span class="line"><span>不正確</span></span></code></pre></div><h2 id="_2-怎麼又是括號" tabindex="-1">2. 怎麼又是括號 <a class="header-anchor" href="#_2-怎麼又是括號" aria-label="Permalink to &quot;2. 怎麼又是括號&quot;">​</a></h2><p>給定一個僅包含字元、、 和 的字串，確定輸入字串是否有效。<code>(</code> <code>)</code> <code>{</code> <code>}</code> <code>[</code> <code>]</code></p><p>在以下情況下，輸入字串有效：</p><ol><li>開括弧必須用相同類型的括弧閉合。</li><li>左括弧必須按正確的順序閉合。</li><li>每個右括弧都有一個相同類型的相應開括弧。</li></ol><p>如果合法就輸出&quot;T&quot; 不合法&quot;F&quot;</p><p>輸入 1:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>()</span></span>
<span class="line"><span>()[]{}</span></span>
<span class="line"><span>(]</span></span>
<span class="line"><span>[()}</span></span>
<span class="line"><span>))((</span></span>
<span class="line"><span>{()})</span></span>
<span class="line"><span>[}</span></span>
<span class="line"><span>[</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>(){())}</span></span></code></pre></div><p>輸出</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>T</span></span>
<span class="line"><span>T</span></span>
<span class="line"><span>F</span></span>
<span class="line"><span>F</span></span>
<span class="line"><span>F</span></span>
<span class="line"><span>F</span></span>
<span class="line"><span>F</span></span>
<span class="line"><span>F</span></span>
<span class="line"><span>F</span></span>
<span class="line"><span>F</span></span></code></pre></div><h2 id="_3-密碼規則" tabindex="-1">3. 密碼規則 <a class="header-anchor" href="#_3-密碼規則" aria-label="Permalink to &quot;3. 密碼規則&quot;">​</a></h2><p>輸入: 輸入一個數 n 代表接下來會有 n 行需要檢查的密碼 <br> 輸出: 輸出密碼的等級 <br> 處理: 請撰寫一程式，要求使用者輸入一個密碼（字串），檢查此密碼等級。 <br> 密碼規則如下：<br> a. 必須至少八個字元。<br> b. 包含英文字母和數字。<br> c. 有一個大寫英文字母。<br> d. 有一個特殊符號(後面這些都算)【~!@#$%^&amp;<em>()_+-</em>/&lt;&gt;,.[]/】。 <br> 如果符合四個規則輸出【Strong】，如果符合三個規則輸出【Good】，如果符合二個規則輸出 【Nice】，如果只符合一個規則輸出【Normal】，如果都不符合則輸出【Week】</p><p>輸入 1:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>39dghu#qdG</span></span>
<span class="line"><span>1122</span></span>
<span class="line"><span>GGaa55</span></span>
<span class="line"><span>77g9@1122555</span></span>
<span class="line"><span>7aaffGG</span></span>
<span class="line"><span>Accessible</span></span>
<span class="line"><span>Dfdf</span></span></code></pre></div><p>輸出 1:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>Strong</span></span>
<span class="line"><span>Week</span></span>
<span class="line"><span>Nice</span></span>
<span class="line"><span>Good</span></span>
<span class="line"><span>Nice</span></span>
<span class="line"><span>Normal</span></span>
<span class="line"><span>Week</span></span></code></pre></div><h2 id="_4-排序法" tabindex="-1">4. 排序法 <a class="header-anchor" href="#_4-排序法" aria-label="Permalink to &quot;4. 排序法&quot;">​</a></h2><p>請寫一個程式，將一個列表中的數字進行遞增排序，但不能使用內建的排序函式(<code>sort</code>、<code>sorted</code>)。</p><p>輸入:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>1 4 5 3 2</span></span></code></pre></div><p>輸出:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>1 2 3 4 5</span></span></code></pre></div><h2 id="_5-賣鴨子" tabindex="-1">5. 賣鴨子 <a class="header-anchor" href="#_5-賣鴨子" aria-label="Permalink to &quot;5. 賣鴨子&quot;">​</a></h2><p>輸入： 一正整數 n,經過 n 個村莊<br> 輸出： 接著 n 列：經過第?個村莊各賣出多少隻鴨子、剩餘多少隻鴨子 最後一列：出發時共 有多少隻鴨子 <br> 處理： 一個人趕著鴨子去每個村莊賣，每經過一個村莊賣去所趕鴨子的一半又一隻，試寫一支 程式 計算經過 n 個村莊，最後來剩 m 隻鴨子，出發時總共有多少隻鴨子。</p><p>輸入 1：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>3 2</span></span></code></pre></div><p>輸出 1：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>經過第 3 個村莊 賣 4 隻,剩 2 隻鴨</span></span>
<span class="line"><span>經過第 2 個村莊 賣 8 隻,剩 6 隻鴨</span></span>
<span class="line"><span>經過第 1 個村莊 賣 16 隻,剩 14 隻鴨</span></span>
<span class="line"><span>出發時共 30 隻</span></span></code></pre></div><p>輸入 2：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>8 3</span></span></code></pre></div><p>輸出 2：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>經過第 8 個村莊 賣 5 隻,剩 3 隻鴨</span></span>
<span class="line"><span>經過第 7 個村莊 賣 10 隻,剩 8 隻鴨</span></span>
<span class="line"><span>經過第 6 個村莊 賣 20 隻,剩 18 隻鴨</span></span>
<span class="line"><span>經過第 5 個村莊 賣 40 隻,剩 38 隻鴨</span></span>
<span class="line"><span>經過第 4 個村莊 賣 80 隻,剩 78 隻鴨</span></span>
<span class="line"><span>經過第 3 個村莊 賣 160 隻,剩 158 隻鴨</span></span>
<span class="line"><span>經過第 2 個村莊 賣 320 隻,剩 318 隻鴨</span></span>
<span class="line"><span>經過第 1 個村莊 賣 640 隻,剩 638 隻鴨</span></span>
<span class="line"><span>出發時共 1278 隻</span></span></code></pre></div><h2 id="_6-巴斯卡三角形" tabindex="-1">6. 巴斯卡三角形 <a class="header-anchor" href="#_6-巴斯卡三角形" aria-label="Permalink to &quot;6. 巴斯卡三角形&quot;">​</a></h2><p>試寫一程式印出指定大小之巴斯卡三角形 <img src="https://hackmd.io/_uploads/SyF_qIKbp.png" alt="" loading="lazy"></p><p>輸入:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>6</span></span></code></pre></div><p>輸出:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>[1]</span></span>
<span class="line"><span>[1, 1]</span></span>
<span class="line"><span>[1, 2, 1]</span></span>
<span class="line"><span>[1, 3, 3, 1]</span></span>
<span class="line"><span>[1, 4, 6, 4, 1]</span></span>
<span class="line"><span>[1, 5, 10, 10, 5, 1]</span></span></code></pre></div>`,44);function d(h,r,v,u,g,b){const n=a("NolebaseGitContributors"),p=a("NolebaseGitChangelog");return t(),l("div",null,[o,s(n),s(p)])}const y=e(c,[["render",d]]);export{m as __pageData,y as default};
