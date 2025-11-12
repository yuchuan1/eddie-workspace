import{j as q,E as V}from"./index-CpemsT94.js";import{r as O}from"./iframe-BRs5tloK.js";import"./preload-helper-PPVm8Dsz.js";const X="_wrapperLight_1jfki_1",$="_wrapperDark_1jfki_6",F="_chart_1jfki_11",D={wrapperLight:X,wrapperDark:$,chart:F},_=({chartData:a,theme:r="light",bins:L,normalize:S=!1,linkPointer:P=!0,showMarginalLabels:k=!1,colors:M,height:C})=>{const j=O.useMemo(()=>{if(!a.dataset||a.dataset.length===0)return{};const o=a.dataset.flatMap(e=>e?.source??[]),s=o.map(e=>e[0]),n=o.map(e=>e[1]),T=o.length,N=s.length?Math.min(...s):0,B=s.length?Math.max(...s):1,E=n.length?Math.min(...n):0,W=n.length?Math.max(...n):1,z=Math.max(5,Math.min(20,L??Math.ceil(Math.sqrt(Math.max(1,T))))),v=(e,l=z)=>{if(e.length===0)return{labels:[],counts:[]};const c=Math.min(...e),m=(Math.max(...e)-c)/l||1,I=new Array(l).fill(0);e.forEach(i=>{const u=Math.min(Math.floor((i-c)/m),l-1);I[u]++});const G=I.map(i=>S?i/(Math.max(1,T)*m):i);return{labels:Array.from({length:l},(i,u)=>`${(c+u*m).toFixed(1)}-${(c+(u+1)*m).toFixed(1)}`),counts:G}},A=v(s),H=v(n);return{title:{text:a.title||"Marginal Plot",top:"0%",left:"center"},grid:[{left:"10%",right:"25%",top:"28%",bottom:"15%",containLabel:!0},{left:"10%",right:"25%",top:"10%",bottom:"78%",containLabel:!0},{left:"78%",right:"5%",top:"28%",bottom:"15%",containLabel:!0}],axisPointer:P?{link:[{xAxisIndex:[0,1]},{yAxisIndex:[0,2]}],snap:!0,type:"cross"}:void 0,xAxis:[{type:"value",gridIndex:0,min:N,max:B,splitLine:{show:!0}},{type:"category",gridIndex:1,data:A.labels,axisLabel:{show:k},axisTick:{show:!1},axisLine:{show:!1},splitLine:{show:!1}},{type:"value",gridIndex:2,show:!1}],yAxis:[{type:"value",gridIndex:0,min:E,max:W,splitLine:{show:!0}},{type:"value",gridIndex:1,splitLine:{show:!1}},{type:"category",gridIndex:2,data:H.labels,axisLabel:{show:k},axisTick:{show:!1},axisLine:{show:!1},splitLine:{show:!1}}],series:[{type:"scatter",name:"Scatter",xAxisIndex:0,yAxisIndex:0,data:o,symbolSize:6,itemStyle:{opacity:.9},emphasis:{focus:"self"},blur:{itemStyle:{opacity:.25}}},{type:"bar",name:"X Histogram",xAxisIndex:1,yAxisIndex:1,data:A.counts,barWidth:"99.3%",barCategoryGap:"0%",barGap:"0%",label:{show:!1},itemStyle:{color:M?.xHist??(r==="dark"?"#9AD533":"#a7cc39"),opacity:.9},emphasis:{focus:"self"},blur:{itemStyle:{opacity:.3}}},{type:"bar",name:"Y Histogram",xAxisIndex:2,yAxisIndex:2,data:H.counts,barWidth:"99.3%",barCategoryGap:"0%",barGap:"0%",label:{show:!1},itemStyle:{color:M?.yHist??(r==="dark"?"#4C5473":"#4c5473"),opacity:.9},emphasis:{focus:"self"},blur:{itemStyle:{opacity:.3}}}],tooltip:{trigger:"item",axisPointer:{type:"shadow"}}}},[a,r,L,S,P,k,M]);return q.jsx("div",{className:r==="dark"?D.wrapperDark:D.wrapperLight,children:q.jsx(V,{option:j,theme:r,className:D.chart,style:C?{height:`${C}px`}:void 0,notMerge:!0,lazyUpdate:!0})})};_.__docgenInfo={description:"",methods:[],displayName:"MarginalPlotChart",props:{chartData:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  title?: string;
  dataset: { source: [number, number][] }[];
}`,signature:{properties:[{key:"title",value:{name:"string",required:!1}},{key:"dataset",value:{name:"Array",elements:[{name:"signature",type:"object",raw:"{ source: [number, number][] }",signature:{properties:[{key:"source",value:{name:"Array",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}],raw:"[number, number][]",required:!0}}]}}],raw:"{ source: [number, number][] }[]",required:!0}}]}},description:""},theme:{required:!1,tsType:{name:"union",raw:"'light' | 'dark'",elements:[{name:"literal",value:"'light'"},{name:"literal",value:"'dark'"}]},description:"",defaultValue:{value:"'light'",computed:!1}},bins:{required:!1,tsType:{name:"number"},description:""},normalize:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},linkPointer:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},showMarginalLabels:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},colors:{required:!1,tsType:{name:"signature",type:"object",raw:"{ xHist?: string; yHist?: string }",signature:{properties:[{key:"xHist",value:{name:"string",required:!1}},{key:"yHist",value:{name:"string",required:!1}}]}},description:""},height:{required:!1,tsType:{name:"number"},description:""}}};const K={component:_,title:"Charts/MarginalPlotChart",argTypes:{bins:{control:{type:"number",min:5,max:40,step:1}},normalize:{control:"boolean"},linkPointer:{control:"boolean"},showMarginalLabels:{control:"boolean"},theme:{control:{type:"radio"},options:["light","dark"]},height:{control:{type:"number",min:300,max:900,step:10}}}},t=[{source:[[10,20],[15,25],[20,30],[25,35],[30,40],[35,45],[40,50],[45,55],[50,60],[55,65]]}],p={args:{chartData:{title:"Marginal Plot",dataset:t},theme:"light",linkPointer:!0}},d={args:{chartData:{title:"Bimodal Marginal Plot",dataset:[{source:[[14,18],[16,22],[18,24],[20,26],[22,28],[24,30]]},{source:[[54,66],[58,68],[60,70],[62,72],[66,74],[70,76]]}]},bins:8,theme:"light"}},h={args:{chartData:{title:"With Marginal Labels",dataset:t},theme:"light",linkPointer:!0,showMarginalLabels:!0}},g={args:{chartData:{title:"Density Marginals",dataset:t},bins:12,theme:"light",normalize:!0}},y={args:{chartData:{title:"Custom Bins & Colors",dataset:t},bins:15,colors:{xHist:"#8bc34a",yHist:"#455a64"}}},b={args:{chartData:{title:"No Linked Pointers",dataset:t},theme:"light",linkPointer:!1}},x={args:{chartData:{title:"Tall",dataset:t},bins:12,theme:"light",height:640}},f={args:{chartData:{title:"Nonlinear (Quadratic) Trend",dataset:[{source:[[0,0],[5,1],[10,4],[15,9],[20,16],[25,25],[30,36],[35,49],[40,64],[45,81]]}]},bins:10,theme:"light"}},w={args:{chartData:{title:"Skewed X Distribution",dataset:[{source:[[2,12],[3,14],[4,18],[6,20],[9,24],[13,28],[20,30],[30,34],[45,36],[65,38]]}]},bins:12,theme:"light"}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'Marginal Plot',
      dataset: simpleDataset
    },
    theme: 'light',
    linkPointer: true
  }
}`,...p.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'Bimodal Marginal Plot',
      dataset: [{
        // cluster around (20, 25)
        source: [[14, 18], [16, 22], [18, 24], [20, 26], [22, 28], [24, 30]]
      }, {
        // cluster around (60, 70)
        source: [[54, 66], [58, 68], [60, 70], [62, 72], [66, 74], [70, 76]]
      }]
    },
    bins: 8,
    theme: 'light'
  }
}`,...d.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'With Marginal Labels',
      dataset: simpleDataset
    },
    theme: 'light',
    linkPointer: true,
    showMarginalLabels: true
  }
}`,...h.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'Density Marginals',
      dataset: simpleDataset
    },
    bins: 12,
    theme: 'light',
    normalize: true
  }
}`,...g.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'Custom Bins & Colors',
      dataset: simpleDataset
    },
    bins: 15,
    colors: {
      xHist: '#8bc34a',
      yHist: '#455a64'
    }
  }
}`,...y.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'No Linked Pointers',
      dataset: simpleDataset
    },
    theme: 'light',
    linkPointer: false
  }
}`,...b.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'Tall',
      dataset: simpleDataset
    },
    bins: 12,
    theme: 'light',
    height: 640
  }
}`,...x.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'Nonlinear (Quadratic) Trend',
      dataset: [{
        source: [[0, 0], [5, 1], [10, 4], [15, 9], [20, 16], [25, 25], [30, 36], [35, 49], [40, 64], [45, 81]]
      }]
    },
    bins: 10,
    theme: 'light'
  }
}`,...f.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'Skewed X Distribution',
      dataset: [{
        source: [[2, 12], [3, 14], [4, 18], [6, 20], [9, 24], [13, 28], [20, 30], [30, 34], [45, 36], [65, 38]]
      }]
    },
    bins: 12,
    theme: 'light'
  }
}`,...w.parameters?.docs?.source}}};const Z=["Simple","Bimodal","WithLabels","Density","CustomBinsColors","LinkedOff","Tall","Nonlinear","Skewed"];export{d as Bimodal,y as CustomBinsColors,g as Density,b as LinkedOff,f as Nonlinear,p as Simple,w as Skewed,x as Tall,h as WithLabels,Z as __namedExportsOrder,K as default};
