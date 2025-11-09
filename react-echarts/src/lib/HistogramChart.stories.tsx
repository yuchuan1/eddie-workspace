import type { Meta, StoryObj } from '@storybook/react';
import HistogramChart from './HistogramChart';

const meta: Meta<typeof HistogramChart> = {
  component: HistogramChart,
  title: 'Charts/HistogramChart',
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1) Simple histogram
export const Simple: Story = {
  args: {
    chartData: {
      title: 'Simple Histogram',
      series: [
        {
          name: 'Frequency',
          data: [5, 41, 65, 93, 57, 56, 49, 37, 23, 14, 4],
        },
      ],
      xAxis: {
        type: 'category',
        data: ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60', '60-70', '70-80', '80-90', '90-100'],
      },
      yAxis: {},
    },
  },
};

// 2) Histogram with markLine
export const WithMarkLine: Story = {
  args: {
    chartData: {
      title: 'Histogram with Threshold',
      series: [
        {
          name: 'Frequency',
          data: [5, 41, 65, 93, 57, 56, 49, 37, 23, 14, 4],
          markLine: {
            data: [{ yAxis: 30 }],
          },
        },
      ],
      xAxis: {
        type: 'category',
        data: ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60', '60-70', '70-80', '80-90', '90-100'],
      },
      yAxis: {},
    },
  },
};

// 3) Large data histogram
export const LargeData: Story = {
  args: {
    chartData: {
      title: 'Large Data Histogram',
      series: [
        {
          name: 'Counts',
          data: Array.from({ length: 20 }, () => Math.floor(Math.random() * 100)),
        },
      ],
      xAxis: {
        type: 'category',
        data: Array.from({ length: 20 }, (_, i) => `${i * 5}-${(i + 1) * 5}`),
      },
      yAxis: {},
    },
  },
};

// 4) Comparative histograms
export const Comparative: Story = {
  args: {
    chartData: {
      title: 'Comparative Histograms',
      series: [
        {
          name: 'Group A',
          data: [25, 40, 35, 20, 15, 10, 8, 5, 3, 2], // Peak in 10-20 bin
        },
        {
          name: 'Group B',
          data: [2, 5, 8, 12, 18, 25, 35, 45, 30, 20], // Peak in 70-80 bin
        },
      ],
      xAxis: {
        type: 'category',
        data: ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60', '60-70', '70-80', '80-90', '90-100'],
      },
      yAxis: {},
    },
  },
};
