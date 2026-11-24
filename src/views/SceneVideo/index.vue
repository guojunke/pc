<template>
  <div class="scenceVideo">
    
    <div class="scenceVideo_serach">
      <div class="scenceVideo_serach_item">
        发布时间：
        <DatePicker v-model="form.gmtCreate" type="date" placeholder="请选择" style="width: 200px"></DatePicker>
      </div>

      <div class="scenceVideo_serach_item">
        类型：
        <Select v-model="form.type" style="width:200px">
          <Option v-for="(item, index) in typeList" :value="item" :key="index">{{ item }}</Option>
        </Select>
      </div>
      <div class="scenceVideo_serach_item">
        <Button class="marginRight" type="primary" @click="pageEvent(1)">搜索</Button>
        <Button type="success" @click="isShowAdd = true">新增</Button>
      </div>
      
    </div>

    <div ref="scenceVideoTable" class="scenceVideo_table">
      <Table border :columns="columnList" :data="tableData" :max-height="tableHeight"></Table>
      <div class="scenceVideo_page">
        <Page :total="total" :current="form.pageNum" :page-size="form.pageSize" @on-change="pageEvent" />
      </div>
    </div>

    <comm-loading v-if="isLoading"></comm-loading>

    <video-detail v-if="isShowDetail" :videoInfo="videoInfo" @closeDialog="isShowDetail = false"></video-detail>
    <add-video v-if="isShowAdd" @closeDialog="isShowAdd = false" @addVideoBack="getList()"></add-video>

  </div>
</template>

<script>
import VideoDetail from './videoDetail/index';
import AddVideo from './addVideo';

export default {
  props: {},

  components: { VideoDetail, AddVideo },

  data () {
    return {
      isLoading: false,
      isShowDetail: false,
      isShowAdd: false,
      videoInfo: null,
      form: {
        pageNum: 1,
        pageSize: 20,
        gmtCreate: '',
        type: ''
      },
      typeList: ['施工技术及要求', '现场视频及图片'],
      total: 0,
      tableHeight: 180,
      tableData: [{}],
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
        {key: 'gmtCreate', title: '发布时间', minWidth: 120, align: 'center'},
        {key: 'tiltle', title: '标题', minWidth: 120, align: 'center'},
        {key: 'type', title: '类型', minWidth: 60, align: 'center'},
        {key: 'remark', title: '描述', minWidth: 120, align: 'center'},
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
                  this.isShowDetail = true;
                  this.videoInfo = params.row;
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
    // this.getTypeList();
  },

  mounted () {
    // console.log(this.$refs.userManageTable.clientHeight);
    this.tableHeight = this.$refs.scenceVideoTable.clientHeight - 80;
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

    getList () {
      let params = {
        pageNum: this.form.pageNum,
        pageSize: this.form.pageSize,
        date: this.$formatDate(this.form.gmtCreate) || '',
        type: this.form.type === '全部' ? '' : this.form.type
      };
      this.isLoading = true;
      window.$axios.get({url: '/video/listVideoData', params}).then(res => {
        this.isLoading = false;
        if (res.data) {
          this.tableData = res.data.dataList || [];
          this.total = res.data.total || 0;
        }
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