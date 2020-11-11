import React from "react";
import {Table, Select, Button, Divider, Modal, Form, InputNumber} from 'antd';
import {DeleteFilled, FundViewOutlined} from '@ant-design/icons';
import './index.scss'

const DEFAULT_MODELS = [
  {
    key:'1',
    modelName:'U-net-1',
    lastTrainTime:'2020-03-20 10:00',
    performance:{
      specificity:'0.902',
      sensitive:'0.812',
      AUC:'0.920',
    },
    params:{
      learningRate:'0.02',
      batchSize:'1000',
      optimizer:'SGD',
      epoch:'100',
      activateFunction:'relu',
    }
  },
  {
    key:'2',
    modelName:'FCN',
    lastTrainTime:'2020-05-20 06:15',
    performance:{
      specificity:'0.902',
      sensitive:'0.812',
      AUC:'0.920',
    },
    params:{
      learningRate:'',
      batchSize:'',
      optimizer:'',
      epoch:'',
      activateFunction:'',
    }
  },
  {
    key:'3',
    modelName:'RCNN',
    lastTrainTime:'2020-04-05 10:23',
    performance:{
      specificity:'0.902',
      sensitive:'0.812',
      AUC:'0.920',
    },
    params:{
      learningRate:'',
      batchSize:'',
      optimizer:'',
      epoch:'',
      activateFunction:'',
    }
  },
  {
    key:'4',
    modelName:'YOLOv3',
    lastTrainTime:'2020-07-10 19:47',
    performance:{
      specificity:'0.902',
      sensitive:'0.812',
      AUC:'0.920',
    },
    params:{
      learningRate:'',
      batchSize:'',
      optimizer:'',
      epoch:'',
      activateFunction:'',
    }
  },
  {
    key:'5',
    modelName:'U-net-5',
    lastTrainTime:'2020-08-02 22:56',
    performance:{
      specificity:'0.902',
      sensitive:'0.812',
      AUC:'0.920',
    },
    params:{
      learningRate:'',
      batchSize:'',
      optimizer:'',
      epoch:'',
      activateFunction:'',
    }
  },
];

export default class ModelManager extends React.Component {
  state = {
    modelTable:DEFAULT_MODELS,
    modalVisible:false,
    selectedItem:{}
  };
  
  columns = [
    {
      title:'神经网络名称',
      dataIndex:'modelName',
      key:'modelName',
      render: (text, record) => (
        <div className="d-flex ai-end" onClick={() => this.openModal(record)}>
          <div className='mr-2'>{text}</div>
          <FundViewOutlined style={{color:'green', fontSize:'1.5rem'}} />
        </div>
      )
    },
    {
      title:'上次训练时间',
      dataIndex: 'lastTrainTime',
      key: 'lastTrainTime'
    },
    {
      title: '模型性能',
      dataIndex: 'performance',
      key: 'performance',
      render: text =>(
        <>
          <span>特异度：{text.specificity} </span>
          <Divider type="vertical" />
          <span>灵敏度：{text.sensitive} </span>
          <Divider type="vertical" />
          <span>AUC：{text.AUC}</span>
        </>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record, index) => (
        <div >
          <Button type='primary' className='mr-3' onClick={() => this.openModal(record)}>模型训练</Button>
          {/*<DeleteFilled style={{fontSize:'1.5rem'}} onClick={() => this.deleteModel(index)}/>*/}
        </div>
      ),
    },
  ]
  openModal = record => {
    this.setState({
      selectedItem:record,
      modalVisible: true
    })
  }
  
  setParams = () => {
    this.setState({
      modalVisible:false
    })
  }
  
  handleCancel = () => {
    this.setState({
      modalVisible:false
    })
  
  }
  
  deleteModel = index => {
    let { modelTable } = this.state;
    modelTable.splice(index, 1);
    this.setState({
      modelTable,
    });
  }
  
  
  render() {
    const { modelTable, modalVisible, selectedItem } = this.state;
    return (
      <div className="data-manager-container px-3">
        <div className="form-container">
          <div className="form-title d-flex mb-3">
            <h2>我的模型</h2>
            <span className='text-light-gray ml-5'>共{modelTable.length}个模型</span>
          </div>
          <Table columns={this.columns} dataSource={modelTable}  pagination = {{position:['bottomCenter']}}/>
          <Modal title="设置训练参数"
                 visible={modalVisible}
                 onOk={this.setParams}
                 onCancel={this.handleCancel}
                 okText="确认"
                 cancelText="取消"
                 destroyOnClose>
            <Form initialValues={selectedItem.params} labelCol={{span: 8}}
                  wrapperCol={{span: 6}} layout="horizontal" preserve={false}>
              <Form.Item label="学习率" name="learningRate">
                <InputNumber />
              </Form.Item>
              <Form.Item label="batch_size" name="batchSize">
                <InputNumber />
              </Form.Item>
              <Form.Item label="优化器" name="optimizer">
                <Select>
                  <Select.Option value="sgd">SGD</Select.Option>
                  <Select.Option value="momentum">Momentum</Select.Option>
                  <Select.Option value="Adam">Adam</Select.Option>
                  <Select.Option value="RMSProp">RMSProp</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="迭代次数" name="epoch">
                <InputNumber />
              </Form.Item>
              <Form.Item label="激活函数" name="activateFunction">
                <Select>
                  <Select.Option value="softmax">Softmax</Select.Option>
                  <Select.Option value="relu">Relu</Select.Option>
                  <Select.Option value="sigmoid">Sigmoid</Select.Option>
                  <Select.Option value="tanh">Tanh</Select.Option>
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    )
  }
}
