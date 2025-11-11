import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import React from 'react';

// Mock @uiw/react-codemirror to prevent import errors in tests
vi.mock('@uiw/react-codemirror', () => ({
  default: vi.fn().mockImplementation((props) => (
    React.createElement('div', { 'data-testid': 'codemirror-editor', ...props },
      React.createElement('textarea', {
        value: props.value || '',
        onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => props.onChange?.(e.target.value),
        placeholder: props.placeholder
      })
    )
  )),
}));

// Mock @codemirror/lang-python to prevent import errors
vi.mock('@codemirror/lang-python', () => ({
  python: vi.fn().mockReturnValue([]),
}));

// Mock @codemirror/theme-one-dark
vi.mock('@codemirror/theme-one-dark', () => ({
  oneDark: vi.fn().mockReturnValue({}),
}));

// Cleanup after each test
afterEach(() => {
  cleanup();
});
