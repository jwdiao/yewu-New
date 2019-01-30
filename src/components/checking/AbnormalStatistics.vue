<template>
  <div class="abnormal">
    <div class="abnormal-item">
      <p class="home_title home_title-blue">
        人员考勤异常情况
      </p>
      <ul class="day">
        <li>
          <span>迟到</span>
          <em class="chidao" v-if="info && info.lateNum" v-text="info.lateNum"></em>
          <em v-else>0</em>
        </li>
        <li>
          <span>早退</span>
          <em class="zaotui" v-if="info && info.outNum" v-text="info.outNum"></em>
          <em v-else>0</em>
        </li>
        <li>
          <span>旷工</span>
          <em class="kuanggong" v-if="info && info.absentNum" v-text="info.absentNum"></em>
          <em v-else>0</em>
        </li>

        <li>
          <span>未派工</span>
          <em class="tiaoban" v-if="info && info.abnormalNum" v-text="info.abnormalNum"></em>
          <em v-else>0</em>
        </li>
      </ul>
    </div>
    <div class="abnormal-item">
      <p class="home_title home_title-blue">人员考勤异常月统计</p>
      <div class="month" id="month">

      </div>
    </div>
    <div class="abnormal-item">
      <p class="home_title home_title-purple">人员考勤异常年统计</p >
      <div class="year" id="year"></div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import http from '../../api/http'
  export default {
    name: 'AbnormalStatistics',
    props: ['info','monthData','yearData'],
    data () {
      return {
        // 人员考勤异常月统计数据
        chartsDataMonth: {
          xData: [], // x轴数据
          cidao: [], // 迟到
          zaotui: [], // 早退
          kuanggong: [] // 矿工
        },
        // 人员考勤异常年统计数据
        chartsDataYear: {
          xData: [], // x轴数据
          cidao: [], // 迟到
          zaotui: [], // 早退
          kuanggong: [] // 矿工
        },
        EchartsArr: [] // 所有echarts数组
      }
    },
    created () {

    },
    watch: {
      // 异常月统计
      monthData (val) {
        if (val.ret === '200') {
          var myEChartsMonth = echarts.init(document.getElementById('month')) //月echarts dom
          this.chartsDataMonth.xData = val.xAxis // X轴
          this.chartsDataMonth.cidao = val.lateArr // 迟到
          this.chartsDataMonth.zaotui = val.leaveNumArr // 早退
          this.chartsDataMonth.kuanggong = val.absenNumArr //矿工
          this.EchartsArr.push(myEChartsMonth) // 放入echarts数组，resize时有用
          this.renderEchartsMonth(myEChartsMonth, this.chartsDataMonth) // 人员考勤异常月统计echarts图
        }
      },
      // 异常月统计
      yearData (val) {
        if (val.ret === '200') {
          var myEChartsYear = echarts.init(document.getElementById('year')) //年echarts dom
          this.chartsDataYear.xData = val.xAxis // X轴
          this.chartsDataYear.cidao = val.lateArr // 迟到
          this.chartsDataYear.zaotui = val.leaveNumArr // 早退
          this.chartsDataYear.kuanggong = val.absenNumArr //矿工
          this.EchartsArr.push(myEChartsYear) // 放入echarts数组，resize时有用
          // 渲染echarts图
          this.renderEchartsYear(myEChartsYear, this.chartsDataYear) // 人员考勤异常年统计echarts图
        }
      }
    },
    mounted () {
      // 浏览器resize事件
      window.addEventListener('resize',this.handleResize);  // 给window对象绑定resize事件
    },
    methods: {
      /**
       * 方法名：handleResize
       * 参数：无
       * 描述：浏览器窗口resize时，所以echarts图自适应
       */
      handleResize () {
        this.EchartsArr.forEach((ele, index)=>{
          ele.resize()
        })
      },
      /**
       * 方法名：renderEchartsMonth
       * 参数：(myChart, data) 参数一：echarts的dom，参数二：数据
       * 描述：人员考勤异常月统计echart图标渲染
       */
      renderEchartsMonth (myChart, data) {
        var option = {
          legend: {
            data: ['迟到', '早退', '旷工'],
            show: true,
            itemWidth: 20, // 设置图例的宽高
            itemHeight: 8,
            textStyle: { // 标题颜色
              color: '#fff'
            },
            top: 10,
            bottom: 0
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          grid: {
            bottom: 20,
            right: 10
          },
          xAxis: [
            {
              type: 'category',
              data: data.xData,
              // 控制x轴线的样式
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#56aefb',
                  width: '1'
                }
              },
              axisLabel : {
                // formatter: '{value}',
                textStyle: {
                  color: '#2fdaeb'
                },
                interval: 3
                // showMaxLabel: true, //是否显示最大 tick 的 label
              },
              axisTick: { // 控制x轴坐标刻度不显示
                show: false
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              min: 0,
              // max: data.maxY,
              // interval: data.intervalY,
              // 控制y轴线的样式
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#55aefb',
                  width: '1'
                }
              },
              axisLabel: {
                formatter: '{value} ',
                textStyle: {
                  color: '#556BA2'
                },
                showMinLabel: true, // 是否显示最小 tick 的 label
                showMaxLabel: true, // 是否显示最大 tick 的 label
                verticalAlign: 'middle'
              },
              // 网格线
              splitLine: {
                show: false,
                lineStyle: {
                  color: ['#2DD7EC'],
                  width: 1,
                  type: 'dotted'
                }
              }
            }
          ],
          series: [
            {
              name: '迟到',
              type: 'bar',
              data: data.cidao,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#fd87a7' },
                      {offset: 0.5, color: '#e45a88' },
                      {offset: 1, color: '#c82867' }
                    ]
                  ),
                  barBorderRadius: 2
                }
              },
              barWidth: 2, // 控制柱子的宽度
              barGap: '20%' // 控制柱子的间隔
            },
            {
              name: '早退',
              type: 'bar',
              data: data.zaotui,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      { offset: 0, color: '#e8e31a' },
                      { offset: 0.5, color: '#fbbd07' },
                      { offset: 1, color: '#f8920e' }
                    ]
                  ),
                  barBorderRadius: 2
                }
              },
              barWidth: 2,  // 控制柱子的宽度
              barGap: '20%' // 控制柱子的间隔
            },
            {
              name: '旷工',
              type: 'bar',
              data: data.kuanggong,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      { offset: 0, color: '#2cd3ec' },
                      { offset: 0.5, color: '#31aee9' },
                      { offset: 1, color: '#387de6' }
                    ]
                  ),
                  barBorderRadius: 2
                }
              },
              barWidth: 2,  // 控制柱子的宽度
              barGap: '20%' // 控制柱子的间隔
            }
          ]
        }
        myChart.setOption(option)
      },
      renderEchartsYear (myChart, data) {
        var option = {
          legend: {
            data: ['迟到', '早退', '旷工'],
            show: true,
            // 设置图例的宽高
            itemWidth: 20,
            itemHeight: 8,
            // 标题颜色
            textStyle: {
              color: '#fff'
            },
            top: 10,
            bottom: 0
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          grid: {
            bottom: 20,
            right: 10
          },
          xAxis: [
            {
              type: 'category',
              data: data.xData,
              // 控制x轴线的样式
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#56aefb',
                  width: '1'
                }
              },
              axisLabel : {
                // formatter: '{value}',
                textStyle: {
                  color: '#2fdaeb'
                },
                interval: 0,
                showMaxLabel: true // 是否显示最大 tick 的 label
              },
              axisTick: { // 控制x轴坐标刻度不显示
                show: false
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              min: 0,
              // max: data.maxY,
              // interval: data.intervalY,
              axisLine: { // 控制y轴线的样式
                lineStyle: {
                  type: 'solid',
                  color: '#55aefb',
                  width: '1'
                }
              },
              axisLabel: {
                formatter: '{value} ',
                textStyle: {
                  color: '#556BA2'
                },
                showMinLabel: true, // 是否显示最小 tick 的 label
                showMaxLabel: true, // 是否显示最大 tick 的 label
                verticalAlign: 'middle'
              },
              splitLine: { // 网格线
                show: false,
                lineStyle: {
                  color: ['#2DD7EC'],
                  width: 1,
                  type: 'dotted'
                }
              }
            }
          ],
          series: [
            {
              name: '迟到',
              type: 'bar',
              data: data.cidao,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      { offset: 0, color: '#fd87a7' },
                      { offset: 0.5, color: '#e45a88' },
                      { offset: 1, color: '#c82867' }
                    ]
                  ),
                  barBorderRadius: 4
                }
              },
              barWidth: 4, // 控制柱子的宽度
              barGap: '10%' // 控制柱子的间隔
            },
            {
              name: '早退',
              type: 'bar',
              data: data.zaotui,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      { offset: 0, color: '#e4aa00' },
                      { offset: 0.5, color: '#dd9000' },
                      { offset: 1, color: '#d67600' }
                    ]
                  ),
                  barBorderRadius: 4
                }
              },
              barWidth: 4, // 控制柱子的宽度
              barGap: '20%' // 控制柱子的间隔
            },
            {
              name: '旷工',
              type: 'bar',
              data: data.kuanggong,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      { offset: 0, color: '#2cd3ec' },
                      { offset: 0.5, color: '#31aee9' },
                      { offset: 1, color: '#387de6' }
                    ]
                  ),
                  barBorderRadius: 4
                }
              },
              barWidth: 4, // 控制柱子的宽度
              barGap: '20%' // 控制柱子的间隔
            }
          ]
        }
        myChart.setOption(option)
      }
    }
  }
</script>
<style lang="scss" scoped>
.abnormal {
  height:100%;display:flex;flex-direction: column;position: relative;
  &>:nth-child(2){
    margin: 15px 0px;
  }
  &-item{
    flex:1;overflow: hidden;position:relative;
    background-color: rgba(39,69,111,0.3);padding:15px;
    border:1px solid rgba(255,255,255,0.1);
    .home_title{
      width:100%;
      img{margin-left: 10px;vertical-align: -2px;width: 12px;}
    }
    .day{
      display:flex;justify-content: center;align-items: center;flex-wrap: wrap;//如果一条轴线排不下，如何换行，wrap换行
      width:100%;height: calc(100% - 36px - 40px);margin: 25px 0;
      li{
        text-align: center;width:50%;font-size:0;
        span{
           font-size: 25px;
          /*font-size: 0.25rem;*/
          display: inline-block;vertical-align: middle;
        }
        em{
           font-size:42px;width: 100px;
          //font-size: 0.42rem;width: 1rem;
          color:#00c7fa;display: inline-block;vertical-align: middle;
          font-weight: bold;margin-left:8px;

          text-align: left;
          font-family: fontnameRegular;
        }
      }
    }
    .month{
      width:100%;height: calc(100% - 36px);
    }
    .year{
      width:100%;height: calc(100% - 36px);
    }
  }
  .home_title-hover:hover{color:#50b4ff}
}
</style>
