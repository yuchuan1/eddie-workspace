import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';

type ChartData = {
  title?: string;
  legend?: { data: string[] };
  series: { data: number[] }[];
  xAxis: string[];
  yAxis: object;
};

const defaultTitle = (title: string) => ({ text: title });
const defaultLegend = (title: string) => ({ data: [title] });
const defaultGrid = (chartData: ChartData) => ({ left: '3%', right: '4%', bottom: '3%', containLabel: true });

const LineChart: React.FC<{ chartData: ChartData }> = ({ chartData }) => {
  const option: EChartsOption = useMemo(() => {
    if (!chartData.series || chartData.series.length === 0) {
      return {};
    }

    const seriesOption = chartData.series.map((s) => ({ type: 'line' as const, data: s.data }));

    return {
      title: defaultTitle(chartData.title || 'Line Chart'),
      legend: defaultLegend(chartData.title || 'Series'),
      grid: defaultGrid(chartData),
      tooltip: { trigger: 'axis' },
      series: seriesOption,
      xAxis: { type: 'category', data: chartData.xAxis },
      yAxis: { type: 'value' },
      // Optional: comment the next line if you want animation in dev; setting false avoids double-anim perception
      // animation: false,
    } as EChartsOption;
  }, [chartData]);

  return <ReactECharts option={option} style={{ height: '400px' }} notMerge={true} lazyUpdate={true} />;
};

export default LineChart;
