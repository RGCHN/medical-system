import React, {Component} from 'react';
import { Line } from '@ant-design/charts';
import './index.scss';
import idContext from '../../../idContext';
import {message} from 'antd';

const data = [
  { year: '2020-05-12', value: 98 },
  { year: '2020-05-20', value: 86 },
  { year: '2020-06-12', value: 71 },
  { year: '2020-06-18', value: 64 },
  { year: '2020-06-22', value: 55 },
  { year: '2020-07-01', value: 40 },
  { year: '2020-07-10', value: 35 },
];
const defaultConfig = {
  padding: 'auto',
  forceFit: true,
  title: {
    visible: true,
    text: '溶栓治疗获益',
  },
  xField: 'time',
  yField: 'info',
  yAxis: {
    min: 36,
    max: 150,
  },
};
export default class RoiBenefit extends Component{
  state = {
    benefitList: [],
  }
  
  componentDidMount() {
    const id = this.context;
    this.modelHttp.post('getInfoTrend',{patientID: id}).then(res =>{
      console.log(res);
      const benefitList = res.data.data.infoTrend;
      this.setState({
        benefitList
      })
    }, err => {
      message.error('网络错误！请稍后重试！')
    
    })
    
  }
  
  render() {
    const { benefitList } = this.state;
    const config = {...defaultConfig, data: benefitList};
    return (
      <div className="trend-container">
        <Line {...config} />
      </div>

    )
  }
}
RoiBenefit.contextType = idContext;
