import{j as s,E as o}from"./index-CpemsT94.js";import{r as m}from"./iframe-BRs5tloK.js";import"./preload-helper-PPVm8Dsz.js";const p=e=>({text:e,top:"1%"}),d=e=>({data:e.map(t=>t.name||"Series")}),y=e=>({left:"3%",right:"4%",bottom:"3%",top:"15%",containLabel:!0}),n=({chartData:e,theme:t="light"})=>{const i=m.useMemo(()=>{if(!e.series||e.series.length===0)return{};const u=e.series.map((r,l)=>({type:r.type,name:r.name||"Series",data:r.data,...r.type==="bar"?{barCategoryGap:0}:{},...l===1?{yAxisIndex:1}:{}}));return{title:p(e.title||"Pareto Chart"),...e.series.length>1?{legend:{...d(e.series),top:"8%",left:"center"}}:{},grid:y(),tooltip:{trigger:"axis"},series:u,xAxis:Array.isArray(e.xAxis)?{type:"category",data:e.xAxis}:{type:"category",...e.xAxis},yAxis:e.yAxis}},[e]);return s.jsx("div",{style:{backgroundColor:t==="dark"?"#1a1a1a":"#ffffff",padding:"10px",borderRadius:"4px"},children:s.jsx(o,{option:i,theme:t,style:{height:"400px"},notMerge:!0,lazyUpdate:!0})})};n.__docgenInfo={description:"",methods:[],displayName:"ParetoChart",props:{chartData:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  title?: string;
  legend?: { data: string[] };
  series: { data: number[]; name?: string; type: 'bar' | 'line' }[];
  xAxis: string[] | object;
  yAxis: object[];
}`,signature:{properties:[{key:"title",value:{name:"string",required:!1}},{key:"legend",value:{name:"signature",type:"object",raw:"{ data: string[] }",signature:{properties:[{key:"data",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!0}}]},required:!1}},{key:"series",value:{name:"Array",elements:[{name:"signature",type:"object",raw:"{ data: number[]; name?: string; type: 'bar' | 'line' }",signature:{properties:[{key:"data",value:{name:"Array",elements:[{name:"number"}],raw:"number[]",required:!0}},{key:"name",value:{name:"string",required:!1}},{key:"type",value:{name:"union",raw:"'bar' | 'line'",elements:[{name:"literal",value:"'bar'"},{name:"literal",value:"'line'"}],required:!0}}]}}],raw:"{ data: number[]; name?: string; type: 'bar' | 'line' }[]",required:!0}},{key:"xAxis",value:{name:"union",raw:"string[] | object",elements:[{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"object"}],required:!0}},{key:"yAxis",value:{name:"Array",elements:[{name:"object"}],raw:"object[]",required:!0}}]}},description:""},theme:{required:!1,tsType:{name:"union",raw:"'light' | 'dark'",elements:[{name:"literal",value:"'light'"},{name:"literal",value:"'dark'"}]},description:"",defaultValue:{value:"'light'",computed:!1}}}};const b={component:n,title:"Charts/ParetoChart"},a={args:{chartData:{title:"Pareto Analysis",series:[{name:"Issues",type:"bar",data:[25,18,12,10,8,6,5,4,3,2]},{name:"Cumulative",type:"line",data:[25,43,55,65,73,79,84,88,91,93]}],xAxis:["Issue1","Issue2","Issue3","Issue4","Issue5","Issue6","Issue7","Issue8","Issue9","Issue10"],yAxis:[{type:"value",name:"Count"},{type:"value",name:"Cumulative %",position:"right"}]}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'Pareto Analysis',
      series: [{
        name: 'Issues',
        type: 'bar',
        data: [25, 18, 12, 10, 8, 6, 5, 4, 3, 2]
      }, {
        name: 'Cumulative',
        type: 'line',
        data: [25, 43, 55, 65, 73, 79, 84, 88, 91, 93]
      }],
      xAxis: ['Issue1', 'Issue2', 'Issue3', 'Issue4', 'Issue5', 'Issue6', 'Issue7', 'Issue8', 'Issue9', 'Issue10'],
      yAxis: [{
        type: 'value',
        name: 'Count'
      }, {
        type: 'value',
        name: 'Cumulative %',
        position: 'right'
      }]
    }
  }
}`,...a.parameters?.docs?.source}}};const A=["Simple"];export{a as Simple,A as __namedExportsOrder,b as default};
