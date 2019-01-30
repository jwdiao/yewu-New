<template>
	    <div class="home-page">
      <div class="home-page-wrap">
        <div class="btnArea" @click="goTo('/vision')"></div>
        <div class="btnArea" @click="goTo('/homechecking')"></div>
      </div>
    </div>
</template>

<script>
  export default {
    data(){
      return{
        isShow:false,
      }
    },
    computed: {},
    methods:{
      goTo(path){
        this.$router.replace(path)
      },
    },
  }
</script>


<style lang="less" scoped>

	.home{
		text-align: center;padding-top:13%;color:#666;box-sizing:border-box;
		img{width:400px;}
    p{
      color: #b3bbd8;
      margin-top: 25px;
      font-size: 23px;
    }
	}


  .home-page{
    width: 100%;height: 100%;
    background: url("../assets/images/home_bg.jpg") no-repeat;background-size: 100% 100%;
    .home-page-wrap{
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0px;
      right: 0;
      margin: auto;
      width: 50%;
      height: 40%;
      /*border: 1px solid #000;*/
      padding-left: 0px;
      .btnArea{
        display: block;
        float: left;
        width: 45%;
        height: 100%;
        /*border: 1px solid gray;*/
        margin-right: 5px;
        margin-left: 15px;
        box-sizing: border-box;
        &:hover{
          cursor: pointer;
        }
      }
    }
  }



</style>
<style lang="less">
  .el-main{
    padding: 0;
  }
</style>
