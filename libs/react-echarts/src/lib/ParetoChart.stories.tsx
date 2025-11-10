import type { Meta, StoryObj } from '@storybook/react-vite';
import ParetoChart from './ParetoChart';

const meta: Meta<typeof ParetoChart> = {
  component: ParetoChart,
  title: 'Charts/ParetoChart',
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1) Simple pareto chart
export const Simple: Story = {
  args: {
    chartData: {
      title: 'Pareto Analysis',
      series: [
        {
          name: 'Issues',
          type: 'bar',
          data: [25, 18, 12, 10, 8, 6, 5, 4, 3, 2],
        },
        {
          name: 'Cumulative',
          type: 'line',
          data: [25, 43, 55, 65, 73, 79, 84, 88, 91, 93],
        },
      ],
      xAxis: [
        'Issue1',
        'Issue2',
        'Issue3',
        'Issue4',
        'Issue5',
        'Issue6',
        'Issue7',
        'Issue8',
        'Issue9',
        'Issue10',
      ],
      yAxis: [
        { type: 'value', name: 'Count' },
        { type: 'value', name: 'Cumulative %', position: 'right' },
      ],
    },
  },
};
