import React, {Component} from 'react';
import { Card, Form, Button, Input, Checkbox } from 'antd';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export default class Login extends Component {
  state = {};
  
  onFinish = values => {
    console.log('Success:', values);
  };
  
  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  
  
  render() {
    return (
      <div className="login-container d-flex flex-column ai-center">
        <Card title="欢迎使用脑卒中预测系统" style={{ width: 400 }}>
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            labelAlign='left'
          >
            <Form.Item
              label="账号"
              name="username"
              rules={[
                {
                  required: true,
                  message: '请输入账号!',
                },
              ]}
            >
              <Input />
            </Form.Item>
    
            <Form.Item
              label="密码"
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
    
            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>七天之内记住我</Checkbox>
            </Form.Item>
    
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
}
