import { default as React } from 'react';
type ChartData = {
    title?: string;
    dataset: {
        source: [number, number][];
    }[];
};
type MarginalPlotProps = {
    chartData: ChartData;
    theme?: 'light' | 'dark';
    bins?: number;
    normalize?: boolean;
    linkPointer?: boolean;
    showMarginalLabels?: boolean;
    colors?: {
        xHist?: string;
        yHist?: string;
    };
    height?: number;
};
declare const MarginalPlotChart: React.FC<MarginalPlotProps>;
export default MarginalPlotChart;
