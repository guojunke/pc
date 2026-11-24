<template>
  <div class="menuComm" style="">
    <!-- 标段层级 -->
    <div style="display: flex;border-bottom: 1px solid #eee;">
      <p class="engNumManage_line1 engNumManage_line2_1" @click="isShowList = !isShowList">
        <!-- <span style="margin-left: 30px;"></span> -->
        <Icon v-if="obj.projectTypeList && obj.projectTypeList.length > 0" :type="isShowList ? 'ios-arrow-down' : 'ios-arrow-back'" />
        {{obj.tenderName}}
      </p>
      <p class="engNumManage_line2" style="position: relative;">
        {{obj.standards}}
      </p>
      <p class="engNumManage_line3">{{obj.title}}</p>
      <p class="engNumManage_line4">{{obj.company}}</p>
      <p class="engNumManage_line5">{{obj.leader}}</p>
      <p class="engNumManage_line6">{{obj.phone}}</p>
      <p class="engNumManage_line7">
        <Button type="primary" size="small" @click="addTypeEvent(obj)">添加</Button>
        <Button type="success" size="small" style="margin: 0 10px;" @click="addEvent">编辑</Button>
        <Button type="error" size="small" @click="deleteTender(obj.id)">删除</Button>
      </p>
    </div>
    <div v-if="isShowList">
      <menu-comm-copy v-for="(secItem, secIndex) in obj.projectTypeList" :key="secIndex" :obj="secItem"
        @tenderAddBackEdit="tenderAddBack()" @deleteDialogSucessEvent="tenderAddBack()"></menu-comm-copy>
    </div>
    
    <add-tender v-if="isShowAddTender" :dataObj="obj"
      @closeDialog="isShowAddTender = false" @tenderAddBack="tenderAddBack()"></add-tender>

    <add-pro-type v-if="isShowAddType && addTypeObj" :dataObj="addTypeObj" :isEdit="false"
      @closeDialog="isShowAddType = false" @addProTypeBack="tenderAddBack()"></add-pro-type>

    <delete-dialog v-if="isShowDelete" type="标段" :deleteId="deleteId"
      @closeDialog="isShowDelete = false" @deleteBackEvent="tenderAddBack()"></delete-dialog>
  </div>
  
</template>

<script>
import MenuCommCopy from './menuCommCopy';
import AddTender from './addTender';
import AddProType from './addProType';
import DeleteDialog from './deleteDialog';

export default {
  name: 'menuComm',

  props: {
    obj: {
      default: () => {}
    }
  },

  components: {MenuCommCopy, AddTender, AddProType, DeleteDialog},

  data () {
    return {
      isShowAddTender: false,
      isShowDelete: false,
      isShowList: false,
      isShowAddType: false,
      deleteId: '',
      addTypeObj: null
    };
  },

  created () {},

  methods: {
    addEvent () {
      this.isShowAddTender = true;
    },

    tenderAddBack () {
      this.isShowAddTender = false;
      this.$emit('tenderAddBack');
    },

    addTypeEvent (val) {
      this.addTypeObj = val;
      this.isShowAddType = true;
    },

    // 删除标段--暂无接口
    deleteTender (id) {
      console.log(id);
      this.deleteId = id;
      this.isShowDelete = true;
    }
  }
};
</script>

<style lang='scss'>
  .menuComm{
    .engNumManage_line2_1{
      padding-left: .3rem!important;
      box-sizing: border-box;
    }
  }
  .ivu-menu-vertical .ivu-menu-submenu-title-icon{
    left: 0px;
    right: auto;
  }
</style>