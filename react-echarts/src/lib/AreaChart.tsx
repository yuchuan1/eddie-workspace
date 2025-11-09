import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';

// Define types for area chart data, similar to line
type ChartData = {
  title?: string;
  legend?: { data: string[] };
  series: { data: number[]; name?: string; stack?: string }[];
  xAxis: string[];
  yAxis: object;
};

// Migrated helper functions from line-chart.ts
const defaultTitle = (title: string) => ({ text: title, top: '1%' });
const defaultLegend = (series: ChartData['series']) => ({
  data: series.map(s => s.name || 'Series'),
});
const defaultGrid = (chartData: ChartData) => ({ left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true });

const AreaChart: React.FC<{ chartData: ChartData; theme?: 'light' | 'dark' }> = ({ chartData, theme = 'light' }) => {
  const option: EChartsOption = useMemo(() => {
    if (!chartData.series || chartData.series.length === 0) {
      return {};
    }

    const seriesOption = chartData.series.map((s) => ({
      type: 'line' as const,
      name: s.name || 'Series',
      data: s.data,
      areaStyle: {}, // Enable area fill
      ...(s.stack ? { stack: s.stack } : {}),
    }));

    return {
      title: defaultTitle(chartData.title || 'Area Chart'),
      ...(chartData.series.length > 1 ? { legend: { ...defaultLegend(chartData.series), top: '8%', left: 'center' } } : {}),
      grid: defaultGrid(chartData),
      tooltip: { trigger: 'axis' },
      series: seriesOption,
      xAxis: { type: 'category', data: chartData.xAxis },
      yAxis: { type: 'value' },
    } as EChartsOption;
  }, [chartData]);

  return (
    <div style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff', padding: '10px', borderRadius: '4px' }}>
      <ReactECharts option={option} theme={theme} style={{ height: '400px' }} notMerge={true} lazyUpdate={true} />
    </div>
  );
};

export default AreaChart;
