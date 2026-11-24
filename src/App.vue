<template>
  <div id="app">

    <div class="app_left" v-if="$store.state.userInfo && show">
      <menu-wrap></menu-wrap>
    </div>

    <div class="app_right">
      <header-wrap v-if="$store.state.userInfo && show"></header-wrap>
      <div class="app_view">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderWrap from '@/components/Header/index';
import MenuWrap from '@/components/Menu/index';

export default {
  components: { HeaderWrap, MenuWrap },

  data () {
    return {
      show: true,
      routeIndex: 1,
      isShowNav: true
    };
  },

  created() {
    // window.$axios.get({url: '/api/user/login'});
    // window.$axios.post('/api/user/login', {mobile: 15617755653, password: '123456'});
    // window.$axios.post('/api/user/getPages ', {});
    // console.log(sessionStorage.getItem('userInfo'));
    // if (sessionStorage.getItem('userInfo')) {
    //   console.log(JSON.parse(sessionStorage.getItem('userInfo')));
    //   this.$store.commit('setUserInfo', JSON.parse(sessionStorage.getItem('userInfo')));
    // }
  },

  methods: {
    skip (url, index) {
      this.routeIndex = index;
      this.$router.push(url);
    }
  }
};
</script>
<style lang="scss">
#app {
  display: flex;
  // flex-direction: column;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .app_left{
    display: flex;
    width: 200px;
    height: 100%;
    color: #fff;
    background: #38f;
  }
  .app_right{
    display: flex;
    flex-direction: column;
    min-width: 600px;
    flex: 1;
    background: #eee;
    .app_view{
      position: relative;
      margin: 10px;
      padding: 10px;
      min-height: 100px;
      flex: 1;
      overflow: auto;
      background: #fff;
    }
  }
  // .app_box{
  //   display: flex;
  //   min-height: 100px;
  //   flex: 1;
  //   .app_menu{
  //     position: relative;
  //     display: flex;
  //     align-items: center;
  //     // border-right: 1px solid #f1f1f1;
  //     box-shadow: 3px 3px 10px #eee;
  //     .app_menu_icon{
  //       position: absolute;
  //       top: 0;
  //       bottom: 0;
  //       right: 0;
  //       margin: auto 0;
  //       height: 32px;
  //     }
  //     .app_menu_box{
  //       width: 200px;
  //       flex: 1;
  //       height: 100%;
  //       overflow-x: hidden;
  //       overflow-y: auto;
  //     }
  //     .app_menu_hide{
  //       width: 20px;
  //       overflow: hidden;
  //     }
  //   }
  //   .app_view{
  //     flex: 1;
  //     min-width: 500px;
  //     padding: 6px 10px;
  //   }
  // }
}
</style>
