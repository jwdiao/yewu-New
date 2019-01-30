<template>
	<div>
    <div class="home fillcontain">
      <img src="../assets/images/manage_welcome.png" />
      <p>欢迎您进入三现后台管理系统！</p>
    </div>
    <!--<div class="home_bg" v-else>
      <img src="../assets/images/home_bg.jpg" style="width: 100%;height: 100%;" alt="">
    </div>-->

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
		text-align: center;padding-top:13%!important; color:#666;box-sizing:border-box;
		img{width:400px;}
    p{
      color: #b3bbd8;
      margin-top: 25px;
      font-size: 23px;
    }
	}


</style>
