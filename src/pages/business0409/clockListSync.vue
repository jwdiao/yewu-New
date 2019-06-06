<template>
	  
      <div class="index_main" style="">
        <div class="index_left">
          <div class="index_left_bottom">
            <p class="home_title">人员信息列表</p>
            <div class="search">
							<!--植入日历-->
              <div class="selectDate">
                <template>
                <div class="block moudle">
                  <span class="demonstration">开始时间：</span>
                  <el-date-picker v-model="startTime" 
				  type="datetime" 
				  :picker-options="pickerOptionsStart" 
				  value-format="yyyy-MM-dd HH:mm:ss" 
				  placeholder="选择日期时间"
				  @change="handleStartTime"
				  @focus="startTimeFocus">
                  </el-date-picker>
                </div>
                </template>
                <template>
                <div class="block moudle">
                  <span class="demonstration">结束时间：</span>
                  <el-date-picker  v-model="endTime"  
				  type="datetime" 
				  :picker-options="pickerOptionsEnd" 
				  value-format="yyyy-MM-dd HH:mm:ss" 
				  placeholder="选择日期时间"
				  @change="handleEndTime"
				  @focus="endTimeFocus">
                  </el-date-picker>
                </div>
                </template>
              </div>
              <el-button style="width: 80px; height: 36px;" class="gosearching" type="primary" @click="searchProInfo" size="small" >搜索</el-button>
              <el-button style="width: 80px;height: 36px;" class="clear" type="primary" @click="syncProInfo" size="small" :disabled = this.asyncFlag >同步</el-button>
              <!--<div class="gosearching" @click="searchProInfo">搜索</div>
              <div class="clear" @click="clearProInfo">清空</div>-->
            </div>

            <div class="common-table">
							<div class="">
								<el-table   stripe :data="historyData" header-row-class-name="table-header" border  style="width: 100%;"  :height="tableHeight"
								            v-loading="loadingsync" element-loading-text="正在同步中……"  element-loading-spinner="el-icon-loading"
								            element-loading-background="rgba(0, 0, 0, 0.6)"
								            @row-click="addImg">
								  <el-table-column prop="num" label="序号" width="50"> </el-table-column>
								  <el-table-column prop="workname" label="工号/姓名"></el-table-column>
								  <el-table-column prop="pushtime" label="打卡时间"></el-table-column>
								  <el-table-column prop="snapshotplace" label="摄像头名称"></el-table-column>
								  <el-table-column prop="department" label="工作中心"></el-table-column>
								</el-table>
							</div>
							<div style="height:32px;">
								<el-pagination style="margin-top: 5px; text-align: center;" background :page-sizes="[20,50,100]"
								  :page-size="pagination.pageSize"  :current-page="pagination.page" :pager-count="7" :total="pagination.dataCount" layout="total,sizes, prev, pager, next, jumper"
								  @current-change="currentChange" @prev-click="prevClick" @next-click="nextClick" @size-change="handleSizeChange" ><!--@size-change="handleSizeChange"-->
								</el-pagination>
							</div>
            </div>
           
          </div>
        </div>
        <div class="index_right">
          <div class="index_right_item">
            <p class="home_title">图像显示区</p>
            <div class="home_title_imgpic" style="height:100%"><img :src="eventsnapimg" alt="" style="height:100%"></div>
          </div>
        </div>
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
      loadingsync:false,//同步加载中
      pickerOptionsStart: {
        disabledDate:(time) => {
          return time.getTime() > this.startNowTime || time.getTime() < new Date(this.endTime).getTime()
        }
      },
      pickerOptionsEnd:{
        disabledDate:(time) =>{
         /* return time.getTime() < new Date(this.startTime).getTime() || time.getTime() > Date.now(); */
		    return time.getTime() > new Date(this.startTime).getTime() || time.getTime()<new Date(this.startTime).getTime()-8*60*60*1000 ||time.getTime() > this.endNowTime
        }
      },
      startTime: '',  //开始时间
      endTime: '',  //结束时间
	  startNowTime:Date.now(),
	  endNowTime:Date.now(),
      eventsnapimg:'', //图像
      historyData:[],  //页面显示列表数组
	  asycnlist:[],//同步功能所要传的接口
	  asyncFlag:true,//同步按钮是否禁用
	  tableHeight:'',//
      workno:'', // 工号
      workname:'', // 姓名
      // 分页
      pagination: {
        dataCount: 0, // 初始化信息条数
        pageSize:20, // 每页显示条数
        page: 1, // 当前页码
      }
    }
  },
  created() { },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    /*初始化显示发请求
    * */
	this.handleResize();
		
  },
  methods: {
    /*函数名：resize
      参数：无
      描述：根据浏览器大小内容自适应
    * */
    handleResize(){
			var height = document.documentElement.clientHeight
			this.tableHeight = height - 355			
    },
	/*开始时间获取焦点事件,如果结束时间的值为空则开始时间只大于当前时间即可*/
	startTimeFocus(){
		    if(this.endTime==null){
				this.startNowTime = Date.now();
			}
		    
	},
	/*开始时间获取焦点事件,如果开始时间值未null则结束时间大于当前时间即可,否则才做限制*/
	endTimeFocus(){
			 if(this.startTime!=null){
				this.endNowTime = Date.now();
				this.pickerOptionsEnd.disabledDate=(time) => {
					 return time.getTime() > new Date(this.startTime).getTime() || time.getTime()<new Date(this.startTime).getTime()-8*60*60*1000 ||time.getTime() > this.endNowTime
				} 
			 }else{
				 this.pickerOptionsEnd.disabledDate=(time) => {
				 	return time.getTime() > this.endNowTime
				 } 
				
			 }    
	},
	/*开始时间改变事件*/
	handleStartTime(){
		
	},
	/*结束时间改变事件*/
	handleEndTime(){
		if(this.endTime!=null){
			this.startNowTime = new Date(this.endTime).getTime();
		}
		return;	
	},
    /*函数名：getEventInfoList
      参数： startTime：开始时间, endTime：结束时间
      描述：异步ajax请求与后台通信
    * */
    async getEventInfoList() {
		    let url = getCookieInfo().baseUrl + '/userPushRecord/getPush'
			const res = await http.post(url,{
				startTime:this.startTime,
				endTime:this.endTime,
				page:this.pagination.page,
				pagesize:this.pagination.pageSize
			})
			if(res && res.data.ret==200){
				this.asyncFlag = false
				//映射出表格渲染数组
				this.historyData = res.data.getPush.map((item,index)=>{
					    return {
							num : (this.pagination.page-1)*this.pagination.pageSize + index,
							workname: item.workname,
							pushtime:item.pushtime,
							snapshotplace:item.snapshotplace,
							department:item.department,
							facesnapurl:item.facesnapurl
						}
				})
				//如果没有数据时图片路径值应为空
				this.eventsnapimg = this.historyData.length>0 ? this.historyData[0].facesnapurl:''
				this.pagination.dataCount = res.data.total
				//映射出同步提交参数数组
				this.asycnlist = res.data.list.map((e,i)=>{
					    return {
								 attancetype : e.attancetype,
								 facesnapurl : e.facesnapurl,
								 pushtime : e.pushtime,
								 snappicurl : e.snappicurl,
								 snapshotplace : e.snapshotplace,
								 username : e.username,
								 workname : e.workname,
								 workno : e.workno,
					    }
				})
			}
		},
		/*函数名：getEventInfoList
		  参数： startTime：开始时间, endTime：结束时间
		  描述：异步ajax请求与后台通信
		* */
		async insertPerson(){
			let url = getCookieInfo().baseUrl + '/userPushRecord/insertPerson'
			const res = await http.post(url,{
				list:this.asycnlist
			})
			if(res){
				this.loadingsync = false
				this.$message({
				  message: '同步完成',
				  type: 'success',
				  
				});
			}
		} ,
    /*函数名：handleDateChange
     参数：val：val[0]:起始时间；val[1]:结束时间
     描述：通过日期检索信息
   * */
   /* handleDateChange(val){
     console.log(val[0],val[1])
      var startTime = val[0]
      var endTime = val[1]
      let {workno,workname} = this
      let {page, pageSize} = this.pagination
      page = 1
      
    }, */
    /*函数名：searchProInfo
     参数：无
     描述：点击按钮检索信息
   * */
    searchProInfo(){
      if(this.startTime && this.endTime){
		if(new Date(this.endTime) - new Date(this.startTime)>8*60*60*1000){
			this.$message({
			  type:'error',
			  message:'查询八小时以内'
			});
			return false;
		}else{
			this. getEventInfoList()
			if(this.historyData.length>0){
			  this.downShow = true;
			}else{
			  this.downShow = false;
			}
		}
        
      }else{
        this.$message({
          type:'error',
          message:'必须填写开始时间和结束时间'
        });
		return false;
      }
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
      this.getEventInfoList()
    },
    /*@name：刁俊文
     @date：2019.04.16
     @info：syncProInfo:同步数据函数
   * */
    syncProInfo(){
      this.loadingsync = true //正在同步中
      //调用同步接口,返回的数据进行分页
      this.insertPerson()
      
      //同步成功后，用户点击确认按钮
      /* setTimeout(()=>{
        
      },3000) */

    },
    /*函数名：addImg
     参数：index：当前选项
     描述：点击当前条目，显示对应图片
   * */
    addImg(row,event,column){
      this.eventsnapimg =  row.facesnapurl
    },
    /*函数名：currentChange
     参数：index：当前项
     描述：点击当前项，显示对应列表
   * */
    currentChange(index){  //当前页码
	  this.pagination.page = index ;
      this.getEventInfoList();
    },
    /*函数名：prevClick，nextClick
    参数：index：当前项
    描述：点击上一项、下一项，显示对应列表
  * */
    prevClick(index){   //上翻页
     this.pagination.page = index ;
     this.getEventInfoList();
    },
    nextClick(index){   //下翻页
     this.pagination.page = index ;
     this.getEventInfoList(); 
    },
    handleSizeChange(val){
     this.pagination.pageSize = val ;
     this.getEventInfoList();
    },
  }
}
</script>


<style lang="less" scoped>
	@import '../../assets/css/mixin';
	.index_main{
		height:calc(100% - 60px);
		overflow: hidden;
	}
	.common-table{
		height:calc(100% - 145px)
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
      /deep/ .el-table__row:hover{
        cursor: pointer;
      }
      .search{
        padding-left: 30px;
        width: calc(100% - 30px);
        height: auto;
        margin: 15px 0;
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
				.paigong_download{
					background: rgba(0,200,0,0.8);color:#fff;position:relative;
					color:#fff;
					height: 32px;line-height: 32px;
					border-radius: 2px;
					display: inline-block;
					vertical-align: middle;
					padding:0 10px;
					cursor: pointer;
					/deep/ .el-icon-download{}
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
    width: 42%;float: left;height: calc(100% - 15px); overflow: hidden;
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
