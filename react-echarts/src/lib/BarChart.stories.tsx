import type { Meta, StoryObj } from '@storybook/react';
import BarChart from './BarChart';

const meta: Meta<typeof BarChart> = {
  component: BarChart,
  title: 'Charts/BarChart',
  argTypes: {
    orientation: {
      control: { type: 'select', options: ['vertical', 'horizontal'] },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1) Simple single-series bar chart
export const Simple: Story = {
  args: {
    chartData: {
      title: 'Simple Bar',
      series: [{ data: [10, 20, 30, 40, 50] }],
      xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      yAxis: {},
    },
  },
};

// 2) Multiple series bar chart
export const MultipleSeries: Story = {
  args: {
    chartData: {
      title: 'Multiple Series',
      series: [
        { name: 'Series A', data: [10, 22, 35, 47, 53, 62] },
        { name: 'Series B', data: [8, 18, 29, 41, 52, 60] },
        { name: 'Series C', data: [12, 24, 34, 46, 58, 66] },
      ],
      xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      yAxis: {},
    },
  },
};

// 3) Stacked bar chart
export const Stacked: Story = {
  args: {
    chartData: {
      title: 'Stacked Bar',
      series: [
        { data: [10, 22, 35, 47, 53], stack: 'total' },
        { data: [8, 18, 29, 41, 52], stack: 'total' },
        { data: [12, 24, 34, 46, 58], stack: 'total' },
      ],
      xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
        { name: 'Q1-Q3', data: [100, 500, 1200, 3000, 5000, 8000, 13000] },
        { name: 'Q4', data: [90, 480, 1100, 3200, 5200, 7800, 12500] },
      ],
      xAxis: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'],
      yAxis: {},
    },
  },
};

// 5) Negative values bar chart
export const NegativeValues: Story = {
  args: {
    chartData: {
      title: 'Negative Values',
      series: [
        { data: [10, -5, 15, -10, 20] },
      ],
      xAxis: ['A', 'B', 'C', 'D', 'E'],
      yAxis: {},
    },
  },
};

// 7) Complex data with [date, value] pairs (demo-style)
export const ComplexData: Story = {
  args: {
    chartData: {
      title: 'Complex Data',
      series: [
        {
          name: 'Frequency',
          data: [
            ['2024-06-21', 6],
            ['2024-07-20', 5],
            ['2024-08-19', 4],
            ['2024-11-14', 4],
            ['2024-07-31', 3],
            ['2024-09-13', 3],
            ['2024-10-08', 3],
            ['2024-05-17', 2],
            ['2024-07-13', 2],
            ['2024-07-15', 2],
          ],
        },
      ],
      xAxis: {
        type: 'category',
        name: 'Dates',
        nameLocation: 'middle',
        nameGap: 35,
      },
      yAxis: {
        type: 'value',
        name: 'Count',
        nameLocation: 'middle',
        nameGap: 45,
      },
    },
  },
};

// 8) Horizontal bar chart
export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    chartData: {
      title: 'Horizontal Bar',
      series: [{ data: [10, 20, 30, 40, 50] }],
      xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      yAxis: {},
    },
  },
};
