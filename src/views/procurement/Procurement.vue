<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>采购申请列表</span>
          <el-button type="primary" :icon="Plus">新建申请</el-button>
        </div>
      </template>

      <el-table :data="procurementList" v-loading="loading" style="width: 100%">
        <el-table-column prop="id" label="申请ID" width="100" />
        <el-table-column prop="equipmentName" label="申请设备" />
        <el-table-column prop="quantity" label="数量" width="80" />
        <el-table-column prop="budget" label="预算 (元)" width="120" />
        <el-table-column prop="applicant" label="申请人" />
        <el-table-column prop="status" label="状态">
             <template #default="scope">
                <el-tag :type="scope.row.status === '已批准' ? 'success' : 'warning'">{{ scope.row.status }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default>
            <el-button size="small" type="primary">详情</el-button>
            <el-button size="small" type="danger">撤销</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getProcurementList } from '@/api';
import { ElNotification } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';

const procurementList = ref([]);
const loading = ref(false);

const fetchData = async () => {
    loading.value = true;
    try {
        const response = await getProcurementList();
        // 模拟数据
        procurementList.value = response.data || [
            { id: 'PC001', equipmentName: '多参数监护仪', quantity: 5, budget: '75000', applicant: '李医生', status: '审批中' },
            { id: 'PC002', equipmentName: '移动式X光机', quantity: 1, budget: '250000', applicant: '王主任', status: '已批准' },
        ];
    } catch (e) {
         ElNotification({
          title: '错误',
          message: e.message || '加载采购列表失败',
          type: 'error',
        });
    } finally {
        loading.value = false;
    }
};

onMounted(fetchData);
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
