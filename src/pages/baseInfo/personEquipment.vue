<template>
	<div style="overflow-y: hidden;height:100%;">
		<!-- <div class="header_container">计件人员信息</div> -->
		<div class="source">
			<section class="el-container is-vertical">
				<header  style="height: 60px;">
					<el-row :gutter="10" style="margin-bottom:2px;">
						<!--gutter属性来指定每一栏之间的间隔-->
						<el-col :span="0.5">
							<div class="grid-content bg-purple">姓名</div>
						</el-col>
						<el-col :span="3">
							<el-input v-model="name" placeholder="请输入姓名"></el-input>
						</el-col>
						<el-col :span="0.5">
							<div class="grid-content bg-purple">工号</div>
						</el-col>
						<el-col :span="3">
							<el-input v-model="workno" placeholder="请输入工号"></el-input>
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
						<el-col :span="2">
							<div class="grid-content bg-purple">
								<el-button type="primary" @click="searchDataFnClick" style="width: 120px;margin: 0 10px;">查询</el-button>
							</div>
						</el-col>
						<!--数据导入与导出-->
					</el-row>

				</header>
				<main  style="padding-top: 0px;">
					<template>
						<div class="common-table">
              <el-table  header-row-class-name="table-header" border :data="dataList" stripe style="width: 100%;" height="625">
                <el-table-column prop="num" label="序号" >
                </el-table-column>
                <el-table-column prop="name" label="姓名" >
                </el-table-column>
                <el-table-column prop="workNo" label="工号" >
                </el-table-column>
                <el-table-column prop="centerName" label="加工中心" >
                </el-table-column>
                <el-table-column prop="deviceName" label="设备名称">
                </el-table-column>
                <el-table-column prop="deviceCode" label="设备编号">
                </el-table-column>
                <el-table-column prop="threeleveldep" label="维护">
                  <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)" type="primary" icon="el-icon-edit">维护</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
					</template>
				</main>
				<el-footer style="text-align: center;">
					<template>
						<el-pagination
						 @size-change="handleSizeChange"
						 @current-change="handleCurrentChange"
						 :current-page.sync="currentPage"
						 :page-size="pageSize"
						 :background="true"
						 layout="  prev, pager, next, total,jumper,sizes"
						 :total="alltotal">
						</el-pagination>
					</template>
				</el-footer>
				<el-dialog
				   title="收货地址"
				   :visible.sync="dialogTableVisible"
				   @close="closeDialog">
					<el-form :model="diaform" :inline="true">
						<el-form-item label="姓名" >
							<el-input v-model="diaform.name" autocomplete="off" :disabled="true"></el-input>
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
						<el-form-item label="设备编号" >
							<el-input v-model="diaformSearch.name" autocomplete="off"></el-input>
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
	import http from '../../api/http'
	import HeadTop from '../../components/headTop';
	import {
		getCookieInfo
	} from '../../api/getCookie'
	export default {
		name: "personEquipment",
		components: {
			HeadTop
		},
		data() {
			return {
				name: '', //姓名
				workno: '', //工号
				dialogTableVisible:false,//模态开关
				CenterValue:'',
				allDeviceCode:[],
				allNewDeviceCode:[],
				locationId:'',
				gridData:[],
				controlData:[],
				diaform:{},
				diaformSearch:{name:''},
				CenterNameOption: [],
				visible: false,
				alltotal: 0,
				diaalltotal:0,
				pageSize: 10,
				diapageSize:10,
				searchDate: '', //时间值
				dataList: [],
				currentPage: 1, // 分页，当前页参数值设置
				diacurrentPage:1,//
				isShow: false, //数据导入是否显示,
				// isShowFileList:true,//是否显示上传列表
			}
		},
		created() {

		},
		mounted() {
            this.machineList();
			this.getCenterName();
		},
		methods: {
			handleSizeChange(val){
				this.pageSize =val;
				this.currentPage = 1;
				this.machineList();
			},
			diahandleSizeChange(val){
				this.diapageSize = val;
				this.diacurrentPage = 1;
				this.sanyMachinefindByName();
			},
			handleCurrentChange(val){
				this.currentPage = val;
				this.machineList();
			},
			closeDialog(){

				this.machineList()
			},
			diahandleCurrentChange(val){
				this.diacurrentPage = val;
				this.sanyMachinefindByName();
			},
			handleTopDelete(index , row){
				const newdelArr = [];
				const olddelArr = [];
				this.gridData.forEach(function(ele,index){
					  olddelArr.push(ele.deviceCode);//之前的值不用动
				      newdelArr.push(ele.deviceCode);
				})
				newdelArr.splice(index,1)
				this.userMessageMachineDel(row.id,olddelArr.join(','),newdelArr.join(','))

			},
			handleSearch(){
				this.sanyMachinefindByName();
			},
			/*
			  维护弹出模态框
			*/
			handleEdit(index , row){
			   this.dialogTableVisible = true;
			   this.locationId = row.id;
			   this.userMessageMachine()
			},
			/*
			  保存关联
			*/
			handleSave(index , row){
				const saveOld = [];
				const saveNew = [];
				let flag = true;
				const forGridData = this.gridData;
			    forGridData.forEach(function(ele,index){
				   saveOld.push(ele.deviceCode);
				   saveNew.push(ele.deviceCode);
				})
				saveNew.push(row.sxDeviceCode);

			    const item = {deviceCode:row.sxDeviceCode,deviceName:row.deviceName,id:this.locationId};
				this.gridData.push(item)
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
				//如果重复则不保存不重复才保存
				if(flag){
				  this.userMessageMachineSave(this.locationId,saveOld.join(','),saveNew.join(','));
				}
				this.gridData = result

			},
			/*
			  查询
			*/
			searchDataFnClick(){
				this.machineList();
			},
			/*
			  获取加工中心
			*/
			async getCenterName() {
			  let axiosUrl = getCookieInfo().baseUrl + '/userMessage/getCenternameList';
			  console.log('派工信息导入：',axiosUrl)
			  // debugger;
			  const res = await http.get(axiosUrl)
			  if (res.data.ret === "200") {
				  console.log(res.data.centernameList)
			    this.CenterNameOption = res.data.centernameList.map(function(item){
					return {value:item.threeleveldep,label:item.threeleveldep}
				})
				this.CenterNameOption.unshift({value:'',label:'请选择'})
			  }

			},
			/*
			 获取列表数据
			*/
			async machineList() {
				const query = {workno:this.workno,name:this.name,threeleveldep:this.CenterValue,pagesize:this.pageSize,page:this.currentPage}
				let axiosUrl = getCookieInfo().baseUrl + '/userMessageMachine/list';
				const res = await http.post(axiosUrl,query);
				if(res && res.data.data.list instanceof Array){
					const that = this
				    res.data.data.list.forEach(function(item , index){
				           	    //每一个对象循环
						    const deviceNameArr = [];
							for(let k in item.machineList){
								deviceNameArr.push(item.machineList[k].deviceName);
							}
							item['deviceName'] = deviceNameArr.join(',');
							item['num'] = (that.currentPage - 1)*that.pageSize+index+1;
					})
					this.dataList = res.data.data.list;
					console.log('sss：',res.data.data);
					this.alltotal = res.data.data.totalCount
				}
			},
			/*
			  通过id获取计件人员设备信息接口
			*/
			async userMessageMachine(){
				let axiosUrl = getCookieInfo().baseUrl + `/userMessageMachine/find/${this.locationId}`;
				const res = await http.get(axiosUrl);
				if(res && res.data.data){
					const machineArr = [];
					/* const mythat = this */
					/* this.allDeviceCode = [];
					this.allNewDeviceCode = []; */
					const id = res.data.data.id;
					res.data.data['machineList'].forEach(function(ele , index){
						machineArr.push({deviceCode:ele.sxDeviceCode,deviceName:ele.deviceName,id:id});
						/* mythat.allDeviceCode.push(ele.sxDeviceCode);
						mythat.allNewDeviceCode.push(ele.sxDeviceCode); */
					})
					 console.log('删除前的数据：',this.allNewDeviceCode);
					this.diaform = res.data.data;//加载姓名和工号
					this.gridData = machineArr;

					/* this.allNewDeviceCode = res.data.data; */
					console.log('删除刘表',this.gridData)
				}
			},
			/*
			 计件人员设备关联删除
			*/
			async userMessageMachineDel(id,oldDeviceCode,newDeviceCode){
				const deletThat =this;
				let axiosUrl = getCookieInfo().baseUrl + `userMessageMachine/delete/${id}`;
				const res = await http.post(axiosUrl,{
					oldDeviceCode:oldDeviceCode,newDeviceCode:newDeviceCode
				} );
				if(res){
					setTimeout(function(){
					   deletThat.userMessageMachine();
					   //deletThat.machineList();
					},500)

				}
			},
			/*
			   计件人员关联设备接口
			*/
			async userMessageMachineSave(id,oldDeviceCode,newDeviceCode){
			    let axiosUrl = getCookieInfo().baseUrl + `userMessageMachine/save/${id}`;
				const res = await http.post(axiosUrl,{
					oldDeviceCode:oldDeviceCode,newDeviceCode:newDeviceCode
				})
				console.log('关联保存',res.data);
			},
			/*
			  通过设备名称模糊搜素相关设备接口
			*/
			async sanyMachinefindByName(){
				let axiosUrl = getCookieInfo().baseUrl + `sanyMachine/findByName`;
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
