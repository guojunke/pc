<template>
  <comm-dialog :title="dayRateInfo.gmtCreate + '进度报告'" :styleData="{width: '480px'}" @closeDialog="$emit('closeDialog')">
    <div slot="container" class="dayRateDetail">
      <div class="dayRateDetail_item dayRateDetail_item_center">
        <div class="dayRateDetail_label">项目区：</div>
        <div class="tenderDatail_value">
          <Input v-model="dayRateInfo.projectName" readonly />
        </div>
      </div>

      <div class="dayRateDetail_item dayRateDetail_item_center">
        <div class="dayRateDetail_label">标段：</div>
        <div class="tenderDatail_value">
          <Input v-model="dayRateInfo.tenderName" readonly />
        </div>
      </div>

      <div class="dayRateDetail_item dayRateDetail_item_top">
        <div class="dayRateDetail_label">报告内容：</div>
        <div class="tenderDatail_value">
          <Input v-model="dayRateInfo.content" type="textarea"  readonly />
        </div>
      </div>

      <div class="dayRateDetail_item">
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
    dayRateInfo: {
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