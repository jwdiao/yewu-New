<template>
  <div>
    <head-top></head-top>
    <section class="el-container is-vertical">
      <el-row style="margin-top: 40px; padding-left: 10px;">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="日期">
            <el-date-picker
              v-model="searchDate"
              type="date"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions0"
              @change="listenDateFn"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="班次">
            <el-select v-model="dayOrNight" placeholder="请选择">
              <el-option
                v-for="item in classes"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">进行查询</el-button>
          </el-form-item>
          <a class="paigong_download" href="javascript:void(0);" @click="download">
            <i class="el-icon-download" ></i>导出文件
          </a>
        </el-form>
      </el-row>
      <el-row>
        <template>
          <el-table
            :data="tableData"
            stripe
            style="width: 100%" height="600">
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="workName"
              label="姓名">
            </el-table-column><!--username workName-->
            <el-table-column
              prop="workNo"
              label="工号">
            </el-table-column><!--num workNo-->
            <el-table-column
              prop="machinename"
              label="归属中心">
            </el-table-column>
            <el-table-column
              prop="planDate"
              label="旷工日期">  <!--planDate-->
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注">
            </el-table-column>
          </el-table>
        </template>
        <template>
          <div class="block" style="padding: 20px; text-align: center;">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[20, 50, 100]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              background
              :total="pageTotal">
            </el-pagination>
          </div>
        </template>
      </el-row>
    </section>

  </div>
</template>

<script>
  import headTop from '../../components/headTop'
  import http from '../../api/http'

  import {getCookieInfo} from '../../api/getCookie'
  export default {
    name: "dispatch-list",
    components: {
      headTop
    },
    data() {
      return {
        visible: false,
        classes: [
          {
            value: '白班',
            label: '白班'
          }, {
            value: '夜班',
            label: '夜班'
          }
        ],
        dayOrNight: '白班', // 班次值
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        searchDate: '', //时间值
        tableData: [],
        currentPage: 1,   // 分页，当前页参数值设置
        tableData3: [],
        personInfoBool: false,
        pageTotal: 0,
        pageSize: 20,
        currentYear: 0,
        currentMon: 0,
        currentDay: 0,
        currentDayClasses: [
          {
            value: '白班',
            label: '白班'
          }
        ],
        currentDayOrNight: '白班',
        currentDate: '',
        centerName:'',///0212多加一个参数
      }
    },
    created(){
      this.setDefaultDate();
      this.getRenderData();
    },
    mounted(){},
    methods:{
      listenDateFn(){
        const year = this.searchDate.split('-')[0],
          mon = this.searchDate.split('-')[1],
          day = this.searchDate.split('-')[2];
        if(parseInt(this.currentYear) > parseInt(year)
          || (parseInt(this.currentYear) === parseInt(year) && parseInt(this.currentMon) > parseInt(mon))
          || (parseInt(this.currentYear) === parseInt(year) && parseInt(this.currentMon) === parseInt(mon) && parseInt(this.currentDay) > parseInt(day))
        ){
          this.classes = [
           {
              value: '白班',
              label: '白班'
            }, {
              value: '夜班',
              label: '夜班'
            }
          ]
          // this.dayOrNight = '全天';
        }else {
          this.classes = this.currentDayClasses;
          this.dayOrNight = this.currentDayOrNight;
        }
      },
      onSubmit() {

        this.currentPage = 1
        this.getRenderData();
      },
      async getRenderData(){
         let axiosUrl = getCookieInfo().baseUrl + '/sanyUserPushRecord/getAbsentList1';
        // console.log('测试旷工统计：',axiosUrl)/
        const result = await http.post(axiosUrl,{workType: this.dayOrNight, stopTime: this.searchDate,centername:this.centerName, page: this.currentPage + '', pagesize: this.pageSize + ''})
        if(result && result.data && result.data.ret == 200){
          const arr = result.data.getAbsentList;
          /*console.log(arr)
          const newArr = [];
          arr.length ? arr.forEach(function (v) {
            v.username = v.workusernum.replace(parseInt(v.workusernum), '');
            v.num = parseInt(v.workusernum);
            v.ptime = v.startworktime.split(' ')[0];
            /!*newArr.length ? newArr.find(function (obj) {  // 数据去重
                return obj.num != v.num && newArr.push(v);
            }) : newArr.push(v);*!/
          }) : null;
          // this.tableData = newArr;*/
          this.tableData = arr;
          this.pageTotal = result.data.total;
        }
      },

      setDefaultDate(){
        const hour = (new Date()).getHours();
        const month =  this.currentMon = new Date().getMonth() - 0 + 1 < 10 ? '0' + (new Date().getMonth() - 0 + 1) : new Date().getMonth() - 0 + 1,
          days = this.currentDay = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate(),
          hours = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours(),
          seconds = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds(),
          minutes = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
        this.searchDate = this.currentDate = new Date().getFullYear() +'-'+ month +'-'+ days;
        this.currentYear = new Date().getFullYear();
        if(hour >= 8 && hour < 20){
          this.classes = this.currentDayClasses = [{
            value: '白班',
            label: '白班'
          }];
          this.dayOrNight = this.currentDayOrNight = '白班';
        }else {
          this.classes = this.currentDayClasses = [
            {
              value: '白班',
              label: '白班'
            }, {
              value: '夜班',
              label: '夜班'
            }
          ];
          this.dayOrNight = this.currentDayOrNight = '夜班';
        }
      },
      /*函数名：download
           参数：
           描述：导出功能
         * */
      async  download () {
        let url = getCookieInfo().baseUrl + '/sanyUserPushRecord/exportAbsentList'
        // let url ='http://10.88.195.89:8083/sanyUserPushRecord/exportAbsentList';
        url = `${url}?workType=${this.dayOrNight}&stopTime=${this.searchDate}`;
        url = encodeURI(encodeURI(url));
        //window.open(url,'_blank');
        location.href=  url;
      },
      searchDataFn () {
        this.currentPage = 1
        this.getRenderData();
      },

      async handleSizeChange(val) {
        this.pageSize = val;
        this.getRenderData();
      },
      async handleCurrentChange(val) {
        this.currentPage = val;
        this.getRenderData();
      }
    }
  }
</script>

<style scoped>
  /deep/ .padding20 {
    padding: 20px 0;
  }
  .paigong_download{
    background: rgba(0,200,0,0.8);color:#fff;position:relative;
    color:#fff;
    height: 40px;line-height: 40px;
    border-radius: 3px;
    display: inline-block;
    vertical-align: middle;
    padding:0 10px;
  /deep/ .el-icon-download{}
  }
</style>
