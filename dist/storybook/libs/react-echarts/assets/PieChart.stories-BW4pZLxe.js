import{j as i,E as d}from"./index-CpemsT94.js";import{r as p}from"./iframe-BRs5tloK.js";import"./preload-helper-PPVm8Dsz.js";const c=e=>({left:"3%",right:"4%",bottom:"3%",top:"15%",containLabel:!0}),m=({chartData:e,theme:s="light"})=>{const u=p.useMemo(()=>{if(!e.series||e.series.length===0)return{};const o=e.series.map(a=>({type:"pie",data:Array.isArray(a.data)&&a.data.length>0&&Array.isArray(a.data[0])?a.data.map(([l,g])=>({name:l,value:g})):a.data}));return{title:e.title,grid:c(),tooltip:{trigger:"item"},series:o}},[e]);return i.jsx("div",{style:{backgroundColor:s==="dark"?"#1a1a1a":"#ffffff",padding:"10px",borderRadius:"4px"},children:i.jsx(d,{option:u,theme:s,style:{height:"400px"},notMerge:!0,lazyUpdate:!0})})};m.__docgenInfo={description:"",methods:[],displayName:"PieChart",props:{chartData:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  title?: string;
  series: { data: [string, number][] | { name: string; value: number }[] }[];
}`,signature:{properties:[{key:"title",value:{name:"string",required:!1}},{key:"series",value:{name:"Array",elements:[{name:"signature",type:"object",raw:"{ data: [string, number][] | { name: string; value: number }[] }",signature:{properties:[{key:"data",value:{name:"union",raw:"[string, number][] | { name: string; value: number }[]",elements:[{name:"Array",elements:[{name:"tuple",raw:"[string, number]",elements:[{name:"string"},{name:"number"}]}],raw:"[string, number][]"},{name:"Array",elements:[{name:"signature",type:"object",raw:"{ name: string; value: number }",signature:{properties:[{key:"name",value:{name:"string",required:!0}},{key:"value",value:{name:"number",required:!0}}]}}],raw:"{ name: string; value: number }[]"}],required:!0}}]}}],raw:"{ data: [string, number][] | { name: string; value: number }[] }[]",required:!0}}]}},description:""},theme:{required:!1,tsType:{name:"union",raw:"'light' | 'dark'",elements:[{name:"literal",value:"'light'"},{name:"literal",value:"'dark'"}]},description:"",defaultValue:{value:"'light'",computed:!1}}}};const h={component:m,title:"Charts/PieChart"},r={args:{chartData:{title:{text:"Simple Pie"},series:[{data:[["A",10],["B",20],["C",30]]}]}}},t={args:{chartData:{title:{text:"Pie with Objects"},series:[{data:[{name:"Category A",value:15},{name:"Category B",value:25},{name:"Category C",value:35},{name:"Category D",value:25}]}]}}},n={args:{chartData:{title:{text:"Large Pie"},series:[{data:[["X",100],["Y",200],["Z",150],["W",50],["V",75]]}]}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: {
        text: 'Simple Pie'
      },
      series: [{
        data: [['A', 10], ['B', 20], ['C', 30]]
      }]
    }
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: {
        text: 'Pie with Objects'
      },
      series: [{
        data: [{
          name: 'Category A',
          value: 15
        }, {
          name: 'Category B',
          value: 25
        }, {
          name: 'Category C',
          value: 35
        }, {
          name: 'Category D',
          value: 25
        }]
      }]
    }
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: {
        text: 'Large Pie'
      },
      series: [{
        data: [['X', 100], ['Y', 200], ['Z', 150], ['W', 50], ['V', 75]]
      }]
    }
  }
}`,...n.parameters?.docs?.source}}};const C=["Simple","ObjectData","Large"];export{n as Large,t as ObjectData,r as Simple,C as __namedExportsOrder,h as default};
