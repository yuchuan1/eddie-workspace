import type { Meta, StoryObj } from '@storybook/react';
import ScatterChart from './ScatterChart';

const meta: Meta<typeof ScatterChart> = {
  component: ScatterChart,
  title: 'Charts/ScatterChart',
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1) Simple scatter with random points
export const Simple: Story = {
  args: {
    chartData: {
      title: 'Simple Scatter',
      series: [
        {
          name: 'Points',
          data: Array.from({ length: 50 }, () => [
            Math.random() * 100,
            Math.random() * 100,
          ]),
        },
      ],
      xAxis: {},
      yAxis: {},
    },
  },
};

// 2) Multiple series scatter
export const MultipleSeries: Story = {
  args: {
    chartData: {
      title: 'Multiple Series Scatter',
      series: [
        {
          name: 'Group A',
          data: Array.from({ length: 30 }, () => [
            Math.random() * 50,
            Math.random() * 50,
          ]),
        },
        {
          name: 'Group B',
          data: Array.from({ length: 30 }, () => [
            50 + Math.random() * 50,
            50 + Math.random() * 50,
          ]),
        },
      ],
      xAxis: {},
      yAxis: {},
    },
  },
};

// 3) Scatter with categorical data
export const Categorical: Story = {
  args: {
    chartData: {
      title: 'Categorical Scatter',
      series: [
        {
          name: 'Data',
          data: [
            [0, 20],
            [1, 30],
            [2, 25],
            [3, 35],
            [4, 40],
          ],
        },
      ],
      xAxis: { type: 'category', data: ['A', 'B', 'C', 'D', 'E'] },
      yAxis: {},
    },
  },
};

// 4) Dense scatter
export const Dense: Story = {
  args: {
    chartData: {
      title: 'Dense Scatter',
      series: [
        {
          name: 'Dense Points',
          data: Array.from({ length: 1000 }, () => [
            Math.random() * 100,
            Math.random() * 100,
          ]),
        },
      ],
      xAxis: {},
      yAxis: {},
    },
  },
};

// 5) Scatter with large numbers
export const LargeNumbers: Story = {
  args: {
    chartData: {
      title: 'Large Numbers Scatter',
      series: [
        {
          name: 'Large Data',
          data: Array.from({ length: 20 }, () => [
            Math.random() * 10000,
            Math.random() * 10000,
          ]),
        },
      ],
      xAxis: {},
      yAxis: {},
    },
  },
};
