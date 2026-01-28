import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import MescrollEmpty from '@/uni_modules/mescroll-uni/components/mescroll-empty/mescroll-empty.vue'
export function createApp() {
  const app = createSSRApp(App)
  app.component('mescroll-empty', MescrollEmpty)
  return {
    app
  }
}
// #endif