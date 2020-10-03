import React from "react";
import { withRouter, NavLink} from 'react-router-dom';
import {Table, Space, Radio, Tag, Button, Input} from 'antd';
import './index.scss'
import { stateMap } from "../../utils/tools";


const DEFAULT_DATA = [
  {
    key:'1',
    id: '1',
    recordID:'1111',
    doctor:'张伟华医师',
    name: '李兵',
    sex:'男',
    age: 32,
    cva: '出血性脑梗塞',
    state: '1',
    updateTime: '2020-9-11',
  },
  {
    key:'2',
    id: '2',
    recordID:'2222',
    doctor:'张伟华医师',
    name: '林硕',
    sex:'男',
    cva: '缺血性脑梗塞',
    age: 18,
    state: '2',
    updateTime: '2020-01-15',
  },
  {
    key:'3',
    id: '3',
    recordID:'3333',
    doctor:'王业医师',
    name: '刘雯',
    sex:'女',
    age: 55,
    cva: '缺血性脑梗塞',
    state: '3',
    updateTime: '2020-05-23',
  },
  {
    key:'4',
    id: '4',
    recordID:'4444',
    doctor:'李涛医师',
    sex:'女',
    name: '吴芬婷',
    age: 82,
    cva: '出血性脑梗塞',
    state: '4',
    updateTime: '2019-12-27',
  },
];

class DataManager extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    selectionType: null,
    patientData: [],
    mode: 'operator',
  };
  
  handleSearch = value => {
    const resList = this.state.patientData.filter( item => item.name === value);
    this.setState({
      patientData: resList
    })
  }
  
  
  componentDidMount() {
    this.http.get('/getPatients').then(res => {
      this.setState({
        patientData: res.data.data.patientList
      })
    }, err => {
      this.setState({
        patientData: DEFAULT_DATA
      })
    });
  }
  
  render() {
    let { selectionType, patientData, mode } = this.state;
    const listColumns = [
      {
        title: '病例编号',
        dataIndex: 'id',
        key: 'id',
        ellipsis: true,
        width:100
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        ellipsis: true,
        width:100
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        ellipsis: true,
        width:60
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        ellipsis: true,
        width:60
      },
      {
        title: '脑卒中分类',
        dataIndex: 'cva',
        key: 'cva',
        ellipsis: true,
        width: 140,
        render: cva => {
          let color = 'geekblue';
            if (cva === '出血性脑梗塞') {
              color = 'green';
            }
            return (
              <Tag color={color} key={cva}>
                {cva}
              </Tag>
            );
        },
      },

      {
        title: '脑损伤阶段',
        dataIndex: 'state',
        key: 'state',
        ellipsis: true,
        render: state => {
          return (
            <span>{stateMap[state]}</span>
          )
        },
      },
      {
        title: '负责医师',
        dataIndex: 'doctor',
        key: 'doctor',
        ellipsis: true,
        width:120
      },
      {
        title: '就诊卡号/医保号',
        dataIndex: 'recordID',
        key: 'recordID',
        ellipsis: true,
    
      },
      {
        title: '最近更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        ellipsis: true,
      },
    ];
    const operatorColumns = [
      {
        title: '病例编号',
        dataIndex: 'recordID',
        key: 'recordID',
        ellipsis: true,
        width:100
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        ellipsis: true,
        width:100
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        ellipsis: true,
        width:60
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        ellipsis: true,
        width:60
      },
      {
        title: '脑卒中分类',
        dataIndex: 'cva',
        key: 'cva',
        ellipsis: true,
        width: 140,
        render: cva => {
          let color = 'geekblue';
          if (cva === '出血性脑梗塞') {
            color = 'green';
          }
          return (
            <Tag color={color} key={cva}>
              {cva}
            </Tag>
          );
        },
      },
    
      {
        title: '脑损伤阶段',
        dataIndex: 'state',
        key: 'state',
        ellipsis: true,
        render: state => {
          return (
            <span>{stateMap[state]}</span>
          )
        },
      },
      {
        title: '负责医师',
        dataIndex: 'doctor',
        key: 'doctor',
        ellipsis: true,
        width:120
      },
      {
        title: '操作',
        dataIndex: 'id',
        key: 'action',
        render: id => (
          <Space size="middle">
            <Button>
              <NavLink to={`/patientInfo/basic/${id}/edit`}>编辑</NavLink>
            </Button>
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
        name: record.name,
      }),
    };
    
    return (
      <div className='data-manager-container px-3'>
        <div className="header d-flex jc-between">
          <div className="search-bar d-flex ai-center jc-between">
            <div className="title">病人总览
              <span style={{fontWeight:"bold", color:'#52c51a'}}> { patientData.length || 0} </span>人
            </div>
            <Input.Search className="search-input ml-3" placeholder="输入姓名查找" onSearch={this.handleSearch} />
          </div>
          {
            mode === 'operator' &&
            <div className="add">
              <Button type="primary">
                <NavLink to={`/patientInfo/basic/new/edit`}>添加病例</NavLink>
              </Button>
            </div>
          }
        </div>
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
        }} columns={ mode === 'operator' ? operatorColumns : listColumns} dataSource={patientData} onChange={this.handleChange}
        pagination = {{position:['bottomCenter']}}/>
      </div>
    );
  }
}

export default withRouter(DataManager);
