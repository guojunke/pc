<template>
  <div class="updateRate">

    <div class="updateRate_serach">
      <div class="updateRate_serach_item">
        项目区：
        <Select v-model="form.proId" style="width: 120px" @on-change="getTenderList()">
          <Option v-for="(item, index) in projectList" :value="item.id" :key="index">{{ item.projectName }}</Option>
        </Select>
      </div>

      <div class="updateRate_serach_item">
        标段：
        <Select v-model="form.tendersId" style="width: 100px">
          <Option v-for="(item, index) in tenderList" :value="item.id" :key="index">{{ item.tenderName }}</Option>
        </Select>
      </div>

      <div class="uploadLocalImg_serach_item">
        类型：
        <Select v-model="form.type" style="width: 100px;margin-right: .2rem;">
          <Option v-for="(item, index) in typeList" :value="index" :key="index">{{ item }}</Option>
        </Select>
      </div>

      <div class="updateRate_serach_item">
        <Button type="primary" @click="getList">搜索</Button>
      </div>
      
    </div>

    <!-- 表格部分 -->
    <div class="updateRate_table">

      <div class="updateRate_row">
        <p v-for="(item, index) in columnList" :key="index"
          class="updateRate_th updateRate_cell" :style="{width: item.width, flex: item.flex}">{{item.title}}</p>
      </div>

      <div class="updateRate_cell" v-if="tableData.length < 1" style="padding: .5rem;">
        暂无数据
      </div>

      <div v-for="(allItem, allIndex) in tableData" :key="allIndex">
        {{allItem.name}}
        <div class="updateRate_row" v-for="(rowItem, rowIndex) in allItem.projectTypes" :key="rowIndex">
          <!-- 项目名字 -->
          <div class="updateRate_row_box" :style="{width: columnList[0].width, flex: columnList[0].flex}">
            <p class="updateRate_cell">
              {{rowItem.projectName}}</p>
          </div>
          <!-- 标段 -->
          <div class="updateRate_row_box" :style="{width: columnList[1].width, flex: columnList[1].flex}">
            <p class="updateRate_cell">{{rowItem.tenderName}}</p>
          </div>
          <!-- 工程种类 -->
          <div class="updateRate_row_box" :style="{width: columnList[2].width, flex: columnList[2].flex}">
            <p class="updateRate_cell">{{rowItem.name}}</p>
          </div>
          <!-- 规格 -->
          <div class="updateRate_row_box" :style="{width: columnList[3].width, flex: columnList[3].flex}">
            <div class="updateRate_cell_box">
              <p class="updateRate_cell" :style="{flex: 2}">{{rowItem.standards}}</p>
            </div>
          </div>
          <!-- 数量 -->
          <div class="updateRate_row_box" :style="{width: columnList[4].width, flex: columnList[4].flex}">
            <div class="updateRate_cell_box">
              <!-- <p class="updateRate_cell" :style="{flex: 2}">{{allItem.totalNum}}</p> -->
              <p class="updateRate_cell" :style="{flex: 2}">1</p>
            </div>
          </div>

          <div class="updateRate_row_box" :style="{width: columnList[5].width, flex: columnList[5].flex}">
            <div class="updateRate_cell_box">
              <p class="updateRate_cell" v-for="(item, index) in typeObj[allItem.type]" :key="index">
                {{item.name}}
              </p>
              <!-- <p class="updateRate_cell">{{typeObj[allItem.type][0].name}}</p>
              <p class="updateRate_cell">{{typeObj[allItem.type][1].name}}</p>
              <p class="updateRate_cell">{{typeObj[allItem.type][2].name}}</p>
              <p class="updateRate_cell">{{typeObj[allItem.type][3].name}}</p> -->
            </div>
          </div>
          <!-- 总进度 -->
          <div class="updateRate_row_box" :style="{width: columnList[6].width, flex: columnList[6].flex}">
            <div class="updateRate_cell_box update_all_color">
              <p class="updateRate_cell" v-for="(item, index) in typeObj[allItem.type]" :key="index">
                <!-- {{parseInt(rowItem.detailProcess[item.oldKey]) + parseInt(rowItem.detailProcess[item.newKey])}} -->
                {{parseInt(rowItem.detailProcess[item.oldKey])}}
                %
              </p>
              <!-- <p class="updateRate_cell">
                {{parseInt(rowItem.detailProcess[typeObj[allItem.type][0].oldKey]) + parseInt(rowItem.detailProcess[typeObj[allItem.type][0].newKey])}}
                %
              </p>
              <p class="updateRate_cell">
                {{parseInt(rowItem.detailProcess[typeObj[allItem.type][1].oldKey]) + parseInt(rowItem.detailProcess[typeObj[allItem.type][1].newKey])}}
                %
              </p>
              <p class="updateRate_cell">
                {{parseInt(rowItem.detailProcess[typeObj[allItem.type][2].oldKey]) + parseInt(rowItem.detailProcess[typeObj[allItem.type][2].newKey])}}
                %
              </p>
              <p class="updateRate_cell">
                {{parseInt(rowItem.detailProcess[typeObj[allItem.type][3].oldKey]) + parseInt(rowItem.detailProcess[typeObj[allItem.type][3].newKey])}}
                %
              </p> -->
            </div>
          </div>

          <div class="updateRate_row_box" :style="{width: columnList[7].width, flex: columnList[7].flex}">
            <div class="updateRate_cell_box update_old_color">
              <p class="updateRate_cell" v-for="(item, index) in typeObj[allItem.type]" :key="index">
                {{rowItem.detailProcess[item.newKey]}}
                <!-- {{rowItem.detailProcess[item.oldKey]}} -->
                %
              </p>
              <!-- <p class="updateRate_cell">
                {{rowItem.detailProcess[typeObj[allItem.type][0].newKey]}}
                %
              </p>
              <p class="updateRate_cell">
                {{rowItem.detailProcess[typeObj[allItem.type][1].newKey]}}
                %
              </p>
              <p class="updateRate_cell">
                {{rowItem.detailProcess[typeObj[allItem.type][2].newKey]}}
                %
              </p>
              <p class="updateRate_cell">
                {{rowItem.detailProcess[typeObj[allItem.type][3].newKey]}}
                %
              </p> -->
            </div>
          </div>

          <div class="updateRate_row_box" :style="{width: columnList[8].width, flex: columnList[8].flex}">
            <div class="updateRate_cell_box">
              <p class="updateRate_cell" :style="{flex: 1}">
                <Button type="primary" size="small" @click="editEvent(rowItem, typeObj[allItem.type])">更新进度</Button>
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>

    <edit-rate v-if="isShowEdit && editData" :editData="editData" :keyObj="keyObj"
      @closeDialog="isShowEdit = false" @editRateBack="getList()"></edit-rate>
  </div>
</template>

<script>
import editRate from './editRate';

export default {
  props: {},

  components: {editRate},

  data () {
    return {
      form: {
        projectId: '',
        tendersId: '',
        type: ''
      },
      isShowEdit: false,
      keyObj: [],
      editData: null,
      projectList: [],
      tenderList: [],
      typeList: [],
      tableData: [],
      columnList: [
        {key: '', title: '项目名称', width: '120px', flex: 1},
        {key: '', title: '标段', width: '120px', flex: 1},
        {key: '', title: '工程种类', width: '120px', flex: 1},
        {key: '', title: '规格', width: '90px', flex: 1},
        {key: '', title: '数量', width: '90px'},
        {key: '', title: '进度项', width: '90px'},
        {key: '', title: '总进度', width: '90px'},
        {key: '', title: '昨天进度', width: '90px'},
        {key: '', title: '操作', width: '120px'}
      ],
      typeObj: {
        WELL: [
          {newKey: 'boreholeNew', oldKey: 'boreholeOld', name: '钻井', processName: 'wellProcess'},
          {newKey: 'tubingNew', oldKey: 'tubingOld', name: '井管'},
          // {newKey: 'filterNew', oldKey: 'filterOld', name: '滤料'},
          {newKey: 'wellbayNew', oldKey: 'wellbayOld', name: '井台'},
          // {newKey: 'flushingNew', oldKey: 'flushingOld', name: '洗井'},
          {newKey: 'pumpNew', oldKey: 'pumpOld', name: '水泵'},
          {newKey: 'ditchNew', oldKey: 'ditchOld', name: '挖沟'},
          {newKey: 'dischargingTubeNew', oldKey: 'dischargingTubeOld', name: '管道敷设'},
          {newKey: 'watergapNew', oldKey: 'watergapOld', name: '隐形出水口'}
          // {newKey: 'endNew', oldKey: 'endOld', name: '收尾'}
        ],
        ROAD: [
          {newKey: 'braceNew', oldKey: 'braceOld', name: '清基', processName: 'roadProcess'},
          {newKey: 'packingNew', oldKey: 'packingOld', name: '垫层'},
          {newKey: 'roadbedNew', oldKey: 'roadbedOld', name: '路面'},
          {newKey: 'endNew', oldKey: 'endOld', name: '收尾'}
        ],
        BRIDGE: [
          {newKey: 'excavationNew', oldKey: 'excavationOld', name: '基坑', processName: 'bridgeProcess'},
          {newKey: 'packingNew', oldKey: 'packingOld', name: '垫层'},
          {newKey: 'pierNew', oldKey: 'pierOld', name: '桥墩'},
          {newKey: 'abutmentNew', oldKey: 'abutmentOld', name: '台帽'},
          {newKey: 'deckNew', oldKey: 'deckOld', name: '桥面'},
          {newKey: 'endNew', oldKey: 'endOld', name: '收尾'}
        ],
        DAM: [
          {newKey: 'excavationNew', oldKey: 'excavationOld', name: '开挖', processName: 'damProcess'},
          {newKey: 'baseNew', oldKey: 'baseOld', name: '浇筑'},
          {newKey: 'dambodyNew', oldKey: 'dambodyOld', name: '坝体'},
          {newKey: 'revetmentNew', oldKey: 'revetmentOld', name: '护坡'},
          {newKey: 'stepLadderNew', oldKey: 'stepLadderOld', name: '步梯'},
          {newKey: 'desiltNew', oldKey: 'desiltOld', name: '清淤'}
          // {newKey: 'endNew', oldKey: 'endOld', name: '收尾'}
        ],
        POOL: [
          {newKey: 'startNew', oldKey: 'startOld', name: '开挖', processName: 'poolProcess'},
          {newKey: 'watergapNew', oldKey: 'watergapOld', name: '进出水口'},
          {newKey: 'stepLadderNew', oldKey: 'stepLadderOld', name: '步梯'},
          {newKey: 'fenceNew', oldKey: 'fenceOld', name: '围栏'},
          {newKey: 'endNew', oldKey: 'endOld', name: '收尾'}
        ],
        GREEN: [
          {newKey: 'ligustrumLucidumNew', oldKey: 'ligustrumLucidumOld', name: '大叶女贞', processName: 'greenProcess'},
          {newKey: 'willowNew', oldKey: 'willowOld', name: '柳树'},
          {newKey: 'endNew', oldKey: 'endOld', name: '收尾'}
        ],
        ELEC: [
          {newKey: 'poleNew', oldKey: 'poleOld', name: '线杆', processName: 'elecProcess'},
          {newKey: 'ditchNew', oldKey: 'ditchOld', name: '挖沟'},
          {newKey: 'layCableNew', oldKey: 'layCableOld', name: '铺设电缆'},
          {newKey: 'transformerNew', oldKey: 'transformerOld', name: '变压器'},
          {newKey: 'endNew', oldKey: 'endOld', name: '收尾'}
        ],
        SMART: [
          {newKey: 'jbNew', oldKey: 'jbOld', name: '井堡', processName: 'smartProcess'},
          {newKey: 'deviceNew', oldKey: 'deviceOld', name: '设备'},
          {newKey: 'endNew', oldKey: 'endOld', name: '收尾'}
        ],
        OTHER: [
          {newKey: 'curr', oldKey: 'old', name: '进度', processName: 'poolProcess'}
        ]
      }
    };
  },

  created () {
    // this.getList();
    this.getProjectList();
    this.getTenderList();
    this.getTypeList();
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

    // 获取类型列表
    getTypeList () {
      let params = {
        // id: this.form.tendersId
      };
      window.$axios.get({url: '/projectType/getAllProjectType', params}).then(res => {
        if (res.data) {
          this.typeList = res.data || [];
        }
      }).catch(error => {
        this.$Message.error(error.message);
      });
    },

    getList () {
      let params = {
        proId: this.form.proId || 1,
        tendersId: this.form.tendersId || '',
        type: this.form.type || '',
        hasDetail: true
      };
      if (!this.form.tendersId) {
        this.$Message.error('请选择要搜索的标段！');
        return false;
      }
      window.$axios.get({url: '/progress/getTenderProgressList', params}).then(res => {
        if (res.data) {
          this.tableData = res.data || [];
        } else {
          this.tableData = res.data || [];
        }
      }).catch(() => {
        this.tableData = [];
      });
    },

    editEvent (val, typeObj) {
      this.editData = val;
      this.keyObj = typeObj;
      this.isShowEdit = true;
    }
  }
};
</script>

<style lang='scss'>
  @import './index.scss';
</style>