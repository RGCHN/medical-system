import React from 'react';
import { Layout, Menu, Divider} from 'antd';
import { Link, withRouter} from 'react-router-dom';
import 'antd/dist/antd.css';
import './index.scss';

const { Header, Content } = Layout;
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
    return (
      <Layout className="layout">
        <Header>
          <Link className="title" to='/home'>
            浙江大学附属第一医院
              <div className='fs-sm'>脑卒中梗死区域预测系统</div>
          </Link>
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
};

export default withRouter(App)

