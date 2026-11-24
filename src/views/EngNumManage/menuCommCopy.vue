<template>
  <div class="menuCommCopy">

    <div style="display: flex;border-bottom: 1px solid #eee;">
      <p class="engNumManage_line1 engNumManage_line3_1" @click="isShowList.splice(index, 1, !isShowList[index])">
        <!-- <span style="margin-left: 50px;"></span> -->
        <Icon v-if="obj.list && obj.list.length > 0" :type="isShowList[index] ? 'ios-arrow-down' : 'ios-arrow-back'" />
        {{obj.name}}
      </p>
      <p class="engNumManage_line2">
        {{obj.standards || '--'}}
      </p>
      <p class="engNumManage_line3">{{obj.desc}}</p>
      <p class="engNumManage_line4">{{obj.company}}</p>
      <p class="engNumManage_line5">{{obj.leader}}</p>
      <p class="engNumManage_line6">{{obj.phone}}</p>
      <p class="engNumManage_line7 engNumManage_line3_7">
        <Button type="success" size="small" style="margin: 0 10px;" @click="isShowAddType = true">编辑</Button>
        <Button type="error" size="small" @click="deleteTender(obj.id)">删除</Button>
      </p>
    </div>
    
    <add-pro-type v-if="isShowAddType" :isEdit="true" :dataObj="{}" :typeObj="obj"
      @closeDialog="isShowAddType = false" @addProTypeBack="tenderAddBack"></add-pro-type>

    <delete-dialog v-if="isShowDelete" type="工程量" :deleteId="deleteId"
      @closeDialog="isShowDelete = false" @deleteDialogSucessEvent="deleteDialogSucessEvent"></delete-dialog>
    
  </div>
  
</template>

<script>
import AddProType from './addProType';
import DeleteDialog from './deleteDialog';

export default {
  name: 'menuComm',

  props: {
    obj: {
      default: () => {}
    }
  },

  components: {AddProType, DeleteDialog},

  data () {
    return {
      isShowAddType: false,
      isShowDelete: false,
      deleteId: '',
      isShowList: []
    };
  },

  created () {
    console.log(this.obj);
    console.log(this.obj.title);
  },

  methods: {
    tenderAddBack () {
      console.log('index123');
      this.isShowAddTender = false;
      this.$emit('tenderAddBackEdit');
    },
    // 删除工程量--暂无接口
    deleteTender (id) {
      console.log(id);
      this.deleteId = id;
      this.isShowDelete = true;
    },
    deleteDialogSucessEvent () {
      this.isShowDelete = false;
      this.$emit('deleteDialogSucessEvent');
    }
  }
};
</script>

<style lang='scss'>
  .menuCommCopy{
    .engNumManage_line3_1{
      padding-left: .5rem!important;
      box-sizing: border-box;
    }
    .engNumManage_line3_7{
      padding-left: .78rem!important;
    }
  }
  .ivu-menu-vertical .ivu-menu-submenu-title-icon{
    left: 0px;
    right: auto;
  }
</style>