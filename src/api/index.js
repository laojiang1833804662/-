import axios from './config'
//登入
export  const login=(username,password)=>axios({
    url:"/users/login",
    method:"post",
    data:{
        username,
        password
    }
})
//登录请求
export const getMenuList=()=>axios.get("/permission/getMenuList")
//获取验证码
export const getCaptcha = () => axios.get("/users/getCaptcha")
//刷新验证码
// export const resfredshCaptcha = () => axios.get("/users/getCaptcha")
//校验验证码
export const verifyCaptcha = (captcha) => axios.get(`/users/verifyCaptcha?captcha=${captcha}`)