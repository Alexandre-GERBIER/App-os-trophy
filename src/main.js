// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import SuiVue from 'semantic-ui-vue'
import VueSession from 'vue-session'

import '../semantic/dist/semantic.min.css'

Vue.config.productionTip = false
Vue.use(SuiVue)
Vue.use(VueSession)

/* eslint-disable no-new */
window.app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
