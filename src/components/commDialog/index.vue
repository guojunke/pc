<template>
  <div class="commDialog">
    <div class="commDialog_wrap" :style="styleData">
      <div class="commDialog_title">
        <span>{{title || '信息'}}</span>
        <span v-if="tishi">{{tishi}}</span>
        <span style="flex: 1"></span>
        <Icon type="ios-close" size="28" @click="$emit('closeDialog')" />
      </div>

      <div class="commDialog_container">
        <slot name="container"></slot>
      </div>

      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    tishi: String,
    styleData: {
      default: () => {}
    }
  },

  components: {},

  data () {
    return {

    };
  },

  created () {
    console.log(this.styleData);
  },

  methods: {}
};
</script>

<style lang='scss'>
  @import './index.scss';
</style>