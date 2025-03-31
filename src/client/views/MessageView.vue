<template>
  <el-form :inline="true" :model="search">
    <el-form-item label="type">
      <MessageTypeSelectComponent
        style="width: 150px"
        v-model:type="search.type"
        @update:type="list"
      />
    </el-form-item>
    <el-form-item label="device">
      <DeviceSelectComponent
        style="width: 500px"
        v-model:device="search.device"
        @update:device="list"
      />
    </el-form-item>
    <el-form-item>
      <el-button @click="search = {}">clear</el-button>
    </el-form-item>
  </el-form>

  <el-table :data="dataList">
    <el-table-column type="expand">
      <template #default="scope">
        <el-form-item label="device">
          {{ scope.row.device }}
        </el-form-item>
        <el-form-item label="data">
          {{ scope.row.data }}
        </el-form-item>
      </template>
    </el-table-column>
    <el-table-column label="id">
      <template #default="scope">
        {{ scope.row.id }}
      </template>
    </el-table-column>
    <el-table-column label="type">
      <template #default="scope">
        <el-tag :type="typeToClass[scope.row.type]">
          {{ scope.row.type }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column label="device">
      <template #default="scope">
        {{ scope.row.device.id }}
      </template>
    </el-table-column>
    <el-table-column label="time">
      <template #default="scope">
        {{ scope.row.time }}
      </template>
    </el-table-column>
  </el-table>

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
  ElTable,
  ElTableColumn,
  ElForm,
  ElTag,
  ElPagination,
  ElFormItem,
} from 'element-plus'
import { messageApi } from '../api/index.js'
import MessageTypeSelectComponent from '../components/MessageTypeSelectComponent.vue'
import DeviceSelectComponent from '../components/DeviceSelectComponent.vue'

const typeToClass = {
  online: 'success',
  upload: 'info',
  service: 'primary',
  event: 'warning',
  offline: 'danger',
}

const dataList = ref([])
const search = ref({})

async function list() {
  const json = await messageApi.list(search.value)
  ElMessage.success(json.message)
  dataList.value = json.data
  search.value = json.search
}

onMounted(() => {
  list()
})
</script>

<style scoped></style>
