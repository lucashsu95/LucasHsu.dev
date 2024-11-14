import{_ as n,c as e,J as i,V as l,E as s,o as h}from"./chunks/framework.RK-3fdBv.js";const A=JSON.parse('{"title":"JavaScript - 四捨五入","description":"","frontmatter":{"head":[["meta",{"name":"author","content":"許恩綸"}],["meta",{"name":"keywords","content":"js,javascript,四捨五入,round,toFixed"}],["meta",{"name":"og:title","content":"在javascript中使用四捨五入"}],["meta",{"name":"og:description","content":"使用 Math.round 和 toFixed 四捨五入"}],["meta",{"name":"og:type","content":"article"}]]},"headers":[],"relativePath":"javascript/functions/rounding.md","filePath":"javascript/functions/rounding.md","lastUpdated":1730345341000}'),p={name:"javascript/functions/rounding.md"},o=l(`<h1 id="javascript-四捨五入" tabindex="-1">JavaScript - 四捨五入 <a class="header-anchor" href="#javascript-四捨五入" aria-label="Permalink to &quot;JavaScript - 四捨五入&quot;">​</a></h1><ul><li><code>Math.round(x)</code>: 將數字 x 四捨五入到最接近的整數。</li><li><code>x.toFixed(n)</code>: 將數字 x 四捨五入到小數點後 n 位。</li><li></li></ul><h2 id="範例" tabindex="-1">範例 <a class="header-anchor" href="#範例" aria-label="Permalink to &quot;範例&quot;">​</a></h2><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">// 四捨五入到最接近的整數</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">let</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> num1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 3.14</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">let</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> roundedNum1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> Math</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">round</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">num1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> // roundedNum1 會是 3</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">// 四捨五入到小數點後 2 位</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">let</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> num2</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 123.45678</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">let</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> roundedNum2</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> num2</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">toFixed</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">2</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> // roundedNum2 會是 &quot;123.46&quot; (注意：回傳的是字串)</span></span></code></pre></div><h2 id="選擇適合的函式" tabindex="-1">選擇適合的函式： <a class="header-anchor" href="#選擇適合的函式" aria-label="Permalink to &quot;選擇適合的函式：&quot;">​</a></h2><ul><li><code>Math.round</code>: 當你只需要將數字四捨五入到最接近的整數時使用。</li><li><code>toFixed</code>: 當你需要將數字四捨五入到特定的小數位數時使用。 注意事項：</li><li><code>toFixed</code> 回傳的是字串: 如果需要進行進一步的數學運算，請將結果轉換回數字型態，例如：Number(roundedNum2)。</li><li>浮點數精度: JavaScript 的浮點數運算可能會有精度問題，對於高精度的計算，建議使用專門的數學庫。 其他相關函式：</li><li><code>Math.floor(x)</code>: 無條件捨去，返回小於等於 x 的最大整數。</li><li><code>Math.ceil(x)</code>: 無條件進位，返回大於等於 x 的最小整數。</li></ul>`,6);function r(d,k,c,u,g,m){const a=s("NolebaseGitContributors"),t=s("NolebaseGitChangelog");return h(),e("div",null,[o,i(a),i(t)])}const _=n(p,[["render",r]]);export{A as __pageData,_ as default};