import React from "react";
import { withRouter } from 'react-router-dom';
import { Table, Space, Radio, Tag, Button} from 'antd';
import './index.scss'


const data = [
  {
    key: '1',
    recordId:'1111',
    doctorName:'王医师',
    patientName: 'John Brown',
    gender:'男',
    age: 32,
    patientStatus: '在访',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    recordId:'2222',
    doctorName:'李医师',
    patientName: 'Jim Green',
    gender:'男',
    age: 42,
    patientStatus: '死亡',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    recordId:'3333',
    doctorName:'王医师',
    patientName: 'Joe Black',
    gender:'女',
    age: 32,
    patientStatus: '康复',
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    recordId:'4444',
    doctorName:'张医师',
    gender:'女',
    patientName: 'Jim Red',
    age: 32,
    patientStatus: '在访',
    address: 'London No. 2 Lake Park',
  },
];

class DataManager extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    selectionType: null,
  };
  
  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
  };
  
  goPatientEdit = recordId => {
    this.props.history.push(`/patientEdit/${recordId}`);
  }
  
  
  render() {
    let { selectionType } = this.state;
    const columns = [
      {
        title: '病例编号',
        dataIndex: 'recordId',
        key: 'recordId',
        ellipsis: true,
        width:100
      },
      {
        title: '负责医师',
        dataIndex: 'doctorName',
        key: 'doctorName',
        ellipsis: true,
        width:100
      },
      {
        title: '姓名',
        dataIndex: 'patientName',
        key: 'patientName',
        ellipsis: true,
        width:100
      },
      {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
        ellipsis: true,
        width:60
      },
      {
        title: '就诊卡号/医保号',
        dataIndex: 'recordId',
        key: 'recordId',
        ellipsis: true,
    
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        ellipsis: true,
        width:100
      },
      {
        title: '脑卒中分类',
        dataIndex: 'address',
        key: 'address',
        ellipsis: true,
      },
      {
        title: '病人状态',
        dataIndex: 'patientStatus',
        key: 'patientStatus',
        width:100,
        render: patientStatus => {
          let color = 'green';
          if(patientStatus === '死亡'){
            color = 'volcano';
          }else if(patientStatus === '在访'){
            color = 'geekblue';
          }
          return (
            <>
              <Tag color={color} key={patientStatus}>
                {patientStatus}
              </Tag>
            </>
          )
        },
        ellipsis: true,
      },
      {
        title: '最近更新时间',
        dataIndex: 'address',
        key: 'address',
        ellipsis: true,
      },
      {
        title: '操作',
        dataIndex: 'recordId',
        key: 'action',
        render: recordId => (
          <Space size="middle">
            <Button>查看</Button>
            <Button onClick={ () => { this.goPatientEdit(recordId) }}>编辑</Button>
          </Space>
        ),
      },
    ];
  
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
      <div className='data-manager-container px-3'>
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
        }} columns={columns} dataSource={data} onChange={this.handleChange}
        pagination = {{position:['bottomCenter']}}/>
      </div>
    );
  }
}

export default withRouter(DataManager);
