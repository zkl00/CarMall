import axios from 'axios'
import {swart} from './baserURL'
export default function request(confing){
    return new Promise((resove,errafi)=>{
        const instance = axios.create({
            baseURL:swart
        })
        // 设置请求头
        // instance.defaults.headers.post['content-type'] = 'application/x-www-form-urlencoded';
        // 响应拦截
        instance.interceptors.response.use((confing)=>{
            return confing.data
        })
        // 请求拦截
        instance.interceptors.request.use((confing)=>{
            //拦截token
            // let tocke = 'EEF5E0A2-D459-51DF-88E4-A255B5FD53A2'
            // confing.headers.tocke = tocke
            return confing
        })
        instance(confing).then((res)=>{
            resove(res)
        }).catch((err)=>{
            console.log(err);
            errafi(err)
        })


    })
}