<template>
  <comm-dialog title="添加项目区" :styleData="{width: '480px'}" @closeDialog="$emit('closeDialog')">
    <div slot="container" class="addPro">
      <div class="addPro_item">
        <div class="addPro_label">项目名称：</div>
        <Input v-model="form.projectName" placeholder="请输入姓名" style="width: 200px;" />
      </div>

      <!-- <div>
        <div class="addPro_item addPro_item_other">
          <div class="addPro_label">描述：</div>
          <Input v-model="form.desc" type="textarea" placeholder="请输入描述"  style="width: 200px;"/>
        </div>
      </div> -->

      <div class="addPro_item">
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
    proObj: {
      default: () => {}
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
    if (this.proObj && this.proObj.id) {
      this.form.projectName = this.proObj.projectName;
    }
  },

  methods: {
    submitEvent () {
      let params = {
        projectName: this.form.projectName
        // desc: this.form.desc
      };
      this.isLoading = true;
      if (this.proObj && (this.proObj.id || this.proObj.id === 0)) {
        params.id = this.proObj.id;
        window.$axios.post('/project/update', params).then(res => {
          this.isLoading = false;
          if (res.success) {
            this.$Message.info('更新成功');
            this.$emit('addProSucessEvent');
            this.$emit('closeDialog');
          } else {
            this.$Message.error(res.message);
          }
        }).catch(error => {
          this.isLoading = false;
          this.$Message.error(error.message);
        });
      } else {
        window.$axios.post('/project/add', params).then(res => {
          this.isLoading = false;
          if (res.success) {
            this.$Message.info('添加成功');
            this.$emit('addProSucessEvent');
            this.$emit('closeDialog');
          } else {
            this.$Message.error(res.message);
          }
        }).catch(error => {
          this.isLoading = false;
          this.$Message.error(error.message);
        });
      }
      
    }
  }
};
</script>

<style lang='scss'>
  @import './index.scss';
</style>