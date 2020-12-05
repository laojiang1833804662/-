<template>
    <div class="cpp">
        <el-container>
          <!-- 去掉px切换时会自动变换 -->
     <el-aside width="150">
       <!-- elmen 不可少 -->
       <!-- :default-active="$route.path" 加冒号变成动态属性，解决切换路由，侧边栏不动的问题 -->
       <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        :router="true"
      >
      <!-- 引入的侧边栏插件 -->
    <qf-sub-menu :sideMenu="sideMenu"></qf-sub-menu>
       </el-menu>
     </el-aside>
     <el-container>
       <!-- 头部位置 -->
    <el-header>
      <span class="iconfont icon-shouqi" style="font-size:20px"></span>
        <span>我的</span>
        <span>千峰</span>
        
        
           <el-avatar shape="square"
                           :size="40"
                           fit="fit"
                           src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIzXDib7zrmdYxdEQpYk85B26DZAJS6PUJC7ic4Fydibdz9L2gU3hloPcibuyo0xAFztxqPbgdVWp1zpQ/132"></el-avatar>
                          
                           <span @click="$router.push('/Mine')">欢迎你:{{userInfo.nickname}}</span>
                           <span @click="click" class="quit">退出</span>
        
    </el-header>
    <!-- 主体位置 -->
    <el-main>
      <!-- 面包屑 -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item  
               v-for="crumb in crumbs" :to="{path:crumb.path}" >
              {{crumb.meta.name}}
            </el-breadcrumb-item> 
          </el-breadcrumb>
      <router-view></router-view>
    </el-main>
   </el-container>
   </el-container>
    </div>
</template>
<style scoped>
.quit{
  cursor: pointer;
  color:hotpink;
}
#app .el-menu--inline {
   background: honeydew;
 }
 .el-row span{
   color:#fff;
 }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #fff;
    text-align: center;
    line-height: 200px;
  
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;

  }
  
.el-container,.cpp{
    height: 100%;
}
.el-menu-vertical-demo{
    background: none;
} 
 .el-header{
   display: flex;
   justify-content: space-between;
   background:linear-gradient(90deg,#1596fb,#002dff);
   color: #fff;
 }
 .el-aside{
     background:linear-gradient(90deg,#1596fb,#002dff);
 }
 .el-avatar{
   align-items:center;
   margin:10px;
 } 
</style>
<script>
import {mapState} from 'vuex'
export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      click(){
        //退出登录要清除token和userinfo
        //然后跳转到登录页
        //由于路由时动态生成得，所以会缓存，退出时要刷新页面获取新的路由，或者说把缓存清空，
            localStorage.removeItem("wode")
            localStorage.removeItem("userInfo")
            localStorage.removeItem("permissionbuttons")
            this.$router.push("/login")
            window.location.reload()
      }
    },
    computed: {
      ...mapState(['userInfo','sideMenu','crumbs'])
    },
    mounted () {

    }
  }
</script>
