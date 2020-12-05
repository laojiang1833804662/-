<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="username"
      label="登录账户"
      width="180">
    </el-table-column>
    <el-table-column
      prop="lastLogin.ip"
      label="ip"
      width="180">
    </el-table-column>
    <el-table-column
      prop="lastLogin.loginTime"
      label="上次登录时间">
    </el-table-column>
     <el-table-column
      prop="nowLogin.ip"
      label="本次登录ip">
    </el-table-column>
    <el-table-column
      prop="nowLogin.loginTime"
      label="本次登录时间">
    </el-table-column>
  </el-table>
</template>

<script>
import { log } from 'util'
import {getlogin} from './../../../api/index'
  export default {
    data() {
      return {
        tableData: []
      }
    },
   mounted () {
       getlogin()
       .then(res=>{
           if(res.data && res.data.data){
               this.$message("登录日志获取成功")
               this.tableData=res.data.data
           }else{
               this.$message("登录日志获取失败")
           }
       })
   }
  }
</script>