<template>
  <div class="menu_box">
    <div class="menu_box_title">智慧高标</div>
    <!-- <div v-for="(item, index) in menuList" :key="index" class="menu_one_item btn" :class="{acitveMenu: currentIndexOne === index + 1}" @click="skipEvent(item, index + 1)"> -->
    <div v-for="(item, index) in menuList" :key="index" class="menu_one_item btn" :class="{acitveMenu: $store.state.currentRouterName === item.name}" @click="skipEvent(item, index + 1)">
      <Icon class="menu_box_icon" :type="item.icon" size="20" />
      {{item.name}}
    </div>

    <!-- <Menu active-name="1-1" :open-names="['1']">
      <Submenu name="1" style="width: 200px">
        <template slot="title">
          模块一
        </template>
        <MenuItem name="1-1">文章管理</MenuItem>
        <MenuItem name="1-2">评论管理</MenuItem>
        <MenuItem name="1-3">举报管理</MenuItem>
      </Submenu>
    </Menu> -->
  </div>
</template>

<script>
export default {
  props: {},

  components: {},

  data () {
    return {
      currentIndexOne: 1,
      menuList: [
        {name: '工程量管理', link: '/EngNumManage', icon: 'md-home'},
        {name: '工程进度管理', link: '/EngRateManage', icon: 'md-refresh-circle'},
        {name: '上传定位图片', link: 'UploadLOcalImg', icon: 'md-images'},
        {name: '通知单管理', link: 'NotifyManage', icon: 'md-volume-up'},
        {name: '现场影音', link: 'SceneVideo', icon: 'ios-videocam'},
        {name: '标段资料管理', link: 'TenderManage', icon: 'md-list-box'},
        // {name: '工程量管理'},
        {name: '用户管理', link: 'UserManage', icon: 'md-person'},
      ]
    };
  },

  created () {},

  methods: {
    skipEvent (item, index) {
      this.currentIndexOne = index;
      this.$store.commit('setRouterName', item.name);
      this.$router.push({path: item.link});
    }
  }
};
</script>

<style lang='scss'>
  @import './index.less';
</style>