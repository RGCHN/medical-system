import React from "react";
import { Breadcrumb, Layout,Menu} from 'antd';
import { UserOutlined, LaptopOutlined, AreaChartOutlined} from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import InfoEdit from "../InfoEdit";
import IntelligentView from "../IntelligentView";
import DiseaseTrend from "../DiseaseTrend";
import history from "../../../../utils/history";
import idContext from '../idContext';
import './index.scss'

const { Sider, Content } = Layout;

const MOCK_PATIENT = {
    id:'1111',
    doctorName:'张伟华医师',
    patientName: '李兵',
    gender:'男',
    age: 32,
    result: '出血性脑梗塞',
}

class PatientDetail extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      patientID: '',
      patient: MOCK_PATIENT,
      sideKey:'basic',
      disabled: false,
      basicType:'edit'
    }
  }
  
  handleMenuClick = (key) => {
    this.setState({
      sideKey: key
    })
  }
  refreshID = newID => {
    this.setState({
      patientID: newID,
      disabled: false,
    })
    history.push(`/patientInfo/basic/${newID}/view`);
  }
  
  componentDidMount() {
    const { mode, type, id} = this.props.match.params;
    this.setState({
      sideKey: mode,
      disabled: id === 'new',
      basicType: type,
      patientID: id,
    })
  }
  
  componentWillReceiveProps(nextProps, nextContext) {
    const {id} = nextProps.match.params;
    this.setState({
      patientID: id,
    })
  }
  
  render() {
    const { sideKey, patientID, disabled, type} = this.state;
    return (
      <div className='patient-edit-container m-3'>
        <idContext.Provider value={patientID}>
          <Layout>
            <Sider className="site-layout-background" style={{height:'100vh', overflow: 'auto'}}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['basic']}
                defaultOpenKeys={['basic']}
                style={{ height: '100%', borderRight: 0 }}
                onClick={({key}) => this.handleMenuClick(key)}
              >
                <Menu.Item key="basic" icon={<UserOutlined/>} >基本信息</Menu.Item>
                <Menu.Item key="intelligent" icon={<LaptopOutlined />} disabled={disabled}>智能诊疗</Menu.Item>
                <Menu.Item key="trend" icon={<AreaChartOutlined />} disabled={disabled}>疾病趋势</Menu.Item>
              </Menu>
            </Sider>
            <Content>
              {
                sideKey === 'basic' && (
                  <>
                    <Breadcrumb className="m-3">
                      <Breadcrumb.Item>数据管理</Breadcrumb.Item>
                      <Breadcrumb.Item>基本信息</Breadcrumb.Item>
                    </Breadcrumb>
                    <InfoEdit refreshID={this.refreshID} type={type}/>
                  </>
                )
              }
              {
                sideKey === 'intelligent' && (
                  <>
                    <Breadcrumb className='m-3' >
                      <Breadcrumb.Item>数据管理</Breadcrumb.Item>
                      <Breadcrumb.Item>辅助诊疗</Breadcrumb.Item>
                      <Breadcrumb.Item>智能诊疗</Breadcrumb.Item>
                    </Breadcrumb>
                    <IntelligentView />
                  </>
                )
              }
              {
                sideKey === 'trend' && (
                  <>
                    <Breadcrumb className="m-3">
                      <Breadcrumb.Item>数据管理</Breadcrumb.Item>
                      <Breadcrumb.Item>辅助诊疗</Breadcrumb.Item>
                      <Breadcrumb.Item>智能诊疗</Breadcrumb.Item>
                    </Breadcrumb>
                    <DiseaseTrend />
                  </>
                )
              }
            </Content>
          </Layout>
        </idContext.Provider>
      </div>
    )
  }
}

export default withRouter(PatientDetail)
