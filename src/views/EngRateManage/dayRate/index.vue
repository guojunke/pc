<template>
  <div class="dateRate">

    <div class="dateRate_serach">
      <div class="dateRate_serach_item">
        时间：
        <DatePicker v-model="form.date" type="date" placeholder="请选择" style="width: 200px"></DatePicker>
      </div>

      <div class="dateRate_serach_item">
        项目区：
        <Select v-model="form.proId" style="width: 120px" @on-change="getTenderList()">
          <Option v-for="(item, index) in projectList" :value="item.id" :key="index">{{ item.projectName }}</Option>
        </Select>
      </div>

      <div class="dateRate_serach_item">
        标段：
        <Select v-model="form.tendersId" style="width: 100px">
          <Option v-for="(item, index) in tenderList" :value="item.id" :key="index">{{ item.tenderName }}</Option>
        </Select>
      </div>

      <div class="dateRate_serach_item">
        <Button type="primary" @click="pageEvent(1)">搜索</Button>
      </div>
      
    </div>

    <div ref="dateRateTable" class="dateRate_table">
      <Table border :columns="columnList" :data="tableData" :max-height="tableHeight"></Table>
      <div class="dateRate_page">
        <Page :total="total" :current="form.pageNum" :page-size="form.pageSize" @on-change="pageEvent" />
      </div>
    </div>

    <day-rate-detail v-if="isShowDetail" :dayRateInfo="dayRateInfo" @closeDialog="isShowDetail = false"></day-rate-detail>

  </div>
</template>

<script>
import DayRateDetail from './dayRateDetail';
export default {
  props: {},

  components: {DayRateDetail},

  data () {
    return {
      isShowDetail: false,
      form: {
        date: '',
        proId: '',
        tendersId: '',
        pageNum: 1,
        pageSize: 20
      },
      dayRateInfo: null,
      projectList: [],
      tenderList: [],
      total: 0,
      tableHeight: 180,
      tableData: [],
      columnList: [
        {
          key: '',
          title: '编号',
          width: 80,
          align: 'center',
          render: (h, params) => {
            return h('span', params.index + 1);
          }
        },
        {key: 'gmtCreate', title: '报告时间', minWidth: 120, align: 'center'},
        {key: 'projectName', title: '项目区', minWidth: 120, align: 'center'},
        {key: 'tenderName', title: '标段', minWidth: 60, align: 'center'},
        {key: 'content', title: '报告内容', minWidth: 180, align: 'center'},
        {
          key: '',
          title: '操作',
          width: 100,
          align: 'center',
          render: (h, params) => {
            return h('Button', {
              props: {
                type: 'primary'
              },
              on: {
                click: () => {
                  this.dayRateInfo = params.row;
                  this.isShowDetail = true;
                }
              }
            }, '查看');
          }
        }
      ]
    };
  },

  created () {
    this.getList();
    this.getProjectList();
    this.getTenderList();
  },

  mounted () {
    // console.log(this.$refs.userManageTable.clientHeight);
    this.tableHeight = this.$refs.dateRateTable.clientHeight - 80;
  },

  methods: {
    // 获取所有项目区
    getProjectList () {
      window.$axios.get({url: '/project/getProjectList'}).then(res => {
        if (res.errorCode === '0') {
          this.projectList = res.data || [];
        } else {
          this.$Message.error(res.message);
          this.projectList = [];
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
        if (res.errorCode === '0') {
          this.tenderList = res.data || [];
        } else {
          this.$Message.error(res.message);
        }
      }).catch(error => {
        this.$Message.error(error.message);
      });
    },

    getList () {
      let params = {
        date: this.$formatDate(this.form.date) || '',
        proId: this.form.proId || '',
        tendersId: this.form.tendersId || '',
        pageNum: this.form.pageNum,
        pageSize: this.form.pageSize
      };
      window.$axios.get({url: '/dailypaper/getDailyPaperList', params}).then(res => {
        if (res.data.dataList) {
          this.tableData = res.data.dataList || [];
          this.total = res.data.total || 0;
        }
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