import React from "react";
import RoiRegion from "./components/RoiRegion";
import RoiTrend from "./components/RoiTrend";
import RoiBenefit from "./components/RoiBenefit";
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
          <TabPane tab="梗死区域变化" key="roiRegion">
            <RoiRegion />
          </TabPane>
          <TabPane tab="梗死区域面积变化趋势" key="roiTrend">
            <RoiTrend />
          </TabPane>
          <TabPane tab="溶栓治疗获益变化趋势" key="roiBenefit">
            <RoiBenefit />
          </TabPane>
          
        </Tabs>
      </div>
    )
  }

}

export default DiseaseTrend
