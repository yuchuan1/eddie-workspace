import { render } from '@testing-library/react';

import ReactEcharts from './react-echarts';

describe('ReactEcharts', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactEcharts />);
    expect(baseElement).toBeTruthy();
  });
});
