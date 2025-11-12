import { default as React } from 'react';
import { EChartsOption } from 'echarts';
interface ReactEchartsProps {
    option: EChartsOption;
    style?: React.CSSProperties;
    notMerge?: boolean;
    lazyUpdate?: boolean;
}
export declare function ReactEcharts({ option, style, notMerge, lazyUpdate, }: ReactEchartsProps): import("react/jsx-runtime").JSX.Element;
export default ReactEcharts;
