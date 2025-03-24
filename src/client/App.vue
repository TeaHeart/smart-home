<template>
  <template v-if="$route.path == '/' || $route.path === '/auth'">
    <router-view />
  </template>

  <template v-else>
    <el-container class="layout-container">
      <el-aside>
        <AppAsideComponent />
      </el-aside>

      <el-container>
        <el-header>
          <AppHeaderComponent />
        </el-header>

        <el-main>
          <el-scrollbar>
            <router-view />
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </template>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { ElMain, ElAside, ElScrollbar, ElContainer, ElHeader } from 'element-plus'
import AppAsideComponent from './components/AppAsideComponent.vue'
import AppHeaderComponent from './components/AppHeaderComponent.vue'
</script>

<style scoped>
.layout-container {
  height: 100vh;
}

.el-aside {
  width: 200px;
  border-right: 1px solid #cfcfcf;
}

.el-header {
  padding: 0;
}
</style>
