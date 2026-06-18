import{E as K,o as V,p as Z,s as j,g as q,c as H,b as J,_ as s,l as w,v as Q,d as X,F as Y,K as ee,M as te,N as G,O as ae,k as re,P as ie}from"./mermaid.CqgDq_w3.js";import{p as se}from"./chunk-4BX2VUAB.CdiUyg7F.js";import{p as le}from"./treemap-KMMF4GRG.DslnZISb.js";import"./min.CotBmUwN.js";import"./baseUniq.DGCrgmvI.js";var M=K.pie,D={sections:new Map,showData:!1,config:M},g=D.sections,C=D.showData,oe=structuredClone(M),ne=s(()=>structuredClone(oe),"getConfig"),ce=s(()=>{g=new Map,C=D.showData,Q()},"clear"),pe=s(({label:e,value:a})=>{if(a<0)throw new Error(`"${e}" has invalid value: ${a}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);g.has(e)||(g.set(e,a),w.debug(`added new section: ${e}, with value: ${a}`))},"addSection"),de=s(()=>g,"getSections"),ge=s(e=>{C=e},"setShowData"),ue=s(()=>C,"getShowData"),O={getConfig:ne,clear:ce,setDiagramTitle:V,getDiagramTitle:Z,setAccTitle:j,getAccTitle:q,setAccDescription:H,getAccDescription:J,addSection:pe,getSections:de,setShowData:ge,getShowData:ue},fe=s((e,a)=>{se(e,a),a.setShowData(e.showData),e.sections.map(a.addSection)},"populateDb"),he={parse:s(async e=>{const a=await le("pie",e);w.debug(a),fe(a,O)},"parse")},me=s(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,"getStyles"),ve=me,Se=s(e=>{const a=[...e.values()].reduce((r,l)=>r+l,0),$=[...e.entries()].map(([r,l])=>({label:r,value:l})).filter(r=>r.value/a*100>=1).sort((r,l)=>l.value-r.value);return ie().value(r=>r.value)($)},"createPieArcs"),xe=s((e,a,$,y)=>{w.debug(`rendering pie chart
`+e);const r=y.db,l=X(),T=Y(r.getConfig(),l.pie),A=40,o=18,p=4,n=450,u=n,f=ee(a),c=f.append("g");c.attr("transform","translate("+u/2+","+n/2+")");const{themeVariables:i}=l;let[b]=te(i.pieOuterStrokeWidth);b??(b=2);const E=T.textPosition,d=Math.min(u,n)/2-A,P=G().innerRadius(0).outerRadius(d),W=G().innerRadius(d*E).outerRadius(d*E);c.append("circle").attr("cx",0).attr("cy",0).attr("r",d+b/2).attr("class","pieOuterCircle");const h=r.getSections(),N=Se(h),R=[i.pie1,i.pie2,i.pie3,i.pie4,i.pie5,i.pie6,i.pie7,i.pie8,i.pie9,i.pie10,i.pie11,i.pie12];let m=0;h.forEach(t=>{m+=t});const _=N.filter(t=>(t.data.value/m*100).toFixed(0)!=="0"),v=ae(R);c.selectAll("mySlices").data(_).enter().append("path").attr("d",P).attr("fill",t=>v(t.data.label)).attr("class","pieCircle"),c.selectAll("mySlices").data(_).enter().append("text").text(t=>(t.data.value/m*100).toFixed(0)+"%").attr("transform",t=>"translate("+W.centroid(t)+")").style("text-anchor","middle").attr("class","slice"),c.append("text").text(r.getDiagramTitle()).attr("x",0).attr("y",-(n-50)/2).attr("class","pieTitleText");const k=[...h.entries()].map(([t,x])=>({label:t,value:x})),S=c.selectAll(".legend").data(k).enter().append("g").attr("class","legend").attr("transform",(t,x)=>{const z=o+p,L=z*k.length/2,B=12*o,U=x*z-L;return"translate("+B+","+U+")"});S.append("rect").attr("width",o).attr("height",o).style("fill",t=>v(t.label)).style("stroke",t=>v(t.label)),S.append("text").attr("x",o+p).attr("y",o-p).text(t=>r.getShowData()?`${t.label} [${t.value}]`:t.label);const I=Math.max(...S.selectAll("text").nodes().map(t=>(t==null?void 0:t.getBoundingClientRect().width)??0)),F=u+A+o+p+I;f.attr("viewBox",`0 0 ${F} ${n}`),re(f,n,F,T.useMaxWidth)},"draw"),we={draw:xe},Ae={parser:he,db:O,renderer:we,styles:ve};export{Ae as diagram};
