<template>
  <comm-dialog title="添加用户" :styleData="{width: '480px'}" @closeDialog="$emit('closeDialog')">
    <div slot="container" class="addUser">
      <div class="addUser_item">
        <div class="addUser_label">姓名：</div>
        <Input v-model="form.username" placeholder="请输入姓名" style="width: 200px;" />
      </div>

      <div class="addUser_item">
        <div class="addUser_label">账号：</div>
        <Input v-model="form.mobile" :maxlength="11" placeholder="请输入账号"  style="width: 200px;"/>
      </div>

      <div class="addUser_item">
        <div class="addUser_label">角色：</div>
        <Select v-model="form.roleId" style="width:200px">
          <Option v-for="(item, index) in roleList" :value="parseInt(index)" :key="index">{{ item }}</Option>
        </Select>
      </div>

      <div class="addUser_item">
        <div class="addUser_label">项目区：</div>
        <Select v-model="form.projectId" style="width:200px" @on-change="getTenderList">
          <Option v-for="(item, index) in projectList" :value="parseInt(item.id)" :key="index">{{ item.projectName }}</Option>
        </Select>
      </div>

      <div class="addUser_item">
        <div class="addUser_label">标段：</div>
        
        <Select v-model="form.tenderId" style="width:200px">
          <!-- <Option :value="item.value" :key="item.value">{{ item.label }}</Option> -->
          <Option v-for="(item, index) in tenderList" :value="item.id" :key="index">{{ item.tenderName }}</Option>
        </Select>
      </div>

      <div class="addUser_item">
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
    userInfo: {
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
        username: '',
        mobile: '',
        roleId: '',
        tenderId: '',
        projectId: '',
      }
    };
  },

  created () {
    Object.assign(this.form, this.userInfo);
    this.getRoleList();
    this.getProjectList();
    this.getTenderList();
  },

  methods: {
    // 获取所有的角色列表
    getRoleList () {
      window.$axios.post('/api/user/getRole').then(res => {
        if (res.success) {
          this.roleList = res.data || [];
        } else {
          this.roleList = [];
        }
      }).catch(error => {
        this.$Message.error(error.message);
      });
    },

    // 获取所有的标段
    getTenderList () {
      let params = {
        proId: this.form.projectId
      };
      window.$axios.get({url:'/tender/getTendersList', params}).then(res => {
        if (res.success) {
          this.tenderList = res.data || [];
        }
      }).catch(error => {
        this.$Message.error(error.message);
      });
    },

    // 获取所有项目区
    getProjectList () {
      window.$axios.get({url: '/project/getProjectList'}).then(res => {
        if (res.success) {
          this.projectList = res.data || [];
        } else {
          this.projectList = [];
        }
      }).catch(error => {
        this.$Message.error(error.message);
      });
    },

    submitEvent () {
      if (!this.form.username) {
        this.$Message.error('用户名不能为空！');
        return false;
      }
      if (!this.form.mobile) {
        this.$Message.error('手机号不能为空！');
        return false;
      }
      if (!(this.form.roleId || this.form.roleId === 0)) {
        this.$Message.error('角色不能为空！');
        return false;
      }
      if (this.form.roleId !== 1  && !this.form.projectId) {
        this.$Message.error('项目区不能为空！');
        return false;
      }
      let params = {
        username: this.form.username,
        mobile: this.form.mobile,
        roleId: this.form.roleId,
        tenderId: this.form.tenderId,
        projectId: this.form.projectId,
      };
      this.isLoading = true;
      if (this.form.id || this.form.id === 0) {
        params.id = this.form.id;
        window.$axios.post('/api/user/update', params).then(res => {
          this.isLoading = false;
          if (res.success) {
            this.$emit('addSucessEvent');
            this.$emit('closeDialog');
          } else {
            this.$Message.error(res.message);
          }
        }).catch(error => {
          this.isLoading = false;
          this.$Message.error(error.message);
        });
      } else {
        window.$axios.post('/api/user/create', params).then(res => {
          this.isLoading = false;
          if (res.success) {
            this.$emit('addSucessEvent');
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