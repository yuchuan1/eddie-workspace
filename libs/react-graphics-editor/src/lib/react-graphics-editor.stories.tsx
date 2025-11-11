import type { Meta, StoryObj } from '@storybook/react';
import { ReactGraphicsEditor } from './react-graphics-editor';

const meta: Meta<typeof ReactGraphicsEditor> = {
  component: ReactGraphicsEditor,
  title: 'React Graphics Editor',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A vector graphics editor component with canvas-based drawing capabilities.',
      },
    },
  },
  argTypes: {
    width: {
      control: { type: 'number', min: 200, max: 1200, step: 50 },
      description: 'Canvas width in pixels',
    },
    height: {
      control: { type: 'number', min: 200, max: 800, step: 50 },
      description: 'Canvas height in pixels',
    },
    backgroundColor: {
      control: 'color',
      description: 'Canvas background color',
    },
    showGrid: {
      control: 'boolean',
      description: 'Show grid lines on canvas',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ReactGraphicsEditor>;

export const Default: Story = {
  args: {
    width: 800,
    height: 600,
    backgroundColor: '#ffffff',
    showGrid: true,
  },
};

export const LightTheme: Story = {
  args: {
    ...Default.args,
    backgroundColor: '#f8f9fa',
  },
};

export const SmallCanvas: Story = {
  args: {
    width: 400,
    height: 300,
    backgroundColor: '#ffffff',
    showGrid: true,
  },
};

export const LargeCanvas: Story = {
  args: {
    width: 1200,
    height: 800,
    backgroundColor: '#ffffff',
    showGrid: true,
  },
};

export const NoGrid: Story = {
  args: {
    ...Default.args,
    showGrid: false,
  },
};

export const DarkBackground: Story = {
  args: {
    ...Default.args,
    backgroundColor: '#2d3748',
  },
};
