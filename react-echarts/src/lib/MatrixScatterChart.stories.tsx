import type { Meta, StoryObj } from '@storybook/react';
import PairwiseScatterGridChart from './PairwiseScatterGridChart';

const meta: Meta<typeof PairwiseScatterGridChart> = {
  component: PairwiseScatterGridChart,
  title: 'Charts/PairwiseScatterGridChart',
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample matrix scatter data
export const Simple: Story = {
  args: {
    chartData: {
      title: 'Pairwise Scatter Grid',
      dataset: [
        {
          name: 'Variable A',
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
        {
          name: 'Variable B',
          data: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
        },
        {
          name: 'Variable C',
          data: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19],
        },
      ],
    },
  },
};
