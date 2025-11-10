import { render } from '@testing-library/react';
import LineChart from './LineChart';

describe('LineChart', () => {
  const mockChartData = {
    title: 'Test Line Chart',
    series: [
      {
        name: 'Series 1',
        data: [10, 20, 30, 40, 50],
      },
    ],
    xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    yAxis: {},
  };

  it('renders without crashing with basic data', () => {
    const { container } = render(<LineChart chartData={mockChartData} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('applies theme correctly', () => {
    const { container } = render(
      <LineChart chartData={mockChartData} theme="dark" />
    );
    expect((container.firstChild as HTMLElement).className).toContain(
      'wrapperDark'
    );
  });

  it('renders with light theme by default', () => {
    const { container } = render(<LineChart chartData={mockChartData} />);
    expect((container.firstChild as HTMLElement).className).toContain(
      'wrapperLight'
    );
  });

  it('handles empty series gracefully', () => {
    const emptyData = { ...mockChartData, series: [] };
    const { container } = render(<LineChart chartData={emptyData} />);
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
    const { container } = render(<LineChart chartData={multiSeriesData} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders multiple series with legend and default titles', () => {
    const multiSeriesNoTitleData = {
      series: [
        { name: 'Series A', data: [1, 2, 3, 4, 5] },
        { name: 'Series B', data: [5, 4, 3, 2, 1] },
      ],
      xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      yAxis: {},
    };
    const { container } = render(
      <LineChart chartData={multiSeriesNoTitleData} />
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('handles custom xAxis categories', () => {
    const customXAxisData = {
      ...mockChartData,
      xAxis: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
    };
    const { container } = render(<LineChart chartData={customXAxisData} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders with custom title', () => {
    const customTitleData = {
      ...mockChartData,
      title: 'Custom Line Title',
    };
    const { container } = render(<LineChart chartData={customTitleData} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders with default title when no title provided', () => {
    const noTitleData = {
      ...mockChartData,
      title: undefined,
    };
    const { container } = render(<LineChart chartData={noTitleData} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('handles yAxis configuration', () => {
    const yAxisData = {
      ...mockChartData,
      yAxis: { name: 'Values', type: 'value' },
    };
    const { container } = render(<LineChart chartData={yAxisData} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('handles series without names', () => {
    const noNameSeriesData = {
      ...mockChartData,
      series: [{ data: [10, 20, 30, 40, 50] }],
    };
    const { container } = render(<LineChart chartData={noNameSeriesData} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('handles different data lengths gracefully', () => {
    const unevenData = {
      ...mockChartData,
      series: [
        { name: 'Short', data: [10, 20] },
        { name: 'Long', data: [1, 2, 3, 4, 5, 6] },
      ],
      xAxis: ['A', 'B', 'C', 'D', 'E', 'F'],
    };
    const { container } = render(<LineChart chartData={unevenData} />);
    expect(container.firstChild).toBeTruthy();
  });
});
