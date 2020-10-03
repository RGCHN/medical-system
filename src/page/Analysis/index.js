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
    x: '<20岁',
    y: Math.floor(Math.random() * 100)
  },
  {
    x: '20-29岁',
    y: Math.floor(Math.random() * 200)
  },
  {
    x: '30-39岁',
    y: Math.floor(Math.random() * 200) + 200
  },
  {
    x: '40-49岁',
    y: Math.floor(Math.random() * 500)
  },
  {
    x: '50-59岁',
    y: Math.floor(Math.random() * 500) + 200
  },{
    x: '60-69岁',
    y: Math.floor(Math.random() * 1000) + 200
  },
  {
    x: '70-79岁',
    y: Math.floor(Math.random() * 1000) + 200
  },
  {
    x: '≥80岁',
    y: Math.floor(Math.random() * 500) + 200
  },
];
const distributeData = [
  {
    x: '超急性期(0-6小时)',
    y: 4544,
  },
  {
    x: '急性期(6-24小时)',
    y: 3321,
  },
  {
    x: '亚急性期(24小时-2周)',
    y: 3113,
  },
  {
    x: '慢性期(大于2周)',
    y: 1231,
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
            valueFormat={val => <span dangerouslySetInnerHTML={{ __html: `${val}人` }} />}
            height={294}
          />
        </div>
        <Divider />
        <div className='age-distribute-container my-3'>
          <h2>患者年龄分布</h2>
          <Bar height={300}  data={ageData} />
        </div>
        <div className="state-distribute">
          <h2>脑损伤阶段分布</h2>
          <Pie
            hasLegend
            title="脑损伤阶段分布"
            subTitle="脑损伤阶段分布"
            total={() => (
              <span
                dangerouslySetInnerHTML={{
                  __html: `共${distributeData.reduce((pre, now) => now.y + pre, 0)}人`,
                }}
              />
            )}
            data={distributeData}
            valueFormat={val => <span dangerouslySetInnerHTML={{ __html: `${val}人` }} />}
            height={294}
          />
        </div>
      </div>
    )
  }
}

