import React, {Component} from 'react';
import { Card, Form, Button, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import history from "../../utils/history";
import './index.scss'
import {NavLink} from "react-router-dom";

export default class Register extends Component {
  onFinish = values => {
    this.http.post('/register',values).then(
      res => {
        if (res.data.status === 'success') {
          message.success('注册成功！');
          history.push('/login')
        }
        if (res.data.status === 'fail'){
          message.error('注册失败！');
        }
      }, err => {
        console.log(err);
      }
    );
  };
  
  render() {
    return (
      <div className="login-container d-flex flex-column ai-center">
        <Card title="欢迎使用脑卒中预测系统" style={{ width: 400, marginTop: 100 }}>
          <Form
            name="normal_login"
            className="login-form"
            onFinish={this.onFinish}
          >
            <Form.Item
              name="realname"
              label="姓名"
              rules={[
                {
                  required: true,
                  message: '请输入姓名!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Realname" />
            </Form.Item>
            <Form.Item
              name="username"
              label="帐号"
              rules={[
                {
                  required: true,
                  message: '请输入帐号!',
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
            <Form.Item>
              <NavLink to='login'>已有帐号？去登录</NavLink>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button w-100">
                注册
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
}
