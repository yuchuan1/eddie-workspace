import { render } from '@testing-library/react';
import MarginalPlotChart from './MarginalPlotChart';

describe('MarginalPlotChart', () => {
  it('renders without crashing', () => {
    const chartData = {
      dataset: [{ source: [[10, 20], [15, 25]] as [number, number][] }],
    };
    const { container } = render(<MarginalPlotChart chartData={chartData} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('applies theme correctly', () => {
    const chartData = {
      dataset: [{ source: [[10, 20]] as [number, number][] }],
    };
    const { container } = render(<MarginalPlotChart chartData={chartData} theme="dark" />);
    expect((container.firstChild as HTMLElement).className).toContain('wrapperDark');
  });

  it('handles empty data gracefully', () => {
    const chartData = {
      dataset: [],
    };
    const { container } = render(<MarginalPlotChart chartData={chartData} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('accepts configurable bins', () => {
    const chartData = {
      dataset: [{ source: [[10, 20], [15, 25], [20, 30]] as [number, number][] }],
    };
    const { container } = render(<MarginalPlotChart chartData={chartData} bins={8} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders with custom colors', () => {
    const chartData = {
      dataset: [{ source: [[10, 20]] as [number, number][] }],
    };
    const colors = { xHist: '#ff0000', yHist: '#00ff00' };
    const { container } = render(<MarginalPlotChart chartData={chartData} colors={colors} />);
    expect(container.firstChild).toBeTruthy();
  });
});
