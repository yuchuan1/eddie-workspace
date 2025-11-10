import { beforeAll, vi } from 'vitest';

// Mock ECharts DOM dimension issues in tests
beforeAll(() => {
  // Mock getBoundingClientRect to return fixed dimensions
  Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', {
    writable: true,
    value: vi.fn().mockReturnValue({
      width: 800,
      height: 400,
      top: 0,
      left: 0,
      bottom: 400,
      right: 800,
    }),
  });

  // Mock clientWidth and clientHeight
  Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
    writable: true,
    value: 800,
  });

  Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
    writable: true,
    value: 400,
  });

  // Mock offsetWidth and offsetHeight
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    writable: true,
    value: 800,
  });

  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    writable: true,
    value: 400,
  });
});
