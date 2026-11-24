<template>
  <comm-dialog title="今日进度更新" :styleData="{width: '480px'}" @closeDialog="$emit('closeDialog')">
    <div slot="container" class="editRate">
      <div class="editRate_item">
        <span class="editRate_item_span">{{editData.projectName || '--'}}</span>
        <span class="editRate_item_span">{{editData.tenderName || '--'}}</span>
        <span class="editRate_item_span">工程种类：{{editData.name || '--'}}</span>
        <span class="editRate_item_span">规格：{{editData.standards || '--'}}</span>
        
      </div>

      <div class="editRate_item" v-for="(item, index) in keyObj" :key="index">
        <span class="editRate_label">{{item.name}}：</span>
        <Input v-model="formList[index]" placeholder="请输入0~(100-总进度)之间的数值" style="width: 240px;margin-right: 10px;" />
        总进度：
        <span class="editRate_item_color">{{editData.detailProcess[item.oldKey]}} %</span>
      </div>

      <!-- <div class="editRate_item">
        <span>{{keyObj[0].name}}：</span>
        <Input v-model="formList[0]" placeholder="请输入0~(100-总进度)之间的数值" style="width: 240px;margin-right: 10px;" />
        总进度：
        <span class="editRate_item_color">{{editData.detailProcess[keyObj[0].oldKey]}} %</span>
      </div>

      <div class="editRate_item">
        <span>{{keyObj[1].name}}：</span>
        <Input v-model="formList[1]" placeholder="请输入0~(100-总进度)之间的数值" style="width: 240px;margin-right: 10px;" />
        总进度：
        <span class="editRate_item_color">{{editData.detailProcess[keyObj[1].oldKey]}} %</span>
      </div>

      <div class="editRate_item">
        <span>{{keyObj[2].name}}：</span>
        <Input v-model="formList[2]" placeholder="请输入0~(100-总进度)之间的数值" style="width: 240px;margin-right: 10px;" />
        总进度：
        <span class="editRate_item_color">{{editData.detailProcess[keyObj[2].oldKey]}} %</span>
      </div>

      <div class="editRate_item">
        <span>{{keyObj[3].name}}：</span>
        <Input v-model="formList[3]" placeholder="请输入0~(100-总进度)之间的数值" style="width: 240px;margin-right: 10px;" />
        总进度：
        <span class="editRate_item_color">{{editData.detailProcess[keyObj[3].oldKey]}} %</span>
      </div> -->

      <div class="editRate_item">
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
    editData: {
      default: () => {}
    },
    keyObj: {
      default: () => {}
    }
  },

  components: {CommDialog},

  data () {
    return {
      isLoading: false,
      formList: []
    };
  },

  created () {
    console.log(this.editData);
  },

  methods: {

    submitEvent () {
      let params = {
        id: this.editData.detailProcess.id,
        type: this.editData.type,
      };
      this.keyObj.forEach((item, index) => {
        params[item.newKey] = this.formList[index];
        params[item.oldKey] = this.editData.detailProcess[item.oldKey];
      });
      params.proTypeId = this.editData.detailProcess.proTypeId;
      let obj = {};
      obj.projectTypeEnum = this.editData.type;
      obj[this.keyObj[0].processName] = params;
      this.isLoading = true;
      window.$axios.post('/progress/update', obj).then(res => {
        this.isLoading = false;
        if (res.errorCode === '0') {
          this.$Message.info('进度更新成功');
          this.$emit('editRateBack');
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