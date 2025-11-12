import{j as l,E as g}from"./index-CpemsT94.js";import{r as p}from"./iframe-BRs5tloK.js";import"./preload-helper-PPVm8Dsz.js";const h="_wrapperLight_1o2w2_1",x="_wrapperDark_1o2w2_6",y="_chart_1o2w2_11",o={wrapperLight:h,wrapperDark:x,chart:y},A=e=>({text:e,top:"1%"}),b=e=>({data:e.map(r=>r.name||"Series")}),S=e=>({left:"3%",right:"4%",bottom:"3%",top:"15%",containLabel:!0}),u=({chartData:e,theme:r="light"})=>{const d=p.useMemo(()=>{if(!e.series||e.series.length===0)return{};const c=e.series.map(m=>({type:"scatter",name:m.name||"Series",data:m.data}));return{title:A(e.title||"Scatter Chart"),...e.series.length>1?{legend:{...b(e.series),top:"8%",left:"center"}}:{},grid:S(),tooltip:{trigger:"item"},series:c,xAxis:Array.isArray(e.xAxis)?{type:"value",data:e.xAxis}:{type:"value",...e.xAxis},yAxis:{type:"value",...e.yAxis}}},[e]);return l.jsx("div",{className:r==="dark"?o.wrapperDark:o.wrapperLight,children:l.jsx(g,{option:d,theme:r,className:o.chart,notMerge:!0,lazyUpdate:!0})})};u.__docgenInfo={description:"",methods:[],displayName:"ScatterChart",props:{chartData:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  title?: string;
  legend?: { data: string[] };
  series: {
    data: (
      | number
      | [string | number, string | number]
      | { value: [string | number, string | number] }
    )[];
    name?: string;
  }[];
  xAxis: string[] | object;
  yAxis: object;
}`,signature:{properties:[{key:"title",value:{name:"string",required:!1}},{key:"legend",value:{name:"signature",type:"object",raw:"{ data: string[] }",signature:{properties:[{key:"data",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!0}}]},required:!1}},{key:"series",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  data: (
    | number
    | [string | number, string | number]
    | { value: [string | number, string | number] }
  )[];
  name?: string;
}`,signature:{properties:[{key:"data",value:{name:"Array",elements:[{name:"unknown"}],raw:`(
  | number
  | [string | number, string | number]
  | { value: [string | number, string | number] }
)[]`,required:!0}},{key:"name",value:{name:"string",required:!1}}]}}],raw:`{
  data: (
    | number
    | [string | number, string | number]
    | { value: [string | number, string | number] }
  )[];
  name?: string;
}[]`,required:!0}},{key:"xAxis",value:{name:"union",raw:"string[] | object",elements:[{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"object"}],required:!0}},{key:"yAxis",value:{name:"object",required:!0}}]}},description:""},theme:{required:!1,tsType:{name:"union",raw:"'light' | 'dark'",elements:[{name:"literal",value:"'light'"},{name:"literal",value:"'dark'"}]},description:"",defaultValue:{value:"'light'",computed:!1}}}};const v={component:u,title:"Charts/ScatterChart"},a={args:{chartData:{title:"Simple Scatter",series:[{name:"Points",data:Array.from({length:50},()=>[Math.random()*100,Math.random()*100])}],xAxis:{},yAxis:{}}}},t={args:{chartData:{title:"Multiple Series Scatter",series:[{name:"Group A",data:Array.from({length:30},()=>[Math.random()*50,Math.random()*50])},{name:"Group B",data:Array.from({length:30},()=>[50+Math.random()*50,50+Math.random()*50])}],xAxis:{},yAxis:{}}}},n={args:{chartData:{title:"Categorical Scatter",series:[{name:"Data",data:[[0,20],[1,30],[2,25],[3,35],[4,40]]}],xAxis:{type:"category",data:["A","B","C","D","E"]},yAxis:{}}}},s={args:{chartData:{title:"Dense Scatter",series:[{name:"Dense Points",data:Array.from({length:1e3},()=>[Math.random()*100,Math.random()*100])}],xAxis:{},yAxis:{}}}},i={args:{chartData:{title:"Large Numbers Scatter",series:[{name:"Large Data",data:Array.from({length:20},()=>[Math.random()*1e4,Math.random()*1e4])}],xAxis:{},yAxis:{}}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'Simple Scatter',
      series: [{
        name: 'Points',
        data: Array.from({
          length: 50
        }, () => [Math.random() * 100, Math.random() * 100])
      }],
      xAxis: {},
      yAxis: {}
    }
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'Multiple Series Scatter',
      series: [{
        name: 'Group A',
        data: Array.from({
          length: 30
        }, () => [Math.random() * 50, Math.random() * 50])
      }, {
        name: 'Group B',
        data: Array.from({
          length: 30
        }, () => [50 + Math.random() * 50, 50 + Math.random() * 50])
      }],
      xAxis: {},
      yAxis: {}
    }
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'Categorical Scatter',
      series: [{
        name: 'Data',
        data: [[0, 20], [1, 30], [2, 25], [3, 35], [4, 40]]
      }],
      xAxis: {
        type: 'category',
        data: ['A', 'B', 'C', 'D', 'E']
      },
      yAxis: {}
    }
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'Dense Scatter',
      series: [{
        name: 'Dense Points',
        data: Array.from({
          length: 1000
        }, () => [Math.random() * 100, Math.random() * 100])
      }],
      xAxis: {},
      yAxis: {}
    }
  }
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'Large Numbers Scatter',
      series: [{
        name: 'Large Data',
        data: Array.from({
          length: 20
        }, () => [Math.random() * 10000, Math.random() * 10000])
      }],
      xAxis: {},
      yAxis: {}
    }
  }
}`,...i.parameters?.docs?.source}}};const D=["Simple","MultipleSeries","Categorical","Dense","LargeNumbers"];export{n as Categorical,s as Dense,i as LargeNumbers,t as MultipleSeries,a as Simple,D as __namedExportsOrder,v as default};
