<template>
  <el-form :inline="true" :model="search">
    <el-form-item label="level">
      <LevelSelectComponent style="width: 150px" v-model:level="search.level" />
    </el-form-item>
    <el-form-item label="user">
      <UserSelectComponent style="width: 150px" v-model:user="search.user" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="list">search</el-button>
      <el-button @click="clear">clear</el-button>
    </el-form-item>
  </el-form>

  <el-table :data="dataList">
    <el-table-column type="expand">
      <template #default="scope">
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
    <el-table-column label="level">
      <template #default="scope">
        <el-tag :type="levelToType[scope.row.level]">{{ scope.row.level }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="user">
      <template #default="scope">
        {{ scope.row.user?.username }}
      </template>
    </el-table-column>
    <el-table-column label="time">
      <template #default="scope">
        {{ scope.row.time }}
      </template>
    </el-table-column>
    <el-table-column label="operation">
      <template #default="scope">
        {{ scope.row.operation }}
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
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  ElMessage,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElForm,
  ElFormItem,
  ElButton,
} from 'element-plus'
import { logApi } from '../api/index.js'
import UserSelectComponent from '../components/UserSelectComponent.vue'
import LevelSelectComponent from '../components/LevelSelectComponent.vue'

const searchObj = {
  curr: 1,
  size: 10,
  total: 0,
  user: undefined,
  level: undefined,
}

const dataList = ref([])
const search = ref({
  ...searchObj,
})
const levelToType = ref({
  info: 'info',
  warning: 'warning',
  error: 'danger',
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
  const json = await logApi.list(search.value)
  ElMessage.success(json.message)
  dataList.value = json.data
  search.value = json.search
}

onMounted(() => {
  list()
})
</script>

<style scoped></style>
