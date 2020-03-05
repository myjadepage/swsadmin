import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/axios'
import App from './App.vue'
import store from './store'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'

/* CSS */
import '@/assets/css/xeicon.min.css'
import '@/assets/css/tui-date-picker.css'
import '@/assets/css/button.css'
import '@/assets/css/board.css'
import '@/assets/css/common.css'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
