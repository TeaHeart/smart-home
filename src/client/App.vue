<template>
  <template v-if="$route.path == '/' || $route.path === '/auth'">
    <router-view />
  </template>

  <template v-else>
    <el-container class="layout-container">
      <el-aside>
        <el-scrollbar>
          <el-menu
            :router="true"
            :default-active="$route.path"
            :default-openeds="['1', '2', '3', '4', '5', '6']"
          >
            <!-- <el-sub-menu index="1"> -->
            <!-- <template #title> home </template> -->
            <el-menu-item index="/overview"> 总览 </el-menu-item>
            <!-- </el-sub-menu> -->

            <el-sub-menu index="2">
              <template #title> 用户模块 </template>
              <el-menu-item index="/user"> 用户管理 </el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="3">
              <template #title> 设备模块 </template>
              <el-menu-item index="/device"> 设备管理 </el-menu-item>
              <el-menu-item index="/device-monitor"> 设备监控 </el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="4">
              <template #title> 消息模块 </template>
              <el-menu-item index="/message"> 消息管理 </el-menu-item>
              <el-menu-item index="/message-databoard"> 消息面板 </el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="5">
              <template #title> 规则模块 </template>
              <el-menu-item index="/rule"> 规则管理 </el-menu-item>
              <el-menu-item index="/rule-designer"> 规则设计 </el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="6">
              <template #title> 系统模块 </template>
              <el-menu-item index="/log"> 日志管理 </el-menu-item>
              <el-menu-item index="/demo"> 演示 </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <el-container>
        <el-header>
          <el-row>
            <el-col :span="4"> {{ title }} </el-col>
            <el-col :span="16"> 智能家居服务平台 </el-col>
            <el-col :span="2">
              <el-tag>您好, {{ loginUser.username }}</el-tag>
            </el-col>
            <el-col :span="2">
              <el-tag @click="logout">登出</el-tag>
            </el-col>
          </el-row>
        </el-header>

        <el-main>
          <el-scrollbar view-style="height:100%">
            <router-view />
            <el-backtop
              target=".el-main .el-scrollbar__wrap"
              style="width: 50px; height: 50px; background-color: #409eff; color: white"
              :right="100"
              :bottom="100"
            >
            </el-backtop>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </template>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, RouterView } from 'vue-router'
import {
  ElMenu,
  ElMenuItem,
  ElSubMenu,
  ElScrollbar,
  ElMain,
  ElAside,
  ElContainer,
  ElHeader,
  ElTag,
  ElRow,
  ElCol,
  ElBacktop,
} from 'element-plus'
import { storeToRefs } from 'pinia'
import useAuthStore from './stores/auth.js'

const route = useRoute()
const title = computed(() => route.path.split('/')[1])

const authStore = useAuthStore()
const { logout } = authStore
const { loginUser } = storeToRefs(authStore)
</script>

<style scoped>
.layout-container {
  height: 100vh;
}

.el-aside {
  width: 200px;
  border-right: 1px solid #cfcfcf;
}

.el-menu {
  border-right: none;
}

.el-header {
  padding: 0;
}

.el-header .el-row {
  background-color: #409eff;
  color: white;
  text-align: center;
  line-height: 60px;
}

span:hover {
  cursor: pointer;
}
</style>
