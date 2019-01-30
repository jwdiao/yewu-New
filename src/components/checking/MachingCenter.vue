<template>
  <div class="maching-center">
    <div class="home_head-btn" @click="bostmachcenter">
      {{currentCenterName}}
      <!--默认向下展开三角-->
      <div class="triangle_top" v-show="flag"></div>
      <!--点击后向上收起-->
      <div class="triangle_bottom" v-show="!flag"></div>
    </div>
    <div class="home_container" :class="{off:flag}">
      <header class="home_container_title" @click="getCenterInfo('')">
        全部
      </header>
      <img class="close" src="../../assets/images/close.png" @click="close" />
      <ul class="home_container_list">
        <li v-for="(centerItem,index) in centername" :key="index" :ref="index" @click="getCenterInfo(centerItem)">{{centerItem}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import http from '../../api/http'
import {getCookieInfo} from '../../api/getCookie'
export default {
  name: 'MachingCenter',
  data () {
    return {
      flag: true, // 加工中心显示
      currentCenterName: '全部',
      centername: []
      // centername: ['组装工作中心', '钻具工作中心', '机加工作中心', '变幅工作中心', '备料工作中心', '桅杆工作中心', '调试工作中心', '设备工作中心', '仓储配送工作中心', '部件涂装工作中心']
    }
  },
  mounted () {
    // 获取所有加工中心
    this.getCenterNameData()
  },
  methods: {
    bostmachcenter () {
      this.flag = false
    },
    close () {
      this.flag = true
    },
    async getCenterNameData () {
      let axiosUrl = getCookieInfo().baseUrl + '/userMessage/getCenternameList'
      const res = await http.get(axiosUrl)
      // const res = await http.get('/userMessage/getCenternameList')
      console.log('获取的所有加工中心2：',res)
      if (res && res.data && res.data.ret === '200') {
        const {centernameList, ret} = res.data
        // console.log('加工中心的长度：',centernameList.length)
        this.$emit('centernamelen', centernameList.length)
        centernameList.map((ele) => {
          this.centername.push(ele.threeleveldep)
        })
      }
      // console.log('获取的所有加工中心2：',centernameList,ret)
    },
    getCenterInfo (item) {
      // 调用发请求
      this.flag = true
      if (item.length>6) {
        this.currentCenterName = item.substring(0, item.length - 4)
      } else if (0<item.length<6) {
        this.currentCenterName = item
      }
      /* if (item.indexOf('工作中心') > -1) {
        this.currentCenterName = item.substring(0, item.length - 4)
      } */
      this.$emit('selectName', item)
      if (item === '') {
        this.currentCenterName = '全部'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.maching-center{
  width:25%;
  .home_head-btn{
    // width:1.4rem;
    width:185px;
    position: fixed;right:24px;top:60px;height:40px;text-align: center;line-height: 40px;
    background: gradient(linear, left top, left bottom, from(#4CDDED), to(#0088FE));
    background: linear-gradient(to top,  #4CDDED,  #0088FE);
    background: -ms-linear-gradient(to top,  #4CDDED,  #0088FE);
    color:#fff;font-size:22px;border-radius: 5px;cursor: pointer;
    img{vertical-align: middle}
    /*默认向下展开三角*/
    .triangle_top{
      width:0px;
      height:0px;
      border:7.5px solid transparent;
      border-top:9px solid #fff;
      position:absolute;
      top:16px;
      right:7px;
    }
    /*点击后向上收起*/
    .triangle_bottom {
      width:0px;
      height:0px;
      border:7.5px solid transparent;
      border-bottom:9px solid #fff;
      position:absolute;
      top:8px;
      right:7px;
    }
  }
  .home_container{
    width: 24%;
    background-color: #0e2154;
    opacity: 0.9;
    position: absolute;
    top:120px;bottom:30px;
    right: 15px;
    z-index:100;
    text-align: center;
    &.off{
      display: none;
      transition: 1s;
    }
    &_title{
      color: yellow;
      font-size: 24px;
      margin-top: 60px;
      cursor: pointer;
    }
    .close{
      position: absolute;
      top: 10px;
      right: 20px;
      font-size: 30px;
      color: #1578CF;
      &:hover{
        cursor: pointer;
      }
    }
    &_list{
      width: 80%;
      margin: 0 auto;
      &>li{
        background:rgba(12,51,103,0.1);
        height: 40px;line-height: 40px;border: 1px solid rgba(0,136,255,0.6);
        margin-top: 20px;
        color: #50b4ff;font-size:16px;
        border-radius: 5px;
        &:hover{
          background:rgba(08,72,158,1);
          cursor: pointer;
          color:#fff
        }
      }
    }
  }
  .currentTime{
    position: fixed;right:24px;top:10px;color:#ababab;font-size:32px;
  }
}
</style>
