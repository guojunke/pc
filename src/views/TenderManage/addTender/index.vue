<template>
  <comm-dialog title="新增标段资料" :styleData="{width: '480px'}" @closeDialog="$emit('closeDialog')">
    <div slot="container" class="addTenderData">
      <div class="addTenderData_item">
        <div class="addTenderData_label">标题：</div>
        <Input v-model="form.title" placeholder="请输入姓名" style="width: 200px;" />
      </div>

      <div class="addTenderData_item">
        <div class="addTenderData_label">项目区：</div>
        <Select v-model="form.projectId" style="width:200px" @on-change="proChangeEvent">
          <Option v-for="(item, index) in projectList" :value="parseInt(item.id)" :key="index">{{ item.projectName }}</Option>
        </Select>
      </div>

      <div class="addTenderData_item">
        <div class="addTenderData_label">标段：</div>
        <Select v-model="form.tendersId" style="width:200px">
          <Option v-for="(item, index) in tenderList" :value="item.id" :key="index">{{ item.tenderName || '--' }}</Option>
        </Select>
      </div>

      <div class="addTenderData_item">
        <div class="addTenderData_label">类型：</div>
        <Select v-model="form.type" style="width:200px">
          <Option v-for="(item, index) in typeList" :value="item" :key="index">{{ item }}</Option>
        </Select>
      </div>

      <div class="addTenderData_item addTenderData_textarea">
        <div class="addTenderData_label">描述：</div>
        <Input v-model="form.remark" type="textarea" style="width: 200px;" />
      </div>

      <div class="addTenderData_item">
        <div class="addTenderData_label">附件：</div>
        <!-- <Input v-model="form.tendersId" placeholder="" style="width: 200px;"/> -->
        <Upload action="#" multiple :before-upload="uploadBefore" style="marignRight: 2rem;">
          <Button style="marignRight: 2rem;">上传附件</Button>
        </Upload>
        <span style="display: inline-block; width: 1.9rem;"></span>
        <div v-for="(item, index) in fileList" :key="index"
          class="addTenderData_span">
          {{item.name}}
          <Icon type="ios-close" size="22" @click="fileList.splice(index, 1)" />
        </div>
      </div>

      <div class="addTenderData_item">
        <Button style="margin: 0 50px;" @click="$emit('closeDialog')">取消</Button>
        <Button type="primary" @click="submitEvent" style="margin: 0 50px;">确定</Button>
      </div>

      <comm-loading v-if="isLoading"></comm-loading>
    </div>
  </comm-dialog>
</template>

<script>
// import CommDialog from '@/components/commDialog/index';
export default {

  components: {},

  data () {
    return {
      isLoading: false,
      form: {
        title: '',
        projectId: '',
        tendersId: '',
        type: '',
        remark: ''
      },
      fileList: [],
      projectList: [],
      tenderList: [],
      typeList: ['开工资料', '过程资料', '竣工资料', '付款资料', '验收资料']
    };
  },

  created () {
    // this.getTypeList();
    this.getTenderList();
    this.getProjectList();
  },

  methods: {
    // 获取所有的类型
    getTypeList () {
      // notice/getAllNoticeType
      window.$axios.get({url:'/notice/getAllNoticeType'}).then(res => {
        if (res.data) {
          this.typeList = res.data || [];
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
        if (res.data) {
          this.tenderList = res.data || [];
        }
      }).catch(error => {
        this.$Message.error(error.message);
      });
    },

    // 获取所有项目区
    getProjectList () {
      window.$axios.get({url: '/project/getProjectList'}).then(res => {
        if (res.data) {
          this.projectList = res.data || [];
        } else {
          this.projectList = [];
        }
      }).catch(error => {
        this.$Message.error(error.message);
      });
    },

    uploadBefore(file) {
      // console.log(file);
      // console.log(typeof file);
      this.fileList.push(file);
      // let params = new FormData();
      // params.append('file', file);
      // window.$axios.post('/projectType/uploadPositionIcon', params).then(res => {
      //   console.log(res);
      // });
      return false;
    },

    proChangeEvent () {
      this.form.tendersId = '';
      this.getTenderList();
    },

    submitEvent () {
      if (!this.form.title) {
        this.$Message.error('标题不能为空！');
        return false;
      }
      if (!this.form.projectId) {
        this.$Message.error('项目区不能为空！');
        return false;
      }
      if (!this.form.tendersId) {
        this.$Message.error('标段不能为空！');
        return false;
      }
      if (!this.form.type) {
        this.$Message.error('类型不能为空！');
        return false;
      }
      if (!this.form.remark) {
        this.$Message.error('描述不能为空！');
        return false;
      }
      let params = new FormData();
      // let files = new FormData();
      this.fileList.forEach((item, index) => {
        // files.append(item);
        params.append('file' + index, item);
      });

      params.append('tiltle', this.form.title);
      params.append('proId', this.form.projectId);
      params.append('tendersId', this.form.tendersId);
      params.append('type', this.form.type);
      params.append('remark', this.form.remark);
      // params.append('file', files);
      this.isLoading = true;
      window.$axios.post('/tendersData/add', params).then(res => {
        this.isLoading = false;
        console.log(res);
        if (res.errorCode !== '0') {
          this.$Message.error(res.message);
        } else {
          this.$Message.info('添加成功！');
          this.$emit('closeDialog');
          this.$emit('addSuccess');
        }
      }).catch(error => {
        this.isLoading = false;
        this.$Message.error(error.message);
      });
    }
  }
};
</script>

<style lang='scss'>
  @import './index.scss';
</style>