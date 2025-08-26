<template>
  <template v-if="$route.path == '/' || $route.path === '/auth'">
    <router-view />
  </template>

  <template v-else>
    <el-container class="layout-container">
      <el-aside v-show="menuVisiable" width="200px">
        <el-scrollbar>
          <el-menu
            :router="true"
            :default-active="$route.path"
            :default-openeds="['1', '2', '3', '4', '5', '6']"
          >
            <el-sub-menu index="1">
              <template #title>
                <el-icon><location /></el-icon>
                <span>总览</span>
              </template>
              <el-menu-item index="/overview"> 总览 </el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="2">
              <template #title>
                <el-icon><User /></el-icon>
                <span>用户模块</span>
              </template>
              <el-menu-item index="/user"> 用户管理 </el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="3">
              <template #title>
                <el-icon><Monitor /></el-icon>
                <span>设备模块</span>
              </template>
              <el-menu-item index="/device"> 设备管理 </el-menu-item>
              <el-menu-item index="/device-monitor"> 设备监控 </el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="4">
              <template #title>
                <el-icon><ChatDotRound /></el-icon>
                <span>消息模块</span>
              </template>
              <el-menu-item index="/message"> 消息管理 </el-menu-item>
              <el-menu-item index="/message-databoard"> 消息面板 </el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="5">
              <template #title>
                <el-icon><TurnOff /></el-icon>
                <span>规则模块</span>
              </template>
              <el-menu-item index="/rule"> 规则管理 </el-menu-item>
              <el-menu-item index="/rule-designer"> 规则设计 </el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="6">
              <template #title>
                <el-icon><Setting /></el-icon>
                <span>系统模块</span>
              </template>
              <el-menu-item index="/log"> 日志管理 </el-menu-item>
              <el-menu-item index="/demo"> 演示 </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <el-container>
        <el-header>
          <el-row style="height: 100%">
            <el-col :lg="1" :ms="4" :sm="4" :xs="4">
              <el-icon :size="32">
                <Menu @click="switchMenu" />
              </el-icon>
            </el-col>

            <el-col style="text-align: center" :lg="22" :sm="16" :xs="16">
              智能家居服务平台
            </el-col>

            <el-col :lg="1" :ms="4" :sm="4" :xs="4">
              <el-avatar :src="userImg" @click="userInfoDrawerVisiable = true" />

              <el-drawer
                v-model="userInfoDrawerVisiable"
                :title="`欢迎, ${loginUser.username}`"
                direction="rtl"
              >
                <el-button @click="userLogout">登出</el-button>
              </el-drawer>
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
import { ref, watch } from 'vue'
import { useRoute, RouterView } from 'vue-router'
import {
  ElAvatar,
  ElDrawer,
  ElIcon,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
  ElScrollbar,
  ElMain,
  ElAside,
  ElContainer,
  ElHeader,
  ElButton,
  ElRow,
  ElCol,
  ElBacktop,
} from 'element-plus'
import {
  Location,
  User,
  Monitor,
  ChatDotRound,
  TurnOff,
  Setting,
  Menu,
} from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import useAuthStore from './stores/auth.js'
import userImg from '@/assets/default-user.png'
const route = useRoute()

const routeNameMap = {
  overview: '总览',
  user: '用户模块',
  device: '设备模块',
  'device-monitor': '设备监控',
  message: '消息模块',
  'message-databoard': '消息面板',
  rule: '规则模块',
  'rule-designer': '规则设计',
  log: '日志管理',
  demo: '演示',
}

watch(
  () => route.path.split('/')[1],
  (newPath) => {
    const title = routeNameMap[newPath] || '智能家居服务平台'
    document.title = title
  },
  { immediate: true },
)

const authStore = useAuthStore()
const { logout } = authStore
const { loginUser } = storeToRefs(authStore)

function userLogout() {
  logout()
  userInfoDrawerVisiable.value = false
}

const menuVisiable = ref(window.innerWidth >= 768)

function switchMenu() {
  menuVisiable.value = !menuVisiable.value
}

const userInfoDrawerVisiable = ref(false)
</script>

<style scoped>
.layout-container {
  height: 100vh;
}

.el-aside {
  border-right: 1px solid #cfcfcf;
}

.el-menu {
  border-right: none;
}

.el-header {
  background-color: #409eff;
  color: white;
  height: 70px;
  padding: 0;
}

.el-header .el-col {
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-icon:hover {
  cursor: pointer;
}

.el-avatar:hover {
  cursor: pointer;
}
</style>
