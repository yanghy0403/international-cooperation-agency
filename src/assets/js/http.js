import axios from 'axios';
import qs from 'qs';

// let url = 'http://10.0.90.42:8088'
let url = 'http://10.0.0.26:8088'
// let url = '/api'
// 环境的切换
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = url;
} else if (process.env.NODE_ENV == 'debug') {
  axios.defaults.baseURL = url;
} else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = url;
}

// axios.create({
//   withCredentials: true,
//   headers: {'X-Requested-With':'XMLHttpRequest'}
// })
//       let token = document.cookie;
//       let tokenArr = token.split("|")
//       let userName = tokenArr[0].split("=")[1];
//       let  userId = tokenArr[1];
//       let tokenVal = tokenArr[2];
// axios.defaults.withCredentials = true;
// // axios.defaults.headers.common['userName'] = userName;
// axios.defaults.headers.common['untId'] = userId;
// axios.defaults.headers.common['userToken'] = tokenVal;


// 请求拦截器
// axios.interceptors.request.use(req => {
//   //向请求头添加token，username
//       let token = document.cookie;
//       let tokenArr = token.split("|")
//       let userName = tokenArr[0].split("=")[1];
//       let  userId = tokenArr[1];
//       let tokenVal = tokenArr[2];
//       console.log(userName,userId,tokenVal)
//   if (userName && token&& userId) {
//     req.headers.Authorization = userName;
//     req.headers.userId = userId;
//     req.headers.token = tokenVal;
//   }
//   return req;
// }, error => {
//   return Promise.reject(error);
// })


export default axios;
