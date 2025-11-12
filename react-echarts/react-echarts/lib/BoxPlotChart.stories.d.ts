import { Meta, StoryObj } from '@storybook/react-vite';
import { default as BoxPlotChart } from './BoxPlotChart';
declare const meta: Meta<typeof BoxPlotChart>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Simple: Story;
export declare const Multiple: Story;
