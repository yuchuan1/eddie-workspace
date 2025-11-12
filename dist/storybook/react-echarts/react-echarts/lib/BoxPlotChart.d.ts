import { default as React } from 'react';
type ChartData = {
    title?: string;
    dataset?: {
        source: (string | number)[][];
    }[];
    series: {
        type: 'boxplot';
        datasetIndex?: number;
    }[];
    xAxis: object;
    yAxis: object;
};
declare const BoxPlotChart: React.FC<{
    chartData: ChartData;
    theme?: 'light' | 'dark';
}>;
export default BoxPlotChart;
