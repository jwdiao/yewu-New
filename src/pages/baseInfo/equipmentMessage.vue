<template>
	<div>
		<div>
		    <section class="el-container is-vertical">
		        <el-row :gutter="10" style="margin-bottom:2px;">
		        	<!--gutter属性来指定每一栏之间的间隔-->
		        	<el-col :span="0.5">
		        		<div class="grid-content bg-purple">姓名</div>
		        	</el-col>
		        	<el-col :span="3">
		        		<el-input  placeholder="请输入姓名"  v-model="workName"></el-input>
		        	</el-col>
		        	<el-col :span="0.5">
		        		<div class="grid-content bg-purple">工号</div>
		        	</el-col>
		        	<el-col :span="3">
		        		<el-input  placeholder="请输入工号"></el-input>
		        	</el-col>
		        	<el-col :span="0.5">
		        		<div class="grid-content bg-purple">
		        			加工中心
		        		</div>
		        	</el-col>
		        	<el-col :span="3">
		        		<el-select v-model="CenterValue" placeholder="请选择" >
		        		  <el-option
		        		    v-for="item in CenterNameOption"
		        		    :key="item.value"
		        		    :label="item.label"
		        		    :value="item.value">
		        		  </el-option>
		        		</el-select>
		        	</el-col>
		        	<el-col :span="0.5">
		        		<div class="grid-content bg-purple">
		        			派工日期
		        		</div>
		        	</el-col>
		        	<el-col :span="3">
		        		<el-date-picker
		        		  v-model="planDateValue"
		        		  type="date"
		        		  placeholder="选择日期"><!---->
		        		</el-date-picker>
		        		<!-- <el-input v-model="worktype" placeholder="请输入内容" ></el-input> -->
		        	</el-col>
		        	<el-col :span="2" style="margin-left:20px;">
		        		<div class="grid-content bg-purple">
		        			<el-button type="primary" @click="searchDataFnClick" style="width: 120px;margin: 0 10px;">查询</el-button>
		        		</div>
		        	</el-col>

		        	<!--数据导入与导出-->

		        </el-row>

		        <template>
              <div class="common-table">
                <el-table  header-row-class-name="table-header" border
                           :data="dataList"
                           stripe
                           style="width: 100%" height="600">
                  <!--@row-click="getPersonInfo">-->
                  <el-table-column
                    prop="num"
                    label="序号"
                    width="50">
                  </el-table-column>
                  <el-table-column
                    prop="workName"
                    label="姓名"
                    width="140">
                  </el-table-column>
                  <el-table-column
                    prop="workNo"
                    label="工号"
                    width="160">
                  </el-table-column>
                  <el-table-column
                    prop="planDate"
                    label="派工日期">
                  </el-table-column>
                  <el-table-column
                    prop="startWorkTime"
                    label="派工开始时间">
                  </el-table-column>
                  <el-table-column
                    prop="endWorkTime"
                    label="派工结束时间">
                  </el-table-column>
                  <el-table-column
                    prop="deviceName"
                    label="设备名称">
                  </el-table-column>
                  <el-table-column
                    prop="startPlanTime"
                    label="维护设备">
                    <template slot-scope="scope">
                      <el-button size="small" @click="handleEdit(scope.$index, scope.row)" type="primary" icon="el-icon-edit">维护</el-button>
                    </template>
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
		                  :page-sizes="[10,20, 50, 100]"
		                  :page-size="pageSize"
		                  layout="total, sizes, prev, pager, next, jumper"
		                  background
		                  :total="pageTotal">
		                </el-pagination>
		            </div>
		        </template>
		        </el-row>
				<el-dialog
				   title="收货地址"
				   :visible.sync="dialogTableVisible"
				   @close="closeDialog">
					<el-form :model="diaform" :inline="true">
						<el-form-item label="姓名" >
							<el-input v-model="diaform.workName" autocomplete="off" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="工号" >
							<el-input v-model="diaform.workNo" autocomplete="off" :disabled="true"></el-input>
						</el-form-item>
					</el-form>
					<el-table :data="gridData" style="margin-bottom:30px;">
						<el-table-column property="deviceName" label="设备名称" ></el-table-column>
						<el-table-column property="deviceCode" label="设备编号" ></el-table-column>
						<el-table-column property="address" label="操作">
							<template slot-scope="scope">
								<el-button size="small" @click="handleTopDelete(scope.$index, scope.row)" type="primary" icon="el-icon-edit">删除关联</el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-form :model="diaformSearch" :inline="true">
						<el-form-item label="设备名称">
							<el-input v-model="diaformSearch.name" autocomplete="off" placeholder="请输入">

							</el-input>
						</el-form-item>
						<el-form-item label="" >
							 <el-button size="small" @click="handleSearch" type="primary">查询</el-button>
						</el-form-item>
					</el-form>
					<el-table :data="controlData" style="margin-bottom:30px;">
						<el-table-column property="num" label="序号" width="150"></el-table-column>
						<el-table-column property="deviceName" label="设备名称" width="150"></el-table-column>
						<el-table-column property="sxDeviceCode" label="设备编号" width="200"></el-table-column>
						<el-table-column property="address" label="操作">
							<template slot-scope="scope">
								<el-button size="small" @click="handleSave(scope.$index, scope.row)" type="primary" icon="el-icon-edit">关联</el-button>
							</template>
						</el-table-column>
					</el-table>
					<template>
						<el-pagination
						 @size-change="diahandleSizeChange"
						 @current-change="diahandleCurrentChange"
						 :current-page.sync="diacurrentPage"
						 :page-size="diapageSize"
						 :background="true"
						 layout="  prev, pager, next, total,jumper,sizes"
						 :total="diaalltotal">
						</el-pagination>
					</template>
					<div slot="footer" class="dialog-footer">
						<el-button >取 消</el-button>
						<el-button type="primary" >确 定</el-button>
					</div>
				</el-dialog>
		    </section>
		</div>
	</div>
</template>

<script>
    import headTop from '../../components/headTop'
    import http from '../../api/http'
    import {getCookieInfo} from '../../api/getCookie'
    import moment from 'moment'
    export default {
        name: "equipmentMessage",
        components: {
            headTop
        },
        data() {
            return {
			  workName:'',//姓名
			  workNo:'',//工号
			  planDateValue:'',//派工日期
			  dialogTableVisible:false,
			  locationId:'',
			  diaform:{name:'张三',workNo:'12340'},
			  diaformSearch:{name:''},
			  locationUuid:'',//
			  deviceCode:'',
			  controlData:[],
			  gridData:[],
              dataList:[],
			  currentPage:1,
			  diacurrentPage:1,
			  diapageSize:10,
			  diaalltotal:0,
			  pageSize:10,
			  pageTotal:0,
			  CenterValue:'',//加工中心
			  CenterNameOption:[]
            }
        },
        created(){

        },
        mounted(){
		   this.getCenterName();
		   this.workPlanMachine();
		},
        methods:{
          handleSizeChange(val){
			 this.pageSize = val;
			 this.currentPage = 1;
			 this.workPlanMachine();
		  },
          handleCurrentChange(val){
			  this.currentPage = val
			  this.workPlanMachine();
		  },
		  diahandleSizeChange(val){
			  this.diapageSize = val;
			  this.diacurrentPage = 1;
			  this.sanyMachinefindByName()
		  },
		  diahandleCurrentChange(val){
			  this.diacurrentPage = val;
			  this.sanyMachinefindByName();
		  },
		  /*设备维护*/
		  handleEdit(index , row){
			  this.dialogTableVisible = true;
			  console.log("点击维护后的对象：",row)
			  this.locationUuid = row.uuid;
			  this.locationId = row.id
			  this.workPlanMachineFind(row.id)
		  },
		  /*关闭模态框*/
		  closeDialog(){
			  this.workPlanMachine();
		  },
		  /*查询*/
		  handleSearch(){
			  this.sanyMachinefindByName();
		  },
		  /*
		     保存关联
		  */
		  handleSave(index , row){
			  console.log('关联的row:',row);
			  console.log('上部表格的数据:,',this.gridData);
			  let flag = true;
			  const saveItem = {deviceCode:row.sxDeviceCode,deviceName:row.deviceName};
			  this.gridData.push(saveItem);
			  const result = [];
			  const obj = {};
			  for(var i=0;i<this.gridData.length;i++){
			  	if(!obj[this.gridData[i].deviceCode]){
			  		result.push(this.gridData[i]);
			  		obj[this.gridData[i].deviceCode] = true;
			  	}else{
			  		flag = false;
			  		this.$message({
			  		  type:'warning',
			  		  message:"设备编号重复"
			  		})
			  	}
			  }
			  this.gridData = result;
			  this.deviceCode = row.sxDeviceCode;
			  if(flag){
				this.workPlanMachineSave();
			  }

		  },
		  /*删除*/
		  handleTopDelete(index,row){
			  console.log('点击删除后的row:',row)
			  this.workPlanMachinedel(row.id)
		  },
		  searchDataFnClick(){
		  	this.workPlanMachine();
		  },
		 /*
		   获取加工中心
		 */
		 async getCenterName() {
		   let axiosUrl = getCookieInfo().baseUrl + '/userMessage/getCenternameList';
		   // debugger;
		   const res = await http.get(axiosUrl)
		   if (res.data.ret === "200") {
		     this.CenterNameOption = res.data.centernameList.map(function(item){
		 		return {value:item.threeleveldep,label:item.threeleveldep}
		 	})
		 	this.CenterNameOption.unshift({value:'',label:'请选择'})
		   }

		 },
		 /*派工人员设备信息接口*/
		 async workPlanMachine() {
		 	const query = {
							   workNo:this.workNo,
							   workName:this.workName,
							   machineName:this.CenterValue,
							   planDate:this.planDateValue!=''?moment(this.planDateValue).format('YYYY-MM-DD'):'',
							   pagesize:this.pageSize,
							   page:this.currentPage,
						  }
			let axiosUrl = getCookieInfo().baseUrl + '/workPlanMachine/list';
		 	const res = await http.post(axiosUrl,query);
		 	if(res && res.data.data.list instanceof Array){
				const that = this
				res.data.data.list.forEach(function(ele,index){
					const dataArr = []
				    ele.endWorkTime = moment(ele.endWorkTime).format('YYYY-MM-DD HH:mm:ss');
					ele.startWorkTime = moment(ele.startWorkTime).format('YYYY-MM-DD HH:mm:ss');
					ele.userWorkPlanMachineList.forEach(function(item , num){
						dataArr.push(item.deviceName);
					})
					ele.num = (that.currentPage - 1)*that.pageSize+index+1;
					ele.deviceName = dataArr.join(',')
				})
		 		this.dataList = res.data.data.list;
				this.pageTotal = res.data.data.totalCount;

		 	}
		 },
		 /*点击维护后通过ID查询维护*/
		 async workPlanMachineFind(id){
			 let axiosUrl = getCookieInfo().baseUrl + `/workPlanMachine/find/${id}`;
			 const res = await http.get(axiosUrl);
			 if(res && res.data.ret == 200){
				this.diaform = res.data.data
				this.gridData = res.data.data.userWorkPlanMachineList;
				console.log('查询后上方的列表：',this.gridData)
				console.log('通过ID派工人员信息：',res)
			 }

		 },
		 /*
		   通过设备名称模糊搜素相关设备接口
		 */
		 async sanyMachinefindByName(){
			let axiosUrl = getCookieInfo().baseUrl + `/sanyMachine/findByName`;
		 	const res = await http.post(axiosUrl,{
		 		deviceName:this.diaformSearch.name,
		 		page:this.diacurrentPage,
		 		pageSize:this.diapageSize
		 	});
		 	console.log("asdasd",res.data.data);
		 	const findThat = this
		 	res.data.data.list.forEach(function(ele,index){
		 		   ele.num = (findThat.diacurrentPage-1)*findThat.diapageSize+index+1
		 	})
		 	this.controlData = res.data.data.list;
		 	this.diaalltotal  = res.data.data.totalCount;
		 },
		 /*
		   派工人员关联设备信息接口
		 */
		 async workPlanMachineSave(){
			 let axiosUrl = getCookieInfo().baseUrl + '/workPlanMachine/save';
			 const res =await http.post(axiosUrl,{
				 workNo:this.diaform.workNo,workplanUuid:this.locationUuid,deviceCode:this.deviceCode
			 })
			 if(res && res.data.ret==200){
				 //如果保存成功了在调用查询接口
				 //this.workPlanMachineFind(this.locationId)

			 }
		 } ,
		   /*
		     19	派工人员已关联设备删除接口
		   */
		  async workPlanMachinedel(id){
			  let axiosUrl = getCookieInfo().baseUrl + `/workPlanMachine/delete/${id}`;
			  const res = await http.get(axiosUrl);
			  if(res && res.data.ret == 200){
				  this.workPlanMachineFind(this.locationId)
			  }
		  }

        }
    }
</script>

<style lang="less" scoped>
	.el-row {
		height: 60px;
		line-height: 60px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.header_container {
		background-color: #EFF2F7;
		height: 60px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		padding-left: 20px;
		font-size: 22px;
	}

	.grid-content {
		span:nth-of-type(1) {
			width: 100px;
			display: inline-block;
			text-align: right;
			padding-right: 5px;
		}
	}

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

		&>.container {
			width: 70%;
			height: 600px;
			background-color: #fff;
			border-radius: 3px;
			position: absolute;
			top: 50%;
			margin: -300px 15%;

			.head {
				height: 40px;
				line-height: 60px;
				text-align: center;
				font-size: 20px;
			}

			.content {
				overflow-y: auto;

				&>table thead {
					color: #666;

					tr:nth-child(1) {
						align: center;
						color: #555;

						&>div {
							align: center;
						}
					}
				}
			}
		}
	}

	.dispatch {
		width: calc(100% - 32px);
		height: calc(100% - 30px);
		background: #f8f8f8;
		padding: 15px;
		margin-bottom: 20px;

		.panel {
			background-color: #fff;
			border: 1px solid #337ab7;
			border-radius: 4px;
			-webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
			box-shadow: 0 1px 1px rgba(0, 0, 0, .05);

			&>.panel-header {
				color: #fff;
				background-color: #337ab7;
				border-color: #337ab7;
				padding: 10px 15px;
				border-bottom: 1px solid transparent;
				border-top-left-radius: 3px;
				border-top-right-radius: 3px;

				.panel-title {
					margin-top: 0;
					margin-bottom: 0;
					font-size: 16px;
					color: inherit;
					font-family: inherit;
					font-weight: 500;
					line-height: 1.1;
				}
			}

			&>.panel-body {
				padding: 15px;
			}
		}
	}

	/deep/ #piecePersonInformationFormData {
		position: relative;
	}

	/deep/ .el-upload-list {
		position: absolute;
		top: 10px;
		left: 270px;
	}

	/deep/ #upload-document:hover {
		background: rgba(0, 200, 0, 0.5) !important;
	}
  /deep/ .el-pagination{
		text-align: right;
	}
	.paigong_download {
		background: rgba(0, 200, 0, 0.8);
		color: #fff;
		position: relative;
		color: #fff;
		width: 90px;
		text-align: center;
		height: 39px;
		line-height: 39px;
		border-radius: 3px;
		display: inline-block;
		vertical-align: middle;
		padding: 0 10px;

		&:hover {
			background: rgba(0, 200, 0, 0.6);
		}
	}
</style>
