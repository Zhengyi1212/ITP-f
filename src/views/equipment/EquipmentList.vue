<template>
  <div>
    <el-card>
        <template #header>
            <div class="card-header">
                <span>设备列表</span>
                 <el-button type="primary" :icon="Plus" @click="handleAdd">添加设备</el-button>
            </div>
        </template>
        
        <!-- 数据表格 -->
        <el-table :data="equipmentList" v-loading="loading" style="width: 100%">
            <el-table-column prop="name" label="设备名称" />
            <el-table-column prop="model" label="型号" />
            <el-table-column prop="status" label="状态">
                <template #default="scope">
                    <el-tag :type="getStatusType(scope.row.status)">{{ scope.row.status }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button
                        size="small"
                        @click="handleViewDetails(scope.row.id)"
                    >
                        查看详情
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 (可选) -->
        <!-- 
        <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            @current-change="handlePageChange"
            style="margin-top: 20px; justify-content: flex-end;"
        />
        -->
    </el-card>

    <!-- 添加/编辑设备的对话框 -->
    <el-dialog v-model="dialogVisible" title="添加设备" width="500">
        <!-- 这里放置添加设备的表单 -->
        <p>设备添加表单...</p>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submitAddForm">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getEquipmentList } from '@/api';
import { ElNotification } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';


const router = useRouter();
const equipmentList = ref([]);
const loading = ref(false);
const dialogVisible = ref(false); // 控制对话框显示

// 获取数据
const fetchData = async () => {
    loading.value = true;
    try {
        const response = await getEquipmentList({ page: 1, limit: 10 });
        // 模拟一些数据，因为 API 可能没有返回
        equipmentList.value = response.data || [
            { id: 'EQ001', name: '心电图机', model: 'ECG-1200', status: 'In Use' },
            { id: 'EQ002', name: '超声波扫描仪', model: 'US-500', status: 'Under Repair' },
            { id: 'EQ003', name: '呼吸机', model: 'Vent-300', status: 'Scrapped' },
        ];
    } catch (e) {
        ElNotification({
          title: '错误',
          message: e.message || '加载设备列表失败',
          type: 'error',
        });
    } finally {
        loading.value = false;
    }
};

// 根据设备状态返回不同的 Tag 类型
const getStatusType = (status) => {
    switch (status) {
        case 'In Use': return 'success';
        case 'Under Repair': return 'warning';
        case 'Scrapped': return 'danger';
        default: return 'info';
    }
};

const handleViewDetails = (id) => {
    router.push({ name: 'EquipmentDetail', params: { id } });
};

const handleAdd = () => {
    dialogVisible.value = true;
};

const submitAddForm = () => {
    // 处理表单提交逻辑
    console.log('提交新设备');
    dialogVisible.value = false;
};

// 组件挂载后加载数据
onMounted(fetchData);

</script>

<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>

