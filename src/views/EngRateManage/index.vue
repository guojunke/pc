<template>
  <div class="engRateManage">
    <div class="engRateManage_tab">
      <p :class="{'engRateManage_tab_active': currentTabIndex === 1}" @click="tabEvent(1)">查看日进度报告</p>
      <p :class="{'engRateManage_tab_active': currentTabIndex === 2}" @click="tabEvent(2)">按标段更新</p>
    </div>

    <date-rate v-if="currentTabIndex === 1"></date-rate>
    <update-rate v-else></update-rate>
  </div>
</template>

<script>
import DateRate from './dayRate/index';
import UpdateRate from './updateRate/index';
export default {
  props: {},

  components: {DateRate, UpdateRate},

  data () {
    return {
      currentTabIndex: 1
    };
  },

  created () {},

  methods: {
    tabEvent (index) {
      this.currentTabIndex = index;
    }
  }
};
</script>

<style lang='scss'>
  @import './index.scss';
</style>