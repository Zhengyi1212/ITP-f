<template>
  <el-container class="main-layout">
    <el-header class="header">
      <div class="logo">医疗设备管理系统</div>
      <div class="user-info">
        <el-dropdown>
          <span class="el-dropdown-link">
            欢迎, {{ userStore.userInfo?.username }}
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px" class="sidebar">
        <!-- 
          default-active: 当前激活菜单的 index
          router: 启用 vue-router 模式。将 index 作为 path 进行路由跳转
        -->
        <el-menu :default-active="$route.path" router>
          <el-menu-item index="/dashboard">
            <el-icon><DataAnalysis /></el-icon>
            <span>仪表盘</span>
          </el-menu-item>
          <el-menu-item index="/equipment">
            <el-icon><Monitor /></el-icon>
            <span>设备列表</span>
          </el-menu-item>
          <el-menu-item index="/procurement">
            <el-icon><ShoppingCart /></el-icon>
            <span>采购管理</span>
          </el-menu-item>
          <el-menu-item index="/system/users" v-if="userStore.roles.includes('System Administrator')">
            <el-icon><User /></el-icon>
            <span>用户管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="content">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { useUserStore } from '@/store/user';
import { ElMessageBox } from 'element-plus';
import { ArrowDown, DataAnalysis, Monitor, ShoppingCart, User } from '@element-plus/icons-vue';

const userStore = useUserStore();

// 处理登出，使用 ElMessageBox 替代 confirm
const handleLogout = () => {
  ElMessageBox.confirm('您确定要退出登录吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      userStore.logout();
    })
    .catch(() => {
      // 用户点击了取消，无需操作
    });
};
</script>

<style scoped>
.main-layout, .el-container {
  height: 100vh;
}
.header {
  background-color: #337ecc;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  font-size: 20px;
  font-weight: bold;
}
.user-info .el-dropdown-link {
  cursor: pointer;
  color: #ffffff;
  display: flex;
  align-items: center;
}
.sidebar {
  border-right: 1px solid #e0e0e0;
}
/* 消除 el-menu 右侧的边框 */
.el-menu {
    border-right: none;
}
.content {
  background-color: #f4f7fa;
}
</style>

