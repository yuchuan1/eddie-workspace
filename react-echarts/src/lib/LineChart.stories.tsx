import type { Meta, StoryObj } from '@storybook/react';
import LineChart from './LineChart';

const meta: Meta<typeof LineChart> = {
  component: LineChart,
  title: 'Charts/LineChart',
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1) Simple single-series (baseline)
export const Simple: Story = {
  args: {
    chartData: {
      title: 'Simple Line',
      series: [{ data: [10, 20, 30, 40, 50] }],
      xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      yAxis: {},
    },
  },
};

// 2) Multiple series (akin to multiple scenarios in the demo)
export const MultipleSeries: Story = {
  args: {
    chartData: {
      title: 'Multiple Series',
      series: [
        { data: [10, 22, 35, 47, 53, 62] },
        { data: [8, 18, 29, 41, 52, 60] },
        { data: [12, 24, 34, 46, 58, 66] },
      ],
      xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      yAxis: {},
    },
  },
};

// 3) Long X-Axis (dashboard-like dense categories)
export const LongXAxis: Story = {
  args: {
    chartData: {
      title: 'Long X-Axis',
      series: [
        { data: Array.from({ length: 24 }, (_, i) => 10 + i * 2) },
      ],
      xAxis: Array.from({ length: 24 }, (_, i) => `${i}:00`),
      yAxis: {},
    },
  },
};

// 4) Large / varied numbers (statistics-like)
export const LargeNumbers: Story = {
  args: {
    chartData: {
      title: 'Large Numbers',
      series: [
        { data: [100, 500, 1200, 3000, 5000, 8000, 13000] },
        { data: [90, 480, 1100, 3200, 5200, 7800, 12500] },
      ],
      xAxis: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'],
      yAxis: {},
    },
  },
};

// 5) Negative values (trace-like dips below baseline)
export const NegativeValues: Story = {
  args: {
    chartData: {
      title: 'Negative Values',
      series: [
        { data: [10, -5, 15, -10, 20, -8, 25] },
      ],
      xAxis: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7'],
      yAxis: {},
    },
  },
};

// 6) Dense points (wire-bond / x-chart style density)
export const DensePoints: Story = {
  args: {
    chartData: {
      title: 'Dense Points',
      series: [
        { data: Array.from({ length: 100 }, (_, i) => Math.round(50 + 10 * Math.sin(i / 5))) },
      ],
      xAxis: Array.from({ length: 100 }, (_, i) => `#${i + 1}`),
      yAxis: {},
    },
  },
};
