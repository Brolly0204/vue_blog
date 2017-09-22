import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'
import store from './store'
import api from './api'

Vue.config.productionTip = false

// 开启leancloud debug调试
localStorage.setItem('debug', 'leancloud*');

//解决用户信息 持久化存储 从localStorage里获取当前user信息 保存到vuex 预防每次属性vuex里的用户信息不存在
let user = api.SDK.User.current();
// console.log(user);
if(user) {
   store.commit('setUser', user);
}

Vue.mixin({
  beforeCreate() {
    if (!this.$api) {
      this.$api = api;
    }
  }
})

/* vue-progressbar */
const options = {
  // color: '#99CCCC',
  color: '#20a0ff',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

Vue.use(ElementUI);
Vue.use(VueProgressBar, options)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
