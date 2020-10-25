<template>
  <div class="login-page" @keydown.enter="login">
    <div>
      <h1 class="title">千锋管理系统</h1>
    </div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <!-- model：表单数据对象，status-icon是否在输入框中显示校验结果反馈图标 ，label-width表单域标签的的宽度，例如 '50px'。支持 auto。-->
      <el-form-item label="账号" prop="pass">
        <el-input
          type="text"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
        <!-- autocomplete="off"表示表单允许被记录输入的值 -->
      </el-form-item>
      <el-form-item label="密码" prop="captcha">
        <el-input
          type="text"
          v-model="ruleForm.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item label="验证码" prop="captcha">
        <el-input class="captcha"
          type="text"
          v-model="ruleForm.captcha"
          autocomplete="off"
        >
        </el-input>
        <span v-html="captchasvg" class="yzm" @click="resfredshCaptcha">123</span>
      </el-form-item>

      <el-form-item>
        <el-button
          type="success"
          round
          @click="submitForm('ruleForm')"
          v-focus
          @keydown.enter="login"
          >登录</el-button
        >
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </el-form-item>
    </el-form>
    <video
      src="../../assets/video/bg_video.d2d602a9.mp4"
      muted
      autoplay="autoplay"
      loop="loop"
    ></video>
  </div>
</template>
<script>
//登入逻辑的实现
//1.收集用户输入的username&password传递给后端

//2.登入通过后,将后端返回的token存到本地,跳转到主页
//3.每次请求的时候,携带token到请求头authorization

//4.展示token校验正确的数据

//5.校验不通过,跳转到登入页
import { login ,getCaptcha,verifyCaptcha } from "../../api/index";
import { mapState, mapMutations,} from "vuex";
export default {
  data() {
    //账号校验函数
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    // 密码校验函数
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    //  验证码校验函数
    var validatecaptcha = (rule, value, callback) => {
      if (value === "" || value.length!==5) {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    return {
      captchasvg:"",//从服务器获取下来的验证码svg解构
      ruleForm: {
        // 账号
        pass: "",
        //密码
        checkPass: "",
        // 验证码
        captcha:""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        captcha: [{ validator: validatecaptcha, trigger: "blur" }]
      }
    };
  },
  mounted () {
    this.set_captcha()
  },
  methods: {
    //刷新验证码
  resfredshCaptcha(){
    this.set_captcha()
           } ,
    //设置验证码
    set_captcha(){
     getCaptcha()
     .then(res=>{this.captchasvg=res.data.img})
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //本地校验通过
          // alert('submit!');
          //先判断验证码是否正确
             let verifyresult= await verifyCaptcha(this.ruleForm.captcha)
          console.log(111);
           if(!verifyresult.data.state){
              alert("验证码输入错误，请重新输入")
              return
            }
            // console.log(verifyresult);
            
          //打开登入加载动画
          const loading = this.$loading({
            lock: true,
            text: "正在登入...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          let { pass, checkPass } = this.ruleForm;
          login(pass, checkPass)
            .then(res => {
              loading.close();
              if (res.data.state) {
                this.$message.success("登入成功");
                localStorage.setItem("wode", res.data.token);
                localStorage.setItem(
                  "userInfo",
                  JSON.stringify(res.data.userInfo)
                );
                //更改vuex中state的数据
                this.SET_USERINFO(res.data.userInfo);
                this.$router.push("/Welcome");
                //  console.log(res.data.userInfo);
              } else {
                this.$message.error("检查一下你的用户名和密码傻逼");
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    ...mapMutations(["SET_USERINFO"]),

    login() {
      this.submitForm("ruleForm");
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  }
};
</script>
<style scoped >
/* 表单样式 */
.el-form {
  width: 400px;
}
/* 标题 */
.title {
  text-align: center;
  color: #fff;
  padding-top: 100px;
  padding-bottom: 50px;
}
video {
  position: fixed;
  right: 0px;
  bottom: 0px;
  min-width: 100%;
  min-height: 100%;
  height: auto;
  width: auto;
  z-index: -10;
}
.el-button--success {
  width: 83%;
  background: linear-gradient(90deg, #1596fb, #002dff);
}
/* 可以手动添加类名来修改样式 */
.captcha{
  width: 40%;
  float: left;
}
.yzm{
  /* 老毛病行业元素不能设置高度，变成行内块元素就可以了 */
  display: inline-block;
  height: 40px;
  background: #ccc;
  border-radius: 5px;
  width: 130px;
  overflow: hidden;
  cursor: pointer;
}
</style>