import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';

type MatrixScatterDataset = {
  name: string;
  data: number[];
  dp_groups?: string[];
};

type ChartData = {
  title?: string;
  dataset: MatrixScatterDataset[];
};

const PairwiseScatterGridChart: React.FC<{ chartData: ChartData; theme?: 'light' | 'dark' }> = ({ chartData, theme = 'light' }) => {
  const gridSize = chartData.dataset.length;

  const grids = useMemo(() => {
    const result = [] as React.ReactNode[];
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const xData = chartData.dataset[j].data;
        const yData = chartData.dataset[i].data;
        const scatterData = xData.map((x, idx) => [x, yData[idx]]);

        const option: EChartsOption = {
          grid: {
            left: '10%',
            right: '10%',
            top: '15%',
            bottom: '10%',
            containLabel: true,
          },
          xAxis: {
            type: 'value',
            name: j === 0 ? chartData.dataset[j].name : undefined,
            nameLocation: 'middle',
            nameGap: 25,
          },
          yAxis: {
            type: 'value',
            name: i === gridSize - 1 ? chartData.dataset[i].name : undefined,
            nameLocation: 'middle',
            nameGap: 35,
          },
          series: [
            {
              type: 'scatter',
              data: scatterData,
              symbolSize: 4,
            },
          ],
        };

        result.push(
          <div
            key={`${i}-${j}`}
            style={{
              gridRow: i + 1,
              gridColumn: j + 1,
              backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
              border: '1px solid #ddd',
              padding: '5px',
            }}
          >
            <ReactECharts
              option={option}
              theme={theme}
              style={{ height: '150px', width: '100%' }}
              notMerge={true}
              lazyUpdate={true}
            />
          </div>
        );
      }
    }
    return result;
  }, [chartData, theme, gridSize]);

  return (
    <div style={{ width: '100%', backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff', paddingTop: '8px' }}>
      <h3 style={{ textAlign: 'center', margin: '0 0 8px 0', color: theme === 'dark' ? '#ffffff' : '#000000' }}>
        {chartData.title || 'Pairwise Scatter Grid'}
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gap: '2px',
          width: '100%',
          height: `${gridSize * 160}px`,
          backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
        }}
      >
        {grids}
      </div>
    </div>
  );
};

export default PairwiseScatterGridChart;
