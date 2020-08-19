import React from "react";
import { Breadcrumb, Layout,Menu} from 'antd';
import { UserOutlined, LaptopOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import InfoEdit from "../InfoEdit";
import ImgUpload from "../ImgUpload";
import './index.scss'


const { SubMenu } = Menu;
const { Sider } = Layout;

const MOCK_PATIENT = {
    recordId:'1111',
    doctorName:'王医师',
    patientName: 'John Brown',
    gender:'男',
    age: 32,
    result: '血栓性脑梗塞',
}


class PatientDetail extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      patient: MOCK_PATIENT,
      sideKey:'basic',
    }
  }
  
  handleMenuClick = (key) => {
    this.setState({
      sideKey: key
    })
  }
  
  render() {
    //const { match } = this.props;
    const { sideKey } = this.state;
    return (
      <div className='patient-edit-container mx-3'>
        <Layout>
          <Sider className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['intelligent']}
              defaultOpenKeys={['intelligent']}
              style={{ height: '100%', borderRight: 0 }}
              onClick={({key}) => this.handleMenuClick(key)}
            >
              <Menu.Item key="basic" icon={<UserOutlined />} >基本信息</Menu.Item>
              <SubMenu key="help" icon={<LaptopOutlined />} title="辅助诊疗">
                <Menu.Item key="intelligent">智能诊疗</Menu.Item>
                <Menu.Item key="trend">疾病趋势</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            {
              sideKey === 'basic' && (
                <>
                  <Breadcrumb>
                    <Breadcrumb.Item>数据管理</Breadcrumb.Item>
                    <Breadcrumb.Item>基本信息</Breadcrumb.Item>
                  </Breadcrumb>
                  <InfoEdit />
                </>
              )
            }
            {
              sideKey === 'intelligent' && (
                <>
                  <Breadcrumb>
                    <Breadcrumb.Item>数据管理</Breadcrumb.Item>
                    <Breadcrumb.Item>辅助诊疗</Breadcrumb.Item>
                    <Breadcrumb.Item>智能诊疗</Breadcrumb.Item>
                  </Breadcrumb>
                  <ImgUpload />
                </>
              )
            }
            
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default withRouter(PatientDetail)
