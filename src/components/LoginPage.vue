<template>
    <div class="login-container">
      <el-card class="login-card" shadow="hover">
        <h2 class="login-title">登录</h2>
        <el-form :model="loginForm" :rules="rules" ref="loginFormRef" label-width="80px">
          <!-- 用户名 -->
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名" />
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginForm.password" placeholder="请输入密码" show-password />
          </el-form-item>
          <!-- 按钮 -->
          <div class="button-group">
            <el-button type="primary" @click="handleLogin">登录</el-button>
            <el-button @click="handleReset">重置</el-button>
          </div>
        </el-form>
      </el-card>
    </div>
  </template>
  
  <script>
  import { reactive, ref } from "vue";
  
  export default {
    name: "LoginPage",
    setup() {
      // 登录表单数据
      const loginForm = reactive({
        username: "",
        password: "",
      });
  
      // 表单校验规则
      const rules = {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      };
  
      const loginFormRef = ref(null);
  
      // 登录方法
      const handleLogin = () => {
        loginFormRef.value.validate((valid) => {
          if (valid) {
            alert("登录成功！");
          } else {
            console.log("登录表单验证失败");
          }
        });
      };
  
      // 重置方法
      const handleReset = () => {
        loginForm.username = "";
        loginForm.password = "";
      };
  
      return {
        loginForm,
        rules,
        loginFormRef,
        handleLogin,
        handleReset,
      };
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
  }
  
  .login-card {
    width: 400px;
    padding: 20px;
  }
  
  .login-title {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }
  
  .button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  </style>
  