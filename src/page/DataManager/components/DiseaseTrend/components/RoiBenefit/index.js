import React from 'react';
import { Line } from '@ant-design/charts';
import './index.scss';


export default function RoiTrend(props) {
  const data = [
    { year: '2020-05-12', value: 98 },
    { year: '2020-05-20', value: 86 },
    { year: '2020-06-12', value: 71 },
    { year: '2020-06-18', value: 64 },
    { year: '2020-06-22', value: 55 },
    { year: '2020-07-01', value: 40 },
    { year: '2020-07-10', value: 35 },
  ];
  const config = {
    padding: 'auto',
    forceFit: true,
    data,
    title: {
      visible: true,
      text: '溶栓治疗获益',
    },
    xField: 'year',
    yField: 'value',
    yAxis: {
      min: 36,
      max: 120,
    },
  };
  
  return (
    <div className="trend-container">
      <Line {...config} />
    </div>
  
  )
}
