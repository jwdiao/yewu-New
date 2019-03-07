import http from './http'

// 基本信息
export const getAttendanceData = (centername, queryDay, queryFlag) => http.post('/sanyAttendanceData/getAttendanceData/history', {
  centername: centername,
  queryDay: queryDay,
  queryFlag: queryFlag
})


// 右侧==人员考勤日统计
export const getWorkEchartsOfHistoryDay = (centername, date, workType) => http.post('/sanyUserPushRecord/getWorkEchartsOfHistoryDay', {
  centername: centername,
  date: date,
  workType: workType
})
// 右侧==人员考勤月统计=左侧人员考勤异常月统计
export const getWorkEchartsOfMonth = (centername,date) => http.post('/sanyUserPushRecord/getWorkEchartsOfMonth', {
  centername: centername,
  date: date
})