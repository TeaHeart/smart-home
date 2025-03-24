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

  <el-table :data="dataList">
    <el-table-column type="expand">
      <template #default="scope">
        <el-form-item label="model">
          {{ scope.row.model }}
        </el-form-item>
      </template>
    </el-table-column>
    <el-table-column label="id">
      <template #default="scope">
        {{ scope.row.id }}
      </template>
    </el-table-column>
    <el-table-column label="deviceId">
      <template #default="scope">
        {{ scope.row.deviceId }}
      </template>
    </el-table-column>
    <el-table-column label="state">
      <template #default="scope">
        <el-tag :type="scope.row.state === 'online' ? 'success' : 'danger'">
          {{ scope.row.state }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column label="description">
      <template #default="scope">
        {{ scope.row.description }}
      </template>
    </el-table-column>
    <el-table-column label="operation">
      <template #default="scope">
        <el-button type="warning" @click="showEditDialog(scope.row)">edit</el-button>
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

  <el-dialog v-model="dialogVisible" title="edit">
    <el-form :model="device">
      <el-form-item label="id">
        <el-input disabled v-model="device.id" />
      </el-form-item>
      <el-form-item label="description">
        <el-input v-model="device.description" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="warning" @click="updateDescription">update</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  ElButton,
  ElMessage,
  ElTable,
  ElTableColumn,
  ElForm,
  ElInput,
  ElDialog,
  ElTag,
  ElFormItem,
  ElPagination,
} from 'element-plus'
import { deviceApi } from '../api/index.js'
import StateSelectComponent from '../components/StateSelectComponent.vue'

const device = ref({})

async function updateDescription() {
  const json = await deviceApi.updateDescriptionById(device.value.id, device.value)
  ElMessage.success(json.message)
  await list()
}

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
  dataList.value = json.data
  search.value = json.search
  hideEditDialog()
}

const dialogVisible = ref(false)

function showEditDialog(row) {
  dialogVisible.value = true
  device.value = row
}

function hideEditDialog() {
  dialogVisible.value = false
}

onMounted(() => {
  list()
})
</script>

<style scoped></style>
