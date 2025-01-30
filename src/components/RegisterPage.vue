<template>
  <div class="register-container">
    <el-card class="register-card" shadow="hover">
      <h2 class="register-title">注册</h2>
      <el-form :model="registerForm" :rules="rules" ref="loginFormRef" label-width="80px">
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="token">
          <el-input v-model="registerForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerForm.email" placeholder="请输入邮箱" />
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerForm.password" placeholder="请输入密码" show-password />
        </el-form-item>
        <!-- 按钮 -->
        <div class="button-group">
          <el-button type="primary" @click="handleToLogin">去登录</el-button>
          <el-button @click="handleRegister">注册</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import {useUserStore} from "@/stores/user.js";
export default {
  name: "RegisterPage",
  data() {
    return {
      registerForm: {
        username: "",
        email: "",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      loginFormRef: null,
      userStore: null,
    };
  },
  created() {
    this.userStore = useUserStore();
  },
  methods: {
    handleRegister() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;

        this.userStore.setLoading(true);

        try {
          if (await this.userStore.register(this.registerForm.username, this.registerForm.email, this.registerForm.password)) {
            ElMessage.success("注册成功！");
            await this.$router.push("/");
          } else {
            ElMessage.error("注册失败");
          }
        } catch (error) {
          ElMessage.error("注册失败");
        } finally {
          this.userStore.setLoading(false);
        }
      });
    },
    handleToLogin() {
      this.registerForm.username = "";
      this.registerForm.email = "";
      this.registerForm.password = "";
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
