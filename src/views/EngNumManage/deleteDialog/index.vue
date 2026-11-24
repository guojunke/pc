<template>
  <comm-dialog title="提示" :styleData="{width: '480px'}" @closeDialog="$emit('closeDialog')">
    <div slot="container" class="deleteDialog">
      
      <div style="text-align: center; padding: .4rem 0 .2rem;border-top: 2px solid #516AFF;">
        <Icon type="ios-trash" size="32" color="#516AFF"/>
      </div>
      <div style="text-align: center; padding: .2rem;">是否确认删除该{{type}}？</div>
      <div style="text-align: center; padding: .2rem 0 .1rem;;font-size: .2rem; color:#aaa;">删除后不可恢复</div>

      <div class="deleteDialog_item">
        <Button style="margin: 0 30px;" @click="$emit('closeDialog')">取消</Button>
        <Button type="primary" @click="submitEvent" style="margin: 0 30px;">确定</Button>
      </div>

      <comm-loading v-if="isLoading"></comm-loading>
    </div>
  </comm-dialog>
</template>

<script>
import CommDialog from '@/components/commDialog/index';

export default {
  props: {
    type: {
      default: '项目'
    },
    deleteId: {
      default: ''
    }
  },

  components: {CommDialog},

  data () {
    return {
      isLoading: false,
      form: {
        projectName: '',
        desc: ''
      }
    };
  },

  created () {
    console.log(this.proObj);
    if (this.proObj && this.proObj.id) {
      this.form.projectName = this.proObj.projectName;
    }
  },

  methods: {
    submitEvent () {
      let params = {
        id: this.deleteId
      };
      let url = '';
      if (this.type === '项目区') {
        url = '/project/delete';
      } else if (this.type === '标段') {
        url = '/tender/delete';
      } else {
        url = '/projectType/delete';
      }
      if (this.type) {
        window.$axios.post(`${url}?id=${this.deleteId}`, params).then(res => {
          if (res.success) {
            this.$emit('deleteDialogSucessEvent');
            this.$emit('closeDialog');
            this.$Message.info('删除成功');
          } else {
            this.$Message.info(res.message);
          }
        }).catch(error => {
          this.$Message.info(error.message);
        });
      } else {
        window.$axios.get({url, params}).then(res => {
          if (res.success) {
            this.$emit('deleteDialogSucessEvent');
            this.$emit('closeDialog');
            this.$Message.info('删除成功');
          } else {
            this.$Message.error(res.message);
          }
        }).catch(error => {
          this.$Message.error(error.message);
        });
      }
      
      // this.$emit('deleteDialogSucessEvent');
      // this.$emit('closeDialog');
      
    }
  }
};
</script>

<style lang='scss'>
  @import './index.scss';
</style>