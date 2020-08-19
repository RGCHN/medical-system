import axios from 'axios'
import router from '../router'
const http = axios.create({
  baseURL:'http://127.0.0.1:5050/api/'
})
//利用拦截器添加请求头
http.interceptors.request.use(config=>{
  if(localStorage.token){
    config.headers.Authorization = 'Bearer ' + localStorage.token;
  }
  return config;
},err=>{
  return Promise.reject(err);
})

//响应拦截器 捕获错误
http.interceptors.response.use(res => {
  return res
}, err => {
  if (err.response.data.message) {
    
    if (err.response.status === 401) {
      router.push('/login')
    }
  }
  
  return Promise.reject(err)
})
export default http
