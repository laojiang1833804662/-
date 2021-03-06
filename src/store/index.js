import Vue from "vue";
import Vuex from "vuex";
// import allRouters from '../router/allRouters'
import recursionRoutes from '../Utils/recursionRoutes'
import {getMenuList} from '../api/index'
import dynamicRoutes from "../router/dynamicRoutes"
import allRoutes from "../router/allRouters";
import router from "../router";

Vue.use(Vuex);
//刷新页面回丢失用户信息，所以要从本地取
let userInfo=localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):{}
let permissionbuttons=localStorage.getItem("permissionbuttons")?JSON.parse(localStorage.getItem("permissionbuttons")):{}
// userInfo=JSON.parse(userInfo)
export default new Vuex.Store({
  state: {
    userInfo,
    sideMenu:[],//定义用户侧边栏菜单
    crumbs:[],//设置面包屑
    permissionbuttons,
  },
  mutations: {
    //更改useinfo
    SET_USERINFO(state,payload){
      state.userInfo=payload
    },
    SET_MENULIST(state,payload){
     state.sideMenu=payload
     //动态的讲路由添加到rotres中
     //核心方法  router。addrouters(符合路由配置的规则的数据)
      let target=dynamicRoutes.find(item=>item.path==="/")
      target.children=[...state.sideMenu]
      //  console.log(dynamicRoutes);
      router.addRoutes(dynamicRoutes)
    //因为这个数组里面的数据都是对象，都是引用数据类型，所以=是把内存地址赋值
    //所以当target改变时，原来数组里面的对象也会改变，所以原数组改变了，所以复制对象和数组时要用深拷贝。
    
    },
   SET_CRUMBS(state,payload){
      state.crumbs=payload
   },
   SET_PERMISSION_BUTTON(state,payload){
   state.permissionbuttons=payload
   }
  },
  actions: {
     //发送请求获取用户菜单
     async FETCH_MENULIST({commit}){
      //通过allrousers和请求回来的菜单数据进行对比，结果提交给mutation
      let userMenu =   await getMenuList()
     let sidemenu= recursionRoutes(allRoutes,userMenu.data.menuList)
    //  console.log(sidemenu);
       commit('SET_MENULIST',sidemenu)
      // getMenuList().then(res=>{console.log(res);})
     }

  },
  modules: {}
});
