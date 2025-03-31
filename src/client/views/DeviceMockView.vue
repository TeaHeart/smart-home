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
    <el-button @click="mockDevice" type="danger">creat 100 mock device</el-button>
  </el-form-item>
  <MockDeviceComponent v-for="item in dataList" :key="item.deviceId" :mock-device="item" />
</template>

<script setup>
import { ref, provide, onUnmounted } from 'vue'
import { ElFormItem, ElSwitch, ElButton } from 'element-plus'
import MockDeviceComponent from '../components/MockDeviceComponent.vue'
import { Lamp, Curtain, AirConditioner, Camera } from '../utils/device/index.js'

const all = ref({
  isAutoNext: false,
  isConnected: false,
  isAutoMode: false,
  isOpen: false,
  next: 0,
})
const dataList = ref([
  new Lamp('00000000000000000000000000000001'),
  new Curtain('00000000000000000000000000000002'),
  new Camera('00000000000000000000000000000003'),
  new AirConditioner('00000000000000000000000000000004'),
])

provide('all', all)

const arr = []

let timerId = setInterval(() => {
  arr.forEach((ac) => {
    ac.next()
  })
}, 1000)

onUnmounted(() => {
  clearInterval(timerId)
})

function mockDevice() {
  for (let i = 0; i < 100; i++) {
    const ac = new AirConditioner(crypto.randomUUID().replaceAll('-', ''))
    ac.connect()
    ac.properties.is_open = true
    arr.push(ac)
  }
}
</script>

<style scoped></style>
