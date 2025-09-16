<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <div class="card-header">
          <h1>系统登录</h1>
        </div>
      </template>
      <!-- ref 用于表单验证 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" @submit.prevent="handleLogin">
        <el-form-item prop="username">
          <el-input 
            v-model="loginForm.username" 
            placeholder="请输入用户名"
            :prefix-icon="User"
            size="large"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            placeholder="请输入密码"
            :prefix-icon="Lock"
            show-password
            size="large"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="login-button"
            native-type="submit"
            :loading="isLoading"
            size="large"
          >
            {{ isLoading ? '登录中...' : '登 录' }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useUserStore } from '@/store/user';
import { ElNotification } from 'element-plus';
import { User, Lock } from '@element-plus/icons-vue';

const loginFormRef = ref(null); // 表单引用
const isLoading = ref(false);
const userStore = useUserStore();

// 表单数据
const loginForm = reactive({
  username: '',
  password: '',
});

// 表单验证规则
const loginRules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});

// 处理登录
const handleLogin = async () => {
  if (!loginFormRef.value) return;
  // 触发表单验证
  await loginFormRef.value.validate(async (valid) => {
    if (valid) {
      isLoading.value = true;
      try {
        await userStore.login({
          username: loginForm.username,
          password: loginForm.password,
        });
        ElNotification({
          title: '成功',
          message: '登录成功，欢迎回来！',
          type: 'success',
        });
      } catch (error) {
        ElNotification({
          title: '错误',
          message: error.message || '登录失败，请检查您的凭据。',
          type: 'error',
        });
      } finally {
        isLoading.value = false;
      }
    }
  });
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('https://placehold.co/1920x1080/e0f2fe/334155?text=Background') no-repeat center center;
  background-size: cover;
}
.login-card {
  width: 400px;
}
.card-header h1 {
  text-align: center;
  margin: 0;
  font-size: 24px;
}
.login-button {
  width: 100%;
}
</style>

