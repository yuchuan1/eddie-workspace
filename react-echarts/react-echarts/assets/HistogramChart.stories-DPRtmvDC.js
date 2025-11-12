import{j as p,E as u}from"./index-CpemsT94.js";import{r as c}from"./iframe-BRs5tloK.js";import"./preload-helper-PPVm8Dsz.js";const y="_wrapperLight_6gi4n_1",x="_wrapperDark_6gi4n_1",A="_chart_6gi4n_1",o={wrapperLight:y,wrapperDark:x,chart:A},h=e=>({text:e,top:"1%"}),k=e=>({data:e.map(a=>a.name||"Series")}),f=e=>({left:"3%",right:"4%",bottom:"3%",top:"15%",containLabel:!0}),g=({chartData:e,theme:a="light"})=>{const l=c.useMemo(()=>{if(!e.series||e.series.length===0)return{};const m=e.series.length>1,d=e.series.map(r=>({type:"bar",name:r.name||"Bin",data:r.data,barCategoryGap:0,barWidth:"100%",...m?{barGap:"-100%",itemStyle:{opacity:.45}}:{},...r.markLine?{markLine:r.markLine}:{}}));return{title:h(e.title||"Histogram"),...e.series.length>1?{legend:{...k(e.series),top:"8%",left:"center"}}:{},grid:f(),tooltip:{trigger:"axis"},series:d,xAxis:Array.isArray(e.xAxis)?{type:"category",data:e.xAxis}:{type:"category",...e.xAxis},yAxis:{type:"value",...e.yAxis}}},[e]);return p.jsx("div",{className:a==="dark"?o.wrapperDark:o.wrapperLight,children:p.jsx(u,{option:l,theme:a,className:o.chart,notMerge:!0,lazyUpdate:!0})})};g.__docgenInfo={description:"",methods:[],displayName:"HistogramChart",props:{chartData:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  title?: string;
  legend?: { data: string[] };
  series: { data: number[]; name?: string; markLine?: unknown }[];
  xAxis: string[] | object;
  yAxis: object;
}`,signature:{properties:[{key:"title",value:{name:"string",required:!1}},{key:"legend",value:{name:"signature",type:"object",raw:"{ data: string[] }",signature:{properties:[{key:"data",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!0}}]},required:!1}},{key:"series",value:{name:"Array",elements:[{name:"signature",type:"object",raw:"{ data: number[]; name?: string; markLine?: unknown }",signature:{properties:[{key:"data",value:{name:"Array",elements:[{name:"number"}],raw:"number[]",required:!0}},{key:"name",value:{name:"string",required:!1}},{key:"markLine",value:{name:"unknown",required:!1}}]}}],raw:"{ data: number[]; name?: string; markLine?: unknown }[]",required:!0}},{key:"xAxis",value:{name:"union",raw:"string[] | object",elements:[{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"object"}],required:!0}},{key:"yAxis",value:{name:"object",required:!0}}]}},description:""},theme:{required:!1,tsType:{name:"union",raw:"'light' | 'dark'",elements:[{name:"literal",value:"'light'"},{name:"literal",value:"'dark'"}]},description:"",defaultValue:{value:"'light'",computed:!1}}}};const v={component:g,title:"Charts/HistogramChart"},t={args:{chartData:{title:"Simple Histogram",series:[{name:"Frequency",data:[5,41,65,93,57,56,49,37,23,14,4]}],xAxis:{type:"category",data:["0-10","10-20","20-30","30-40","40-50","50-60","60-70","70-80","80-90","90-100"]},yAxis:{}}}},n={args:{chartData:{title:"Histogram with Threshold",series:[{name:"Frequency",data:[5,41,65,93,57,56,49,37,23,14,4],markLine:{data:[{yAxis:30}]}}],xAxis:{type:"category",data:["0-10","10-20","20-30","30-40","40-50","50-60","60-70","70-80","80-90","90-100"]},yAxis:{}}}},s={args:{chartData:{title:"Large Data Histogram",series:[{name:"Counts",data:Array.from({length:20},()=>Math.floor(Math.random()*100))}],xAxis:{type:"category",data:Array.from({length:20},(e,a)=>`${a*5}-${(a+1)*5}`)},yAxis:{}}}},i={args:{chartData:{title:"Comparative Histograms",series:[{name:"Group A",data:[25,40,35,20,15,10,8,5,3,2]},{name:"Group B",data:[2,5,8,12,18,25,35,45,30,20]}],xAxis:{type:"category",data:["0-10","10-20","20-30","30-40","40-50","50-60","60-70","70-80","80-90","90-100"]},yAxis:{}}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'Simple Histogram',
      series: [{
        name: 'Frequency',
        data: [5, 41, 65, 93, 57, 56, 49, 37, 23, 14, 4]
      }],
      xAxis: {
        type: 'category',
        data: ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60', '60-70', '70-80', '80-90', '90-100']
      },
      yAxis: {}
    }
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'Histogram with Threshold',
      series: [{
        name: 'Frequency',
        data: [5, 41, 65, 93, 57, 56, 49, 37, 23, 14, 4],
        markLine: {
          data: [{
            yAxis: 30
          }]
        }
      }],
      xAxis: {
        type: 'category',
        data: ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60', '60-70', '70-80', '80-90', '90-100']
      },
      yAxis: {}
    }
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'Large Data Histogram',
      series: [{
        name: 'Counts',
        data: Array.from({
          length: 20
        }, () => Math.floor(Math.random() * 100))
      }],
      xAxis: {
        type: 'category',
        data: Array.from({
          length: 20
        }, (_, i) => \`\${i * 5}-\${(i + 1) * 5}\`)
      },
      yAxis: {}
    }
  }
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'Comparative Histograms',
      series: [{
        name: 'Group A',
        data: [25, 40, 35, 20, 15, 10, 8, 5, 3, 2] // Peak in 10-20 bin
      }, {
        name: 'Group B',
        data: [2, 5, 8, 12, 18, 25, 35, 45, 30, 20] // Peak in 70-80 bin
      }],
      xAxis: {
        type: 'category',
        data: ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60', '60-70', '70-80', '80-90', '90-100']
      },
      yAxis: {}
    }
  }
}`,...i.parameters?.docs?.source}}};const q=["Simple","WithMarkLine","LargeData","Comparative"];export{i as Comparative,s as LargeData,t as Simple,n as WithMarkLine,q as __namedExportsOrder,v as default};
