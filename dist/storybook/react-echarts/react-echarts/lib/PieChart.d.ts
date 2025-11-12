import { default as React } from 'react';
type ChartData = {
    title?: string;
    series: {
        data: [string, number][] | {
            name: string;
            value: number;
        }[];
    }[];
};
declare const PieChart: React.FC<{
    chartData: ChartData;
    theme?: 'light' | 'dark';
}>;
export default PieChart;
