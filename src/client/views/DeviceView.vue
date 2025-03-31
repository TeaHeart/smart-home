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
        <el-tag :type="scope.row.online ? 'success' : 'danger'">
          {{ scope.row.online ? 'online' : 'offline' }}
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
    @current-change="list"
    @size-change="list"
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
      <el-button type="warning" @click="updateDescription">update</el-button>
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
  ElSelectV2,
} from 'element-plus'
import { deviceApi } from '../api/index.js'

const options = [
  { label: 'online', value: true },
  { label: 'offline', value: false },
]

const device = ref({})

async function updateDescription() {
  const json = await deviceApi.updateDescriptionById(device.value.id, device.value)
  ElMessage.success(json.message)
  await list()
}

const dataList = ref([])
const search = ref({})

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
