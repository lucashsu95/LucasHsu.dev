import{B as e,R as t,S as n,bt as r,g as i,gt as a,h as o,p as s,v as c,w as l,x as u,y as d}from"../modules/shiki-trF6svJw.js";import{S as f}from"../modules/vue-ClnlGPR8.js";import{St as p,jt as m,y as h}from"../index-Oq-ke0Xu.js";import{t as g}from"./NoteDisplay-D7QSCn1C.js";var _={id:`page-root`},v={class:`m-4`},y={class:`mb-10`},b={class:`text-4xl font-bold mt-2`},x={class:`opacity-50`},S={class:`text-lg`},C={class:`font-bold flex gap-2`},w={class:`opacity-50`},T={key:0,class:`border-main mb-8`},E=l({__name:`print`,setup(l){let{slides:E,total:D}=h();f(`
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
`),p({title:`Notes - ${m.title}`});let O=o(()=>E.value.map(e=>e.meta?.slide).filter(e=>e!==void 0&&e.noteHTML!==``));return(o,l)=>(t(),d(`div`,_,[i(`div`,v,[i(`div`,y,[i(`h1`,b,r(a(m).title),1),i(`div`,x,r(new Date().toLocaleString()),1)]),(t(!0),d(s,null,e(O.value,(e,o)=>(t(),d(`div`,{key:o,class:`flex flex-col gap-4 break-inside-avoid-page`},[i(`div`,null,[i(`h2`,S,[i(`div`,C,[i(`div`,w,r(e?.no)+`/`+r(a(D)),1),u(` `+r(e?.title)+` `,1),l[0]||=i(`div`,{class:`flex-auto`},null,-1)])]),n(g,{"note-html":e.noteHTML,class:`max-w-full`},null,8,[`note-html`])]),o<O.value.length-1?(t(),d(`hr`,T)):c(``,!0)]))),128))])]))}});export{E as default};