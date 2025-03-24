<template>
  <el-row>
    <el-col :span="6"> </el-col>
    <el-col :span="12"> smart-home </el-col>
    <el-col :span="3">
      <el-button @click="me">hi, {{ loginUser.username }}</el-button>
    </el-col>
    <el-col :span="3">
      <el-button @click="logout">logout</el-button>
    </el-col>
  </el-row>
</template>

<script setup>
import { ElButton, ElRow, ElCol } from 'element-plus'
import { storeToRefs } from 'pinia'
import useAuthStore from '../stores/auth.js'

const authStore = useAuthStore()
const { logout, me } = authStore
const { loginUser } = storeToRefs(authStore)
</script>

<style scoped>
.el-row {
  background-color: #409eff;
  color: white;
  text-align: center;
  line-height: 60px;
}

span:hover {
  cursor: pointer;
}
</style>
