import React from 'react';
import { Layout, Menu, Divider} from 'antd';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './index.scss';

const { Header, Content } = Layout;
const NAV_ITEM = [
  {
    name: '数据管理',
    link: '/DataManager'
  },
  {
    name: '模型管理',
    link: '/ModelManager'
  },
  {
    name: '统计分析',
    link: '/Analysis'
  },
  {
    name: '账号管理',
    link: '/ProfileManager'
  }
];
export default class App extends React.Component{
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
    return (
      <Layout className="layout">
        <Header>
          <div className="title">
            浙江大学附属第一医院
              <div>xxx预测系统</div>
          </div>
          <Menu className="header-nav-container" selectedKeys={[current]}  onClick={this.handleClick}>
            {
              NAV_ITEM.map((item,index) => (
                <Menu.Item key={index} className="header-nav-item">
                  <Link to={item.link}>{item.name}</Link>
                </Menu.Item>
              ))
            }
          </Menu>
        </Header>
        <Divider />
        <Content >
        
        </Content>
        {/*<Footer style={{ textAlign: 'center' }}>浙江大学 ©2020</Footer>*/}
      </Layout>
    )
  }
}

