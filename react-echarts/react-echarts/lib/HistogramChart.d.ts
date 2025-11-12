import { default as React } from 'react';
type ChartData = {
    title?: string;
    legend?: {
        data: string[];
    };
    series: {
        data: number[];
        name?: string;
        markLine?: unknown;
    }[];
    xAxis: string[] | object;
    yAxis: object;
};
declare const HistogramChart: React.FC<{
    chartData: ChartData;
    theme?: 'light' | 'dark';
}>;
export default HistogramChart;
