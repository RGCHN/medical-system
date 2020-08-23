import React from "react";
import { Tabs} from 'antd';

const { TabPane } = Tabs;

class DiseaseTrend extends React.Component{
  state = {
    sideKey: 'area',
  }
  
  
  render(){
    return(
      <div className="trend-container m-3">
        <Tabs defaultActiveKey="area" type="card">
          <TabPane tab="脑梗死区域面积" key="area">
            <div />
          </TabPane>
          <TabPane tab="神经功能缺损评分(NIHSS)" key="score">
            <div />
          </TabPane>
          
        </Tabs>
      </div>
    )
  }

}

export default DiseaseTrend
