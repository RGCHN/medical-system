import React, {Component} from "react";
import {Carousel, message} from "antd";
import img2 from '../../../../../../assets/img/region/t11_1.jpg';
import img3 from '../../../../../../assets/img/region/t11_2.jpg';
import img4 from '../../../../../../assets/img/region/t11_3.jpg';
import img5 from '../../../../../../assets/img/region/t11_4.jpg';
import img6 from '../../../../../../assets/img/region/t11_5.jpg';
import './index.scss'


const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 2,
  draggable: true,
};

export default class RoiRegion extends Component{
  state = {
  
  }
  
  componentDidMount() {
    this.modelHttp.get('/api/getPerfImgs').then(
      res => {
        console.log(res);
      }, err => {
        message.error('网络错误！请稍后重试！')
      }
    )
  }
  
  render() {
    return (
      <div className="region-container">
        <Carousel {...settings}>
          <div className="img-container">
            <img src={img2} alt="" height='160px'/>
            <div className="desc">
              <div>2020年06月12日</div>
              <div>梗死区域面积：12.78%</div>
              <div>溶栓治疗获益：6.7%</div>
            </div>
          </div>
          <div className="img-container">
            <img src={img3} alt="" height='160px'/>
            <div className="desc">
              <div>2020年06月18日</div>
              <div>梗死区域面积：12.55%</div>
              <div>溶栓治疗获益：9.2%</div>
            </div>
          </div>
          <div className="img-container">
            <img src={img4} alt="" height='160px'/>
            <div className="desc">
              <div>2020年06月22日</div>
              <div>梗死区域面积：12.34%</div>
              <div>溶栓治疗获益：11.4%</div>
            </div>
          </div>
          <div className="img-container">
            <img src={img5} alt="" height='160px'/>
            <div className="desc">
              <div>2020年07月01日</div>
              <div>梗死区域面积：12.05%</div>
              <div>溶栓治疗获益：15.6%</div>
            </div>
          </div>
          <div className="img-container">
            <img src={img6} alt="" height='160px'/>
            <div className="desc">
              <div>2020年07月10日</div>
              <div>梗死区域面积：11.89%</div>
              <div>溶栓治疗获益：19.7%</div>
            </div>
          </div>
        </Carousel>
        <div className="show w-100 mt-5 d-flex jc-center">
          <img src={img2} alt=""/>
        </div>
      </div>
    );
  }
  
}
