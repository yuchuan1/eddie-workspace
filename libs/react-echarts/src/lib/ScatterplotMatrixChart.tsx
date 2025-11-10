import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';

// Define types for scatterplot matrix chart data
type MatrixScatterChartData = {
  axisLabels: {
    x: string[];
    y: string[];
  };
  series: {
    name?: string;
    data: [number, number][];
  }[];
};

type ChartData = {
  title?: string;
} & MatrixScatterChartData;

// Helper to generate scatterplot matrix with diagonal histograms
const ScatterplotMatrixChart: React.FC<{
  chartData: ChartData;
  theme?: 'light' | 'dark';
}> = ({ chartData, theme = 'light' }) => {
  const gridSize = chartData.axisLabels.x.length;

  const grids = useMemo(() => {
    const result = [];
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        let option: EChartsOption;

        if (i === j) {
          // Diagonal: histogram of the variable
          const histData = chartData.series[i]?.data.map(([x]) => x) || [];
          // Simple histogram binning
          const bins = 10;
          const min = Math.min(...histData);
          const max = Math.max(...histData);
          const binSize = (max - min) / bins;
          const histogram = new Array(bins).fill(0);

          histData.forEach((value) => {
            const bin = Math.min(Math.floor((value - min) / binSize), bins - 1);
            histogram[bin]++;
          });

          const binLabels = Array.from(
            { length: bins },
            (_, idx) =>
              `${(min + idx * binSize).toFixed(1)}-${(
                min +
                (idx + 1) * binSize
              ).toFixed(1)}`
          );

          option = {
            grid: {
              left: '15%',
              right: '10%',
              top: '20%',
              bottom: '15%',
              containLabel: true,
            },
            xAxis: {
              type: 'category',
              data: binLabels,
              axisLabel: { rotate: 45 },
              ...(i === 0
                ? {
                    name: chartData.axisLabels.x[i],
                    nameLocation: 'middle',
                    nameGap: 30,
                  }
                : {}),
            },
            yAxis: {
              type: 'value',
              ...(j === 0
                ? {
                    name: chartData.axisLabels.y[i],
                    nameLocation: 'middle',
                    nameRotate: 90,
                    nameGap: 45,
                  }
                : {}),
            },
            series: [
              {
                type: 'bar',
                data: histogram,
                barWidth: '80%',
              },
            ],
          };
        } else {
          // Off-diagonal: scatter plot
          const scatterData =
            chartData.series.find(
              (s) =>
                s.name ===
                `${chartData.axisLabels.y[i]}_${chartData.axisLabels.x[j]}`
            )?.data || [];

          option = {
            grid: {
              left: '15%',
              right: '10%',
              top: '20%',
              bottom: '15%',
              containLabel: true,
            },
            xAxis: {
              type: 'value',
              ...(i === 0
                ? {
                    name: chartData.axisLabels.x[j],
                    nameLocation: 'middle',
                    nameGap: 30,
                  }
                : {}),
            },
            yAxis: {
              type: 'value',
              ...(j === 0
                ? {
                    name: chartData.axisLabels.y[i],
                    nameLocation: 'middle',
                    nameRotate: 90,
                    nameGap: 45,
                  }
                : {}),
            },
            series: [
              {
                type: 'scatter',
                data: scatterData,
                symbolSize: 3,
              },
            ],
          };
        }

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
      <h3
        style={{
          gridColumn: `1 / -1`,
          textAlign: 'center',
          margin: '10px 0',
          color: theme === 'dark' ? '#ffffff' : '#000000',
        }}
      >
        {chartData.title || 'Scatterplot Matrix'}
      </h3>
      {grids}
    </div>
  );
};

export default ScatterplotMatrixChart;
