import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: (sessionStorage.getItem('userInfo') && JSON.parse(sessionStorage.getItem('userInfo'))) || null,
    currentRouterName: '',
  },
  mutations: {
    setUserInfo (state, obj = {}) {
      state.userInfo = obj;
    },
    clearUserInfo (state) {
      state.userInfo = null;
      sessionStorage.setItem('userInfo', '');
    },
    setRouterName (state, routerName) {
      state.currentRouterName = routerName;
    }
  },
  actions: {
  },
  modules: {
  }
});
