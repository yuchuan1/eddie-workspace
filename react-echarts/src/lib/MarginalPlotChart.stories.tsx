import type { Meta, StoryObj } from '@storybook/react';
import MarginalPlotChart from './MarginalPlotChart';

const meta: Meta<typeof MarginalPlotChart> = {
  component: MarginalPlotChart,
  title: 'Charts/MarginalPlotChart',
  argTypes: {
    bins: { control: { type: 'number', min: 5, max: 40, step: 1 } },
    normalize: { control: 'boolean' },
    linkPointer: { control: 'boolean' },
    showMarginalLabels: { control: 'boolean' },
    theme: { control: { type: 'radio' }, options: ['light', 'dark'] },
    height: { control: { type: 'number', min: 300, max: 900, step: 10 } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const simpleDataset = [
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
];

// Sample marginal plot data
export const Simple: Story = {
  args: {
    chartData: {
      title: 'Marginal Plot',
      dataset: simpleDataset,
    },
    theme: 'light',
    linkPointer: true,
  },
};

// Bimodal distribution (two clusters)
export const Bimodal: Story = {
  args: {
    chartData: {
      title: 'Bimodal Marginal Plot',
      dataset: [
        {
          // cluster around (20, 25)
          source: [
            [14, 18],
            [16, 22],
            [18, 24],
            [20, 26],
            [22, 28],
            [24, 30],
          ],
        },
        {
          // cluster around (60, 70)
          source: [
            [54, 66],
            [58, 68],
            [60, 70],
            [62, 72],
            [66, 74],
            [70, 76],
          ],
        },
      ],
    },
    bins: 8,
    theme: 'light',
  },
};

export const WithLabels: Story = {
  args: {
    chartData: { title: 'With Marginal Labels', dataset: simpleDataset },
    theme: 'light',
    linkPointer: true,
    showMarginalLabels: true,
  },
};

export const Density: Story = {
  args: {
    chartData: { title: 'Density Marginals', dataset: simpleDataset },
    bins: 12,
    theme: 'light',
    normalize: true,
  },
};

export const CustomBinsColors: Story = {
  args: {
    chartData: { title: 'Custom Bins & Colors', dataset: simpleDataset },
    bins: 15,
    colors: { xHist: '#8bc34a', yHist: '#455a64' },
  },
};

export const LinkedOff: Story = {
  args: {
    chartData: { title: 'No Linked Pointers', dataset: simpleDataset },
    theme: 'light',
    linkPointer: false,
  },
};

export const Tall: Story = {
  args: {
    chartData: { title: 'Tall', dataset: simpleDataset },
    bins: 12,
    theme: 'light',
    height: 640,
  },
};

// Nonlinear trend (quadratic)
export const Nonlinear: Story = {
  args: {
    chartData: {
      title: 'Nonlinear (Quadratic) Trend',
      dataset: [
        {
          source: [
            [0, 0],
            [5, 1],
            [10, 4],
            [15, 9],
            [20, 16],
            [25, 25],
            [30, 36],
            [35, 49],
            [40, 64],
            [45, 81],
          ],
        },
      ],
    },
    bins: 10,
    theme: 'light',
  },
};

// Skewed X distribution (heavier left tail)
export const Skewed: Story = {
  args: {
    chartData: {
      title: 'Skewed X Distribution',
      dataset: [
        {
          source: [
            [2, 12],
            [3, 14],
            [4, 18],
            [6, 20],
            [9, 24],
            [13, 28],
            [20, 30],
            [30, 34],
            [45, 36],
            [65, 38],
          ],
        },
      ],
    },
    bins: 12,
    theme: 'light',
  },
};
