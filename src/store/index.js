import Vue from 'vue'
import Vuex from 'vuex'

import {setCookie, delCookie} from '../util/cookie' //引用刚才我们创建的util.js文件，并使用getCookie方法
import http from '../api/http'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    adminObj: {
      username: '', // 用户名
      ipAddress: '', // ip
      port: '', // 端口号
      token: '', // token
      remark: '', // 设置管理员标识
    }, //管理页信息
     /**========================考勤页面checking start==========================**/
     centername: '', // 当前选中的加工中心
     allCenterList: [], // 加工中心列表
     selectedSubcompany: '', // 选中的子公司
     selectedTabCheckingBetween: 'kaoqin', // 考勤页面选中的tab项
     checkRadarList:[],//考勤雷达图
     energyListData: {
       list: [],
       totalCount: 0,
       page: 1
     }, // 能源指标列表
     energyDayEchartsData: {
       xAxis: [], // x轴
       bootRate: [], // 开机率
       workRate: [], // 作业率
       totalConsumPower: [] // 能耗

     }, // 能源本日数据
     energyMonthEchartsData: {
       xAxis: [], // x轴
       bootRate: [], // 开机率
       workRate: [], // 作业率
       totalConsumPower: [] // 能耗
     }, // 能源本月数据
     energyYearEchartsData: {
       xAxis: [], // x轴
       bootRate: [], // 开机率
       workRate: [], // 作业率
       totalConsumPower: [] // 能耗
     }, // 能源本年数据
     /**========================考勤页面checking end==========================**/
     /**========================考勤页面checkingHistory start==========================**/
     checkingHistoryQueryDate: '', // 顶部查询日期
     checkingHistoryQueryFlag: 'DAY' // 顶部白夜班标识
     /**========================考勤页面checkingHistory end==========================**/
  },
  mutations: {
    // 设置登陆信息
    loginMuta (state, item) {
      state.adminObj = item;

      // 设置cookie
      let expireDays = 1000 * 60 * 60 * 24 * 365; // 过期时间
      setCookie('username',state.adminObj.username,expireDays); //设置用户名
      setCookie('ipAddress',state.adminObj.ipAddress,expireDays); //设置请求地址
      setCookie('port',state.adminObj.port,expireDays); //设置端口号
      setCookie('remark', state.adminObj.remark, expireDays) // 设置管理员标识
    },
    // 注销登陆
    logoutMuta (state) {
      state.adminObj = {};

      // 删除cookie
      delCookie('username')
      delCookie('ipAddress')
      delCookie('port')
      delCookie('remark')
    },
    /**========================考勤页面checking start==========================**/
    // 改变加工中心
    changeCenterNameMut (state, val){
      state.centername = val
    },
    // 改变加工中心列表
    changeAllCenterListMut (state, val){
      state.allCenterList = val
    },
    // 改变子公司
    changeSubcompanyMut (state, val){
      state.selectedSubcompany = val
    },
    // 改变选中的tab
    changeSelectTabCheckingBetweenMut (state, val){
      state.selectedTabCheckingBetween = val
    },
    // 考勤列表雷达图
		getRadarChartsMut(state,res){
			if (res && res.status === 200) {
				if (res.data && res.data.ret === "200") {
					   state.checkRadarList = res.data.data
				}
			}
    },
    // 改变考勤历史页面查询日期
    changeCheckingHistoryQueryDateMut (state, val){
      state.checkingHistoryQueryDate = val
    },
    // 改变考勤历史页面白夜班标识
    changeCheckingHistoryQueryFlagMut (state, val){
      state.checkingHistoryQueryFlag = val
    },
    /**========================考勤页面checking end==========================**/
  },
  actions: {
    loginAction ({ commit }, item) {
      commit('loginMuta', item)
    },
    /**========================考勤页面checking start==========================**/
		// 雷达图数据（考勤页面和考勤历史页面都用）
    async getRadarChartsAction({commit}, params){
      const res = await http.get('/sanyAttendanceData/getRecordRadarChart?end='+params.end )
      commit('getRadarChartsMut', res)
    }
    /**========================考勤页面checking end==========================**/
  }
})
export default store;
