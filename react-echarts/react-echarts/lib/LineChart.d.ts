import { default as React } from 'react';
type ChartData = {
    title?: string;
    legend?: {
        data: string[];
    };
    series: {
        data: number[];
        name?: string;
    }[];
    xAxis: string[];
    yAxis: object;
};
declare const LineChart: React.FC<{
    chartData: ChartData;
    theme?: 'light' | 'dark';
}>;
export default LineChart;
