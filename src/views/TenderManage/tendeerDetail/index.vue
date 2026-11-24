<template>
  <comm-dialog :title="tenderInfo.tiltle" :styleData="{width: '480px'}" @closeDialog="$emit('closeDialog')">
    <div slot="container" class="tenderDetail">
      <div class="tenderDetail_item tenderDetail_item_center">
        <div class="tenderDetail_label">项目区：</div>
        <div class="tenderDatail_value">
          <Input v-model="tenderInfo.projectName" readonly />
        </div>
      </div>

      <div class="tenderDetail_item tenderDetail_item_center">
        <div class="tenderDetail_label">标段：</div>
        <div class="tenderDatail_value">
          <Input v-model="tenderInfo.tenderName" readonly />
        </div>
      </div>

      <div class="tenderDetail_item tenderDetail_item_center">
        <div class="tenderDetail_label">类型：</div>
        <div class="tenderDatail_value">
          <Input v-model="tenderInfo.type" readonly />
        </div>
      </div>

      <div class="tenderDetail_item">
        <div class="tenderDetail_label">描述：</div>
        <div class="tenderDatail_value">
          <Input v-model="tenderInfo.remark" type="textarea" readonly />
        </div>
      </div>

      <div class="tenderDetail_item">
        <div class="tenderDetail_label">附件：</div>
        <div class="tenderDatail_value">
          <p class="tenderDetail_txt"
           v-for="(item, index) in (tenderInfo.fileNameList || [])" :key="index">{{item}}</p>
        </div>
      </div>

      <div class="tenderDetail_item">
        <Button style="margin: 0 50px;" @click="$emit('closeDialog')">取消</Button>
        <Button type="primary" @click="$emit('closeDialog')" style="margin: 0 50px;">确定</Button>
      </div>
    </div>
  </comm-dialog>
</template>

<script>
import CommDialog from '@/components/commDialog/index';
export default {
  props: {
    tenderInfo: {
      default: () => {}
    }
  },

  components: {CommDialog},

  data () {
    return {

    };
  },

  created () {},

  methods: {}
};
</script>

<style lang='scss'>
  @import './index.scss';
</style>