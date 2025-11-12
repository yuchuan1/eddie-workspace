import{j as i,E as m}from"./index-CpemsT94.js";import{r as u}from"./iframe-BRs5tloK.js";import"./preload-helper-PPVm8Dsz.js";const p=e=>({text:e,top:"1%"}),c=e=>({data:e.map(a=>a.name||"Series")}),g=e=>({left:"3%",right:"4%",bottom:"3%",top:"15%",containLabel:!0}),o=({chartData:e,theme:a="light"})=>{const l=u.useMemo(()=>{if(!e.series||e.series.length===0)return{};const d=e.series.map(r=>({type:"line",name:r.name||"Series",data:r.data,areaStyle:{},...r.stack?{stack:r.stack}:{}}));return{title:p(e.title||"Area Chart"),...e.series.length>1?{legend:{...c(e.series),top:"8%",left:"center"}}:{},grid:g(),tooltip:{trigger:"axis"},series:d,xAxis:{type:"category",data:e.xAxis},yAxis:{type:"value"}}},[e]);return i.jsx("div",{style:{backgroundColor:a==="dark"?"#1a1a1a":"#ffffff",padding:"10px",borderRadius:"4px"},children:i.jsx(m,{option:l,theme:a,style:{height:"400px"},notMerge:!0,lazyUpdate:!0})})};o.__docgenInfo={description:"",methods:[],displayName:"AreaChart",props:{chartData:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  title?: string;
  legend?: { data: string[] };
  series: { data: number[]; name?: string; stack?: string }[];
  xAxis: string[];
  yAxis: object;
}`,signature:{properties:[{key:"title",value:{name:"string",required:!1}},{key:"legend",value:{name:"signature",type:"object",raw:"{ data: string[] }",signature:{properties:[{key:"data",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!0}}]},required:!1}},{key:"series",value:{name:"Array",elements:[{name:"signature",type:"object",raw:"{ data: number[]; name?: string; stack?: string }",signature:{properties:[{key:"data",value:{name:"Array",elements:[{name:"number"}],raw:"number[]",required:!0}},{key:"name",value:{name:"string",required:!1}},{key:"stack",value:{name:"string",required:!1}}]}}],raw:"{ data: number[]; name?: string; stack?: string }[]",required:!0}},{key:"xAxis",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!0}},{key:"yAxis",value:{name:"object",required:!0}}]}},description:""},theme:{required:!1,tsType:{name:"union",raw:"'light' | 'dark'",elements:[{name:"literal",value:"'light'"},{name:"literal",value:"'dark'"}]},description:"",defaultValue:{value:"'light'",computed:!1}}}};const k={component:o,title:"Charts/AreaChart"},t={args:{chartData:{title:"Simple Area",series:[{data:[10,20,30,40,50]}],xAxis:["Jan","Feb","Mar","Apr","May"],yAxis:{}}}},s={args:{chartData:{title:"Multiple Area Series",series:[{name:"Series A",data:[10,22,35,47,53]},{name:"Series B",data:[8,18,29,41,52]}],xAxis:["Jan","Feb","Mar","Apr","May"],yAxis:{}}}},n={args:{chartData:{title:"Stacked Area",series:[{name:"Bottom",data:[10,22,35,47,53],stack:"total"},{name:"Top",data:[20,30,25,40,60],stack:"total"}],xAxis:["Jan","Feb","Mar","Apr","May"],yAxis:{}}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'Simple Area',
      series: [{
        data: [10, 20, 30, 40, 50]
      }],
      xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      yAxis: {}
    }
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'Multiple Area Series',
      series: [{
        name: 'Series A',
        data: [10, 22, 35, 47, 53]
      }, {
        name: 'Series B',
        data: [8, 18, 29, 41, 52]
      }],
      xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      yAxis: {}
    }
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'Stacked Area',
      series: [{
        name: 'Bottom',
        data: [10, 22, 35, 47, 53],
        stack: 'total'
      }, {
        name: 'Top',
        data: [20, 30, 25, 40, 60],
        stack: 'total'
      }],
      xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      yAxis: {}
    }
  }
}`,...n.parameters?.docs?.source}}};const f=["Simple","MultipleSeries","Stacked"];export{s as MultipleSeries,t as Simple,n as Stacked,f as __namedExportsOrder,k as default};
