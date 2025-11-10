import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';
import styles from './BarChart.module.css';

// Define types for bar chart data, based on migration from original bar-chart.ts
type ChartData = {
  title?: string;
  legend?: { data: string[] };
  series: { data: (number | [string, number] | {value: [number, string]})[]; stack?: string; name?: string }[];
  xAxis: string[] | object;
  yAxis: object;
};

// Migrated helper functions with types and logic from original bar-chart.ts
const defaultTitle = (title: string) => ({ text: title, top: '1%' });
const defaultLegend = (series: ChartData['series']) => ({
  data: series.map(s => s.name || 'Series'),
});
const defaultGrid = (chartData: ChartData) => ({ left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true });

const BarChart: React.FC<{ chartData: ChartData; theme?: 'light' | 'dark'; orientation?: 'vertical' | 'horizontal' }> = ({ chartData, theme = 'light', orientation = 'vertical' }) => {
  const option: EChartsOption = useMemo(() => {
    if (!chartData.series || chartData.series.length === 0) {
      return {};
    }

    const seriesOption = chartData.series.map((s) => ({
      type: 'bar' as const,
      name: s.name || 'Series',
      data: s.data,
      ...(s.stack ? { stack: s.stack } : {}),
    }));

    return {
      title: defaultTitle(chartData.title || 'Bar Chart'),
      ...(chartData.series.length > 1 ? { legend: { ...defaultLegend(chartData.series), top: '8%', left: 'center' } } : {}),
      grid: defaultGrid(chartData),
      tooltip: { trigger: 'axis' },
      series: seriesOption,
      xAxis: orientation === 'horizontal'
        ? { type: 'value', ...chartData.xAxis }
        : Array.isArray(chartData.xAxis)
        ? { type: 'category', data: chartData.xAxis }
        : { type: 'category', ...chartData.xAxis },
      yAxis: orientation === 'horizontal'
        ? Array.isArray(chartData.xAxis)
          ? { type: 'category', data: chartData.xAxis }
          : { type: 'category', ...chartData.xAxis }
        : { type: 'value', ...chartData.yAxis },
    } as EChartsOption;
  }, [chartData, orientation]);

  return (
    <div className={theme === 'dark' ? styles.wrapperDark : styles.wrapperLight}>
      <ReactECharts
        option={option}
        theme={theme}
        className={styles.chart}
        notMerge={true}
        lazyUpdate={true}
      />
    </div>
  );
};

export default BarChart;
