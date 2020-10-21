<template>
    <div class="cpp">
        <el-container>
     <el-aside width="150px">
        

<el-col :span="12">
<h3>千峰</h3>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>

        <el-menu-item-group>
          <!-- <template slot="title">分组一</template> -->
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        
          <el-menu-item index="1-3">选项3</el-menu-item>
        
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </el-col>


     </el-aside>
     <el-container>
    <el-header>
        <span>我的</span>
        <span>千峰</span>
        
        
           <el-avatar shape="square"
                           :size="40"
                           fit="fit"
                           src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIzXDib7zrmdYxdEQpYk85B26DZAJS6PUJC7ic4Fydibdz9L2gU3hloPcibuyo0xAFztxqPbgdVWp1zpQ/132"></el-avatar>
                          
                           <span>欢迎你:{{userInfo.nickname}}</span>
                           <span @click="click" class="quit">退出</span>
        
    </el-header>
    <el-main>Main</el-main>
   </el-container>
   </el-container>
    </div>
</template>
<style scoped>
.quit{
  cursor: pointer;
  color:hotpink;
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
    background:linear-gradient(90deg,#fff,#000)
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
