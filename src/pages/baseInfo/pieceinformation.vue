<template>
    <div style="overflow-y: hidden;height:100%;">
        <!-- <div class="header_container">计件人员信息</div> -->
        <div class="source">
            <section class="el-container is-vertical">
                <header  style="height: 115px;">
                    <el-row :gutter="10" style="margin-bottom:2px;">
						                   <!--gutter属性来指定每一栏之间的间隔-->
                        <el-col :span="0.5">
                            <div class="grid-content bg-purple">姓名</div>
                        </el-col>
												<el-col :span="3">
													  <el-input v-model="name" placeholder="请输入姓名" ></el-input>
												</el-col>
												<el-col :span="0.5">
														<div class="grid-content bg-purple">工号</div>
												</el-col>
												<el-col :span="3">
														<el-input v-model="workno" placeholder="请输入工号" ></el-input>
												</el-col>
                      <el-col :span="0.5">
                        <div class="grid-content bg-purple">
                          二级部门
                        </div>
                      </el-col>
                      <el-col :span="3">
                        <el-input v-model="twoleveldep" placeholder="请输入二级部门" ></el-input>
                      </el-col>
                      <el-col :span="0.5">
                        <div class="grid-content bg-purple">
                          三级部门
                        </div>
                      </el-col>
                      <el-col :span="3">
                        <el-input v-model="threeleveldep" placeholder="请输入三级部门" ></el-input>
                      </el-col>
                      <el-col :span="0.5">
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
                        <!-- <el-input v-model="worktype" placeholder="请输入内容" ></el-input> -->
                      </el-col>
												<el-col :span="2">
													<div class="grid-content bg-purple">
														<el-button type="primary" @click="searchDataFnClick" style="width: 120px;margin: 0 10px;">查询</el-button>
													</div>
												</el-col>

                      <!--数据导入与导出-->



                    </el-row>
										<el-row :gutter="10" style=" margin-right: -38px;">
											<!--gutter属性来指定每一栏之间的间隔-->

                      <el-col :span="2" >
                        <div class="grid-content bg-purple" style="">
                          <a class="paigong_download" href="javascript:void(0);" @click="downloadFile">
                            <i class="el-icon-download" ></i>下载模板
                          </a>
                        </div>
                      </el-col>

                      <el-col :span="2">
                        <div class="grid-content bg-purple" style="margin-left: 0px">
                          <a class="paigong_download" href="javascript:void(0);" @click="dataAllDownload">
                            <i class="el-icon-download" ></i>数据导出
                          </a>
                        </div>
                      </el-col>
                      <el-col :span="2">
												<!--:show-file-list="isShowFileList"-->
                        <el-upload id="piecePersonInformationFormData" style="display:inline-block;background:none;margin-left: 2px;margin-top: 2px" :limit="1"
                                   class="upload-demo" ref="upload" accept=".xls,.xlsx"  action="/userPushRecord/find/all"
                                   :on-change="beforeUpload" :on-exceed="handleExceed"
                                   :on-remove="removeDoc"
                                   :http-request="uploadSectionFile" :auto-upload="false">
                          <el-button id="upload-document" slot="trigger" icon="el-icon-upload2" type="success" plain style="background: rgba(0,200,0,0.8);color:#fff;margin-left: -8px;">新增导入</el-button>
                          <el-button style="width:120px; position: absolute;top: 10px;left: 130px;" type="primary" @click="submitUpload" v-show="isShow">确定</el-button>
                        </el-upload>
                      </el-col>
                      <el-col :span="1" style="margin-top: 2px">
                        <div class="grid-content bg-purple">
                          <el-button type="primary" @click="addAllDataClick" style="width: 120px;margin: 0 -2spx;">新增</el-button>
                        </div>
                      </el-col>
                      <el-col :span="1" style="margin-top: 2px">
                        <div class="grid-content bg-purple">
                          <el-button type="danger" disabled @click="deleteAllDataClick" style="color: #fff;width: 120px;margin: 0 72px;">删除全部数据</el-button><!--background: #ff404a;-->
                        </div>
                      </el-col>


										</el-row>
                </header>
                <main  style="padding-top: 10px;">
                    <template>
                        <div class="common-table">
                          <el-table  header-row-class-name="table-header" border
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
                              label="工作中心">
                            </el-table-column>
                            <el-table-column
                              prop="positionname"
                              label="职位">
                            </el-table-column>
                            <el-table-column
                              prop="worktype"
                              label="是否计件工">
                            </el-table-column>
                            <el-table-column label="操作" width="100">
                              <template slot-scope="scope">
                                <el-button
																  disabled
																	type="danger"
                                  @click.native.prevent="deletepieceinformation(scope.$index, scope.row)"
                                  style="color: #fff;" size="small" >删除</el-button>
                              </template>
                            </el-table-column>
                          </el-table>
                        </div>
                    </template>
                </main>
              <!--新增-->
              <el-dialog
                title="计件人员信息"
                :close-on-click-modal="false"
                :visible.sync="dialogVisibles"
                @close="handleDialogClose"
                width="1000px">
                <div class="addPieceInformationDialog">
                  <el-form
                    :inline="true"
                    size="medium"
                    :model="formDataAdd" :rules="addRules" ref="addPieceInformation"
                    label-width="100px"
                    class="marginTop20 common-form-inline addVisitorDialog_form">
                    <el-form-item label="姓名" prop="username">
                      <el-input v-model="formDataAdd.username" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="工号" prop="workno">
                      <el-input v-model="formDataAdd.workno" placeholder="请输入工号"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" >
                      <el-radio v-model="formDataAdd.sexRadio" label="1" class="maleStyle" style="margin-left: 30px">男</el-radio>
                      <el-radio v-model="formDataAdd.sexRadio" label="2" class="femaleStyle">女</el-radio>
                    </el-form-item>
                    <el-form-item label="所属组织" prop="groupname">
                      <el-input v-model="formDataAdd.groupname" placeholder="请输入所属组织"></el-input>
                    </el-form-item>
                    <el-form-item label="所属公司" prop="company">
                      <el-input v-model="formDataAdd.company" placeholder="请输入所属公司"></el-input>
                    </el-form-item>
                    <el-form-item label="职位" prop="positionname">
                      <el-input v-model="formDataAdd.positionname" placeholder="请输入职位"></el-input>
                    </el-form-item>
                    <el-form-item label="一级部门" prop="oneDepartment">
                      <el-input v-model="formDataAdd.oneDepartment" placeholder="请输入一级部门"></el-input>
                    </el-form-item>
                    <el-form-item label="二级部门" prop="twoDepartment">
                      <el-input v-model="formDataAdd.twoDepartment" placeholder="请输入二级部门"></el-input>
                    </el-form-item>
                    <el-form-item label="工作中心" prop="threeDepartment">
                      <el-input v-model="formDataAdd.threeDepartment" placeholder="请输入所属工作中心"></el-input>
                    </el-form-item>

                    <el-form-item label="是否计件" prop="worktype">
                      <el-select v-model="formDataAdd.worktype" @change="selectPersonType" placeholder="请选择是否计件" style="width: 93%;">
                        <el-option label="管理人员" value="管理人员"></el-option>
                        <el-option label="计件人员" value="计件人员"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                  <!-- 表单 end -->
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="handleDialogCancle">取 消</el-button>
                  <el-button type="primary" @click="handleDialogConfirm">确 定</el-button>
                </span>
              </el-dialog>

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
                isShow:false,//数据导入是否显示,
                 isShowFileList:true,//是否显示上传列表
              //新增
              dialogVisibles:false,
              formDataAdd:{
                username:'',
                workno:'',
                sexRadio:'1',
                groupname:'',
                company:'',
                oneDepartment:'',
                twoDepartment:'',
                threeDepartment:'',
                positionname:'',
                worktype:'',
              },
              worktypeNum:'',//1：管理人员 2：计件人员
              sex:'',
              addRules:{
                username: [
                  { required: true, message: '请输入姓名', trigger: 'blur' },
                ],
                workno: [
                  { required: true, message: '请输入工号', trigger: 'blur' },
                ],
                threeDepartment: [
                  { required: true, message: '请输入所属工作中心', trigger: 'blur' },
                ],
               /* twoDepartment: [
                  { required: true, message: '请输入二级部门', trigger: 'blur' },
                ],
                threeDepartment: [
                  { required: true, message: '请输入三级部门', trigger: 'blur' },
                ],*/
                positionname: [
                  { required: true, message: '请输入职位', trigger: 'blur' },
                ],
                worktype: [
                  { required: true, message: '请选择是否计件工', trigger: 'blur' },
                ],
              },
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
                // let axiosUrl = 'http://10.88.190.36:8083/userMessage/getAttendanceAllData'
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
						},

          //下载模板
          async downloadFile () {

              //const res = await http.get('http://10.88.190.36:8083/userMessage/export')
            // const res = await http.get(url)
            let url = getCookieInfo().baseUrl + '/userMessage/export'
             // let url ='http://10.88.190.36:8083/userMessage/export';
            // url = `${url}?workType=${this.dayOrNight}&stopTime=${this.searchDate}`;
             url = encodeURI(encodeURI(url));
            // window.open(url,'_blank');
             location.href = url
          },
          //数据导出--------
          async dataAllDownload () {
            // const res = await http.post('http://10.88.190.36:8083/userMessage/userMessageExport')

            let url = getCookieInfo().baseUrl + '/userMessage/userMessageExport'
            // let url ='http://10.88.190.36:8083/userMessage/userMessageExport';
             url = `${url}?name=${this.name}&workno=${this.workno}&twoleveldep=${this.twoleveldep}&threeleveldep=${this.threeleveldep}&worktype=${this.worktype}`;
             url = (encodeURI(url));
             location.href = url
            console.log('url:',url)
          },
          /*函数名：submitUpload
           参数：无
           描述：点击按钮上传派工信息表,异步发送请求
           * */
          submitUpload() {
            this.isShow = true
            let list = document.getElementsByClassName('el-upload-list__item is-ready')
            if(list.length == 0){
              this.$message({
                type:'warning',
                message:"请选择需要导入的模板！"
              })
              return;
            }
            this.$refs.upload.submit();
          },
          uploadSectionFile(param){
            var fileObj = param.file;
            var form = new FormData(this.$refs.upload);
            form.append("file", fileObj);
            this.getEventInfoList(form)
          },
          /*函数名：getEventInfoList
            参数：formData:包含上传的派工日期，派工文件，加工中心
            描述：异步ajax请求与后台通信，成功时，将数据导入数据库中并且请求返回数据显示列表
          * */
          async getEventInfoList (formData) {
            let axiosUrl = getCookieInfo().baseUrl + '/userMessage/upload';
            // console.log('计件人员信息导入：',axiosUrl)
            const res = await http.post(axiosUrl,formData)
            // const res = await http.post("http://10.88.190.36:8083/userMessage/upload",formData)
            if (res.data.ret === "200") {
              this.$message({
                dangerouslyUseHTMLString:true,  /*将HTML格式编译展现*/
                message:res.data.msg,/*a换为msg*/
                type:'success'
              })
              this.searchDataFn ();
              //上传成功后清除按钮下的文件
              this.$refs.upload.clearFiles();
              this.isShow = false
            }else{
              console.log('res:',res.data.msg)
              this.$message({
                dangerouslyUseHTMLString:true,  /*将HTML格式编译展现*/
                message:res.data.msg,/*a换为msg*/
                /*type:'error'*/
              })
            }
          },
          /*函数名：beforeUpload
            参数：
            描述：文件状态改变时的钩子，添加文件时都会被调用
          * */
          beforeUpload(file, fileList){
            this.isShow = true
          },
          /*函数名：removeDoc
          参数：
          描述：文件列表移除文件时的钩子
        * */
          removeDoc(file, fileList){
            this.isShow = false
          },
          /*函数名：handleExceed
          参数：
          描述：文件超出个数限制时的钩子
        * */
          handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
          },
          //删除全部数据按钮逻辑
          deleteAllDataClick(){
            this.$confirm('此操作将永久删除全部数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
             this.deleteAllDataFun()
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            setTimeout(()=>{
              // 删除后刷新列表
              this.searchDataFn ("1",this.pagesize)
            },300)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          },
          //删除全部数据
          async deleteAllDataFun(){
            let axiosUrl = getCookieInfo().baseUrl + '/userMessage/delete';
            // const res = await http.get("http://10.88.190.36:8083/userMessage/delete")
            const res = await http.get(axiosUrl)
          },
          //删除单条数据
          /*函数名：deletePaigongRow
          参数：index, rows：
          描述：删除对应的每一行
        * */
          deletepieceinformation(index, rows) {
            var id = rows.id
            console.log('id:',rows)
            this.$confirm('此操作将永久删除《'+rows.name+'》的记录, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                //向后台发送请求
               this.deleteSingleUser(id)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          },
          /*函数名：deleteSingleUser，
            参数：centername,date,workusernum
            描述：删除
           * */
          async deleteSingleUser(id){
            let axiosUrl = getCookieInfo().baseUrl + '/userMessage/deleteFindId';
            const res = await http.post(axiosUrl,{id})
            // const res = await http.post('http://10.88.190.36:8083/userMessage/deleteFindId',{id})
            //刷新页面
            this.searchDataFn ("1",this.pagesize)
            if(res&&res.data.res.data.code=== 200){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              //刷新页面
              this.searchDataFn ("1",this.pagesize)
            }else{
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
            }
          },
          //新增-------------------------------------------------------start--------------
          handleDialogClose(){
            this.dialogVisibles = false
          },
          handleDialogCancle(){
            this.dialogVisibles = false
          },
          //点击新增按钮
          addAllDataClick(){
           //新增清空
            this.formDataAdd.username = ''
            this.formDataAdd.workno = ''
            this.formDataAdd.sexRadio = '1'
            this.formDataAdd.oneDepartment = ''
            this.formDataAdd.twoDepartment = ''
            this.formDataAdd.threeDepartment = ''
            this.formDataAdd.positionname = ''
            this.formDataAdd.worktype = ''
            this.formDataAdd.groupname = ''
            this.formDataAdd.company = ''
            this.dialogVisibles = true

          },
          //新增弹窗-点击确定按钮
          handleDialogConfirm(){
            this.$refs.addPieceInformation.validate(async (valid) => {
              if (!valid) return;
              //与后台交互逻辑   添加成功后刷新列表
              const {username,workno,groupname,company,oneDepartment,twoDepartment,threeDepartment,positionname} = this.formDataAdd
              if(this.formDataAdd.worktype==='管理人员'){this.worktypeNum='2'}
              else if(this.formDataAdd.worktype==="计件人员"){this.worktypeNum='1'}
              if(this.formDataAdd.sexRadio==='1'){this.sex='男'}
              else if(this.formDataAdd.sexRadio==="2"){this.sex='女'}
              this.addDataItem(username,workno,this.sex,groupname,company,oneDepartment,twoDepartment,threeDepartment,positionname,this.worktypeNum)
            })

          },
            //新增后台逻辑
          async addDataItem(name,workno,sex,groupname,company,firstleveldep,twoleveldep,threeleveldep,positionname,worktype){
            let axiosUrl = getCookieInfo().baseUrl + '/userMessage/addAttendanceData';
            // let axiosUrl = 'http://10.88.190.36:8083/userMessage/addAttendanceData';
            const res = await http.post(axiosUrl,{name,workno,sex,groupname,company,firstleveldep,twoleveldep,threeleveldep,positionname,worktype})
              if(res&&res.data.ret==='200'){
                this.dialogVisibles = false
                this.$message({
                  type:'success',
                  message:res.data.msg
                })
                //与后台交互逻辑   添加成功后刷新列表
                this.searchDataFn ();
              }
          },
          //选择是否计件
          selectPersonType(val){
            this.formDataAdd.worktype = val
            console.log('val',val)

          },
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
  /deep/ #piecePersonInformationFormData{position: relative;}
  /deep/ .el-upload-list{
    position: absolute;
    top:10px;
    left: 270px;
  }
  /deep/ #upload-document:hover{
    background: rgba(0,200,0,0.5)!important;
  }
  .paigong_download{
    background: rgba(0,200,0,0.8);color:#fff;position:relative;
    color:#fff;
    width: 90px;
    text-align: center;
    height: 39px;line-height: 39px;
    border-radius: 3px;
    display: inline-block;
    vertical-align: middle;
    padding:0 10px;
    &:hover{
      background: rgba(0,200,0,0.6);
    }
  }
  /deep/ .el-form-item__content {
    margin-left: 0px!important;
  }
  .addPieceInformationDialog  /deep/ .el-form-item{
    margin-left: 0px!important;
  }
</style>
