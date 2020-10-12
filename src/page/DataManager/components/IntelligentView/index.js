import React from "react";
import {Button, Collapse, message} from 'antd';
import { EditFilled, CloseOutlined } from '@ant-design/icons'
import ImgUpload from "../ImgUpload";
import idContext from '../idContext';
import './index.scss'

const { Panel } = Collapse;


const DEFAULT_DATA = [
  "2020-01-28",
  "2020-02-15",
  "2020-04-30",
  "2020-05-19",
  "2020-07-18",
  "2020-08-20",
]

export default class IntelligentView extends React.Component{
  
  genExtra = () => (
      <>
        <EditFilled className='mx-3'/>
        <CloseOutlined />
      </>
    )
  
  componentDidMount() {
    const id = this.context;
    console.log(`id ${id}`);
    this.modelHttp.post('/getResultsByPatient', { "patientID": id}).then(res => {
        console.log(res);
      }, err => {
        message.error('网络错误，请稍候重试！')
      }
    )
    /*this.modelHttp.get('/getResultsByPatient', id).then(
      res=>{
        console.log(res);
      }
    )*/
  }
  
  render(){
    return(
      <div className="intelligent-container mx-3">
        <Button type="primary" className="mb-3">
          添加诊疗记录
        </Button>
        <Collapse defaultActiveKey={['0']}>
          {
            DEFAULT_DATA.map((date,index) => (
              <Panel key={index} header={date} extra={this.genExtra()}>
                <ImgUpload />
              </Panel>
            ))
        
          }
        </Collapse>,
      </div>
    )
  }
}
IntelligentView.contextType = idContext;
