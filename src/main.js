import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';


import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);

Vue.config.productionTip = false;
import './assets/javascript';
import './assets/css/index.scss';

import '@/components/index.js';

import Axios from './apis/axios';
window.$axios = Axios;

// Vue.prototype.$imgUrl = 'http://121.89.213.83:9001/notice/downloadFile?fileName=';
Vue.prototype.$imgUrl = 'http://47.92.72.52:9001/notice/downloadFile?fileName=';
// Axios.get('https://api.ricebook.com/hub/home/v1/web/week_choice.json?city_id=140&page=0');

Vue.prototype.$userInfo = null; 

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
