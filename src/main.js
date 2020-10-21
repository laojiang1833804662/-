import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ".././src/assets/css/login.css"
import "../src/assets/css/mian.css"
import "../src/assets/iconfont/iconfont.css"

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// Vue.config.productionTip = false;
Vue.use(ElementUI);


//路由前置钩子，导航守卫
router.beforeEach((to, from, next) => {
 //to 代表去哪里 form 从哪来。next表示放行
 
  //用户登录之后会有taken，判断本地存储有没有taken，
  let token=localStorage.getItem("wode")
  if(token){
    //如果是登录注册就不要拦截
    //如果有也通过
    next()
  }else{
    //没token
    if(to.path=="/login"){
      //如果登录页面也放行
      next()//放行
    }else{
      //让其他页面跳转到登录页面
      next({path:"/login"})
    }
  }

})

// import "./Utils/recursionRoutes"


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
