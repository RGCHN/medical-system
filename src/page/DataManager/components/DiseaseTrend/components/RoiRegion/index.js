import React, {Component} from "react";
import {Carousel, Collapse, message, Image, Empty} from "antd";
import {get} from '../../../../../../utils/tools';
import idContext from '../../../idContext';
import './index.scss';

const { Panel } = Collapse;
const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 2,
  draggable: true,
};

export default class RoiRegion extends Component{
  state = {
    perfImgs: [],
  }
  
  componentDidMount() {
    const id = this.context;
    this.modelHttp.post('/getPerfImgs',{patientID:id}).then(
      res => {
        this.setState({
          perfImgs: get(res, 'data.data.perf_imgs', []),
        })
      }, err => {
        message.error('网络错误！请稍后重试！')
      }
    )
  }
  
  getImgList = imgData => {
    return (
      <Carousel {...settings}>
        {
          imgData.map((item, index) => (
            <>
              <Image src={item} alt="" key={index} height={160} width={160}/>
              <div className="img-index">{index + 1}</div>
            </>
          ))
        }
      </Carousel>
    )
  }
  
  render() {
    let { perfImgs } = this.state;
    return (
      <div className="region-container">
        {
          perfImgs.length === 0 ? (
            <Empty description="暂无数据"/>
          ) : (
            <Collapse defaultActiveKey={[0]}>
              {
                perfImgs.length!==0 && perfImgs.map((perf, index) => (
                  <Panel key={index} header={perf.text_info.split(' ')[0]}>
                    {
                      this.getImgList(perf.perfusion.perfusion_imgs)
                    }
                    <div className="desc">
                      {
                        perf.text_info.slice(42, -1)
                      }
                    </div>
                  </Panel>
                ))
              }
            </Collapse>
          )
        }
       
      </div>
    );
  }
  
}

RoiRegion.contextType = idContext;
