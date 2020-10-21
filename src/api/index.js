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