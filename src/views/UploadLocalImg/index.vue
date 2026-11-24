<template>
  <div class="uploadLocalImg">

    <div class="uploadLocalImg_serach">

      <div class="uploadLocalImg_serach_item">
        项目区：
        <Select v-model="form.projectId" style="width:200px" @on-change="proChangeEvent">
          <Option v-for="(item, index) in projectList" :value="parseInt(item.id)" :key="index">{{ item.projectName }}</Option>
        </Select>
      </div>

      <div class="uploadLocalImg_serach_item">
        标段：
        <Select v-model="form.tendersId" style="width:200px" @on-change="getTypeList">
          <!-- <Option :value="item.value" :key="item.value">{{ item.label }}</Option> -->
          <Option v-for="(item, index) in tenderList" :value="item.id" :key="index">{{ item.tenderName }}</Option>
        </Select>
      </div>

      <div class="uploadLocalImg_serach_item">
        类型：
        <Select v-model="form.type" style="width: 100px">
          <Option v-for="(item, index) in typeList" :value="item.type" :key="index">{{ item.typeName }}</Option>
        </Select>
      </div>
      <div class="uploadLocalImg_serach_item">
        <Button type="primary" @click="getList()">搜索</Button>
      </div>
    </div>
      
    <div class="uploadLocalImg_table">

      <div class="uploadLocalImg_thead_row">
        <p v-for="(item, index) in columnList" :key="index"
          class="uploadLocalImg_thead_th uploadLocalImg_cell" :style="{width: item.width + 'px', flex: item.flex}">{{item.title}}</p>
      </div>

      <div v-if="tableList.length < 1" style="border: 1px solid #ccc;text-align: center; line-height: 1.2rem;border-top: 0;">
        暂无数据
      </div>

      <div class="uploadLocalImg_body_row" v-for="(rowItem, rowIndex) in tableList" :key="rowIndex">

          <div style="width: 120px; flex: 1;display: flex;flex-direction: column">
            <div class="uploadLocalImg_cell">
              <!-- 项目名称 -->
              <p class="uploadTitle">{{rowItem['projectName']}}</p>
              <!-- <Upload action="#" multiple :before-upload="uploadBefore">
                <Button type="primary" size="small" @click="uploadImg({proId: rowItem.id})">上传</Button>
              </Upload> -->
              <Button type="primary" size="small" @click="uploadDialog(1, rowItem)">上传</Button>
            </div>
          </div>

          <div style="width: 120px; flex: 1;display: flex;flex-direction: column">
            <div class="uploadLocalImg_cell" v-for="(typeItem, typeIndex) in rowItem['tendersVoList']" :key="typeIndex"
             :style="{minHeight: (typeItem.projectTypePositionList.length || 1) * 69 + 'px'}">
              <!-- 标段名称 -->
              <p class="uploadTitle">{{typeItem['tenderName']}}</p>
              <!-- <Upload action="#" multiple :before-upload="uploadBefore">
                <Button type="primary" size="small" @click="uploadImg({proId: rowItem.id, tendersId: typeItem.tendersId})">上传</Button>
              </Upload> -->
              <Button type="primary" size="small" @click="uploadDialog(2, {proId: rowItem.id, projectName: rowItem.projectName, tendersId: typeItem.tendersId, tenderName: typeItem.tenderName})">上传</Button>
            </div>
          </div>

          <div style="width: 120px;display: flex;flex-direction: column">
            <!-- 工种类型 -->
            <div v-for="(typeItem, typeIndex) in rowItem['tendersVoList']" :key="typeIndex"
              style="width: 100%;flex: 1;display: flex;flex-direction: column" :style="{flex: typeItem.projectTypePositionList.length || 1}">
              <p v-for="(dataItem, dataIndex) in typeItem.projectTypePositionList" :key="dataIndex"
                class="uploadLocalImg_cell" style="min-height: 69px;">
                {{dataItem.name || "--"}}
              </p>
            </div>
          </div>

          <div style="width: 120px;display: flex;flex-direction: column">
            <!-- 规格 -->
            <div  v-for="(typeItem, typeIndex) in rowItem['tendersVoList']" :key="typeIndex"
              style="width: 100%;flex: 1;display: flex;flex-direction: column" :style="{flex: typeItem.projectTypePositionList.length || 1}">
              <p v-for="(dataItem, dataIndex) in typeItem.projectTypePositionList" :key="dataIndex"
                class="uploadLocalImg_cell" style="min-height: 69px;">
                {{dataItem.standards || "--"}}
              </p>
            </div>
          </div>

          <div style="width: 120px; flex: 1;display: flex;flex-direction: column">
            <div  v-for="(typeItem, typeIndex) in rowItem['tendersVoList']" :key="typeIndex"
              style="width: 100%;flex: 1;display: flex;flex-direction: column;" :style="{flex: typeItem.projectTypePositionList.length || 1}">
              <p v-for="(dataItem, dataIndex) in typeItem.projectTypePositionList" :key="dataIndex"
                class="uploadLocalImg_cell" style="min-height: 69px;flex-direction: row;">
                <Button v-if="dataItem.roadIconList && dataItem.roadIconList.length > 0" style="margin-bottom: 6px;margin-right: 10px;"
                  type="primary" size="small" @click="lookImag(dataItem.roadIconList, typeItem.tendersId)">查看</Button>
                <Upload action="#" multiple :before-upload="uploadBefore" style="display: inline-block;">
                  <Button type="primary" size="small" 
                    @click="uploadImg({proId: rowItem.id, tendersId: typeItem.tendersId, proTypeId: dataItem.id, typeName: dataItem.type})">{{(dataItem.roadIconList && dataItem.roadIconList.length > 0) ? '重新上传' : '上传'}}</Button>
                </Upload>
                
              </p>
            </div>
          </div>

      </div>
    </div>

    <Spin fix v-if="isLoading">
      <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>

    <upload-dialog v-if="isShowDialog" :dataItem="uploadForm"
      @closeDialog="isShowDialog = false"></upload-dialog>

    <comm-dialog title="图片信息" v-if="isShowImgList" @closeDialog="isShowImgList = false">
      <div slot="container">
        <a :href="$imgUrl + item+ '&tendersId=' + (form.tendersId || lookTendersId)" v-for="(item, index) in imageList" :key="index" target="_blank">
           <img :src="$imgUrl + item + '&tendersId=' + (form.tendersId || lookTendersId)" alt="" style="width: 100px; margin: 10px;">
        </a>
       
      </div>
    </comm-dialog>
  </div>
</template>

<script>
import UploadDialog from './uploadDialog';

export default {
  props: {},

  components: {UploadDialog},

  data () {
    return {
      isOK: true,
      isShowDialog: false,
      isShowImgList: false,
      imageList: [],
      uploadForm: {},
      targetObj: null,
      uploadType: '',
      imgList: [],
      form: {
        projectId: '',
        tendersId: '',
        type: ''
      },
      lookTendersId: '',
      projectList: [],
      tenderList: [],
      typeList: [],
      columnList: [
        {key: 'projectName', title: '项目名称', width: 120, flex: 1},
        {key: 'tenderName', title: '标段', width: 120, flex: 1},
        {key: 'proType', title: '工程种类', width: 120},
        {key: 'caregry', title: '规格', width: 120},
        {key: '', title: '上传定位视频', width: 120, flex: 1}
      ],
      tableList: []
    };
  },

  created () {
    this.getList();
    this.getProjectList();
    this.getTenderList();
  },

  methods: {
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

    proChangeEvent () {
      this.getTenderList();
      this.form.tendersId = '';
      this.form.type = '';
    },

    // 获取所有的标段
    getTenderList () {
      let params = {
        proId: this.form.projectId
      };
      window.$axios.get({url:'/tender/getTendersList', params}).then(res => {
        if (res.data) {
          this.tenderList = res.data || [];
        }
      }).catch(error => {
        this.$Message.error(error.message);
      });
    },

    // 获取类型列表
    getTypeList () {
      if (!this.form.tendersId) {
        return false;
      }
      let params = {
        id: this.form.tendersId
      };
      this.form.type = '';
      window.$axios.get({url: '/projectType/getProTypeByTendersId', params}).then(res => {
        if (res.data) {
          this.typeList = res.data || [];
        }
      }).catch(error => {
        this.$Message.error(error.message);
      });
    },

    getList () {
      let params = {
        proId: this.form.projectId,
        tendersId: this.form.tendersId,
        type: this.form.type
      };
      this.isLoading = true;
      window.$axios.get({url: '/projectType/getPositionIconList', params}).then(res => {
        this.isLoading = false;
        if (res.success) {
          this.tableList = res.data || [];
        } else {
          this.$Message.error(res.message);
        }
        
      }).catch(error => {
        this.isLoading = false;
        this.$Message.error(error.message);
      });
    },

    // 上传图片
    uploadImg (obj) {
      this.targetObj = obj;
    },

    uploadBefore (file) {
      this.isOK = false;
      this.imgList.push(file);
      this.$nextTick(() => {
        
        if (!this.isOK) {
          this.isOK = true;
          this.submitEvent();
        }
      });
      return false;
    },

    submitEvent () {
      if (!this.isOK) return false;
      let params = new FormData();
      // let fileFormatData = new FormData();
      this.imgList.map((item, index) => {
        // fileFormatData.append('file', item);
        params.append('file' + index, item);
      });
      Object.keys(this.targetObj).map(key => {
        params.append(key, this.targetObj[key]);
      });
      // params.append('file', fileFormatData);
      this.isLoading = true;
      window.$axios.post('projectType/uploadPositionIcon', params).then(res => {
        this.isLoading = false;
        if (res.errorCode === '0') {
          this.$Message.info('上传成功！');
        } else {
          this.$Message.info('上传失败！');
        }
      }).catch(error => {
        this.isLoading = false;
        this.$Message.info(error.message);
      });
    },

    uploadDialog (type, obj) {
      if (type === 1) {
        this.uploadForm = {
          projectName: obj.projectName,
          proId: obj.id
        };
      } else {
        this.uploadForm = obj;
      }
      this.isShowDialog = true;
    },

    lookImag (item, tenderId) {
      this.imageList = item || [];
      this.lookTendersId = tenderId;
      this.isShowImgList = true;
    }
  }
};
</script>

<style lang='scss'>
  @import './index.scss';
</style>