import type { Meta, StoryObj } from '@storybook/react';
import ReactCodeEditor from './react-code-editor';

const meta: Meta<typeof ReactCodeEditor> = {
  title: 'Components/ReactCodeEditor',
  component: ReactCodeEditor,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A powerful Python code editor component with syntax highlighting, execution capabilities, and output management.',
      },
    },
  },
  argTypes: {
    initialCode: {
      control: 'text',
      description: 'Initial code to display in the editor',
    },
    theme: {
      control: { type: 'select', options: ['light', 'dark'] },
      description: 'Theme for the code editor',
    },
    enableRunButton: {
      control: 'boolean',
      description: 'Whether to show the run button',
    },
    onCodeChange: { action: 'codeChanged' },
    onRun: { action: 'codeRun' },
    endExecution: {
      control: 'boolean',
      description: 'Signal execution completion',
    },
    appendStdout: {
      control: 'text',
      description: 'Append to stdout output',
    },
    appendStderr: {
      control: 'text',
      description: 'Append to stderr output',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ReactCodeEditor>;

export const Default: Story = {
  args: {
    initialCode: 'print("Hello, World!")\n\n# Try writing some Python code here',
    theme: 'dark',
    enableRunButton: true,
  },
};

export const LightTheme: Story = {
  args: {
    initialCode: 'def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)\n\nprint(fibonacci(10))',
    theme: 'light',
    enableRunButton: true,
  },
};

export const NoRunButton: Story = {
  args: {
    initialCode: '# Code editor in read-only mode\nx = 42\ny = x * 2\nprint(f"x = {x}, y = {y}")',
    theme: 'dark',
    enableRunButton: false,
  },
};

export const WithOutput: Story = {
  args: {
    initialCode: 'print("This will show output below")',
    theme: 'dark',
    enableRunButton: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the output panels that appear after code execution.',
      },
    },
  },
};
