<template>
	<div class="">
		<head-top></head-top>
		<section class="data_section">
      <div class="index_main">
        <div class="index_left">
          <div class="index_left_bottom">
            <p class="home_title">早退人员信息列表</p>
            <div class="searchClass">
              <!--<input class="searchname" type="text" placeholder="姓名" ref="workname" >
              <input class="searchtext" type="text" placeholder="工号" ref="worknum" >-->
              <el-select v-model="value" placeholder="班次" size="small">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <!--植入日历-->
              <div class="selectDate">
                <div class="block">
                    <el-date-picker  type="datetime"  size="small" value-format="yyyy-MM-dd HH:mm:ss" style="width: 240px;"
                     placeholder="选择日期时间"
                     v-model="value1" @change="handleDateChange">
                  </el-date-picker>
                </div>
              </div>
              <div class="gosearch" @click="searchProInfo">查询</div>
              <!--<div class="clear" @click="clearProInfo">清空</div>-->
            </div>
            <div class="title"><span>工号/姓名</span><span>部门</span><span>打卡时间</span><span>摄像头名称</span></div>
            <div>
              <div class="index_left_bottom_main">
                <div class="message">
                    <div class="title_message" v-for="(item,index) in historyData" :key="index"
                         @click.stop="openMessageBox(item.workname)">
                      <span>{{item.workname}}</span>
                      <span>{{item.department}}</span>
                      <span>{{item.pushtime}}</span>
                      <span>{{item.snapshotplace}}</span>
                    </div>
                </div>

              </div>
            </div>
            <el-pagination style="margin-top: 20px; text-align: center" background :page-sizes="[10,20,30,50,100]"
              :page-size="pagination.pageSize" :pager-count="7" :total="pagination.dataCount" layout="prev, pager, next,total,sizes"
              @current-change="currentChange" @prev-click="prevClick" @next-click="nextClick"  @size-change="handleSizeChange">
            </el-pagination>
          </div>
        </div>

      </div>
		</section>
    <!--弹窗-->
    <div class="message-box" :class="{on:isShowBox}" ref="messageBox" @click="closeMessageBox">
      <div class="message-wrap" @click.stop>
        <div class="titleName" style="font-size: 30px">{{this.workname}}</div><span class="close"style="font-size: 40px" @click="closeMessageBox">x</span>
        <div class="title"><span>工号/姓名</span><span>部门</span><span>打卡时间</span><span>摄像头名称</span></div>
        <div class="title_message" v-for="(item,index) in maskHistoryData" :key="index">
          <span>{{item.workname}}</span>
          <span>{{item.department}}</span>
          <span>{{item.pushtime}}</span>
          <span>{{item.snapshotplace}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headTop from '../../components/headTop'
import http from '../../api/http'
import $ from 'jquery'
export default {
	components: {
		headTop
	},
  data() {
    return {
      isShowBox:true, //是否显示弹窗true:隐藏
      options: [{value: '选项1',label: '白班'}, {value: '选项2',label: '夜班'}],value: '',
      value1: '',  //标识日期div
      eventsnapimg:'', //图像
      historyData:[],  //页面显示列表数组
      maskHistoryData:[],//mask蒙层数据
      workno:'', // 工号
      workname:'', // 姓名
      // 分页
      pagination: {
        dataCount: 0, // 初始化信息条数
        pageSize: 50, // 每页显示条数
        page: 1, // 当前页码
      },
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
    handleResize() {
      var screenHeight = $(window).height()
      console.log(screenHeight)
      if (screenHeight > 1000) {
        $('.title_message').css('height', '38px')
        $('.title_message>span').css('height', '38px')
        $('.index_left_bottom_main').css('height', '750px')
      } else {
        $('.title_message').css('height', '32px')
        $('.title_message>span').css('height', '32px')
        $('.index_left_bottom_main').css('height', '620px')
      }
    },
    /*函数名：getEventInfoList
      参数：workno:工号, workname：姓名, start：第几页, end：每页显示几条, startTime：开始时间, endTime：结束时间
      描述：异步ajax请求与后台通信
    * */
    async getEventInfoList(workno, workname, start, end, startTime, endTime) {
      if (!startTime) startTime = ''
      if (!endTime) endTime = ''
      const res = await http.post('/userPushRecord/find/all', {
        'workno': workno,
        'workname': workname,
        'start': start,
        'end': end,
        'startTime': startTime,
        'endTime': endTime
      })
      // debugger
      if (res.data.ret === "200") {
        this.historyData = res.data.data.list // 当前页的数据
        this.pagination.dataCount = res.data.data.totalCount // 总数
      }
    },
    /*函数名：handleDateChange
     参数：val：val[0]:起始时间；val[1]:结束时间
     描述：通过日期检索信息
   * */
    handleDateChange(val) {
      console.log(val)
    },
    /*函数名：searchProInfo
     参数：无
     描述：点击按钮检索信息
   * */
    searchProInfo() {
      this.pagination.page = 1
      this.handleDataSearch()
    },
    /*函数名：handleDataSearch
     参数：无
     描述：根据当前选择的信息检索
   * */
    handleDataSearch() {
      let {workno, workname} = this
      let {page, pageSize, dataCount} = this.pagination
      // page = page.toString()
      // dataCount = 0
      // page = 1
      this.getEventInfoList(workno, workname, page, pageSize)
    },
    /*函数名：currentChange
     参数：index：当前项
     描述：点击当前项，显示对应列表
   * */
    currentChange(index) {  //当前页码
      this.pagination.page = index
      let{workno,workname} = this
      workname = ''
      workno = ''
      this.handleDataSearch()
    },
    /*函数名：prevClick，nextClick
    参数：index：当前项
    描述：点击上一项、下一项，显示对应列表
  * */
    prevClick(index) {   //上翻页
      this.pagination.page = index
      let{workno,workname} = this
      workname = ''
      workno = ''
      this.handleDataSearch()
    },
    nextClick(index) {   //下翻页
      this.pagination.page = index
      let{workno,workname} = this
      workname = ''
      workno = ''
      this.handleDataSearch()
    },
    /*函数名：handleSizeChange
   参数：val：每页显示条数
   描述：选择显示对应列表
 * */
    handleSizeChange(val) {
      this.pagination.pageSize = val
      this.handleDataSearch()
    },
    /*函数名：openMessageBox
     参数：无
     描述：点击列表项，弹出详细信息
   * */
    openMessageBox(val) {
      this.isShowBox = false
      this.historyData.forEach((item,index) =>{
        if(item.workname === val){   //应该是模糊匹配 item.workname.indexOf(val) || val.indexOf(item.workname)
          this.maskHistoryData.push(item)
          // console.log(this.maskHistoryData)
        }
      })
      /*const h = this.$createElement;
      this.$msgbox({
        title: val.slice(8,val.length),
        message: h('div', {style:'width:100px; height:300px;background:#eee;'}, [
          h('span',{style: 'color: red;margin-left:5px;'}, val.slice(8,val.length)),
          h('span',{style: 'color: blue;margin-left:5px;'}, workno),

        ]),
      })*/
    },
    /*函数名：closeMessageBox
       参数：无
       描述：关闭蒙层
     * */
    closeMessageBox(){
      this.isShowBox = true
      this.maskHistoryData = []
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
  .index_main{
    /*position: fixed;top:55px;left:335px;right:5px;bottom:15px;*/
  }
  .home_title{
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 22px; text-align: center;
    /*color: #fff;*/
    background-color: #EFF2F7;
  }
  /*6s页面左侧盒子*/
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
      .searchClass{
        padding-left: 30px;
        width: 100%;
        height: 30px;
        margin-top: 30px;
        &>.selectDate{
          width: 17%;
          height: 33px;
          padding-left: 0px;
          color: #000;
          background: transparent;
          margin-right:100px;margin-left:40px;font-size:14px;
        }
        &>input{
          width: 16%;
          height: 30px;
          outline: none;
          padding-left: 10px;
          background: rgba(56,142,237,0.2);
          background: transparent;
          border: 1px solid #ccc;
          border-radius:5px ;
          margin-right: 10px;font-size:14px;float:left;
        }
        &>input::-webkit-input-placeholder{
          color: #ccc;
        }
        &>div{
          display: inline-block;
          width: 10%;
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
        /*color:white;*/
        background-color: #EFF2F7;
        font-weight: bold;
        height:40px;
        line-height: 40px;
        margin-top: 15px;
        span{
          display:inline-block;
          text-align: center;
          width:25%;
          height:32px;
          padding-left:0px;
          box-sizing:border-box;
          line-height:30px;
          font-size: 18px;
        }
      }
      &_main{
        /*height: calc(100% - 24px);*/
        height: 620px;
        overflow: scroll;
        //padding-bottom: 20px;
        .message{
          float:left;
          width:100%;
          padding-right:20px;
          .title_message{
            height:32px;
            /*margin-bottom: 5px;*/
            border-top: 1px solid #EFF2F7;
            box-sizing: border-box;
            &:last-child{
              border-bottom: 1px solid #EFF2F7;
            }
            /*&:nth-child(odd){
              background: rgba(56,142,237,0.4);
            }*/
            &:hover{
              cursor: pointer;
              /*background: rgba(56,142,237,0.6);*/
              background: #EFF2F7;
              &>span{
                /*color: #fff;*/
              }
            }
            &>span{
              display:inline-block;
              text-align: center;
              width:24%;
              height:32px;
              padding-left: 30px;
              font-size: 18px;
              box-sizing:border-box;
              line-height:35px;
              /*color:#31a0ff;*/
            }
          }
        }
      }
    }
  }
  .message-box{
    background: rgba(0,0,0,0.7);
    width:100%;
    z-index: 10000;
    position: fixed;
    top:0;left: 0;bottom:0;right:0;
    overflow: hidden;
    .message-wrap{
      width:50%;
      height: 50%;
      overflow: auto;
      position: absolute;
      background-color: #fff;
      top:0;left: 0;bottom:0;right:0;margin: auto;
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
          width:25%;
          height:32px;
          padding-left:0px;
          box-sizing:border-box;
          line-height:30px;
          font-size: 18px;
        }
      }

      .close{
        position: absolute;
        top: 0;
        right: 20px;
        &:hover{
          cursor: pointer;
        }
      }
    }
    .title_message{
      height:32px;
      /*margin-bottom: 5px;*/
      border-top: 1px solid #EFF2F7;
      box-sizing: border-box;
      &:last-child{
        border-bottom: 1px solid #EFF2F7;
      }
      /*&:nth-child(odd){
        background: rgba(56,142,237,0.4);
      }*/
      &:hover{
        cursor: pointer;
        /*background: rgba(56,142,237,0.6);*/
        background: #EFF2F7;
        &>span{
          /*color: #fff;*/
        }
      }
      &>span{
        display:inline-block;
        text-align: center;
        width:24%;
        height:32px;
        padding-left: 30px;
        font-size: 18px;
        box-sizing:border-box;
        line-height:35px;
        /*color:#31a0ff;*/
      }

    }
  }
  .on{
    display: none;
  }


</style>
