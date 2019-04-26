<template>
  <div class="attendance">
    <div class="attendance-item">
      <p class="home_title home_title-blue">本日</p >
      <div class="day" id="statistics-dayEnergy-echarts"></div>
    </div>
    <div class="attendance-item" style="margin: 15px 0">
      <p class="home_title home_title-yellow">本月</p >
      <div class="month" id="statistics-monthEnergy-echarts"></div>
    </div>
    <div class="attendance-item">
      <p class="home_title home_title-purple">本年</p >
      <div class="year" id="statistics-yearEnergy-echarts"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'EnergyStatistics',
  props: [],
  computed: {
    energyDayEchartsData () {
      return this.$store.state.energyDayEchartsData
    },
    energyMonthEchartsData () {
      return this.$store.state.energyMonthEchartsData
    },
    energyYearEchartsData () {
      return this.$store.state.energyYearEchartsData
    },
  },
  data () {
    return {
      dayEcharts:'',
      monthEcharts: '',
      yearEcharts: ''
    }
  },
  watch: {
    energyDayEchartsData(val) {
      // 重新渲染echarts
      console.log(val)
      if (val) {
        this.renderMonthEcharts(this.dayEcharts, val)
        /* this.dayEcharts.setOption({
          xAxis: {
            data: val.xAxis // x轴
          },
          series: [
            {
              type: 'line',
              data: val.bootRate // 开机率
            },
            {
              type: 'line',
              data: val.workRate // 作业率
            },
            {
              type: 'line',
              data: val.totalConsumPower // 能耗
            }
          ]
        }) */
      }
    },
    energyMonthEchartsData(val) {
      if (val) {
        // this.renderMonthEcharts(this.monthEcharts, val)
        let hh = {
          xAxis: ['1日','2日','3日','4日','5日','6日','7日','8日','9日','10日','11日','12日','13日','14日','15日','16日','17日','18日','19日','20日','21日','22日','23日','24日','25日','26日','27日','28日','29日','30日','31日'],
          bootRate: [0,90,30,40,20,80,70,50,70,0,90,30,40,20,80,70,50,70,0,90,30,40,20,80,70,50,70,80,70,50,70],
          workRate: [10,30,50,70,30,50,80,30,100,10,30,50,70,30,50,80,30,100,10,30,50,70,30,50,80,30,100,10,30,50,70],
          totalConsumPower: []
        }
        /* val.totalConsumPower = ["8213", "1746", "5", "794", "1045", "1038", "977", "0", "0", "0"],
        val.xAxis = ["1日", "2日", "3日", "4日", "5日", "6日", "7日", "8日", "9日", "10日"],
        val.workRate = ["0.0", "0.15319501", "0.0", "0.0", "0.0", "1.8469424E-5", "0.0", "0.0", "0.0", "0.0"],
        val.bootRate = ["0.0", "1413449.0", "0.0", "0.0", "0.0", "344663.75", "0.0", "1200.5706", "0.0", "0.0"], */
        /* val.totalConsumPower = ["8213", "1746", "5", "794", "1045", "1038", "977", "0", "0", "0"],
        val.xAxis = ["1日", "2日", "3日", "4日", "5日", "6日", "7日", "8日", "9日", "10日"],
        val.workRate = [0, 3, 0, 0, 0, 90, 0, 0, 0, 0],
        val.bootRate = [0, 3, 0, 0, 0, 40, 0, 80, 0, 0], */
          
        this.renderMonthEcharts(this.monthEcharts,val)
      }
    },
    energyYearEchartsData(val) {
      if (val) {
        this.renderYearEcharts(this.yearEcharts, val)
        /* this.yearEcharts.setOption({
          xAxis: {
            data: val.xAxis // x轴
          },
          series: [
            {
              type: 'bar',
              data: val.bootRate // 开机率
            },
            {
              type: 'bar',
              data: val.workRate // 作业率
            },
            {
              type: 'bar',
              data: val.totalConsumPower // 能耗
            }
          ]
        }) */
      }
    }
  },
  mounted () {
    // 日
    this.dayEcharts = echarts.init(document.getElementById("statistics-dayEnergy-echarts"));
    this.renderDayEcharts(this.dayEcharts, this.energyDayEchartsData)
    /* this.dayEcharts.setOption({
      xAxis: {
        data: ['0h','1h','2h','3h','4h','5h','6h','7h','8h']
      },
      series: [
        {
          data: [0,90,30,40,20,80,70,50,70]
        },
        {
          data: [10,30,50,70,30,50,80,30,100]
        },
        {
          data:[150,300,503,402,100,130,800,300,100]
        }
      ]
    }) */

    // 月
    this.monthEcharts = echarts.init(document.getElementById("statistics-monthEnergy-echarts"));
    this.renderMonthEcharts(this.monthEcharts, this.energyMonthEchartsData)
    /* this.monthEcharts.setOption({
      xAxis: {
        data: ['1日','2日','3日','4日','5日','6日','7日','8日','9日','10日','11日','12日','13日','14日','15日','16日','17日','18日','19日','20日','21日','22日','23日','24日','25日','26日','27日','28日','29日','30日','31日']        
      },
      series: [
        {
          data: [0,90,30,40,20,80,70,50,70,0,90,30,40,20,80,70,50,70,0,90,30,40,20,80,70,50,70,80,70,50,70]
        },
        {
          data: [10,30,50,70,30,50,80,30,100,10,30,50,70,30,50,80,30,100,10,30,50,70,30,50,80,30,100,10,30,50,70]
        },
        {
          data:[150,300,503,402,1000,130,800,300,100,950,300,503,402,100,130,800,300,100,150,300,503,402,100,130,800,300,100,150,300,503,402]
        }
      ]
    }) */


    // 年
    this.yearEcharts = echarts.init(document.getElementById("statistics-yearEnergy-echarts"));
    this.renderYearEcharts(this.yearEcharts, this.energyYearEchartsData)
    /* this.yearEcharts.setOption({
      xAxis: {
        data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12日']     
      },
      series: [
        {
          data: [0,90,30,40,20,80,70,50,70,0,90,30]
        },
        {
          data: [10,30,50,70,30,50,80,30,100,10,30,50]
        },
        {
          data:[150,300,503,402,1000,130,800,300,100,950,300,503]
        }
      ]
    }) */
  },
  methods: {
    renderDayEcharts(myChart, dataObj) {
      var option = null;
      option = {
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
            show: true,
            itemWidth: 20,
            itemHeight: 8,
            data: [{
              name: '开机率(%)',
              icon: 'rect',
              textStyle: {
                color: '#fff'
              }
            }, {
              name: '作业率(%)',
              icon: 'rect',
              textStyle: {
                color: '#fff'
              }
            }, {
              name: '能耗',
              icon: 'rect',
              textStyle: {
                color: '#fff'
              }
            }]
          },
          grid: {
            bottom: 20,
            left: 30
          },
          xAxis:  [
            {
              type: 'category',
              boundaryGap: ['5%','5%'],
              axisLabel: {
                interval: 0,
                color: 'rgba(255,255,255,0.70)',
                textStyle: {
                  color: '#2DD7EC'
                },
              },
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#56affb',
                  width: '1'
                }
              },
              axisTick: {
                show: false
              },
              data: dataObj.xAxis // x轴
            },
            
          ],
          yAxis: [
            {
              min: 0,
              max: 100,
              mame: "%",
              nameLocation: 'start',
              nameTextStyle: {
                color: 'rgba(255,255,255,0.70)',
                fontSize: 12
              },
              type: 'value',
              axisLine: {  // 控制y轴线的样式
                lineStyle: {
                  type: 'solid',
                  color: '#56AFFB',
                  width: '1' }
              },
              axisLabel: {
                formatter: '{value}',
                textStyle: {
                  color: '#556BA2'
                }
              },
              splitLine: {
                show: false,
                lineStyle: {
                  color: '#1F2F4D'
                }
              },
              
              
            }, {
              type: "value",
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                textStyle: {
                  color: 'rgba(255,255,255,0.70)'
                }
              },
              splitLine: {
                show: false,
                lineStyle: {
                  color: '#1F2F4D'
                }
              }

            }
          ],
          series: [
              {
                name: '开机率(%)',
                type: 'line',
                showSymbol: false,
                smooth: true,
                symbol: 'circle',
                symbolSize: 1,
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
                  }
                },
                lineStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      { offset: 0, color: '#fd87a7' },
                      { offset: 0.5, color: '#e45a88' },
                      { offset: 1, color: '#c82867' }
                    ]
                    )
                  }
                },
                data: dataObj.bootRate // 开机率
                // data: [0,90,30,40,20,80,70,50,70]
              }, {
                name: '作业率(%)',
                type: 'line',
                showSymbol: false,
                smooth: true,
                symbol: 'circle',
                symbolSize: 1,
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                      [
                        { offset: 0, color: '#e4aa00' },
                        { offset: 0.5, color: '#fdd304' },
                        { offset: 1, color: '#fbbc07' }
                      ]
                    ),
                  }
                },
                lineStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                      [
                        { offset: 0, color: '#e4aa00' },
                        { offset: 0.5, color: '#fdd304' },
                        { offset: 1, color: '#fbbc07' }
                      ]
                    )
                  }
                },
                data: dataObj.workRate // 作业率
                // data: [10,30,50,70,30,50,80,30,100]
              }, {
                name: '能耗',
                type: 'line',
                showSymbol: false,
                smooth: true,
                symbol: 'circle',
                symbolSize: 1,
                yAxisIndex: 1,
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
                  }
                },
                lineStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                      [
                        { offset: 0, color: '#2cd3ec' },
                        { offset: 0.5, color: '#31aee9' },
                        { offset: 1, color: '#387de6' }
                      ]
                    )
                  }
                },
                data: dataObj.totalConsumPower // 能耗
                // data:[150,300,503,402,100,130,800,300,100],
              }
          ]
      };
      ;
      if (option && typeof option === "object") {
          myChart.setOption(option, true);
      }
    },
    renderMonthEcharts(myChart, dataObj) {
      var option = null;
      option = {
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
            show: true,
            itemWidth: 20,
            itemHeight: 8,
            data: [{
              name: '开机率(%)',
              icon: 'rect',
              textStyle: {
                color: '#fff'
              }
            }, {
              name: '作业率(%)',
              icon: 'rect',
              textStyle: {
                color: '#fff'
              }
            }, {
              name: '能耗',
              icon: 'rect',
              textStyle: {
                color: '#fff'
              }
            }]
          },
          grid: {
            bottom: 20,
            // left: 30
          },
          xAxis:  [
            {
              type: 'category',
              boundaryGap: ['5%', '5%'],
              axisLabel: {
                // interval: 4,
                rotate: 0,
                color: 'rgba(255,255,255,0.70)',
                textStyle: {
                  color: '#2DD7EC'
                },
              },
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#56affb',
                  width: '1'
                }
              },
              axisTick: {
                show: false
              },
              data: dataObj.xAxis // x轴
              // data: ['1日','2日','3日','4日','5日','6日','7日','8日','9日','10日','11日','12日','13日','14日','15日','16日','17日','18日','19日','20日','21日','22日','23日','24日','25日','26日','27日','28日','29日','30日','31日']
            },
            
          ],
          yAxis: [
            {
              min: 0,
              // max: 100, // 正常要放开
              mame: "%",
              nameLocation: 'start',
              nameTextStyle: {
                color: 'rgba(255,255,255,0.70)',
                fontSize: 12
              },
              type: 'value',
              axisLine: {  // 控制y轴线的样式
                lineStyle: {
                  type: 'solid',
                  color: '#56AFFB',
                  width: '1' }
              },
              axisLabel: {
                formatter: '{value}',
                textStyle: {
                  color: '#556BA2'
                }
              },
              splitLine: {
                show: false,
                lineStyle: {
                  color: '#1F2F4D'
                }
              },
            }, {
              type: "value",
              axisLine: {
                show: false
              },
              axisLabel: {
                textStyle: {
                  color: 'rgba(255,255,255,0.70)'
                }
              },
              splitLine: {
                show: false,
                lineStyle: {
                  color: '#1F2F4D'
                }
              }
            }
          ],
          series: [
              {
                name: '开机率(%)',
                type: 'line',
                showSymbol: false,
                smooth: true,
                symbol: 'circle',
                symbolSize: 1,
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
                  }
                },
                lineStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      { offset: 0, color: '#fd87a7' },
                      { offset: 0.5, color: '#e45a88' },
                      { offset: 1, color: '#c82867' }
                    ]
                    )
                  }
                },
                data: dataObj.bootRate // 开机率
                // data: [0,90,30,40,20,80,70,50,70,0,90,30,40,20,80,70,50,70,0,90,30,40,20,80,70,50,70,80,70,50,70]
              }, {
                name: '作业率(%)',
                type: 'line',
                showSymbol: false,
                smooth: true,
                symbol: 'circle',
                symbolSize: 1,
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                      [
                        { offset: 0, color: '#e4aa00' },
                        { offset: 0.5, color: '#fdd304' },
                        { offset: 1, color: '#fbbc07' }
                      ]
                    )
                  }
                },
                lineStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                      [
                        { offset: 0, color: '#e4aa00' },
                        { offset: 0.5, color: '#fdd304' },
                        { offset: 1, color: '#fbbc07' }
                      ]
                    )
                  }
                },
                data: dataObj.workRate // 作业率
                // data: [10,30,50,70,30,50,80,30,100,10,30,50,70,30,50,80,30,100,10,30,50,70,30,50,80,30,100,10,30,50,70]
              }, {
                name: '能耗',
                type: 'line',
                showSymbol: false,
                smooth: true,
                symbol: 'circle',
                symbolSize: 1,
                yAxisIndex: 1,
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                      [
                        { offset: 0, color: '#2cd3ec' },
                        { offset: 0.5, color: '#31aee9' },
                        { offset: 1, color: '#387de6' }
                      ]
                    )
                  }
                },
                lineStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                      [
                        { offset: 0, color: '#2cd3ec' },
                        { offset: 0.5, color: '#31aee9' },
                        { offset: 1, color: '#387de6' }
                      ]
                    )
                  }
                },
                data: dataObj.totalConsumPower // 能耗
                // data:[150,300,503,402,1000,130,800,300,100,950,300,503,402,100,130,800,300,100,150,300,503,402,100,130,800,300,100,150,300,503,402],
              }
          ]
      };
      ;
      if (option && typeof option === "object") {
          myChart.setOption(option, true);
      }
    },
    renderYearEcharts(myChart, dataObj) {
      var option = null;
      option = {
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
            show: true,
            itemWidth: 20,
            itemHeight: 8,
            data: [{
              name: '开机率(%)',
              icon: 'rect',
              textStyle: {
                color: '#fff'
              }
            }, {
              name: '作业率(%)',
              icon: 'rect',
              textStyle: {
                color: '#fff'
              }
            }, {
              name: '能耗',
              icon: 'rect',
              textStyle: {
                color: '#fff'
              }
            }]
          },
          grid: {
            bottom: 20,
            // left: 30
          },
          xAxis:  [
            {
              type: 'category',
              boundaryGap: ['5%', '5%'],
              axisLabel: {
                interval: 0,
                rotate: 0,
                color: 'rgba(255,255,255,0.70)',
                textStyle: {
                  color: '#2DD7EC'
                },
              },
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#56affb',
                  width: '1'
                }
              },
              axisTick: {
                show: false
              },
              data: dataObj.xAxis // x轴
              // data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12日']
            },
            
          ],
          yAxis: [
            {
              min: 0,
              // max: 100,
              mame: "%",
              nameLocation: 'start',
              nameTextStyle: {
                color: 'rgba(255,255,255,0.70)',
                fontSize: 12
              },
              type: 'value',
              axisLine: {  // 控制y轴线的样式
                lineStyle: {
                  type: 'solid',
                  color: '#56AFFB',
                  width: '1' }
              },
              axisLabel: {
                formatter: '{value}',
                textStyle: {
                  color: '#556BA2'
                }
              },
              splitLine: {
                show: false,
                lineStyle: {
                  color: '#1F2F4D'
                }
              },
            }, {
              type: "value",
              axisLine: {
                show: false
              },
              axisLabel: {
                textStyle: {
                  color: 'rgba(255,255,255,0.70)'
                }
              },
              splitLine: {
                show: false,
                lineStyle: {
                  color: '#1F2F4D'
                }
              }
            }
          ],
          series: [
              {
                name: '开机率(%)',
                type: 'bar',
                showSymbol: false,
                smooth: true,
                symbol: 'circle',
                symbolSize: 1,
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
                data: dataObj.bootRate // 开机率
                // data: [0,90,30,40,20,80,70,50,70,0,90,30]
              }, {
                name: '作业率(%)',
                type: 'bar',
                showSymbol: false,
                smooth: true,
                symbol: 'circle',
                symbolSize: 1,
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                      [
                        { offset: 0, color: '#e4aa00' },
                        { offset: 0.5, color: '#fdd304' },
                        { offset: 1, color: '#fbbc07' }
                      ]
                    ),
                    barBorderRadius: 4
                  }
                },
                barWidth: 4, // 控制柱子的宽度
                data: dataObj.workRate // 作业率
                // data: [10,30,50,70,30,50,80,30,100,10,30,50]
              }, {
                name: '能耗',
                type: 'bar',
                showSymbol: false,
                smooth: true,
                symbol: 'circle',
                symbolSize: 1,
                yAxisIndex: 1,
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
                barWidth: 4, // 控制柱子的宽度
                data: dataObj.totalConsumPower // 能耗
                // data:[150,300,503,402,1000,130,800,300,100,950,300,503],
              }
          ]
      };
      ;
      if (option && typeof option === "object") {
          myChart.setOption(option, true);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .attendance {
  height:100%;display:flex;flex-direction: column;
  &-item{
    flex:1;background-color: rgba(39,69,111,0.3);border:1px solid rgba(255,255,255,0.1);
    padding:15px;
    .home_title{width:100%;}
    .day{
      width:100%;height: calc(100% - 36px);
    }
    .month{
     width:100%;height: calc(100% - 36px);
    }
    .year{
      width:100%;height: calc(100% - 36px);
    }
  }
}
</style>
