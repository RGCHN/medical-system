import React from "react";
import {Divider, Button, Form, Input, DatePicker, Radio, Select,Row, Col,Descriptions, message, Spin } from "antd";
import moment from 'moment';
import idContext from '../idContext';
import history from '../../../../utils/history';
import {get, stateMap} from '../../../../utils/tools';
import './index.scss';

const { TextArea } = Input;
class InfoEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode:'edit', //view或者edit
      patient:{},
      spinVisible: true,
    }
  }
  changeMode = mode => {
    this.setState({
      mode:mode
    })
  }
  
  handleFinishFailed = err => {
    message.error('保存失败！请稍后重试');
  }
  
  handleFinish = patientInfo => {
    patientInfo.createTime = new Date( patientInfo.createTime).getTime();
    this.http.post('/addPatient',  patientInfo).then(
      res => {
        if (res.data.status === 'success') {
          message.success('保存成功！')
          this.setState({
            mode: 'view',
            patient: res.data.data.patient,
          })
          const newID = res.data.data.patient.id;
          this.props.refreshID(newID);
        }
        if (res.data.status === 'fail') {
          message.error('保存失败！请稍后重试');
          this.setState({
            mode: 'edit',
          })
        }
        
      }
    )
  }
  
  componentDidMount() {
    const id = this.context;
    if (id && id!== 'new') {
      this.http.post('/getPatientByID', {patientID: id}).then(
        res => {
          this.setState({
            patient: get(res, 'data.data.patient', {}),
            spinVisible: false,
          });
        },
        err => {
          message.error('网络错误！请稍后重试！')
        }
      )
    } else {
      this.setState({
        spinVisible: false
      })
    }
    this.setState({
      mode: this.props.type || 'edit'
    })
  }
  
  
  render() {
    const { mode, patient, spinVisible } = this.state;
    return (
      <div className="info-container w-100 px-3">
        {
          spinVisible ? (
            <div className="spin-container">
              <Spin size="large"/>
            </div>
          ) : (
            <>
  
              {
                mode === 'edit' && (
                  <Form
                    labelCol={{ span: 12}}
                    wrapperCol={{span: 12}}
                    name="control-ref"
                    className='info-edit w-100 px-5'
                    onFinish={this.handleFinish}
                    onFinishFailed={this.handleFinishFailed}
                  >
                    <Divider orientation="left">个人信息</Divider>
                    <Row gutter={24}>
                      <Col span={8} key='recordID' defaultValue={patient.recordID}>
                        <Form.Item label="就诊卡号/医保号" name="recordID" initialValue={patient.recordID || ''} rules={[
                          {
                            required: true,
                            message: '请输入就诊卡号/医保号',
                          },
                        ]}>
                          <Input />
                        </Form.Item>
                      </Col>
          
                      <Col span={8} key='name'>
                        <Form.Item label="姓名" name="name" initialValue={patient.name || ''} rules={[
                          {
                            required: true,
                            message: '请输入姓名',
                          },
                        ]}>
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={8} key='sex'>
                        <Form.Item label="性别" name="sex" initialValue={patient.sex || '0'} rules={[
                          {
                            required: true,
                            message: '请输入性别',
                          },
                        ]}>
                          <Radio.Group >
                            <Radio value="0">男</Radio>
                            <Radio value="1">女</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
          
                      <Col span={8} key='age'>
                        <Form.Item label="年龄（岁）" name="age" initialValue={patient.age || ''}>
                          <Input />
                        </Form.Item>
                      </Col>
          
                      <Col span={8} key='state'>
                        <Form.Item label="病人状态" name="state" initialValue={patient.state || "1"} rules={[
                          {
                            required: true,
                            message: '请输入病人状态',
                          },
                        ]}>
                          <Select>
                            <Select.Option value="1">超急性期(0-6小时)</Select.Option>
                            <Select.Option value="2">急性期(6-24小时)</Select.Option>
                            <Select.Option value="3">亚急性期(24小时-2周)</Select.Option>
                            <Select.Option value="4">慢性期(大于2周)</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
          
                      <Col span={8} key='firstTime'>
                        <Form.Item label='就诊时间' name="updateTime" initialValue={moment()}>
                          <DatePicker  />
                        </Form.Item>
                      </Col>
                      <Col span={8} key='cva'>
                        <Form.Item label="脑卒中分类" name="cva" initialValue={patient.cva || "in"} rules={[
                          {
                            required: true,
                            message: '请输入脑卒中分类',
                          },
                        ]}>
                          <Select >
                            <Select.Option value="in">缺血性脑梗塞</Select.Option>
                            <Select.Option value="die">出血性脑梗塞</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
        
                    </Row>
                    <Divider orientation="left">疾病信息</Divider>
                    <Row gutter={24}>
                      <Col span={12} wrappercol={{span: 16}} key='description' >
                        <Form.Item
                          label="症状描述"
                          className='description'
                          name="info"
                          initialValue={patient.info || ''}
                          rules={[
                            {
                              required: true,
                              message: '请输入疾病信息',
                            },
                          ]}
                        >
                          <TextArea rows={4} />
                        </Form.Item>
                        <div className="text-format">
                          描述格式: 日期 症状描述
                        </div>
                      </Col>
                      <Col span={12} wrappercol={{span: 24}} key='result' >
                        <Form.Item
                          label="诊疗结果"
                          className='result'
                          name="result"
                          initialValue={patient.result || ''}
                          rules={[
                            {
                              required: true,
                              message: '请输入诊疗结果',
                            },
                          ]}>
                          <TextArea rows={4} />
                        </Form.Item>
                        <div className="text-format">
                          描述格式: 日期 诊疗结果
                        </div>
                      </Col>
                    </Row>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
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
                      <Button type="primary" className='back-button ml-3' onClick={() => {history.push('/patientList/operator')}}>返回</Button>
                    </div>
                    <Descriptions bordered title="个人信息" column={3} className='basic-info-viewer'>
                      <Descriptions.Item label="就诊卡号/医保号">{patient.recordID}</Descriptions.Item>
                      <Descriptions.Item label="姓名">{patient.name}</Descriptions.Item>
                      <Descriptions.Item label="性别">{patient.sex.toString()==='0'? '男': '女'}</Descriptions.Item>
                      <Descriptions.Item label="年龄（岁）">{patient.age}</Descriptions.Item>
                      <Descriptions.Item label="病人状态">{stateMap[patient.state]}</Descriptions.Item>
                      <Descriptions.Item label="就诊时间">{patient.updateTime}</Descriptions.Item>
                      <Descriptions.Item label="脑卒中分类">{patient.cva === "in" ? "缺血性脑梗塞" : "出血性脑梗塞"}</Descriptions.Item>
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
            </>
          )
        }
      </div>
    )
  }
}
export default InfoEdit;
InfoEdit.contextType = idContext;
