import { Meta, StoryObj } from '@storybook/react-vite';
import { default as HistogramChart } from './HistogramChart';
declare const meta: Meta<typeof HistogramChart>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Simple: Story;
export declare const WithMarkLine: Story;
export declare const LargeData: Story;
export declare const Comparative: Story;
