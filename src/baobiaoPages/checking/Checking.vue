<template>
  <div class="checking">
    <div class="checking_dashbordBox">
      <p class="home_title home_title-blue">
        人员考勤看板
        <span class="checking_total">计件总人数<em v-text="info.totalNum"></em></span>
      </p>
      <div class="checking_dashbord">
        <ul>
          <li>
            <div class="top">
              <!-- 白班 -->
              <div class="item" v-show="isDayOrNigint==='白班'">
                <span class="text">派工人数(白)</span>
                <em class="num" style="letter-spacing:-3px;" v-show="info&&info.planNum" v-text="info.planNum"></em>
                <em class="num" v-show="!info || !info.planNum">0</em>
              </div>
              <div class="item" v-show="isDayOrNigint==='白班'">
                <span class="text">派工人数(夜)</span>
                <em class="num" style="letter-spacing:-3px;" v-show="info&&info.nightPlanTotalNum" v-text="info.nightPlanTotalNum"></em>
                <em class="num" v-show="!info || !info.nightPlanTotalNum">0</em>
              </div>
              <!-- 白班 end -->
              <!-- 夜班 -->
              <div class="item" v-show="isDayOrNigint==='夜班'">
                <span class="text">派工人数(白)</span>
                <em class="num" style="letter-spacing:-3px;" v-show="info&&info.dayPlanTotalNum" v-text="info.dayPlanTotalNum"></em>
                <em class="num" v-show="!info || !info.dayPlanTotalNum">0</em>
              </div>
              <div class="item" v-show="isDayOrNigint==='夜班'">
                <span class="text">派工人数(夜)</span>
                <em class="num" style="letter-spacing:-3px;" v-show="info&&info.planNum" v-text="info.planNum"></em>
                <em class="num" v-show="!info || !info.planNum">0</em>
              </div>
              <!-- 夜班 end -->
            </div>
            <div class="bottom">
              <div class="lv lvBlue" id="jhkqlv"></div>
              <p class="lvText">派工率</p>
            </div>
          </li>
          <li>
            <div class="top">
              <div class="item">
                <span class="text">考勤人数</span>
                <em class="num" v-show="info&&info.userRecordNum" v-text="info.userRecordNum"></em>
                <em class="num" v-show="!info || !info.userRecordNum">0</em>
              </div>
              <div class="item">
                <span class="text">考勤时间</span>
                <em class="num" v-show="info&&info.recordTime" style="letter-spacing:-3px;">{{Math.round(info.recordTime*10)/10}}h</em>
                <em class="num" v-show="!info || !info.recordTime">0</em>
              </div>
            </div>
            <div class="bottom">
              <div class="lv lvYellow" id="kaoqinlv"></div>
              <p class="lvText">出勤率</p>
            </div>
          </li>
          <li>
            <div class="top" style="text-align:center;">
              <div class="item">
                <span class="text">有效在岗时间</span>
              </div>
              <div class="item">
                <p class="num" v-show="info&&info.onWorkTime" style="letter-spacing:-3px;">{{Math.round(info.onWorkTime*10)/10}}h</p>
                <p class="num" v-show="!info || !info.onWorkTime">0</p>
              </div>
            </div>
            <div class="bottom">
              <div class="lv lvBlue" id="zaiganglv"></div>
              <p class="lvText">在岗率</p>
            </div>
          </li>
          <li>
            <div class="top" style="text-align:center;">
              <div class="item">
                <span class="text">有效在岗人数</span>
              </div>
              <div class="item">
                <p class="num" v-show="info&&info.validNum" v-text="info.validNum"></p>
                <p class="num" v-show="!info || !info.validNum">0</p>
              </div>
            </div>
            <div class="bottom">
              <div class="lv lvYellow" id="yxsglv"></div>
              <p class="lvText">有效上岗率</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- <div class="checking_list">
      <div class="checking_list-top">
        <p class="home_title home_title-blue">{{chartShow}}</p>
        <div class="checking_list-search">
          <div class="search_btn">
            <div class="gosearch" @click="searchProInfo">搜索</div>
            <div class="clear" @click="clearProInfo">清空</div>
            <div class="kaoqin" @click="checking">考勤</div>
          </div>
          <div class="search_input">
            <input class="searchname" type="text" placeholder="姓名" ref="workname" @keyup="keyupevent">
            <input class="searchtext" type="text" placeholder="工号" ref="worknum" @keyup="keyupevent">
          </div>

        </div>
      </div>
      <div class="checking_list-bottom">

        <div id="echarts-time" class="checking_list-time" :class="{off:cameramap}"></div>

        <div class="checking_list-cameramap" id="checking_list-cameramap" :class="{off:!cameramap}">
          <ul class="camera-list" ref="camerawrap">
            <li v-show="cameraArr.indexOf('办公楼北侧门_人脸1')+1" class="camera camera1">
            </li>
            <li v-show="cameraArr.indexOf('办公楼北侧门_人脸2')+1" class="camera camera2">
            </li>
            <li v-show="cameraArr.indexOf('办公楼北大门_人脸1')+1"  class="camera camera3">
            </li>
            <li v-show="cameraArr.indexOf('办公楼北大门_人脸2')+1"  class="camera camera4">
            </li>
            <li v-show="cameraArr.indexOf('机加区西侧入口_人脸2')+1"  class="camera camera5">
            </li>
            <li v-show="cameraArr.indexOf('机加区西侧入口_人脸1')+1"  class="camera camera6">
            </li>
            <li v-show="cameraArr.indexOf('A2门_人脸1')+1"  class="camera camera7">
            </li>
            <li v-show="cameraArr.indexOf('A2门_人脸2')+1"  class="camera camera8">
            </li>
            <li v-show="cameraArr.indexOf('机加区东侧入口_人脸2')+1"  class="camera camera9">
            </li>
            <li v-show="cameraArr.indexOf('机加区东侧入口_人脸1')+1"  class="camera camera10">
            </li>
            <li v-show="cameraArr.indexOf('D4门_人脸1')+1"  class="camera camera11">
            </li>
            <li v-show="cameraArr.indexOf('D4门_人脸2')+1"  class="camera camera12">
            </li>
            <div :class="{off:isShow}" class="scrollProInfoItem">
              <div class="scrollProInfoItemInner">
                <div v-for="(proItem,index) in personInfoArr" :key="index" :class="`personInfo${index}`">
                  <div class="num">{{personInfoArr.length - index}}</div>
                  <img :src="proItem.snappicurl" alt="" >
                  <div class="information">
                    <div class="infoName">姓名: <span>{{proItem.workname}}</span></div>
                    <div class="infoNum">工号: <span>{{proItem.workno}}</span></div>
                    <div class="infoDepartment">部门: <span>{{proItem.department}}</span></div>
                    <div class="infoName">时间: <span>{{proItem.pushtime.substr(11,8)}}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </ul>
        </div>

      </div>
    </div> -->

    <div class="checking_wrapper">
      <ul class="checking_tab">
        <li @click="currentTab = 'kaoqin'" :class="{'checking_tab-selected': currentTab === 'kaoqin'}"><p class="home_title">人员在岗列表</p></li>
        <!-- <li @click="currentTab = 'guiji'" :class="{'checking_tab-selected': currentTab === 'guiji'}" ><p class="home_title" >人员轨迹图表</p></li> -->
      </ul>

      <div class="checking_job" v-show="currentTab === 'kaoqin'">
        <div class="checking_item">
          <p class="checking_item-title">迟到</p>
          <ul  class="checking_item-wrapper">
            <el-scrollbar style="height:100%;">
            <li v-for="item in lateList" :key="item.id">
              <span v-text="item.centerName"></span>
              <em v-text="item.lateNum"></em>
            </li>
            </el-scrollbar>
          </ul>
        </div>
        <div class="checking_item">
          <p class="checking_item-title">早退</p>
          <ul  class="checking_item-wrapper">
            <el-scrollbar style="height:100%;">
            <li v-for="item in leaveList" :key="item.id">
              <span v-text="item.centerName"></span>
              <em v-text="item.outNum"></em>
            </li>
            </el-scrollbar>
          </ul>
        </div>
        <div class="checking_item">
          <p class="checking_item-title">旷工</p>
          <ul  class="checking_item-wrapper">
            <el-scrollbar style="height:100%;">
            <li v-for="item in absentList" :key="item.id">
              <span v-text="item.centerName"></span>
              <em v-text="item.absentNum"></em>
            </li>
            </el-scrollbar>
          </ul>
        </div>
        <div class="checking_item">
          <p class="checking_item-title">未派工</p>
          <ul  class="checking_item-wrapper">
            <el-scrollbar style="height:100%;">
            <li v-for="item in abnormalList" :key="item.id">
              <span v-text="item.centerName"></span>
              <em v-text="item.abnormalNum"></em>
            </li>
            </el-scrollbar>
          </ul>
        </div>
      </div>

      <div class="checking_cameramap" v-show="currentTab === 'guiji'">
        <div class="checking_list-search">
          <div class="search_btn">
            <div class="gosearch" @click="searchProInfo">搜索</div>
            <div class="clear" @click="clearProInfo">清空</div>
          </div>
          <div class="search_input">
            <input class="searchname" type="text" placeholder="姓名" ref="workname" @keyup="keyupevent">
            <input class="searchtext" type="text" placeholder="工号" ref="worknum" @keyup="keyupevent">
          </div>
        </div>
        <div class="checking_list-cameramap" id="checking_list-cameramap">
          <ul class="camera-list" ref="camerawrap">
            <li v-show="cameraArr.indexOf('办公楼北侧门_人脸1')+1" class="camera camera1">
            </li>
            <li v-show="cameraArr.indexOf('办公楼北侧门_人脸2')+1" class="camera camera2">
            </li>
            <li v-show="cameraArr.indexOf('办公楼北大门_人脸1')+1"  class="camera camera3">
            </li>
            <li v-show="cameraArr.indexOf('办公楼北大门_人脸2')+1"  class="camera camera4">
            </li>
            <li v-show="cameraArr.indexOf('机加区西侧入口_人脸2')+1"  class="camera camera5">
            </li>
            <li v-show="cameraArr.indexOf('机加区西侧入口_人脸1')+1"  class="camera camera6">
            </li>
            <li v-show="cameraArr.indexOf('A2门_人脸1')+1"  class="camera camera7">
            </li>
            <li v-show="cameraArr.indexOf('A2门_人脸2')+1"  class="camera camera8">
            </li>
            <li v-show="cameraArr.indexOf('机加区东侧入口_人脸2')+1"  class="camera camera9">
            </li>
            <li v-show="cameraArr.indexOf('机加区东侧入口_人脸1')+1"  class="camera camera10">
            </li>
            <li v-show="cameraArr.indexOf('D4门_人脸1')+1"  class="camera camera11">
            </li>
            <li v-show="cameraArr.indexOf('D4门_人脸2')+1"  class="camera camera12">
            </li>
            <div :class="{off:isShow}" class="scrollProInfoItem">
              <div class="scrollProInfoItemInner">
                <div v-for="(proItem,index) in personInfoArr" :key="index" :class="`personInfo${index}`">
                  <div class="num">{{personInfoArr.length - index}}</div>
                  <img :src="proItem.snappicurl" alt="" >
                  <div class="information">
                    <div class="infoName">姓名: <span>{{proItem.workname}}</span></div>
                    <div class="infoNum">工号: <span>{{proItem.workno}}</span></div>
                    <div class="infoDepartment">部门: <span>{{proItem.department}}</span></div>
                    <div class="infoName">时间: <span>{{proItem.pushtime.substr(11,8)}}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import http from '../../api/http'
import {getCookieInfo} from '../../api/getCookie'
import $ from 'jquery'
export default {
  name: 'checking',
  // props: ['info', 'hourEchartsDataBetween', 'isDayOrNigint'],
  props: ['info', 'isDayOrNigint', 'centerLen'],
  watch: {
    info () {
      // 如果有基本信息，渲染中间顶部的4个echarts图
      if (this.info) {
        this.renderEchartsCircle()
      }
    },
    // 加工中心个数
    centerLen (val) {
      this.centerNameLen = val
      if (this.centerNameLen) {
        this.getAbnormaData()
      }
    }
    /* hourEchartsDataBetween () { //1小时考勤
      if (this.hourEchartsDataBetween) {
        this.hourEchartsData = {
          secData: this.hourEchartsDataBetween.xAxis, // X轴
          numData: this.hourEchartsDataBetween.dateStr, // 在岗人数
          lvData: this.hourEchartsDataBetween.dateStrval, // 在岗率
          max: this.hourEchartsDataBetween.max,
          interval: this.hourEchartsDataBetween.interval
        }
        var hourEcharts = echarts.init(document.getElementById('echarts-time'))
        this.hourEchartsArr.push(hourEcharts)
        this.renderEchartsHour(hourEcharts, this.hourEchartsData)
      }
    } */
  },
  data () {
    return {
      arr: [
        {
          name: '上岗率',
          // icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAMAAACDi47UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Nzc3M0EwNkZGNDZCMTFFOEE4MENDQzE4QTFFMTYzM0YiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Nzc3M0EwNzBGNDZCMTFFOEE4MENDQzE4QTFFMTYzM0YiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NzczQTA2REY0NkIxMUU4QTgwQ0NDMThBMUUxNjMzRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3NzczQTA2RUY0NkIxMUU4QTgwQ0NDMThBMUUxNjMzRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnqnvUsAAAAGUExURQ3M6v///4xgKIUAAAACdFJOU/8A5bcwSgAAABZJREFUeNpiYMQCGIgXpAWgzEkAAQYAMgoAedKY9esAAAAASUVORK5CYII=\n'
          icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAMAAACDi47UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjQ3NjZBN0JGNDY5MTFFOEJCNjM4QzFDNjc4NzQyM0UiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjQ3NjZBN0NGNDY5MTFFOEJCNjM4QzFDNjc4NzQyM0UiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCNDc2NkE3OUY0NjkxMUU4QkI2MzhDMUM2Nzg3NDIzRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCNDc2NkE3QUY0NjkxMUU4QkI2MzhDMUM2Nzg3NDIzRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Po8SnNMAAAA/UExURf/LF//NF//eHP/KFv/SGf/OGP/aG//UGf/WGv/jHv/rIP/IFv/QGP/YGv/lHv/pH//cHP/nH//hHf/tIP///9HlZOcAAAAVdFJOU///////////////////////////ACvZfeoAAAAqSURBVHjaYhDBAhiIFxTm4hfk4xRiEmDj5WBn4WFlZGDmplSQMicBBBgAF/kMWUwXodQAAAAASUVORK5CYII='

        },
        // 图例的样式设置
        {
          name: '在岗人数',
          icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADsAAAAcCAIAAABQ7lBqAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABN0lEQVR42u3YPUvDQBzH8b4HAwp2sIggOlR8AFNJYnx5vZTSKEivOFSrS+lQEDLUwWYzDTS0Je1QF8G8Dg9+zb/g46JovYPPlhu+w3G5+2e0pCwsPTugJaVX6NMna+aeyrD86EJ2yEkuqMNGtwnb3i3kW3ewe30Pei0Awx2AzUZCZhGLS98pLV6ZnsHqiJO1Xh2oeMtrQ77VgYOGD0fVEIxKH07YRFDFEhbvX3WhwAMwTiOwi2NBFctcrNdCmBezWFDFMhcXeAhUbLHYUsWyF6enW/rPs9hYUMUyF+vVBzDdCI6diaCKZS4+5D0w3QH89dPtHxV//Tz+tZvQ7C1N+3j2llbFP1+cjlGKoCXsjQ9nLu8spgnL9ByywwuSCy9h3b+BTa8NO80O7DV8oH1sVyIwnVhYvOIXO0QEvs58x+cAAAAASUVORK5CYII=' }
      ],
      validRateObj: {}, // 有效上岗率 ====
      recordRateObj: {}, // 考勤率 ====
      workPlanRateObj: {}, // 计划考勤率======
      onWorkRateObj: {}, // 在岗率====
      hourEchartsData: {
        secData: '',
        numData: '',
        lvData: '',
        max: '',
        interval: ''
      },
      hourEchartsArr: [], // 小时echarts
      cameraArr: [], // 存放摄像头名称的数组
      personInfoArr: [], // 存放同一个工人的个人信息
      cameramap: false, // false是曲线图   true是摄像头平面图
      isShow: false, // 显示个人信息框
      inputFun: '',
      recordList: [], // 后台返回的数据类型
      cameraAllArr:['办公楼北侧门_人脸1','办公楼北侧门_人脸2','办公楼北大门_人脸1','办公楼北大门_人脸2','机加区西侧入口_人脸2','机加区西侧入口_人脸1','A2门_人脸1','A2门_人脸2','机加区东侧入口_人脸2','机加区东侧入口_人脸1','D4门_人脸1','D4门_人脸2'],
      currentTab: 'kaoqin',
      lateList: [], // 迟到
      leaveList: [], // 早退
      absentList: [], // 旷工
      abnormalList: [], //未派工
      centerNameLen: this.centerLen // 加工中心个数
    }
  },
  components: {},
  computed: {},
  created () {
  },
  mounted () {
    window.addEventListener('resize', this.handleResize) // 给window对象绑定resize事件
    this._focusColor()

    // 获取人员在岗列表
    
  },
  methods: {
    handleResize () {
      this.hourEchartsArr.forEach((ele, index) => {
        ele.resize()
      })
      this._setcameraposition()
    },
    // 监测摄像头位置
    _setcameraposition () {
      var divTop = $('.checking_list-cameramap').height()
      var divLeft = $('.checking_list-cameramap').width()
      var singleTop = divTop / 4
      var singleH = singleTop / 5
      var singleLeft = divLeft / 3
      var singleL = singleLeft / 3
      $('.camera1').css({ top: '5px', left: '50px' })
      $('.camera2').css({ top: (singleTop - singleH) + 'px', left: '10px' })
      $('.camera3').css({ top: (singleTop * 2 - 2 * singleH) + 'px', left: '80px' })
      $('.camera4').css({ top: (singleTop * 2 + 3 * singleH) + 'px', left: (singleLeft - 2.8 * singleL) + 'px' })
      $('.camera5').css({ top: (singleTop * 3 - 2 * singleH) + 'px', left: (singleLeft - 2 * singleL) + 'px' })
      $('.camera6').css({ top: (singleTop * 3 + 0.2 * singleH) + 'px', left: (singleLeft - singleL) + 'px' })
      $('.camera7').css({ top: '5px', left: (singleLeft + singleL) + 'px' })
      $('.camera8').css({ top: (singleTop - singleH) + 'px', left: (singleLeft + 0.4 * singleL) + 'px' })
      $('.camera9').css({ top: (singleTop * 2 - singleH) + 'px', left: (singleLeft * 2 - 2 * singleL) + 'px' })
      $('.camera10').css({ top: (singleTop * 3 + 0.2 * singleH) + 'px', left: (singleLeft * 2 - 0.2 * singleL) + 'px' })
      $('.camera11').css({ top: '5px', left: (singleLeft * 3 - 2.8 * singleL) + 'px' })
      $('.camera12').css({ top: (singleTop - singleH) + 'px', left: (singleLeft * 2 - 0.2 * singleL) + 'px' })
      // console.log(divTop,divLeft)
    },
    /* 四个考勤率 */
    renderClock (dom, data) {
      var myChart = echarts.init(dom)
      var option = null
      option = {
        tooltip: {
          formatter: '{a} {b} : {c}%',
          confine: true // 是否将tooltip框限制在图表的区域内
        },
        toolbox: {
          show: true
        },
        series: [
          {
            name: data.name,
            type: 'gauge',
            radius: '100%',
            rich: {
              color: '#fff'
            },
            axisLabel: {
              show: false
            },
            itemStyle: {
              // color: data.color, //指针颜色
              length: 5
            },
            axisTick: {
              show: false
            },
            emphasis: {
              itemStyle: {
                color: '#fff'
              }
            },
            axisLine: { // 仪表盘轴线相关配置。
              show: false,
              lineStyle: {
                width: 0,
                // 0% 处的颜色
                color: [[1, new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: data.color.startColor }, { offset: 1, color: data.color.endColor }], false)]]
                // color: [[1,'#ff820d']]
              },
              length: 5
            },
            splitLine: {
              show: false
            },
            pointer: {
              width: 4
            },
            detail: { formatter: '{value}%', color: '#fff', offsetCenter: [0, '70%'], fontSize: 20 },
            data: [{ value: data.value, name: '' }]
          }
        ]
      }
      if (option && typeof option === 'object') {
        myChart.setOption(option, true)
      }
    },
    /* 四个考勤率 */
    renderEchartsCircle () {
      // 计划考勤率 jhkqlv
      var jhkqlvEcharts = document.getElementById('jhkqlv')
      this.workPlanRateObj = {
        name: '计划考勤率',
        // color: '#0097ff',
        color: {
          startColor: '#0090ff',
          endColor: '#00e2ff'
        },
        value: this.info.workPlanRate
      }
      this.renderClock(jhkqlvEcharts, this.workPlanRateObj)

      // 考勤率
      var kaoqinlvEcharts = document.getElementById('kaoqinlv')
      this.recordRateObj = {
        name: '考勤率',
        // color: '#ff8f19',
        color: {
          startColor: '#ff7905',
          endColor: '#ffbf46'
        },
        value: this.info.recordRate
      }
      this.renderClock(kaoqinlvEcharts, this.recordRateObj)

      // 在岗率 zaiganglv
      var zaiganglvEcharts = document.getElementById('zaiganglv')
      this.workPlanRateObj = {
        name: '上岗率',
        // color: '#0097ff',
        color: {
          startColor: '#0090ff',
          endColor: '#00e2ff'
        },
        // value: this.info.onWorkRate
        value: parseFloat(this.info.onWorkRate) > 100 ? '100' : this.info.onWorkRate
      }
      this.renderClock(zaiganglvEcharts, this.workPlanRateObj)

      // 有效上岗率 yxsglv
      var yxsglvEcharts = document.getElementById('yxsglv')
      this.validRateObj = {
        name: '有效上岗率',
        // color: '#ff8f19',
        color: {
          startColor: '#ff7905',
          endColor: '#ffbf46'
        },
        value: this.info.validRate
      }
      this.renderClock(yxsglvEcharts, this.validRateObj)
    },
    // 1小时考勤统计
    renderEchartsHour (myChartH, data) {
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          data: this.arr,
          show: true,
          top: 15,
          bottom: 10,
          right: 40,
          // x:680, // 图例水平位置
          itemWidth: 20, // 设置图例的宽高
          itemHeight: 10,
          textStyle: {
            fontWeight: 'normal', // 标题颜色
            color: '#fff'
          }
        },
        /* grid:{ // 调整坐标轴
          x:30,
          y:30,
          x2:52,
          y2:60
        }, */
        grid: { // 调整坐标轴
          // bottom: 110,
          bottom: 30,
          left: 40,
          right: 70
        },
        dataZoom: [
          {
            show: false,
            start: 0,
            end: 120,
            zoomLock: true // 禁止鼠标缩放
          },
          {
            type: 'inside',
            start: 0,
            end: 60,
            zoomLock: true
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: data.secData,
            axisLine: { // 控制x轴线的样式
              lineStyle: {
                type: 'solid',
                color: '#56AFFB',
                width: '1'
              }
            },
            axisPointer: {
              type: 'shadow'
            },
            axisLabel: {
              // formatter: '{value}',
              textStyle: {
                color: '#2DD7EC'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '',
            // min: 0,
            max: data.max,
            // max: parseInt(data.max) + parseInt(data.max/3),
            interval: data.interval,
            axisLine: { // 控制y轴线的样式
              lineStyle: {
                type: 'solid',
                color: '#23BBEC',
                width: '1'
              }
            },
            axisLabel: {
              formatter: '{value} ',
              textStyle: {
                color: '#3AD6E1'
              }
            },
            splitLine: { // 网格线
              show: false,
              lineStyle: {
                color: ['#2DD7EC'],
                width: 1,
                type: 'dotted'
              }
            }
          },
          {
            type: 'value',
            name: '',
            min: 0,
            // max: 100,
            interval: 20,
            smooth: true,
            axisLabel: {
              formatter: '{value} %',
              textStyle: {
                color: '#3AD6E1'
              }
            },
            axisLine: { // 控制y轴线%的样式
              lineStyle: {
                type: 'solid',
                color: '#23BBEC',
                width: '1'
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: ['#23BBEC'],
                width: 1,
                type: 'dotted'
              }
            }
          }
        ],
        series: [
          {
            name: '在岗人数',
            type: 'bar',
            data: data.numData,
            itemStyle: {
              normal: {
                barBorderRadius: 20, // 圆柱体效果边界圆角
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#13F192' },
                    { offset: 1, color: '#478FEC' }
                  ]
                )
              }
            },

            barWidth: 4, // 控制柱子的宽度
            barGap: '50%'// 控制柱子的间隔
          },
          {
            name: '上岗率',
            type: 'line',
            yAxisIndex: 1,
            symbol: 'none',
            smooth: true,
            data: data.lvData,
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 2 // 曲线粗细样式
                },
                color: 'rgba(255,235,12, 1)' // 颜色以及透明度，注意如果要修改透明度，一定要配置在itemStyle里面，直接写在外面不起作用。
              }
            }
          }
        ]
      }
      myChartH.setOption(option, true)
    },
    // 以图搜人
    async getCameraProInfo (workname, workno) {
      // console.log(workname,workno)
      let axiosUrl = getCookieInfo().baseUrl + '/sanyUserPushRecord/searchUserRecordHis'
      var response = await http.post(axiosUrl, {
      // var response = await http.post('/sanyUserPushRecord/searchUserRecordHis', {
        workname: workname,
        workno: workno
      })
      var res = response.data
      if (res.ret === '200') {
        this.recordList = res.userHistoryList
        this.cameraArr = []
        this.personInfoArr = []
        this.cameramap = true
        this.isShow = false
        const { recordList } = this;
        var filterRecordList = []
        for (var i = 0; i < recordList.length; i++) {
          var cameraName1 = recordList[i].snapshotplace
          if(this.cameraAllArr.indexOf(cameraName1) !== -1){
            filterRecordList.push(recordList[i])
            console.log('filterRecordList:',filterRecordList)
          }
        }
        for (let i = 0; i < filterRecordList.length; i++) {
          var cameraName = filterRecordList[i].snapshotplace
          var workers = filterRecordList[i].workname
          var workergh = filterRecordList[i].workno
            if (workname === workers || workno === workergh) {
              this.personInfoArr.push(filterRecordList[i])
              if (this.cameraArr.indexOf(cameraName) === -1) {
                this.cameraArr.push(cameraName)
              }
            }
        }
        this.$nextTick(() => {
          this._setcameraposition()
        })
        const { personInfoArr } = this
        $('.camera').empty()
        for (var i = 0; i < personInfoArr.length; i++) {
          var personInfoItemName = personInfoArr[i].snapshotplace
          var redPoint = $('<div class="person"></div>')
          redPoint.addClass(`person${i + 1}`)
          redPoint.append(personInfoArr.length - i)
          if (personInfoItemName === '办公楼北侧门_人脸1') {
            $('.camera1').append(redPoint)
          } else if (personInfoItemName === '机加区东侧入口_人脸2') {
            $('.camera9').append(redPoint)
          } else if (personInfoItemName === '机加区东侧入口_人脸1') {
            $('.camera10').append(redPoint)
          } else if (personInfoItemName === '办公楼北侧门_人脸2') {
            $('.camera2').append(redPoint)
          } else if (personInfoItemName === '办公楼北大门_人脸1') {
            $('.camera3').append(redPoint)
          } else if (personInfoItemName === '办公楼北大门_人脸2') {
            $('.camera4').append(redPoint)
          } else if (personInfoItemName === '机加区西侧入口_人脸2') {
            $('.camera5').append(redPoint)
          } else if (personInfoItemName === '机加区西侧入口_人脸1') {
            $('.camera6').append(redPoint)
          } else if (personInfoItemName === 'A2门_人脸1') {
            $('.camera7').append(redPoint)
          } else if (personInfoItemName === 'A2门_人脸2') {
            $('.camera8').append(redPoint)
          } else if (personInfoItemName === 'D4门_人脸1') {
            $('.camera11').append(redPoint)
          } else if (personInfoItemName === 'D4门_人脸2') {
            $('.camera12').append(redPoint)
          }
          $('.person').css({
            'width': '15px',
            'height': '15px',
            'lineHeight':'12px',
            'backgroundColor': '#ff0000',
            'position': 'absolute',
            'border': '1px solid #6894BA',
            'borderRadius': '10px',
            'display': 'inline-block',
            'textAlign': 'center',
            'fontSize': '10px'
          })
          $(`.person${i + 1}`).css({
            'top': i >= 8 ? Math.ceil(Math.random() * -45 * Math.sin(180) + 5) + 'px' : ((i + 1) % 2 === 0) ? 35 + 'px' : 15 + 'px',
            'left': i >= 8 ? Math.ceil(Math.random() * -45 * Math.sin(180) + 5) + 'px' : ((i + 1) % 2 === 0) ? ((i + 1) / 2 * 14) + 'px' : (7 * (i + 1)) + 'px'
          })
        }
      }
    },
    // 搜索
    searchProInfo () {
      const workerName = this.$refs.workname.value
      const workerNumber = this.$refs.worknum.value
      this.getCameraProInfo(workerName, workerNumber)
      this.chartShow = '人员轨迹图表'
    },
    // 清空
    clearProInfo () {
      this.$refs.workname.value = ''
      this.$refs.worknum.value = ''
      this.cameraArr = []
      this.isShow = true
      this.personInfoArr = []
      $('.camera').empty()
    },
    // 考勤
   /* checking () {
      this.cameramap = false
      this.chartShow = '人员在岗列表'
    },*/
    // input删除
    keyupevent () {
      const workerName = this.$refs.workname.value
      const workerNumber = this.$refs.worknum.value
      if (workerName === '' && workerNumber === '') {
        this.cameraArr = []
        this.isShow = true
        this.personInfoArr = []
        $('.camera').empty()
      }
    },
    // input聚焦变色
    _focusColor () {
      $('.searchname').on({
        focus: function () {
          $('.searchname').css('background-color', 'rgba(95,155,255,0.3)')
        },
        blur: function () {
          $('.searchname').css('background-color', 'rgba(95,155,255,0.1)')
        }
      })
      $('.searchtext').on({
        focus: function () {
          $('.searchtext').css('background-color', 'rgba(95,155,255,0.3)')
        },
        blur: function () {
          $('.searchtext').css('background-color', 'rgba(95,155,255,0.1)')
        }
      })
    },
    // 获取人员在岗列表
    async getAbnormaData () {
      let axiosUrl = getCookieInfo().baseUrl + '/sanyAttendanceData/getAbnormaData' + '?end='+this.centerLen
      const res = await http.get(axiosUrl)
      // const res = await http.get('/sanyAttendanceData/getAbnormaData',{})
      // console.log('获取人员在岗列表：', res)
      if (res && res.data) {
        const {ret, data} = res.data
        if (res && ret === '200') {
          this.lateList = data.lateList // 迟到
          this.leaveList = data.leaveList //早退
          this.absentList = data.absentList //旷工
          this.abnormalList = data.abnormalList //未派工
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .checking{
    height:100%;display:flex;flex-direction:column;
    &_dashbordBox{
      height:340px;
      background-color: rgba(39, 69, 111, 0.3);padding:15px;
      border:1px solid rgba(255,255,255,0.1);
      .home_title{
        width:100%;position: relative;
        .checking_total{
          //font-size: 0.24rem;
           font-size:24px;
          top:-10px;
          color:#fff;position: absolute;right:0;font-weight:100;
          em{
             font-size:42px;vertical-align: -6px;
            //font-size: 0.42rem;vertical-align: -4px;
            color:#01cbff;display: inline-block;margin-left:12px;font-family: fontnameRegular;}
        }
      }
    }
    &_dashbord{
      width:100%;height: calc(100% - 36px);overflow: hidden;
      ul{
        display: flex;flex-wrap: wrap;align-items: center;
        height:100%;padding-top: 10px;
        li{
          background-color: rgba(42, 75, 133, 0.3);
          padding:0 10px;
          height:100%;
          flex:1;margin-left:6px;text-align:center;
          &:first-child{margin-left:0;}
          .text{
            //font-size: 0.22rem;
             font-size:22px;
            font-weight:100;
          }
          .num{
            //font-size: 0.32rem;
             font-size:35px;
            color:#02c9fc;font-family: fontnameRegular;
          }
          .lv{width:108px;height:108px;margin:0 auto;}
          .lvYellow{
            background:url(../../assets/images/index_clock-yellow.png)
          }
          .lvBlue{
            background:url(../../assets/images/index_clock-blue.png)
          }
          .lvText{
            color:#c4c4c4;
             font-size:18px;
            //font-size: 0.18rem;
            padding-bottom:10px;
          }
          .top{
            // height:105px;
            overflow: hidden;text-align:left;
            .item{
             // height:0.52rem;line-height:0.52rem;
              .text{display: inline-block;vertical-align: middle;text-align: left;}
              .num{display: inline-block;vertical-align: middle;margin-left: 5px;}
            }
          }
          .bottom{margin-top:8px;padding-bottom:10px;}
          .single{
            text-align: center;
            .text{padding-top:5px;}
            .num{padding-top:8px;}
          }
        }
      }
    }
    &_list{
      flex:2;overflow: hidden;margin-top:15px;
      background-color: transparent;padding: 15px;
      border:1px solid rgba(255,255,255,0.1);position: relative;
      &-top{width:100%;}
      &-bottom{
        height: calc(100% - 88px);width:100%;position: relative;
        .off{z-index: -10000; opacity: 0}
      }
      &-time{
        width:100%;height:100%;position: absolute;top:0px;left: 0;
      }
      &-cameramap{
        width:100%;height:100%;height: calc(100% - 34px);
        padding-top:20px;
        &>ul{
          width:100%;height:100%;
          position: relative;
          background:url(../../assets/images/planar-graph.jpg) no-repeat center center;
          background-size: 100% 100%;
          &>div{
            width: 218px;overflow: hidden;
            height: 100%;
            margin-top: 4px;
            margin-right: 4px;
            float: right;
            .scrollProInfoItemInner{
              width: 235px;cursor: pointer;
              height: 100%;overflow: auto;
            }
            &.off{
              display: none;
            }
          }
          &>div>div{
            overflow: hidden;
          }
          &>div>div>div{
            width: 210px;
            height: 100px;
            background-color: #031021;
            margin-bottom: 3px;
            float: right;
            position: relative;
            padding-left: 10px;
            border: 1px solid #136394;
            border-radius: 0 20px 0 20px;
            overflow: hidden;
            display: flex;align-items: center;
            .num{
              width: 20px;
              height: 20px;
              border-radius: 20px;
              background-color: #ff0000;
              position: absolute;
              top: -5px;
              left: -5px;
              text-align: center;
              font-size: 10px;
              line-height: 26px;
            }
            img{
              width: 70px;
              height: 70px;
            }
            .information{
              font-size: 10px;margin-left:5px;
              color: #5CAFF1;
              span{
                color: #75EEFF;
              }
              .infoDepartment,.infoNum,.infoName{margin-top:2px;}
            }
          }
        }
        &>ul>li{
          width: 70px;
          height: 70px;
          position: absolute;
          background:rgba(15,150,200,0.8);
          border-radius: 50px;
          &>div{
            position: absolute;
            background-color: #ff0000;
            border: 1px solid #6894BA;
            width: 15px!important;
            height: 15px!important;
            border-radius:10px;
            display: inline-block;
            text-align: center;
            font-size: 10px;
            &:hover{
              cursor: pointer;
            }

          }
          /* &.camera1{
             top: 0;
             left: 50px;
           }
           &.camera2{
             top: 85px;
             left: 50px;
           }
           &.camera3{
             top: 170px;
             left: 50px;
           }
           &.camera4{
             top: 245px;
             left: 20px;
           }
           &.camera5{
             top: 245px;
             left: 110px;
           }
           &.camera6{
             top: 350px;
             left: 110px;
           }
           &.camera7{
             top: 0;
             left: 290px;
           }
           &.camera8{
             top: 105px;
             left: 290px;
           }
           &.camera9{
             top: 190px;
             left: 320px;
           }
           &.camera10{
             top: 300px;
             left: 290px;
           }
           &.camera11{
             top: 0;
             left: 600px;
           }
           &.camera12{
             top: 110px;
             left:590px;
           }*/
        }
      }
    }

    // 20190108
    &_wrapper{
      flex:2;margin-top:15px;overflow: hidden;
      background-color: rgba(39,69,111,0.3);border:1px solid rgba(255,255,255,0.1);
      .checking_tab{
        overflow: hidden;
        li{
          float: left;padding:15px;cursor: pointer;
          .home_title{color:#335993}
        }
        .checking_tab-selected{
          // background-color: rgba(39,69,111,0.6);
          background:url(../../assets/images/tab-selected.png);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          padding: 15px 50px;
          .home_title{color:#fff;padding-left:0}
        }
      }
      .checking_job{
        padding:15px;
        height: calc(100% - 61px);
        background-color: rgba(39,69,111,0.6);
        display: flex;
        .checking_item{
          // padding: 0 10px;
          flex:1;
          margin-left:6px;
          &:first-child{
            margin-left:0;
          }
        }
        .checking_item-title{
          color:#53e3fd;font-size:22px;font-weight: bold;
          height:50px;line-height: 50px;
          text-align: center;
          background-color:#2a4b85;
        }
        .checking_item-wrapper{
          background-color: rgba(42, 75, 133, 0.3);
          font-size:16px;
          padding-bottom: 10px;
          height: calc(100% - 50px);
          li{
            padding:15px 15px 0;
            span{width: 130px;display: inline-block;}
            em{color:#02c9fc;margin-left: 8px;}
          }
          /deep/ .el-scrollbar__wrap{overflow-x: hidden}
        }
      }
      .checking_cameramap{
        padding:15px;
        height: calc(100% - 61px);
        background-color: rgba(39,69,111,0.6);
        .checking_list-search{
          overflow: hidden;
          .search_input{
            margin-right:190px;
            input:first-child{margin-left:0}
            &>input{
              width: 48%;
              height: 33px;
              outline: none;
              padding-left: 10px;
              color: #ffffff;
              // background: rgba(8,221,242,0.2);
              background: transparent;
              border: 1px solid #176fA6;
              border-radius:5px ;
              margin-left: 4%;
              font-size:14px;float:left;
            }
            &>input::-webkit-input-placeholder{
              color: #27bcf2;
            }
          }
          .search_btn{
            width:180px;float: right;
            &>div{
              float: left;
              width: 45px;
              height: 33px;
              line-height: 33px;
              margin-left: 30px;
              outline: none;
              font-size: 14px;
              cursor: pointer;
              border-radius: 5px;
              text-align: center;
              background: gradient(linear, left top, left bottom, from(#4CDDED), to(#0088FE));
              background: linear-gradient(to top,  #4CDDED,  #0088FE);
              background: -ms-linear-gradient(to top,  #4CDDED,  #0088FE);
            }
          }
        }

      }
    }
  }
</style>
