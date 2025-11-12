import { default as React } from 'react';
type MatrixScatterDataset = {
    name: string;
    data: number[];
    dp_groups?: string[];
};
type ChartData = {
    title?: string;
    dataset: MatrixScatterDataset[];
};
declare const PairwiseScatterGridChart: React.FC<{
    chartData: ChartData;
    theme?: 'light' | 'dark';
}>;
export default PairwiseScatterGridChart;
