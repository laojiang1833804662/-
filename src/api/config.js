import axios from "axios";
import router from '../router/index'
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? "/api" : "http://www.chst.vip"
axios.defaults.withCredentials = true; //允许请求携带认证
axios.create({
    timeout: 4000
})

// 创建请求拦截
axios.interceptors.request.use(config=>{
    if(config.url==='/users/login'){
        //登录和注册是不需要携带taken的
        return config
    }else{
        //有taken才给你放行
        let token=localStorage.getItem('wode')
        config.headers['authorization']== token;//把token的值赋给每一次请求的请求头
        return config
    }


   
})
//响应拦截
axios.interceptors.response.use(config=>{
//防止用户自己创建token，接受数据后端判断
let {data}=config
    if(data.code=='1004'){
        alert("登录信息失效请重新登录")
        //引入router 
          router.push('/login')
    }
    return config
})


export default axios