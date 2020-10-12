import React, { Component }from "react";
import {Breadcrumb, Avatar, Form, Row, Col, Input, Select, Button, Card, message} from "antd";
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import history from '../../../../utils/history';
import './index.scss';

export default class UserEdit extends Component {
  state = {
    mode: 'edit',
    userData: {},
  };
  
  handleSave = () => {
    history.push('/profile');
  }
  
  componentDidMount() {
    this.http.get('/getUser').then(res => {
      this.setState({
        userData: res.data.data
      })
    }, err => {
      message.error('网络错误，请稍候重试！');
    })
  }
  
  render() {
    const {mode, userData} = this.state;
    return (
      <div className="user-edit-container mx-3">
        <Breadcrumb>
          <Breadcrumb.Item>账号管理</Breadcrumb.Item>
          <Breadcrumb.Item>编辑资料</Breadcrumb.Item>
        </Breadcrumb>
        <div className="user-info-container mt-5">
          {
            mode === 'edit' && (
              <Card title='用户资料'>
              <div className="button-container mt-3">
                <Button type="primary" className='edit-button' onClick={this.handleSave}>保存</Button>
                <Button type="primary" className='back-button ml-3'>返回</Button>
              </div>
              <div className="d-flex ai-center jc-around">
                <Avatar size={64} icon={<UserOutlined />} />
                <Form labelAlign='left' labelCol={{ span: 4}} wrapperCol={{span: 12}} name="control-ref" className='user-edit w-100 px-5 mt-5'>
                  <Row gutter={24}>
                    <Col span={12} key='username'>
                      <Form.Item label="用户名" initialValue={userData.username}>
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
                    <Col span={12} key='password'>
                      <Form.Item label="密码">
                        <Input.Password iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                      </Form.Item>
                    </Col>
                    <Col span={12} key='userType'>
                      <Form.Item label="权限">
                        <Select defaultValue={userData.userType || '1'}>
                          <Select.Option value="1">管理员</Select.Option>
                          <Select.Option value="2">主任医生</Select.Option>
                          <Select.Option value="3">医生</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    {/*<Col span={12} key='role'>
                      <Form.Item label="权限">
                        <Select>
                          <Select.Option value="level1">一级权限</Select.Option>
                          <Select.Option value="level2">二级权限</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>*/}
    
                  </Row>
                </Form>
              </div>
              </Card>
            )
          }
        </div>
      </div>
      
    )
  }
  
  
}
