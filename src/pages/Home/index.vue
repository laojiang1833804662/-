<template>
    <div class="cpp">
        <el-container>
     <el-aside width="150px">

        
<el-row class="tac">
  <el-col :span="12">
    <!-- <h5>默认颜色</h5> -->
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :router="true"
      
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <!-- index表示跳转到某个路由 -->
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>



         <el-submenu index="1-3">
          <template slot="title">选项3</template>
          <el-menu-item index="1-3-1">选项1</el-menu-item>
          <el-menu-item index="1-3-1">选项1</el-menu-item>
        </el-submenu>
       
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="/student">学员信息</el-menu-item>
      
      <!-- <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item> -->
      <!-- <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item> -->
      <!-- <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item> -->
    </el-menu>
  </el-col>
  
</el-row>



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
                          
                           <span>欢迎你:{{userInfo.nickname}}</span>
                           <span @click="click" class="quit">退出</span>
        
    </el-header>
    <!-- 主体位置 -->
    <el-main>
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
            localStorage.removeItem("wode")
            localStorage.removeItem("userInfo")
            this.$router.push("/login")
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    mounted () {
      console.log(this.userInfo);
    }
  }
</script>
