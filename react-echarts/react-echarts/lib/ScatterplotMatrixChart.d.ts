import { default as React } from 'react';
type MatrixScatterChartData = {
    axisLabels: {
        x: string[];
        y: string[];
    };
    series: {
        name?: string;
        data: [number, number][];
    }[];
};
type ChartData = {
    title?: string;
} & MatrixScatterChartData;
declare const ScatterplotMatrixChart: React.FC<{
    chartData: ChartData;
    theme?: 'light' | 'dark';
}>;
export default ScatterplotMatrixChart;
