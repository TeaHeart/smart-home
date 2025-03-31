<template>
  <el-form :inline="true" :model="search">
    <el-form-item label="name">
      <el-input placeholder="name" clearable v-model="search.name" @update:model-value="list" />
    </el-form-item>
    <el-form-item label="enabled">
      <el-select-v2
        filterable
        style="width: 150px"
        :options="options"
        placeholder="enabled"
        clearable
        v-model="search.enabled"
        @update:model-value="list"
      />
    </el-form-item>
    <el-form-item label="source">
      <DeviceSelectComponent
        style="width: 500px"
        clearable
        v-model:device="search.source"
        @update:device="list"
      />
    </el-form-item>
    <el-form-item label="target">
      <DeviceSelectComponent
        style="width: 500px"
        clearable
        v-model:device="search.target"
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
  ElSelectV2,
  ElInput,
  ElFormItem,
  ElSwitch,
  ElPagination,
} from 'element-plus'
import { ruleApi } from '../api/index.js'
import DeviceSelectComponent from '../components/DeviceSelectComponent.vue'

const options = [
  { label: 'enabled', value: true },
  { label: 'disabled', value: false },
]

async function deleteById(id) {
  const json = await ruleApi.deleteById(id)
  ElMessage.success(json.message)
  await list()
}

async function handleSwitchChange(row) {
  const json = await ruleApi.updateEnabledById(row.id, row)
  ElMessage.success(json.message)
  await list()
}

const dataList = ref([])
const search = ref({})

async function list() {
  const json = await ruleApi.list(search.value)
  ElMessage.success(json.message)
  dataList.value = json.data
  search.value = json.search
}

onMounted(() => {
  list()
})
</script>

<style scoped></style>
