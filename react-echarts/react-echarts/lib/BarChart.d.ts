import { default as React } from 'react';
type ChartData = {
    title?: string;
    legend?: {
        data: string[];
    };
    series: {
        data: (number | [string, number] | {
            value: [number, string];
        })[];
        stack?: string;
        name?: string;
    }[];
    xAxis: string[] | object;
    yAxis: object;
};
declare const BarChart: React.FC<{
    chartData: ChartData;
    theme?: 'light' | 'dark';
    orientation?: 'vertical' | 'horizontal';
}>;
export default BarChart;
