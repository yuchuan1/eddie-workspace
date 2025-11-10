import type { Meta, StoryObj } from '@storybook/react-vite';
import ScatterplotMatrixChart from './ScatterplotMatrixChart';

const meta: Meta<typeof ScatterplotMatrixChart> = {
  component: ScatterplotMatrixChart,
  title: 'Charts/ScatterplotMatrixChart',
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample scatterplot matrix data
export const Simple: Story = {
  args: {
    chartData: {
      title: 'Scatterplot Matrix',
      axisLabels: {
        x: ['Temp1', 'Temp2', 'Temp3'],
        y: ['Temp1', 'Temp2', 'Temp3'],
      },
      series: [
        // Diagonal histograms (Temp1, Temp2, Temp3 distributions)
        {
          name: 'Temp1_hist',
          data: [
            [20, 0],
            [21, 0],
            [22, 0],
            [23, 0],
            [24, 0],
            [25, 0],
          ],
        },
        {
          name: 'Temp2_hist',
          data: [
            [18, 0],
            [19, 0],
            [20, 0],
            [21, 0],
            [22, 0],
          ],
        },
        {
          name: 'Temp3_hist',
          data: [
            [19, 0],
            [20, 0],
            [21, 0],
            [22, 0],
            [23, 0],
          ],
        },
        // Off-diagonal scatters
        {
          name: 'Temp1_Temp2',
          data: [
            [20, 18],
            [21, 19],
            [22, 20],
            [23, 21],
            [24, 22],
            [25, 23],
          ],
        },
        {
          name: 'Temp1_Temp3',
          data: [
            [20, 19],
            [21, 20],
            [22, 21],
            [23, 22],
            [24, 23],
            [25, 24],
          ],
        },
        {
          name: 'Temp2_Temp3',
          data: [
            [18, 19],
            [19, 20],
            [20, 21],
            [21, 22],
            [22, 23],
          ],
        },
        {
          name: 'Temp2_Temp1',
          data: [
            [18, 20],
            [19, 21],
            [20, 22],
            [21, 23],
            [22, 24],
          ],
        },
        {
          name: 'Temp3_Temp1',
          data: [
            [19, 20],
            [20, 21],
            [21, 22],
            [22, 23],
            [23, 24],
          ],
        },
        {
          name: 'Temp3_Temp2',
          data: [
            [19, 18],
            [20, 19],
            [21, 20],
            [22, 21],
            [23, 22],
          ],
        },
      ],
    },
  },
};
