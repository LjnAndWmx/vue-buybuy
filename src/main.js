// 渲染根实例
import Vue from 'vue'
import VueRouter from 'vue-router'

import ElementUI from 'element-ui'

import moment from 'moment'

import Vuelazyload from 'vue-lazyload'

const path = require('path')

// 导入axios  把axios挂载在vue原型中
import axios from 'axios'
axios.defaults.baseURL='http://47.106.148.205:8899/site/'
Vue.prototype.$axios = axios


// 基于vue的中间件
Vue.use(VueRouter)
// 轮播图中间件
Vue.use(ElementUI)
// 图片懒加载
Vue.use(Vuelazyload,{
     loading:path.join(__dirname,'src/statics/site/images/01.gif')
    // loading:require('./statics/site/images/01.gif')
})

// 过滤器==过滤时间
Vue.filter('dateFmt',(value,formatStr="YYYY-MM-DD")=> {
    if (!value) return ''
    // value = value.toString()
    return moment(value).format(formatStr)
  })

// 导入根组件
import App from './App.vue'

// 导入全局要用的样式
import 'element-ui/lib/theme-chalk/index.css'
import './statics/site/css/style.css'
// 引入定义好的组件
import goodslist from './components/goodslist/goodslist'
import shopcart from './components/shopcart/shopcart'
import goodsinfo from './components/goodslist/goodsinfo'

const router = new VueRouter({
    routes: [
     {path:'/',redirect:'/goodslist'},
      { path: '/goodslist', component: goodslist },
      { path: '/shopcart', component: shopcart },
      { path: '/goodsinfo/:goodsId', component: goodsinfo }
    ]
  })

new Vue({
    el:'#app',
    router,
    render:h=>h(App)
})