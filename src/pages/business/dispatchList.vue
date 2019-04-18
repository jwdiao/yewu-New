<template>
    <div>
        <section class="el-container is-vertical">
            <el-row style="margin-top: 40px; padding-left: 10px;">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="日期">
                        <el-date-picker
                        v-model="searchDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        @change="listenDateFn"
                        :picker-options="pickerOptions0"
                        placeholder="选择日期"><!---->
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="班次">
                        <el-select v-model="dayOrNight" placeholder="请选择" @change="changeWorkType">
                            <el-option
                              v-for="item in classes"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                  <el-form-item label="姓名">
                    <el-input v-model="personName" placeholder="请输入姓名" clearable @clear="clearPersonName"></el-input>
                  </el-form-item>
                  <el-form-item label="工号">
                    <el-input v-model="personNumber" placeholder="请输入工号" clearable @clear="clearPersonNumber"></el-input>
                  </el-form-item>
                  <el-form-item label="归属中心">
                    <el-select v-model="personDepartment" placeholder="请选择" clearable @clear="clearMachingCenter" @change="selectMachingCenter">
                      <el-option v-for="item in departmentDataArr" :key="item.value" :label="item.label" :value="item.value">

                      </el-option>
                    </el-select>
                  </el-form-item>
                    <el-form-item class="submitBtn">
                        <el-button type="primary" @click="searchDataFn" style="width: 100px">查询</el-button>
                    </el-form-item>
                  <!--<a  ref="download" :href="dataUrl"></a>-->
                  <a class="paigong_download" href="javascript:void(0);" @click="download">
                    <i class="el-icon-download" ></i>导出文件
                  </a>
                </el-form>
            </el-row>
            <el-row>
            <template >
              <div class="common-table">
                <el-table
                  :data="dataList"  header-row-class-name="table-header" border
                  stripe
                  style="width: 100%" height="600">
                  <!--@row-click="getPersonInfo">-->
                  <el-table-column
                    type="index"
                    label="序号"
                    width="50">
                  </el-table-column>
                  <el-table-column
                    prop="workname"
                    label="姓名"
                    width="140">
                  </el-table-column>
                  <el-table-column
                    prop="workno"
                    label="工号"
                    width="160">
                  </el-table-column>
                  <el-table-column
                    prop="department"
                    label="归属中心">
                  </el-table-column>
                  <el-table-column
                    prop="pushtime"
                    label="首次进门时间">
                  </el-table-column>
                  <el-table-column
                    prop="snapshotplace"
                    label="打卡地址">
                  </el-table-column>
                  <el-table-column
                    prop="startPlanTime"
                    label="最早派工时间">
                  </el-table-column>
                </el-table>
              </div>

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
        <section class="person-info" v-show="personInfoBool">
            <div class="container">
                <div class="head" style="position: relative;">
                    个人打卡详情
                    <button type="button" class="el-message-box__headerbtn close-person-info" @click="closePersonInfo" style="top: -10px; right: -3px;">
                        <i class="el-message-box__close el-icon-close"></i>
                    </button>
                </div>
                <div class="content">
                    <template>
                    <el-table :data="tableData3" style="width: 63.5%; display: inline-block;" :header-row-style="tableHeaderFn">
                        <el-table-column>
                            <el-table-column
                              prop="jobNum"
                              label="工号"
                              width="100">
                            </el-table-column>
                            <el-table-column
                              prop="name"
                              label="姓名"
                              width="80">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="打卡详情信息">
                            <el-table-column
                              prop="punchTime"
                              label="打卡时间">
                            </el-table-column>
                            <el-table-column
                              prop="punchType"
                              label="打卡类型"
                              width="80">
                            </el-table-column>
                            <el-table-column
                              prop="punchAddress"
                              label="打卡位置">
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                    <el-table :data="tableData3" style="width: calc(36% - 10px); margin-left: 10px; display: inline-block;" :header-row-style="tableHeaderFn">
                        <el-table-column label="派工详情信息">
                            <el-table-column
                              prop="DispatchingStart"
                              label="派工开始时间">
                            </el-table-column>
                            <el-table-column
                              prop="DispatchingEnd"
                              label="派工结束时间">
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                  </template>
                </div>
            </div>
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
              workType:1,
              personName:'',//员工姓名
              personNumber:'',//员工工号
              personDepartment:'',//员工归属中心
              departmentDataArr:[], //归属中心集合
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
              dataUrl:'',  //导出路径
                dataList: [],
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
            this.getAllPersonList();
            //加工中心
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
          changeWorkType(){
            if(this.dayOrNight === '白班'){
              this.workType = 1
            }else if(this.dayOrNight === '夜班'){
              this.workType = 2
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
            tableHeaderFn({row, column, rowIndex}){
                if(rowIndex === 0) {
                    return 'color: #555; text-align: center;'
                }
            },
            async getAllPersonList(){
                let axiosUrl = getCookieInfo().baseUrl + '/sanyUserPushRecord/getLateList'
                // let axiosUrl = 'http://10.88.190.36:8083/sanyUserPushRecord/getLateList'
              //20190409修改
              //   let axiosUrl ='http://10.19.7.70:8089/userRecordException/list';
              // let axiosUrl = getCookieInfo().baseUrl + '/userRecordException/list'
              //   const result = await http.post(axiosUrl,{workType: this.workType, queryDate: this.searchDate,recordStatus:1,workName:this.personName,workNo:this.personNumber,centerName:this.personDepartment, page: this.currentPage + '', pageSize: this.pageSize + ''})
              const result = await http.post(axiosUrl,{
                workType: this.dayOrNight,
                stopTime: this.searchDate,
                centerName:this.personDepartment,
                workname:this.personName,
                workno:this.personNumber,
                page: this.currentPage + '', pagesize: this.pageSize + ''})

                // const result = await http.post('sanyUserPushRecord/getLateList',{workType: this.dayOrNight, stopTime: this.searchDate, page: this.currentPage + '', pagesize: this.pageSize + ''})
                if(result.data.ret == 200){
                  this.dataList = result.data.lateList;
                  this.pageTotal = result.data.total;
                }
            },

          /*
           * 函数名：loadData
           * 参数：
           * 描述：导出文件
           * */
          /*async loadData(){
            // let axiosUrl = getCookieInfo().baseUrl + '/sanyUserPushRecord/getAbsentList1';
            const result = await http.post('http://10.88.195.89:8083/sanyUserPushRecord/exportLateList',{workType: this.dayOrNight, stopTime: this.searchDate, page: this.currentPage + '', pagesize: this.pageSize + ''})
            if(result && result.data && result.data.ret == 200){
              this.dataUrl = result.data.data
            }
            console.log('dataUrl:',this.dataUrl)
             setTimeout(()=>{this.$refs.download.click()},1000)
          },*/
         async  download () {
           let url = getCookieInfo().baseUrl + '/sanyUserPushRecord/exportLateList'
           // let url = 'http://10.88.190.36:8083/sanyUserPushRecord/exportLateList'
           url = `${url}?workType=${this.dayOrNight}&stopTime=${this.searchDate}&centerName=${this.personDepartment}&workname=${this.personName}&workno=${this.personNumber}`;
           //20190409修改
           // let url ='http://10.19.7.70:8089/userRecordException/exportExceptionData';
           // let url = getCookieInfo().baseUrl + '/userRecordException/exportExceptionData'
           // url = `${url}?workType=${this.workType}&queryDate=${this.searchDate}&recordStatus=1&workName=${this.personName}&workNo=${this.personNumber}&centerName=${this.personDepartment}`;
           url = (encodeURI(url));
           // window.open(url,'_blank');
           location.href = url
          },
            searchDataFn () {
              const {personName,personNumber,personDepartment} = this
             /* console.log('personName:',personName)
              console.log('personNumber:',personNumber)
              console.log('personDepartment:',personDepartment)*/
              this.currentPage = 1;
              this.getAllPersonList();
            },
            async postPersonInfoAjax(name, jobNum){
                // alert(name+jobNum);
                const result = await http.post('',{});
                if(result && result.status == 200){

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

            getPersonInfo: function(event){
                this.personInfoBool = true;
                const name = event.name,
                      jobNum = event.jobNum;
                this.postPersonInfoAjax(name, jobNum);
            },
            closePersonInfo(){
                this.personInfoBool = false;
            },
            async handleSizeChange(val) {
                this.pageSize = val;
                this.getAllPersonList();
            },
            async handleCurrentChange(val) {
                this.currentPage = val;
                this.getAllPersonList();
            }
        }
    }
</script>

<style lang="less" scoped>
  .table-list tr {
      cursor: pointer;
  }
  .person-info {
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      margin: 0;
      background-color: rgba(0, 0, 0, .3);
      &>.container{
          width: 70%;
          height: 600px;
          background-color: #fff;
          border-radius: 3px;
          position: absolute;
          top: 50%;
          margin: -300px 15%;
          padding: 20px;
          .head {
              height: auto;
              line-height: 60px;
              text-align: center;
              font-size: 20px;
          }
          .content {
              overflow-y: auto;
              /deep/ table tr:nth-child(1)>th{
                  text-align: center;
                  color: #555;
              }
          }
      }
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
