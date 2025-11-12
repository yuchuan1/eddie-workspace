import{j as l,E as f}from"./index-CpemsT94.js";import{r as h}from"./iframe-BRs5tloK.js";import"./preload-helper-PPVm8Dsz.js";const T=({chartData:a,theme:i="light"})=>{const n=a.axisLabels.x.length,b=h.useMemo(()=>{const x=[];for(let e=0;e<n;e++)for(let t=0;t<n;t++){let u;if(e===t){const s=a.series[e]?.data.map(([p])=>p)||[],r=10,m=Math.min(...s),g=(Math.max(...s)-m)/r,c=new Array(r).fill(0);s.forEach(p=>{const o=Math.min(Math.floor((p-m)/g),r-1);c[o]++});const y=Array.from({length:r},(p,o)=>`${(m+o*g).toFixed(1)}-${(m+(o+1)*g).toFixed(1)}`);u={grid:{left:"15%",right:"10%",top:"20%",bottom:"15%",containLabel:!0},xAxis:{type:"category",data:y,axisLabel:{rotate:45},...e===0?{name:a.axisLabels.x[e],nameLocation:"middle",nameGap:30}:{}},yAxis:{type:"value",...t===0?{name:a.axisLabels.y[e],nameLocation:"middle",nameRotate:90,nameGap:45}:{}},series:[{type:"bar",data:c,barWidth:"80%"}]}}else{const s=a.series.find(r=>r.name===`${a.axisLabels.y[e]}_${a.axisLabels.x[t]}`)?.data||[];u={grid:{left:"15%",right:"10%",top:"20%",bottom:"15%",containLabel:!0},xAxis:{type:"value",...e===0?{name:a.axisLabels.x[t],nameLocation:"middle",nameGap:30}:{}},yAxis:{type:"value",...t===0?{name:a.axisLabels.y[e],nameLocation:"middle",nameRotate:90,nameGap:45}:{}},series:[{type:"scatter",data:s,symbolSize:3}]}}x.push(l.jsx("div",{style:{gridRow:e+1,gridColumn:t+1,backgroundColor:i==="dark"?"#1a1a1a":"#ffffff",border:"1px solid #ddd",padding:"5px"},children:l.jsx(f,{option:u,theme:i,style:{height:"150px",width:"100%"},notMerge:!0,lazyUpdate:!0})},`${e}-${t}`))}return x},[a,i,n]);return l.jsxs("div",{style:{display:"grid",gridTemplateRows:`repeat(${n}, 1fr)`,gridTemplateColumns:`repeat(${n}, 1fr)`,gap:"2px",width:"100%",height:`${n*160}px`,backgroundColor:i==="dark"?"#1a1a1a":"#ffffff"},children:[l.jsx("h3",{style:{gridColumn:"1 / -1",textAlign:"center",margin:"10px 0",color:i==="dark"?"#ffffff":"#000000"},children:a.title||"Scatterplot Matrix"}),b]})};T.__docgenInfo={description:"",methods:[],displayName:"ScatterplotMatrixChart",props:{chartData:{required:!0,tsType:{name:"intersection",raw:`{
  title?: string;
} & MatrixScatterChartData`,elements:[{name:"signature",type:"object",raw:`{
  title?: string;
}`,signature:{properties:[{key:"title",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
  axisLabels: {
    x: string[];
    y: string[];
  };
  series: {
    name?: string;
    data: [number, number][];
  }[];
}`,signature:{properties:[{key:"axisLabels",value:{name:"signature",type:"object",raw:`{
  x: string[];
  y: string[];
}`,signature:{properties:[{key:"x",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!0}},{key:"y",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!0}}]},required:!0}},{key:"series",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  name?: string;
  data: [number, number][];
}`,signature:{properties:[{key:"name",value:{name:"string",required:!1}},{key:"data",value:{name:"Array",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}],raw:"[number, number][]",required:!0}}]}}],raw:`{
  name?: string;
  data: [number, number][];
}[]`,required:!0}}]}}]},description:""},theme:{required:!1,tsType:{name:"union",raw:"'light' | 'dark'",elements:[{name:"literal",value:"'light'"},{name:"literal",value:"'dark'"}]},description:"",defaultValue:{value:"'light'",computed:!1}}}};const k={component:T,title:"Charts/ScatterplotMatrixChart"},d={args:{chartData:{title:"Scatterplot Matrix",axisLabels:{x:["Temp1","Temp2","Temp3"],y:["Temp1","Temp2","Temp3"]},series:[{name:"Temp1_hist",data:[[20,0],[21,0],[22,0],[23,0],[24,0],[25,0]]},{name:"Temp2_hist",data:[[18,0],[19,0],[20,0],[21,0],[22,0]]},{name:"Temp3_hist",data:[[19,0],[20,0],[21,0],[22,0],[23,0]]},{name:"Temp1_Temp2",data:[[20,18],[21,19],[22,20],[23,21],[24,22],[25,23]]},{name:"Temp1_Temp3",data:[[20,19],[21,20],[22,21],[23,22],[24,23],[25,24]]},{name:"Temp2_Temp3",data:[[18,19],[19,20],[20,21],[21,22],[22,23]]},{name:"Temp2_Temp1",data:[[18,20],[19,21],[20,22],[21,23],[22,24]]},{name:"Temp3_Temp1",data:[[19,20],[20,21],[21,22],[22,23],[23,24]]},{name:"Temp3_Temp2",data:[[19,18],[20,19],[21,20],[22,21],[23,22]]}]}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'Scatterplot Matrix',
      axisLabels: {
        x: ['Temp1', 'Temp2', 'Temp3'],
        y: ['Temp1', 'Temp2', 'Temp3']
      },
      series: [
      // Diagonal histograms (Temp1, Temp2, Temp3 distributions)
      {
        name: 'Temp1_hist',
        data: [[20, 0], [21, 0], [22, 0], [23, 0], [24, 0], [25, 0]]
      }, {
        name: 'Temp2_hist',
        data: [[18, 0], [19, 0], [20, 0], [21, 0], [22, 0]]
      }, {
        name: 'Temp3_hist',
        data: [[19, 0], [20, 0], [21, 0], [22, 0], [23, 0]]
      },
      // Off-diagonal scatters
      {
        name: 'Temp1_Temp2',
        data: [[20, 18], [21, 19], [22, 20], [23, 21], [24, 22], [25, 23]]
      }, {
        name: 'Temp1_Temp3',
        data: [[20, 19], [21, 20], [22, 21], [23, 22], [24, 23], [25, 24]]
      }, {
        name: 'Temp2_Temp3',
        data: [[18, 19], [19, 20], [20, 21], [21, 22], [22, 23]]
      }, {
        name: 'Temp2_Temp1',
        data: [[18, 20], [19, 21], [20, 22], [21, 23], [22, 24]]
      }, {
        name: 'Temp3_Temp1',
        data: [[19, 20], [20, 21], [21, 22], [22, 23], [23, 24]]
      }, {
        name: 'Temp3_Temp2',
        data: [[19, 18], [20, 19], [21, 20], [22, 21], [23, 22]]
      }]
    }
  }
}`,...d.parameters?.docs?.source}}};const M=["Simple"];export{d as Simple,M as __namedExportsOrder,k as default};
