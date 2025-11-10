import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';
import styles from './MarginalPlotChart.module.css';

// Define types for marginal plot chart data
type ChartData = {
  title?: string;
  dataset: { source: [number, number][] }[];
};

type MarginalPlotProps = {
  chartData: ChartData;
  theme?: 'light' | 'dark';
  bins?: number; // override adaptive bins
  normalize?: boolean; // show density instead of counts
  linkPointer?: boolean; // link pointers across grids
  showMarginalLabels?: boolean; // show labels on marginal axes
  colors?: { xHist?: string; yHist?: string };
  height?: number; // chart height in px
};

// Helper to create marginal plot with scatter and histograms
const MarginalPlotChart: React.FC<MarginalPlotProps> = ({
  chartData,
  theme = 'light',
  bins,
  normalize = false,
  linkPointer = true,
  showMarginalLabels = false,
  colors,
  height,
}) => {
  const option: EChartsOption = useMemo(() => {
    if (!chartData.dataset || chartData.dataset.length === 0) return {};

    const source = chartData.dataset.flatMap((d) => d?.source ?? []);
    const xs = source.map((d) => d[0]);
    const ys = source.map((d) => d[1]);
    const n = source.length;
    const xMin = xs.length ? Math.min(...xs) : 0;
    const xMax = xs.length ? Math.max(...xs) : 1;
    const yMin = ys.length ? Math.min(...ys) : 0;
    const yMax = ys.length ? Math.max(...ys) : 1;

    // Adaptive bins using sqrt rule, clamped. Allow override via prop.
    const binCount = Math.max(
      5,
      Math.min(20, bins ?? Math.ceil(Math.sqrt(Math.max(1, n))))
    );

    const makeHistogram = (values: number[], bc = binCount) => {
      if (values.length === 0) return { labels: [], counts: [] };
      const min = Math.min(...values);
      const max = Math.max(...values);
      const width = (max - min) / bc || 1;
      const counts = new Array(bc).fill(0);
      values.forEach((v) => {
        const idx = Math.min(Math.floor((v - min) / width), bc - 1);
        counts[idx]++;
      });
      // density if normalize: count / (N * binWidth)
      const densities = counts.map((c) =>
        normalize ? c / (Math.max(1, n) * width) : c
      );
      const labels = Array.from(
        { length: bc },
        (_, i) =>
          `${(min + i * width).toFixed(1)}-${(min + (i + 1) * width).toFixed(
            1
          )}`
      );
      return { labels, counts: densities };
    };

    const xHist = makeHistogram(xs);
    const yHist = makeHistogram(ys);

    return {
      title: {
        text: chartData.title || 'Marginal Plot',
        top: '0%',
        left: 'center',
      },
      grid: [
        {
          left: '10%',
          right: '25%',
          top: '28%',
          bottom: '15%',
          containLabel: true,
        },
        {
          left: '10%',
          right: '25%',
          top: '10%',
          bottom: '78%',
          containLabel: true,
        },
        {
          left: '78%',
          right: '5%',
          top: '28%',
          bottom: '15%',
          containLabel: true,
        },
      ],
      axisPointer: linkPointer
        ? {
            link: [{ xAxisIndex: [0, 1] }, { yAxisIndex: [0, 2] }],
            snap: true,
            type: 'cross',
          }
        : undefined,
      xAxis: [
        {
          type: 'value',
          gridIndex: 0,
          min: xMin,
          max: xMax,
          splitLine: { show: true },
        },
        {
          type: 'category',
          gridIndex: 1,
          data: xHist.labels,
          axisLabel: { show: showMarginalLabels },
          axisTick: { show: false },
          axisLine: { show: false },
          splitLine: { show: false },
        },
        { type: 'value', gridIndex: 2, show: false },
      ],
      yAxis: [
        {
          type: 'value',
          gridIndex: 0,
          min: yMin,
          max: yMax,
          splitLine: { show: true },
        },
        { type: 'value', gridIndex: 1, splitLine: { show: false } },
        {
          type: 'category',
          gridIndex: 2,
          data: yHist.labels,
          axisLabel: { show: showMarginalLabels },
          axisTick: { show: false },
          axisLine: { show: false },
          splitLine: { show: false },
        },
      ],
      series: [
        {
          type: 'scatter',
          name: 'Scatter',
          xAxisIndex: 0,
          yAxisIndex: 0,
          data: source,
          symbolSize: 6,
          itemStyle: { opacity: 0.9 },
          emphasis: { focus: 'self' },
          blur: { itemStyle: { opacity: 0.25 } },
        },
        {
          type: 'bar',
          name: 'X Histogram',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: xHist.counts,
          barWidth: '99.3%',
          barCategoryGap: '0%',
          barGap: '0%',
          label: { show: false },
          itemStyle: {
            color: colors?.xHist ?? (theme === 'dark' ? '#9AD533' : '#a7cc39'),
            opacity: 0.9,
          },
          emphasis: { focus: 'self' },
          blur: { itemStyle: { opacity: 0.3 } },
        },
        {
          type: 'bar',
          name: 'Y Histogram',
          xAxisIndex: 2,
          yAxisIndex: 2,
          data: yHist.counts,
          barWidth: '99.3%',
          barCategoryGap: '0%',
          barGap: '0%',
          label: { show: false },
          itemStyle: {
            color: colors?.yHist ?? (theme === 'dark' ? '#4C5473' : '#4c5473'),
            opacity: 0.9,
          },
          emphasis: { focus: 'self' },
          blur: { itemStyle: { opacity: 0.3 } },
        },
      ],
      tooltip: { trigger: 'item', axisPointer: { type: 'shadow' } },
    } as EChartsOption;
  }, [
    chartData,
    theme,
    bins,
    normalize,
    linkPointer,
    showMarginalLabels,
    colors,
  ]);

  return (
    <div
      className={theme === 'dark' ? styles.wrapperDark : styles.wrapperLight}
    >
      <ReactECharts
        option={option}
        theme={theme}
        className={styles.chart}
        style={height ? { height: `${height}px` } : undefined}
        notMerge={true}
        lazyUpdate={true}
      />
    </div>
  );
};

export default MarginalPlotChart;
