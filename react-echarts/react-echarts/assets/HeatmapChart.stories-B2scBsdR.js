import{j as s,E as p}from"./index-CpemsT94.js";import{r as u}from"./iframe-BRs5tloK.js";import"./preload-helper-PPVm8Dsz.js";const c="_wrapperLight_6gi4n_1",d="_wrapperDark_6gi4n_1",g="_chart_6gi4n_1",n={wrapperLight:c,wrapperDark:d,chart:g},y=e=>({text:e,top:"1%"}),x=e=>({left:"15%",right:"4%",bottom:"3%",top:"15%",containLabel:!0}),i=({chartData:e,theme:r="light"})=>{const m=u.useMemo(()=>{if(!e.series||e.series.length===0)return{};const o=e.series.map(l=>({type:"heatmap",data:l.data}));return{title:y(e.title||"Heatmap"),grid:x(),tooltip:{trigger:"item"},visualMap:{min:0,max:10,calculable:!0,orient:"vertical",left:"5%",bottom:"10%",color:["#ff4500","#ff6b35","#ff8c42","#ffa366","#ffba8c","#ffd5b3"]},series:o,xAxis:Array.isArray(e.xAxis)?{type:"category",data:e.xAxis}:{type:"category",...e.xAxis},yAxis:{type:"category",...e.yAxis}}},[e]);return s.jsx("div",{className:r==="dark"?n.wrapperDark:n.wrapperLight,children:s.jsx(p,{option:m,theme:r,className:n.chart,notMerge:!0,lazyUpdate:!0})})};i.__docgenInfo={description:"",methods:[],displayName:"HeatmapChart",props:{chartData:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  title?: string;
  series: { data: [number, number, number][] }[]; // [x, y, value]
  xAxis: string[] | object;
  yAxis: object;
}`,signature:{properties:[{key:"title",value:{name:"string",required:!1}},{key:"series",value:{name:"Array",elements:[{name:"signature",type:"object",raw:"{ data: [number, number, number][] }",signature:{properties:[{key:"data",value:{name:"Array",elements:[{name:"tuple",raw:"[number, number, number]",elements:[{name:"number"},{name:"number"},{name:"number"}]}],raw:"[number, number, number][]",required:!0}}]}}],raw:"{ data: [number, number, number][] }[]",required:!0}},{key:"xAxis",value:{name:"union",raw:"string[] | object",elements:[{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"object"}],required:!0}},{key:"yAxis",value:{name:"object",required:!0}}]}},description:""},theme:{required:!1,tsType:{name:"union",raw:"'light' | 'dark'",elements:[{name:"literal",value:"'light'"},{name:"literal",value:"'dark'"}]},description:"",defaultValue:{value:"'light'",computed:!1}}}};const h={component:i,title:"Charts/HeatmapChart"},a={args:{chartData:{title:"Simple Heatmap",series:[{data:[[0,0,5],[1,0,1],[2,0,0],[3,0,0],[4,0,0],[0,1,5],[1,1,5],[2,1,0],[3,1,5],[4,1,0],[0,2,5],[1,2,5],[2,2,5],[3,2,5],[4,2,0],[0,3,5],[1,3,5],[2,3,5],[3,3,5],[4,3,0],[0,4,5],[1,4,5],[2,4,5],[3,4,5],[4,4,0]]}],xAxis:["A","B","C","D","E"],yAxis:{data:["1","2","3","4","5"]}}}},t={args:{chartData:{title:"Large Heatmap",series:[{data:Array.from({length:100},(e,r)=>[r%10,Math.floor(r/10),Math.random()*10])}],xAxis:Array.from({length:10},(e,r)=>`X${r}`),yAxis:{data:Array.from({length:10},(e,r)=>`Y${r}`)}}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'Simple Heatmap',
      series: [{
        data: [[0, 0, 5], [1, 0, 1], [2, 0, 0], [3, 0, 0], [4, 0, 0], [0, 1, 5], [1, 1, 5], [2, 1, 0], [3, 1, 5], [4, 1, 0], [0, 2, 5], [1, 2, 5], [2, 2, 5], [3, 2, 5], [4, 2, 0], [0, 3, 5], [1, 3, 5], [2, 3, 5], [3, 3, 5], [4, 3, 0], [0, 4, 5], [1, 4, 5], [2, 4, 5], [3, 4, 5], [4, 4, 0]]
      }],
      xAxis: ['A', 'B', 'C', 'D', 'E'],
      yAxis: {
        data: ['1', '2', '3', '4', '5']
      }
    }
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'Large Heatmap',
      series: [{
        data: Array.from({
          length: 100
        }, (_, i) => [i % 10, Math.floor(i / 10), Math.random() * 10])
      }],
      xAxis: Array.from({
        length: 10
      }, (_, i) => \`X\${i}\`),
      yAxis: {
        data: Array.from({
          length: 10
        }, (_, i) => \`Y\${i}\`)
      }
    }
  }
}`,...t.parameters?.docs?.source}}};const _=["Simple","Large"];export{t as Large,a as Simple,_ as __namedExportsOrder,h as default};
