import { Meta, StoryObj } from '@storybook/react-vite';
import { default as PieChart } from './PieChart';
declare const meta: Meta<typeof PieChart>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Simple: Story;
export declare const ObjectData: Story;
export declare const Large: Story;
