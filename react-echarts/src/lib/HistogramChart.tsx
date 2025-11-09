import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';

// Define types for histogram chart data
type ChartData = {
  title?: string;
  legend?: { data: string[] };
  series: { data: number[]; name?: string; markLine?: any }[];
  xAxis: string[] | object;
  yAxis: object;
};

// Migrated helper functions with types and logic from original histogram-chart.ts
const defaultTitle = (title: string) => ({ text: title, top: '1%' });
const defaultLegend = (series: ChartData['series']) => ({
  data: series.map(s => s.name || 'Series'),
});
const defaultGrid = (chartData: ChartData) => ({ left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true });

const HistogramChart: React.FC<{ chartData: ChartData; theme?: 'light' | 'dark' }> = ({ chartData, theme = 'light' }) => {
  const option: EChartsOption = useMemo(() => {
    if (!chartData.series || chartData.series.length === 0) {
      return {};
    }

    const multi = chartData.series.length > 1;
    const seriesOption = chartData.series.map((s) => ({
      type: 'bar' as const,
      name: s.name || 'Bin',
      data: s.data,
      barCategoryGap: 0, // No gaps between bins for proper histogram
      barWidth: multi ? '100%' : '100%', // Full width to eliminate gaps
      ...(multi
        ? { barGap: '-100%', itemStyle: { opacity: 0.45 } }
        : {}),
      ...(s.markLine ? { markLine: s.markLine } : {}),
    }));

    return {
      title: defaultTitle(chartData.title || 'Histogram'),
      ...(chartData.series.length > 1 ? { legend: { ...defaultLegend(chartData.series), top: '8%', left: 'center' } } : {}),
      grid: defaultGrid(chartData),
      tooltip: { trigger: 'axis' },
      series: seriesOption,
      xAxis: Array.isArray(chartData.xAxis)
        ? { type: 'category', data: chartData.xAxis }
        : { type: 'category', ...chartData.xAxis },
      yAxis: { type: 'value', ...chartData.yAxis },
    } as EChartsOption;
  }, [chartData]);

  return (
    <div style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff', padding: '10px', borderRadius: '4px' }}>
      <ReactECharts option={option} theme={theme} style={{ height: '400px' }} notMerge={true} lazyUpdate={true} />
    </div>
  );
};

export default HistogramChart;
