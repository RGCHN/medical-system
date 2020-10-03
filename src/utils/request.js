import axios from 'axios';
import history from "./history";
const http = axios.create({
  baseURL:'http://10.13.81.190:5050/api'
})
//利用拦截器添加请求头
http.interceptors.request.use(config=>{
  if(localStorage.getItem('access_token')){
    config.headers.authorization = localStorage.access_token;
  }
  console.log('请求查看');
  console.log(config);
  return config;
},err=>{
  return Promise.reject(err);
})

//响应拦截器 捕获错误
http.interceptors.response.use(res => {
  console.log('响应查看')
  console.log(res);
  return res
}, err => {
  console.log('错误查看')
  console.log(err);
  history.push('/login')
  return Promise.reject(err)
})
export default http
