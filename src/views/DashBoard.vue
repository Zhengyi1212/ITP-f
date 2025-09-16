<template>
  <div>
    <el-card>
      <template #header>
        <div>
          <span>仪表盘</span>
        </div>
      </template>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-statistic title="设备总数" :value="268500" />
        </el-col>
        <el-col :span="8">
          <el-statistic title="待维修设备" :value="5">
             <template #suffix>
              <el-icon style="vertical-align: -0.125em">
                <Warning />
              </el-icon>
            </template>
          </el-statistic>
        </el-col>
        <el-col :span="8">
          <el-statistic title="本月采购" :value="12" />
        </el-col>
      </el-row>
      <el-divider />
      <p>欢迎使用医疗设备生命周期管理系统！</p>
    </el-card>
  </div>
</template>

<script setup>
import { Warning } from '@element-plus/icons-vue';
// 在实际项目中，这里的统计数据应该通过 API 从后端获取
</script>

<style scoped>
.el-statistic {
  text-align: center;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}
</style>
