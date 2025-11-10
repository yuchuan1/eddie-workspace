import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';
import styles from './HeatmapChart.module.css';

// Define types for heatmap chart data
type ChartData = {
  title?: string;
  series: { data: [number, number, number][] }[]; // [x, y, value]
  xAxis: string[] | object;
  yAxis: object;
};

// Migrated helper functions with types and logic from original heatmap-chart.ts
const defaultTitle = (title: string) => ({ text: title, top: '1%' });
const defaultGrid = (chartData: ChartData) => ({
  left: '15%',
  right: '4%',
  bottom: '3%',
  top: '15%',
  containLabel: true,
});

const HeatmapChart: React.FC<{
  chartData: ChartData;
  theme?: 'light' | 'dark';
}> = ({ chartData, theme = 'light' }) => {
  const option: EChartsOption = useMemo(() => {
    if (!chartData.series || chartData.series.length === 0) {
      return {};
    }

    const seriesOption = chartData.series.map((s) => ({
      type: 'heatmap' as const,
      data: s.data,
    }));

    return {
      title: defaultTitle(chartData.title || 'Heatmap'),
      grid: defaultGrid(chartData),
      tooltip: { trigger: 'item' },
      visualMap: {
        min: 0,
        max: 10,
        calculable: true,
        orient: 'vertical',
        left: '5%',
        bottom: '10%',
        color: ['#ff4500', '#ff6b35', '#ff8c42', '#ffa366', '#ffba8c', '#ffd5b3'],
      },
      series: seriesOption,
      xAxis: Array.isArray(chartData.xAxis)
        ? { type: 'category', data: chartData.xAxis }
        : { type: 'category', ...chartData.xAxis },
      yAxis: { type: 'category', ...chartData.yAxis },
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

export default HeatmapChart;
