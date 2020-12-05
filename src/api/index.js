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
//获取学员信息
export const getStuList =(params)=>axios({
    url:"/students/getstulist",
    params
})
//删除学员
export const delStuList =(sId)=>axios.get(`/students/delstu?sId=${sId}`)
//增加学员信息
export const addStuDetail=(data)=>axios({
    url:"students/addstu",
    method:"post",
    data,
})
//修改学员信息
export const updateStu=(data)=>axios({
    url:"/students/updatestu",
    method:"post",
    data,
})
//搜索学员
export const seacherstu=(params)=>axios({
    url:`/students/searchstu`,
    params
})
//获取班级列表
export const getclasses=()=>axios.get(`/students/getstulist`)
//获取登录日志
export const getlogin=()=>axios.get(`/getloginlog`)

