import type { Meta, StoryObj } from '@storybook/react';
import MarginalPlotChart from './MarginalPlotChart';

const meta: Meta<typeof MarginalPlotChart> = {
  component: MarginalPlotChart,
  title: 'Charts/MarginalPlotChart',
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample marginal plot data
export const Simple: Story = {
  args: {
    chartData: {
      title: 'Marginal Plot',
      dataset: [
        {
          source: [
            [10, 20],
            [15, 25],
            [20, 30],
            [25, 35],
            [30, 40],
            [35, 45],
            [40, 50],
            [45, 55],
            [50, 60],
            [55, 65],
          ],
        },
      ],
    },
  },
};

// More complex marginal plot
export const Complex: Story = {
  args: {
    chartData: {
      title: 'Complex Marginal Plot',
      dataset: [
        {
          source: [
            [12, 18],
            [18, 22],
            [24, 28],
            [30, 35],
            [36, 42],
            [42, 48],
            [48, 52],
            [54, 58],
            [60, 62],
            [66, 68],
            [72, 75],
            [78, 80],
          ],
        },
      ],
    },
  },
};
