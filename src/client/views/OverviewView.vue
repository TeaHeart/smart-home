<template>
  <el-row :gutter="16">
    <el-col :lg="8" :sm="12" :xs="24">
      <el-statistic title="user" :value="data.user.total" />
    </el-col>
    <el-col :lg="8" :sm="12" :xs="24">
      <el-statistic title="device" :value="data.device.online">
        <template #suffix>/{{ data.device.total }}</template>
      </el-statistic>
    </el-col>
    <el-col :lg="8" :sm="12" :xs="24">
      <el-statistic title="rule" :value="data.rule.enabled">
        <template #suffix>/{{ data.rule.total }}</template>
      </el-statistic>
    </el-col>
    <el-col :lg="8" :sm="12" :xs="24">
      <el-statistic :value="data.message.upload">
        <template #title>
          message
          <el-tag type="info"> upload</el-tag>
        </template>
      </el-statistic>
    </el-col>
    <el-col :lg="8" :sm="12" :xs="24">
      <el-statistic :value="data.message.service">
        <template #title>
          message
          <el-tag type="primary"> service</el-tag>
        </template>
      </el-statistic>
    </el-col>
    <el-col :lg="8" :sm="12" :xs="24">
      <el-statistic :value="data.message.event">
        <template #title>
          message
          <el-tag type="warning"> event</el-tag>
        </template>
      </el-statistic>
    </el-col>
    <el-col :lg="8" :sm="12" :xs="24">
      <el-statistic :value="data.log.info">
        <template #title>
          log
          <el-tag type="info"> info</el-tag>
        </template>
      </el-statistic>
    </el-col>
    <el-col :lg="8" :sm="12" :xs="24">
      <el-statistic :value="data.log.warning">
        <template #title>
          log
          <el-tag type="warning"> warning</el-tag>
        </template>
      </el-statistic>
    </el-col>
    <el-col :lg="8" :sm="12" :xs="24">
      <el-statistic :value="data.log.error">
        <template #title>
          log
          <el-tag type="danger"> error</el-tag>
        </template>
      </el-statistic>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElRow, ElCol, ElStatistic, ElMessage } from 'element-plus'
import { overviewApi } from '../api/index.js'

const data = ref({
  user: {},
  device: {},
  message: {},
  rule: {},
  log: {},
})

onMounted(async () => {
  const json = await overviewApi.getOverview()
  ElMessage.success(json.message)
  data.value = json.data
})
</script>

<style scoped>
.el-row {
  line-height: 100px;
}

.el-col {
  margin-bottom: 10px;
}

.el-statistic {
  --el-statistic-content-font-size: 2.4em;
  --el-statistic-title-font-size: 1.8em;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
</style>
