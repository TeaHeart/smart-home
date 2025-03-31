<template>
  <el-form :inline="true" :model="addUser">
    <el-form-item label="username">
      <el-input v-model="addUser.username" clearable />
    </el-form-item>
    <el-form-item label="password">
      <el-input type="password" v-model="addUser.password" clearable />
    </el-form-item>
    <el-form-item label="role">
      <UserRoleComponent style="width: 150px" v-model:role="addUser.role" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="add">add</el-button>
    </el-form-item>
  </el-form>

  <el-table :data="dataList">
    <el-table-column type="expand">
      <!-- eslint-disable-next-line vue/no-unused-vars -->
      <template #default="scope"> </template>
    </el-table-column>
    <el-table-column label="id">
      <template #default="scope">
        {{ scope.row.id }}
      </template>
    </el-table-column>
    <el-table-column label="username">
      <template #default="scope">
        {{ scope.row.username }}
      </template>
    </el-table-column>
    <el-table-column label="role">
      <template #default="scope">
        {{ scope.row.role }}
      </template>
    </el-table-column>
    <el-table-column label="operation">
      <template #default="scope">
        <el-button
          :disabled="scope.row.username === 'sa'"
          type="warning"
          @click="showEditDialog(scope.row)"
        >
          edit
        </el-button>
        <el-button
          :disabled="scope.row.username === 'sa'"
          type="danger"
          @click="deleteById(scope.row.id)"
        >
          delete
        </el-button>
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
    <el-form :model="editUser">
      <el-form-item label="id">
        <el-input v-model="editUser.id" disabled />
      </el-form-item>
      <el-form-item label="username">
        <el-input v-model="editUser.username" />
      </el-form-item>
      <el-form-item label="password">
        <el-input type="password" v-model="editUser.password" />
      </el-form-item>
      <el-form-item label="role">
        <UserRoleComponent v-model:role="editUser.role" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="warning" @click="updateById">update</el-button>
      <el-button @click="hideEditDialog">close</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  ElButton,
  ElInput,
  ElMessage,
  ElTable,
  ElTableColumn,
  ElForm,
  ElDialog,
  ElFormItem,
  ElPagination,
} from 'element-plus'
import userApi from '../api/user.js'
import UserRoleComponent from '../components/UserRoleSelectComponent.vue'

const addUser = ref({
  role: 'user',
})
const editUser = ref({})

async function add() {
  const json = await userApi.add(addUser.value)
  ElMessage.success(json.message)
  await list()
}

async function deleteById(id) {
  const json = await userApi.deleteById(id)
  ElMessage.success(json.message)
  await list()
}

async function updateById() {
  const json = await userApi.updateById(editUser.value.id, editUser.value)
  ElMessage.success(json.message)
  await list()
}

const dataList = ref([])
const search = ref({})

async function list() {
  const json = await userApi.list(search.value)
  ElMessage.success(json.message)
  dataList.value = json.data
  search.value = json.search
  hideEditDialog()
}

const dialogVisible = ref(false)

function showEditDialog(row) {
  dialogVisible.value = true
  editUser.value = row
}

function hideEditDialog() {
  dialogVisible.value = false
}

onMounted(() => {
  list()
})
</script>

<style scoped></style>
