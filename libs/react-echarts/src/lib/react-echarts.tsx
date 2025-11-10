import React from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';

interface ReactEchartsProps {
  option: EChartsOption;
  style?: React.CSSProperties;
  notMerge?: boolean;
  lazyUpdate?: boolean;
}

export function ReactEcharts({
  option,
  style,
  notMerge,
  lazyUpdate,
}: ReactEchartsProps) {
  return (
    <ReactECharts
      option={option}
      style={style}
      notMerge={notMerge}
      lazyUpdate={lazyUpdate}
    />
  );
}

export default ReactEcharts;
