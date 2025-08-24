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
            <el-menu-item index="/overview"> overview </el-menu-item>
            <!-- </el-sub-menu> -->

            <el-sub-menu index="2">
              <template #title> user </template>
              <el-menu-item index="/user"> user </el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="3">
              <template #title> device </template>
              <el-menu-item index="/device"> device </el-menu-item>
              <el-menu-item index="/device-monitor"> device monitor </el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="4">
              <template #title> message </template>
              <el-menu-item index="/message"> message </el-menu-item>
              <el-menu-item index="/message-databoard"> message databoard </el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="5">
              <template #title> rule </template>
              <el-menu-item index="/rule"> rule </el-menu-item>
              <el-menu-item index="/rule-designer"> rule designer </el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="6">
              <template #title> system </template>
              <el-menu-item index="/log"> log </el-menu-item>
              <el-menu-item index="/device-mock"> device mock </el-menu-item>
              <el-menu-item index="/demo"> demo </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <el-container>
        <el-header>
          <el-row>
            <el-col :span="4"> {{ title }} </el-col>
            <el-col :span="16"> smart-home </el-col>
            <el-col :span="2">
              <el-tag>hi, {{ loginUser.username }}</el-tag>
            </el-col>
            <el-col :span="2">
              <el-tag @click="logout">logout</el-tag>
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
