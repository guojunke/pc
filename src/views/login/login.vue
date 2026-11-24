<template>
  <div class="login">
    <div class="login_box">

      <div class="login_title">欢迎登录智慧高标系统</div>

      <div class="login_box_item">
        <span class="login_box_span">用户名</span>：
        <Input v-model="userName" :maxlength="11" placeholder="用户名" @on-focus="refreshEvent()" style="width: 200px;" />
      </div>

      <div class="login_box_item">
        <span class="login_box_span">密 码</span>：
        <Input v-model="password" placeholder="密码" type="password" @on-focus="refreshEvent()" style="width: 200px;" />
      </div>

      

      <div class="login_box_item" style="padding: 0; padding-left: 40px;">
        <span class="login_box_span"></span>
        <Checkbox v-model="isReadMe"></Checkbox>
        <span style="width: 200px;">记住密码</span>
      </div>

      <p v-if="isLoginFail" class="login_fail">{{loginFail || '用户名密码不匹配'}}</p>

      <div class="login_box_item">
        <Button class="login_box_btn" type="success" @click="loginEvent">登录</Button>
      </div>
    </div>

    <comm-loading v-if="isLoading"></comm-loading>
  </div>
</template>

<script>

export default {
  props: {},

  components: {},

  data () {
    return {
      isLoading: false,
      isLoginFail: false,
      isReadMe: false,
      loginFail: '',
      userName: '',
      password: ''
    };
  },

  created () {
    if (localStorage.setItem('wisdomPc_userName') && localStorage.setItem('wisdomPc_passwork')) {
      this.userName = localStorage.setItem('wisdomPc_userName');
      this.password = localStorage.setItem('wisdomPc_passwork');
      this.loginEvent();
    }
  },

  methods: {
    refreshEvent () {
      this.isLoginFail = false;
      this.loginFail = '';
    },

    loginEvent () {
      if (!this.userName) {
        this.$Message.error('用户名不能为空！');
        return false;
      }
      if (!this.password) {
        this.$Message.error('密码不能为空');
        return false;
      }
      let params = {
        mobile: this.userName,
        password: this.password
      };
      this.isLoading = true;
      window.$axios.post('/api/user/login', params).then(res => {
        this.isLoading = false;
        if (res.success) {
          let obj = res.data;
          sessionStorage.setItem('userInfo', JSON.stringify(obj));
          if (this.isReadMe) {
            localStorage.setItem('wisdomPc_userName', this.userName);
            localStorage.setItem('wisdomPc_passwork', this.password);
          } else {
            localStorage.setItem('wisdomPc_userName', '');
            localStorage.setItem('wisdomPc_passwork', '');
          }
          this.$store.commit('setUserInfo', obj);
          this.$router.push({path: '/EngNumManage'});
        } else {
          this.isLoginFail = true;
          this.loginFail = res.message;
          // this.$Message.error(res.message);
        }
      }).catch(error => {
        this.isLoading = false;
        this.isLoginFail = true;
        this.loginFail = error.message;
        // this.$Message.error(error.message);
      });
      
    }
  }
};
</script>

<style lang='scss'>
  @import './login.scss';
</style>