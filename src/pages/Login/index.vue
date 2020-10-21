<template>
    <div class="login-page" @keydown.enter="login">
        <div>
             <h1 class="title">千锋管理系统</h1>
        </div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <!-- model：表单数据对象，status-icon是否在输入框中显示校验结果反馈图标 ，label-width表单域标签的的宽度，例如 '50px'。支持 auto。-->
  <el-form-item label="账号" prop="pass">
    <el-input type="text" v-model="ruleForm.pass" autocomplete="off"></el-input>
    <!-- autocomplete="off"表示表单允许被记录输入的值 -->
  </el-form-item>
  <el-form-item label="密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" ></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="success" round  @click="submitForm('ruleForm')" v-focus @keydown.enter="login">登录</el-button>
    <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
  </el-form-item>
</el-form>
    <video src="../../assets/video/bg_video.d2d602a9.mp4" muted autoplay="autoplay" loop="loop"></video>
    </div>
</template>
<script>
//登入逻辑的实现
  //1.收集用户输入的username&password传递给后端

  //2.登入通过后,将后端返回的token存到本地,跳转到主页
  //3.每次请求的时候,携带token到请求头authorization

  //4.展示token校验正确的数据

  //5.校验不通过,跳转到登入页
import {login} from "../../api/index"
import {mapState,mapMutations} from 'vuex'
  export default {
    data() {
   
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } 
         else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          // age: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
         
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {//本地校验通过
            // alert('submit!');
            const loading = this.$loading({
              lock: true,
              text: '正在登入...',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            })
            let {pass,checkPass}=this.ruleForm
             login(pass,checkPass)
             .then(res=>{console.log(res); loading.close()
             if(res.data.state){
               this.$message.success('登入成功')
               localStorage.setItem('wode',res.data.token)
               localStorage.setItem('userInfo',JSON.stringify(res.data.userInfo))
               //更改vuex中state的数据
               this.SET_USERINFO(res.data.userInfo)
               this.$router.push("/")
               console.log(res.data.userInfo);
             }else{
               this.$message.error('检查一下你的用户名和密码傻逼')
             }
             })
             .catch(err=>{console.log(err);})

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },


      ...mapMutations(['SET_USERINFO']),

    login(){
      this.submitForm('ruleForm')
    }
    },
    directives: {
      focus:{
        inserted:function(el){
          el.focus()
        }
      }
    }
  }
</script>
<style scoped >
/* 表单样式 */
.el-form{
    width: 400px;
} 
/* 标题 */
 .title {
   text-align: center;
      color: #fff;
      padding-top: 100px;
     padding-bottom: 50px;
    }
video{
  position: fixed;
            right: 0px;
            bottom: 0px;
            min-width: 100%;
            min-height: 100%;
            height: auto;
            width: auto;
            z-index: -10;
}
 .el-button--success  {
    width: 83%;
      background: linear-gradient(90deg, #1596fb, #002dff);
  }
 
</style>