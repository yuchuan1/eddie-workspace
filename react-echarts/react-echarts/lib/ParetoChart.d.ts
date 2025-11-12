import { default as React } from 'react';
type ChartData = {
    title?: string;
    legend?: {
        data: string[];
    };
    series: {
        data: number[];
        name?: string;
        type: 'bar' | 'line';
    }[];
    xAxis: string[] | object;
    yAxis: object[];
};
declare const ParetoChart: React.FC<{
    chartData: ChartData;
    theme?: 'light' | 'dark';
}>;
export default ParetoChart;
