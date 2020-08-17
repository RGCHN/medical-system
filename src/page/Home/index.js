import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { UnorderedListOutlined, PieChartOutlined  }  from '@ant-design/icons';
import './index.scss';


const NAV_CARD = [
  {
    icon: <UnorderedListOutlined className='icon-container'/>,
    title: '病人列表',
    description: '患者概览、疾病类型、患者状态',
    bg: '#F20909',
    link: '',
  },
  {
    icon: <PieChartOutlined className='icon-container'/>,
    title: '统计分析',
    description: '人口学统计、患病类型比例',
    bg: '#444444',
    link: '',
  },
  {
    icon: <UnorderedListOutlined className='icon-container'/>,
    title: '智能诊断',
    description: '影像管理、脑梗死区域预测',
    bg: '#237BF0',
    link: '',
  },
  {
    icon: <UnorderedListOutlined className='icon-container'/>,
    title: '趋势预测',
    description: '梗死区域趋势图、未来趋势预测',
    bg: '#444444',
    link: '',
  },
  {
    icon: <UnorderedListOutlined className='icon-container'/>,
    title: '个人信息',
    description: '患者信息、智能诊疗、影像管理',
    bg: '#237BF0',
    link: '',
  },
  {
    icon: <UnorderedListOutlined className='icon-container'/>,
    title: '账号管理',
    description: '账号设置',
    bg: '#F20909',
    link: '',
  }
]


export default class Home extends React.Component{
  state = {};
  
  render() {
    
    return (
      <div className='home-page'>
        <div className="nav-card-container">
          {
            NAV_CARD.map((item, index) => (
              <Link to={item.link} key={index}>
                <Card
                  hoverable
                  className='nav-card'
                  style={{backgroundColor: item.bg}}
                >
                  {item.icon}
                  <div className='card-title'>
                    {item.title}
                  </div>
                  <p>
                    {item.description}
                  </p>
                </Card>
              </Link>
            ))
          }
        </div>
      </div>
    )
  }
}
