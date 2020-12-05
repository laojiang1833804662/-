import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ".././src/assets/css/login.css"
import "../src/assets/css/mian.css"
import "../src/assets/iconfont/iconfont.css"
//ui总插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//侧边栏插件
import qfsubmenu from 'qf-sub-menu'

//进度条插件
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//引入判断按钮权限的方法
import has from './Utils/has'

 Vue.prototype.$has = has;
Vue.prototype.$bus = new Vue();

//目的讲组件注册到全局
Vue.use(ElementUI);
Vue.use(qfsubmenu);


//路由前置钩子，导航守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
 //to 代表去哪里 form 从哪来。next表示放行
 
  //用户登录之后会有taken，判断本地存储有没有taken，
  let token=localStorage.getItem("wode") || ""
  if(token){
    //如果是登录注册就不要拦截
    //如果有也通过
    if(store.state.sideMenu.length == 0){
      //说明没有用户路由，触发cation获取用户路由
      store.dispatch('FETCH_MENULIST')
      .then(()=>{next({path:to.path})
    //这里要注意，next里面要传参数即要进入的页面的路由信息，因为next传参
    //数后，当前要进入的路由就会被废止，转而进入参数对应的路由，虽然是同一个路由，这么做的目的是
    //为了确保addrouters生效了
    
    })
    }else{next()}
    
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
  NProgress.done()
})
//token有可能过期，过期之后不能继续拿数据了



//使用路由后置钩子处理面包屑
router.afterEach((to,from)=>{
  let crumbslist=to.matched.slice(1)
  store.commit("SET_CRUMBS",crumbslist)
})

//定义全局自定义指令，判断权限
// 这个自定义指定，指的是所有被打标的dom元素都会执行，
Vue.directive('has',{
  bind(el,binding,VNode){
    console.log(binding);
    //el表示要操控的dom元素
   //定义用户是否有权限的方法
   //binding含有一些属性
   
   let buttons=localStorage.getItem("permissionbuttons")
   if(!has(buttons,binding.value)){
    
    let className = el.className;
    el.className = className + " " + "is-disabled"
    el.disabled = true
   }
  },
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
