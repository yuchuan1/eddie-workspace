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

// Mock paper (Paper.js) to prevent canvas-related errors in tests
vi.mock('paper', () => ({
  setup: vi.fn(),
  project: {
    clear: vi.fn(),
  },
  view: {
    viewSize: {},
  },
  Path: {
    Rectangle: vi.fn(() => ({})),
    Line: vi.fn(() => ({})),
    Circle: vi.fn(() => ({})),
  },
  PointText: vi.fn(() => ({})),
  Group: vi.fn(() => ({
    addChild: vi.fn(),
  })),
  Point: vi.fn(() => ({})),
  Size: vi.fn(() => ({})),
  Rectangle: vi.fn(() => ({})),
  Color: vi.fn(() => ({})),
}));

// Cleanup after each test
afterEach(() => {
  cleanup();
});
