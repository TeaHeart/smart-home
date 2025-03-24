<template>
  <el-form :inline="true" :model="search">
    <el-form-item label="state">
      <StateSelectComponent style="width: 150px" v-model="search.state" />
    </el-form-item>
    <el-form-item label="description">
      <el-input v-model="search.description" placeholder="description" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="list">search</el-button>
      <el-button @click="clear">clear</el-button>
    </el-form-item>
  </el-form>

  <DeviceMonitorComponent v-for="item in dataList" :key="item.deviceId" :device-monitor="item" />

  <el-pagination
    style="justify-content: center; margin-top: 10px"
    v-model:current-page="search.curr"
    v-model:page-size="search.size"
    v-model:total="search.total"
    :page-sizes="[10, 20, 50, 100]"
    layout="jumper, prev, pager, next, sizes, total"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElButton, ElMessage, ElForm, ElInput, ElFormItem, ElPagination } from 'element-plus'
import { deviceApi } from '../api/index.js'
import StateSelectComponent from '../components/StateSelectComponent.vue'
import DeviceMonitorComponent from '../components/DeviceMonitorComponent.vue'
import DeviceMonitor from '../utils/device/device-monitor.js'

const searchObj = {
  curr: 1,
  size: 10,
  total: 0,
  state: undefined,
  description: undefined,
}

const dataList = ref([])
const search = ref({
  ...searchObj,
})

function clear() {
  search.value = { ...searchObj }
  list()
}

function handleCurrentChange(curr) {
  search.value.curr = curr || search.value.curr || 1
  list()
}

function handleSizeChange(size) {
  search.value.size = size || search.value.size || 10
  list()
}

async function list() {
  const json = await deviceApi.list(search.value)
  ElMessage.success(json.message)
  dataList.value = json.data.map((item) => new DeviceMonitor(item))
  search.value = json.search
}

onMounted(() => {
  list()
})
</script>

<style scoped></style>
