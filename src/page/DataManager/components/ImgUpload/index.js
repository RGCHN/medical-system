import React from "react";
import {Upload, message, Select, Button, Carousel, Image, Spin, Progress} from 'antd';
import { UploadOutlined }from '@ant-design/icons';
import idContext from '../idContext';
import {get} from '../../../../utils/tools';
import './index.scss';

const { Option } = Select;

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
    adcUploadPercent: 0,
    dwiUploadPercent: 0,
    analyzePercent: 0,
    resultInfo: '',
    resultSize: '',
  }
  id = this.context;
  timeStamp = '';
  
  goPredict = () => {
    this.setState({
      analyzePercent: 0,
      predicting: true
    });
    const predictInterval = setInterval(() => {
      const currentPercent = this.state.analyzePercent;
      if (currentPercent <= 98) {
        this.setState({
          analyzePercent: currentPercent + 1
        })
      } else {
        clearInterval(predictInterval);
      }
    }, 2000)
    this.modelHttp.post('/analyze',{
      adc_file: this.state.adcFileName,
      backmodel : this.state.modelType,
      dwi_file: this.state.dwiFileName,
      patientID: this.id,
      timestamp: this.timeStamp,
    }).then(
      res => {
        if (predictInterval) {
          clearInterval(predictInterval);
        }
        this.setState({
          predicting: false,
          analyzePercent: 100,
        })
        if (res.data.status === 'fail') {
          message.error('输入参数有误！请重新输入')
        } else {
          this.setState({
            nonPerfusion: get(res, 'data.data.nonperf_res_imgs', []),
            perfusionList: get(res, 'data.data.perf_res_imgs', []),
            resultInfo: get(res, 'data.data.info', ''),
            resultSize: get(res, 'data.data.size', 0),
            resultId: get(res, 'data.data.resultID', 0),
          })
        }
      }, err => {
        message.error('网络错误！请稍后重试！')
      }
    )
  }
  
  getReport = () => {
    this.modelHttp.post('/getReport',{resultID: this.state.resultId}, {responseType:'blob'}).then(
      res => {
        const blob = new Blob([res.data], {
          type: 'application/msword',// word是msword
        });
        const objectUrl = URL.createObjectURL(blob);
        const aLink = document.createElement('a');
        aLink.style.display='none';
        aLink.href = objectUrl;
        aLink.download='结果报告';
        document.body.appendChild(aLink);
        aLink.click();
        document.body.removeChild(aLink);
      }, err => {
        message.error('网络错误！请稍后重试！')
      }
    )
    
  }
  
  selectModel = value => {
    this.setState({
      modelType: value
    })
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
    const { data, timeStamp } = this.props;
    this.timeStamp = timeStamp;
    if (data.id) {
      this.setState({
        mode: 'show',
        ADCList: get(data, 'adc.adc_imgs', []),
        DWIList: get(data, 'dwi.dwi_imgs', []),
        nonPerfusion: get(data, 'non_perfusion.non_perfusion_imgs', []),
        perfusionList: get(data, 'perfusion.perfusion_imgs', []),
        modelType: get(data, 'modelType', 0).toString(),
        resultId: get(data, 'id', 0),
        resultInfo: get(data, 'info', ''),
        resultSize: get(data, 'size', 0),
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
    
    const uploadInterval = setInterval(() => {
      const newPercent = this.state.uploadPercent + Math.random().toFixed(2) + 5;
      if (newPercent <= 96) {
        this.setState({
          uploadPercent: newPercent
        })
      } else {
        this.setState({
          uploadPercent: 96 + Math.random().toFixed(2)
        })
      }
    }, 1000)
    
    Promise.all([this.modelHttp.post('/imgUpload',adcForm, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: progressEvent => {
        const complete = (progressEvent.loaded / progressEvent.total * 100 | 0);
        this.setState({
          adcUploadPercent: complete
        })
      }
    }),this.modelHttp.post('/imgUpload',dwiForm, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: progressEvent => {
        const complete = (progressEvent.loaded / progressEvent.total * 100 | 0);
        this.setState({
          dwiUploadPercent: complete
        })
      }
    })]).then(
      results => {
        clearInterval(uploadInterval);
        const adcResult = results[0];
        const dwiResult = results[1];
        this.setState({
          uploading: false,
        })
        if (adcResult.data.status === 'success' && dwiResult.data.status === 'success') {
          message.success('上传成功！')
          this.setState({
            ADCList: get(adcResult, 'data.data.imgs', []),
            adcFileName: get(adcResult, 'data.data.filename', []),
            DWIList: get(dwiResult, 'data.data.imgs', []),
            dwiFileName: get(dwiResult, 'data.data.filename', []),
            uploadPercent: 100,
          })
        } else {
          message.error('网络错误！请稍后重试！')
        }
        
      }
    )
  };
  
  render() {
    const { ADCList, DWIList, mode, modelType, nonPerfusion, perfusionList, spinVisible, adcUpload, dwiUpload, uploading, predicting, adcUploadPercent, dwiUploadPercent, analyzePercent, resultInfo, resultSize} = this.state;
    
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
                    <>
                      <div className="file-upload-container d-flex ai-start">
                        <div className="adc-container d-flex ai-start mr-3">
                          <Upload
                            name="file"
                            fileList={adcUpload}
                            onRemove={file => this.onRemove(file)}
                            beforeUpload={file => this.beforeUpload(file, 'ADC')}
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
                      <div className="upload-progress mt-3">
                        <div>
                          <div>【ADC影像上传进度】</div>
                          <Progress
                            strokeColor={{
                              '0%': '#108ee9',
                              '100%': '#87d068',
                            }}
                            percent={adcUploadPercent}
                          />
                        </div>
                        <div>
                          <div>【DWI影像上传进度】</div>
                          <Progress
                            strokeColor={{
                              '0%': '#108ee9',
                              '100%': '#87d068',
                            }}
                            percent={dwiUploadPercent}
                          />
                        </div>
                      </div>
                    </>
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
                        disabled={mode === 'show'}
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
                  <div className="w-80">
                    <div>【模型分析进度】</div>
                    <Progress
                      strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                      }}
                      percent={analyzePercent}
                    />
                  </div>
                  <div className="result-container w-100">
                    <div className="result-show w-100">
                      <div className="title w-100 pl-4">
                        <span>查看结果</span>
                        <span className="mx-3"> 溶栓治疗潜在获益评估： {resultInfo}</span>
                        {/*<span className="mx-3">梗死核心预测尺寸: {resultSize}</span>*/}
                      </div>
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
