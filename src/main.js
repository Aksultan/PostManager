import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { store } from './store'
import VueRouter from 'vue-router'
import { router } from './router'

Vue.config.productionTip = false


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
