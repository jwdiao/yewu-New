<template>
	<div class="myBox"  style="height:93%;overflow:hidden;">
		<section class="data_section" style="height:100%;">
      <div class="index_main" style="height: 100%;">
        <div class="index_left"  style="height:100%;">
          <div class="index_left_bottom"  style="height:100%;">
            <!--<p class="home_title">派工信息列表</p>-->
            <!--上传-->
            <!--<div class="search" style="position:relative;padding-bottom: 55px;border-bottom: 2px dotted rgba(230,230,230,1)" >&lt;!&ndash; border-bottom: 2px dotted rgba(230,230,230,1)&ndash;&gt;
             &lt;!&ndash; <form method="post" id="formBiao" enctype="multipart/form-data">
                <span>派工日期：</span>
                <input type="date" name="date" value="date" class="selectDate" ref="planDate">
                <span >加工中心：</span>
                <select name="centername" id="" value="加工中心" style="width: 150px; height: 33px; border:1px solid #ccc;margin-right: 50px;border-radius: 5px">
                  <option :value="item.label" v-show="index !==0" v-for="(item,index) in options" :key="index">{{item.label}}</option>
                </select>
                <input type="file" name="file"  value="file" class="block">
                <input type="button" class="gosearch" value="上传派工信息" @click="submit">
              </form>&ndash;&gt;
              &lt;!&ndash;element-ui&ndash;&gt;
              <span style="display: inline" class="paigong-title-name">派工日期</span>
              <div class="selectDate">
                <div class="block">
                  <el-date-picker  type="date"  size="small" value-format="yyyy-MM-dd" style="width: 100%;" :picker-options="pickerOptions"
                     placeholder="选择日期" v-model="value1" @change="handleDateUpload">
                  </el-date-picker>
                </div>
              </div>
              <span class="paigong-title-name">加工中心</span>
              <el-select v-model="value3" placeholder="请选择" size="small"  @change="uploadMachingCenter">
                <el-option v-for="item in optionsTwo" :key="item.value3" :label="item.label" :value="item.value3"></el-option>
              </el-select>
              <a class="paigong_download" href="http://10.19.7.69:8080/importfile/pg.xlsx" >
                <i class="el-icon-download"></i>下载文件
              </a>
              <el-upload id="formBiao" style="display:inline-block;background:none" :limit="1"
                         class="upload-demo" ref="upload" accept=".xls,.xlsx"  action="/userPushRecord/find/all"
                         :on-change="beforeUpload" :on-exceed="handleExceed"
                         :on-remove="removeDoc"
                         :http-request="uploadSectionFile" :auto-upload="false">
                <el-button id="upload-document" slot="trigger" icon="el-icon-upload2" type="success" plain style="background: rgba(0,200,0,0.8);color:#fff">上传文件</el-button>
                <el-button style="width:120px;" type="primary" @click="submitUpload" v-show="isShow">确定</el-button>
                &lt;!&ndash;<el-button slot="trigger" size="small" type="primary" plain>选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" icon="el-icon-upload2" type="success" @click="submitUpload">上传文件</el-button>&ndash;&gt;
              </el-upload>
            </div>-->
            <!--查询-->

            <section class="el-container is-vertical">

              <el-row style="margin-top: 20px; padding-left: 10px;">
                <el-form :inline="true" class="demo-form-inline">
                  <el-form-item label="派工日期">
                    <el-date-picker
                      v-model="value1"
                      type="date"
                      :picker-options="pickerOptions"
                      value-format="yyyy-MM-dd"
                      @change="handleDateUpload"
                      placeholder="选择日期"><!---->
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="加工中心">
                    <el-select v-model="uploadMachingCenterItem" placeholder="请选择"clearable @clear="clearMachingCenterItem" @change="uploadMachingCenter">
                      <el-option
                        v-for="item in optionsTwo"
                        :key="item.value3"
                        :label="item.label"
                        :value="item.value3">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <a class="paigong_download" href="http://10.19.7.69:8080/importfile/pg.xlsx" >
                    <i class="el-icon-download"></i>下载模板
                  </a>
                  <el-upload id="formBiao" style="display:inline-block;background:none" :limit="1"
                             class="upload-demo" ref="upload" accept=".xls,.xlsx"  action="/userPushRecord/find/all"
                             :on-change="beforeUpload" :on-exceed="handleExceed"
                             :on-remove="removeDoc"
                             :http-request="uploadSectionFile" :auto-upload="false">
                    <el-button id="upload-document" slot="trigger" icon="el-icon-upload2" type="success" plain style="background: rgba(0,200,0,0.8);color:#fff">上传文件</el-button>
                    <el-button style="width:120px;" type="primary" @click="submitUpload" v-show="isShow">确定</el-button>
                    <!--<el-button slot="trigger" size="small" type="primary" plain>选取文件</el-button>
                    <el-button style="margin-left: 10px;" size="small" icon="el-icon-upload2" type="success" @click="submitUpload">上传文件</el-button>-->
                  </el-upload>
                </el-form>
              </el-row>

              <el-row style="padding-left: 10px;">
                <el-form :inline="true" class="demo-form-inline">
                  <el-form-item label="查询日期">
                    <el-date-picker
                      v-model="value2"
                      type="date"
                      value-format="yyyy-MM-dd"
                      @change="handleDateSearch"
                      placeholder="选择日期"><!---->
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="加工中心">
                    <el-select v-model="machingCenterName" placeholder="请选择" clearable @clear="clearMachingCenter" @change="selectMachingCenter">
                      <el-option
                        v-for="item in optionsOne"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="工号/姓名">
                    <el-input v-model="workNumberName" placeholder="请输入工号姓名" clearable @clear="clearWorknoAndName" ></el-input><!--@clear="clearPersonName"-->
                  </el-form-item>

                  <el-form-item class="submitBtn">
                    <el-button type="primary" @click="searchProInfo" style="width: 100px">查询</el-button>
                    <el-button icon="el-icon-download" @click="exportPaiGongFile" style="width: 115px;background: rgba(0,200,0,0.8);color: #ffffff">导出文件</el-button>
                  </el-form-item>
                </el-form>
              </el-row>
            </section>

            <div class="common-table">
              <el-table
                stripe
                :data="historyData" header-row-class-name="table-header" border
                style="width: 100%"
                height="550">
                <el-table-column
                  type="index"
                  label="序号"
                  width="50">
                </el-table-column>
                <el-table-column prop="machinename" label="中心名称">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.machinename }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="workusernum" label="工号/姓名">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.workusernum }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="startworktime" label="派工开始时间">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.startworktime }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="endworktime" label="派工结束时间">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.endworktime }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="planDate" label="派工日期">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.planDate }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="100">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="deletePaigongRow(scope.$index, scope.row)"
                      style="background: #ff404a;color: #fff;border-radius: 5px" size="small">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <!--分页器-->
            <el-pagination style="text-align: center" background :page-sizes="[10,20,30,50,100]" :current-page="pagination.page"
              :page-size="pagination.pageSize" :pager-count="7" :total="pagination.dataCount" layout="total,sizes,prev, pager, next, jumper"
              @current-change="currentChange" @prev-click="prevClick" @next-click="nextClick"  @size-change="handleSizeChange">
            </el-pagination>
          </div>
        </div>
      </div>
		</section>
  </div>
</template>

<script>
import headTop from '../../components/headTop'
import moment from 'moment'
import http from '../../api/http'
import {getCookieInfo} from '../../api/getCookie'
import $ from 'jquery'
export default {
	components: {
		headTop
	},
  data() {
    return {
      workNumberName:'',//工号姓名
      planDate:'', //派工日期
      searchTime:'',//查询日期
      uploadTime:'',//上传日期
      isShow:false,
      uploadMachingCenterItem:'', //上传加工中心名称
      machingCenterName:'',   //查询加工名称
      isShowTime:true, //是否显示时间
      /*options: [{value: '选项2',label: '组装工作中心'}, {value: '选项3',label: '钻具工作中心'},{value: '选项4',label: '机加工作中心'}
        , {value: '选项5',label: '变幅工作中心'}, {value: '选项6',label: '备料工作中心'}, {value: '选项7',label: '桅杆工作中心'}, {value: '选项8',label: '调试工作中心'}
        , {value: '选项9',label: '设备工作中心'}, {value: '选项10',label: '仓储配送工作中心'}, {value: '选项11',label: '部件涂装工作中心'}],value: '',
      options3: [{value3: '选项2',label: '组装工作中心'}, {value3: '选项3',label: '钻具工作中心'},{value3: '选项4',label: '机加工作中心'}
        , {value3: '选项5',label: '变幅工作中心'}, {value3: '选项6',label: '备料工作中心'}, {value3: '选项7',label: '桅杆工作中心'}, {value3: '选项8',label: '调试工作中心'}
        , {value3: '选项9',label: '设备工作中心'}, {value3: '选项10',label: '仓储配送工作中心'}, {value3: '选项11',label: '部件涂装工作中心'}],value3: '',*/
      optionsOne:[],value:'',
      optionsTwo:[],value3:'',
      value1: '',  //上传日期
      value2: '',  //查询日期
      historyData:[],  //后台返回页面显示列表数组
      currentHistoryData:[],  //页面显示列表数组
      currentYear: 0,
      currentMon: 0,
      currentDay: 0,
      // 分页
      pagination: {
        dataCount: 0, // 初始化信息条数
        pageSize: 20, // 每页显示条数
        page: 1, // 当前页码
      },
      pickerOptions:{   //日期禁止选择
        disabledDate(time){
          return time.getTime() < Date.now() - 3600*1000*8;
        }
      },
    }
  },
  created() {

  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    this.setDefaultDate();
    this.getCenterName()
   /* this.searchProInfo()*/
    let {machingCenterName} = this
    let {pageSize} =this.pagination
    this.pagination.page = 1
    var initDate = this.currentYear+"-"+this.currentMon+"-"+this.currentDay
    var initDates = initDate.toString()
    pageSize = pageSize.toString()
    const{workNumberName} = this
    this.getWorkPlanInfoList(machingCenterName,workNumberName,initDates,this.pagination.page,pageSize)


  },
  methods: {
    setDefaultDate(){
      const hour = (new Date()).getHours();
      const month =  this.currentMon = new Date().getMonth() - 0 + 1 < 10 ? '0' + (new Date().getMonth() - 0 + 1) : new Date().getMonth() - 0 + 1,
        days = this.currentDay = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate(),
        hours = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours(),
        seconds = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds(),
        minutes = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
      this.value2 = this.pagination.page = new Date().getFullYear() +'-'+ month +'-'+ days;
      this.currentYear = new Date().getFullYear();

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
    /*函数名：getCenterName
    参数：无
    描述：异步ajax请求与后台通信，成功时，中心名称选择
  * */
    async getCenterName () {
      let axiosUrl = getCookieInfo().baseUrl + '/userMessage/getCenternameList';
      console.log('派工信息导入：',axiosUrl)
      // debugger;
      const res = await http.get(axiosUrl)
      // const res = await http.get("/userMessage/getCenternameList")
      if (res.data.ret === "200") {
        var centerNames = res.data.centernameList
        for (var i = 0; i < centerNames.length; i++) {
          var optionsBot = {}
          var optionsTop = {}
          optionsTop.value3 = centerNames[i].threeleveldep
          optionsBot.value = centerNames[i].threeleveldep
          optionsTop.label = centerNames[i].threeleveldep
          optionsBot.label = centerNames[i].threeleveldep
          this.optionsOne.push(optionsBot)
          this.optionsTwo.push(optionsTop)
        }
        var initObj = {label:'请选择',value:'0000'}
        this.optionsOne.unshift(initObj)
        // console.log('res:', this.optionsOne)
      }

    },
    /*函数名：getEventInfoList
     参数：formData:包含上传的派工日期，派工文件，加工中心
     描述：异步ajax请求与后台通信，成功时，将数据导入数据库中并且请求返回数据显示列表
   * */
    async getEventInfoList (formData) {
      let axiosUrl = getCookieInfo().baseUrl + '/sanyWorkPlanExcel/upload';
      console.log('派工信息导入：',axiosUrl)
      const res = await http.post(axiosUrl,formData)  //"/sanyWorkPlanExcel/getListOfNewUpload",{centername:'',date:''}
      // const res = await http.post("/sanyWorkPlanExcel/upload",formData)  //"/sanyWorkPlanExcel/getListOfNewUpload",{centername:'',date:''}
      if (res.data.ret === "200") {
        this.$message({
          dangerouslyUseHTMLString:true,  /*将HTML格式编译展现*/
          message:res.data.msg,/*a换为msg*/
          type:'success'
        })
        //if(res.data.msg ==='导入成功!'){
          let {page,pageSize} =this.pagination
          page = page.toString()
          // pageSize = pageSize.toString()
        let {searchTime,machingCenterName,workNumberName} = this
          this.getWorkPlanInfoList(machingCenterName,searchTime,page,pageSize.toString())
        //}
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
    // 时间格式化
    getCurrentDateTime () {
      return moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    },
    /*函数名：getWorkPlanInfoList
      参数：centername:加工中心；date:日期
      描述：成功时或查询时的调用方法
   * */
    async getWorkPlanInfoList (centername,workNumberName,date,page,pageSize) {
      if (!centername || centername === '请选择') centername = ''
      if (!date) date = this.currentYear+"-"+this.currentMon+"-"+this.currentDay

      let axiosUrl = getCookieInfo().baseUrl + '/sanyWorkPlanExcel/getListOfNewUpload';
      // let axiosUrl = 'http://10.88.195.89:8083/sanyWorkPlanExcel/getListOfNewUpload';
      const res = await http.post(axiosUrl,{'centername':centername,'workusernum':workNumberName,'date':date,'page':page,'pagesize':pageSize})
      // const res = await http.post("/sanyWorkPlanExcel/getListOfNewUpload",{'centername':centername,'date':date,'page':page,'pagesize':pageSize})
      if (res.data.ret === "200") {
        console.log('res:',res)
        this.historyData = res.data.list
        console.log('historyData:',this.historyData)
        this.pagination.dataCount = res.data.total
      }
    },
	  //--------上传文件start---------------------------------
    /*函数名：submitUpload
      参数：无
      描述：点击按钮上传派工信息表,异步发送请求
      * */
  submitUpload() {
    this.isShowTime = true
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
    // console.log('fileObj:',fileObj)
    // FormData 对象
    var form = new FormData($('#formBiao')[0]);
    // console.log('form:',form)
    let {uploadTime,uploadMachingCenterItem} = this
     form.append("file", fileObj);
     form.append("date",uploadTime);
     form.append("centername", uploadMachingCenterItem);
    this.getEventInfoList(form)
},
	  //--------上传文件end-------------------------------------
    /*函数名：resize
      参数：无
      描述：根据浏览器大小内容自适应
    * */
    handleResize() {
    /* console.log($('.myBox').height()) */
     /* var screenHeight = $(window).height()
      console.log(screenHeight)
      if (screenHeight > 1000) {
        $('.title_message').css('height', '38px')
        $('.title_message>span').css('height', '38px')
        $('.index_left_bottom_main').css('height', '700px')
      } else {
        $('.title_message').css('height', '32px')
        $('.title_message>span').css('height', '32px')
        $('.index_left_bottom_main').css('height', '580px')
      }*/
    },
    /*函数名：handleDateUpload
     参数：val：选择的当前日期
     描述：通过日期检索查询信息
   * */
    handleDateUpload(val){  //上传日期
      this.uploadTime = val
      if(val === null){   //如果不选择日期时，清空下面的列表
        this.historyData = []
      }
      // console.log(this.uploadTime)
    },
    /*函数名：handleDateSearch
    参数：val：选择的当前日期
    描述：通过日期检索查询信息
  * */
    handleDateSearch(val) {
     this.searchTime = val
    },
    /*函数名：deletePaigongRow
    参数：index, rows：
    描述：删除对应的每一行
  * */
    deletePaigongRow(index, rows) {
      this.$confirm('删除（'+rows.workusernum+'）的记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var planDateTime0 = rows.planDate + '08'
        var planDateTime = planDateTime0.split('-').join('')
        var currentDateTime0 = this.getCurrentDateTime()
        var currentDateTime = currentDateTime0.split('-').join('').split(' ').join('').slice(0,10)
        // console.log('planDateTime:',planDateTime)
        // console.log('currentDateTime:',currentDateTime)
        if(planDateTime > currentDateTime){
          //向后台发送请求
          this.deleteSingleUser(rows.id,rows.planDate,rows.workusernum)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });

        }else{
          this.$message({
            type: 'error',
            message: '数据已生效，不允许删除'
          });
        }
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
    async deleteSingleUser(id,date,workusernum){
      let axiosUrl = getCookieInfo().baseUrl + '/sanyWorkPlanExcel/deleteOneUserWorkPlan';
      // let axiosUrl = 'http://10.88.195.89:8083/sanyWorkPlanExcel/deleteOneUserWorkPlan';
      const res = await http.post(axiosUrl,{'id':id,'date':date,'workusernum':workusernum})
      if(res&&res.data.ret==='200'){
        //刷新列表
        let {searchTime,machingCenterName,workNumberName} = this
        let {pageSize} =this.pagination
        this.pagination.page = 1
        pageSize = pageSize.toString()
        this.getWorkPlanInfoList(machingCenterName,workNumberName,searchTime,this.pagination.page,pageSize)
      }
    },
    /*函数名：selectMachingCenter，
      参数：val：选择的当前options的value值（选项）
      描述：选择对应选项显示options的label值
     * */
    selectMachingCenter(val){
      let obj = {};
      obj = this.optionsOne.find((item)=>{
        return item.value === val;
      });
      this.machingCenterName = obj.label
    },
    uploadMachingCenter(val){
      let obj = {};
      obj = this.optionsTwo.find((item)=>{
        return item.value3 === val;
      });
      this.uploadMachingCenterItem = obj.label
    },
    //清除X号
    clearMachingCenter(){
      this.machingCenterName = ""   //查询
    },
    clearMachingCenterItem(){
      this.uploadMachingCenterItem = ""   //上传
    },
    clearWorknoAndName(){
      this.workNumberName = ""   //工号姓名
    },
    /*函数名：searchProInfo
     参数：无
     描述：点击按钮查询信息
   * */
    searchProInfo() {
      this.isShowTime = false
      this.historyData = []

      let {searchTime,machingCenterName,workNumberName} = this
      let {pageSize} =this.pagination
      this.pagination.page = 1
      pageSize = pageSize.toString()
      this.getWorkPlanInfoList(machingCenterName,workNumberName,searchTime,this.pagination.page,pageSize)
    },
    /*函数名：currentChange
     参数：index：当前项
     描述：点击当前项，显示对应列表
   * */
    currentChange(index) {  //当前页码
      this.historyData = []
      console.log( this.historyData)
      this.pagination.page = index.toString()
      let {pageSize} =this.pagination
      pageSize  = pageSize.toString()
      let {searchTime,machingCenterName,workNumberName} = this
      this.getWorkPlanInfoList(machingCenterName,workNumberName,searchTime,this.pagination.page,pageSize)
      console.log(this.historyData)
    },
    /*函数名：prevClick，nextClick
    参数：index：当前项
    描述：点击上一项、下一项，显示对应列表
  * */
    prevClick(index) {   //上翻页
    },
    nextClick(index) {   //下翻页
    },
    /*函数名：handleSizeChange
   参数：val：每页显示条数
   描述：选择显示对应列表
 * */
    handleSizeChange(val) {
      this.historyData = []
      this.pagination.pageSize = val
      let{page} = this.pagination
      page = '1'
      let {searchTime,machingCenterName,workNumberName} = this
      this.getWorkPlanInfoList(machingCenterName,workNumberName,searchTime,page,this.pagination.pageSize.toString())
    },
    //20190603派工数据导出按钮
    exportPaiGongFile(){
      const {value2,machingCenterName,workNumberName} = this
      if(value2 === null){
        this.$message({message:'请选择导出日期',type:'error'})
        return
      }
      let url = getCookieInfo().baseUrl + '/sanyWorkPlanExcel/exportWorkplanList'
      // let url = 'http://10.88.195.89:8083/sanyWorkPlanExcel/exportWorkplanList'  //高杰
      url = `${url}?centername=${machingCenterName}&workusernum=${workNumberName}&date=${value2}`;
      url = (encodeURI(url));
      console.log('url:',url)
      // window.open(url,'_blank');
      window.location.href = url
    },
  }
}

</script>

<style lang="less" scoped>
	@import '../../assets/css/mixin';
  /deep/ .el-main{
    overflow: hidden;
  }
	.header_container{
		background-color: #EFF2F7;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
	}
  .home_title{
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 22px; text-align: center;
    /*color: #fff;*/
    background-color: #EFF2F7;
  }

  .index_left{
    width: 99%;float: left;height:100%;padding-right: 15px;
    display: flex;flex-direction: column;
    /*cars页面左侧下部*/
    &_bottom{
      flex: 1;width:100%;overflow:hidden;
      border: 2px solid #EFF2F7;
      margin-top: 15px;
      padding-top: 0px;
      padding-left: 0px;
      padding-bottom: 15px;
      /deep/ .el-input__inner{
        height: 40px;
        line-height: 40px;
      }
      .search{
        padding-left: 30px;
        width: 100%;
        height: 30px;
        margin-top: 15px;
        &>form>.gosearch{
          display: inline-block;
          width: 10%;
          outline: none;
          font-size: 14px;
          cursor: pointer;
          border-radius: 5px;
          text-align: center;
          color: #fff;
          margin-left: -0.5%;
          height: 33px;
          line-height: 33px;

        }&>form>.selectDate{
          background: #EFF2F7;
          border-radius: 5px;
         }
        &>form>.block{
          margin-left: 6px;
          margin-right: 0px;
        }
        &>form>.selectDate,&>.selectDate{
          width: 15.5%;
          height: 33px;
          padding-left: 0px;
          color: #000;
          margin-right:0px;margin-left:0px;font-size:14px;
        }
        &>input{
          width: 16%;
          height: 30px;
          outline: none;
          padding-left: 10px;
          background: rgba(56,142,237,0.2);
          border: 1px solid #ccc;
          border-radius:5px ;
          margin-right: 10px;font-size:14px;float:left;
        }
        &>input::-webkit-input-placeholder{
          color: #ccc;
        }
        &>div{
          display: inline-block;
          // width: 12%;
          height: 30px;
          line-height: 30px;
          margin-left:0px;
          outline: none;
          font-size: 14px;
          cursor: pointer;
          border-radius: 5px;
          text-align: center;
          color: #fff;
          &.gosearch{
            margin-left: 50px;
            height: 33px;
            line-height: 33px;
          }
        }
      }
      .title{
        /*color:white;*/
        background-color: #EFF2F7;
        font-weight: bold;
        height:40px;
        line-height: 40px;
        margin-top: 15px;
        span{
          display:inline-block;
          text-align: center;
          width:20%;
          height:32px;
          padding-left:0px;
          box-sizing:border-box;
          line-height:30px;
          font-size: 18px;
        }
      }
      &_main{
        /*height: calc(100% - 24px);*/
        height: 580px;
        overflow: scroll;
        //padding-bottom: 20px;
        .message{
          float:left;
          width:100%;
          padding-right:20px;
          .title_message{
            height:45px;
            /*margin-bottom: 5px;*/
            border-top: 1px solid #EFF2F7;
            box-sizing: border-box;
            &:last-child{
              border-bottom: 1px solid #EFF2F7;
            }
            &:nth-child(odd){
              background: #FAFAFA;
            }
            &:hover{
              cursor: pointer;
              /*background: rgba(56,142,237,0.6);*/
              background: #EFF2F7;
              &>span{
                /*color: #fff;*/
              }
            }
            &>span{
              color: #666;
              display:inline-block;
              text-align: center;
              width:19.5%;
              height:32px;
              padding-left: 30px;
              font-size: 16px;
              box-sizing:border-box;
              line-height:45px;
              /*color:#31a0ff;*/
            }
          }
        }
      }
    }
  }
  /deep/ .el-upload{   //调整选择上传文件位置
    // margin-left: -53px;
  }
  /deep/ #formBiao{position: relative;}
  /deep/ .el-upload-list{
    position: absolute;
    top:-5px;
    left: 245px;
  }
  /deep/ #upload-document:hover{
    background: rgba(0,200,0,0.5)!important;
  }
  /deep/ .el-pagination{
    margin-top: 20px;
  }

  .paigong-title-name{
    display: inline-block;
    width: 90px;
    text-align: right;
  }
  .paigong_download{
    background: rgba(0,200,0,0.8);color:#fff;position:relative;
    color:#fff;
    width: 90px;
    height: 39px;line-height: 40px;
    margin: 0 20px;
    border-radius: 3px;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    padding:0 10px;
    /deep/ .el-icon-download{}
    &:hover{
      background: rgba(0,200,0,0.6)
    }
  }
</style>
