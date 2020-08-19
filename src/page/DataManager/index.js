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
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };
  
  goPatientEdit = recordId => {
    this.props.history.push(`/patientEdit/${recordId}`);
  }
  
  
  render() {
    let { sortedInfo, filteredInfo, selectionType } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: '病例编号',
        dataIndex: 'recordId',
        key: 'recordId',
        filteredValue: filteredInfo.recordId || null,
        onFilter: (value, record) => record.recordId.includes(value),
        sorter: (a,b) => Number(a.recordId)  - Number(b.recordId) ,
        sortOrder: sortedInfo.columnKey === 'recordId' && sortedInfo.order,
        ellipsis: true,
        
      },
      {
        title: '负责医师',
        dataIndex: 'doctorName',
        key: 'doctorName',
        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.doctorName.includes(value),
        sorter: (a, b) => a.doctorName.length - b.doctorName.length,
        sortOrder: sortedInfo.columnKey === 'doctorName' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: '姓名',
        dataIndex: 'patientName',
        key: 'patientName',
        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.patientName.includes(value),
        sorter: (a, b) => a.patientName.length - b.patientName.length,
        sortOrder: sortedInfo.columnKey === 'patientName' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.patientName.includes(value),
        sorter: (a, b) => a.patientName.length - b.patientName.length,
        sortOrder: sortedInfo.columnKey === 'patientName' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: '就诊卡号/医保号',
        dataIndex: 'recordId',
        key: 'recordId',
        filteredValue: filteredInfo.recordId || null,
        onFilter: (value, record) => record.recordId.includes(value),
        sorter: (a,b) => Number(a.recordId)  - Number(b.recordId) ,
        sortOrder: sortedInfo.columnKey === 'recordId' && sortedInfo.order,
        ellipsis: true,
    
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        sorter: (a, b) => a.age - b.age,
        sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: '脑卒中分类',
        dataIndex: 'address',
        key: 'address',
        filteredValue: filteredInfo.address || null,
        ellipsis: true,
      },
      {
        title: '病人状态',
        dataIndex: 'patientStatus',
        key: 'patientStatus',
        filteredValue: filteredInfo.patientStatus || null,
        onFilter: (value, record) => record.address.includes(value),
        sorter: (a, b) => a.address.length - b.address.length,
        sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
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
        filteredValue: filteredInfo.address || null,
        onFilter: (value, record) => record.address.includes(value),
        sorter: (a, b) => a.address.length - b.address.length,
        sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
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
      <div className='data-manager-container'>
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
        }} columns={columns} dataSource={data} onChange={this.handleChange} />
      </div>
    );
  }
}

export default withRouter(DataManager);
