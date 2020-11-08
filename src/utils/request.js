import axios from 'axios';
import history from "./history";
export const http = axios.create({
  baseURL:'http://10.13.81.190:5050/api'
})
//利用拦截器添加请求头
http.interceptors.request.use(config=>{
  if(localStorage.getItem('access_token')){
    config.headers.authorization = localStorage.access_token;
  }
  return config;
},err=>{
  return Promise.reject(err);
})

//响应拦截器 捕获错误
http.interceptors.response.use(res => {
  console.log('响应查看')
  console.log(res);
  if (res.data.msg.toString() === "NoLogin") {
    history.push('/login');
  }
  return res
}, err => {
  console.log('错误查看')
  console.log(err);
  return Promise.reject(err)
})

export const modelHttp = axios.create({
  baseURL:'http://10.13.81.190:5051/api'
})
//利用拦截器添加请求头
modelHttp.interceptors.request.use(config=>{
  if(localStorage.getItem('access_token')){
    config.headers.authorization = localStorage.access_token;
  }
  return config;
},err=>{
  return Promise.reject(err);
})

//响应拦截器 捕获错误
modelHttp.interceptors.response.use(res => {
  console.log('响应')
  console.log(res);
  if (res.data.msg === "NoLogin") {
    history.push('/login');
  }
  return res
}, err => {
  console.log('错误查看')
  console.log(err);
  return Promise.reject(err)
})


