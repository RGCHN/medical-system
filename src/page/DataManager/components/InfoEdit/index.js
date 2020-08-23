import React from "react";
import {Divider, Button, Form, Input, DatePicker, Radio, Select,Row, Col,Descriptions, Badge } from "antd";
import './index.scss';

const { TextArea } = Input;

const MOCK_PATIENT = {
  patientID:'病例编号',
  age: "age",
  cva: "脑卒中分类",
  info: "病症描述",
  name: "name",
  recordID: "医保卡号",
  result: "诊疗结果",
  sex: 0,//"0为男 1为女",
  state: "病人状态",
  createTime:"2020-08-12",
  firstAge:'25'
}


class InfoEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode:'view', //view或者edit
      patient:MOCK_PATIENT
    }
  }
 
  changeMode = mode => {
    this.setState({
      mode:mode
    })
  }
  
  render() {
    const { mode,patient } = this.state;
    const rightNode = (
      <div>
        <Button type="primary" >编辑</Button>
      </div>
    )
    return (
      <div className="info-container w-100 px-3">
        {
          mode === 'edit' && (
            <Form labelCol={{ span: 12}} wrapperCol={{span: 12}} name="control-ref" className='info-edit w-100 px-5'>
              <Divider orientation="left">个人信息</Divider>
              <Row gutter={24}>
                <Col span={8} key='recordID'>
                  <Form.Item label="病例编号">
                    <Input placeholder='输入病例编号'/>
                  </Form.Item>
                </Col>
                <Col span={8} key='name'>
                  <Form.Item label="姓名">
                    <Input placeholder='输入姓名'/>
                  </Form.Item>
                </Col>
                <Col span={8} key='gender'>
                  <Form.Item label="性别"  >
                    <Radio.Group>
                      <Radio value="0">男</Radio>
                      <Radio value="1">女</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
  
                <Col span={8} key='age'>
                  <Form.Item label="年龄（岁）">
                    <Input placeholder='年龄'/>
                  </Form.Item>
                </Col>
                <Col span={8} key='cardID'>
                  <Form.Item label="就诊卡号/医保号">
                    <Input placeholder='就诊卡号/医保号'/>
                  </Form.Item>
                </Col>
                <Col span={8} key='status'>
                  <Form.Item label="病人状态">
                    <Select>
                      <Select.Option value="in">在访</Select.Option>
                      <Select.Option value="die">死亡</Select.Option>
                      <Select.Option value="health">康复</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                
                <Col span={8} key='firstAge'>
                  <Form.Item label="初次就诊年龄(岁)">
                    <Input placeholder='输入年龄'/>
                  </Form.Item>
                </Col>
                <Col span={8} key='firstTime'>
                  <Form.Item label='初次就诊时间'>
                    <DatePicker />
                  </Form.Item>
                </Col>
                <Col span={8} key='class'>
                  <Form.Item label="脑卒中分类">
                    <Select>
                      <Select.Option value="in">血栓性脑梗塞</Select.Option>
                      <Select.Option value="die">拴柱性脑梗塞</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              
              </Row>
              <Divider orientation="left">疾病信息</Divider>
              <Row gutter={24}>
                <Col span={12} wrapperCol={{span: 16}} key='description' >
                  <Form.Item label="症状描述" className='description'>
                    <TextArea rows={4}/>
                  </Form.Item>
                </Col>
                <Col span={12} wrapperCol={{span: 24}} key='result' >
                  <Form.Item label="诊疗结果" className='result'>
                    <TextArea rows={4}/>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Button type="primary" htmlType="submit" onClick={() => this.changeMode('view')}>
                  保存
                </Button>
              </Form.Item>
            </Form>
          )
        }
        {
          mode === 'view' && (
            <div className='info-viewer'>
              <div className="button-container">
                <Button type="primary" className='edit-button' onClick={ () => this.changeMode('edit')}>编辑</Button>
                <Button type="primary" className='back-button ml-3'>返回</Button>
              </div>
              <Descriptions bordered title="个人信息" column={3} className='basic-info-viewer'>
                <Descriptions.Item label="病例编号">{patient.patientID}</Descriptions.Item>
                <Descriptions.Item label="姓名">{patient.name}</Descriptions.Item>
                <Descriptions.Item label="性别">{patient.sex===0? '男': '女'}</Descriptions.Item>
                <Descriptions.Item label="年龄（岁）">{patient.age}</Descriptions.Item>
                <Descriptions.Item label="病人状态">{patient.state}</Descriptions.Item>
                <Descriptions.Item label="初次就诊时间">{patient.createTime}</Descriptions.Item>
                <Descriptions.Item label="初次就诊年龄">{patient.firstAge}</Descriptions.Item>
                <Descriptions.Item label="脑卒中分类">{patient.cva}</Descriptions.Item>
              </Descriptions>
              <Descriptions title="疾病信息" bordered column={6} className="disease-info-viewer">
                <Descriptions.Item label="病症描述" span={4}>
                  {patient.info}
                </Descriptions.Item>
                <Descriptions.Item label="诊疗结果" span={2}>
                  {patient.result}
                </Descriptions.Item>
              </Descriptions>
            </div>
          )
        }
         </div>
    )
  }
}
export default InfoEdit
