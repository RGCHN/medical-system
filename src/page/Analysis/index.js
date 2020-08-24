import React from "react";
import { Divider } from 'antd';
import { Pie, Bar } from 'ant-design-pro/lib/Charts';
import './index.scss';

const genderData = [
  {
    x: '男',
    y: 4544,
  },
  {
    x: '女',
    y: 3321,
  }
];
const ageData = [
  {
    x: '0-10岁',
    y: Math.floor(Math.random() * 1000) + 200
  },
  {
    x: '11-20岁',
    y: Math.floor(Math.random() * 1000) + 200
  },
  {
    x: '21-30岁',
    y: Math.floor(Math.random() * 1000) + 200
  },
  {
    x: '31-40岁',
    y: Math.floor(Math.random() * 1000) + 200
  },
  {
    x: '41-50岁',
    y: Math.floor(Math.random() * 1000) + 200
  },{
    x: '51-60岁',
    y: Math.floor(Math.random() * 1000) + 200
  },
  {
    x: '61-70岁',
    y: Math.floor(Math.random() * 1000) + 200
  },
  {
    x: '71-80岁',
    y: Math.floor(Math.random() * 1000) + 200
  },
  {
    x: '大于81岁',
    y: Math.floor(Math.random() * 1000) + 200
  },
]

export default class Analysis extends React.Component {
  state = {};
  
  render() {
    return (
      <div className="analysis-container d-flex flex-column ai-center">
        <div className='gender-pie'>
          <h2>患者性别分布</h2>
          <Pie
            hasLegend = {true}
            title="患者性别分布"
            subTitle="患者性别分布"
            total={() => (
              <span
                dangerouslySetInnerHTML={{
                  __html: `共${genderData.reduce((pre, now) => now.y + pre, 0)}人`,
                }}
              />
            )}
            data={genderData}
            valueFormat={val => <span dangerouslySetInnerHTML={{ __html: val }} />}
            height={294}
          />
        </div>
        <Divider />
        <div className='age-distribute-container'>
          <h2>患者年龄分布</h2>
          <Bar height={300}  data={ageData} />,
        </div>
      </div>
    )
  }
}

