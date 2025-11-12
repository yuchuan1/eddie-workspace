import { default as React } from 'react';
type ChartData = {
    title?: string;
    series: {
        data: [number, number, number][];
    }[];
    xAxis: string[] | object;
    yAxis: object;
};
declare const HeatmapChart: React.FC<{
    chartData: ChartData;
    theme?: 'light' | 'dark';
}>;
export default HeatmapChart;
