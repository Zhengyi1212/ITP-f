<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>用户管理</span>
          <el-button type="primary" :icon="Plus">添加用户</el-button>
        </div>
      </template>

      <el-table :data="userList" v-loading="loading" style="width: 100%">
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="fullName" label="姓名" />
        <el-table-column prop="role" label="角色">
           <template #default="scope">
                <el-tag>{{ scope.row.role }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" />
        <el-table-column label="操作" width="200">
          <template #default>
            <el-button size="small" type="primary">编辑</el-button>
            <el-button size="small">重置密码</el-button>
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElNotification } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';

const userList = ref([]);
const loading = ref(false);

// 在实际项目中，这里应该是调用 api/index.js 中的函数
const fetchUsers = async () => {
    loading.value = true;
    try {
        // 模拟 API 调用
        await new Promise(resolve => setTimeout(resolve, 500));
        userList.value = [
            { id: 1, username: 'admin', fullName: '张三', role: 'System Administrator', createdAt: '2023-01-01' },
            { id: 2, username: 'procurement_staff', fullName: '李四', role: 'Procurement Staff', createdAt: '2023-02-15' },
            { id: 3, username: 'equipment_manager', fullName: '王五', role: 'Equipment Manager', createdAt: '2023-03-10' },
            { id: 4, username: 'department_user', fullName: '赵六', role: 'Department User', createdAt: '2023-04-20' },
        ];
    } catch (e) {
         ElNotification({
          title: '错误',
          message: e.message || '加载用户列表失败',
          type: 'error',
        });
    } finally {
        loading.value = false;
    }
}

onMounted(fetchUsers);
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
