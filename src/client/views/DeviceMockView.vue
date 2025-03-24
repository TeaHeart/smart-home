<template>
  <el-form-item label="for all">
    <el-switch
      v-model="all.isConnected"
      inline-prompt
      active-text="connected"
      inactive-text="disconnected"
    />
    <el-switch
      v-model="all.isAutoMode"
      inline-prompt
      active-text="autoMode"
      inactive-text="editMode"
    />
    <el-switch v-model="all.isAutoNext" inline-prompt active-text="autoNext" inactive-text="stop" />
    <el-button type="primary" @click="all.next++">next</el-button>
    <el-switch v-model="all.isOpen" inline-prompt active-text="open" inactive-text="close" />
  </el-form-item>
  <MockDeviceComponent v-for="item in dataList" :key="item.deviceId" :mock-device="item" />
</template>

<script setup>
import { ref, provide } from 'vue'
import { ElFormItem, ElSwitch, ElButton } from 'element-plus'
import MockDeviceComponent from '../components/MockDeviceComponent.vue'
import Lamp from '../utils/device/lamp.js'
import Curtain from '../utils/device/curtain.js'
import AirConditioner from '../utils/device/air-conditioner.js'
import Camera from '../utils/device/camera'

const all = ref({
  isAutoNext: false,
  isConnected: false,
  isAutoMode: false,
  isOpen: false,
  next: 0,
})
const dataList = ref([
  new Lamp('00000000000000000000000000000001'),
  new Lamp('00000000000000000000000000000002'),
  new Curtain('00000000000000000000000000000003'),
  new Curtain('00000000000000000000000000000004'),
  new Camera('00000000000000000000000000000005'),
  new Camera('00000000000000000000000000000006'),
  new AirConditioner('00000000000000000000000000000007'),
  new AirConditioner('00000000000000000000000000000008'),
])

provide('all', all)
</script>

<style scoped></style>
