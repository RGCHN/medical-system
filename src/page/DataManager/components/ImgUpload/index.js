import React from "react";
import {Upload, message, Select, Button, Carousel, Image, Spin} from 'antd';
import { UploadOutlined }from '@ant-design/icons';
import idContext from '../idContext';
import './index.scss';

const { Option } = Select;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 2,
  draggable: true,
};

class ImgUpload extends React.Component {
  state = {
    loading: false,
    ADCList:[],
    DWIList:[],
    nonPerfusion:[],
    perfusionList:[],
    mode: 'show',// show或者edit
    modelType: '0',
    resultId: 0,
    reportUrl:'',
    adcUpload: [],
    dwiUpload: [],
    adcFileName: '',
    dwiFileName: '',
    uploading: false,
    predicting: false,
  }
  id = this.context;
  
  
  goPredict = () => {
    this.setState({
      predicting: true
    });
    this.modelHttp.post('/analyze',{
      adc_file: this.state.adcFileName,
      backmodel : this.state.modelType,
      dwi_file: this.state.dwiFileName,
      patientID: this.id,
      
    }).then(
      res => {
        if (res.data.status === 'fail') {
          message.error('输入参数有误！请重新输入')
        } else {
        
        }
        this.setState({
          resultInfo: res.data.info,
        })
      }, err => {
        message.error('网络错误！请稍后重试！')
      }
    )
  }
  
  getReport = () => {
    this.modelHttp.post('/getReport',{resultID: this.state.resultId}, {responseType:'blob'}).then(
      res => {
        console.log(res);
        const blob = new Blob([res.data], {
          type: 'application/pdf',// word是msword
        });
        const objectUrl = URL.createObjectURL(blob);
        const aLink = document.createElement('a');
        aLink.style.display='none';
        aLink.href = objectUrl;
        aLink.download=`${this.state.resultId}结果报告`;
        document.body.appendChild(aLink);
        aLink.click();
        document.body.removeChild(aLink);
      }, err => {
        message.error('网络错误！请稍后重试！')
      }
    )
    
  }
  
  selectModel = value => {
    this.selectedModel = value;
  }
  
  getImgList = (imgData, text) => {
    if (imgData.length === 0) {
      return ;
    }
    return (
      <>
        <div>{text}</div>
        <Carousel {...settings}>
          {
            imgData.map((item, index) => (
              <>
                <Image src={item} alt="" key={index} height='160px' width='160px'/>
                <div className="img-index">{index + 1}</div>
              </>
            ))
          }
        </Carousel>
      </>
      
    )
  }
  
  componentDidMount() {
    const { data } = this.props;
    if (data.id) {
      this.setState({
        mode: 'show',
        ADCList: data.adc.adc_imgs,
        DWIList: data.dwi.dwi_imgs,
        nonPerfusion: data.non_perfusion.non_perfusion_imgs,
        perfusionList: data.perfusion.perfusion_imgs,
        modelType: data.modelType.toString(),
        resultId: data['id'],
      })
    } else {
      this.setState({
        mode: 'edit',
      })
    }
  }
  
  onRemove = (file, type) => {
    if (type === 'ADC') {
      this.setState(state => {
        const list  = state.adcUpload;
        const index = list.indexOf(file);
        const newFileList = list.slice();
        newFileList.splice(index, 1);
        return {
          adcUpload: newFileList,
        };
      });
    }
    if (type === 'DWI') {
      this.setState(state => {
        const list  = state.dwiUpload;
        const index = list.indexOf(file);
        const newFileList = list.slice();
        newFileList.splice(index, 1);
        return {
          dwiUpload: newFileList,
        };
      });
    }
    
  };
  
  beforeUpload = (file, type) => {
    if (type === 'ADC') {
      this.setState(state => ({
        adcUpload: [...state.adcUpload, file],
      }));
    }
    if (type === 'DWI') {
      this.setState(state => ({
        dwiUpload: [...state.dwiUpload, file],
      }));
    }
    
    return false;
  };
  
  handleUpload = () => {
    const { adcUpload, dwiUpload } = this.state;
    let adcForm = new FormData();
    adcUpload.forEach(file => {
      adcForm.append('file', file);
      adcForm.append('patientID', this.id);
      adcForm.append('type', 'ADC');
    });
  
    let dwiForm = new FormData();
    dwiUpload.forEach(file => {
      dwiForm.append('file', file);
      dwiForm.append('patientID', this.id);
      dwiForm.append('type', 'DWI');
    });
    
    this.setState({
      uploading: true,
    });
  
    this.modelHttp.post('/imgUpload',adcForm, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(
      res => {
        if (res.data.status === 'success') {
          message.success('ADC影像上传成功！');
          this.setState({
            ADCList: res.data.data.imgs,
            adcFileName: res.data.data.filename,
          })
        }
        this.setState({
          uploading: false,
        });
      },
      err => {
        this.setState({
          uploading: false,
        });
        message.error('网络错误！请稍后重试！')
      }
    );
  
    this.modelHttp.post('/imgUpload',dwiForm, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(
      res => {
        if (res.data.status === 'success') {
          message.success('DWI影像上传成功！');
          this.setState({
            DWIList: res.data.data.imgs,
            dwiFileName: res.data.data.filename,
          })
        }
        this.setState({
          uploading: false,
        });
      },
      err => {
        this.setState({
          uploading: false,
        });
        message.error('网络错误！请稍后重试！')
      }
    )
  };
  
  render() {
    const { ADCList, DWIList, mode, modelType, nonPerfusion, perfusionList, spinVisible, adcUpload, dwiUpload, uploading, predicting} = this.state;
    
    return (
      <div className='img-upload-container d-flex flex-column ai-center w-100'>
        {
          spinVisible ? (
            <div className="spin-container">
              <Spin size="large"/>
            </div>
          ) : (
            <>
              <div className="img-upload-side d-flex flex-column ">
                {
                  mode === 'edit' && (
                    <div className="file-upload-container d-flex ai-start">
                    <div className="adc-container d-flex ai-start mr-3">
                      <Upload
                        name="file"
                        fileList={adcUpload}
                        onRemove={file => this.onRemove(file)}
                        beforeUpload={file => this.beforeUpload(file, 'ADC')}
                        progress={{
                          strokeColor: {
                            '0%': '#108ee9',
                            '100%': '#87d068',
                          },
                          strokeWidth: 3,
                          format: percent => `${parseFloat(percent.toFixed(2))}%`,
                        }}
                      >
                        <Button icon={<UploadOutlined />}>选择ADC影像</Button>
                      </Upload>
                    </div>
                    <div className="dwi-container d-flex ai-start mr-3">
                      <Upload
                        name="file"
                        fileList={dwiUpload}
                        onRemove={file => this.onRemove(file)}
                        beforeUpload={file => this.beforeUpload(file, 'DWI')}
                        progress={{
                          strokeColor: {
                            '0%': '#108ee9',
                            '100%': '#87d068',
                          },
                          strokeWidth: 3,
                          format: percent => `${parseFloat(percent.toFixed(2))}%`,
                        }}
                      >
                        <Button icon={<UploadOutlined />}>选择DWI影像</Button>
                      </Upload>
                    </div>
                    <Button
                      type="primary"
                      onClick={this.handleUpload}
                      disabled={adcUpload.length !== 1}
                      loading={uploading}
                    >
                      {uploading ? '正在上传' : '开始上传'}
                    </Button>
                  </div>
                  )
                }
                <div className="d-flex flex-column ">
                {
                  
                  this.getImgList(ADCList, '【ADC影像】')
                }
                {
                  this.getImgList(DWIList, '【DWI影像】')
                }
                <div className="img-upload-content mt-3 h-100 w-100">
                  <div className="d-flex jc-between ai-center">
                    <div className="model-choose d-flex ai-center mb-3">
                      <div className='mr-3'>选择模型</div>
                      <Select
                        defaultValue={modelType}
                        style={{ width: 120 }}
                        className='mr-5'
                        onChange={this.selectModel}
                        >
                        <Option value="0">ALEM</Option>
                        <Option value="1">AUet</Option>
                        {/*<Option value="2">PC-Net</Option>
                        <Option value="3">MSM-Net</Option>*/}
                      </Select>
                      <Button
                        type="primary"
                        onClick={this.goPredict}
                        loading={predicting}
                      >
                        {
                          predicting ? '正在预测' : '预测'
                        }
                      </Button>
                    </div>
                    <div className="result-operation d-flex ai-center m-3">
                      <Button type='primary mr-3' onClick={this.getReport}>下载生成辅助报告</Button>
                    </div>
                  </div>
      
                  <div className="result-container w-100">
                    <div className="result-show w-100">
                      <div className="title w-100 pl-4">查看结果</div>
                      <div style={{marginLeft:'20px', minHeight: '100px'}}>
                        {
                          this.getImgList(perfusionList, '【血管再通】')
              
                        }
                        {
                          this.getImgList(nonPerfusion, '【血管未再通】')
                        }
                      </div>
                    </div>
                  </div>
    
                </div>
              </div>
              </div>
            </>
          )
        }
      </div>
    );
  }
}

export default ImgUpload;
ImgUpload.contextType = idContext;
