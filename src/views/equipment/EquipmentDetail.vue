<template>
  <div>
    <el-page-header @back="goBack" class="page-header">
      <template #content>
        <span>设备详情</span>
      </template>
    </el-page-header>

    <el-card v-loading="loading">
      <template #header>
        <div>
          <span>设备信息 - {{ equipment.name }}</span>
        </div>
      </template>
      <div v-if="equipment" class="details-container">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="设备ID">{{ equipment.id }}</el-descriptions-item>
          <el-descriptions-item label="设备名称">{{ equipment.name }}</el-descriptions-item>
          <el-descriptions-item label="型号">{{ equipment.model }}</el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag :type="getStatusType(equipment.status)">{{ equipment.status }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="制造商">{{ equipment.manufacturer }}</el-descriptions-item>
          <el-descriptions-item label="购买日期">{{ equipment.purchaseDate }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <el-empty v-else-if="!loading" description="未找到设备信息"></el-empty>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getEquipmentById } from '@/api';
import { ElNotification } from 'element-plus';

// 从路由中获取 props (id)
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const route = useRoute();
const equipment = ref(null);
const loading = ref(false);

const fetchData = async () => {
  loading.value = true;
  try {
    const response = await getEquipmentById(props.id);
     // 模拟 API 返回数据
    equipment.value = response.data || {
        id: props.id,
        name: '心电图机',
        model: 'ECG-1200',
        status: 'In Use',
        manufacturer: '通用电气医疗',
        purchaseDate: '2023-05-20'
    };
  } catch (e) {
    ElNotification({
      title: '错误',
      message: e.message || `加载ID为 ${props.id} 的设备失败`,
      type: 'error',
    });
  } finally {
    loading.value = false;
  }
};

const getStatusType = (status) => {
    switch (status) {
        case 'In Use': return 'success';
        case 'Under Repair': return 'warning';
        case 'Scrapped': return 'danger';
        default: return 'info';
    }
};

const goBack = () => {
  router.push({ name: 'EquipmentList' });
};

onMounted(fetchData);
</script>

<style scoped>
.page-header {
  margin-bottom: 20px;
}
.details-container {
  padding: 10px;
}
</style>
