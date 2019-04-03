<template>
  <div class="checking-cameras">

    <section class="el-container is-vertical">
      <el-row style="margin-top: 40px; padding-left: 10px;">
        <el-form :inline="true" class="demo-form-inline">

          <el-form-item class="submitBtn">
            <el-button type="primary" style="width: 100px;" @click="addCameraType">新增</el-button>
          </el-form-item>
          <el-form-item class="submitBtn">
            <el-button type="danger" style="width: 100px;background: rgb(255, 64, 74)" @click="deleteCameras">删除</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </section>
    <!--主表-->
    <template>
      <el-table
        :data="dataList" @selection-change="handleSelectionChange"
        stripe
        style="width: 100%; margin-top: -10px;" height="650">
        <el-table-column type="selection" label="选择" width="80"></el-table-column>
        <el-table-column type="index" label="序号" width="100">   </el-table-column>
        <el-table-column prop="attendancesite"  label="考勤地点">    </el-table-column>
        <el-table-column prop="attancetype" label="摄像头种类">  </el-table-column>
        <el-table-column prop="stateno" label="分组编号">  </el-table-column>
        <el-table-column  label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)" type="primary"  icon="el-icon-edit">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!--新增-->
    <el-dialog title="考勤摄像头信息" :visible.sync="addDialogFormVisible">
      <el-form
        :inline="true"
        size="medium"
        :model="addData" :rules="addRules" ref="addCameras"
      >
        <el-form-item label="考勤地点" prop="addAddress">
          <el-input v-model="addData.addAddress" autocomplete="off" placeholder="请输入考勤地点"></el-input>
        </el-form-item>
        <el-form-item label="分组编号" prop="addStateno">
          <el-input v-model="addData.addStateno" autocomplete="off"  placeholder="请输入分组编号"></el-input>
          <!--<span style="color: red;">必须成对出现</span>-->
        </el-form-item>
        <el-form-item label="摄像头种类" style="margin-left: -15px" prop="addCameraType">
          <el-select v-model="addData.addCameraType" @change="selectCameraType" placeholder="请选择摄像头种类" >
            <el-option v-for="item in cameraTypeArr" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <!--编辑-->
    <el-dialog title="考勤摄像头信息" :visible.sync="dialogFormVisible">
      <el-form
        :inline="true"
        size="medium"
        :model="addform" :rules="editRules" ref="editCameras">
        <el-form-item label="考勤地点"  prop="address">
          <el-input v-model="addform.address" autocomplete="off" placeholder="请输入考勤地点"></el-input>
        </el-form-item>
        <el-form-item label="分组编号" prop="stateno">
          <el-input v-model="addform.stateno" autocomplete="off"  placeholder="请输入分组编号"></el-input>
          <!--<span style="color: red;">必须成对出现</span>-->
        </el-form-item>
        <el-form-item label="摄像头种类" style="margin-left: -15px" prop="cameraType" >
          <el-select v-model="addform.cameraType" @change="selectCameraType" placeholder="请选择摄像头种类">
            <el-option v-for="item in cameraTypeArr" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <template>
    <div class="block" style="padding: 20px; text-align: center;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next"
        background
        :total="pageTotal">
      </el-pagination>
    </div>
    </template>

  </div>
</template>
<script>
    import HeadTop from '../../components/headTop';
    import http from '../../api/http'
    import {getCookieInfo} from '../../api/getCookie'
    export default {
        name: "checkingcameras",
        components: {HeadTop},
        data (){
          return {
            dataList: [
               /* {attendancesite: '机加区东侧入口_人脸2', attancetype: '出门'},
                {attendancesite: '机加区东侧入口_人脸2', attancetype: '出门'}*/
            ],
            currentPage: 1,
            pageSize: 20,
            pageTotal: 0,
            //新增
            addDialogFormVisible:false,//弹窗
            addData:{
              addAddress:'',
              addStateno:'',
              addCameraType:'',
            },
            addRules:{
              addAddress: [
                { required: true, message: '请输入考勤地点', trigger: 'blur' },
              ],
              addStateno: [
                { required: true, message: '请输入摄像头种类', trigger: 'blur' },
              ],
              addCameraType: [
                { required: true, message: '请输入分组编号', trigger: 'blur' },
              ],
            },
            //编辑
            dialogFormVisible:false,//弹窗
            addform:{
              address:'',
              stateno:'',
              cameraType:'',
            },
            editRules:{
              address: [
                { required: true, message: '请输入考勤地点', trigger: 'blur' },
              ],
              stateno: [
                { required: true, message: '请输入摄像头种类', trigger: 'blur' },
              ],
              cameraType: [
                { required: true, message: '请输入分组编号', trigger: 'blur' },
              ],
            },
            cameraTypeArr:[
              {label:'进',value:'1'},
              {label:'出',value:'0'},
            ],
            addCameraTypeNum:0,//新增选择摄像头种类
            editCameraTypeNum:0,//编辑选择摄像头种类
            rowId:0,//编辑时传的id
            multipleSelection:[],//删除对象的数组e
          }
        },
        created(){
          this.renderData();
        },
        methods: {
          async renderData(){
            let axiosUrl = getCookieInfo().baseUrl + '/sanyAttendanceSite/findListByCondition'
            // let axiosUrl = 'http://10.88.190.36:8083/sanyAttendanceSite/findListByCondition'
            console.log('考勤摄像头信息:',axiosUrl)
            var result = await http.post(axiosUrl,{page: this.currentPage+'', pagesize: this.pageSize+''});
            // var result = await http.post('/sanyAttendanceSite/findListByCondition',{page: this.currentPage+'', pagesize: this.pageSize+''});
            if(result.data.ret == 200){
              this.pageTotal = result.data.total;
              const arr = result.data.list;
              arr.forEach(function (v) {
                if(v.attancetype == 0){
                  return v.attancetype = '进';
                }else {
                  return v.attancetype = '出';
                }
              })
              this.dataList = arr;
            }
          },
          handleSizeChange(pageSize){
            this.pageSize = pageSize;
            this.renderData();
          },
          handleCurrentChange(currentPage){
            this.currentPage = currentPage;
            this.renderData();
          },
          /*新增-----------------------------------------------start*/
          //点击新增按钮
          addCameraType(){
            //清空输入框
            this.addData.addCameraType = ''
            this.addData.addAddress = ''
            this.addData.addStateno = ''
            this.addDialogFormVisible = true

          },
          //新增确定按钮
          addConfirm(){
            this.$refs.addCameras.validate(async (valid) => {
              if (!valid) return;
              //与后台交互逻辑   添加成功后刷新列表
              const {addAddress,addStateno} = this.addData
              if(this.addData.addCameraType==='进'){this.addCameraTypeNum=0}
              else if(this.addData.addCameraType==='出'){this.addCameraTypeNum=1}
                this.addCameraItem(addAddress,addStateno,this.addCameraTypeNum)
            })
          },
          //新增后台接口函数
          async addCameraItem(attendancesite,stateno,attancetype){
            let axiosUrl = getCookieInfo().baseUrl + '/sanyAttendanceSite/addAttendanceSite'
            // let axiosUrl = 'http://10.88.190.36:8083/sanyAttendanceSite/addAttendanceSite'
            var res = await http.post(axiosUrl,{attendancesite,stateno,attancetype});
            if(res&&res.data.ret==='200'){
              this.addDialogFormVisible = false
              //刷新列表
              this.$message({
                type:'success',
                message:res.data.msg
              })
              this.renderData();
            }
          },

          //选择camera种类
          selectCameraType(val){
            let obj = {};
            obj = this.cameraTypeArr.find((item)=>{
              return item.value === val;
            });
            this.addform.cameraType = obj.label
            this.addData.addCameraType = obj.label
          },
          /*编辑-------------------------------------------------start*/
          handleEdit(index,row){
            this.dialogFormVisible = true
            console.log('row:',row)
            this.addform.address = row.attendancesite
            this.addform.stateno = row.stateno
            this.addform.cameraType = row.attancetype
            this.rowId = row.id
          },
          //编辑弹窗确定按钮
          editConfirm(){
            this.$refs.editCameras.validate(async (valid) => {
              if (!valid) return;
              //与后台交互逻辑   修改后刷新列表
              const {address,stateno} = this.addform
              if(this.addform.cameraType==='进'){this.editCameraTypeNum='0'}
              else if(this.addform.cameraType==='出'){this.editCameraTypeNum='1'}

              this.editCameraItem( this.rowId,address,stateno,this.editCameraTypeNum)
            })
          },
          //编辑后台接口函数
          async editCameraItem(id,attendancesite,stateno,attancetype){
            let axiosUrl = getCookieInfo().baseUrl + '/sanyAttendanceSite/updateAttendanceSite'
            // let axiosUrl = 'http://10.88.190.36:8083/sanyAttendanceSite/updateAttendanceSite'
            var res = await http.post(axiosUrl,{id,attendancesite,stateno,attancetype});
            if(res&&res.data.ret==='200'){
              this.dialogFormVisible = false
              this.$message({
                type:'success',
                message:res.data.msg
              })
              //刷新列表
              this.renderData();
            }
          },
          //点击删除按钮
          //选择删除项目
          handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log('multipleSelection:',this.multipleSelection)
          },
          deleteCameras(){
            if(this.multipleSelection.length === 0){
              this.$message({
                type:'error',
                message:'请选择删除的对象'
              })
              return
            }
            this.$message({
              type:'error',
              message:'您没有删除权限，请联系管理员'
            })
            return
            //删除功能
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              for (var i = 0; i < this.multipleSelection.length; i++) {
               var cameraId = this.multipleSelection[i].id
                this.deleteCamerasItem(cameraId)
              }
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          },
          //删除后台接口函数
          async deleteCamerasItem(id){
            let axiosUrl = getCookieInfo().baseUrl + '/sanyAttendanceSite/delAttendanceSite'
            // let axiosUrl = 'http://10.88.190.36:8083/sanyAttendanceSite/delAttendanceSite'
            var res = await http.post(axiosUrl,{id});
            if(res&&res.data.ret==='200'){
              this.dialogFormVisible = false
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              //刷新列表
              this.renderData();
            }
          },
        },
    }
</script>

<style scoped>
  /deep/ thead {
    color: #333;
  }

  /deep/ .el-dialog{
    width:34%
  }
  /deep/ .el-input{
    width:300px;
  }
  /deep/ .el-input:nth-of-type(3){
    width:95%;
  }
  /deep/.el-dialog__body{
    padding: 30px 60px;
  }
  /deep/.el-form{
    margin: 0px 60px;
  }
</style>
