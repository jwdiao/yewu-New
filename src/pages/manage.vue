<template>
<el-container class="manage">
  <el-header class="manage_header">
    <div class="manage_title">
      <img src="../assets/images/logo.png" />
      <i>三现后台管理系统</i>
    </div>
    <div class="manage_nameAndLayout">
      <span class="manage_name">欢迎您，{{username}}！</span>
      <span class="manage_layout" @click="handleLayout">
        <img class="manage-menu_icon" src="../assets/images/manage_layout.png" />
        <em>退出</em>
      </span>
    </div>
  </el-header>
  <el-container class="manage_con">
    <el-aside class="manage_aside">
      <el-menu
        :default-active="defaultActive"
        router
        background-color="#324157"
        text-color="#fff"
        unique-opened
      >
        <el-menu-item index="manage">
          <i class="el-icon-menu" style="margin-right: -4px; text-align: left; vertical-align: sub;"></i>
          <span slot="title">三现管理后台</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-document"></i>基础信息</template>
          <el-menu-item index="pieceinformation">计件人员信息</el-menu-item>
          <el-menu-item index="checkingcameras">考勤摄像头信息</el-menu-item>
					<!-- <el-menu-item index="pieceWorker">计件人员</el-menu-item>
					<el-menu-item index="managePerson">管理人员</el-menu-item> -->
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-message"></i>派工信息</template>
          <el-menu-item index="paigong">派工信息导入</el-menu-item>
          <el-menu-item index="deletepaigong">派工信息删除</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"><i class="el-icon-news"></i>业务信息</template>
          <el-menu-item index="clocklist">人脸打卡记录</el-menu-item>
          <el-menu-item index="dispatchList">迟到统计</el-menu-item>
          <el-menu-item index="absent">旷工统计</el-menu-item>
          <el-menu-item index="shiftList">调班统计</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
      <!--<keep-alive>
      </keep-alive>-->
    </el-main>
  </el-container>
</el-container>
</template>

<script>
  import {getCookieInfo} from '../api/getCookie'
  import { mapMutations } from 'vuex'
  export default {
    data () {
      return {
        username: this.$store.state.adminObj.username
      }
    },
    computed: {
      defaultActive: function(){
        return this.$route.path.replace('/', '');
      }
    },
    created () {
      
    },
    mounted () {
      this.username = getCookieInfo().username
    },
    methods: {
      ...mapMutations([
        'logoutMuta'
      ]),
      handleLayout () {
        this.$confirm('是否要退出系统?', '退出提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 1. 删除token
          this.logoutMuta();
          // 2. 跳转到登陆
          this.$router.push('login')
          this.$message({
						type: 'success',
						message: '退出成功!'
					});
        }).catch(() => {

        });
      }
    }
  }
</script>


<style lang="less" scoped>
  @import '../assets/css/mixin';
  .manage{
    height:100%;
    &_header{background-color: #324157;
    color: #fff;
    padding: 0;}
    &_title{
      color: #409EFF;
      font-size: 20px;
      line-height: 60px;
      width: 270px;
      background-color: #192433;
      padding-left: 25px;box-sizing: border-box;
      img{width: 26px;vertical-align: middle;margin-right: 0px;font-size: 24px;}
      i{vertical-align: middle;color: #5b9fff;font-size: 19px;}
    }
    &_nameAndLayout{position:absolute;right:30px;top:20px;color:#fff;}
    &_name{margin-right:30px;}
    &_layout{
      cursor:pointer;color:#fff;
      font-size: 20px!important;
      em{font-style: normal;}
      img{vertical-align: -2px;}
    }

    &_con{height:calc(100% - 60px);}
    &_aside{width:270px !important;height:100%;box-sizing: border-box;overflow-x: hidden;}
    /deep/ .el-menu{width:100%;height:100%;}
    /deep/ .el-menu li{border-bottom: 1px solid #3c4d67;font-size:16px;}
    /deep/ .el-submenu__title{font-size:16px;padding-left:35px;color:#fff;}
    /deep/ li>.el-menu li{
      border:0;font-size:14px;border-left:3px solid transparent;
      padding-left: 45px !important;background-color:rgba(255,255,255,.1) !important
    }
    /deep/ li>.el-menu li:hover{background-color:rgba(255,255,255, .2) !important}
    /deep/ .el-menu-item{border-left:3px solid transparent;}
    /deep/ .el-submenu [class^=el-icon-] {
      vertical-align: -1px;
    }
    .manage-menu_icon{width:16px;}
    /deep/ .el-menu-item i{color:#fff;}
    /deep/ .el-menu-item.is-active{border-left:3px solid #409EFF;}
    /deep/ .el-menu-item.is-active i{color:#409EFF;}
    /deep/ .el-submenu__title i{color:#fff;}
  }
</style>
