import React from 'react';
import { Card } from 'antd';
import { UnorderedListOutlined, PieChartOutlined  }  from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import './index.scss';
import HeaderImg from '../../assets/img/home-header.jpg';


const NAV_CARD = [
  {
    icon: <UnorderedListOutlined className='icon-container fs-xxl'/>,
    title: '病人列表',
    description: '患者概览、疾病类型、患者状态',
    bg: '#F20909',
    link: '/dataManager',
  },
  {
    icon: <PieChartOutlined className='icon-container fs-xxl'/>,
    title: '统计分析',
    description: '人口学统计、患病类型比例',
    bg: '#444444',
    link: '/modelManager',
  },
  {
    icon: <UnorderedListOutlined className='icon-container fs-xxl'/>,
    title: '智能诊断',
    description: '影像管理、脑梗死区域预测',
    bg: '#237BF0',
    link: '',
  },
  {
    icon: <UnorderedListOutlined className='icon-container fs-xxl'/>,
    title: '趋势预测',
    description: '梗死区域趋势图、未来趋势预测',
    bg: '#444444',
    link: '',
  },
  {
    icon: <UnorderedListOutlined className='icon-container fs-xxl'/>,
    title: '个人信息',
    description: '患者信息、智能诊疗、影像管理',
    bg: '#237BF0',
    link: '',
  },
  {
    icon: <UnorderedListOutlined className='icon-container fs-xxl'/>,
    title: '账号管理',
    description: '账号设置',
    bg: '#F20909',
    link: '',
  }
]


class Home extends React.Component{
  state = {};
  
  handleClick = link => {
    this.props.history.push(link);
  }
  
  render() {
    
    return (
      <div className='home-page mx-6 d-flex flex-column ai-center'>
        <div className='header-img mb-5'>
          <img src={HeaderImg} alt="HeaderImg"/>
        </div>
        <div className="nav-card-container d-flex jc-between ai-center w-100 flex-wrap">
          {
            NAV_CARD.map((item, index) => (
              <Card
                hoverable
                className='nav-card text-white mb-3 d-flex flex-column ai-center jc-center'
                style={{backgroundColor: item.bg, width: '27rem',height: '13rem',borderRadius: '1.4rem'}}
                key={index}
                onClick={ () => this.handleClick(item.link)}
              >
                <div className='title-container mb-3'>
                  <span className='ico-container mr-5'>
                  {item.icon}
                </span>
                  <span className='card-title fs-xxl'>
                  {item.title}
                </span>
                </div>
                <div className='fs-md'>
                  {item.description}
                </div>
              </Card>
            ))
          }
        </div>
      </div>
    )
  }
}

export default withRouter(Home)
