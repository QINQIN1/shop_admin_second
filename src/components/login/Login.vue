<template>
<div class="login">

  <el-row type="flex" justify="center" align="middle" class="login-row">
  <el-col :xs="14" :sm="12" :md="10" :lg="8" :xl="6">
    <el-form
    :model="loginForm"
    :rules="rules"
    ref="loginForm"
    label-width="100px"
    class="login-form"
    label-position="top"
    >
    <el-form-item label="用户名" prop="username" >
      <el-input v-model="loginForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="loginForm.password" type="password">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
      <el-button @click="resetForm('loginForm')">重置</el-button>
    </el-form-item>
    </el-form>
  </el-col>
</el-row>


</div>
</template>
<script>
// 导入axios
// import axios from 'axios'

export default {
  data() {
    return {
      loginForm: {
      //  用户名
      username:'admin',
      password:'123456'
      },
      rules: {
        username: [
          // required 表示必填项
          // message 表示校验失败时要展示的错误信息
          // trigger 表示触发表单验证的时机
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 12, message: "用户名长度为5到12个字符", trigger: "blur" }
        ],
         password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "密码长度为6到12个字符", trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    // 表单验证的代码逻辑
    async submitForm(formName) {
      try{
        await this.$refs[formName].validate()
        // 表单验证成功发送请求完成
        const res= await this.$http.post('http://localhost:8888/api/private/v1/login', this.loginForm)
          // console.log(res)
            if(res.data.meta.status===200){
              // 将token存储到localStorage中
              localStorage.setItem('token',res.data.data.token)
              // 3.登陆成功跳转到首页
              // this.$router.push('/home')
              this.$router.push({name:'home'})
            }else{
              // 4,登录失败，提示用户错误信息
              // alert(res.data.meta.msg)
              // element-ui中提供的方法
              this.$message({
                  message: res.data.meta.msg,
                  type: 'error',
                  duration:1000
              });
            }
      }catch(e){
        // console.log('表单验证失败',e)
      }


      // $refs是vue提供的一个对象，用来获取页面中所有带有ref属性的元素
      // this.$refs[formName]和 this.$refs.loginForm是相同的
      // console.log(this.$refs);

      // this.$refs[formName].validate(async valid => {
      //   // console.log(valid)
      //  if(!valid){
      //   //  验证失败代码中不需要处理
      //    return false
      //  }
      // //  表单验证成功
      // // 1.获取用户名和密码
      // console.log(this.loginForm)
      // // 2.调用登录接口完成登录
      //    const res= await axios.post('http://localhost:8888/api/private/v1/login', this.loginForm)
      //     console.log(res)
      //       if(res.data.meta.status===200){
      //         // 将token存储到localStorage中
      //         localStorage.setItem('token',res.data.data.token)
      //         // 3.登陆成功跳转到首页
      //         // this.$router.push('/home')
      //         this.$router.push({name:'home'})
      //       }else{
      //         // 4,登录失败，提示用户错误信息
      //         // alert(res.data.meta.msg)
      //         // element-ui中提供的方法
      //         this.$message({
      //             message: res.data.meta.msg,
      //             type: 'error',
      //             duration:1000
      //         });
      //       }
      // });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style>
.login{
  height: 100%;
  background-color: #2d434c;
}
.login-row{
  height: 100%;
}
.login-form{
  min-width:380px;
  background-color: #fff;
  padding:24px 24px;
  border-radius: 10px;
}
</style>
