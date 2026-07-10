import{C as e,Ct as t,D as n,Dt as r,E as i,G as a,O as o,j as s,k as c,q as l,w as u,x as d}from"../modules/shiki-10kH76KS.js";import{ht as f}from"../monaco/bundled-types-UnXUGsMK.js";import{S as p}from"../modules/vue-Cm2AB7bZ.js";import{L as m,g as h}from"../index-D5ApXX3N.js";import{t as g}from"./NoteDisplay-PMRhYSQ7.js";var _={id:`page-root`},v={class:`m-4`},y={class:`mb-10`},b={class:`text-4xl font-bold mt-2`},x={class:`opacity-50`},S={class:`text-lg`},C={class:`font-bold flex gap-2`},w={class:`opacity-50`},T={key:0,class:`border-main mb-8`},E=s({__name:`print`,setup(s){let{slides:E,total:D}=h();p(`
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
`),m({title:`Notes - ${f.title}`});let O=e(()=>E.value.map(e=>e.meta?.slide).filter(e=>e!==void 0&&e.noteHTML!==``));return(e,s)=>(a(),n(`div`,_,[u(`div`,v,[u(`div`,y,[u(`h1`,b,r(t(f).title),1),u(`div`,x,r(new Date().toLocaleString()),1)]),(a(!0),n(d,null,l(O.value,(e,l)=>(a(),n(`div`,{key:l,class:`flex flex-col gap-4 break-inside-avoid-page`},[u(`div`,null,[u(`h2`,S,[u(`div`,C,[u(`div`,w,r(e?.no)+`/`+r(t(D)),1),o(` `+r(e?.title)+` `,1),s[0]||=u(`div`,{class:`flex-auto`},null,-1)])]),c(g,{"note-html":e.noteHTML,class:`max-w-full`},null,8,[`note-html`])]),l<O.value.length-1?(a(),n(`hr`,T)):i(``,!0)]))),128))])]))}});export{E as default};