import { render } from '@testing-library/react';
import BarChart from './BarChart';

describe('BarChart', () => {
  const mockChartData = {
    title: 'Test Bar Chart',
    series: [
      {
        name: 'Series 1',
        data: [10, 20, 30, 40, 50],
      },
    ],
    xAxis: ['A', 'B', 'C', 'D', 'E'],
    yAxis: {},
  };

  it('renders without crashing with basic data', () => {
    const { container } = render(<BarChart chartData={mockChartData} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('applies theme correctly', () => {
    const { container } = render(<BarChart chartData={mockChartData} theme="dark" />);
    expect((container.firstChild as HTMLElement).className).toContain('wrapperDark');
  });

  it('renders with light theme by default', () => {
    const { container } = render(<BarChart chartData={mockChartData} />);
    expect((container.firstChild as HTMLElement).className).toContain('wrapperLight');
  });

  it('handles empty series gracefully', () => {
    const emptyData = { ...mockChartData, series: [] };
    const { container } = render(<BarChart chartData={emptyData} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders multiple series with legend', () => {
    const multiSeriesData = {
      ...mockChartData,
      series: [
        { name: 'Series A', data: [1, 2, 3, 4, 5] },
        { name: 'Series B', data: [5, 4, 3, 2, 1] },
      ],
    };
    const { container } = render(<BarChart chartData={multiSeriesData} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders multiple series with legend and default titles', () => {
    const multiSeriesNoTitleData = {
      series: [
        { name: 'Series A', data: [1, 2, 3, 4, 5] },
        { name: 'Series B', data: [5, 4, 3, 2, 1] },
      ],
      xAxis: ['A', 'B', 'C', 'D', 'E'],
      yAxis: {},
    };
    const { container } = render(<BarChart chartData={multiSeriesNoTitleData} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('handles stacked series', () => {
    const stackedData = {
      ...mockChartData,
      series: [
        { name: 'Stack A', data: [1, 2, 3, 4, 5], stack: 'total' },
        { name: 'Stack B', data: [5, 4, 3, 2, 1], stack: 'total' },
      ],
    };
    const { container } = render(<BarChart chartData={stackedData} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('handles horizontal orientation', () => {
    const { container } = render(<BarChart chartData={mockChartData} orientation="horizontal" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('handles horizontal orientation with object xAxis', () => {
    const horizontalObjectXAxisData = {
      ...mockChartData,
      xAxis: { type: 'category', name: 'Categories' },
    };
    const { container } = render(<BarChart chartData={horizontalObjectXAxisData} orientation="horizontal" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders with vertical orientation by default', () => {
    const { container } = render(<BarChart chartData={mockChartData} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('handles object xAxis configuration', () => {
    const objectXAxisData = {
      ...mockChartData,
      xAxis: { type: 'category', name: 'Categories' },
    };
    const { container } = render(<BarChart chartData={objectXAxisData} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders with custom title', () => {
    const customTitleData = {
      ...mockChartData,
      title: 'Custom Bar Title',
    };
    const { container } = render(<BarChart chartData={customTitleData} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('handles complex data types', () => {
    const complexData = {
      ...mockChartData,
      series: [
        {
          name: 'Complex Series',
          data: [
            { value: [10, 'cat1'] },
            [15, 'cat2'],
            20, // simple number
          ] as (number | [string, number] | {value: [number, string]})[],
        },
      ],
    };
    const { container } = render(<BarChart chartData={complexData} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('handles series without names', () => {
    const noNameSeriesData = {
      ...mockChartData,
      series: [
        { data: [10, 20, 30, 40, 50] },
      ],
    };
    const { container } = render(<BarChart chartData={noNameSeriesData} />);
    expect(container.firstChild).toBeTruthy();
  });
});
