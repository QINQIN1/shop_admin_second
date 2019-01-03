<template>
  <el-form
    :model="loginForm"
    :rules="rules"
    ref="loginForm"
    label-width="100px"
    class="demo-loginForm"
    label-position="top"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="loginForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="loginForm.password">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
      <el-button @click="resetForm('loginForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
// 导入axios
import axios from 'axios'

export default {
  data() {
    return {
      loginForm: {
      //  用户名
      username:'',
      password:''
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
    submitForm(formName) {

      // $refs是vue提供的一个对象，用来获取页面中所有带有ref属性的元素
      // this.$refs[formName]和 this.$refs.loginForm是相同的
      // console.log(this.$refs);
      this.$refs[formName].validate(valid => {
        // console.log(valid)
       if(!valid){
        //  验证失败代码中不需要处理
         return false
       }
      //  表单验证成功
      // 1.获取用户名和密码
      console.log(this.loginForm)
      // 2.调用登录接口完成登录
          axios
          .post('http://localhost:8888/api/private/v1/login', this.loginForm)
          .then(res => {
            console.log(res)
          })
      // 3.登陆成功跳转到首页
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style>
</style>
