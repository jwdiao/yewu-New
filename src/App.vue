<template>
  <div id="app" class="fillcontain">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less" >
@import './assets/css/common.less';
@import '../static/reset.css';
@import './assets/css/font.css';
@import './assets/css/elementCustom.less';
#app {
  height:100%;
}
#app {
	font-size:14px;
}

.home_title{
  padding-left: 24px;font-weight:bold;
  font-size:24px;
  &-yellow{
    background:url('./assets/images/index_title-yellow.png') no-repeat left center;
  }
  &-blue{
    background:url('./assets/images/index_title-blue.png') no-repeat left center;
  }
  &-purple{
    background:url('./assets/images/index_title-purple.png') no-repeat left center;
  }
  img{margin-left:5px;}
}

</style>


