<template>
  <comm-dialog title="添加标段" :styleData="{width: '480px'}" @closeDialog="$emit('closeDialog')">
    <div slot="container" class="addTender">
      <div class="addTender_item">
        <div class="addTender_label">标段名称：</div>
        <Input v-model="form.tenderName" placeholder="请输入" style="width: 200px;" />
      </div>

      <div class="addTender_item">
        <div class="addTender_label">中标单位：</div>
        <Input v-model="form.company" placeholder="请输入" style="width: 200px;" />
      </div>

      <div class="addTender_item">
        <div class="addTender_label">负责人：</div>
        <Input v-model="form.leader" placeholder="请输入" style="width: 200px;" />
      </div>

      <div class="addTender_item">
        <div class="addTender_label">负责人电话：</div>
        <Input v-model="form.phone" placeholder="请输入" style="width: 200px;" />
      </div>

      <!-- <div class="addTender_item">
        <div class="addTender_label">描述：</div>
        <Input v-model="form.desc" placeholder="请输入" style="width: 200px;" />
      </div> -->

      <div class="addTender_item">
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
    dataObj: {
      default: () => {}
    }
  },

  components: {CommDialog},

  data () {
    return {
      isLoading: false,
      roleList: [],
      projectList: [],
      tenderList: [],
      form: {
        company: '',
        tenderName: '',
        leader: '',
        phone: '',
        projectId: '',
      }
    };
  },

  created () {
    console.log(this.dataObj);
    if (this.dataObj.id) {
      this.form = {
        company: this.dataObj.company,
        tenderName: this.dataObj.tenderName,
        leader: this.dataObj.leader,
        phone: this.dataObj.phone,
        projectId: this.dataObj.projectId,
      };
    }
  },

  methods: {

    submitEvent () {
      let params = {
        company: this.form.company,
        tenderName: this.form.tenderName,
        leader: this.form.leader,
        phone: this.form.phone,
        proId : this.dataObj.proId,
      };
      this.isLoading = true;
      if (this.dataObj.id || this.dataObj.id === 0) {
        params.id = this.dataObj.id;
        window.$axios.post('/tender/update', params).then(res => {
          this.isLoading = false;
          if (res.success) {
            this.$Message.info('标段编辑成功');
            this.$emit('tenderAddBack');
          } else {
            this.$Message.error(res.message);
          }
        }).catch(error => {
          this.isLoading = false;
          this.$Message.error(error.message);
        });
      } else {
        window.$axios.post('/tender/add', params).then(res => {
          this.isLoading = false;
          if (res.success) {
            this.$Message.info('标段添加成功');
            this.$emit('tenderAddBack');
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