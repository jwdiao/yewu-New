<template>
	<div class=""  style="height:100%;overflow-y: hidden;">
		<section class="data_section"  style="height:100%;">
      <div class="index_main" style="height: 100%;overflow: auto">
        <div class="index_left"  style="height:100%;">
          <div class="index_left_bottom">
            <!--<p class="home_title">删除派工信息列表</p>-->
            <!--删除-->
            <div class="search" style="position: relative">
              <span>删除日期：</span>
              <div class="selectDate">
                <div class="block">
                  <el-date-picker  type="date"  size="small" value-format="yyyy-MM-dd" style="width: 240px;"
                   placeholder="选择删除日期" v-model="value2" @change="handleDateSearch" :picker-options="pickerOptions">
                  </el-date-picker>
                </div>
              </div>
              <span>加工中心：</span>
              <el-select v-model="value" placeholder="加工中心" size="small"  @change="selectMachingCenter">
                <el-option v-for="item in optionsOne" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <el-button type="primary" class="deleteBtn" @click="deleteProInfo" size="small" style="width: 120px;margin-left: 60px;height:40px;">删除</el-button>
              <!--<div class="deleteBtn" @click="deleteProInfo">删除</div>-->
            </div>
            <!--&lt;!&ndash;中心列表&ndash;&gt;
            <div class="title"><span>中心名称</span><span>工号/姓名</span><span>派工开始时间</span><span>派工结束时间</span><span>派工日期</span></div>
            <div>
              <div class="index_left_bottom_main">
                <div class="message">
                    <div class="title_message" v-for="(item,index) in currentHistoryData" :key="index"
                         @click.stop="openMessageBox(item.workname)">
                      <span>{{item.machinename}}</span>
                      <span>{{item.workusernum}}</span>
                      <span>{{item.startworktime}}</span>
                      <span>{{item.endworktime}}</span>
                      <span>{{planDate || searchTime}}</span>
                    </div>
                </div>

              </div>
            </div>
            &lt;!&ndash;分页器&ndash;&gt;
            <el-pagination style="margin-top: 20px; text-align: center" background :page-sizes="[10,20,30,50,100]"
              :page-size="pagination.pageSize" :pager-count="8" :total="historyData.length" layout="prev, pager, next,total,sizes"
              @current-change="currentChange" @prev-click="prevClick" @next-click="nextClick"  @size-change="handleSizeChange">
            </el-pagination>-->
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
      planDate:'', //派工日期
      searchTime:'',//查询日期
      machingCenterName:'',   //加工名称
      /*options: [{value: '选项2',label: '组装工作中心'}, {value: '选项3',label: '钻具工作中心'},{value: '选项4',label: '机加工作中心'}
        , {value: '选项5',label: '变幅工作中心'}, {value: '选项6',label: '备料工作中心'}, {value: '选项7',label: '桅杆工作中心'}, {value: '选项8',label: '调试工作中心'}
        , {value: '选项9',label: '设备工作中心'}, {value: '选项10',label: '仓储配送工作中心'}, {value: '选项11',label: '部件涂装工作中心'}],*/
      optionsOne:[],value: '',
      value1: '',  //标识日期div
      value2: '',  //标识日期div
      pickerOptions:{
        disabledDate(value){
          var date = new Date()
          var currenttime = date.getHours()
          var timePoint = 8          //截至每天早上八点可否选择
          if(currenttime<timePoint){ //小于8点
            return (Date.now()-3600*1000*timePoint) > value.getTime() ? true : false
          }else{ //大于8点
            return Date.now() > value.getTime() ? true : false
          }
        },
      },
    }
  },
  created() {

  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    this.getCenterName()
  },
  methods: {
    /*函数名：getCenterName
  参数：无
  描述：异步ajax请求与后台通信，成功时，中心名称选择
* */
    async getCenterName () {
      let axiosUrl = getCookieInfo().baseUrl + '/userMessage/getCenternameList';
        // console.log('测试删除派工：',axiosUrl)/
      const res = await http.get(axiosUrl)
      // const res = await http.get("/userMessage/getCenternameList")
      if (res.data.ret === "200") {
        var centerNames = res.data.centernameList
        for (var i = 0; i < centerNames.length; i++) {
          var optionsObj = {}
          optionsObj.value = centerNames[i].threeleveldep
          optionsObj.label = centerNames[i].threeleveldep
          this.optionsOne.push(optionsObj)
        }
        // console.log('res:', this.optionsOne)
      }

    },
    /*函数名：getEventInfoList
     参数：
     描述：异步ajax请求与后台通信
   * */
    async deleteWorkPlanInfoList (centername,date) {
      if (!centername) centername = ''
      if (!date) date = ''
      let axiosUrl = getCookieInfo().baseUrl + '/sanyWorkPlanExcel/deleteExcelHistory';
        // console.log('测试删除派工：',axiosUrl)/
      const res = await http.post(axiosUrl,{'centername':centername,'date':date})
      // const res = await http.post("/sanyWorkPlanExcel/deleteExcelHistory",{'centername':centername,'date':date})
      if (res.data.ret === "200") {
        this.$message({
          message:res.data.a,
          type:'success'
        })
      }else{
        this.$message({
          message:res.data.a,
          type:'warning'
        })
      }
    },
    /*函数名：handleDateSearch
     参数：val：选择的当前日期
     描述：通过日期检索查询信息
   * */
    handleDateSearch(val) {
     this.searchTime = val
      /*let obj = Object.assign(this.pickerOptions,{
        disabledDate(value){
          if( value < Date.now()){
            return true
          }else{
            return false
          }
        }
      })
      console.log('obj:',obj);
      return obj*/
    },
    /*函数名：selectMachingCenter
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
    /*函数名：deleteProInfo
     参数：无
     描述：点击按钮删除信息
   * */
    deleteProInfo() {
      this.$confirm('此操作将永久删除该文件，是否继续','提示',{confirmButtonText:'确定',cancelButtonText:'取消',type:'warning'}).then(()=>{
        let {searchTime,machingCenterName} = this
        this.deleteWorkPlanInfoList(machingCenterName,searchTime)
      }).catch(()=>{
        this.$message({
          type:'info',
          message:'取消删除'
        })
      })
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
   /* position: fixed;top:55px;left:335px;right:5px;bottom:15px;*/
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
      /deep/ .el-input__inner{
        height: 40px;
        line-height: 40px;
      }
      .search{
        padding-left: 30px;
        width: 100%;
        height: 30px;
        margin-top: 30px;
        &>.deleteBtn{
          display: inline-block;
          width: 10%;
          font-size: 14px;
        }&>form>.selectDate{
          background: #EFF2F7;
          border-radius: 5px;

         }
        &>form>.block{
          margin-left: 6px;
          margin-right: 0px;
        }
        &>form>.selectDate,&>.selectDate{
          width: 200px;
          height: 33px;
          padding-left: 0px;
          color: #000;
          margin-right:100px;margin-left:0px;font-size:14px;
        }
        &>input{
          width: 180px;
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
          width: 10%;
          height: 30px;
          line-height: 30px;
          outline: none;
          font-size: 14px;
          cursor: pointer;
          border-radius: 5px;
          text-align: center;
          color: #fff;
          &.deleteBtn{
            margin-left: 100px;
            height: 33px;
            line-height: 33px;
          }
        }
      }
      .title{
        background-color: #EFF2F7;
        font-weight: bold;
        height:40px;
        line-height: 40px;
        margin-top: 15px;
        span{
          display:inline-block;
          text-align: center;
          width:150px;
          height:32px;
          padding-left:0px;
          box-sizing:border-box;
          line-height:30px;
          font-size: 18px;
        }
      }
      &_main{
        height: 580px;
        overflow: scroll;
        .message{
          float:left;
          width:100%;
          padding-right:20px;
          .title_message{
            height:32px;
            border-top: 1px solid #EFF2F7;
            box-sizing: border-box;
            &:last-child{
              border-bottom: 1px solid #EFF2F7;
            }
            &:hover{
              cursor: pointer;
              background: #EFF2F7;
            }
            &>span{
              display:inline-block;
              text-align: center;
              width:19.5%;
              height:32px;
              padding-left: 30px;
              font-size: 18px;
              box-sizing:border-box;
              line-height:35px;
            }
          }
        }
      }
    }
  }

</style>
