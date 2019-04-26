<template>
  <div class="maching-center">
    <div class="home_head-btn" @click="bostmachcenter">
      <span v-show="$store.state.centername===''">{{this.$store.state.selectedSubcompany}}</span>
      <span v-show="$store.state.centername!==''">{{currentCenterName}}</span>
      <!--默认向下展开三角-->
      <div class="triangle_top" v-show="flag"></div>
      <!--点击后向上收起-->
      <div class="triangle_bottom" v-show="!flag"></div>
    </div>
    <div class="home_container" :class="{off:flag}">
      <header class="home_container_title" @click="getCenterInfo('')">
        {{this.$store.state.selectedSubcompany}}
      </header>
      <img class="close" src="../../assets/images/close.png" @click="close" />
      <div class="centerNameScroll">
        <ul class="home_container_list">
          <li v-for="(centerItem,index) in allCenterList" :key="index" :ref="index" @click="getCenterInfo(centerItem)">{{centerItem}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MachingCenter',
  props: ['allCenterList'],
  data () {
    return {
      flag: true, // 加工中心显示
      currentCenterName: this.$store.state.selectedSubcompany
    }
  },
  mounted () {
  },
  methods: {
    bostmachcenter () {
      this.flag = false
    },
    close () {
      this.flag = true
    },
    getCenterInfo (item) {
      // 调用发请求
      this.flag = true

      if (item.length > 6) {
        this.currentCenterName = item.substring(0, 6)
      } else {
        this.currentCenterName = item
      }
      if (item === '') {
        this.currentCenterName = this.$store.state.selectedSubcompany
      }
      this.$emit('selectName', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.maching-center{
  width:25%;
  .home_head-btn{
    // width:1.4rem;
    width:190px;
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
      transition: 1s;
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
      transition: 1s;
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
      transition: 2s;
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
  .centerNameScroll{
    height: 700px; overflow: scroll;
  }
}
</style>
