<template>
  <el-form :inline="true" :model="search">
    <el-form-item label="name">
      <el-input v-model="search.name" placeholder="name" clearable />
    </el-form-item>
    <el-form-item label="enabled">
      <el-select-v2
        v-model="search.enabled"
        :options="
          ['enabled', 'disabled'].map((value) => ({ value: value === 'enabled', label: value }))
        "
        style="width: 150px"
        clearable
      ></el-select-v2>
    </el-form-item>
    <el-form-item label="source">
      <DeviceSelectComponent style="width: 150px" v-model:device="search.source" />
    </el-form-item>
    <el-form-item label="target">
      <DeviceSelectComponent style="width: 150px" v-model:device="search.target" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="list">search</el-button>
      <el-button @click="clear">clear</el-button>
    </el-form-item>
  </el-form>

  <el-table :data="dataList">
    <el-table-column type="expand">
      <template #default="scope">
        <el-form-item label="source">
          {{ scope.row.source }}
        </el-form-item>
        <el-form-item label="condition">
          {{ scope.row.condition }}
        </el-form-item>
        <el-form-item label="target">
          {{ scope.row.target }}
        </el-form-item>
        <el-form-item label="service">
          {{ scope.row.service }}
        </el-form-item>
      </template>
    </el-table-column>
    <el-table-column label="id">
      <template #default="scope">
        {{ scope.row.id }}
      </template>
    </el-table-column>
    <el-table-column label="name">
      <template #default="scope">
        {{ scope.row.name }}
      </template>
    </el-table-column>
    <el-table-column label="enabled">
      <template #default="scope">
        <el-switch @click="handleSwitchChange(scope.row)" v-model="scope.row.enabled" />
      </template>
    </el-table-column>
    <el-table-column label="source">
      <template #default="scope">
        {{ scope.row.source.model.name }}
      </template>
    </el-table-column>
    <el-table-column label="condition">
      <template #default="scope">
        {{ scope.row.condition }}
      </template>
    </el-table-column>
    <el-table-column label="target">
      <template #default="scope">
        {{ scope.row.target.model.name }}
      </template>
    </el-table-column>
    <el-table-column label="service">
      <template #default="scope">
        {{ scope.row.service }}
      </template>
    </el-table-column>
    <el-table-column label="description">
      <template #default="scope">
        {{ scope.row.description }}
      </template>
    </el-table-column>
    <el-table-column label="operation">
      <template #default="scope">
        <el-button type="warning" @click="$router.push(`/rule-designer/${scope.row.id}`)"
          >edit</el-button
        >
        <el-button type="danger" @click="deleteById(scope.row.id)">delete</el-button>
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
  ElButton,
  ElMessage,
  ElTable,
  ElTableColumn,
  ElForm,
  ElSelectV2,
  ElInput,
  ElFormItem,
  ElSwitch,
  ElPagination,
} from 'element-plus'
import { ruleApi } from '../api/index.js'
import DeviceSelectComponent from '../components/DeviceSelectComponent.vue'

const searchObj = {
  curr: 1,
  size: 10,
  total: 0,
  name: undefined,
  enabled: undefined,
  source: undefined,
  target: undefined,
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

async function deleteById(id) {
  const json = await ruleApi.deleteById(id)
  ElMessage.success(json.message)
  await list()
}

async function list() {
  const json = await ruleApi.list(search.value)
  ElMessage.success(json.message)
  dataList.value = json.data
  search.value = json.search
}

async function handleSwitchChange(row) {
  const json = await ruleApi.updateEnabledById(row.id, row)
  ElMessage.success(json.message)
  await list()
}

onMounted(() => {
  list()
})
</script>

<style scoped></style>
