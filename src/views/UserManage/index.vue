<template>
  <div class="userManage">
    <div class="userManage_search">
      <Input class="userManage_input marginRight" v-model="searchStr" placeholder="输入关键字搜索" />
      <Button type="primary" @click="pageEvent(1)">搜索</Button>
      <span style="flex: 1;"></span>
      <Button type="primary" class="marginRight">批量导入</Button>
      <Button type="primary" @click="addEvent">新增用户</Button>
    </div>

    <div ref="userManageTable" class="userManage_table">
      <Table border :columns="columnList" :data="tableData" :max-height="tableHeight"></Table>
      <div class="userManage_page" v-if="total > 0">
        <Page :total="total" :current="pageNum" :page-size="pageSize" @on-change="pageEvent" />
      </div>
    </div>

    <Spin fix v-if="isLoading">
      <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>

    <add-user v-if="isShowAdd" :userInfo="userInfo" @addSucessEvent="getList()" @closeDialog="isShowAdd = false"></add-user>
    <modify-psd v-if="isShowPsd" :userInfo="userInfo" @closeDialog="isShowPsd = false"></modify-psd>

  </div>
</template>

<script>
import AddUser from './addUser/index';
import ModifyPsd from './modifyPsd';

export default {
  props: {},

  components: {AddUser, ModifyPsd},

  data () {
    return {
      isLoading: false,
      isShowAdd: false,
      isShowPsd: false,
      userInfo: null,
      searchStr: '',
      tableHeight: 360,
      total: 0,
      pageNum: 1,
      pageSize: 20,
      tableData: [],
      columnList: [
        {key: 'username', title: '姓名', minWidth: 80, align: 'center'},
        {key: 'mobile', title: '账号', minWidth: 126, align: 'center'},
        {key: 'roleName', title: '角色', minWidth: 80, align: 'center'},
        {key: 'projectName', title: '项目区', minWidth: 80, align: 'center'},
        {key: 'tendersName', title: '标段', minWidth: 80, align: 'center'},
        {
          key: '',
          title: '操作',
          width: 300,
          align: 'center',
          render: (h, params) => {
            const arr = [
              h('Button', {
                props: {
                  type: 'success'
                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.isShowAdd = true;
                    this.userInfo = params.row;
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  // type: 'primary'
                },
                style: {
                  marginRight: '10px',
                  background: 'rgba(1, 162, 182, 1)',
                  color: '#fff'
                },
                on: {
                  click: () => {
                    this.isShowPsd = true;
                    this.userInfo = params.row;
                  }
                }
              }, '修改密码'),
              h('Button', {
                props: {
                  // type: 'success'
                  // color: '#ccc'
                },
                style: {
                  background: '#aaa',
                  color: '#fff'
                },
                on: {
                  click: () => {
                    this.deletEvent(params.row.id);
                  }
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

  mounted () {
    // console.log(this.$refs.userManageTable.clientHeight);
    this.tableHeight = this.$refs.userManageTable.clientHeight - 80;
  },

  methods: {
    getList () {
      let params = {
        keyword: this.searchStr,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      this.isLoading = true;
      window.$axios.post('/api/user/getPages ', params).then(res => {
        this.isLoading = false;
        // console.log(res.data);
        if (res.data.dataList) {
          this.tableData = res.data.dataList || [];
          this.total = res.data.total || 0;
        }
      }).catch(() => {
        this.isLoading = false;
      });
    },

    addEvent () {
      this.isShowAdd = true;
      this.userInfo = {};
    },

    deletEvent (id) {
      window.$axios.post(`/api/user/delete/${id}`).then(res => {
        this.getList();
      }).catch(error => {
        this.isLoading = false;
        this.$Meesage.error(error.message);
      });
    },

    pageEvent (val) {
      this.pageNum = val;
      this.getList();
    }
  }
};
</script>

<style lang='scss' scoped>
  @import './index.scss';
</style>