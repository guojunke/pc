<template>
  <comm-dialog :title="videoInfo.tiltle" :styleData="{width: '480px'}" @closeDialog="$emit('closeDialog')">
    <div slot="container" class="videoDetail">

      <div class="videoDetail_item videoDetail_item_center">
        <div class="videoDetail_label">类型：</div>
        <div class="tenderDatail_value">
          <Input v-model="videoInfo.type" readonly />
        </div>
      </div>

      <div class="videoDetail_item">
        <div class="videoDetail_label">描述：</div>
        <div class="tenderDatail_value">
          <Input v-model="videoInfo.remark" type="textarea" readonly />
        </div>
      </div>

      <div class="videoDetail_item">
        <div class="videoDetail_label">附件：</div>
        <div class="tenderDatail_value">
          <p class="videoDetail_txt"
           v-for="(item, index) in (videoInfo.fileNameList || [])" :key="index">{{item}}</p>
        </div>
      </div>

      <div class="videoDetail_item">
        <Button style="margin: 0 50px;" @click="$emit('closeDialog')">取消</Button>
        <Button type="primary" @click="$emit('closeDialog')" style="margin: 0 50px;">确定</Button>
      </div>
    </div>
  </comm-dialog>
</template>

<script>
export default {
  props: {
    videoInfo: {
      default: () => {}
    }
  },

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