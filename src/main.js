// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuefire from 'vuefire'
import App from './App'
import firebase from 'firebase'

import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'

import VueOnsen from 'vue-onsenui'

import router from './router'
import axios from 'axios'
window.axios = axios
window.firebase = firebase

Vue.use(VueOnsen)
Vue.use(Vuefire)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
