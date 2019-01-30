<template>
	<div class=""  style="height:100%;overflow-y: hidden;">
		<head-top></head-top>
		<section class="data_section" style="height:calc(100% + 24px); ;">
      <div class="index_main" style="height: 100%;overflow: hidden">
        <div class="index_left">
          <div class="index_left_bottom">
            <!--<p class="home_title">人员信息列表</p>-->
            <div class="search">
              <span class="search_name_module">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：<input class="searchname" type="text" placeholder="请输入姓名" ref="workname" style="margin-left: 4px;"></span>
              <span class="search_name_module">工&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：<input class="searchtext" type="text" placeholder="请输入工号" ref="worknum" style="margin-left: 4px;"></span>
              <!--植入日历-->
              <div class="selectDate">
                <template>
                <div class="block moudle">
                  <span class="demonstration">开始时间：</span>
                  <el-date-picker
                    v-model="startDate"
                    type="datetime"
                    :picker-options="pickerOptions0"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </div>
                </template>
                <template>
                <div class="block moudle">
                  <span class="demonstration">结束时间：</span>
                  <el-date-picker
                    v-model="endDate"
                    type="datetime"
                    :picker-options="pickerOptionsEnd"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </div>
                </template>
              </div>
              <el-button style="height: 36px;" class="gosearching" type="primary" @click="searchProInfo" size="small">搜索</el-button>
              <el-button style="height: 36px;" class="clear" type="primary" @click="clearProInfo" size="small"  >清空</el-button>
              <!--<div class="gosearching" @click="searchProInfo">搜索</div>
              <div class="clear" @click="clearProInfo">清空</div>-->
            </div>


            <el-table
              stripe
              :data="historyData"
              style="width: 100%"
              height="600"
              @row-click="addImg">
              <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
              <el-table-column prop="workname" label="工号/姓名"></el-table-column>
              <el-table-column prop="pushtime" label="打卡时间"></el-table-column>
              <el-table-column prop="snapshotplace" label="摄像头名称"></el-table-column>
            </el-table>


            <!--<div class="title"><span>工号/姓名</span>&lt;!&ndash;<span>部门</span>&ndash;&gt;  <span>打卡时间</span><span>摄像头名称</span></div>
            <div>
              <div class="index_left_bottom_main">
                <div class="message">
                  <div class="title_message" v-for="(item,index) in historyData" :key="index" @click="addImg(index)">
                    <span>{{item.workname}}</span>
                    &lt;!&ndash;<span>{{item.department}}</span>&ndash;&gt;
                    <span>{{item.pushtime}}</span>
                    <span>{{item.snapshotplace}}</span>
                  </div>
                </div>
              </div>
            </div>-->

            <el-pagination style="margin-top: 20px; text-align: center" background :page-sizes="[20,50,100]"
              :page-size="pagination.pageSize"  :current-page="pagination.page" :pager-count="7" :total="pagination.dataCount" layout="total,sizes, prev, pager, next, jumper"
              @current-change="currentChange" @prev-click="prevClick" @next-click="nextClick" @size-change="handleSizeChange" ><!--@size-change="handleSizeChange"-->
            </el-pagination>
          </div>
        </div>
        <div class="index_right">
          <div class="index_right_item">
            <p class="home_title">图像显示区</p>
            <div class="home_title_imgpic"><img :src="eventsnapimg" alt=""></div>
          </div>
        </div>
      </div>
		</section>
  </div>
</template>

<script>
import headTop from '../../components/headTop'
import http from '../../api/http'
import {getCookieInfo} from '../../api/getCookie'
import $ from 'jquery'
export default {
	components: {
		headTop
	},
  data() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      pickerOptionsEnd:{
        disabledDate:(time) =>{
          return time.getTime() < new Date(this.startDate).getTime() - 3600*1000*24 || time.getTime() > Date.now();
        }
      },
      startDate: '',  //开始时间
      endDate: '',  //结束时间
      eventsnapimg:'', //图像
      historyData:[],  //页面显示列表数组
      workno:'', // 工号
      workname:'', // 姓名
      // 分页
      pagination: {
        dataCount: 0, // 初始化信息条数
        pageSize:19, // 每页显示条数
        page: 1, // 当前页码
      }
    }
  },
  created() { },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    /*初始化显示发请求
    * */
    let {workno,workname} = this
    let {page, pageSize} = this.pagination
    this.getEventInfoList(workno,workname,page,pageSize)
  },
  methods: {
    /*函数名：resize
      参数：无
      描述：根据浏览器大小内容自适应
    * */
    handleResize(){
      /*var screenHeight = $(window).width()
      console.log(screenHeight)
      if(screenHeight>1000){
        $('.title_message').css('height','38px')
        $('.title_message>span').css('height','38px')
      }else{
        $('.title_message').css('height','32px')
        $('.title_message>span').css('height','32px')
      }*/
    },
    /*函数名：getEventInfoList
      参数：workno:工号, workname：姓名, start：第几页, end：每页显示几条, startTime：开始时间, endTime：结束时间
      描述：异步ajax请求与后台通信
    * */
    async getEventInfoList (workno, workname, start, end, startTime, endTime) {
      if (!startTime) startTime = ''
      if (!endTime) endTime = ''
      let axiosUrl = getCookieInfo().baseUrl + '/userPushRecord/find/all';
      console.log('人脸打卡记录页面：',axiosUrl)
      // debugger;
      const res = await http.post(axiosUrl,{'workno':workno,'workname':workname,'start':start,'end':end,'startTime':this.startDate,'endTime':this.endDate})

      // const res = await http.post('/userPushRecord/find/all',{'workno':workno,'workname':workname,'start':start,'end':end,'startTime':this.startDate,'endTime':this.endDate})

      if (res.data.ret === "200") {
        this.historyData = res.data.data.list // 当前页的数据
        console.log('historyData:',this.historyData)
        this.pagination.dataCount = res.data.data.totalCount // 总数
        this.eventsnapimg = this.historyData[0].snappicurl //点击切换图片
      }
    },
    /*函数名：handleDateChange
     参数：val：val[0]:起始时间；val[1]:结束时间
     描述：通过日期检索信息
   * */
    handleDateChange(val){
     console.log(val[0],val[1])
      var startTime = val[0]
      var endTime = val[1]
      let {workno,workname} = this
      let {page, pageSize} = this.pagination
      page = 1
      this.getEventInfoList(workno, workname, page, pageSize,startTime,endTime)
    },
    /*函数名：searchProInfo
     参数：无
     描述：点击按钮检索信息
   * */
    searchProInfo(){
      this.pagination.page = 1

      this.handleDataSearch()


    },
    /*函数名：handleDataSearch
     参数：无
     描述：根据当前选择的信息检索
   * */
    handleDataSearch () {
      this.workname = this.$refs.workname.value
      this.workno = this.$refs.worknum.value
      let { workno, workname } = this
      let { page, pageSize, dataCount} = this.pagination
      // page = page.toString()
      // dataCount = 0
      // page = 1
      this.getEventInfoList(workno, workname, page, pageSize)
    },
    /*函数名：clearProInfo
     参数：无
     描述：清空input与当前选择项
   * */
    clearProInfo(){
      this.$refs.workname.value=""
      this.$refs.worknum.value =""
      let { workno, workname } = this
      let { page, pageSize } = this.pagination
      this.startDate = '';
      this.endDate = '';
      workno = ''
      workname = ''
      page = page.toString()
      pageSize = pageSize.toString()
      this.getEventInfoList(workno,workname,page,pageSize)
    },
    /*函数名：addImg
     参数：index：当前选项
     描述：点击当前条目，显示对应图片
   * */
    addImg(row,event,column){
      this.eventsnapimg =  row.snappicurl
    },
    /*函数名：currentChange
     参数：index：当前项
     描述：点击当前项，显示对应列表
   * */
    currentChange(index){  //当前页码
      console.log("currentPage:", index)
      this.pagination.page = index
      this.handleDataSearch()
    },
    /*函数名：prevClick，nextClick
    参数：index：当前项
    描述：点击上一项、下一项，显示对应列表
  * */
    prevClick(index){   //上翻页
      this.pagination.page = index
      this.handleDataSearch()
    },
    nextClick(index){   //下翻页
      this.pagination.page = index
      this.handleDataSearch()
    },
    handleSizeChange(val){
      this.pagination.page = 1
      this.pagination.pageSize = val
      this.handleDataSearch()
    },
  }
}
</script>


<style lang="less" scoped>
	@import '../../assets/css/mixin';
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
    background-color: #EFF2F7;
  }
  .index_left{
    width: 58%;float: left;height:100%;padding-right: 15px;
    display: flex;flex-direction: column;
    &_bottom{
      flex: 1;width:100%;overflow:hidden;
      border: 2px solid #EFF2F7;
      margin-top: 15px;
      padding-top: 0px;
      padding-left: 0px;
      padding-bottom: 15px;
      /deep/ .el-table__row:hover{
        cursor: pointer;
      }
      .search{
        padding-left: 30px;
        width: calc(100% - 30px);
        height: auto;
        margin-top: 30px;
        .selectDate{
          width: 75%;
          height: auto;
          color: #000;
          background: transparent;
          font-size:14px;
          margin-left: 0;
          .moudle {
            width: 49%;
            text-align: left;
            display: inline-block;
            padding: 0;
            /deep/ .el-date-editor {
              display: inline-block;
              width: 65%;
            }
          }
        }
        .search_name_module {
          width: 37%;
          height: 38px;
          margin-bottom: 10px;
          display: inline-block;
          input {
            width: 61%;
            height: calc(100% - 2px);
            outline: none;
            padding-left: 10px;
            background: rgba(56, 142, 237, 0.2);
            background: transparent;
            border: 1px solid #e3e3e3;
            border-radius: 4px;
            font-size: 14px;
          }
        }
        &>input::-webkit-input-placeholder{
          color: #ccc;
        }
        &>div{
          display: inline-block;
          width: 5%;
          height: 30px;
          line-height: 30px;
          margin-left: 1%;
          outline: none;
          font-size: 14px;
          cursor: pointer;
          border-radius: 5px;
          text-align: center;
          color: #fff;
          background: gradient(linear, left top, left bottom, from(#4CDDED), to(#0088FE));
          background: linear-gradient(top,  #4CDDED,  #0088FE);
          background: -ms-linear-gradient(top,  #4CDDED,  #0088FE);
        }
      }
      .title{
        background-color: #EFF2F7;
        font-weight: 500;
        height:40px;
        line-height: 40px;
        margin-top: 15px;
        span{
          display:inline-block;
          text-align: center;
          width:32%;
          height:32px;
          padding-left:0px;
          box-sizing:border-box;
          line-height:30px;
          font-size: 18px;
        }
      }
      &_main{
        height: calc(100% - 24px);
        overflow: hidden;
        //padding-bottom: 20px;
        .message{
          float:left;
          width:100%;
          /*margin-top:10px;*/
          padding-right:20px;
          .title_message{
            height:32px;
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
            span{
              color: #666;
              display:inline-block;
              text-align: center;
              width:32%;
              height:32px;
              padding-left: 30px;
              font-size: 16px;
              box-sizing:border-box;
              line-height:35px;
              /*color:#31a0ff;*/
            }
          }
        }
      }
    }
  }
  .index_right{
    width: 40%;float: left;height: calc(100% - 18px); overflow: hidden;
    display: flex;flex-direction: column;
    border: 2px solid #EFF2F7;
    margin-top: 15px;
    padding-top: 0px;
    padding-left: 0px;
    &_item {
      width: 100%;overflow:hidden;
      height: 872px;
      .home_title{
        width: 100%;
        height: 50px;
        line-height: 50px;
        font-size: 22px; text-align: center;
        backgrofund-color: #EFF2F7;
        position: relative;
      }
      .home_title_imgpic {
        width: 100%;
        /*min-height: 100%;*/
        display: flex;justify-content: center;align-items: center;
        &>img{
          width: 100%;
        }
      }
    }
  }

</style>
