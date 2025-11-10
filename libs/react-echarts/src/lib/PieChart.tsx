import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';

// Define types for pie chart data
type ChartData = {
  title?: string;
  series: { data: [string, number][] | { name: string; value: number }[] }[];
};

// Migrated helper functions with types and logic from original pie-chart.ts
const defaultGrid = (chartData: ChartData) => ({
  left: '3%',
  right: '4%',
  bottom: '3%',
  top: '15%',
  containLabel: true,
});

const PieChart: React.FC<{
  chartData: ChartData;
  theme?: 'light' | 'dark';
}> = ({ chartData, theme = 'light' }) => {
  const option: EChartsOption = useMemo(() => {
    if (!chartData.series || chartData.series.length === 0) {
      return {};
    }

    const seriesOption = chartData.series.map((s) => ({
      type: 'pie' as const,
      data:
        Array.isArray(s.data) && s.data.length > 0 && Array.isArray(s.data[0])
          ? s.data.map(([name, value]) => ({ name, value }))
          : s.data,
    }));

    return {
      title: chartData.title,
      grid: defaultGrid(chartData),
      tooltip: { trigger: 'item' },
      series: seriesOption,
    } as EChartsOption;
  }, [chartData]);

  return (
    <div
      style={{
        backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
        padding: '10px',
        borderRadius: '4px',
      }}
    >
      <ReactECharts
        option={option}
        theme={theme}
        style={{ height: '400px' }}
        notMerge={true}
        lazyUpdate={true}
      />
    </div>
  );
};

export default PieChart;
