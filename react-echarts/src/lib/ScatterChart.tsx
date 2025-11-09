import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';

// Define types for scatter chart data
type ChartData = {
  title?: string;
  legend?: { data: string[] };
  series: { data: (number | [string | number, string | number] | {value: [string | number, string | number]})[]; name?: string }[];
  xAxis: string[] | object;
  yAxis: object;
};

// Migrated helper functions with types and logic from original scatter-chart.ts
const defaultTitle = (title: string) => ({ text: title, top: '1%' });
const defaultLegend = (series: ChartData['series']) => ({
  data: series.map(s => s.name || 'Series'),
});
const defaultGrid = (chartData: ChartData) => ({ left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true });

const ScatterChart: React.FC<{ chartData: ChartData; theme?: 'light' | 'dark' }> = ({ chartData, theme = 'light' }) => {
  const option: EChartsOption = useMemo(() => {
    if (!chartData.series || chartData.series.length === 0) {
      return {};
    }

    const seriesOption = chartData.series.map((s) => ({
      type: 'scatter' as const,
      name: s.name || 'Series',
      data: s.data,
    }));

    return {
      title: defaultTitle(chartData.title || 'Scatter Chart'),
      ...(chartData.series.length > 1 ? { legend: { ...defaultLegend(chartData.series), top: '8%', left: 'center' } } : {}),
      grid: defaultGrid(chartData),
      tooltip: { trigger: 'item' },
      series: seriesOption,
      xAxis: Array.isArray(chartData.xAxis)
        ? { type: 'value', data: chartData.xAxis }
        : { type: 'value', ...chartData.xAxis },
      yAxis: { type: 'value', ...chartData.yAxis },
    } as EChartsOption;
  }, [chartData]);

  return (
    <div style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff', padding: '10px', borderRadius: '4px' }}>
      <ReactECharts option={option} theme={theme} style={{ height: '400px' }} notMerge={true} lazyUpdate={true} />
    </div>
  );
};

export default ScatterChart;
