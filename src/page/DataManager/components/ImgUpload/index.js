import React from "react";
import { Upload, message, Modal, Select, Button} from 'antd';
import {  PlusOutlined, DownloadOutlined }from '@ant-design/icons';
import idContext from '../idContext';
import './index.scss'

const { Option } = Select;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class ImgUpload extends React.Component {
  state = {
    loading: false,
    previewVisible: false,
    previewImage: "",
    ADCList:[],
    DWIList:[],
    resultInfo:'',
  };
  resultId = 0;
  selectedModel = '';
  id = this.context;
  
  handleCancel = () => this.setState({ previewVisible: false });
  
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };
  
  handleADCChange = ({ fileList }) => this.setState({ADCList: fileList});
  handleDWIChange = ({ fileList }) => this.setState({DWIList: fileList});
  
  goPredict = () => {
    this.modelHttp.post('/analyze',{
      adc_file: '',
      backmodel : this.selectedModel,
      dwi_file: '',
      patientID: this.id,
      
    }).then(
      res => {
        // res会返回查看结果内容
        console.log(res);
        this.setState({
          resultInfo: res.data.info,
        })
      }, err => {
        message.error('网络错误！请稍后重试！')
      }
    )
  }
  
  getReport = () => {
    this.modelHttp.post('/getReport',{resultID: this.resultId}).then(
      res => {
        console.log(res);
      }, err => {
        message.error('网络错误！请稍后重试！')
      }
    )
    
  }
  selectModel = value => {
    this.selectedModel = value;
  }
  
  render() {
    const { previewVisible, previewImage, ADCList, DWIList, resultInfo } = this.state;
    const uploadButton = text => (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">{text}</div>
      </div>
    );
    return (
      <div className='img-upload-container d-flex flex-column ai-center w-100'>
        <div className="img-upload-side d-flex flex-column ">
          <div className="adc-container">
            <Upload
              action="http://10.13.81.190:5051/api/imgUpload"
              listType="picture-card"
              className='adc-img-card'
              fileList={ ADCList }
              onPreview={this.handlePreview}
              onChange={this.handleADCChange}
              withCredentials={true}
              data={{
                patientID: this.id,
                type:'ADC'
              }}
            >
              {ADCList.length >=16 ? null:uploadButton("ADC影像")}
            </Upload>
            <Modal
              visible={previewVisible}
              footer={null}
              onCancel={this.handleCancel}
            >
              <img alt="ADC" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </div>
          <div className='dwi-container'>
            <Upload
              action="http://10.13.81.190:5051/api/imgUpload"
              listType="picture-card"
              fileList={DWIList}
              onPreview={this.handlePreview}
              onChange={this.handleDWIChange}
              progress={{ strokeWidth: 2, showInfo: false }}
              data={{
                patientID: this.id,
                type:'DWI'
              }}
            >
              {DWIList.length >= 16? null:uploadButton("DWI影像")}
            </Upload>
            <Modal
              visible={previewVisible}
              footer={null}
              onCancel={this.handleCancel}
            >
            </Modal>
          </div>
        </div>
        <div className="img-upload-content mx-5 mt-3 h-100 w-100">
          <div className="d-flex jc-between ai-center">
            <div className="model-choose d-flex ai-center mb-3">
              <div className='mr-3'>选择模型</div>
              <Select style={{ width: 120 }} className='mr-5' onChange={this.selectModel}>
                <Option value='unit'>Unet</Option>
                <Option value='RandomForest'>RandomForest</Option>
                <Option value='ResNet'>ResNet</Option>
              </Select>
              <Button type="primary" onClick={this.goPredict}>预测</Button>
            </div>
            <div className="result-operation d-flex ai-center m-3">
              <Button type='primary mr-3' onClick={this.getReport}>下载生成辅助报告</Button>
            </div>
          </div>
         
          <div className="result-container w-100">
            <div className="result-show w-100">
              <div className="title w-100 pl-3">查看结果</div>
              <div className="result-img w-100" >
                {resultInfo}
              </div>
            </div>
          </div>
  
        </div>
      </div>
    );
  }
}

export default ImgUpload;
ImgUpload.contextType = idContext;
