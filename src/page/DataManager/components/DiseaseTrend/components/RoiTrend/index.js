import React from 'react';
import { Line } from '@ant-design/charts';
import './index.scss';


export default function RoiTrend(props) {
  const data = [
    { year: '2020-05-12', value: 20.78 },
    { year: '2020-05-20', value: 16.33 },
    { year: '2020-06-12', value: 12.78 },
    { year: '2020-06-18', value: 12.55 },
    { year: '2020-06-22', value: 12.34 },
    { year: '2020-07-01', value: 12.05 },
    { year: '2020-07-10', value: 11.89 },
  ];
  const config = {
    padding: 'auto',
    forceFit: true,
    data,
    title: {
      visible: true,
      text: '梗死区域面积变化趋势',
    },
    xField: 'year',
    yField: 'value',
    yAxis: {
      min: 9,
      max: 30,
    },
  };
  
  return (
    <div className="trend-container">
      <Line {...config} />
    </div>
  
  )
}
