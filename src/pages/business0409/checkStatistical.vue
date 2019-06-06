<template>
    <div>
        <!-- <div class="header_container">调班人员列表</div> -->
        <section class="el-container is-vertical">
            <el-row style="margin-top: 40px; padding-left: 10px;">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="开始时间">
                        <el-date-picker
                        v-model="startTime"
                        type="date"
						@change="handleChangeStart"
                        value-format="yyyy-MM-dd 00:00:00"
						:picker-options="pickerOptionsStart"
                        placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
					<el-form-item label="结束时间">
					    <el-date-picker
					    v-model="endTime"
					    type="date"
						@change="handleChangeEnd"
						:picker-options="pickerOptionsend"
					    value-format="yyyy-MM-dd 23:59:59"
					    placeholder="选择日期">
					    </el-date-picker>
					</el-form-item>
                  <el-form-item label="加工中心">
                    <el-select v-model="personDepartment" placeholder="请选择" >
                      <el-option v-for="item in departmentDataArr" :key="item.value" :label="item.label" :value="item.value">

                      </el-option>
                    </el-select>
                  </el-form-item>
				  <el-form-item>
					  <el-radio v-model="workType" label="白班" border>白班</el-radio>
					  <el-radio v-model="workType" label="夜班" border>夜班</el-radio>
				  </el-form-item>
                  <el-form-item class="submitBtn">
                        <el-button type="primary" @click="searchDataFn">查询</el-button>
                  </el-form-item>
				  <el-form-item class="submitBtn">
				        <el-button type="primary" icon="el-icon-download" @click="handleExport">导出</el-button>
				  </el-form-item>
                </el-form>
            </el-row>
            <el-row>
            <template>
               <div class="common-table" style="width:100%" >
                 <el-table
                   :data="dataList" header-row-class-name="table-header" border
                   style="width: 100%" 
				   max-height="600"
				   >
                   <!--@row-click="getPersonInfo">-->
				   <el-table-column
				     fixed
				     prop="createTime"
					 width="170"
				     label="日期">
				   </el-table-column>
                   <el-table-column
				     width="80"
                     prop="centerName"
                     label="工作中心">
                   </el-table-column>
                   <el-table-column
				     width="80"
                     prop="lateNum"
                     label="迟到">
                   </el-table-column>
                   <el-table-column
				     width="80"
                     prop="outNum"
                     label="离岗">
                   </el-table-column>
                   <el-table-column
                     prop="absentNum"
                     label="未到">
                   </el-table-column>
                   <el-table-column
                     prop="abnormalNum"
                     label="未派工">
                   </el-table-column>
                   <el-table-column
                     prop="planNum"
                     label="白班派工人数">
                   </el-table-column>
                   <el-table-column
                     prop="nightPlanTotalNum"
                     label="夜班派工人数">
                   </el-table-column>
                   <el-table-column
                     prop="newWorkPlanRate"
                     label="派工率">
                   </el-table-column>
                   <el-table-column
                     prop="userRecordNum"
                     label="考勤人数">
                   </el-table-column>
                   </el-table-column>
                   <el-table-column
                     prop="recordTime"
                     label="考勤时间">
                   </el-table-column>
                   <el-table-column
                     prop="recordRate"
                     label="出勤率">
                   </el-table-column>
                   <el-table-column
                     prop="onWorkTime"
                     label="有效在岗时间">
                   </el-table-column>
				   <el-table-column
				     prop="validNum"
				     label="有效在岗人数">
				   </el-table-column>
                   <el-table-column
                     prop="onWorkRate"
                     label="在岗率">
                   </el-table-column>
                   <el-table-column
                     prop="validRate"
                     label="有效上岗率">
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
              personName:'',//员工姓名
              personNumber:'',//员工工号
              personDepartment:'全部',//员工归属中心
              departmentDataArr:[], //归属中心集合
			  startNowTime:Date.now(),
			  endNowTime:Date.now(),
              workType:'白班',//白班：1 夜班：2
                startTime:'',
				endTime:'',
				pickerOptionsend:{
				    disabledDate:time => {
					   return time.getTime()>this.endNowTime || time.getTime()<this.startNowTime
				    }	
				},
				pickerOptionsStart:{
					disabledDate:time=>{
					   return time.getTime() > this.startNowTime
					}
				},
                dataList: [],
                currentPage: 1,   // 分页，当前页参数值设置
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
                centerName:'',//0212多加一个参数
            }
        },
        created(){
          
        },
        mounted(){
			  
			  
			  //this.getworkList();
			  this.getCenterName();
		},
        methods:{
			handleChangeEnd(val){
				this.startNowTime = new Date(val).getTime()
			},
			handleChangeStart(val){
				this.startNowTime = new Date(val).getTime()
			},
			/*查询*/
			searchDataFn(){
				this.getworkList();
			},
			/*导出*/
			handleExport(){
				let axiosUrl = getCookieInfo().baseUrl + '/sanyAttendanceNewData/exportRecordList'
				let url = `${axiosUrl}?centername=${this.personDepartment}&workType=${this.workType}&startTime=${this.startTime===null?'':this.startTime}&endTime=${this.endTime===null?'':this.endTime}`;
				url = (encodeURI(url));
				location.href = url; 
			},
            async getworkList () {
				let axiosUrl = getCookieInfo().baseUrl + '/sanyAttendanceNewData/getRecordStatistics'
			    const res = await http.post(axiosUrl,{
						  centername:this.personDepartment,
						  workType:this.workType,
						  startTime:this.startTime===null?'':this.startTime,
						  endTime:this.endTime===null?'':this.endTime,
						  page:this.currentPage,
						  pagesize:this.pageSize
				})
				console.log('asas',res.data.getStatisticsList);
				if(res && res.data.getStatisticsList){
					this.dataList = res.data.getStatisticsList
					this.pageTotal = res.data.total
				}
				
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
			  console.log(centerNames)
			  this.departmentDataArr = centerNames.map((item)=>{
				  return {value:item.threeleveldep,label:item.threeleveldep}
			  })
			  this.departmentDataArr.unshift({value:'全部',label:'全部'})
            }
          },
            async handleSizeChange(val) {
                this.pageSize = val;
                this.getworkList();
            },
            async handleCurrentChange(val) {
                this.currentPage = val;
                this.getworkList();
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
  /deep/ .el-form-item__content{
    width: 190px;
  }
  /deep/.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 190px;
  }
  .submitBtn{
    /deep/ .el-form-item__content{
      width: 98px;
    }
  }
</style>

