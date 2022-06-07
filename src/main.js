import Vue from 'vue'
import App from './App.vue'

import  ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import VueRouter from 'vue-router'
import router from './router'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router,
  beforeCreate(){
    Vue.prototype.$bus = this //安装 全局事件总线 this指向vue原型
  }
}).$mount('#app')
