import{j as u,E as y}from"./index-CpemsT94.js";import{r as A}from"./iframe-BRs5tloK.js";import"./preload-helper-PPVm8Dsz.js";const b="_wrapperLight_1o2w2_1",k="_wrapperDark_1o2w2_6",v="_chart_1o2w2_11",p={wrapperLight:b,wrapperDark:k,chart:v},h=e=>({text:e,top:"1%"}),S=e=>({data:e.map(a=>a.name||"Series")}),w=e=>({left:"3%",right:"4%",bottom:"3%",top:"15%",containLabel:!0}),d=({chartData:e,theme:a="light",orientation:c="vertical"})=>{const g=A.useMemo(()=>{if(!e.series||e.series.length===0)return{};const x=e.series.map(r=>({type:"bar",name:r.name||"Series",data:r.data,...r.stack?{stack:r.stack}:{}}));return{title:h(e.title||"Bar Chart"),...e.series.length>1?{legend:{...S(e.series),top:"8%",left:"center"}}:{},grid:w(),tooltip:{trigger:"axis"},series:x,xAxis:c==="horizontal"?{type:"value",...e.xAxis}:Array.isArray(e.xAxis)?{type:"category",data:e.xAxis}:{type:"category",...e.xAxis},yAxis:c==="horizontal"?Array.isArray(e.xAxis)?{type:"category",data:e.xAxis}:{type:"category",...e.xAxis}:{type:"value",...e.yAxis}}},[e,c]);return u.jsx("div",{className:a==="dark"?p.wrapperDark:p.wrapperLight,children:u.jsx(y,{option:g,theme:a,className:p.chart,notMerge:!0,lazyUpdate:!0})})};d.__docgenInfo={description:"",methods:[],displayName:"BarChart",props:{chartData:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  title?: string;
  legend?: { data: string[] };
  series: {
    data: (number | [string, number] | { value: [number, string] })[];
    stack?: string;
    name?: string;
  }[];
  xAxis: string[] | object;
  yAxis: object;
}`,signature:{properties:[{key:"title",value:{name:"string",required:!1}},{key:"legend",value:{name:"signature",type:"object",raw:"{ data: string[] }",signature:{properties:[{key:"data",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!0}}]},required:!1}},{key:"series",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  data: (number | [string, number] | { value: [number, string] })[];
  stack?: string;
  name?: string;
}`,signature:{properties:[{key:"data",value:{name:"Array",elements:[{name:"unknown"}],raw:"(number | [string, number] | { value: [number, string] })[]",required:!0}},{key:"stack",value:{name:"string",required:!1}},{key:"name",value:{name:"string",required:!1}}]}}],raw:`{
  data: (number | [string, number] | { value: [number, string] })[];
  stack?: string;
  name?: string;
}[]`,required:!0}},{key:"xAxis",value:{name:"union",raw:"string[] | object",elements:[{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"object"}],required:!0}},{key:"yAxis",value:{name:"object",required:!0}}]}},description:""},theme:{required:!1,tsType:{name:"union",raw:"'light' | 'dark'",elements:[{name:"literal",value:"'light'"},{name:"literal",value:"'dark'"}]},description:"",defaultValue:{value:"'light'",computed:!1}},orientation:{required:!1,tsType:{name:"union",raw:"'vertical' | 'horizontal'",elements:[{name:"literal",value:"'vertical'"},{name:"literal",value:"'horizontal'"}]},description:"",defaultValue:{value:"'vertical'",computed:!1}}}};const q={component:d,title:"Charts/BarChart",argTypes:{orientation:{control:{type:"select",options:["vertical","horizontal"]}}}},t={args:{chartData:{title:"Simple Bar",series:[{data:[10,20,30,40,50]}],xAxis:["Jan","Feb","Mar","Apr","May"],yAxis:{}}}},n={args:{chartData:{title:"Multiple Series",series:[{name:"Series A",data:[10,22,35,47,53,62]},{name:"Series B",data:[8,18,29,41,52,60]},{name:"Series C",data:[12,24,34,46,58,66]}],xAxis:["Jan","Feb","Mar","Apr","May","Jun"],yAxis:{}}}},s={args:{chartData:{title:"Stacked Bar",series:[{data:[10,22,35,47,53],stack:"total"},{data:[8,18,29,41,52],stack:"total"},{data:[12,24,34,46,58],stack:"total"}],xAxis:["Jan","Feb","Mar","Apr","May"],yAxis:{}}}},i={args:{chartData:{title:"Large Numbers",series:[{name:"Q1-Q3",data:[100,500,1200,3e3,5e3,8e3,13e3]},{name:"Q4",data:[90,480,1100,3200,5200,7800,12500]}],xAxis:["W1","W2","W3","W4","W5","W6","W7"],yAxis:{}}}},o={args:{chartData:{title:"Negative Values",series:[{data:[10,-5,15,-10,20]}],xAxis:["A","B","C","D","E"],yAxis:{}}}},l={args:{chartData:{title:"Complex Data",series:[{name:"Frequency",data:[["2024-06-21",6],["2024-07-20",5],["2024-08-19",4],["2024-11-14",4],["2024-07-31",3],["2024-09-13",3],["2024-10-08",3],["2024-05-17",2],["2024-07-13",2],["2024-07-15",2]]}],xAxis:{type:"category",name:"Dates",nameLocation:"middle",nameGap:35},yAxis:{type:"value",name:"Count",nameLocation:"middle",nameGap:45}}}},m={args:{orientation:"horizontal",chartData:{title:"Horizontal Bar",series:[{data:[10,20,30,40,50]}],xAxis:["Jan","Feb","Mar","Apr","May"],yAxis:{}}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'Simple Bar',
      series: [{
        data: [10, 20, 30, 40, 50]
      }],
      xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      yAxis: {}
    }
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'Multiple Series',
      series: [{
        name: 'Series A',
        data: [10, 22, 35, 47, 53, 62]
      }, {
        name: 'Series B',
        data: [8, 18, 29, 41, 52, 60]
      }, {
        name: 'Series C',
        data: [12, 24, 34, 46, 58, 66]
      }],
      xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      yAxis: {}
    }
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'Stacked Bar',
      series: [{
        data: [10, 22, 35, 47, 53],
        stack: 'total'
      }, {
        data: [8, 18, 29, 41, 52],
        stack: 'total'
      }, {
        data: [12, 24, 34, 46, 58],
        stack: 'total'
      }],
      xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      yAxis: {}
    }
  }
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'Negative Values',
      series: [{
        data: [10, -5, 15, -10, 20]
      }],
      xAxis: ['A', 'B', 'C', 'D', 'E'],
      yAxis: {}
    }
  }
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    chartData: {
      title: 'Complex Data',
      series: [{
        name: 'Frequency',
        data: [['2024-06-21', 6], ['2024-07-20', 5], ['2024-08-19', 4], ['2024-11-14', 4], ['2024-07-31', 3], ['2024-09-13', 3], ['2024-10-08', 3], ['2024-05-17', 2], ['2024-07-13', 2], ['2024-07-15', 2]]
      }],
      xAxis: {
        type: 'category',
        name: 'Dates',
        nameLocation: 'middle',
        nameGap: 35
      },
      yAxis: {
        type: 'value',
        name: 'Count',
        nameLocation: 'middle',
        nameGap: 45
      }
    }
  }
}`,...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    orientation: 'horizontal',
    chartData: {
      title: 'Horizontal Bar',
      series: [{
        data: [10, 20, 30, 40, 50]
      }],
      xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      yAxis: {}
    }
  }
}`,...m.parameters?.docs?.source}}};const B=["Simple","MultipleSeries","Stacked","LargeNumbers","NegativeValues","ComplexData","Horizontal"];export{l as ComplexData,m as Horizontal,i as LargeNumbers,n as MultipleSeries,o as NegativeValues,t as Simple,s as Stacked,B as __namedExportsOrder,q as default};
