<template>
  <div class="header">
    <div class='header_title'>

      <div class="header_box">
        <p>{{$store.state.currentRouterName}}</p>
        <Icon class="header_box_icon" type="md-person" size="20" />
        <span class="header_box_username">{{$store.state.userInfo && $store.state.userInfo.username}}</span>
        <span class="btn color_red" @click="exitEvent">退出</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},

  components: {},

  data () {
    return {

    };
  },

  created () {},

  methods: {
    exitEvent () {
      this.$store.commit('clearUserInfo');
      localStorage.setItem('wisdomPc_userName', '');
      localStorage.setItem('wisdomPc_passwork', '');
      this.$router.push({path: '/login'});
    }
  }
};
</script>

<style lang='scss' scoped>
  // @import url('./index.scss');
  @import './index.scss';
</style>