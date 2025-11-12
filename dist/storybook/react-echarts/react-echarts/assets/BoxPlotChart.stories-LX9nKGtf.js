import{j as s,E as i}from"./index-CpemsT94.js";import{r as u}from"./iframe-BRs5tloK.js";import"./preload-helper-PPVm8Dsz.js";const l=e=>({text:e,top:"1%"}),p=e=>({left:"3%",right:"4%",bottom:"3%",top:"15%",containLabel:!0}),n=({chartData:e,theme:a="light"})=>{const o=u.useMemo(()=>!e.series||e.series.length===0?{}:{title:l(e.title||"Box Plot"),grid:p(),tooltip:{trigger:"item"},dataset:e.dataset,series:e.series,xAxis:{type:"category",...e.xAxis},yAxis:{type:"value",...e.yAxis}},[e]);return s.jsx("div",{style:{backgroundColor:a==="dark"?"#1a1a1a":"#ffffff",padding:"10px",borderRadius:"4px"},children:s.jsx(i,{option:o,theme:a,style:{height:"400px"},notMerge:!0,lazyUpdate:!0})})};n.__docgenInfo={description:"",methods:[],displayName:"BoxPlotChart",props:{chartData:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  title?: string;
  dataset?: { source: (string | number)[][] }[];
  series: { type: 'boxplot'; datasetIndex?: number }[];
  xAxis: object;
  yAxis: object;
}`,signature:{properties:[{key:"title",value:{name:"string",required:!1}},{key:"dataset",value:{name:"Array",elements:[{name:"signature",type:"object",raw:"{ source: (string | number)[][] }",signature:{properties:[{key:"source",value:{name:"Array",elements:[{name:"Array",elements:[{name:"unknown"}],raw:"(string | number)[]"}],raw:"(string | number)[][]",required:!0}}]}}],raw:"{ source: (string | number)[][] }[]",required:!1}},{key:"series",value:{name:"Array",elements:[{name:"signature",type:"object",raw:"{ type: 'boxplot'; datasetIndex?: number }",signature:{properties:[{key:"type",value:{name:"literal",value:"'boxplot'",required:!0}},{key:"datasetIndex",value:{name:"number",required:!1}}]}}],raw:"{ type: 'boxplot'; datasetIndex?: number }[]",required:!0}},{key:"xAxis",value:{name:"object",required:!0}},{key:"yAxis",value:{name:"object",required:!0}}]}},description:""},theme:{required:!1,tsType:{name:"union",raw:"'light' | 'dark'",elements:[{name:"literal",value:"'light'"},{name:"literal",value:"'dark'"}]},description:"",defaultValue:{value:"'light'",computed:!1}}}};const c={component:n,title:"Charts/BoxPlotChart"},t={args:{chartData:{title:"Simple Box Plot",dataset:[{source:[["Category","min","Q1","median","Q3","max"],["A",10,15,20,25,30],["B",12,17,22,27,32],["C",8,13,18,23,28]]}],series:[{type:"boxplot",datasetIndex:0}],xAxis:{data:["A","B","C"]},yAxis:{}}}},r={args:{chartData:{title:"Multiple Box Plots",dataset:[{source:[["Category","min","Q1","median","Q3","max"],["Group 1",10,15,20,25,30],["Group 2",12,17,22,27,32],["Group 3",8,13,18,23,28],["Group 4",14,19,24,29,34]]}],series:[{type:"boxplot",datasetIndex:0}],xAxis:{data:["Group 1","Group 2","Group 3","Group 4"]},yAxis:{}}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'Simple Box Plot',
      dataset: [{
        source: [['Category', 'min', 'Q1', 'median', 'Q3', 'max'], ['A', 10, 15, 20, 25, 30], ['B', 12, 17, 22, 27, 32], ['C', 8, 13, 18, 23, 28]]
      }],
      series: [{
        type: 'boxplot',
        datasetIndex: 0
      }],
      xAxis: {
        data: ['A', 'B', 'C']
      },
      yAxis: {}
    }
  }
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'Multiple Box Plots',
      dataset: [{
        source: [['Category', 'min', 'Q1', 'median', 'Q3', 'max'], ['Group 1', 10, 15, 20, 25, 30], ['Group 2', 12, 17, 22, 27, 32], ['Group 3', 8, 13, 18, 23, 28], ['Group 4', 14, 19, 24, 29, 34]]
      }],
      series: [{
        type: 'boxplot',
        datasetIndex: 0
      }],
      xAxis: {
        data: ['Group 1', 'Group 2', 'Group 3', 'Group 4']
      },
      yAxis: {}
    }
  }
}`,...r.parameters?.docs?.source}}};const y=["Simple","Multiple"];export{r as Multiple,t as Simple,y as __namedExportsOrder,c as default};
