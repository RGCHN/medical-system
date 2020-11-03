import React from "react";
import {Divider, message} from 'antd';
import { Pie, Bar } from 'ant-design-pro/lib/Charts';
import './index.scss';


export default class Analysis extends React.Component {
  state = {
    genderData:[],
    ageData:[],
    distributeData:[],
  };
  
  componentDidMount() {
    this.http.get('/patientsAnalyze').then(res => {
      if (res.status === 'fail') {
        message.error('网络错误！请稍后重试！')
      } else {
        const genderData = Object.entries(res.data.data.sex_number).map(item => {
          return {
            x: item[0] === 'manNumber' ? '男' : '女',
            y: Number(item[1])
          }
        });
        const ageData = Object.entries(res.data.data.age).map(item => {
          return {
            x: `${item[0]}岁`,
            y: item[1]
          }
        });
        const distributeData = Object.entries(res.data.data.phase).map(item => {
          return {
            x: item[0],
            y: item[1]
          }
        });
        this.setState({
          genderData,
          ageData,
          distributeData
        })
      }
    }, err => {
      message.error('网络错误，请稍候重试！')
    })
  }
  
  render() {
    const { genderData, ageData, distributeData} = this.state;
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

