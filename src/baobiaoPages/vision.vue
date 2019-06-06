<template>
	<el-container>
		<el-header>
			<!--标头-->
			<div class="vision_title">
				<img src="../assets/images/logo.png" alt="">
				<span @click="enterIndexPage('/faceAndAttendance')">三一视觉考勤</span>
			</div>
			<!--右上角时间-->
			<em class="time" v-text="currentTime"></em>
			<div class="home_head-btn" @click="cameraNameChange">
				{{currentCenterName}}
				<!--默认向下展开三角-->
				<div class="triangle_top" v-show="flag"></div>
				<!--点击后向上收起-->
				<div class="triangle_bottom" v-show="!flag"></div>
			</div>
			<div class="currentCamera" v-text="selectedCamera=='全部'?'':selectedCamera"></div>
		</el-header>
		<el-main>
			<div class="item">
				<p class="title">入口识别</p>
				<div class="vision_check">
					<ul>
						<li v-for="(item , index) in userInList">
							<div class="top">
								<div class="left">
									<img :src="item.facesnapurl" alt="">
								</div>
								<!-- <div class="right"> -->
								<div class="item-right">
									<p v-html="item.username">王占军</p>
									<p v-html="item.workno">39006277</p>
									<p v-html="item.department">三一重工</p>
									<p v-html="item.pushtimestr">16:38:26</p>
								</div>
							</div>
							<div class="bottom">
								入口打卡
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="item">
				<p class="title">人脸识别</p>
				<div class="vision_check">
					<div class='img'>
						<img src="../assets/images/vision_head.png" alt="">
						<div class="picture">
							<img :src="nowObject.snappicurl" alt="">
						</div>
						<div class="light">
							<img src="../assets/images/light.png" alt="">
						</div>
					</div>
					<div class="text">打卡信息</div>
					<div class="message">
						<p>姓名：<span v-html="nowObject.username"></span></p>
						<p>工号：<span v-html="nowObject.workno"></span></p>
						<p>部门：<span v-html="nowObject.department"></span></p>
					</div>
					<div class="time">
						打卡时间：<span v-html="nowObject.pushtimestr">18:36:36</span>
					</div>
				</div>
			</div>
			<div class="item">
				<p class="title">出口识别</p>
				<div class="vision_check">
					<ul>
						<li v-for="(item , index) in userOutList">
							<div class="top">
								<div class="left">
									<img :src="item.facesnapurl" alt="">

								</div>
								<div class="item-right">
									<p v-html="item.username">王占军</p>
									<p v-html="item.workno">39006277</p>
									<p v-html="item.department">三一重工</p>
									<p v-html="item.pushtimestr">16:38:26</p>
								</div>
							</div>
							<div class="bottom item3">
								出口打卡
							</div>
						</li>
					</ul>
				</div>
			</div>
		</el-main>
		<div class="home_container" :class="{off:flag}">
			<img class="close" src="../assets/images/close.png" @click="close" />
			<ul class="home_container_list">
				<li v-for="(centerItem,index) in sanyAttendanceSiteList"
				:key="index"
				:ref="centerItem.stateno"
				@click="attendClick(centerItem)">{{centerItem.attendancesite}}</li>
			</ul>
		</div>
	</el-container>
</template>

<script>
	import moment from 'moment'
	import $http from '../api/http'
	import {getCookieInfo} from '../api/getCookie'
	export default {
		data() {
			return {
				message: '',
				currentTime: '2018',
				currentCenterName: '摄像头',
				flag: true,
				userInList: [],
				userOutList:[],
				nowObject:{
					snappicurl: ''
				},
				sanyAttendanceSiteList: [],
				stateno:'',
				timer:null,
				timer1:null,
				timer2:null,
				selectedCamera:sessionStorage.selectedCamera =='undefined'?'全部':sessionStorage.selectedCamera // 选中的摄像头
			};
		},
		beforeDestroy(){
			clearInterval(this.timer);
			clearInterval(this.timer1);
			clearInterval(this.timer2);
			this.timer = null;
			this.timer1 = null;
			this.timer2 = null;
		},
		mounted() {
			this.currentTime = this.getCurrentDateTime();
			this.timer1 = setInterval(() => {
				this.currentTime = this.getCurrentDateTime();
			}, 1000);

			// 获取摄像头下拉列表
			this.getCameraList();
			// 获取出入口数据




		    this.timer = setInterval(() => {
				if(sessionStorage.stateno){
				   this.getVisionList({stateno:sessionStorage.stateno});
				}else{
				   this.getVisionList({stateno:''});
				}

			}, 500);
			this.timer2 = setInterval(() => {
				window.location.reload();
			},1000*36000)
			/* this.$once('hook:beforeDestroy',() => {
				clearInterval(timer)
			}) */

		},
		methods: {
			enterIndexPage(path) {
				// 路径从state中获取
				// window.location.href = `${this.$store.state.baseUrl}/sanyShebei`; //测试
				 this.$router.replace(path)
			},
			getCurrentDateTime() {
				return moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
			},
		    cameraNameChange() {
				// clearInterval(this.timer)
				this.flag = !this.flag;
			},
			attendClick(currentCamera){//摄像头下拉列表点击事件
				this.selectedCamera = currentCamera.attendancesite
				sessionStorage.selectedCamera =  currentCamera.attendancesite
				//this.stateno = currentCamera.stateno
				sessionStorage.stateno = currentCamera.stateno
				this.getVisionList({stateno:sessionStorage.stateno}),
				this.flag = !this.flag;
			},
			close() {
				this.flag = !this.flag
			},
			async getCameraList(){//摄像头下拉List

				let axiosUrl = getCookieInfo().baseUrl + '/sanyUserPushRecord/useRattendanceHisSelect';
				const res = await $http.post(axiosUrl)
				// const res = await $http.post("/sanyUserPushRecord/useRattendanceHisSelect")
				if (res && res.data.ret=== "200"){
					this.sanyAttendanceSiteList =  res.data.sanyAttendanceSiteList

				}
			},
			async getVisionList(data) {//获取人脸信息
				let axiosUrl = getCookieInfo().baseUrl + '/sanyUserPushRecord/useRattendanceHisInOut';
				const res = await $http.post(axiosUrl, data)
				if (res && res.data.ret=== "200"){
					this.userInList = res.data.userInList? res.data.userInList: [];
					this.userOutList = res.data.userOutList? res.data.userOutList: [];
					this.nowObject = res.data.nowObject? res.data.nowObject: {snappicurl:''};

				}
			}
		},

	}
</script>

<style lang="less" scoped>
	.el-container {
		background: url(../assets/images/body_bg.png) no-repeat;
		background-size: 100% 100%;
		height: 100%;

		.el-header {
			color: #333;
			text-align: center;
			height: 110px !important;
			background: url(../assets/images/body_title.png) no-repeat;
			background-size: 100% 100%;
			padding-top: 20px;
			position: relative;

			.vision_title {
				font-size: 0.44rem;
				color: #fff;
				cursor: pointer;
				font-weight: bold;
				height: 100%;

				img {
					vertical-align: middle;
				}
			}

			.time {
				width: 240px;
				font-size: 0.32rem;
				right: 44px;
				color: #ababab;
				position: absolute;
				top: 70px;
				z-index: 10;
				text-align: left;
				font-family: fontnameUnidreamLED !important;
			}

			/*摄像头按钮*/
			.home_head-btn {
				// width:1.4rem;
				width: 140px;
				position: fixed;
				left: 24px;
				top: 60px;
				height: 40px;
				text-align: center;
				line-height: 40px;
				background: gradient(linear, left top, left bottom, from(#4CDDED), to(#0088FE));
				background: linear-gradient(to top, #4CDDED, #0088FE);
				background: -ms-linear-gradient(to top, #4CDDED, #0088FE);
				color: #fff;
				font-size: 22px;
				border-radius: 5px;
				cursor: pointer;

				img {
					vertical-align: middle
				}

				/*默认向下展开三角*/
				.triangle_top {
					width: 0px;
					height: 0px;
					border: 7.5px solid transparent;
					border-top: 9px solid #fff;
					position: absolute;
					top: 16px;
					right: 7px;
				}

				/*点击后向上收起*/
				.triangle_bottom {
					width: 0px;
					height: 0px;
					border: 7.5px solid transparent;
					border-bottom: 9px solid #fff;
					position: absolute;
					top: 8px;
					right: 7px;
				}
			}
			.currentCamera{
				position: fixed;
				left: 180px;
				top: 60px;
				height: 40px;
				font-size: 18px;
				padding-top: 6px;
				color:#fff;
			}
		}

		.el-main {
			color: #333;
			text-align: center;
			height: calc(100% - 110px);
			overflow: hidden;
			display: flex;
			flex-direction: row;

			.item {
				display: flex;
				flex-direction: column;
				background-color: rgba(39, 69, 111, 0.3);
				padding: 15px;
				border: 1px solid rgba(255, 255, 255, 0.1);
				overflow: hidden;
				.title {
					padding-left: 30px;
					font-size: 0.25rem;
					color: #FFF;
					font-weight: bold;
					text-align: left;
					/*background: url(../assets/images/index_titleIcon.png) no-repeat;*/
					background-size: 20px 100%;
          position:relative;
				}
        .title:after{
          display: block;
          content: '';
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 12px;
          background: #31E6FF;
          left: 0px;
          top: 42%;
          margin-top: -5px;
        }

				.vision_check {
					flex: 1;

					ul {
						width: 100%;
						height: 100%;
						padding: 20px 10px;
						box-sizing: border-box;

						li {
							width: 33%;
							// height: 25%;
							margin-bottom: 20px;
							float: left;
							padding: 10px 10px;
							box-sizing: border-box;

							.top {
								width: 100%;
								// height: calc(100% - 45px);
								height:125px;
								overflow: hidden;
								.left {
									// width: 50%;
									// height: 100%;
									width: 100px;
									height: 125px;
									overflow: hidden;

									img {
										width: 100%;
										// height: 90%;
										height:100%;
									}
								}

								.item-right {
									// width: 50%;
									height: 100%;
									padding: 10px;
									box-sizing: border-box;
									margin-left: 100px;
									p {
										color: #FFF;
										// height: 25%;
										font-size: 0.14rem;
										box-sizing: border-box;
										/* line-height: 35px; */
										text-align: left;
										overflow: hidden;
										text-overflow: ellipsis;
										white-space: nowrap;
										margin-bottom:8px;
									}
								}
							}

							.bottom {
								margin-top: 15px;
								height: 30px;
								border: 2px solid #006EA3;
								line-height: 30px;
								font-size: 0.18rem;
								color: #06F5F0;
								font-weight: 550;
								border-radius: 5px;
								letter-spacing: 4px;

							}
						}
					}
				}
			}

			/*入口识别*/
			.item:nth-of-type(1) {
				flex: 3;
			}

			/*人脸识别*/
			.item:nth-of-type(2) {
				flex: 2;
				margin: 0px 15px;

				.vision_check {
					margin-top: 40px;
					height: calc(100% - 73px);

					.img {
						width: 80%;
						margin: 0 auto;
						height: 45%;
						position: relative;

						img {
							width: 100%;
							height: 100%;
						}

						.picture {
							height: 85%;
							width: 85%;
							position: absolute;
							/* opacity: .8; */
							top: 0;
							bottom: 0;
							left: 0;
							right: 0;
							margin: auto;
							border-radius: 50%;
							/* background: url(../assets/images/1830447565.jpg) 100% 100% no-repeat; */
							/* background: yellow; */
							img{
								border-radius: 100%;
							}
						}

						.light {
							position: absolute;
							width: 80%;
							top: 40%;
							left: 10%;
							animation: light 3s infinite linear;

							img {
								width: 80%;
							}
						}
					}

					.text {
						width: 60%;
						height: 45px;
						line-height: 45px;
						border: 1px solid #009DDC;
						background: rgba(12, 71, 115, 0.7);
						margin: 55px auto 35px;
						color: #02D7FF;
						font-size: 0.25rem;
					}

					.message {
						width: 80%;
						margin: 0 auto;

						p {
							color: #30D6E7;
							font-size: 0.22rem;
							text-align: left;
							width: 70%;
							margin: 0 auto;
							padding-left: 20px;
							margin-bottom: 20px;
							text-shadow: 0 0 10px #fff;
						}
					}

					.time {
						width: 70%;
						margin: 0 auto;
						height: 55px;
						background: #1D3051;
						font-size: 0.25rem;
						color: #02B801;
						line-height: 55px;
						margin-top: 50px;
					}
				}
			}

			/*出口识别*/
			.item:nth-of-type(3) {
				flex: 3;

				.bottom.item3 {
					border: 2px solid rgba(252, 207, 0, 0.8);
					color: rgba(252, 207, 0, 0.8);
				}
			}
		}

		/*摄像头模态列表*/
		.home_container {
			width: 24%;
			background-color: #0e2154;
			opacity: 0.9;
			position: absolute;
			top: 120px;
			bottom: 30px;
			left: 20px;
			z-index: 100;
			text-align: center;

			&.off {
				display: none;
				transition: 1s;
			}

			&_title {
				color: yellow;
				font-size: 24px;
				margin-top: 60px;
				cursor: pointer;
			}

			.close {
				position: absolute;
				top: 10px;
				right: 20px;
				font-size: 30px;
				color: #1578CF;

				&:hover {
					cursor: pointer;
				}
			}

			&_list {
				width: 80%;
				margin: 0 auto;

				&>li {
					background: rgba(12, 51, 103, 0.1);
					height: 40px;
					line-height: 40px;
					border: 1px solid rgba(0, 136, 255, 0.6);
					margin-top: 20px;
					color: #50b4ff;
					font-size: 16px;
					border-radius: 5px;

					&:hover {
						background: rgba(08, 72, 158, 1);
						cursor: pointer;
						color: #fff
					}
				}
			}
		}
	}

	/*人脸考勤上下移动动画*/
	@keyframes light {
		0% {
			top: 10%;
			-webkit-top: 10%;
			-o-top: 10%;
			-moz-top: 10%;
		}

		25% {
			top: 40%;
			-webkit-top: 40%;
			-o-top: 40%;
			-moz-top: 40%;
		}

		50% {
			top: 70%;
			-webkit-top: 70%;
			-o-top: 70%;
			-moz-top: 70%;
		}

		75% {
			top: 40%;
			-webkit-top: 40%;
			-o-top: 40%;
			-moz-top: 40%;
		}

		100% {
			top: 10%;
			-webkit-top: 10%;
			-o-top: 10%;
			-moz-top: 10%;
		}
	}
	@media (max-width: 1919px){
	  .el-container .el-main .item .vision_check ul li{
			margin-bottom: 0px;
		}
		.el-container .el-main .item .title{color:red;}
	}
</style>
