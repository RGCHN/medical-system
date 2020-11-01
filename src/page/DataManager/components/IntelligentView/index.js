import React from "react";
import {Button, Collapse, message, Modal, DatePicker} from 'antd';
import { EditFilled, CloseOutlined } from '@ant-design/icons'
import ImgUpload from "../ImgUpload";
import idContext from '../idContext';
import './index.scss'

const { Panel } = Collapse;


export default class IntelligentView extends React.Component{
  state = {
    recordList: [],
    visible: false,
    confirmLoading: false,
    defaultKey:0,
  }
  
  tempDate = '';
  
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  
  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });
    if (this.tempDate !== '') {
      this.setState({
        recordList: this.state.recordList.concat({time: this.tempDate}),
        defaultKey: this.state.recordList.length
      })
    } else {
      message.error("输入的日期错误！请重新输入")
    }
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
      message.success("添加诊疗记录成功！")
    }, 800);
  };
  
  
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  
  onChange = (date, dateString) => {
    this.tempDate = dateString;
  }
  
  genExtra = index => {
    return (
      <>
        <EditFilled className='mx-3'/>
        <CloseOutlined />
      </>
    )
  }
  
  
  componentDidMount() {
    const id = this.context;
    this.modelHttp.post('/getResultsByPatient',{patientID:id}).then(
      res => {
        this.setState({
          recordList: res.data.data.results
        })
      }, err => {
        message.error('网络错误！请稍后重试！')
      }
    )
  }
  
  render(){
    const { visible, confirmLoading, recordList = [], defaultKey} = this.state;
  
    return(
      <div className="intelligent-container mx-3">
        <Button type="primary" className="mb-3" onClick={this.showModal}>
          添加诊疗记录
        </Button>
        <Modal
          title="添加诊疗记录"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          请选择就诊日期：<DatePicker onChange={this.onChange} />
        </Modal>
        <Collapse defaultActiveKey={[defaultKey]}>
          {
            recordList.length !== 0 && recordList.map((record,index) => (
              <Panel key={index} header={record.time.slice(0, 11)} extra={this.genExtra(index)}>
                <ImgUpload data={record}/>
              </Panel>
            ))
          }
        </Collapse>
      </div>
    )
  }
}
IntelligentView.contextType = idContext;
