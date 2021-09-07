import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.silent = true


// css初始化
import './assets/css/normalize.css'
import './assets/css/iviewui.css'
// 适配
// import 'lib-flexible'
import 'amfe-flexible'
//
// import './assets/js/util.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);

// echarts图库
import * as echarts from 'echarts';
import 'echarts-liquidfill'
Vue.prototype.$echarts = echarts;

import "echarts-wordcloud/dist/echarts-wordcloud"
import "echarts-wordcloud/dist/echarts-wordcloud.min"

// 引入axios
// import axios from "axios";
// import VueAxios from "vue-axios";
// axios.defaults.withCredentials = true;
// Vue.use(VueAxios, axios);
import http from "./assets/js/http.js"
Vue.prototype.axios = http;
// 引入qs
import qs from 'qs'
Vue.prototype.$qs = qs;

// 登录组件
import Login from "./assets/js/index"
Vue.use(Login)

// 图标
import "./assets/css/font_utsurxfjd49/iconfont.css"
import "./assets/css/font_m5d5rtiuj8h/iconfont.css"



import './assets/css/common.less';

// let cookie = document.cookie;
// let whiteList = ['/'];
// router.beforeEach((to, from, next) => {
//   if ((whiteList.indexOf(to.path) > -1) || document.cookie) {
//     next()
//   } else {
//     window.location.href = 'http://10.0.0.26:8088/user/login'
//     //window.location.href = 'http://rdss.cssdc.ac.cn/#/login'
//   }
// })

Vue.config.productionTip = false
// router.beforeEach((to, from, next)=>{
//   console.log(from.name)
//   next()

// })
router.beforeEach((to, from, next)=>{
  if(from.name == 'Main'){
    store.commit('EMPTY_KEEP_ALIVE')
    next()
  }else{
    store.commit('ADD_KEEP_ALVE')
    next()
  }

})
router.afterEach((to, from,)=>{
  if(to.name != 'Main'){
    store.commit('ADD_KEEP_ALVE')
  }else{
    store.commit('EMPTY_KEEP_ALIVE')
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
