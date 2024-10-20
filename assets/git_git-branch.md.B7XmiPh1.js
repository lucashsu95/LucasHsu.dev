import{_ as h,c as t,m as s,J as n,w as e,V as l,a as i,E as k,o as p}from"./chunks/framework.CiAxhH1b.js";const u=JSON.parse('{"title":"Git Branch 分支","description":"","frontmatter":{},"headers":[],"relativePath":"git/git-branch.md","filePath":"git/git-branch.md","lastUpdated":1729437298000}'),r={name:"git/git-branch.md"},d=l(`<h1 id="git-branch-分支" tabindex="-1">Git Branch 分支 <a class="header-anchor" href="#git-branch-分支" aria-label="Permalink to &quot;Git Branch 分支&quot;">​</a></h1><h2 id="介紹" tabindex="-1">介紹 <a class="header-anchor" href="#介紹" aria-label="Permalink to &quot;介紹&quot;">​</a></h2><p><code>Git Branch</code> 是 <code>Git</code> 的一個功能，能夠幫助我們在不同的開發階段中，管理不同的代碼版本。例如，我們可以在開發新功能時，使用一個新的<code>branch</code>，當功能完成後，我們可以將這個<code>branch</code>合并回master分支，或者將這個branch刪除。這樣能夠幫助我們更好地管理代碼，避免在開發過程中引入<code>bug</code>。</p><h2 id="基本命令" tabindex="-1">基本命令 <a class="header-anchor" href="#基本命令" aria-label="Permalink to &quot;基本命令&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">git</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> checkout</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> feature</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> //</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 切換分支</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">git</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> branch</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> //</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 查看分支</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">git</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> branch</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -r</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> //</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 查看遠端分支</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">git</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> branch</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -a</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> //</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 查看所有分支</span></span></code></pre></div><h2 id="新增-刪除分支" tabindex="-1">新增/刪除分支 <a class="header-anchor" href="#新增-刪除分支" aria-label="Permalink to &quot;新增/刪除分支&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">git</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> branch</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> &lt;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">new-branch-nam</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">e</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&gt;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> //</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 新增</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">git</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> checkout</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -b</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> &lt;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">new-branch-nam</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">e</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&gt;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> //</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 新增，並且直接切過去</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">git</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> branch</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -d</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> &lt;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">branch_nam</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">e</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&gt;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> //</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 刪除</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">git</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> branch</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -D</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> &lt;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">branch_nam</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">e</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&gt;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> //</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 強制刪除</span></span></code></pre></div><h2 id="新增-刪除遠端分支" tabindex="-1">新增/刪除遠端分支 <a class="header-anchor" href="#新增-刪除遠端分支" aria-label="Permalink to &quot;新增/刪除遠端分支&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">git</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> push</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> origin</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> &lt;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">branch-nam</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">e</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&gt;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> //</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 分支推送到遠端</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">git</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> push</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> origin</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> --delete</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> &lt;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">branch_nam</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">e</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&gt;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> //</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 刪除遠端</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">git</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> push</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> origin</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> :</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&lt;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">branch_nam</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">e</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&gt;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> //</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 刪除遠端</span></span></code></pre></div><h2 id="設置上游追蹤" tabindex="-1">設置上游追蹤 <a class="header-anchor" href="#設置上游追蹤" aria-label="Permalink to &quot;設置上游追蹤&quot;">​</a></h2><p>如果你希望在未來能夠簡單地使用 git push 和 git pull，可以在首次推送時設置上游追蹤：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">git</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> push</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -u</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> origin</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> &lt;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">branch-nam</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">e</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&gt;</span></span></code></pre></div><h2 id="merge-rebase" tabindex="-1">Merge &amp; Rebase <a class="header-anchor" href="#merge-rebase" aria-label="Permalink to &quot;Merge &amp; Rebase&quot;">​</a></h2>`,13),g=s("h3",{id:"交互式reabase",tabindex:"-1"},[i("交互式Reabase "),s("a",{class:"header-anchor",href:"#交互式reabase","aria-label":'Permalink to "交互式Reabase"'},"​")],-1);function c(o,A,B,y,C,D){const a=k("VPNolebaseInlineLinkPreview");return p(),t("div",null,[d,s("ul",null,[s("li",null,[n(a,{href:"https://www.cnblogs.com/FraserYu/p/11192840.html",target:"_blank",rel:"noreferrer"},{default:e(()=>[i("git rebase VS git merge？ 更優雅的 git 合併方式值得擁有")]),_:1})])]),g])}const m=h(r,[["render",c]]);export{u as __pageData,m as default};
