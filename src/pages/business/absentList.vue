<template>
  <div>
    <section class="el-container is-vertical">
      <el-row style="margin-top: 40px; padding-left: 10px;">
        <el-form :inline="true" class="demo-form-inline absentList">
          <el-form-item label="日期">
            <el-date-picker class="settingWidth"
              v-model="searchDate"
              type="date"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions0"
              @change="listenDateFn"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="班次">
            <el-select class="settingWidth" v-model="dayOrNight" placeholder="请选择">
              <el-option
                v-for="item in classes"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input class="settingWidth" v-model="personName" placeholder="请输入姓名" clearable @clear="clearPersonName"></el-input>
          </el-form-item>
          <el-form-item label="工号">
            <el-input class="settingWidth" v-model="personNumber" placeholder="请输入工号" clearable @clear="clearPersonNumber"></el-input>
          </el-form-item>
          <el-form-item label="归属中心">
            <el-select class="settingWidth" v-model="personDepartment" placeholder="请选择" clearable @clear="clearMachingCenter" @change="selectMachingCenter">
              <el-option v-for="item in departmentDataArr" :key="item.value" :label="item.label" :value="item.value">

              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="submitBtn">
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
        personName:'',//员工姓名   0225修改
        personNumber:'',//员工工号   0225修改
        personDepartment:'',//员工归属中心   0225修改
        departmentDataArr:[], //归属中心集合   0225修改
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
        centerName:'',///0212多加一个参数(0225修改)
      }
    },
    created(){
      this.setDefaultDate();
      this.getRenderData();
      //获取加工中心
      this.getCenterName()
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
        const {personName,personNumber,personDepartment} = this
        /*console.log('personName:',personName)
        console.log('personNumber:',personNumber)
        console.log('personDepartment:',personDepartment)*/
        this.currentPage = 1
        this.getRenderData();
      },
      async getRenderData(){
         let axiosUrl = getCookieInfo().baseUrl + '/sanyUserPushRecord/getAbsentList1';
         // let axiosUrl = 'http://10.88.190.36:8083/sanyUserPushRecord/getAbsentList1';
        // console.log('测试旷工统计：',axiosUrl)/
        const result = await http.post(axiosUrl,{
          workType: this.dayOrNight,
          stopTime: this.searchDate,
          centername:this.personDepartment,
          workname:this.personName,
          workno:this.personNumber,
          page: this.currentPage + '', pagesize: this.pageSize + ''})
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
      //选择加工中心
      selectMachingCenter(val){
        let obj = {};
        obj = this.departmentDataArr.find((item)=>{
          return item.value === val;
        });
        this.personDepartment = obj.label
      },
      /*函数名：getCenterName
       参数：无
       描述：异步ajax请求与后台通信，成功时，中心名称选择
      * */
      async getCenterName () {
        let axiosUrl = getCookieInfo().baseUrl + '/userMessage/getCenternameList';
        const res = await http.get(axiosUrl)
        if (res.data.ret === "200") {
          var centerNames = res.data.centernameList
          for (var i = 0; i < centerNames.length; i++) {
            var optionsObj = {}
            optionsObj.value = centerNames[i].threeleveldep
            optionsObj.label = centerNames[i].threeleveldep
            this.departmentDataArr.push(optionsObj)
          }
        }
      },
      //清空加工中心数据
      clearMachingCenter(){
        this.personDepartment = ''
      },
      //清空用户姓名
      clearPersonName(){
        this.personName = ''
      },
      //清空用户工号
      clearPersonNumber(){
        this.personNumber = ''
      },

      /*函数名：download
       参数：
       描述：导出功能
     * */
      async  download () {
        let url = getCookieInfo().baseUrl + '/sanyUserPushRecord/exportAbsentList'
        // let url = 'http://10.88.190.36:8083/sanyUserPushRecord/exportAbsentList'
        // let url ='http://10.88.195.89:8083/sanyUserPushRecord/exportAbsentList';
        url = `${url}?workType=${this.dayOrNight}&stopTime=${this.searchDate}&centername=${this.personDepartment}&workname=${this.personName}&workno=${this.personNumber}`;

        url = (encodeURI(url));
        //window.open(url,'_blank');
        location.href=  url;
        console.log('url:',url)
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

<style lang="scss" scoped>
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
  }
/deep/ .el-form-item__content{
  width: 180px;
}
  /deep/.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 180px;
  }
  .submitBtn{
    /deep/ .el-form-item__content{
      width: 98px;
    }
  }

</style>
