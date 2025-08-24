<template>
  <el-form :inline="true" :model="search">
    <el-form-item label="online">
      <el-select-v2
        filterable
        style="width: 150px"
        placeholder="online"
        :options="options"
        clearable
        v-model="search.online"
        @update:model-value="list"
      />
    </el-form-item>
    <el-form-item label="description">
      <el-input
        placeholder="description"
        clearable
        v-model="search.description"
        @update:model-value="list"
      />
    </el-form-item>
    <el-form-item>
      <el-button @click="search = {}">clear</el-button>
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
    @current-change="list"
    @size-change="list"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  ElButton,
  ElMessage,
  ElForm,
  ElInput,
  ElFormItem,
  ElPagination,
  ElSelectV2,
} from 'element-plus'
import DeviceMonitorComponent from '../components/DeviceMonitorComponent.vue'
import { deviceApi } from '../api/index.js'
import { DeviceMonitor } from '../utils/index.js'

const options = [
  { label: 'online', value: true },
  { label: 'offline', value: false },
]

const dataList = ref([])
const search = ref({})

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
