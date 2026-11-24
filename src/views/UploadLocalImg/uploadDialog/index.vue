<template>
  <comm-dialog title="新增现场影音" :styleData="{width: '480px'}" @closeDialog="$emit('closeDialog')">
    <div slot="container" class="uploadDialog">
      <div class="uploadDialog_item">
        <div class="uploadDialog_label">项目区：</div>
        <Input v-model="form.projectName" placeholder="" style="width: 200px;" />
      </div>

      <div class="uploadDialog_item" v-if="form.tenderName">
        <div class="uploadDialog_label">标段：</div>
        <Input v-model="form.tenderName" placeholder="" style="width: 200px;" />
      </div>
      
      <div class="uploadDialog_item">
        <div class="uploadDialog_label">类型：</div>
        <Select v-model="form.type" style="width:200px">
          <Option v-for="(item, index) in typeList" :value="item.type" :key="index">{{ item.typeName }}</Option>
        </Select>
      </div>

      <div class="uploadDialog_item">
        <div class="uploadDialog_label">附件：</div>
        <Upload action="#" :before-upload="uploadBefore" style="marignRight: 2rem;">
          <Button style="marignRight: 2rem;">上传附件</Button>
        </Upload>
        <span style="display: inline-block; width: 1.9rem;"></span>
        <div v-for="(item, index) in fileList" :key="index"
          class="uploadDialog_span">
          {{item.name}}
          <Icon type="ios-close" size="22" @click="fileList.splice(index, 1)" />
        </div>
      </div>

      <div class="uploadDialog_item">
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

  props: {
    dataItem: {
      default: {}
    }
  },

  data () {
    return {
      isLoading: false,
      form: {},
      fileList: [],
      typeList: []
    };
  },

  created () {
    this.getTypeList();
    Object.assign(this.form, this.dataItem);
  },

  methods: {
    // 获取所有的类型
    getTypeList () {
      let params = {};
      window.$axios.get({url: '/projectType/getAllProjectType', params}).then(res => {
        if (res.success) {
          this.typeList = [];
          res.data && Object.keys(res.data).forEach(key => {
            if (res.data[key] === '路' || res.data[key] === '绿化') {
              this.typeList.push({type: key, typeName: res.data[key]});
            }
          });
        } else {
          this.$Message.error(res.message);
        }
      }).catch(error => {
        this.$Message.error(error.message);
      });
    },

    uploadBefore(file) {
      this.fileList.push(file);
      return false;
    },

    submitEvent () {
      if (!this.form.type) {
        this.$Message.error('类型不能为空');
        return false;
      }
      if (!this.fileList.length) {
        this.$Message.error('附件不能为空');
        return false;
      }
      let params = new FormData();
      this.fileList.forEach((item, index) => {
        params.append('file' + index, item);
      });
      if (this.form.proId) {
        params.append('proId', this.form.proId || '');
      }
      if (this.form.tendersId) {
        params.append('tendersId', this.form.tendersId || '');
      }
      params.append('type', this.form.type || '');
      this.isLoading = true;
      window.$axios.post('projectType/uploadPositionIcon', params).then(res => {
        this.isLoading = false;
        if (res.errorCode === '0') {
          this.$Message.info('上传成功！');
          this.$emit('closeDialog');
        } else {
          this.$Message.info('上传失败！');
          this.$emit('closeDialog');
        }
      }).catch(error => {
        this.isLoading = false;
        this.$Message.info(error.message);
      });
    }
  }
};
</script>

<style lang='scss'>
  @import './index.scss';
</style>