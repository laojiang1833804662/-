 
 const dynamicRoutes =[
  {
    path:"/",
     component:()=>import( "../pages/Home/index.vue"),
     children: []},
   {
     path:"*",
     component:()=>import( "../pages/pages-404/index.vue")
   },
  ]
  export default dynamicRoutes
  // export 如果有{}那么就是导出一个对象需要解构，还有export也是 export defult 变量，那就不需要解构