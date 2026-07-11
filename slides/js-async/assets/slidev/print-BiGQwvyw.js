import{B as e,R as t,S as n,_ as r,b as i,bt as a,g as o,gt as s,m as c,w as l,x as u,y as d}from"../modules/shiki-DKTH2pnl.js";import{g as f}from"./utils-CmVawvVO-SlLJVChL.js";import{S as p}from"../modules/vue-D1z7s_ck.js";import{xt as m,y as h}from"../index-csvaVziC.js";import{t as g}from"./NoteDisplay-t62q8JUm.js";var _={id:`page-root`},v={class:`m-4`},y={class:`mb-10`},b={class:`text-4xl font-bold mt-2`},x={class:`opacity-50`},S={class:`text-lg`},C={class:`font-bold flex gap-2`},w={class:`opacity-50`},T={key:0,class:`border-main mb-8`},E=l({__name:`print`,setup(l){let{slides:E,total:D}=h();p(`
@page {
  size: A4;
  margin-top: 1.5cm;
  margin-bottom: 1cm;
}
* {
  -webkit-print-color-adjust: exact;
}
html,
html body,
html #app,
html #page-root {
  height: auto;
  overflow: auto !important;
}
`),m({title:`Notes - ${f.title}`});let O=o(()=>E.value.map(e=>e.meta?.slide).filter(e=>e!==void 0&&e.noteHTML!==``));return(o,l)=>(t(),i(`div`,_,[r(`div`,v,[r(`div`,y,[r(`h1`,b,a(s(f).title),1),r(`div`,x,a(new Date().toLocaleString()),1)]),(t(!0),i(c,null,e(O.value,(e,o)=>(t(),i(`div`,{key:o,class:`flex flex-col gap-4 break-inside-avoid-page`},[r(`div`,null,[r(`h2`,S,[r(`div`,C,[r(`div`,w,a(e?.no)+`/`+a(s(D)),1),u(` `+a(e?.title)+` `,1),l[0]||=r(`div`,{class:`flex-auto`},null,-1)])]),n(g,{"note-html":e.noteHTML,class:`max-w-full`},null,8,[`note-html`])]),o<O.value.length-1?(t(),i(`hr`,T)):d(``,!0)]))),128))])]))}});export{E as default};