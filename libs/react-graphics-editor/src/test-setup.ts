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

// Mock CommandManager
vi.mock('./commands', () => ({
  CommandManager: vi.fn().mockImplementation(() => ({
    execute: vi.fn(),
    undo: vi.fn(() => null),
    redo: vi.fn(() => null),
    canUndo: vi.fn(() => false),
    canRedo: vi.fn(() => false),
    clear: vi.fn(),
    getUndoStack: vi.fn(() => []),
    getRedoStack: vi.fn(() => []),
  })),
  CreateShapeCommand: vi.fn(),
  DeleteShapeCommand: vi.fn(),
  UpdatePropertyCommand: vi.fn(),
}));

// Mock paper (Paper.js) to prevent canvas-related errors in tests
vi.mock('paper', () => ({
  default: {
    setup: vi.fn(),
    project: {
      clear: vi.fn(),
      activeLayer: {
        addChild: vi.fn(),
      },
      getItems: vi.fn(() => []),
      hitTest: vi.fn(() => null),
    },
    view: {
      update: vi.fn(),
      viewSize: { width: 800, height: 600 },
    },
    Path: {
      Rectangle: vi.fn(() => ({
        fillColor: null,
        strokeColor: null,
        strokeWidth: 1,
        position: { x: 0, y: 0 },
        bounds: { x: 0, y: 0, width: 100, height: 100 },
        remove: vi.fn(),
      })),
      Circle: vi.fn(() => ({
        fillColor: null,
        strokeColor: null,
        strokeWidth: 1,
        position: { x: 0, y: 0 },
        remove: vi.fn(),
      })),
    },
    PointText: vi.fn(() => ({
      content: '',
      fillColor: null,
      fontSize: 16,
      position: { x: 0, y: 0 },
      remove: vi.fn(),
    })),
    Group: vi.fn(() => ({
      addChild: vi.fn(),
      remove: vi.fn(),
    })),
    Point: vi.fn((x = 0, y = 0) => ({ x, y })),
    Size: vi.fn((width = 0, height = 0) => ({ width, height })),
    Rectangle: vi.fn((point, size) => ({
      x: point?.x || 0,
      y: point?.y || 0,
      width: size?.width || 0,
      height: size?.height || 0,
      center: { x: (point?.x || 0) + (size?.width || 0) / 2, y: (point?.y || 0) + (size?.height || 0) / 2 },
      intersects: vi.fn(() => false),
      unite: vi.fn(() => ({ x: 0, y: 0, width: 0, height: 0 })),
    })),
    Color: vi.fn((r = 0, g = 0, b = 0) => ({
      red: r,
      green: g,
      blue: b,
      toCSS: vi.fn(() => `rgb(${r}, ${g}, ${b})`),
    })),
  },
}));

// Mock the react-graphics-editor module to prevent Paper.js operations
vi.mock('./lib/react-graphics-editor', () => ({
  ReactGraphicsEditor: vi.fn(() => null),
}), { virtual: true });

// Cleanup after each test
afterEach(() => {
  cleanup();
});
