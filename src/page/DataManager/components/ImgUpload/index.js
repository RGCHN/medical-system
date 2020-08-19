import React from "react";
import { Upload, Layout, message, Modal,} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';


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
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
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
      <div className='img-upload-container d-flex jc-between ai-center'>
        <div className="img-upload-side clearfix">
          <Upload
            action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
            listType="picture-card"
            fileList={ ADCList }
            onPreview={this.handlePreview}
            onChange={this.handleADCChange}
          >
            {uploadButton}
          </Upload>
          <Modal
            visible={previewVisible}
            footer={null}
            onCancel={this.handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
  
          <Upload
            action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
            listType="picture-card"
            fileList={DWIList}
            onPreview={this.handlePreview}
            onChange={this.handleDWIChange}
          >
            {uploadButton}
          </Upload>
          <Modal
            visible={previewVisible}
            footer={null}
            onCancel={this.handleCancel}
          >
          </Modal>
        </div>
        <div className="img-upload-content">
        
        </div>
      </div>
      
    );
  }
}

export default ImgUpload;
