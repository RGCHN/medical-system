import React, { Component }from "react";
import {Breadcrumb, Avatar, Form, Row, Col, Input, Select, Button} from "antd";
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './index.scss';

export default class UserEdit extends Component {
  state = {
    mode: 'edit'
  };
  
  render() {
    const {mode} = this.state;
    return (
      <div className="user-edit-container mx-3">
        <Breadcrumb>
          <Breadcrumb.Item>账号管理</Breadcrumb.Item>
          <Breadcrumb.Item>编辑资料</Breadcrumb.Item>
        </Breadcrumb>
        <div className="user-info-container mt-5">
          <h2>用户资料</h2>
          {
            mode === 'edit' && (
              <>
              <div className="button-container">
                <Button type="primary" className='edit-button' >保存</Button>
                <Button type="primary" className='back-button ml-3'>返回</Button>
              </div>
              <div className="d-flex ai-center jc-around">
                <Avatar size={64} icon={<UserOutlined />} />
                <Form labelAlign='left' labelCol={{ span: 12}} wrapperCol={{span: 12}} name="control-ref" className='user-edit w-100 px-5 mt-5'>
                  <Row gutter={24}>
                    <Col span={12} key='nickname'>
                      <Form.Item label="用户名">
                        <Input placeholder='输入用户名'/>
                      </Form.Item>
                    </Col>
                    <Col span={12} key='phone'>
                      <Form.Item label="电话">
                        <Input placeholder='输入电话'/>
                      </Form.Item>
                    </Col>
                    <Col span={12} key='name'>
                      <Form.Item label="姓名">
                        <Input placeholder='输入姓名'/>
                      </Form.Item>
                    </Col>
      
                    <Col span={12} key='email'>
                      <Form.Item label="邮箱">
                        <Input placeholder='输入邮箱'/>
                      </Form.Item>
                    </Col>
                    <Col span={24} key='password'>
                      <Form.Item label="密码">
                        <Input.Password iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                      </Form.Item>
                    </Col>
                    <Col span={12} key='type'>
                      <Form.Item label="账号类型">
                        <Select>
                          <Select.Option value="manager">管理员</Select.Option>
                          <Select.Option value="doctor">医生</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12} key='role'>
                      <Form.Item label="权限">
                        <Select>
                          <Select.Option value="level1">一级权限</Select.Option>
                          <Select.Option value="level2">二级权限</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
    
                  </Row>
                </Form>
              </div>
              </>
            )
          }
        </div>
      </div>
      
    )
  }
  
  
}
