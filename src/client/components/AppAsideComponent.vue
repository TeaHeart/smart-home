<template>
  <el-scrollbar>
    <el-menu
      :router="true"
      :default-active="$route.path"
      :default-openeds="['1', '2', '3', '4', '5', '6']"
    >
      <el-sub-menu index="1">
        <template #title> home </template>
        <el-menu-item index="/overview"> overview </el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="2">
        <template #title> user </template>
        <el-menu-item index="/user"> user </el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="3">
        <template #title> device </template>
        <el-menu-item index="/device"> device </el-menu-item>
        <el-menu-item index="/device-monitor"> device monitor </el-menu-item>
        <el-menu-item index="/device-mock"> device mock </el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="4">
        <template #title> message </template>
        <el-menu-item index="/message"> message </el-menu-item>
        <el-menu-item index="/message-databoard"> databoard </el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="5">
        <template #title> rule </template>
        <el-menu-item index="/rule"> rule </el-menu-item>
        <el-menu-item index="/rule-designer"> designer </el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="6">
        <template #title> system </template>
        <el-menu-item index="/log"> log </el-menu-item>
        <el-menu-item index="/about"> about </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-scrollbar>
</template>

<script setup>
import { ElMenu, ElMenuItem, ElSubMenu, ElScrollbar } from 'element-plus'
</script>

<style scoped>
.el-menu {
  border-right: none;
}
</style>
