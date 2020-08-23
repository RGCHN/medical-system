import React from "react";
import { Collapse } from 'antd';
import {EditFilled, CloseOutlined} from '@ant-design/icons'
import ImgUpload from "../ImgUpload";
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
  state = {};
  genExtra = () => (
      <>
        <EditFilled className='mx-3'/>
        <CloseOutlined />
      </>
    )
  
  
  render(){
    return(
      <div className="intelligent-container mx-3">
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
