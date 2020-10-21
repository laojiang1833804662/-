import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path:"/login",
    component:()=>import( "../pages/Login/index.vue")
  },
  {
    path:"/",
    component:()=>import( "../pages/Home/index.vue")
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
