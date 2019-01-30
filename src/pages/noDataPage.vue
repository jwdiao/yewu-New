<template>
    <div class="no-data">
      <div class="bg">

      </div>
      <p>功能正在研发中，敬请期待！</p>
    </div>
</template>

<script>
    export default {
        name: "no-data-page"
    }
</script>

<style lang="less" scoped>
  .no-data{
    width: 100%;
    height: 100%;
    p{
      position: absolute;
      top: 72%;
      left: 50%;
      font-size: 18px;
      color: #666;
    }
    .bg{
      width: 100%;
      height: 100%;
      background: url("../assets/images/no_data_bg.png") no-repeat center;
      background-size: 50% auto;
      opacity: 0.6;
    }
  }
</style>
