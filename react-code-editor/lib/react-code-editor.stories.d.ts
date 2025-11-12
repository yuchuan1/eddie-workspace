import { Meta, StoryObj } from '@storybook/react';
import { default as ReactCodeEditor } from './react-code-editor';
declare const meta: Meta<typeof ReactCodeEditor>;
export default meta;
type Story = StoryObj<typeof ReactCodeEditor>;
export declare const Default: Story;
export declare const LightTheme: Story;
export declare const NoRunButton: Story;
export declare const WithOutput: Story;
