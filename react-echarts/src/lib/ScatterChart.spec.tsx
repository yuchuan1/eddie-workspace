import { render } from '@testing-library/react';
import ScatterChart from './ScatterChart';

describe('ScatterChart', () => {
  const mockChartData = {
    title: 'Test Scatter Chart',
    series: [
      {
        name: 'Series 1',
        data: [
          [10, 20],
          [15, 25],
          [20, 30],
          [25, 35],
        ],
      },
    ],
    xAxis: {},
    yAxis: {},
  };

  it('renders without crashing with basic data', () => {
    const { container } = render(<ScatterChart chartData={mockChartData} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('applies theme correctly', () => {
    const { container } = render(<ScatterChart chartData={mockChartData} theme="dark" />);
    expect((container.firstChild as HTMLElement).className).toContain('wrapperDark');
  });

  it('renders with light theme by default', () => {
    const { container } = render(<ScatterChart chartData={mockChartData} />);
    expect((container.firstChild as HTMLElement).className).toContain('wrapperLight');
  });

  it('handles empty series gracefully', () => {
    const emptyData = { ...mockChartData, series: [] };
    const { container } = render(<ScatterChart chartData={emptyData} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders multiple series with legend', () => {
    const multiSeriesData = {
      ...mockChartData,
      series: [
        { name: 'Series A', data: [[1, 2], [3, 4]] as [number, number][] },
        { name: 'Series B', data: [[5, 6], [7, 8]] as [number, number][] },
      ],
    };
    const { container } = render(<ScatterChart chartData={multiSeriesData} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('handles string category xAxis', () => {
    const categoryData = {
      ...mockChartData,
      xAxis: ['A', 'B', 'C', 'D'],
      series: [{ name: 'Test', data: [[10, 20], [15, 25], [20, 30], [25, 35]] as [number, number][] }],
    };
    const { container } = render(<ScatterChart chartData={categoryData} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('handles object xAxis configuration', () => {
    const objectXAxisData = {
      ...mockChartData,
      xAxis: { type: 'value', name: 'X Values' },
      series: [{ name: 'Test', data: [[10, 20], [15, 25], [20, 30], [25, 35]] as [number, number][] }],
    };
    const { container } = render(<ScatterChart chartData={objectXAxisData} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders with custom title', () => {
    const customTitleData = {
      ...mockChartData,
      title: 'Custom Scatter Title',
      series: [{ name: 'Test', data: [[10, 20], [15, 25], [20, 30], [25, 35]] as [number, number][] }],
    };
    const { container } = render(<ScatterChart chartData={customTitleData} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('handles complex data types', () => {
    const complexData = {
      ...mockChartData,
      series: [
        {
          name: 'Complex Series',
          data: [
            { value: [10, 20] },
            [15, 25],
          ] as (number | [string | number, string | number] | {value: [string | number, string | number]})[],
        },
      ],
    };
    const { container } = render(<ScatterChart chartData={complexData} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('handles yAxis configuration', () => {
    const yAxisData = {
      ...mockChartData,
      yAxis: { name: 'Values', type: 'value' },
      series: [{ name: 'Test', data: [[10, 20], [15, 25], [20, 30], [25, 35]] as [number, number][] }],
    };
    const { container } = render(<ScatterChart chartData={yAxisData} />);
    expect(container.firstChild).toBeTruthy();
  });
});
