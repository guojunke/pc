import Vue from 'vue';
import VueRouter from 'vue-router';
import Store from '@/store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login'
    // name: '',
    // component: () => import(/* webpackChunkName: "about" */ '../views/article/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/login/login.vue')
  },
  {
    path: '/EngNumManage',
    name: 'EngNumManage',
    meta: {
      title: '工程量管理'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/EngNumManage/index')
  },
  {
    path: '/EngRateManage',
    name: 'EngRateManage',
    meta: {
      title: '工程进度管理'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/EngRateManage/index')
  },
  {
    path: '/UploadLocalImg',
    name: 'UploadLocalImg',
    meta: {
      title: '上传定位图片'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/UploadLocalImg/index')
  },
  {
    path: '/NotifyManage',
    name: 'NotifyManage',
    meta: {
      title: '通知单管理'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/NotifyManage/index')
  },
  {
    path: '/SceneVideo',
    name: 'SceneVideo',
    meta: {
      title: '现场影音'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/SceneVideo/index')
  },
  {
    path: '/TenderManage',
    name: 'TenderManage',
    meta: {
      title: '标段资料管理'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/TenderManage/index')
  },
  {
    path: '/UserManage',
    name: 'UserManage',
    meta: {
      title: '用户管理'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/UserManage/index')
  }
];

const router = new VueRouter({
  // mode: 'hash',
  // base: '',
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    window.document.title = to.meta.title;
    Store.commit('setRouterName', to.meta.title);
  }
  if ((to.path !== '/login' && sessionStorage.getItem('userInfo')) || to.path === '/login') {
    next();
  } else if (to.path !== '/login') {
    next('login');
  }
});


const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export default router;
