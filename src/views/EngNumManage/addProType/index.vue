<template>
  <comm-dialog title="新增工程" :styleData="{width: '480px'}" @closeDialog="$emit('closeDialog')">
    <div slot="container" class="addProType">
      <div class="addProType_item">
        <div class="addProType_label">选择工程种类：</div>
        <Select v-model="form.type" style="width:240px">
          <Option v-for="(item, index) in typeList" :value="item.type" :key="index">{{ item.typeName }}</Option>
        </Select>
      </div>
      <!-- 坝 -->
      <div v-if="form.type === 'DAM'">
        <div class="addProType_item">
          <div class="addProType_label">坝名：</div>
          <Input v-model="form.name" placeholder="请输入坝名"  style="width: 240px;"/>
        </div>
        <div class="addProType_item">
          <div class="addProType_label">合同规格：</div>
          <Input v-model="form.standards" placeholder="请输入规格"  style="width: 182px;margin-right: 6px;"/>
          米
        </div>
      </div>
      <!-- 井 -->
      <div v-else-if="form.type === 'WELL'">
        <div class="addProType_item">
          <div class="addProType_label">井名：</div>
          <Input v-model="form.name" placeholder="请输入井名"  style="width: 200px;"/>
        </div>
      </div>
      <!-- 路 -->
      <div v-else-if="form.type === 'ROAD'">
        <div class="addProType_item">
          <div class="addProType_label">路名：</div>
          <Input v-model="form.name" placeholder="请输入路名"  style="width: 200px;"/>
        </div>
        <div class="addProType_item">
          <div class="addProType_label">合同规格：</div>
          <Input v-model="form.standards" placeholder="请输入路宽"  style="width: 92px;margin-right: 6px;"/>
          米
          <span style="padding: 0 6px;color: red;">*</span>
          <Input v-model="form.quantity" placeholder="请输入路长"  style="width: 92px;margin-right: 6px;"/>
          米
        </div>
      </div>
      <!-- 绿化 -->
      <div v-else-if="form.type === 'GREEN'">
        <div class="addProType_item">
          <div class="addProType_label">绿化名：</div>
          <Input v-model="form.name" placeholder="请输入绿化名"  style="width: 200px;"/>
        </div>
      </div>
      <!-- 桥 -->
      <div v-else-if="form.type === 'BRIDGE'">
        <div class="addProType_item">
          <div class="addProType_label">桥名：</div>
          <Input v-model="form.name" placeholder="请输入桥名"  style="width: 200px;"/>
        </div>
        <div class="addProType_item">
          <div class="addProType_label">合同规格：</div>
          <Input v-model="form.standards" placeholder="请输入桥宽"  style="width: 92px;margin-right: 6px;"/>
          米
          <span style="padding: 0 6px;color: red;">*</span>
          <Input v-model="form.quantity" placeholder="请输入桥长"  style="width: 92px;margin-right: 6px;"/>
          米
        </div>
      </div>
      <!-- 塘 -->
      <div v-else-if="form.type === 'POOL'">
        <div class="addProType_item">
          <div class="addProType_label">塘名：</div>
          <Input v-model="form.name" placeholder="请输入塘名"  style="width: 200px;"/>
        </div>
      </div>

      <div v-else>
        <div class="addProType_item">
          <div class="addProType_label">名称：</div>
          <Input v-model="form.name" placeholder="请输入名称"  style="width: 200px;"/>
        </div>
      </div>

      <div>
        <div class="addProType_item">
          <div class="addProType_label">综合单价：</div>
          <Input v-model="form.contractPrice" :maxlength="11" placeholder="请输入单价"  style="width: 182px;margin-right: 6px;"/>
          元
        </div>
      </div>

      <div>
        <div class="addProType_item addProType_item_other">
          <div class="addProType_label">描述：</div>
          <Input v-model="form.desc" type="textarea" placeholder="请输入描述"  style="width: 200px;"/>
        </div>
      </div>

      <div class="addProType_item" style="justify-content: center">
        <Button style="margin: 0 30px;" @click="$emit('closeDialog')">取消</Button>
        <Button type="primary" @click="submitEvent" style="margin: 0 30px;">确定</Button>
      </div>

      <comm-loading v-if="isLoading"></comm-loading>
    </div>
  </comm-dialog>
</template>

<script>
import CommDialog from '@/components/commDialog/index';

export default {
  props: {
    dataObj: {
      default: () => {}
    },
    typeObj: {
      default: () => {}
    },
    isEdit: {
      default: false
    }
  },

  components: {CommDialog},

  data () {
    return {
      isLoading: false,
      typeList: [],
      form: {
        type: '',
        name: '',
        contractPrice: '',
        desc: '',
        quantity: '',
        standards: ''
      }
    };
  },

  created () {
    Object.assign(this.form, this.userInfo);
    this.getTypeList();
    console.log(this.typeObj);
    if (this.isEdit) {
      this.form = {
        type: this.typeObj.type,
        name: this.typeObj.name,
        contractPrice: this.typeObj.contractPrice,
        desc: this.typeObj.desc,
        quantity: this.typeObj.quantity,
        standards: this.typeObj.standards
      };
    }
  },

  methods: {
    // 获取类型列表
    getTypeList () {
      let params = {};
      window.$axios.get({url: '/projectType/getAllProjectType', params}).then(res => {
        if (res.success) {
          this.typeList = [];
          res.data && Object.keys(res.data).forEach(key => {
            this.typeList.push({type: key, typeName: res.data[key]});
          });
        } else {
          this.$Message.error(res.message);
        }
      }).catch(error => {
        this.$Message.error(error.message);
      });
    },

    submitEvent () {
      let params = {
        type: this.form.type,
        name: this.form.name,
        contractPrice: this.form.contractPrice,
        desc: this.form.desc,
        quantity: this.form.quantity,
        standards: this.form.standards,
        tendersId: this.dataObj.id,
        projectId: this.dataObj.proId,
        
        // dimension: this.dataObj.dimension || '',
        // greenIcon: this.dataObj.greenIcon || '',
        // longitude: this.dataObj.longitude || '',
        // roadIcon: this.dataObj.roadIcon || '',
      };
      this.isLoading = true;
      if (this.isEdit) {
        params.id = this.typeObj.id;
        params.tendersId = this.typeObj.tendersId;
        params.projectId = this.typeObj.projectId;
        let formData = new FormData();
        let obj = Object.assign(this.typeObj, params);
        Object.keys(obj).forEach(key => {
          formData.append(key, obj[key]);
        });
        window.$axios.post('/projectType/update', formData).then(res => {
          this.isLoading = false;
          if (res.success) {
            this.$Message.info('更新成功！');
            this.$emit('addProTypeBack');
            this.$emit('closeDialog');
          } else {
            this.$Message.error(res.message);
          }
        }).catch(error => {
          this.isLoading = false;
          this.$Message.error(error.message);
        });
      } else {
        window.$axios.post('/projectType/add', params).then(res => {
          this.isLoading = false;
          if (res.success) {
            this.$Message.info('新增成功！');
            this.$emit('addProTypeBack');
            this.$emit('closeDialog');
          } else {
            this.$Message.error(res.message);
          }
          
        }).catch(error => {
          this.isLoading = false;
          this.$Message.error(error.message);
        });
      }
      
    }
  }
};
</script>

<style lang='scss'>
  @import './index.scss';
</style>