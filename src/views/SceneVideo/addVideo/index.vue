<template>
  <comm-dialog title="新增现场影音" :styleData="{width: '480px'}" @closeDialog="$emit('closeDialog')">
    <div slot="container" class="addVideo">
      <div class="addVideo_item">
        <div class="addVideo_label">标题：</div>
        <Input v-model="form.title" placeholder="请输入姓名" style="width: 200px;" />
      </div>

      <div class="addVideo_item">
        <div class="addVideo_label">类型：</div>
        <Select v-model="form.type" style="width:200px">
          <Option v-for="(item, index) in typeList" :value="item" :key="index">{{ item }}</Option>
        </Select>
      </div>

      <div class="addVideo_item addVideo_textarea">
        <div class="addVideo_label">描述：</div>
        <Input v-model="form.remark" type="textarea" style="width: 200px;" />
      </div>

      <div class="addVideo_item">
        <div class="addVideo_label">附件：</div>
        <!-- <Input v-model="form.tendersId" placeholder="" style="width: 200px;"/> -->
        <Upload action="#" :before-upload="uploadBefore" style="marignRight: 2rem;">
          <Button style="marignRight: 2rem;">上传附件</Button>
        </Upload>
        <span style="display: inline-block; width: 1.9rem;"></span>
        <div v-for="(item, index) in fileList" :key="index"
          class="addVideo_span">
          {{item.name}}
          <Icon type="ios-close" size="22" @click="fileList.splice(index, 1)" />
        </div>
      </div>

      <div class="addVideo_item">
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
      form: {},
      fileList: [],
      projectList: [],
      tenderList: [],
      typeList: ['施工技术及要求', '现场视频及图片']
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

    uploadBefore(file) {
      this.fileList.push(file);
      // let params = new FormData();
      // params.append('file', file);
      // window.$axios.post('/projectType/uploadPositionIcon', params).then(res => {
      //   console.log(res);
      // });
      return false;
    },

    submitEvent () {
      if (!this.form.title) {
        this.$Message.error('标题不能为空！');
        return false;
      }
      if (!this.form.type) {
        this.$Message.error('类型');
        return false;
      }
      if (!this.form.remark) {
        this.$Message.error('描述不能为空');
        return false;
      }
      if (!this.fileList.length) {
        this.$Message.error('附件不能为空');
        return false;
      }
      let params = new FormData();
      let files = new FormData();
      this.fileList.forEach((item, index) => {
        // files.append('file', item);
        params.append('file' + index + 1, item);
      });
      params.append('tiltle', this.form.title || '');
      params.append('type', this.form.type || '');
      params.append('remark', this.form.remark || '');
      // params.append('file', files);
      this.isLoading = true;
      window.$axios.post('/video/add', params).then(res => {
        this.isLoading = false;
        if (res.errorCode === '0') {
          this.$Message.info('添加成功！');
          this.$emit('addVideoBack');
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
};
</script>

<style lang='scss'>
  @import './index.scss';
</style>