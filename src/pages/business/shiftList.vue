<template>
    <div>
        <!-- <div class="header_container">调班人员列表</div> -->
        <head-top></head-top>
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
                        <el-button type="primary" @click="searchDataFn">进行查询</el-button>
                    </el-form-item>
                  <a class="paigong_download" href="javascript:void(0);" @click="download">
                    <i class="el-icon-download" ></i>导出文件
                  </a>
                </el-form>
            </el-row>
            <el-row>
            <template>
                <el-table
                  :data="dataList"
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
                    width="200">
                  </el-table-column>
                  <el-table-column
                    prop="workno"
                    label="工号"
                    width="200">
                  </el-table-column>
                  <el-table-column
                    prop="department"
                    label="归属中心">
                  </el-table-column>
                  <el-table-column
                    prop="pushtime"
                    label="首次打卡时间">
                  </el-table-column>
                  <el-table-column
                    prop="snapshotplace"
                    label="打卡地址">
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
        <section class="person-info" v-show="personInfoBool">
            <div class="container">
                <div class="head" style="position: relative;">
                    <button type="button" class="el-message-box__headerbtn close-person-info" @click="closePersonInfo" style="top: -10px; right: -3px;">
                        <i class="el-message-box__close el-icon-close"></i>
                    </button>
                </div>
                <div class="content">
                    <template>
                        <el-table :data="tableData3" style="width: 100%;" :header-row-style="tableHeaderFn">
                            <el-table-column label="打卡详情信息">
                                <el-table-column
                                  prop="jobNum"
                                  label="工号">
                                </el-table-column>
                                <el-table-column
                                  prop="name"
                                  label="姓名">
                                </el-table-column>
                                <el-table-column
                                  prop="punchTime"
                                  label="打卡时间">
                                </el-table-column>
                                <el-table-column
                                  prop="punchType"
                                  label="打卡类型">
                                </el-table-column>
                                <el-table-column
                                  prop="punchAddress"
                                  label="打卡位置">
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
            }
        },
        created(){
            this.setDefaultDate();
            this.getAllPersonList();
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
                    //this.dayOrNight = '全班';
                }else {
                    this.classes = this.currentDayClasses;
                    this.dayOrNight = this.currentDayOrNight;
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
                let axiosUrl = getCookieInfo().baseUrl + '/sanyUserPushRecord/getChangeWorkList';
                console.log('测试调班统计：',axiosUrl)
                const result = await http.post(axiosUrl,{workType: this.dayOrNight, stopTime: this.searchDate, page: this.currentPage + '', pagesize: this.pageSize + ''})
                // const result = await http.post('sanyUserPushRecord/getChangeWorkList',{workType: this.dayOrNight, stopTime: this.searchDate, page: this.currentPage + '', pagesize: this.pageSize + ''})
                if(result.data.ret == 200){
                  this.dataList = result.data.changeWorkList;
                  this.pageTotal = result.data.total;
                }
            },
          /*函数名：download
            参数：
            描述：导出功能
          * */
          async  download () {
            // let axiosUrl = getCookieInfo().baseUrl + '/sanyUserPushRecord/exportLateList'
            let url ='http://10.88.195.89:8083/sanyUserPushRecord/exportLateList';
            url = `${url}?workType=${this.dayOrNight}&stopTime=${this.searchDate}`;
            url = encodeURI(encodeURI(url));
            window.open(url,'_blank');
          },

            async searchDataFn () {
              this.currentPage = 1
                  this.getAllPersonList();
            },
            async postPersonInfoAjax(name, jobNum){   // 获取个人信息详情
                // alert(name+jobNum);
                const result = await http.post('',{});
                if(result && result.status == 200){

                }
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
              height: 40px;
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
</style>
