<template>
    <div style="overflow-y: hidden;height:100%;">
        <!-- <div class="header_container">计件人员信息</div> -->
        <head-top></head-top>
        <div class="source">
            <section class="el-container is-vertical">
                <header class="el-header" style="height: 125px;">
                    <el-row :gutter="10" style="margin-bottom:2px;">
						                   <!--gutter属性来指定每一栏之间的间隔-->
                        <el-col :span="2">
                            <div class="grid-content bg-purple">
                                姓名                                
                            </div>
                        </el-col>
												<el-col :span="3">
													  <el-input v-model="name" placeholder="请输入内容" ></el-input>
												</el-col>
												<el-col :span="2">
														<div class="grid-content bg-purple">
															  工号                               
														</div>
												</el-col>
												<el-col :span="3">
														<el-input v-model="workno" placeholder="请输入内容" ></el-input>
												</el-col>		 
											 <el-col :span="2">
														<div class="grid-content bg-purple">
														      
														</div>
												</el-col>
												<el-col :span="3">
													<div class="grid-content bg-purple">
														<el-button type="primary" @click="searchDataFnClick">查询</el-button>
													</div>
												</el-col>
                        											
                        
                    </el-row>
										<el-row :gutter="10">
											<!--gutter属性来指定每一栏之间的间隔-->
											<el-col :span="2">
													<div class="grid-content bg-purple">
															二级部门                                
													</div>
											</el-col>
											<el-col :span="3">
													<el-input v-model="twoleveldep" placeholder="请输入内容" ></el-input>
											</el-col>
											<el-col :span="2">
													<div class="grid-content bg-purple">
															三级部门                               
													</div>
											</el-col>
											<el-col :span="3">
													<el-input v-model="threeleveldep" placeholder="请输入内容" ></el-input>
											</el-col>
											<el-col :span="2">
													<div class="grid-content bg-purple">
															是否计件                               
													</div>
											</el-col>
											<el-col :span="3">
												  <template>
												  	<el-select v-model="worktype" placeholder="请选择" @change="workTypeChange()">
												  		<el-option v-for="item in workTypeOptions" :key="item.value" :label="item.label" :value="item.value">
												  		</el-option>
												  	</el-select>
												  </template>
													<!-- <el-input v-model="worktype" placeholder="请输入内容" ></el-input> -->
											</el-col>		
										</el-row>
                </header>
                <main class="el-main" style="padding-top: 0px;">
                    <template>
                        <el-table
                          :data="dataList"
                          stripe
                          style="width: 100%;"
													height="625"
                          >
                          <el-table-column
                                prop="serial"
                                label="序号"
                                width="50">
                            </el-table-column>
                          <el-table-column
                            prop="name"
                            label="姓名"
														width="100"
                            >
                          </el-table-column>
                          <el-table-column
                            prop="workno"
                            label="工号"
														width="100"
                            >
                          </el-table-column>
                          <el-table-column
                            prop="sex"
                            label="性别"
														width="100">
                          </el-table-column>
                          <el-table-column
                            prop="firstleveldep"
                            label="一级部门">
                          </el-table-column>
                          <el-table-column
                            prop="twoleveldep"
                            label="二级部门">
                          </el-table-column>
                          <el-table-column
                            prop="threeleveldep"
                            label="三级部门">
                          </el-table-column>
													<el-table-column
														prop="positionname"
														label="职位">
													</el-table-column>										
													<el-table-column
														prop="worktype"
														label="是否计件工">
													</el-table-column>
                        </el-table>
                    </template>
                </main>
                <el-footer  style="text-align: center;">
                    <template>                       
                            <el-pagination 
															@size-change="handleSizeChange"												 
                              @current-change="handleCurrentChange"
                              :current-page.sync="currentPage"                            
                              :page-size="pagesize"
															:background="true"
                               layout="  prev, pager, next, total,jumper,sizes"
                              :total="alltotal">
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
      import {getCookieInfo} from '../../api/getCookie'
    export default {
        name: "dispatch-list",
        components: {HeadTop},
        data() {
            return {
							  name:'',//姓名
								twoleveldep:'',//二级部门
								threeleveldep:'',//三级部门
								workno:'',//工号
								worktype:'',//工种
								workTypeOptions:[{value:'',label:'请选择工种'},{value:'2',label:'管理人员'},{value:'1',label:'计件工人'}],
                visible: false,
								alltotal:0,
								pagesize:20,											
                searchDate: '', //时间值
                dataList: [],
                currentPage:1,   // 分页，当前页参数值设置
            }
        },
        created(){           
        },
        mounted(){
            
						this.searchDataFn ();
        },
        methods:{
					 searchDataFnClick (){
						 this.searchDataFn ("1",this.pagesize)
					 },
            async searchDataFn (num,pnum='20') {							
							 if(num==="1"){
								 this.currentPage = 1; 
							 }					
							 const option = {
							 page:num,
							 pagesize:pnum,
							 name:this.name,
							 workno:this.workno,
							 twoleveldep:this.twoleveldep,
							 threeleveldep:this.threeleveldep,
							 worktype:this.worktype,
                             }
                let axiosUrl = getCookieInfo().baseUrl + '/userMessage/getAttendanceAllData'
                const res = await http.post(axiosUrl,option);
               if (res && res.data.ret=== "200") {
								   const dataList = res.data.list	
									 console.log(res.data.list)
									     dataList.forEach((ele,index)=>{
												  ele.worktype=ele.worktype=="1"?"计件工人":"管理人员"
													ele.serial = (this.currentPage-1)*this.pagesize+(index+1);
											 })
									 this.dataList = dataList
									 this.alltotal = res.data.total
                } 
            },
            async handleCurrentChange(val) {
							this.currentPage = val;
							this.searchDataFn (val,this.pagesize)
            },
						async handleSizeChange(val){
							this.pagesize = val
							this.searchDataFn ('1',val.toString())
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
	.grid-content{
		span:nth-of-type(1){
			width:100px;
			display: inline-block;text-align: right;padding-right:5px;
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
      &>.container{
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
              &>table thead{
                  color: #666;
                  tr:nth-child(1){
                      align: center;
                      color: #555;
                      &>div{
                          align: center;
                      }
                  }
              }
          }
      }
  }
  .dispatch{
      width: calc(100% - 32px);
      height: calc(100% - 30px);
      background: #f8f8f8;
      padding: 15px;
      margin-bottom: 20px;
      .panel {
          background-color: #fff;
          border: 1px solid #337ab7;
          border-radius: 4px;
          -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.05);
          box-shadow: 0 1px 1px rgba(0,0,0,.05);
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
</style>
