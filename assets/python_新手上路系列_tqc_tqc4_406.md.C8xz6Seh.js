import{_ as i,c as n,J as s,V as l,E as t,o as h}from"./chunks/framework.eCHlHWUN.js";const b=JSON.parse('{"title":"TQC+ 程式語言Python 406 不定數迴圈-BMI計算","description":"","frontmatter":{},"headers":[],"relativePath":"python/新手上路系列/tqc/tqc4/406.md","filePath":"python/新手上路系列/tqc/tqc4/406.md","lastUpdated":1729442892000}'),p={name:"python/新手上路系列/tqc/tqc4/406.md"},o=l(`<h1 id="tqc-程式語言python-406-不定數迴圈-bmi計算" tabindex="-1">TQC+ 程式語言Python 406 不定數迴圈-BMI計算 <a class="header-anchor" href="#tqc-程式語言python-406-不定數迴圈-bmi計算" aria-label="Permalink to &quot;TQC+ 程式語言Python 406 不定數迴圈-BMI計算&quot;">​</a></h1><p>題目說明：請撰寫一程式，以不定數迴圈的方式輸入身高與體重，計算出BMI之後再根據以下對照表，印出BMI及相對應的BMI代表意義（State）。假設此不定數迴圈輸入-9999則會結束此迴圈。標準如下表所示：</p><blockquote><p>提示：BMI=體重(kg)/身高2(m)   BMI=體重(kg)/身高2(m)，輸出浮點數到小數點後第二位。 不需考慮男性或女性標準。</p></blockquote><p>。</p><table><thead><tr><th>BMI值</th><th>代表意義</th></tr></thead><tbody><tr><td>BMI &lt; 18.5</td><td>under weight</td></tr><tr><td>18.5 &lt;= BMI &lt; 25</td><td>normal</td></tr><tr><td>25.0 &lt;= BMI &lt; 30</td><td>over weight</td></tr><tr><td>30 &lt;= BMI</td><td>fat</td></tr></tbody></table><h3 id="範例輸入" tabindex="-1">範例輸入 <a class="header-anchor" href="#範例輸入" aria-label="Permalink to &quot;範例輸入&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">176</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">80</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">170</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">100</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">-9999</span></span></code></pre></div><h3 id="範例輸出" tabindex="-1">範例輸出 <a class="header-anchor" href="#範例輸出" aria-label="Permalink to &quot;範例輸出&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">BMI:</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 25.83</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">State:</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> over</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> weight</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">BMI:</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 34.60</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">State:</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> fat</span></span></code></pre></div>`,9);function d(r,c,k,g,_,y){const a=t("NolebaseGitContributors"),e=t("NolebaseGitChangelog");return h(),n("div",null,[o,s(a),s(e)])}const m=i(p,[["render",d]]);export{b as __pageData,m as default};
