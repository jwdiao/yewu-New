<template>
	<div>
		<!-- <div class="header_container">计件人员信息</div> -->
		<div class="source">
			<section class="el-container is-vertical">
				<header class="el-header" style="height: 60px;">
					<el-row :gutter="10" style="margin-bottom:2px;">
						<!--gutter属性来指定每一栏之间的间隔-->
						<el-col :span="0.5">
							<div class="grid-content bg-purple">
								姓名
							</div>
						</el-col>
						<el-col :span="3">
							<el-input v-model="name" placeholder="请输入内容"></el-input>
						</el-col>
						<el-col :span="0.5">
							<div class="grid-content bg-purple">
								工号
							</div>
						</el-col>
						<el-col :span="3">
							<el-input v-model="workno" placeholder="请输入内容"></el-input>
						</el-col>
						<!--gutter属性来指定每一栏之间的间隔-->
						<el-col :span="0.5">
							<div class="grid-content bg-purple">
								二级部门
							</div>
						</el-col>
						<el-col :span="3">
							<el-input v-model="twoleveldep" placeholder="请输入内容"></el-input>
						</el-col>
						<el-col :span="0.5">
							<div class="grid-content bg-purple">
								三级部门
							</div>
						</el-col>
						<el-col :span="3">
							<el-input v-model="threeleveldep" placeholder="请输入内容"></el-input>
						</el-col>
						<el-col :span="2">
							<div class="grid-content bg-purple">

							</div>
						</el-col>
						<!-- <el-col :span="0.5">
						  <div class="grid-content bg-purple">
						    是否计件
						  </div>
						</el-col>
						<el-col :span="3">
						  <template>
						    <el-select v-model="worktype" placeholder="请选择" >
						      <el-option v-for="item in workTypeOptions" :key="item.value" :label="item.label" :value="item.value">
						      </el-option>
						    </el-select>
						  </template>

						</el-col> -->
						<el-col :span="3">
							<div class="grid-content bg-purple">
								<el-button type="primary" @click="searchDataFnClick" style="width: 100px;">查询</el-button>
							</div>
						</el-col>


					</el-row>

				</header>
				<main class="el-main" style="padding-top: 0px;">
					<template>
						<div class="common-table">
              <el-table :data="dataList"  header-row-class-name="table-header" border stripe style="width: 100%;" height="618">
                <el-table-column prop="serial" label="序号" width="50">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="100">
                </el-table-column>
                <el-table-column prop="workno" label="工号" width="100">
                </el-table-column>
                <el-table-column prop="sex" label="性别" width="100">
                </el-table-column>
                <el-table-column prop="firstleveldep" label="一级部门">
                </el-table-column>
                <el-table-column prop="twoleveldep" label="二级部门">
                </el-table-column>
                <el-table-column prop="threeleveldep" label="三级部门">
                </el-table-column>
                <el-table-column prop="positionname" label="职位">
                </el-table-column>
                <el-table-column prop="worktype" label="是否计件">
                </el-table-column>
                <el-table-column align="center" label="操作" width="200" fixed="right">
                  <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)" type="primary"  icon="el-icon-edit">编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
					</template>
					<el-dialog title="修改信息" :visible.sync="dialogFormVisible">
						<el-form :model="form">
							<el-form-item label="姓名" :label-width="formLabelWidth">
								<el-input v-model="form.name" autocomplete="off" :disabled="true"></el-input>
							</el-form-item>
							<el-form-item label="工号" :label-width="formLabelWidth">
								<el-input v-model="form.workno" autocomplete="off" readonly :disabled="true"></el-input>
							</el-form-item>
							<el-form-item label="ID" :label-width="formLabelWidth" v-show="false">
								<el-input v-model="form.id" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="三级部门" :label-width="formLabelWidth">
								<el-select v-model="form.threeleveldep" @change="threeleveldepChange" placeholder="请选择三级部门">
									<el-option v-for="item in centernameList" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="是否计件" :label-width="formLabelWidth">
								<el-select v-model="worktype" placeholder="请选择" @change="isWorkChange">
								  <el-option v-for="item in workTypeOptions" :key="item.value" :label="item.label" :value="item.value" >
								  </el-option>
								</el-select>
							</el-form-item>
						</el-form>
						<div slot="footer" class="dialog-footer">
							<el-button @click="dialogFormVisible = false">取 消</el-button>
							<el-button type="primary" @click="confirmRevision">确 定</el-button>
						</div>
					</el-dialog>
				</main>
				<el-footer style="text-align: center;">
					<template>
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
						 :page-size="pageSize" :background="true" layout="  prev, pager, next, total,jumper,sizes" :total="alltotal">
						</el-pagination>
					</template>
				</el-footer>
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
		name: "dispatch-list",
		components: {
			HeadTop
		},
		data() {
			return {
				name: '', //姓名
				twoleveldep: '', //二级部门
				threeleveldep: '', //三级部门
				workno: '', //工号
				worktype:'',//工种
				workTypeOptions:[{value:'2',label:'管理人员'},{value:'1',label:'计件工人'}],
				visible: false,
				alltotal: 0,
				pageSize: 10,
				searchDate: '', //时间值
				dataList: [],
				currentPage: 1, // 分页，当前页参数值设置
				dialogFormVisible: false,
				centernameList: '',
				form: {
					name: '',
					workno:'',
					id:'',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: '',
					threeleveldep: ''
				},
				formLabelWidth: '120px',
			}
		},
		created() {
			//console.log(window.location.href);
		},
		mounted() {
			this.searchDataFn();
		},
		methods: {
			handleEdit(index, row) {//编辑按钮点击事件
				this.dialogFormVisible = true;
				this.getCenterNameList();
				this.form.id = row.id;
				this.form.name = row.name;
				this.form.workno = row.workno;
				this.form.threeleveldep = row.threeleveldep;
				this.worktype = row.worktype
			},
			confirmRevision(){//确定修改
			    this.updateAllData();
				this.dialogFormVisible = false;
				const that = this;
		        setTimeout(function(){
					that.searchDataFn(that.currentPage,that.pageSize);
				})
			},
			searchDataFnClick() {
				this.searchDataFn("1", '10')
			},
			isWorkChange(val) {
				this.worktype = val

			},
			threeleveldepChange() {

			},
			async searchDataFn(num, pnum = '10') {//列表
				if (num === "1") {
					this.currentPage = 1;
				}
				const option = {
					page: num,
					pagesize: pnum,
					name: this.name,
					workno: this.workno,
					twoleveldep: this.twoleveldep,
					threeleveldep: this.threeleveldep,
					worktype:''
				}
				let axiosUrl =  getCookieInfo().baseUrl + '/userMessage/getAttendanceAllData'
				const res = await http.post(axiosUrl, option);
				if (res && res.data.ret === "200") {
					const dataList = res.data.list
					dataList.forEach((ele, index) => {
						ele.worktype = ele.worktype == "1" ? "计件工人" : "管理人员"
						ele.serial = (this.currentPage-1)*this.pageSize+(index+1);

					})
					this.dataList = dataList
					console.log(this.dataList);
					this.alltotal = res.data.total
				}
			},
			async getCenterNameList() {//三级部门
				let axiosUrl = getCookieInfo().baseUrl + '/userMessage/getCenternameList'
				const res = await http.get(axiosUrl);
				if (res && res.data.ret === "200") {
					if (res.data.centernameList) {
						this.centernameList = res.data.centernameList.map(item => {
							return {
								value: item.threeleveldep,
								label: item.threeleveldep
							}
						})
					}
				}
			},
			async updateAllData(){
				const option = {
					id: this.form.id,
					name: this.form.name,
					workno: this.form.workno,
					threeleveldep: this.form.threeleveldep,
					worktype:this.worktype
				}
				const axiosUrl = getCookieInfo().baseUrl + '/userMessage/updateAttendanceAllData';
				const res = await http.post(axiosUrl, option);
			},
			async handleCurrentChange(val) {
				this.currentPage = val
				this.searchDataFn(val,this.pageSize);
			},
			async handleSizeChange(val) {
				this.pageSize = val;
				this.searchDataFn('1', val.toString());
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
	.el-main{
		/deep/ .el-dialog{
			width:25%;
			/deep/ .el-input{
				width:200px;
			}
			/deep/ .el-input:nth-of-type(3){
				width:100%;
			}
		}
	}
</style>
