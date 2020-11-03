import React, {Component} from 'react';
import { Line } from '@ant-design/charts';
import './index.scss';
import idContext from '../../../idContext';
import {message} from 'antd';

const data = [
  { year: '2020-05-12', value: 20.78 },
  { year: '2020-05-20', value: 16.33 },
  { year: '2020-06-12', value: 12.78 },
  { year: '2020-06-18', value: 12.55 },
  { year: '2020-06-22', value: 12.34 },
  { year: '2020-07-01', value: 12.05 },
  { year: '2020-07-10', value: 11.89 },
];
const defaultConfig = {
  padding: 'auto',
  forceFit: true,
  title: {
    visible: true,
    text: '梗死区域面积变化趋势',
  },
  xField: 'time',
  yField: 'info',
  yAxis: {
    min: 10,
    max: 200,
  },
};
export default class RoiTrend extends Component{
  state = {
    trendList: [],
  }
  
  componentDidMount() {
    const id = this.context;
    this.modelHttp.post('getSizeTrend',{patientID: id}).then(res =>{
      console.log(res);
      const trendList = res.data.data.sizeTrend;
      this.setState({
        trendList
      })
    }, err => {
      message.error('网络错误！请稍后重试！')
    })
    
  }
  
  
  render() {
    const { trendList } = this.state;
    const config = { ...defaultConfig, data: trendList}
    return (
      <div className="trend-container">
        <Line {...config} />
      </div>

    )
  }
};

RoiTrend.contextType = idContext;
