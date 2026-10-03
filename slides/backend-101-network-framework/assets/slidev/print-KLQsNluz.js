import{B as e,R as t,S as n,g as r,h as i,ht as a,p as o,v as s,w as c,x as l,y as u,yt as d}from"../modules/shiki-CS6s07uE.js";import{S as f}from"../modules/vue-DmxrBtm6.js";import{St as p,jt as m,y as h}from"../index-2Pj8PTbx.js";import{t as g}from"./NoteDisplay-BdojBitp.js";var _={id:`page-root`},v={class:`m-4`},y={class:`mb-10`},b={class:`text-4xl font-bold mt-2`},x={class:`opacity-50`},S={class:`text-lg`},C={class:`font-bold flex gap-2`},w={class:`opacity-50`},T={key:0,class:`border-main mb-8`},E=c({__name:`print`,setup(c){let{slides:E,total:D}=h();f(`
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
`),p({title:`Notes - ${m.title}`});let O=i(()=>E.value.map(e=>e.meta?.slide).filter(e=>e!==void 0&&e.noteHTML!==``));return(i,c)=>(t(),u(`div`,_,[r(`div`,v,[r(`div`,y,[r(`h1`,b,d(a(m).title),1),r(`div`,x,d(new Date().toLocaleString()),1)]),(t(!0),u(o,null,e(O.value,(e,i)=>(t(),u(`div`,{key:i,class:`flex flex-col gap-4 break-inside-avoid-page`},[r(`div`,null,[r(`h2`,S,[r(`div`,C,[r(`div`,w,d(e?.no)+`/`+d(a(D)),1),l(` `+d(e?.title)+` `,1),c[0]||=r(`div`,{class:`flex-auto`},null,-1)])]),n(g,{"note-html":e.noteHTML,class:`max-w-full`},null,8,[`note-html`])]),i<O.value.length-1?(t(),u(`hr`,T)):s(``,!0)]))),128))])]))}});export{E as default};