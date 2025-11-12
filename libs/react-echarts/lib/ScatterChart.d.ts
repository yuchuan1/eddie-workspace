import { default as React } from 'react';
type ChartData = {
    title?: string;
    legend?: {
        data: string[];
    };
    series: {
        data: (number | [string | number, string | number] | {
            value: [string | number, string | number];
        })[];
        name?: string;
    }[];
    xAxis: string[] | object;
    yAxis: object;
};
declare const ScatterChart: React.FC<{
    chartData: ChartData;
    theme?: 'light' | 'dark';
}>;
export default ScatterChart;
