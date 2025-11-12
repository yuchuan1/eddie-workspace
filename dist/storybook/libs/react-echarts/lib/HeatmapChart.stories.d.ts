import { Meta, StoryObj } from '@storybook/react-vite';
import { default as HeatmapChart } from './HeatmapChart';
declare const meta: Meta<typeof HeatmapChart>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Simple: Story;
export declare const Large: Story;
