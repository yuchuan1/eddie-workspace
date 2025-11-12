import{j as n,E as y}from"./index-CpemsT94.js";import{r as x}from"./iframe-BRs5tloK.js";import"./preload-helper-PPVm8Dsz.js";const o=({chartData:e,theme:i="light"})=>{const a=e.dataset.length,l=x.useMemo(()=>{const d=[];for(let t=0;t<a;t++)for(let r=0;r<a;r++){const m=e.dataset[r].data,p=e.dataset[t].data,u=m.map((g,f)=>[g,p[f]]),c={grid:{left:"10%",right:"10%",top:"15%",bottom:"10%",containLabel:!0},xAxis:{type:"value",name:r===0?e.dataset[r].name:void 0,nameLocation:"middle",nameGap:25},yAxis:{type:"value",name:t===a-1?e.dataset[t].name:void 0,nameLocation:"middle",nameGap:35},series:[{type:"scatter",data:u,symbolSize:4}]};d.push(n.jsx("div",{style:{gridRow:t+1,gridColumn:r+1,backgroundColor:i==="dark"?"#1a1a1a":"#ffffff",border:"1px solid #ddd",padding:"5px"},children:n.jsx(y,{option:c,theme:i,style:{height:"150px",width:"100%"},notMerge:!0,lazyUpdate:!0})},`${t}-${r}`))}return d},[e,i,a]);return n.jsxs("div",{style:{width:"100%",backgroundColor:i==="dark"?"#1a1a1a":"#ffffff",paddingTop:"8px"},children:[n.jsx("h3",{style:{textAlign:"center",margin:"0 0 8px 0",color:i==="dark"?"#ffffff":"#000000"},children:e.title||"Pairwise Scatter Grid"}),n.jsx("div",{style:{display:"grid",gridTemplateRows:`repeat(${a}, 1fr)`,gridTemplateColumns:`repeat(${a}, 1fr)`,gap:"2px",width:"100%",height:`${a*160}px`,backgroundColor:i==="dark"?"#1a1a1a":"#ffffff"},children:l})]})};o.__docgenInfo={description:"",methods:[],displayName:"PairwiseScatterGridChart",props:{chartData:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  title?: string;
  dataset: MatrixScatterDataset[];
}`,signature:{properties:[{key:"title",value:{name:"string",required:!1}},{key:"dataset",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  name: string;
  data: number[];
  dp_groups?: string[];
}`,signature:{properties:[{key:"name",value:{name:"string",required:!0}},{key:"data",value:{name:"Array",elements:[{name:"number"}],raw:"number[]",required:!0}},{key:"dp_groups",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!1}}]}}],raw:"MatrixScatterDataset[]",required:!0}}]}},description:""},theme:{required:!1,tsType:{name:"union",raw:"'light' | 'dark'",elements:[{name:"literal",value:"'light'"},{name:"literal",value:"'dark'"}]},description:"",defaultValue:{value:"'light'",computed:!1}}}};const v={component:o,title:"Charts/PairwiseScatterGridChart"},s={args:{chartData:{title:"Pairwise Scatter Grid",dataset:[{name:"Variable A",data:[1,2,3,4,5,6,7,8,9,10]},{name:"Variable B",data:[2,4,6,8,10,12,14,16,18,20]},{name:"Variable C",data:[1,3,5,7,9,11,13,15,17,19]}]}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'Pairwise Scatter Grid',
      dataset: [{
        name: 'Variable A',
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      }, {
        name: 'Variable B',
        data: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
      }, {
        name: 'Variable C',
        data: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
      }]
    }
  }
}`,...s.parameters?.docs?.source}}};const k=["Simple"];export{s as Simple,k as __namedExportsOrder,v as default};
