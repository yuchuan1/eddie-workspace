import type { Meta, StoryObj } from '@storybook/react';
import PieChart from './PieChart';

const meta: Meta<typeof PieChart> = {
  component: PieChart,
  title: 'Charts/PieChart',
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1) Simple pie chart
export const Simple: Story = {
  args: {
    chartData: {
      title: { text: 'Simple Pie' },
      series: [
        {
          data: [
            ['A', 10],
            ['B', 20],
            ['C', 30],
          ],
        },
      ],
    },
  },
};

// 2) Pie chart with object data
export const ObjectData: Story = {
  args: {
    chartData: {
      title: { text: 'Pie with Objects' },
      series: [
        {
          data: [
            { name: 'Category A', value: 15 },
            { name: 'Category B', value: 25 },
            { name: 'Category C', value: 35 },
            { name: 'Category D', value: 25 },
          ],
        },
      ],
    },
  },
};

// 3) Large pie chart
export const Large: Story = {
  args: {
    chartData: {
      title: { text: 'Large Pie' },
      series: [
        {
          data: [
            ['X', 100],
            ['Y', 200],
            ['Z', 150],
            ['W', 50],
            ['V', 75],
          ],
        },
      ],
    },
  },
};
