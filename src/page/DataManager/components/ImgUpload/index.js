import React from "react";
import { Upload, message, Modal, Select, Button,Layout} from 'antd';
import {  PlusOutlined, DownloadOutlined }from '@ant-design/icons';
import './index.scss'

const { Option } = Select;
const { Sider,Content } = Layout;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只允许上传 JPG/PNG 格式的影像!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片大小不能超过2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class ImgUpload extends React.Component {
  state = {
    loading: false,
    previewVisible: false,
    previewImage: "",
    ADCList:[],
    DWIList:[],
  };
  
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
  handleDWIChange = ({ fileList }) => this.setState({DWIList: fileList})
  
  render() {
    const { previewVisible, previewImage, ADCList, DWIList } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className='img-upload-container d-flex w-100'>
        <Layout>
          <Sider className="img-upload-side d-flex flex-column jc-around ai-center">
            <div className="adc-container">
              <p>ADC:</p>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                className='adc-img-card'
                fileList={ ADCList }
                onPreview={this.handlePreview}
                onChange={this.handleADCChange}
                beforeUpload={beforeUpload}
              >
                {ADCList.length >=1 ? null:uploadButton}
              </Upload>
              <Modal
                visible={previewVisible}
                footer={null}
                onCancel={this.handleCancel}
              >
                <img alt="ADC" style={{ width: "100%" }} src={previewImage} />
              </Modal>
              <p className="d-flex jc-center">请上传ADC影像</p>
            </div>
            <div className='dwi-container'>
              <p>DWI:</p>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                style={{width:'160px', height:'150px'}}
                fileList={DWIList}
                onPreview={this.handlePreview}
                onChange={this.handleDWIChange}
                beforeUpload={beforeUpload}
                progress={{ strokeWidth: 2, showInfo: false }}
              >
                {DWIList.length >= 1? null:uploadButton}
              </Upload>
              <Modal
                visible={previewVisible}
                footer={null}
                onCancel={this.handleCancel}
              >
              </Modal>
              <p className="d-flex jc-center">请上传DWI影像</p>
            </div>
          </Sider>
          <Content>
            <div className="img-upload-content mx-5 mt-3 h-100">
              <div className="model-choose d-flex ai-center mb-3">
                <div className='mr-3'>选择模型</div>
                <Select style={{ width: 120 }} className='mr-5'>
                  <Option value='unit'>Unet</Option>
                  <Option value='RandomForest'>RandomForest</Option>
                  <Option value='ResNet'>ResNet</Option>
                </Select>
                <Button type="primary">预测</Button>
              </div>
              <div className="result-container w-100">
                <div className="result-show w-100">
                  <div className="title w-100 pl-3">查看结果</div>
                  <div className="result-img w-100"></div>
                </div>
                <div className="result-operation d-flex ai-center m-3">
                  <div className="result mr-5">预测结果</div>
                  <Button type='primary mr-3'>一键生成辅助报告</Button>
                  <Button type="primary" icon={<DownloadOutlined />} size='middle' />
                </div>
              </div>
  
            </div>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default ImgUpload;
