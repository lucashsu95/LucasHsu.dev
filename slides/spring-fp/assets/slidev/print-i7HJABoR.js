import{C as e,S as t,T as n,V as r,_ as i,_t as a,b as o,h as s,v as c,x as l,xt as u,z as d}from"../modules/shiki-Bk79mKNF.js";import{m as f}from"./utils-CmVawvVO-DijZcfFU.js";import{S as p}from"../modules/vue-YnSggo7H.js";import{xt as m,y as h}from"../index-Ckq1vaVE.js";import{t as g}from"./NoteDisplay-B4jF3zDz.js";var _={id:`page-root`},v={class:`m-4`},y={class:`mb-10`},b={class:`text-4xl font-bold mt-2`},x={class:`opacity-50`},S={class:`text-lg`},C={class:`font-bold flex gap-2`},w={class:`opacity-50`},T={key:0,class:`border-main mb-8`},E=n({__name:`print`,setup(n){let{slides:E,total:D}=h();p(`
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
`),m({title:`Notes - ${f.title}`});let O=i(()=>E.value.map(e=>e.meta?.slide).filter(e=>e!==void 0&&e.noteHTML!==``));return(n,i)=>(d(),l(`div`,_,[c(`div`,v,[c(`div`,y,[c(`h1`,b,u(a(f).title),1),c(`div`,x,u(new Date().toLocaleString()),1)]),(d(!0),l(s,null,r(O.value,(n,r)=>(d(),l(`div`,{key:r,class:`flex flex-col gap-4 break-inside-avoid-page`},[c(`div`,null,[c(`h2`,S,[c(`div`,C,[c(`div`,w,u(n?.no)+`/`+u(a(D)),1),t(` `+u(n?.title)+` `,1),i[0]||=c(`div`,{class:`flex-auto`},null,-1)])]),e(g,{"note-html":n.noteHTML,class:`max-w-full`},null,8,[`note-html`])]),r<O.value.length-1?(d(),l(`hr`,T)):o(``,!0)]))),128))])]))}});export{E as default};