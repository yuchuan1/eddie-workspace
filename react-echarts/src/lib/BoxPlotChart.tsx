import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';

// Define types for box plot chart data
type ChartData = {
  title?: string;
  dataset?: { source: (string | number)[][] }[];
  series: { type: 'boxplot'; datasetIndex?: number }[];
  xAxis: object;
  yAxis: object;
};

// Migrated helper functions with types and logic from original box-plot-chart.ts
const defaultTitle = (title: string) => ({ text: title, top: '1%' });
const defaultGrid = (chartData: ChartData) => ({ left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true });

const BoxPlotChart: React.FC<{ chartData: ChartData; theme?: 'light' | 'dark' }> = ({ chartData, theme = 'light' }) => {
  const option: EChartsOption = useMemo(() => {
    if (!chartData.series || chartData.series.length === 0) {
      return {};
    }

    return {
      title: defaultTitle(chartData.title || 'Box Plot'),
      grid: defaultGrid(chartData),
      tooltip: { trigger: 'item' },
      dataset: chartData.dataset,
      series: chartData.series,
      xAxis: { type: 'category', ...chartData.xAxis },
      yAxis: { type: 'value', ...chartData.yAxis },
    } as EChartsOption;
  }, [chartData]);

  return (
    <div style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff', padding: '10px', borderRadius: '4px' }}>
      <ReactECharts option={option} theme={theme} style={{ height: '400px' }} notMerge={true} lazyUpdate={true} />
    </div>
  );
};

export default BoxPlotChart;
