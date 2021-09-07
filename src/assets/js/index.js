import MyLogin from '../../components/public/login.vue'
import Vue from 'vue'

// 这里是重点
const Login = {
    install: function(Vue){
        Vue.component('Login',MyLogin)
    }
}

// 导出组件
export default Login