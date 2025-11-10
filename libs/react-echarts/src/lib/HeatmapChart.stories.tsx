import type { Meta, StoryObj } from '@storybook/react';
import HeatmapChart from './HeatmapChart';

const meta: Meta<typeof HeatmapChart> = {
  component: HeatmapChart,
  title: 'Charts/HeatmapChart',
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1) Simple heatmap
export const Simple: Story = {
  args: {
    chartData: {
      title: 'Simple Heatmap',
      series: [
        {
          data: [
            [0, 0, 5],
            [1, 0, 1],
            [2, 0, 0],
            [3, 0, 0],
            [4, 0, 0],
            [0, 1, 5],
            [1, 1, 5],
            [2, 1, 0],
            [3, 1, 5],
            [4, 1, 0],
            [0, 2, 5],
            [1, 2, 5],
            [2, 2, 5],
            [3, 2, 5],
            [4, 2, 0],
            [0, 3, 5],
            [1, 3, 5],
            [2, 3, 5],
            [3, 3, 5],
            [4, 3, 0],
            [0, 4, 5],
            [1, 4, 5],
            [2, 4, 5],
            [3, 4, 5],
            [4, 4, 0],
          ],
        },
      ],
      xAxis: ['A', 'B', 'C', 'D', 'E'],
      yAxis: { data: ['1', '2', '3', '4', '5'] },
    },
  },
};

// 2) Large heatmap
export const Large: Story = {
  args: {
    chartData: {
      title: 'Large Heatmap',
      series: [
        {
          data: Array.from({ length: 100 }, (_, i) => [
            i % 10,
            Math.floor(i / 10),
            Math.random() * 10,
          ]),
        },
      ],
      xAxis: Array.from({ length: 10 }, (_, i) => `X${i}`),
      yAxis: { data: Array.from({ length: 10 }, (_, i) => `Y${i}`) },
    },
  },
};
