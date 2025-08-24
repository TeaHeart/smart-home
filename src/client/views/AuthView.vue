<template>
  <el-container>
    <el-header>
      <span>智能家居服务平台</span>
    </el-header>
    <el-main>
      <el-form :model="user">
        <el-form-item>
          <span>欢迎</span>
        </el-form-item>
        <el-form-item label-width="60px" label="用户名">
          <el-input v-model="user.username" clearable />
        </el-form-item>
        <el-form-item label-width="60px" label="密码">
          <el-input type="password" v-model="user.password" clearable />
        </el-form-item>
        <el-form-item>
          <div>
            <el-button type="primary" @click="login">登录</el-button>
            <el-button @click="register">注册</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-main>
    <el-footer> {{ appVersion }}</el-footer>
  </el-container>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import {
  ElButton,
  ElInput,
  ElForm,
  ElFormItem,
  ElContainer,
  ElHeader,
  ElMain,
  ElFooter,
} from 'element-plus'
import useAuthStore from '../stores/auth.js'

const authStore = useAuthStore()
const { register, login } = authStore
const { user } = storeToRefs(authStore)

const appVersion = import.meta.env.VITE_APP_VERSION
</script>

<style scoped>
.el-container {
  height: 100vh;
}

.el-header,
.el-footer {
  background-color: #409eff;
  color: white;
  text-align: center;
  line-height: 60px;
}

.el-main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-form {
  width: 400px;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.el-header span {
  font-size: 1.8em;
}

.el-form-item span {
  font-size: 1.2em;
  width: 100%;
  text-align: center;
}

.el-form-item div {
  margin: 0 auto;
}
</style>
