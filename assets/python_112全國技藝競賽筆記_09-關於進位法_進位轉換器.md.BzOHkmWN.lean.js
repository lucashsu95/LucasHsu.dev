import{h as p,y as h,c as b,a7 as u,aa as f,m as l,a as d,o as _}from"./chunks/framework.CiAxhH1b.js";const y=l("h1",{id:"進位轉換器",tabindex:"-1"},[d("進位轉換器 "),l("a",{class:"header-anchor",href:"#進位轉換器","aria-label":'Permalink to "進位轉換器"'},"​")],-1),g=l("h3",{id:"二進位",tabindex:"-1"},[d("二進位 "),l("a",{class:"header-anchor",href:"#二進位","aria-label":'Permalink to "二進位"'},"​")],-1),v=l("h3",{id:"十進位",tabindex:"-1"},[d("十進位 "),l("a",{class:"header-anchor",href:"#十進位","aria-label":'Permalink to "十進位"'},"​")],-1),B=JSON.parse('{"title":"進位轉換器","description":"","frontmatter":{},"headers":[],"relativePath":"python/112全國技藝競賽筆記/09-關於進位法/進位轉換器.md","filePath":"python/112全國技藝競賽筆記/09-關於進位法/進位轉換器.md","lastUpdated":1729437298000}'),P={name:"python/112全國技藝競賽筆記/09-關於進位法/進位轉換器.md"},F=Object.assign(P,{setup(I){const o=p(""),i=p("");function m(r){try{let[e,a]=r.split("."),s=parseInt(e,2),n=0;if(a)for(let t=0;t<a.length;t++)n+=parseInt(a[t])*Math.pow(2,-(t+1));return s+n}catch{return!1}}function x(r){try{let[e,a]=r.split("."),s=parseInt(e).toString(2),n="";if(a){n=".";let t=parseFloat("0."+a);for(let c=0;c<10;c++)t*=2,n+=Math.floor(t),t-=Math.floor(t)}return s+n}catch{return!1}}return h(o,r=>{const e=m(r);e&&(i.value=e)}),h(i,r=>{const e=x(r);e&&(o.value=e)}),(r,e)=>(_(),b("div",null,[y,g,u(l("input",{"onUpdate:modelValue":e[0]||(e[0]=a=>o.value=a),placeholder:"輸入二進位",style:{border:"1px solid #ddd","border-radius":"4px",padding:"2px 5px",margin:"5px 0"}},null,512),[[f,o.value]]),v,u(l("input",{"onUpdate:modelValue":e[1]||(e[1]=a=>i.value=a),placeholder:"輸入十進位",style:{border:"1px solid #ddd","border-radius":"4px",padding:"2px 5px",margin:"5px 0"}},null,512),[[f,i.value]])]))}});export{B as __pageData,F as default};
