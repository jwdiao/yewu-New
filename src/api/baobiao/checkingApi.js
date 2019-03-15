import http from '../http'
import {getCookieInfo} from '../getCookie'
// debugger;
const baseUrlFromCookie = getCookieInfo().baseUrl


/* // 旷工
export const getAbsentList1 = (centerName,workType, stopTime, page, pagesize) => http.post(baseUrlFromCookie + '/sanyUserPushRecord/getAbsentList1',{
  centername: centerName,workType: workType, stopTime: stopTime, page: page, pagesize: pagesize
})
// 迟到
export const getLateList = (centerName,workType, stopTime, page, pagesize) => http.post(baseUrlFromCookie +'/sanyUserPushRecord/getLateList',{
  centerName: centerName,workType: workType, stopTime: stopTime, page: page, pagesize: pagesize
})
// 未派工
export const getChangeWorkList = (centerName,workType, stopTime, page, pagesize) => http.post(baseUrlFromCookie +'/sanyUserPushRecord/getChangeWorkList',{
  centerName: centerName,workType: workType, stopTime: stopTime, page: page, pagesize: pagesize
})
// 离岗
export const getOutList = (centerName, page, pagesize) => http.post(baseUrlFromCookie +'/sanyUserPushRecord/getOutList',{
  centerName: centerName, page: page, pagesize: pagesize
}) */


///////////////////////////////////////////////////////////////

// 基本信息
export const getAttendanceData = (centername) => http.post(baseUrlFromCookie + '/sanyAttendanceData/getAttendanceData', { centername: centername })
// 左侧异常年
export const getLateEchartsOfYear = (centername) => http.post(baseUrlFromCookie + '/sanyUserPushRecord/getLateEchartsOfYear', { centername: centername })


// 右侧==人员考勤日统计
export const getWorkEchartsOfDay = (centername) => http.post(baseUrlFromCookie + '/sanyUserPushRecord/getWorkEchartsOfDay', { centername: centername })
// 右侧==人员考勤月统计
export const getWorkEchartsOfMonth = (centername) => http.post(baseUrlFromCookie + '/sanyUserPushRecord/getWorkEchartsOfMonth', { centername: centername })
// 右侧==人员考勤年统计
export const queryYear = (centername) => http.post(baseUrlFromCookie + '/sanycountworkplanexecute/queryYear', { centername: centername })
// 右侧==获取所有的加工中心
export const getCenternameList = () => http.get(baseUrlFromCookie + '/userMessage/getCenternameList')
// 右侧==能源日/月/年统计（当点击能源列表的tab时才显示出来）
export const byDayMonthAndYearEnergy = (param) => http.post(baseUrlFromCookie + '/energy/getEnergy/byDayMonthAndYear', {
  centerName: param.centerName,
  queryFlag: param.queryFlag // queryFlag固定值：'day'|'month'|'year'
})


// 中间==人员考勤查询==以图搜人
export const searchUserRecordHis = (workname, workno) => http.post(baseUrlFromCookie + '/sanyUserPushRecord/searchUserRecordHis',{
  workname: workname,
	workno: workno
})


// 中间==人员考勤列表==加工中心为全部工作中心时显示各个加工中心的数据queryDay(考勤和历史考勤页面公用)
// export const getAbnormaDataObj = (centernameNum) => http.get('/sanyAttendanceData/getAbnormaData'+ '?end='+centernameNum)
export const getAbnormaDataObj = (end, queryDay) => http.get(queryDay ? baseUrlFromCookie + '/sanyAttendanceData/getAbnormaData?end='+end+'&queryDay='+queryDay:baseUrlFromCookie + '/sanyAttendanceData/getAbnormaData?end='+end )
// 中间==人员考勤列表==加工中心为子工作中心时旷工列表(考勤和考勤历史页面公用)
export const getAbsentList1 = (centerName,workType, stopTime, page, pagesize) => http.post(baseUrlFromCookie + '/sanyUserPushRecord/getAbsentList1',{
  centername: centerName,workType: workType, stopTime: stopTime, page: page, pagesize: pagesize
})
// 中间==人员考勤列表==加工中心为子工作中心时迟到列表(考勤和考勤历史页面公用)
export const getLateList = (centerName,workType, stopTime, page, pagesize) => http.post(baseUrlFromCookie + '/sanyUserPushRecord/getLateList',{
  centerName: centerName,workType: workType, stopTime: stopTime, page: page, pagesize: pagesize
})
// 中间==人员考勤列表==加工中心为子工作中心时未派工列表(考勤和考勤历史页面公用)
export const getChangeWorkList = (centerName,workType, stopTime, page, pagesize) => http.post(baseUrlFromCookie + '/sanyUserPushRecord/getChangeWorkList',{
  centerName: centerName,workType: workType, stopTime: stopTime, page: page, pagesize: pagesize
})
// 中间==人员考勤列表==加工中心为子工作中心时离岗列表(考勤和考勤历史页面公用)
export const getOutList = (params) => params.queryDay ? http.post(baseUrlFromCookie + '/sanyUserPushRecord/getOutList',{
  centerName: params.centerName,
  queryDay: params.queryDay,
  page: params.page,
  pagesize: params.pagesize
}) : http.post(baseUrlFromCookie + '/sanyUserPushRecord/getOutList',{
  centerName: params.centerName,
  page: params.page,
  pagesize: params.pagesize
})

// 中间==人员考勤雷达图==加工中心为全部工作中心时(考勤页面和考勤历史页面都用该接口)
// export const getRecordRadarChart = (end) => http.get('/sanyAttendanceData/getRecordRadarChart?end='+end)
export const getRecordRadarChart = (end, queryDay) => http.get(queryDay ? baseUrlFromCookie + '/sanyAttendanceData/getRecordRadarChart?end='+end+'&queryDay='+queryDay:baseUrlFromCookie + '/sanyAttendanceData/getRecordRadarChart?end='+end )