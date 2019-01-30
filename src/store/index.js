import Vue from 'vue'
import Vuex from 'vuex'
// import 'babel-polyfill'

import {setCookie, delCookie} from '../util/cookie' //引用刚才我们创建的util.js文件，并使用getCookie方法
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    adminObj: {
      username: '', // 用户名
      ipAddress: '', // ip
      port: '', // 端口号
      token: '', // token
      remark: '' // 设置管理员标识
    }, //管理页信息
  },
  mutations: {
    // 设置登陆信息
    loginMuta (state, item) {
      state.adminObj = item;
      // sessionStorage.setItem('token', state.adminObj.token)

      // 设置cookie
      let expireDays = 1000 * 60 * 60 * 24 * 30; // 过期时间
      setCookie('username',state.adminObj.username,expireDays); //设置用户名
      setCookie('ipAddress',state.adminObj.ipAddress,expireDays); //设置请求地址
      setCookie('port',state.adminObj.port,expireDays); //设置端口号
      setCookie('remark', state.adminObj.remark, expireDays) // 设置管理员标识
    },
    // 注销登陆
    logoutMuta (state) {
      state.adminObj = {};
      // sessionStorage.removeItem('token')

      // 删除cookie
      delCookie('username')
      delCookie('ipAddress')
      delCookie('port')
      delCookie('remark')
    }
  },
  actions: {
    loginAction ({ commit }, item) {
      commit('loginMuta', item)
    }
  }
})
export default store;