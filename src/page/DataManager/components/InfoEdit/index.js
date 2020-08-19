import React from "react";
import {Divider, Form, Input, DatePicker, Radio, Select } from "antd";
import './index.scss';

const { TextArea } = Input;
class InfoEdit extends React.Component {
  render() {
    return (
      <div className="info-edit-contaienr">
        <div className="form-container">
          <Form labelCol={{ span:4}} wrapperCol={{span: 4}} name="control-ref">
            <Divider orientation="left">个人信息</Divider>
            <Form.Item label="病例编号">
              <Input placeholder='输入病例编号'/>
            </Form.Item>
            <Form.Item wrapperCol={{span: 2}} label="姓名">
              <Input placeholder='输入姓名'/>
            </Form.Item>
            <Form.Item label="性别">
              <Radio.Group>
                <Radio value="male">男</Radio>
                <Radio value="female">女</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item wrapperCol={{span: 2}} label="年龄(岁)">
              <Input placeholder='输入年龄'/>
            </Form.Item>
            <Form.Item label="就诊卡号/医保号">
              <Input  />
            </Form.Item>
            <Form.Item wrapperCol={{span: 2}} label="病人状态">
              <Select>
                <Select.Option value="in">在访</Select.Option>
                <Select.Option value="die">死亡</Select.Option>
                <Select.Option value="health">康复</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item wrapperCol={{span: 2}} label="初次就诊年龄(岁)">
              <Input placeholder='输入年龄'/>
            </Form.Item>
            <Form.Item label='初次就诊时间'>
              <DatePicker />
            </Form.Item>
            <Form.Item wrapperCol={{span: 4}} label="脑卒中分类">
              <Select>
                <Select.Option value="in">血栓性脑梗塞</Select.Option>
                <Select.Option value="die">拴柱性脑梗塞</Select.Option>
              </Select>
            </Form.Item>
            <Divider plain orientation="left">疾病信息</Divider>
            <Form.Item label="疾病诊断">
              <TextArea rows={4}/>
            </Form.Item>
            <Form.Item label="诊疗结果">
              <TextArea rows={4}/>
            </Form.Item>
          </Form>
        </div>
      
        
    
      </div>
    )
  }
}
export default InfoEdit
