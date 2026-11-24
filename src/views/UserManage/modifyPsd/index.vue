<template>
  <comm-dialog title="修改密码" :styleData="{width: '480px'}" @closeDialog="$emit('closeDialog')">
    <div slot="container" class="modifyPsd">
      <div class="modifyPsd_item">
        <div class="modifyPsd_label">新密码：</div>
        <Input v-model="newPsd" type="password" @on-focus="errorMessage = ''" placeholder="请输入姓名" style="width: 200px;" />
      </div>

      <div class="modifyPsd_item">
        <div class="modifyPsd_label">新密码确认：</div>
        <Input v-model="surePsd" type="password" @on-focus="errorMessage = ''" placeholder="请输入账号"  style="width: 200px;"/>
      </div>
      <p style="height: .32rem; line-height: .32rem;padding-left: 3rem; color: red;">{{errorMessage}}</p>

      <div class="modifyPsd_item">
        <Button style="margin: 0 50px;" @click="$emit('closeDialog')">取消</Button>
        <Button type="primary" @click="submitEvent" style="margin: 0 50px;">确定</Button>
      </div>
    </div>
  </comm-dialog>
</template>

<script>
import CommDialog from '@/components/commDialog/index';
export default {
  props: {
    userInfo: {
      default: () => {}
    }
  },
  components: {CommDialog},

  data () {
    return {
      newPsd: '',
      surePsd: '',
      errorMessage: ''
    };
  },

  created () {},

  methods: {
    submitEvent () {
      if (this.newPsd !== this.surePsd) {
        this.errorMessage = '密码不一致';
        return false;
      }
      let params = {
        id: this.userInfo.id,
        password: this.newPsd
      };
      window.$axios.post('/api/user/update', params).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style lang='scss'>
  @import './index.scss';
</style>