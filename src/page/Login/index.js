import React, {Component} from 'react';
import { Card, Form, Button, Input, Checkbox, message } from 'antd';
import { NavLink } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.scss'
import history from "../../utils/history";

export default class Login extends Component {
  onFinish = values => {
    this.http.post('/login', values).then(
      res => {
        if (res.data.status === 'success') {
          message.success('登录成功！');
          history.push(`/home`);
          localStorage.setItem('access_token', res.data.data.access_token);
          localStorage.setItem('refresh_token', res.data.data.refresh_token);
        }
        if (res.data.status === 'fail'){
          message.error('用户名或密码错误！');
        }
       
      }, err => {
        message.error('网络错误，请稍后再试！')
        console.log(err);
      }
    )
  };
  
  render() {
    return (
      <div className="login-container d-flex flex-column ai-center">
        <Card title="欢迎使用脑卒中预测系统" style={{ width: 400, marginTop: 100 }}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              label="账号"
              rules={[
                {
                  required: true,
                  message: '请输入账号!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[
                {
                  required: true,
                  message: '请输入密码!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item className="operator-bar d-flex jc-between">
              <Checkbox>记住我</Checkbox>
              <NavLink to='register'>没有帐号？去注册</NavLink>
            </Form.Item>
    
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button w-100">
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
}
