import axios from 'axios'
// import global from './global'

// axios.defaults.baseURL = global.BASE_URL
axios.defaults.timeout = 100000

// 请求时拦截
axios.interceptors.request.use(config => {
    // 发送请求之前做一些处理
    /* if (sessionStorage.token) {
        config.headers.Authorization = `token ${sessionStorage.token}`
    } */
    return config
}, error => {
    // 当请求异常时做一些处理
    return Promise.reject(error)
})

// 响应时拦截
axios.interceptors.response.use(response => {
    // 返回响应时做一些处理
    return response
}, error => {
    // 当响应异常时做一些处理
    return Promise.resolve(error.response)
})

function checkStatus(response) {
    //如果http状态吗正常，则直接返回数据
    if (response && (response.status ===200 || response.status === 304 || response.status === 400)) {
        return response
    }
    // 异常状态下，把错误信息返回去
    return {
        status: -404,
        msg: '网络异常'
    }
}
function checkCode(res) {
    // 如果code异常（这里已经包括网络错误，服务器错误，后端抛出的错误），可以提示一下用户
    if (res.status === -404) {
        console.log(res.msg)
    }
    if(res.data && (res.data.ret != 200)) {
      console.log(res.data.msg)
    }
    return res
}

export default {
    post (url, data) {
        return axios({
            method: 'post', //请求方式
            url, //请i去地址
            data: data, //请求的数据
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                // 'processData':false,
                // 'contentType':false
            }
        }).then(
            
            (response) => {
                
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res)
            }
        )
    },
    get (url, data) {
        return axios({
            method: 'get',
            url,
            data: data,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                // 'Content-Type': 'application/json;charset=UTF-8',
                'Content-Type':'application/x-www-form-urlencoded' //上传文件
            }
        }).then(
            (response) => {
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res)
            }
        )
    },
    postFileData (url, data) {
        return axios({
            method: 'post', //请求方式
            url, //请i去地址
            data: data, //请求的数据
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'multipart/form-data',
                // 'processData':false,
                // 'contentType':false
            }
        }).then(
            (response) => {
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res)
            }
        )
    },
    postFormData (url, data) {
        return axios({
            method: 'post', //请求方式
            url, //请i去地址
            data: data, //请求的数据
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded;chartset=UTF-8'
            }
        }).then(
            (response) => {
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res)
            }
        )
    },
}
