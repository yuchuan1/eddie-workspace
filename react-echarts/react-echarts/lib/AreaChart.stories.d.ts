import { Meta, StoryObj } from '@storybook/react-vite';
import { default as AreaChart } from './AreaChart';
declare const meta: Meta<typeof AreaChart>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Simple: Story;
export declare const MultipleSeries: Story;
export declare const Stacked: Story;
