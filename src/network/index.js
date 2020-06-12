import request from './request'

// 侧边栏
export const NavLeft = ()=>request({
    url:`/sysData/getData/home`,
    method:'post'
})
// 首页登录
export const Longin = (username,password)=>request({
    url:'/login/login',
    method:'post',
    params:{
        password,
        username
    }
})
// json数据接口
export const JsonData = (data)=>request({
    url:"/sysData/getPage",
    method:'get',
    params:data
})

//z增加json数据
export const AddJsonData = (data)=>request({
    url:'/sysData/add',
    method:'post',
    data:data
})

//更新数据json
export const uperJsonData = (data)=>request({
    url:'/sysData/update',
    method:'post',
    data:data
})

//删除数据

export const deleData = (id)=>request({
    url:"/sysData/delById",
    method:'post',
    params:id
})