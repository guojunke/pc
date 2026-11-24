<template>
  <div class="notifyManage">
    <div class="notifyManage_serach">

      <div class="notifyManage_serach_item">
        项目区：
        <Select v-model="form.proId" :clearable="true" style="width: 200px" @on-change="proChangeEvent">
          <Option v-for="(item, index) in projectList" :value="parseInt(item.id)" :key="index">{{ item.projectName }}</Option>
        </Select>
      </div>

      <div class="notifyManage_serach_item">
        标段：
        <Select v-model="form.tendersId" :clearable="true" style="width:200px" @on-change="form.type = ''">
          <Option v-for="(item, index) in tenderList" :value="item.id" :key="index">{{ item.tenderName || '--'}}</Option>
        </Select>
      </div>

      <div class="notifyManage_serach_item">
        类型：
        <Select v-model="form.type" :clearable="true" style="width:200px">
          <Option v-for="(item, index) in typeList" :value="item" :key="index">{{ item }}</Option>
        </Select>
      </div>
      <div class="notifyManage_serach_item">
        <Button type="primary" @click="pageEvent(1)">搜索</Button>
      </div>
      
    </div>

    <div ref="notifyManageTable" class="notifyManage_table">
      <Table border :columns="columnList" :data="tableData" :max-height="tableHeight"></Table>
      <div class="notifyManage_page">
        <Page :total="total" :current="form.pageNum" :page-size="form.pageSize" @on-change="pageEvent" />
      </div>
    </div>

    <comm-loading v-if="isLoading"></comm-loading>
    <notify-detail v-if="isShowDetail" title="通知单信息" :notifyInfo="notifyInfo" @closeDialog="isShowDetail = false"></notify-detail>
  </div>
</template>

<script>
import NotifyDetail from './notifyDetail';

export default {
  props: {},

  components: {NotifyDetail},

  data () {
    return {
      isLoading: false,
      isShowDetail: false,
      notifyInfo: null,
      total: 0,
      form: {
        proId: '',
        tendersId: '',
        type: '',
        pageNum: 1,
        pageSize: 20
      },
      typeList: [],
      projectList: [],
      tenderList: [],
      tableHeight: 180,
      tableData: [{}],
      columnList: [
        {
          key: '',
          title: '编号',
          minWidth: 96,
          align: 'center',
          render: (h, params) => {
            return h('span', params.row.num);
          }
        },
        {key: 'projectName', title: '项目区', minWidth: 120, align: 'center'},
        {key: 'tenderName', title: '标段', minWidth: 120, align: 'center'},
        {key: 'type', title: '通知单类型', minWidth: 80, align: 'center'},
        {
          key: '',
          title: '操作',
          minWidth: 180,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary'
                },
                class: 'marginRight',
                on: {
                  click: () => {
                    this.notifyInfo = params.row;
                    this.isShowDetail = true;
                  }
                }
              }, '查看'),
              h('Button', {
                props: {
                  type: 'error'
                },
                on: {
                  click: () => {
                    this.deleteEvent(params.row.id);
                    // this.deleteEvent(1);
                  }
                }
              }, '删除')
            ]);
          }
        }
      ]
    };
  },

  created () {
    this.getList();
    this.getProjectList();
    this.getTenderList();
    this.getTypeList();
  },

  mounted () {
    // console.log(this.$refs.userManageTable.clientHeight);
    this.tableHeight = this.$refs.notifyManageTable.clientHeight - 80;
  },

  methods: {
    // 获取所有的类型
    getTypeList () {
      window.$axios.get({url:'/notice/getAllNoticeType'}).then(res => {
        if (res.data) {
          this.typeList = ['全部', ...res.data];
        }
      }).catch(error => {
        this.$Message.error(error.message);
      });
    },

    // 获取所有的标段
    getTenderList () {
      let params = {
        proId: this.form.proId
      };
      window.$axios.get({url:'/tender/getTendersList', params}).then(res => {
        if (res.data) {
          this.tenderList = res.data || [];
        }
      }).catch(error => {
        this.$Message.error(error.message);
      });
    },

    proChangeEvent () {
      this.getTenderList();
      this.form.tendersId = '';
      this.form.type = '';
    },

    // 获取所有项目区
    getProjectList () {
      window.$axios.get({url: '/project/getProjectList'}).then(res => {
        if (res.data) {
          this.projectList = res.data || [];
        } else {
          this.projectList = [];
        }
      }).catch(error => {
        this.$Message.error(error.message);
      });
    },

    getList () {
      let params = {
        proId: this.form.proId,
        tendersId: this.form.tendersId,
        type: this.form.type === '全部' ? '' : this.form.type,
        pageNum: this.form.pageNum,
        pageSize: this.form.pageSize
      };
      this.isLoading = true;
      window.$axios.get({url: '/notice/listNotice', params}).then(res => {
        this.isLoading = false;
        console.log(res.data);
        if (res.data) {
          // this.tableData = res.data.dataList || [];
          this.tableData = res.data.dataList || [];
          this.total = res.data.total;
        }
      }).catch(error => {
        this.isLoading = false;
        this.$Message.error(error.message);
      });
    },

    deleteEvent (id) {
      this.isLoading = true;
      console.log(id);
      window.$axios.post('/notice/delete', {id: id}).then(res => {
        this.getList();
      }).catch(error => {
        this.isLoading = false;
        this.$Message.error(error.message);
      });
    },

    pageEvent (val) {
      this.form.pageNum = val;
      this.getList();
    }
  }
};
</script>

<style lang='scss'>
  @import './index.scss';
</style>