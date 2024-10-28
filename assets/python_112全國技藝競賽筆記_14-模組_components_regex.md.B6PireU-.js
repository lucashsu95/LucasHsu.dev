import{_ as k,c as l,m as s,J as i,w as p,a as t,V as r,E as a,o as d}from"./chunks/framework.RK-3fdBv.js";const u=JSON.parse('{"title":"Regex 正規表達式 - Python","description":"","frontmatter":{"head":[["meta",{"name":"author","content":"許恩綸"}],["meta",{"name":"keywords","content":"python,正規表達式,regex,match,抓取"}],["meta",{"name":"og:title","content":"Regex 正規表達式 - python"}],["meta",{"name":"og:description","content":"正規表達式是被用來匹配字串中字元組合的模式。"}],["meta",{"name":"og:type","content":"article"}]]},"headers":[],"relativePath":"python/112全國技藝競賽筆記/14-模組/components/regex.md","filePath":"python/112全國技藝競賽筆記/14-模組/components/regex.md","lastUpdated":1730124585000}'),o={name:"python/112全國技藝競賽筆記/14-模組/components/regex.md"},g=s("h1",{id:"regex-正規表達式-python",tabindex:"-1"},[t("Regex 正規表達式 - Python "),s("a",{class:"header-anchor",href:"#regex-正規表達式-python","aria-label":'Permalink to "Regex 正規表達式 - Python"'},"​")],-1),y=r(`<h2 id="範例1" tabindex="-1">範例1 <a class="header-anchor" href="#範例1" aria-label="Permalink to &quot;範例1&quot;">​</a></h2><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">import</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> re</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">with</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;"> open</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">in.txt</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">r</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> as</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> f</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    lines </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> f</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">readlines</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    pattern </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> r</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#AB5E3F;--shiki-dark:#C4704F;">question:</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">\\s</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">*</span><span style="--shiki-light:#AB5E3F;--shiki-dark:#C4704F;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">[</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">^</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">&quot;]</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">+</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#AB5E3F;--shiki-dark:#C4704F;">&quot;</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    for</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> line </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">in</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> lines</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        matchs </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> re</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">findall</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">pattern</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> line</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">        with</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;"> open</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">out.txt</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">w</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> as</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> out</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">            for</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> match </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">in</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> matchs</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">                out</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">write</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">match </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">+</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &quot;</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">\\n</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span></code></pre></div>`,2);function A(c,D,C,E,B,m){const n=a("VPNolebaseInlineLinkPreview"),h=a("NolebaseGitContributors"),e=a("NolebaseGitChangelog");return d(),l("div",null,[g,s("ul",null,[s("li",null,[i(n,{href:"https://regex101.com/",target:"_blank",rel:"noreferrer"},{default:p(()=>[t("學習網站")]),_:1})])]),y,i(h),i(e)])}const x=k(o,[["render",A]]);export{u as __pageData,x as default};
