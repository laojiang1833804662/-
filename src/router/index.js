import Vue from "vue";
import VueRouter from "vue-router";
// import { component } from "vue/types/umd";
// import Home from "../views/Home.vue";
import allRoutes from "./allRouters"

Vue.use(VueRouter);

const routes = [
  {
    path:"/login",
    component:()=>import( "../pages/Login/index.vue")
  },
  {
    path:"*",
    component:()=>import( "../pages/pages-404/index.vue")
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
