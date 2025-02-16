<template>
    <div class="register-container">
      <el-card class="register-card" shadow="hover">
        <h2 class="register-title">登录</h2>
        <el-form :model="loginForm" :rules="rules" ref="loginFormRef" label-width="80px">
          <!-- 用户名 -->
          <el-form-item label="用户名" prop="token">
            <el-input v-model="loginForm.token" placeholder="请输入用户名" />
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginForm.password" placeholder="请输入密码" show-password />
          </el-form-item>
          <!-- 按钮 -->
          <div class="button-group">
            <el-button type="primary" @click="handleLogin">登录</el-button>
            <router-link to="/register">
              <el-button>注册</el-button>
            </router-link>
          </div>
        </el-form>
      </el-card>
    </div>
  </template>
  
  <script>
  import {ElMessage} from "element-plus";
  import {useUserStore} from "@/stores/user.js";
  import {useConversationsStore} from "@/stores/conversations.js";

  export default {
    name: "LoginPage",
    data() {
      return {
        loginForm: {
          token: "",
          password: "",
        },
        rules: {
          token: [{ required: true, message: "请输入用户名", trigger: "blur" }],
          password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        },
        loginFormRef: null,
        userStore: null,
      };
    },
    created() {
      this.userStore = useUserStore();
      this.conversationsStore = useConversationsStore();
    },
    methods: {
      handleLogin() {
        this.$refs.loginFormRef.validate(async (valid) => {
          if (!valid) return;

          this.userStore.setLoading(true);

          try {
            this.userStore.setUser(await this.userStore.login(this.loginForm.token, this.loginForm.password))
            if (this.userStore.user) {
              ElMessage.success("登录成功！");
              await this.conversationsStore.fetchData(this.userStore.user.user_id)
              await this.$router.push("/");
            } else {
              ElMessage.error("登录失败");
            }
          } catch (error) {
            ElMessage.error("登录失败");
          } finally {
            this.userStore.setLoading(false);
          }
        });
      },
      handleRegister() {
        this.$router.push("/register");
        this.loginForm.token = "";
        this.loginForm.password = "";
      },
    },
  };
  </script>
  
  <style scoped>
  .register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
  }
  
  .register-card {
    width: 400px;
    padding: 20px;
  }
  
  .register-title {
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
  