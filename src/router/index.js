import Vue from "vue";
import VueRouter from "vue-router";
// import { component } from "vue/types/umd";
// import Home from "../views/Home.vue";
import allRoutes from "./allRouters"
//解决路由导航到统一路劲重复报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}



Vue.use(VueRouter);
const routes = [
  {
    path:"/login",
    component:()=>import( "../pages/Login/index.vue")
  },
 

  
  // {
  //   path:"*",
  //   component:()=>import( "../components/wuxiao404/index.vue")
  // },

];

const router = new VueRouter({
  routes
});

export default router;
