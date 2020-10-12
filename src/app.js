import React from 'react';
import { Layout, Menu, Divider,Dropdown} from 'antd';
import { Router, NavLink, Switch,Route } from 'react-router-dom';
import { BellOutlined, DownOutlined } from '@ant-design/icons';
import routes from "./routes"
import history from "./utils/history";
import { renderRoutes } from "react-router-config";
import Login from "./page/Login";
import Register from "./page/Register";
import { clearToken } from './utils/tools';
import 'antd/dist/antd.css';
import './index.scss';

const { Header, Sider, Content } = Layout;
const NAV_ITEM = [
  {
    name: '病人管理',
    link: '/patientList/operator'
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
  
  componentDidMount() {
  }
  
  render() {
    const {current} = this.state;
    const menu = (
      <Menu>
        <Menu.Item key="center">
          <NavLink to='/profile'>
            用户中心
          </NavLink>
        </Menu.Item>
        <Menu.Item key="exit">
          <NavLink to='/login' isActive={clearToken}>
            退出
          </NavLink>
        </Menu.Item>
      </Menu>
    )
    return (
      <Router history={history} >
        <Switch>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register} />
          <Route path='/'>
            <Layout className="layout">
              <Header>
                <Layout>
                  <Sider className="title-container">
                    <NavLink className="title" to='/home'>
                      浙江大学附属第一医院
                      <div className='fs-sm'>脑卒中梗死区域预测系统</div>
                    </NavLink>
                  </Sider>
                  <Content>
                    <Menu className="header-nav-container"  style={{border:'none'}} selectedKeys={[current]}  onClick={this.handleClick}>
                      {
                        NAV_ITEM.map((item,index) => (
                          <Menu.Item key={index} className="header-nav-item">
                            <NavLink to={item.link} >{item.name}</NavLink>
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
            {renderRoutes(routes)}
          </Route>
        </Switch>
      </Router>
    )
  }
};

export default App

