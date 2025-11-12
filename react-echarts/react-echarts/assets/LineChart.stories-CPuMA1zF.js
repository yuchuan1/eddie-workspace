import{j as d,E as g}from"./index-CpemsT94.js";import{r as x}from"./iframe-BRs5tloK.js";import"./preload-helper-PPVm8Dsz.js";const A="_wrapperLight_1o2w2_1",y="_wrapperDark_1o2w2_6",h="_chart_1o2w2_11",m={wrapperLight:A,wrapperDark:y,chart:h},f=e=>({text:e,top:"1%"}),_=e=>({data:e.map(r=>r.name||"Series")}),b=e=>({left:"3%",right:"4%",bottom:"3%",top:"15%",containLabel:!0}),p=({chartData:e,theme:r="light"})=>{const u=x.useMemo(()=>{if(!e.series||e.series.length===0)return{};const c=e.series.map(l=>({type:"line",name:l.name||"Series",data:l.data}));return{title:f(e.title||"Line Chart"),...e.series.length>1?{legend:{..._(e.series),top:"8%",left:"center"}}:{},grid:b(),tooltip:{trigger:"axis"},series:c,xAxis:{type:"category",data:e.xAxis},yAxis:{type:"value"}}},[e]);return d.jsx("div",{className:r==="dark"?m.wrapperDark:m.wrapperLight,children:d.jsx(g,{option:u,theme:r,className:m.chart,notMerge:!0,lazyUpdate:!0})})};p.__docgenInfo={description:"",methods:[],displayName:"LineChart",props:{chartData:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  title?: string;
  legend?: { data: string[] };
  series: { data: number[]; name?: string }[];
  xAxis: string[];
  yAxis: object;
}`,signature:{properties:[{key:"title",value:{name:"string",required:!1}},{key:"legend",value:{name:"signature",type:"object",raw:"{ data: string[] }",signature:{properties:[{key:"data",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!0}}]},required:!1}},{key:"series",value:{name:"Array",elements:[{name:"signature",type:"object",raw:"{ data: number[]; name?: string }",signature:{properties:[{key:"data",value:{name:"Array",elements:[{name:"number"}],raw:"number[]",required:!0}},{key:"name",value:{name:"string",required:!1}}]}}],raw:"{ data: number[]; name?: string }[]",required:!0}},{key:"xAxis",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!0}},{key:"yAxis",value:{name:"object",required:!0}}]}},description:""},theme:{required:!1,tsType:{name:"union",raw:"'light' | 'dark'",elements:[{name:"literal",value:"'light'"},{name:"literal",value:"'dark'"}]},description:"",defaultValue:{value:"'light'",computed:!1}}}};const P={component:p,title:"Charts/LineChart"},a={args:{chartData:{title:"Simple Line",series:[{data:[10,20,30,40,50]}],xAxis:["Jan","Feb","Mar","Apr","May"],yAxis:{}}}},t={args:{chartData:{title:"Multiple Series",series:[{name:"Trend A",data:[10,22,35,47,53,62]},{name:"Trend B",data:[8,18,29,41,52,60]},{name:"Trend C",data:[12,24,34,46,58,66]}],xAxis:["Jan","Feb","Mar","Apr","May","Jun"],yAxis:{}}}},n={args:{chartData:{title:"Long X-Axis",series:[{data:Array.from({length:24},(e,r)=>10+r*2)}],xAxis:Array.from({length:24},(e,r)=>`${r}:00`),yAxis:{}}}},s={args:{chartData:{title:"Large Numbers",series:[{name:"Q1-Q3",data:[100,500,1200,3e3,5e3,8e3,13e3]},{name:"Q4",data:[90,480,1100,3200,5200,7800,12500]}],xAxis:["W1","W2","W3","W4","W5","W6","W7"],yAxis:{}}}},i={args:{chartData:{title:"Negative Values",series:[{data:[10,-5,15,-10,20,-8,25]}],xAxis:["P1","P2","P3","P4","P5","P6","P7"],yAxis:{}}}},o={args:{chartData:{title:"Dense Points",series:[{data:Array.from({length:100},(e,r)=>Math.round(50+10*Math.sin(r/5)))}],xAxis:Array.from({length:100},(e,r)=>`#${r+1}`),yAxis:{}}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'Simple Line',
      series: [{
        data: [10, 20, 30, 40, 50]
      }],
      xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      yAxis: {}
    }
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'Multiple Series',
      series: [{
        name: 'Trend A',
        data: [10, 22, 35, 47, 53, 62]
      }, {
        name: 'Trend B',
        data: [8, 18, 29, 41, 52, 60]
      }, {
        name: 'Trend C',
        data: [12, 24, 34, 46, 58, 66]
      }],
      xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      yAxis: {}
    }
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'Long X-Axis',
      series: [{
        data: Array.from({
          length: 24
        }, (_, i) => 10 + i * 2)
      }],
      xAxis: Array.from({
        length: 24
      }, (_, i) => \`\${i}:00\`),
      yAxis: {}
    }
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'Large Numbers',
      series: [{
        name: 'Q1-Q3',
        data: [100, 500, 1200, 3000, 5000, 8000, 13000]
      }, {
        name: 'Q4',
        data: [90, 480, 1100, 3200, 5200, 7800, 12500]
      }],
      xAxis: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'],
      yAxis: {}
    }
  }
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'Negative Values',
      series: [{
        data: [10, -5, 15, -10, 20, -8, 25]
      }],
      xAxis: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7'],
      yAxis: {}
    }
  }
}`,...i.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'Dense Points',
      series: [{
        data: Array.from({
          length: 100
        }, (_, i) => Math.round(50 + 10 * Math.sin(i / 5)))
      }],
      xAxis: Array.from({
        length: 100
      }, (_, i) => \`#\${i + 1}\`),
      yAxis: {}
    }
  }
}`,...o.parameters?.docs?.source}}};const v=["Simple","MultipleSeries","LongXAxis","LargeNumbers","NegativeValues","DensePoints"];export{o as DensePoints,s as LargeNumbers,n as LongXAxis,t as MultipleSeries,i as NegativeValues,a as Simple,v as __namedExportsOrder,P as default};
