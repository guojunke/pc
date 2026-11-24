<template>
  <div class="engNumManage">
    
    <div class="engNumManage_search">
      <!-- <Input v-model="form.searchStr" search enter-button="搜索" placeholder=""
        style="width: 240px;"  @on-search="getList()"/> -->
      <Button @click="addProEvent" type="primary" style="margin-left: .2rem;">新增项目区</Button>
    </div>
    
    <div ref="engNumManage" class="engNumManage_table">
      <!-- <Table border :columns="columnList" :data="tableData" :max-height="tableHeight"></Table> -->
      <table style="width: 100%; height: 100%; border-top: 1px solid #eee;display: flex; flex-direction: column;">
        <div style="display: flex;border-bottom: 1px solid #eee;">
            <p class="engNumManage_line1">
              名称
            </p>
            <p class="engNumManage_line2 engNumManage_line2_1">规格</p>
            <p class="engNumManage_line3">描述</p>
            <p class="engNumManage_line4">中标公司</p>
            <p class="engNumManage_line5">负责人</p>
            <p class="engNumManage_line6">负责人电话</p>
            <p class="engNumManage_line7">操作</p>
        </div>
        <!-- <div style="min-height: 10px;flex: 1; overflow: auto;"> -->
        <div style="">
          
          <div v-for="(item, index) in tableData" :key="index">
            <div style="display: flex;border-bottom: 1px solid #eee;">
              <p class="engNumManage_line1" @click="isShowList.splice(index, 1, !isShowList[index])">
                <Icon v-if="item.tanderProjectTypeList && item.tanderProjectTypeList.length > 0" :type="isShowList[index] ? 'ios-arrow-down' : 'ios-arrow-back'" />
                {{item.projectName}}
              </p>
              <p class="engNumManage_line2">{{item.standards}}</p>
              <p class="engNumManage_line3">{{item.title}}</p>
              <p class="engNumManage_line4">{{item.company}}</p>
              <p class="engNumManage_line5">{{item.leader}}</p>
              <p class="engNumManage_line6">{{item.phone}}</p>
              <p class="engNumManage_line7">
                <Button type="primary" size="small" @click="addEvent(item.id)">添加</Button>
                <Button type="success" size="small" style="margin: 0 10px;" @click="editProEvent(item)">编辑</Button>
                <Button type="error" size="small" @click="deleteEvent(item)">删除</Button>
              </p>
            </div>
            <div v-if="isShowList[index]">
              <menu-comm v-for="(secItem, secIndex) in item.tanderProjectTypeList" :key="secIndex" :obj="secItem"
                @tenderAddBack="tenderAddBack"></menu-comm>
            </div>
            
          </div>
        </div>
        

      </table>


      <!-- <div class="engNumManage_page">
        <Page :total="total" :current="form.pageNum" :page-size="form.pageSize" @on-change="pageEvent" />
      </div> -->
    </div>

    <Spin fix v-if="isLoading">
      <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>

    <add-pro v-if="isShowEditPro" :proObj="editProObj"
      @closeDialog="isShowEditPro = false" @addProSucessEvent="getList()"></add-pro>

    <add-tender v-if="isShowAddTender" :dataObj="{proId: targetProId}"
      @closeDialog="isShowAddTender = false" @tenderAddBack="tenderAddBack()"></add-tender>

    <delete-dialog v-if="isShowDelete" type="项目区" :deleteId="deleteId"
     @closeDialog="isShowDelete = false" @deleteDialogSucessEvent="getList()"></delete-dialog>
  </div>
</template>

<script>
import MenuComm from './menuComm';
import AddTender from './addTender';
import AddPro from './addPro';
import DeleteDialog from './deleteDialog';

export default {
  props: {},

  components: {MenuComm, AddTender, AddPro, DeleteDialog},

  data () {
    return {
      isLoading: false,
      isShowDelete: false,
      isShowAddTender: false,
      isShowEditPro: false,
      editProObj: null,
      targetProId: '', // 要添加标段的项目区
      tableHeight: 360,
      total: 0,
      form: {
        searchStr: '',
        pageNum: 1,
        pageSize: 20
      },
      isShowList: [],
      tableData: [],
      columnList: [
        {key: 'username', title: '名称', minWidth: 80, align: 'center'},
        {key: 'mobile', title: '规格', minWidth: 80, align: 'center'},
        {key: 'roleName', title: '描述', minWidth: 80, align: 'center'},
        {key: 'project', title: '中标公司', minWidth: 80, align: 'center'},
        {key: 'tenderId', title: '负责人', minWidth: 80, align: 'center'},
        {key: 'tenderId', title: '负责人电话', minWidth: 80, align: 'center'},
        {
          key: '',
          title: '操作',
          width: 200,
          align: 'center',
          render: (h) => {
            const arr = [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '10px'
                }
              }, '添加'),
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '10px'
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                }
              }, '删除')
            ];
            return h('div', arr);
          }
        }
      ]
    };
  },

  created () {
    this.getList();
  },

  methods: {
    getList () {
      // let params = {proId: 1};
      let params = {};
      this.isLoading = true;
      window.$axios.get({url: '/project/getBackendProjectIndex', params}).then(res => {
        this.isLoading = false;
        this.tableData = res.data;
        res.data.forEach((item, index) => {
          if (!this.isShowList[index]) {
            this.isShowList[index] = false;
          }
        });
      }).catch(error => {
        this.isLoading = false;
        this.$Message.error(error.message);
      });
    },

    // 添加标段
    addEvent (id) {
      this.targetProId = id;
      this.isShowAddTender = true;
    },
    tenderAddBack () {
      console.log('index');
      this.isShowAddTender = false;
      this.getList();
    },

    // 添加项目区
    addProEvent () {
      this.editProObj = null;
      this.isShowEditPro = true;
    },
    // 编辑项目区
    editProEvent (val) {
      this.editProObj = val;
      this.isShowEditPro = true;
    },

    deleteEvent (item) {
      this.deleteId = item.id;
      this.isShowDelete = true;
    }
  }
};
</script>

<style lang='scss'>
  @import './index.scss';
  .engNumManage{
    tr{
      border-top: 1px solid #eee;
    }
    td{
      // border-bottom: 1px solid #eee;
      padding: 6px;
      // text-align: center;
      border-right: 1px solid #eee;
    }
    .ivu-menu-item{
      padding-left: 43px!important;
    }
  }
</style>