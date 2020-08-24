import React from "react";
import './index.scss'
import {Breadcrumb, Button, Input, Radio, Space, Table} from "antd";

const USER_DATA = [
  {"id": 1, "name": "admin", "role": "管理员"},
  {"id": 2, "name": "zj", "role": "管理员"},
  {"id": 3, "name": "赵晗", "role": "管理员"},
  {"id": 4, "name": "xiaozj", "role": "医生"},
  {"id": 5, "name": "陈榕", "role": "管理员"},
  {"id": 6, "name": "吴锦毅", "role": "管理员"},
  {"id": 7, "name": "华盛顿", "role": "医生"},
];

const column = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '权限',
    dataIndex: 'role'
  },
  {
    title: '操作',
    key:'action',
    render: recordId => (
      <Space size="middle">
        <Button onClick={ () => { this.goPatientEdit(recordId) }}>编辑</Button>
        <Button>删除</Button>
      </Space>
    ),
  }
]

export default class ProfileManager extends React.Component {
  state = {
    userData: USER_DATA,
    filteredInfo: null,
    sortedInfo: null,
    selectionType: null,
  };
  
  handleSearch = value => {
    const resList = this.state.userData.filter( item => item.name === value);
    this.setState({
      userData: resList
    })
  }
  
  
  
  render() {
    const { userData, selectionType } = this.state;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
      }),
    };
    return (
      <div className="profile-manager-container">
        <Breadcrumb className="m-3">
          <Breadcrumb.Item>账号管理</Breadcrumb.Item>
          <Breadcrumb.Item>用户权限管理</Breadcrumb.Item>
        </Breadcrumb>
        <div className="account-table-container ml-5 mt-3">
          <div className="search-bar d-flex ai-center">
            <div>账号总览 <span style={{fontWeight:"bold", color:'#52c51a'}}>{ userData.length }</span> 人</div>
            <Input.Search className="search-input ml-3" placeholder="查找姓名" onSearch={this.handleSearch} />
          </div>
          <div className="account-table">
            <Radio.Group
              onChange={({ target: { value } }) => {
                this.setState({selectionType: value})
              }}
              value={selectionType}
            >
            </Radio.Group>
            <Table rowSelection={{
              type: selectionType,
              ...rowSelection,
            }} columns={column} dataSource={userData} onChange={this.handleChange}
                   pagination = {{position:['bottomCenter']}}/>

          </div>
        </div>
      </div>
    )
  }
}
