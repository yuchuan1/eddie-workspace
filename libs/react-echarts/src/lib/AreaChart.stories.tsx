import type { Meta, StoryObj } from '@storybook/react-vite';
import AreaChart from './AreaChart';

const meta: Meta<typeof AreaChart> = {
  component: AreaChart,
  title: 'Charts/AreaChart',
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1) Simple area chart
export const Simple: Story = {
  args: {
    chartData: {
      title: 'Simple Area',
      series: [{ data: [10, 20, 30, 40, 50] }],
      xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      yAxis: {},
    },
  },
};

// 2) Multiple series area chart
export const MultipleSeries: Story = {
  args: {
    chartData: {
      title: 'Multiple Area Series',
      series: [
        { name: 'Series A', data: [10, 22, 35, 47, 53] },
        { name: 'Series B', data: [8, 18, 29, 41, 52] },
      ],
      xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      yAxis: {},
    },
  },
};

// 3) Stacked area chart
export const Stacked: Story = {
  args: {
    chartData: {
      title: 'Stacked Area',
      series: [
        { name: 'Bottom', data: [10, 22, 35, 47, 53], stack: 'total' },
        { name: 'Top', data: [20, 30, 25, 40, 60], stack: 'total' },
      ],
      xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      yAxis: {},
    },
  },
};
