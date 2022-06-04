import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
//import axios from 'axios';

import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

import { BootstrapVue, IconsPlugin,BAvatar  } from 'bootstrap-vue'
Vue.component('b-avatar', BAvatar)

import vuescroll from 'vuescroll';
Vue.use(vuescroll);
Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.use(FontAwesomeIcon)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.prototype.$log = console.log.bind(console)
library.add(faHome)
Vue.use(BootstrapVue)

import VueSession from 'vue-session'
Vue.use(VueSession)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  }
})
