<template>
  <div class=""  style="height:100%;overflow-y: hidden;">
    <section class="data_section"  style="height:100%;">
      <ul class="selectedList">
        <li class="selectedItem">
          <p class="itemTitle">按月导出</p>
          <div class="block">
            <el-date-picker
              v-model="value4"
              type="month"
              placeholder="选择月">
            </el-date-picker>
            <el-button type="primary" disabled>导出月报</el-button>
          </div>
        </li>
        <li class="selectedItem">
          <p class="itemTitle">按周导出</p>
          <div class="block">
            <el-select v-model="year" placeholder="请选择">
              <el-option
                v-for="item in yearOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span>年</span>
            <el-select v-model="month" placeholder="请选择">
              <el-option
                v-for="item in monthOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span>月 &nbsp;&nbsp;第</span>
            <el-select v-model="week" placeholder="请选择">
              <el-option
                v-for="item in weekOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span>周</span>
            <a class="uploada" :href="`http://10.19.8.22:9085/employerWeekAttendanceTbController/exportMain?month=${month}&week=${week}&type=2`">导出周报</a>
            <a class="uploada" :href="`http://10.19.8.22:9085/employerWeekAttendanceTbController/exportEnclosure?month=${month}&week=${week}&type=2`">导出附件</a>
          </div>
        </li>
        <li class="selectedItem">
          <p class="itemTitle">按日导出</p>
          <div class="block">
            <el-date-picker
              v-model="value1"
              type="date"
              format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="changeDate"
              placeholder="选择日期">
            </el-date-picker>
            <a class="uploada" :href="`http://10.19.8.22:9085/employerWeekAttendanceTbController/exportMain?day=${value1}&type=1`">导出日报</a>
            <a class="uploada" :href="`http://10.19.8.22:9085/employerWeekAttendanceTbController/exportEnclosure?day=${value1}&type=1`">导出附件</a>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  import axios from 'axios'
  /*
  * 下载日报主报
http://10.19.8.22:9085/employerWeekAttendanceTbController/exportMain?day=2019-05-23&type=1
下载日报附件
http://10.19.8.22:9085/employerWeekAttendanceTbController/exportEnclosure?day=2019-05-23&type=1
下载周报主报
http://10.19.8.22:9085/employerWeekAttendanceTbController/exportMain?month=5&week=3&type=2
下载周报附件
http://10.19.8.22:9085/employerWeekAttendanceTbController/exportEnclosure?month=5&week=3&type=2
  * */
  export default {
    components: {
    },
    data() {
      return {
        uploadWeekUrl:'',//导出周报
        uploadWeekFujianUrl:'',//导出周报附件
        value4: '',  //月
        value3:'',  //周
        value1:'',  //日
        yearOptions:[
          {value:'2019',label:'2019'},
          {value:'2020',label:'2020'},
        ],
        year:"",
        monthOptions:[
          {value:'1',label:'1'},
          {value:'2',label:'2'},
          {value:'3',label:'3'},
          {value:'4',label:'4'},
          {value:'5',label:'5'},
          {value:'6',label:'6'},
          {value:'7',label:'7'},
          {value:'8',label:'8'},
          {value:'9',label:'9'},
          {value:'10',label:'10'},
          {value:'11',label:'11'},
          {value:'12',label:'12'},
        ],
        month:"",
        weekOptions:[
          {value:'1',label:'1'},
          {value:'2',label:'2'},
          {value:'3',label:'3'},
          {value:'4',label:'4'},
        ],
        week:"",
      }
    },
    created() {

    },
    mounted() {
      window.addEventListener('resize', this.handleResize)
    },
    methods: {
      changeDate(){
        console.log('value:',this.value1)
      }
    }
  }

</script>
<style lang="less" scoped>
  @import '../../assets/css/mixin';
.selectedList{
  display: flex;
  margin-top: 100px;
  .selectedItem{
    flex: 1;
    height: 500px;
    background: rgba(204,204,204,0.3);
    margin: 2px;
    .itemTitle{
      width: 100%;
      height: 50px;line-height: 50px;
      background: #909399;
      text-align: center;
      color: #fff;font-size: 30px;
    }
    .block{
      width: 100%;
      height: 50px;margin-top: 100px;
      text-align: center;
      /deep/ .el-select{
        width: 90px!important;
      }
      .uploada{
        display: inline-block;
        width: 85px;
        height: 35px;
        line-height: 35px;border-radius: 5px;
        background: #409EFF;
        color: #fff;
      }
    }
  }
  .selectedItem:nth-child(2){
    flex: 1.2;
  }
}

</style>
