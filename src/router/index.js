import Vue from 'vue'
import Router from 'vue-router'
import {getCookieInfo} from '../api/getCookie'

//===============================公共页面=================================
const Login = r => require.ensure([], () => r(require('@/pages/login')), 'login')
const Manage = r => require.ensure([], () => r(require('@/pages/manage')), 'manage')
const HomePage = r => require.ensure([], () => r(require('@/pages/homePage')), 'homePage')
const NoDataPage = r => require.ensure([], () => r(require('@/pages/noDataPage')), 'noDataPage')

//===============================基础信息=================================
//计件人员信息
const Pieceinformation = r => require.ensure([], () => r(require('@/pages/baseInfo/pieceinformation')), 'pieceinformation')
// 考勤摄像头信息
const CheckingCameras = r => require.ensure([], () => r(require('@/pages/baseInfo/checkingCameras')), 'checkingCameras')

const PieceWorker = r => require.ensure([], () => r(require('@/pages/baseInfo/pieceWorker')), 'pieceWorker')
const ManagePerson = r => require.ensure([], () => r(require('@/pages/baseInfo/managePerson')), 'managePerson')
//===============================派工信息===================================
const Paigong = r => require.ensure([], () => r(require('@/pages/dispatchInfo/paigong')), 'paigong')
const DeletePaigong = r => require.ensure([], () => r(require('@/pages/dispatchInfo/deletePaigong')), 'deletePaigong')




//===============================业务信息=====================================
// 打卡列表
const ClockList = r => require.ensure([], () => r(require('@/pages/business/clockList')), 'clockList')
// 迟到统计
const DispatchList = r => require.ensure([], () => r(require('@/pages/business/dispatchList')), 'dispatchList')
// 调班信息
const ShiftList = r => require.ensure([], () => r(require('@/pages/business/shiftList')), 'shiftList')
// 旷工信息
const AbsentList = r => require.ensure([], () => r(require('@/pages/business/absentList')), 'absentList')
// 早退---暂时不做
const Zaotui = r => require.ensure([], () => r(require('@/pages/business/zaotui')), 'zaotui')



//===============================报表页面===============================================
// 首页
const FaceAndAttendance = r => require.ensure([], () => r(require('@/baobiaoPages/faceAndAttendance.vue')), 'FaceAndAttendance')
// 考勤
const HomeCheckingV1 = r => require.ensure([], () => r(require('@/baobiaoPages/checking/index.vue')), 'HomeCheckingV1')
const HomeCheckingV2 = r => require.ensure([], () => r(require('@/baobiaoPages/checking20190218/index.vue')), 'HomeCheckingV2')
const HomeCheckingV3 = r => require.ensure([], () => r(require('@/baobiaoPages/checking-v20190221/Checking-v20190221.vue')), 'HomeCheckingV3')
// 打卡
const Vision = r => require.ensure([], () => r(require('@/baobiaoPages/vision.vue')), 'Vision')



Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    // 报表
    {
      path: '/faceAndAttendance',
      name: 'FaceAndAttendance',
      component: FaceAndAttendance
    },
    {
      path: '/homecheckingV1',
      name: 'HomeCheckingV1',
      component: HomeCheckingV1
    },
    {
      path: '/homecheckingV2',
      name: 'HomeCheckingV2',
      component: HomeCheckingV2
    },
    {
      path: '/homecheckingV3',
      name: 'HomeCheckingV3',
      component: HomeCheckingV3
    },
    {
      path: '/homechecking',
      name: 'HomeCheckingV3',
      component: HomeCheckingV3
    },
    {
      path: '/vision',
      name: 'Vision',
      component: Vision
    },
    
    // 后台管理
    {
      path: '/manage',
      component: Manage,
      name: '',
      children: [{
        path: '/',
        component: HomePage
      }, {
        path: '/zaotui',
        component: Zaotui,
        meta: ['数据管理', '早退信息统计表']
      },{
        path: '/pieceinformation',
        component: Pieceinformation,
        meta: ['基础信息', '计件人员信息']
      },
			{
				path: '/PieceWorker',
				component: PieceWorker,
				meta: ['基础信息', '计件人员']
			},
			{
				path: '/ManagePerson',
				component: ManagePerson,
				meta: ['基础信息', '管理人员']
			},
        {
        path: '/checkingcameras',
        component: CheckingCameras,
        meta: ['基础信息', '考勤摄像头信息']
      }, {
        path: '/paigong',
        component: Paigong,
        meta: ['派工信息', '派工信息导入']
      }, {
        path: '/deletepaigong',
        component: DeletePaigong,
        meta: ['派工信息', '派工信息删除']
      }, {
        path: '/clocklist',
        component: ClockList,
        meta: ['业务信息', '人脸打卡记录']
      }, {
        path: '/dispatchList',
        component: DispatchList,
        // component: NoDataPage,
        meta: ['业务信息', '迟到统计']
      }, {
        path: '/absent',
        component: AbsentList,
        // component: NoDataPage,
        meta: ['业务信息', '旷工统计']
      }, {
        path: '/shiftList',
        component: ShiftList,
        // component: NoDataPage,
        meta: ['业务信息', '调班统计'],
      }]
    }
  ]
})
router.beforeEach((to, from, next) => {
  // debugger;
  const username = getCookieInfo().username
  // const token = sessionStorage.getItem('token')
  if (!username && to.path!== '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

export default router
