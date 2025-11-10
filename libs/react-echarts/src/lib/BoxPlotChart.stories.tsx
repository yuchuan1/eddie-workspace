import type { Meta, StoryObj } from '@storybook/react-vite';
import BoxPlotChart from './BoxPlotChart';

const meta: Meta<typeof BoxPlotChart> = {
  component: BoxPlotChart,
  title: 'Charts/BoxPlotChart',
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1) Simple box plot
export const Simple: Story = {
  args: {
    chartData: {
      title: 'Simple Box Plot',
      dataset: [
        {
          source: [
            ['Category', 'min', 'Q1', 'median', 'Q3', 'max'],
            ['A', 10, 15, 20, 25, 30],
            ['B', 12, 17, 22, 27, 32],
            ['C', 8, 13, 18, 23, 28],
          ],
        },
      ],
      series: [
        {
          type: 'boxplot',
          datasetIndex: 0,
        },
      ],
      xAxis: { data: ['A', 'B', 'C'] },
      yAxis: {},
    },
  },
};

// 2) Multiple box plots
export const Multiple: Story = {
  args: {
    chartData: {
      title: 'Multiple Box Plots',
      dataset: [
        {
          source: [
            ['Category', 'min', 'Q1', 'median', 'Q3', 'max'],
            ['Group 1', 10, 15, 20, 25, 30],
            ['Group 2', 12, 17, 22, 27, 32],
            ['Group 3', 8, 13, 18, 23, 28],
            ['Group 4', 14, 19, 24, 29, 34],
          ],
        },
      ],
      series: [
        {
          type: 'boxplot',
          datasetIndex: 0,
        },
      ],
      xAxis: { data: ['Group 1', 'Group 2', 'Group 3', 'Group 4'] },
      yAxis: {},
    },
  },
};
