import React from 'react';
import { Layout, Menu, Divider,Dropdown} from 'antd';
import { Link, withRouter} from 'react-router-dom';
import { BellOutlined, DownOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './index.scss';

const { Header, Sider, Content } = Layout;
const NAV_ITEM = [
  {
    name: '数据管理',
    link: '/dataManager'
  },
  {
    name: '模型管理',
    link: '/modelManager'
  },
  {
    name: '统计分析',
    link: '/analysis'
  },
  {
    name: '账号管理',
    link: '/profile'
  }
];
class App extends React.Component{
  state = {
    current: 0,
  }
  
  handleClick = e => {
    this.setState({
      current: e.key,
    })
  }
  
  render() {
    const {current} = this.state;
    const menu = (
      <Menu>
        <Menu.Item key="center">
          <a rel="noopener noreferrer" href="#">
            用户中心
          </a>
        </Menu.Item>
        <Menu.Item key="exit">
          <a rel="noopener noreferrer" href="#">
            退出
          </a>
        </Menu.Item>
      </Menu>
    )
    return (
      <Layout className="layout">
        <Header>
          <Layout>
            <Sider className="title-container">
              <Link className="title" to='/home'>
                浙江大学附属第一医院
                <div className='fs-sm'>脑卒中梗死区域预测系统</div>
              </Link>
            </Sider>
            <Content>
              <Menu className="header-nav-container" selectedKeys={[current]}  onClick={this.handleClick}>
                {
                  NAV_ITEM.map((item,index) => (
                    <Menu.Item key={index} className="header-nav-item">
                      <Link to={item.link}>{item.name}</Link>
                    </Menu.Item>
                  ))
                }
              </Menu>
            </Content>
            <Sider className='menu-container'>
              <BellOutlined />
              <Dropdown overlay={menu} trigger={['click']}>
                <div className="ant-dropdown-link ml-3" onClick={e => e.preventDefault()}>
                  用户名
                  <DownOutlined />
                </div>
              </Dropdown>
            </Sider>
          </Layout>
        </Header>
        <Divider />
      </Layout>
    )
  }
};

export default withRouter(App)

