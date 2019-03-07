<template>
  <div class="attendance">
    <div class="attendance-item">
      <p class="home_title home_title-blue">人员考勤日统计</p >
      <div class="day" id="checkingv20190221-attendance_day"></div>
    </div>
    <div class="attendance-item" style="margin: 15px 0">
      <p class="home_title home_title-yellow">人员考勤月统计</p >
      <div class="month" id="checkingv20190221-attendance_month"></div>
    </div>
    <div class="attendance-item">
      <p class="home_title home_title-purple">人员考勤年统计</p >
      <div class="year" id="checkingv20190221-attendance_year"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'Attendance',
  props: ['dayInfo', 'monthInfo', 'yearInfo'],
  watch: {
    // 人员考勤日统计数据
    dayInfo (val) {
      // 如果从后台返回数据成功开始渲染数据
      if (this.dayInfo && this.dayInfo.ret == 200) {
        // 日echarts图
        var maxBetween = parseInt(this.max(val.practical))+parseInt(this.max(val.practical)/3)
        var totalNum = val.total
        this.dayEchartsRightData = {
          time: val.xAxis, // x轴数据
          shangganglv: val.practicalVal, // 出勤率
          shanggangren: val.practical, // 上岗人数
					queqinrenshu:val.missRecordNum,//缺勤人数
          max: maxBetween>totalNum?totalNum:maxBetween
        }
        this.renderDayEcharts(this.dayEchartsRight, this.dayEchartsRightData) // 渲染echarts图
      }
    },
    // 人员考勤月统计数据
    monthInfo (val) {
      if (this.monthInfo && this.monthInfo.ret === '200') {
        // 月echarts图;
        var maxBetween = parseInt(this.max(val.practical))+parseInt(this.max(val.practical)/3)
        var totalNum = val.total
        this.monthEchartsRightData = {
          time: val.xAxis, // x轴数据
          shangganglv: val.practicalVal, // 出勤率
          shanggangren: val.practical, // 上岗人数
					queqinrenshu: val.missRecordNum,//缺勤人数
          // max: val.max + parseInt(val.max /3),
          max: maxBetween>totalNum?totalNum:maxBetween,
          xAxisLabelInterval: 3
        }
        this.renderMonthEcharts(this.monthEchartsRight, this.monthEchartsRightData) // 渲染echarts图
      }
    },
    // 人员考勤年统计数据
    yearInfo (val) {
      if (this.yearInfo) {
        // 年echarts图
        var maxBetween = parseInt(this.max(val.practical))+parseInt(this.max(val.practical)/3)
        var lvArr = val.practicalVal || 0
				// var queQinArr = []
				var queQinArr = val.practicalTotal || 0
        var newLvArr = []
				/*val.practicalTotal.forEach((ele,index)=>{
					    ele!=null?queQinArr.push(ele-val.practical[index]):queQinArr.push(null)
				})*/
				// console.log('queqin人数：',queQinArr)
        newLvArr = lvArr.map((ele) => {
          return ele ? (ele*100).toFixed(2) : null
        })
        var totalNum = val.total
        this.yearEchartsRightData = {
          time: val.xAxis, // x轴数据
          shangganglv: newLvArr, // 出勤率
          shanggangren: val.practical, // 上岗人数
					queqinrenshu:queQinArr,//缺勤人数
          max: maxBetween>totalNum?totalNum:maxBetween,
          xAxisLabelInterval: 0
        }
        this.renderYearEcharts(this.yearEchartsRight, this.yearEchartsRightData) // 渲染echarts图
      }
    }
  },
  data () {
    return {
      arr: [
        {
          name: '出勤率',
          icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAMAAACDi47UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjQ3NjZBN0JGNDY5MTFFOEJCNjM4QzFDNjc4NzQyM0UiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjQ3NjZBN0NGNDY5MTFFOEJCNjM4QzFDNjc4NzQyM0UiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCNDc2NkE3OUY0NjkxMUU4QkI2MzhDMUM2Nzg3NDIzRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCNDc2NkE3QUY0NjkxMUU4QkI2MzhDMUM2Nzg3NDIzRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Po8SnNMAAAA/UExURf/LF//NF//eHP/KFv/SGf/OGP/aG//UGf/WGv/jHv/rIP/IFv/QGP/YGv/lHv/pH//cHP/nH//hHf/tIP///9HlZOcAAAAVdFJOU///////////////////////////ACvZfeoAAAAqSURBVHjaYhDBAhiIFxTm4hfk4xRiEmDj5WBn4WFlZGDmplSQMicBBBgAF/kMWUwXodQAAAAASUVORK5CYII='
        },
        {
          name: '考勤人数',
        }
      ],
      dayEchartsRight: '',
      // 日统计
      dayEchartsRightData: {
        time: '',
        shangganglv: '',
        shanggangren: '',
        max: ''
      },

      // 月统计
      monthEchartsRight: '',
      monthEchartsRightData:{
        time: '',
        shangganglv: '',
        shanggangren: '',
        max: ''
      },

      //年统计
      yearEchartsRight: '',
      yearEchartsRightData:{
        time: '',
        shangganglv: '',
        shanggangren: '',
        max: ''
      },
      EchartsArr: [] //所有echarts图表数组
    }
  },
  mounted () {
    // 日统计
    this.dayEchartsRight = echarts.init(document.getElementById("checkingv20190221-attendance_day"))
    this.EchartsArr.push(this.dayEchartsRight) // 放入echarts数组

    // 月统计
    this.monthEchartsRight = echarts.init(document.getElementById("checkingv20190221-attendance_month"))
    this.EchartsArr.push(this.monthEchartsRight) // 放入echarts数组

    // 年统计
    this.yearEchartsRight = echarts.init(document.getElementById("checkingv20190221-attendance_year"))
    this.EchartsArr.push(this.yearEchartsRight) // 放入echarts数组

    // 给window对象绑定resize事件
    window.addEventListener('resize',this.handleResize)
  },
  methods: {
    /**
     * 方法名：handleResize
     * 参数：无
     * 描述：浏览器窗口resize时，所以echarts图自适应
     */
    handleResize () {
      this.EchartsArr.forEach((ele, index) => {
        ele.resize()
      })
    },
    /**
     * 方法名：renderEcharts日
     * 参数：(myChart, data) 参数一：echarts的dom，参数二：数据
     * 描述：人员考勤日/月/年统计echart图表渲染
     */
    renderDayEcharts(myChart, data){
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
          // data: this.arr,
          show: true,
          itemWidth: 20, // 设置图例的宽高
          itemHeight: 8,
          textStyle: {
            fontWeight: "normal", // 标题颜色
            color: "#fff"
          },
          top: 10,
          bottom: 0
        },
        grid: {
          bottom: 30
        },
        xAxis: [
          {
            type: 'category',
            data: data.time,
            // data:this.dayXTime,
            axisLine: {  // 控制x轴线的样式
              lineStyle: {
                type: 'solid',
                color: '#293e60',
                width: '1'
              }
            },
            axisPointer: {
              type: 'shadow'
            },
            axisTick: { // 控制x轴坐标刻度不显示
              show: false
            },
            axisLabel : {
              textStyle: {
                color: '#2DD7EC'
              },
              interval: 0,
              rotate: 45
              // interval: data.xAxisLabelInterval,
              // showMaxLabel: true, //是否显示最大 tick 的 label
            },
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '考勤人数',
            nameTextStyle: {
              color: '#fff',
              align: 'left',
              padding:[0,20,0,0]
            },
            // max: data.max,
            axisLine: {  // 控制y轴线的样式
              lineStyle: {
                type: 'solid',
                color: '#293e60',
                width: '1' }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter: '{value} ',
              textStyle: {
                color: '#fff'
              }
            },
            splitLine: { //网格线
              show: true,
              lineStyle: {
                color: ['#293e60'],
                width: 1,
                type: 'dotted'
              }
            }
          },
          {
            type: 'value',
            name: '出勤率',
            nameTextStyle: {
              color: '#fff',
              padding:[0,0,0,35]
            },
            min: 0,
            // smooth: true,
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter: '{value} %',
              textStyle: {
                color: '#fff'
              }
            },
            axisLine: {  // 控制y轴线%的样式
              lineStyle: {
                type: 'solid',
                color: '#293e60',
                width: '0' }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: ['#56AFFB'],
                width: 1,
                type: 'dotted'
              }
            }
          },
        ],
        series: [
          /* {
            name: '出勤率',
            icon: 'rect',
            type: 'line',
            yAxisIndex: 1,
            // smooth: true,
            symbol: 'none',
            data: data.shangganglv,
            itemStyle: {
              normal: {
                color: 'rgba(255,235,12, 1)', // 这里修改了柱子的颜色以及透明度，注意如果要修改透明度，一定要配置在itemStyle里面，直接写在外面不起作用。
                lineStyle: { // 系列级个性化折线样式
                  width: 2,
                  type: 'solid'
                }
              }
            }
          }, */

          {
            name: '考勤人数',
            type: 'bar',
						stack:'人数',
            radius: '10%',
            data: data.shanggangren,
            itemStyle: {
              normal: {
                // barBorderRadius: [4, 4, 4, 4],
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#2cd3ec'},
                    {offset: 0.5, color: '#32a6e9'},
                    {offset: 1, color: '#387de6'}
                  ])
              }
            },
            barWidth: 4,  // 控制柱子的宽度
            barGap: '50%'  // 控制柱子的间隔
          },
					{
						name: '缺勤人数',
						type: 'bar',
						stack:'人数',
						radius: '10%',
						data: data.queqinrenshu,
						itemStyle: {
							normal: {
								// barBorderRadius: [4, 4, 4, 4],
								/* color: new echarts.graphic.LinearGradient(
									0, 0, 0, 1,
									[
										{offset: 0, color: '#2cd3ec'},
										{offset: 0.5, color: '#32a6e9'},
										{offset: 1, color: '#387de6'}
									]) */
								color:'#FF5B86'
							}
						},
						barWidth: 4,  // 控制柱子的宽度
						barGap: '50%'  // 控制柱子的间隔
					},
          {
            name: '出勤率',
            type: 'bar',
            radius: '10%',
            yAxisIndex: 1,
            data: data.shangganglv,
            // data: data.shangganglv,
            itemStyle: {
              normal: {
                // barBorderRadius: [4, 4, 4, 4],
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#e8e31a' },
                    { offset: 0.5, color: '#fbbd07' },
                    { offset: 1, color: '#f8920e' }
                  ]
                )
              }
            },
            barWidth: 4,  // 控制柱子的宽度
            barGap: '50%'  // 控制柱子的间隔
          }
        ]
      }
      myChart.setOption(option, true)
    },
        /**
     * 方法名：renderEcharts月
     * 参数：(myChart, data) 参数一：echarts的dom，参数二：数据
     * 描述：人员考勤日/月/年统计echart图表渲染
     */
    renderMonthEcharts(myChart, data){
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
          // data: this.arr,
          show: true,
          itemWidth: 20, // 设置图例的宽高
          itemHeight: 8,
          textStyle: {
            fontWeight: "normal", // 标题颜色
            color: "#fff"
          },
          top: 10,
          bottom: 0
        },
        grid: {
          bottom: 40
        },
        xAxis: [
          {
            type: 'category',
            data: data.time,
            // data:this.dayXTime,
            axisLine: {  // 控制x轴线的样式
              lineStyle: {
                type: 'solid',
                color: '#293e60',
                width: '1'
              }
            },
            axisPointer: {
              type: 'shadow'
            },
            axisTick: { // 控制x轴坐标刻度不显示
              show: false
            },
            axisLabel : {
              textStyle: {
                color: '#2DD7EC'
              },
              rotate: 75,
              interval: 0
              // interval: data.xAxisLabelInterval,
              // showMaxLabel: true, //是否显示最大 tick 的 label
            },
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '考勤人数',
            nameTextStyle: {
              color: '#fff',
              align: 'left',
              padding:[0,20,0,0]
            },
            // max: data.max,
            axisLine: {  // 控制y轴线的样式
              lineStyle: {
                type: 'solid',
                color: '#293e60',
                width: '1' }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter: '{value} ',
              textStyle: {
                color: '#fff'
              }
            },
            splitLine: { //网格线
              show: true,
              lineStyle: {
                color: ['#293e60'],
                width: 1,
                type: 'dotted'
              }
            }
          },
          {
            type: 'value',
            name: '出勤率',
            nameTextStyle: {
              color: '#fff',
              padding:[0,0,0,35]
            },
            min: 0,
            // smooth: true,
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter: '{value} %',
              textStyle: {
                color: '#fff'
              }
            },
            axisLine: {  // 控制y轴线%的样式
              lineStyle: {
                type: 'solid',
                color: '#293e60',
                width: '0' }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: ['#56AFFB'],
                width: 1,
                type: 'dotted'
              }
            }
          },
        ],
        series: [
          /* {
            name: '出勤率',
            icon: 'rect',
            type: 'line',
            yAxisIndex: 1,
            // smooth: true,
            symbol: 'none',
            data: data.shangganglv,
            itemStyle: {
              normal: {
                color: 'rgba(255,235,12, 1)', // 这里修改了柱子的颜色以及透明度，注意如果要修改透明度，一定要配置在itemStyle里面，直接写在外面不起作用。
                lineStyle: { // 系列级个性化折线样式
                  width: 2,
                  type: 'solid'
                }
              }
            }
          }, */
          {
            name: '考勤人数',
						stack:'人数',
            type: 'bar',
            radius: '10%',
            data: data.shanggangren,
            itemStyle: {
              normal: {
                // barBorderRadius: [2, 2, 2, 2],
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#2cd3ec'},
                    {offset: 0.5, color: '#32a6e9'},
                    {offset: 1, color: '#387de6'}
                  ])
              }
            },
            barWidth: 2,  // 控制柱子的宽度
            barGap: '50%'  // 控制柱子的间隔
          },
					{
						name: '缺勤人数',
						stack:'人数',
						type: 'bar',
						radius: '10%',
						data: data.queqinrenshu,
						itemStyle: {
							normal: {
								// barBorderRadius: [2, 2, 2, 2],
								/* color: new echarts.graphic.LinearGradient(
									0, 0, 0, 1,
									[
										{offset: 0, color: '#2cd3ec'},
										{offset: 0.5, color: '#32a6e9'},
										{offset: 1, color: '#387de6'}
									]) */
									color:'#FF5B86'
							}
						},
						barWidth: 2,  // 控制柱子的宽度
						barGap: '50%'  // 控制柱子的间隔
					},
          {
            name: '出勤率',
            type: 'bar',
            radius: '10%',
            yAxisIndex: 1,
            data: data.shangganglv,
            // data: data.shangganglv,
            itemStyle: {
              normal: {
                // barBorderRadius: [2, 2, 2, 2],
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#e8e31a' },
                    { offset: 0.5, color: '#fbbd07' },
                    { offset: 1, color: '#f8920e' }
                  ]
                )
              }
            },
            barWidth: 2,  // 控制柱子的宽度
            barGap: '50%'  // 控制柱子的间隔
          }
        ]
      }
      myChart.setOption(option, true)
    },
    /**
     * 方法名：renderEcharts年
     * 参数：(myChart, data) 参数一：echarts的dom，参数二：数据
     * 描述：人员考勤日/月/年统计echart图表渲染
     */

    renderYearEcharts(myChart, data){
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
          // data: this.arr,
          show: true,
          itemWidth: 20, // 设置图例的宽高
          itemHeight: 8,
          textStyle: {
            fontWeight: "normal", // 标题颜色
            color: "#fff"
          },
          top: 10,
          bottom: 0
        },
        grid: {
          bottom: 20
        },
        xAxis: [
          {
            type: 'category',
            data: data.time,
            // data:this.dayXTime,
            axisLine: {  // 控制x轴线的样式
              lineStyle: {
                type: 'solid',
                color: '#293e60',
                width: '1'
              }
            },
            axisPointer: {
              type: 'shadow'
            },
            axisTick: { // 控制x轴坐标刻度不显示
              show: false
            },
            axisLabel : {
              textStyle: {
                color: '#2DD7EC'
              },
              interval: data.xAxisLabelInterval,
              // showMaxLabel: true, //是否显示最大 tick 的 label
            },
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '考勤人数',
            nameTextStyle: {
              color: '#fff',
              align: 'left',
              padding:[0,20,0,0]
            },
            // max: data.max,
            axisLine: {  // 控制y轴线的样式
              lineStyle: {
                type: 'solid',
                color: '#293e60',
                width: '1' }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter: '{value} ',
              textStyle: {
                color: '#fff'
              }
            },
            splitLine: { //网格线
              show: true,
              lineStyle: {
                color: ['#293e60'],
                width: 1,
                type: 'dotted'
              }
            }
          },
          {
            type: 'value',
            name: '出勤率',
            nameTextStyle: {
              color: '#fff',
              padding:[0,0,0,35]
            },
            min: 0,
            // smooth: true,
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter: '{value} %',
              textStyle: {
                color: '#fff'
              }
            },
            axisLine: {  // 控制y轴线%的样式
              lineStyle: {
                type: 'solid',
                color: '#293e60',
                width: '0' }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: ['#56AFFB'],
                width: 1,
                type: 'dotted'
              }
            }
          },
        ],
        series: [
          /* {
            name: '出勤率',
            icon: 'rect',
            type: 'line',
            yAxisIndex: 1,
            // smooth: true,
            symbol: 'none',
            data: data.shangganglv,
            itemStyle: {
              normal: {
                color: 'rgba(255,235,12, 1)', // 这里修改了柱子的颜色以及透明度，注意如果要修改透明度，一定要配置在itemStyle里面，直接写在外面不起作用。
                lineStyle: { // 系列级个性化折线样式
                  width: 2,
                  type: 'solid'
                }
              }
            }
          }, */
          {
            name: '考勤人数',
            type: 'bar',
						stack:'人数',
            radius: '10%',
            data: data.shanggangren,
            itemStyle: {
              normal: {
                // barBorderRadius: [4, 4, 4, 4],
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#2cd3ec'},
                    {offset: 0.5, color: '#32a6e9'},
                    {offset: 1, color: '#387de6'}
                  ])
              }
            },
            barWidth: 4,  // 控制柱子的宽度
            barGap: '50%'  // 控制柱子的间隔
          },
					{
						name: '缺勤人数',
						stack:'人数',
						type: 'bar',
						radius: '10%',
						data: data.queqinrenshu,
						itemStyle: {
							normal: {
								// barBorderRadius: [4, 4, 4, 4],
									color:'#fe5985'
							}
						},
						barWidth: 4,  // 控制柱子的宽度
						barGap: '50%'  // 控制柱子的间隔
					},
          {
            name: '出勤率',
            type: 'bar',
            radius: '10%',
            yAxisIndex: 1,
            data: data.shangganglv,
            // data: data.shangganglv,
            itemStyle: {
              normal: {
                // barBorderRadius: [4, 4, 4, 4],
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#e8e31a' },
                    { offset: 0.5, color: '#fbbd07' },
                    { offset: 1, color: '#f8920e' }
                  ]
                )
              }
            },
            barWidth: 4,  // 控制柱子的宽度
            barGap: '50%'  // 控制柱子的间隔
          }
        ]
      }
      myChart.setOption(option, true)
    },
    /**
     * 方法名:max
     * 参数(arr) 数组数据
     * 描述：获取数组中最大值
     */
    max (arr) {
      // debugger;
      var max = Number(arr[0])
      for(var i = 1; i < arr.length; i++) {
        if (Number(arr[i]) > max) {
          max = arr[i]
        }
      }
      return max
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
