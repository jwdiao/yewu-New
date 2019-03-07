<template>
  <div class="index">
    <!-- 头部 start -->
    <div class="index_top">
      <span class="title" @click="enterIndexPage('/faceAndAttendance')">三现数据中心</span>
      <em class="time" v-text="currentTime"></em>
      <div class="dayOrnight">
        <img v-show="dayOrNightStatus ==='白班'" src="../../assets/images/index_sun.png" />
        <img v-show="dayOrNightStatus ==='夜班'" src="../../assets/images/index_moon.png" />
        <span v-text="dayOrNightStatus">白班</span>
      </div>
    </div>
    <!-- 头部 end -->
    <!-- main start -->
    <div class="index_main">
      <div class="index_left">
        <AbnormalStatistics :info="baseInfo" :monthData="monthDataLeft" :yearData="yearDataLeft" />
      </div>
      <div class="index_con">
        <!-- <Checking :info="baseInfo" :isDayOrNigint="dayOrNightStatus" :hourEchartsDataBetween="hourEchartsDataBetween" :centerLen="centernameLen" /> -->
        <Checking :info="baseInfo" :isDayOrNigint="dayOrNightStatus" :kaoqinList="kaoqinList" :kaoqinListSubCenter="kaoqinListSubCenter" />
      </div>
      <div class="index_right">
        <attendance :dayInfo="dayEchartsDataRight" :monthInfo="monthEchartsDataRight" :yearInfo="yearEchartsDataRight" />
      </div>
    </div>
    <!-- main end -->
    <!-- 加工中心 start -->
    <MachingCenter @selectName="selectedCenterName" @centernamelen="getCenterNameLen" />
    <!-- 加工中心 end -->
  </div>
</template>

<script>
import moment from 'moment'
import AbnormalStatistics from '@/baobiaoPages/checking20190218/AbnormalStatistics'
import Attendance from '@/baobiaoPages/checking20190218//Attendance'
import Checking from '@/baobiaoPages/checking20190218/Checking'
import MachingCenter from '@/baobiaoPages/checking20190218/MachingCenter'
import http from '../../api/http'
import {getCookieInfo} from '../../api/getCookie'
import {
  // getAttendanceData,
  // getLateEchartsOfYear,
  getAbsentList1,
  getLateList,
  getChangeWorkList,
  getOutList
} from '../../api/baobiao/checkingApi'
export default {
  name: 'home',
  components: {
    AbnormalStatistics,
    Attendance,
    Checking,
    MachingCenter
  },
  data () {
    return {
      centername: '', // 加工中心
      baseInfo: {}, // 基本信息
      monthDataLeft: {}, // 左侧异常月数据
      yearDataLeft: {}, // 左侧异常年数据
      dayEchartsDataRight: {}, // 右侧日echarts图
      monthEchartsDataRight: {}, // 右侧月echarts图
      yearEchartsDataRight: {}, // 右侧年echarts图
      hourEchartsDataBetween: {}, // 中间一小时考勤
      timerId: '', // 定时器
      timerIdHour: '', // 中间小时的定时器
      currentTime: '', // 系统当前时间
      dayOrNightStatus: '', // 白班或夜班
      centernameLen: '', // 加工中心个数
      kaoqinList: {
        lateList: [], // 迟到
        leaveList: [], //早退
        absentList: [], //旷工
        abnormalList: [] //未派工
      },
      kaoqinListSubCenter: {
        leaveData: { // 离岗
          leaveList: [],
          pagination: {}
        },
        lateData: { // 迟到
          lateList: [],
          pagination: {}
        },
        absentData: { //旷工
          absentList: [],
          pagination: {}
        },
        abnormalData: { //未派工
          abnormalList: [],
          pagination: {}
        }
        
      },
      allCenterList: [], // 所有加工中心列表
      selectedSumcompany: '北京桩机',
      allCenterNameLen: '' // 所有加工中心的长度
    }
  },
  created () {
  },
  mounted () {
    
    // 顶部日期时间
    this.currentTime = this.getCurrentDateTime()
    this.cutTimeFun()
    setInterval(() => {
      this.currentTime = this.getCurrentDateTime()
      this.cutTimeFun()
    }, 1000)

    // 基本信息顶部
    this.getBaseInfoData(this.centername)

    // 左侧异常年
    this.getYearLeftData(this.centername)

    // 右侧日/月/年统计/左侧异常月(数据在右侧月统计里面)
    this.getDayRightData(this.centername)
    this.getMonthRightData(this.centername)
    this.getYearRightData(this.centername)

    // 获取所有加工中心数据
    this.getCenterNameData()

    // 定时器刷新
    /* this.timerId = setInterval(() => {
      this.getBaseInfoData(this.centername)
      this.getYearLeftData(this.centername)
      this.getDayRightData(this.centername)
      this.getMonthRightData(this.centername)
      this.getYearRightData(this.centername)
    }, 10000) */
  },
  methods: {
    enterIndexPage (path) {
      // 路径从state中获取
      // window.location.href = `${this.$store.state.baseUrl}/sanyShebei` // 测试
      this.$router.replace(path)
    },
    // 时间格式化
    getCurrentDateTime () {
      return moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    },
    /**
     * 方法名：cutTimeFun
     * 描述：判断是白班还是夜班
     */
    cutTimeFun () {
      var timeY = this.currentTime.substring(11, 13)
      if (timeY >= 8 && timeY < 20) {
        this.dayOrNightStatus = '白班'
      } else {
        this.dayOrNightStatus = '夜班'
      }
    },
    // 基本信息顶部
    async getBaseInfoData (centername) {
      let axiosUrl = getCookieInfo().baseUrl + '/sanyAttendanceData/getAttendanceData'
      // let axiosUrl = 'http://10.88.195.89:8083/sanyAttendanceData/getAttendanceData'
      // console.log('基本信息顶部:',axiosUrl)
      const res = await http.post(axiosUrl, { centername: centername })
      // const res = await http.post('/sanyAttendanceData/getAttendanceData', { centername: centername })
      if (res.data && res.data.ret === '200') {
        this.baseInfo = res.data.titledata
      }
    },
    // 左侧异常年
    async getYearLeftData (centername) {
      let axiosUrl = getCookieInfo().baseUrl + '/sanyUserPushRecord/getLateEchartsOfYear'
      const res = await http.post(axiosUrl, { centername: centername })
      // const res = await http.post('/sanyUserPushRecord/getLateEchartsOfYear', { centername: centername })
      if (res.data && res.data.ret === '200') {
        this.yearDataLeft = res.data
      }
    },
    // 右侧人员考勤日统计
    async getDayRightData (centername) {
      let axiosUrl = getCookieInfo().baseUrl + '/sanyUserPushRecord/getWorkEchartsOfDay'
      const res = await http.post(axiosUrl, { centername: centername })
      // const res = await http.post('/sanyUserPushRecord/getWorkEchartsOfDay', { centername: centername })
      if (res.data && res.data.ret === '200') {
        // console.log('uuuu:',res)
        this.dayEchartsDataRight = res.data
        this.dayEchartsDataRight.totalNum = this.baseInfo.totalNum
      }
    },
    // 右侧人员考勤月统计
    async getMonthRightData (centername) {
      let axiosUrl = getCookieInfo().baseUrl + '/sanyUserPushRecord/getWorkEchartsOfMonth'
      const res = await http.post(axiosUrl, { centername: centername })
      // const res = await http.post('/sanyUserPushRecord/getWorkEchartsOfMonth', { centername: centername })
      if (res.data && res.data.ret === '200') {
        this.monthEchartsDataRight = res.data
        this.monthEchartsDataRight.totalNum = this.baseInfo.totalNum

        // 左侧人员考勤异常月统计
        this.monthDataLeft = res.data
      }
    },
    // 右侧人员考勤年统计
    async getYearRightData (centername) {
      let axiosUrl = getCookieInfo().baseUrl + '/sanycountworkplanexecute/queryYear'
      const res = await http.post(axiosUrl, { centername: centername })
      // const res = await http.post('/sanycountworkplanexecute/queryYear', { centername: centername })
      if (res.data && res.data.ret === '200') {
        this.yearEchartsDataRight = res.data.data
        this.monthEchartsDataRight.totalNum = this.baseInfo.totalNum
      }
    },
    // 获取加工中心列表
    async getCenterNameData () {
      let axiosUrl = getCookieInfo().baseUrl + '/userMessage/getCenternameList'
      const res = await http.get(axiosUrl)
      // console.log('获取的所有加工中心2：',res)
      if (res && res.data && res.data.ret === '200') {
        const {centernameList, ret} = res.data
        this.allCenterList = centernameList.map((ele) => {
          return ele.threeleveldep
        })
        this.$store.commit('changeAllCenterListMut', this.allCenterList)
        // 获取人员考勤列表
        this.allCenterNameLen = this.allCenterList.length
        this.getAbnormaData()
      }
      
      // console.log('获取的所有加工中心2：',centernameList,ret)
    },
    // 获取人员在岗列表
    async getAbnormaData () {
      let axiosUrl = getCookieInfo().baseUrl + '/sanyAttendanceData/getAbnormaData'+ '?end='+this.$store.state.allCenterList.length
      const res = await http.get(axiosUrl)
      if (res && res.data) {
        const {ret, data} = res.data
        if (res && ret === '200') {
          this.kaoqinList.lateList = data.lateList // 迟到
          this.kaoqinList.leaveList = data.leaveList //早退
          this.kaoqinList.absentList = data.absentList //旷工
          this.kaoqinList.abnormalList = data.abnormalList //未派工
        }
      }
    },


// 


    // 获取旷工数据
    async getAbsentLateLeaveChangeworkList () {
      let centerNameFromCentername = this.$store.state.centername
      let currentTimeDate = this.currentTime.substring(0,10)
      // 获取旷工
      const resAbsentList = await getAbsentList1(centerNameFromCentername,this.dayOrNightStatus, currentTimeDate, 1, 1000)
      if (resAbsentList && resAbsentList.data.ret === '200') {
        // console.log('获取的旷工数据:', res)
        this.kaoqinListSubCenter.absentData = {
          absentList: resAbsentList.data.getAbsentList,
          pagination: {
            total: resAbsentList.data.total
          }
        }
      }    

      // 获取迟到
      const resLateList = await getLateList(centerNameFromCentername,this.dayOrNightStatus, currentTimeDate, 1, 1000)
      if (resLateList && resLateList.data.ret === '200') {
        // console.log('获取的迟到数据:', resLateList) // workno
        this.kaoqinListSubCenter.lateData = {
          lateList: resLateList.data.lateList,
          pagination: {
            total: resLateList.data.total
          }
        }
      }
      
      // 获取离岗
      const resOutList = await getOutList(centerNameFromCentername, 1, 1000)
      if (resOutList && resOutList.data.ret === '200') {
        // console.log('获取的离岗数据:', resOutList) // workno
        this.kaoqinListSubCenter.leaveData = {
          leaveList: resOutList.data.data.list,
          pagination: {
            total: resOutList.data.data.totalCount
          }
        }       
      }

      // 获取未派工
      const resChangeWorkList = await getChangeWorkList(centerNameFromCentername,this.dayOrNightStatus, currentTimeDate, 1, 1000)
      if (resChangeWorkList && resChangeWorkList.data.ret === '200') {
        // console.log('获取的未派工即调班数据:', resChangeWorkList) // workno
        this.kaoqinListSubCenter.abnormalData = {
          abnormalList: resChangeWorkList.data.changeWorkList,
          pagination: {
            total: resChangeWorkList.data.total
          }
        }
      }
    },
    // 点击加工中心重新请求数据
    selectedCenterName (centername) {
      this.centername = centername
      this.$store.commit('changeCenterNameMut',centername)
      // 重新加载数据
      this.getBaseInfoData(this.centername)
      this.getYearLeftData(this.centername)
      this.getDayRightData(this.centername)
      this.getMonthRightData(this.centername)
      this.getYearRightData(this.centername)

      if (this.$store.state.centername!=='') {
        // 获取(旷工/迟到/离岗/未派工)数据
        this.getAbsentLateLeaveChangeworkList()
      } else {
        this.getAbnormaData()
      }
    },
    // 获取加工中心个数
    getCenterNameLen (centernameLen) {
      this.centernameLen = centernameLen
    }
  },
  destroyed () {
    clearInterval(this.timerId)
    clearInterval(this.timerIdHour)
  }
}
</script>
<style lang="scss" scoped>
.index{
  height:100%;
  background-image: url(../../assets/images/index_bg.png);
  background-size: cover;
  color: rgb(255, 255, 255);
  background-repeat: no-repeat;overflow: hidden;
  &_top{
    position: fixed;top:0;left:15px;right:15px;box-sizing: border-box;
    height: 106px;line-height: 106px;text-align: center;
    .title{font-size:44px;color:#fff;cursor: pointer;font-weight:bold;}
    .time{
      font-size:32px;
      color:#ababab;position: fixed;top:28px;right:210px;z-index: 10;width: 250px;text-align: left;
      font-family: fontnameUnidreamLED !important;
    }
    .dayOrnight{
      position: absolute;top:30px;left:0;
      img{vertical-align: middle;width: 86px;}
      span{
        font-size:34px;color:#ababab;
        vertical-align: middle;margin-left:-10px;
      }
    }
  }
  &_main{
    position: fixed;top:120px;left:15px;right:15px;bottom:15px;
    // bottom:15px;
    // border-top:1px solid red;
  }
  &_left{
    width: 24%;float: left;height:100%;
    // border:1px solid #ff0;
  }
  &_con{
    width: 51%;
    padding-left: 15px;
    padding-right: 15px;
    float: left;
    height: 100%;
    // border:1px solid #ff0;
  }
  &_right{
    width: 25%;float: left;height:100%;
    // border:1px solid #ff0;
  }

}
</style>
