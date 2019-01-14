// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// 导入路由配置
import router from './router'

// 导入element-ui
import ElementUI from 'element-ui'
// 导入element-ui的样式文件
import 'element-ui/lib/theme-chalk/index.css'
// 导入自己的样式
import './assets/css/index.css'
// 引入axios
import axios from 'axios'
// 引入element-tree-grid表格展开组件
import ElementTreeGrid from 'element-tree-grid'
// 注册全局组件
Vue.component(ElementTreeGrid.name, ElementTreeGrid)
// 任意组件都可以使用axios了
Vue.prototype.$http = axios
// 配置基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'

// 请求拦截器
axios.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('token')
  // console.log('请求拦截器', config)
  // 所有请求之前都要执行的操作
  return config
})

// 响应拦截器
// axios.interceptors.response.use((response) => {
//   console.log('响应拦截器', response)
//   // 所有请求完成后都要执行的操作
//   return response
// }, (error) => {
//   // 错误处理
//   return Promise.reject(error)
// })
// 安装插件
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // 关联
  router,
  components: { App },
  template: '<App/>'
})
