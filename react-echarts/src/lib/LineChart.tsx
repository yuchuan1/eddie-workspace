import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';
import styles from './LineChart.module.css';

type ChartData = {
  title?: string;
  legend?: { data: string[] };
  series: { data: number[], name?: string }[];
  xAxis: string[];
  yAxis: object;
};

const defaultTitle = (title: string) => ({ text: title, top: '1%' });
const defaultLegend = (series: ChartData['series']) => ({
  data: series.map(s => s.name || 'Series'),
});
const defaultGrid = (chartData: ChartData) => ({ left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true });

const LineChart: React.FC<{ chartData: ChartData; theme?: 'light' | 'dark' }> = ({ chartData, theme = 'light' }) => {
  const option: EChartsOption = useMemo(() => {
    if (!chartData.series || chartData.series.length === 0) {
      return {};
    }

    const seriesOption = chartData.series.map((s) => ({ type: 'line' as const, name: s.name || 'Series', data: s.data }));

    return {
      title: defaultTitle(chartData.title || 'Line Chart'),
      ...(chartData.series.length > 1 ? { legend: { ...defaultLegend(chartData.series), top: '8%', left: 'center' } } : {}),
      grid: defaultGrid(chartData),
      tooltip: { trigger: 'axis' },
      series: seriesOption,
      xAxis: { type: 'category', data: chartData.xAxis },
      yAxis: { type: 'value' },
      // Optional: comment the next line if you want animation in dev; setting false avoids double-anim perception
      // animation: false,
    } as EChartsOption;
  }, [chartData]);

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

export default LineChart;
