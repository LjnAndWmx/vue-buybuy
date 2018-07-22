// 渲染根实例
import Vue from 'vue'
import VueRouter from 'vue-router'

import ElementUI from 'element-ui'

import moment from 'moment'

import lazy from 'vue-lazyload'
const path = require('path')


// 基于vue的中间件
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(lazy,{
     loading:path.join(__dirname,'/src/statics/site/images/01.gif')
})

// 过滤器==过滤时间
Vue.filter('dateFmt',(value,formatStr="YYYY-MM-DD")=> {
    if (!value) return ''
    // value = value.toString()
    return moment(value).format(formatStr)
  })

// 导入跟组件
import App from './App.vue'
// 导入全局要用的样式
import 'element-ui/lib/theme-chalk/index.css'
import './statics/site/css/style.css'
// 引入定义好的组件
import goodslist from './components/goodslist/goodslist'
import shopcart from './components/shopcart/shopcart'

const router = new VueRouter({
    routes: [
     {path:'/',redirect:'/goodslist'},
      { path: '/goodslist', component: goodslist },
      { path: '/shopcart', component: shopcart }
    ]
  })

new Vue({
    el:'#app',
    router,
    render:h=>h(App)
})