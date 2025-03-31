<template>
  <el-card class="device-card">
    <template #header>
      <el-card :header="device.model.name">
        <el-switch
          v-model="isConnected"
          inline-prompt
          active-text="connected"
          inactive-text="disconnected"
        />
        <el-switch
          v-model="device.isAutoMode"
          inline-prompt
          active-text="autoMode"
          inactive-text="editMode"
        />
        <el-switch v-model="isAutoNext" inline-prompt active-text="autoNext" inactive-text="stop" />
        <el-button type="primary" @click="device.next()">next</el-button>
      </el-card>
    </template>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
        <el-card header="properties">
          <ModelFormComponent :model="device.model.properties" v-model:data="device.properties" />
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
        <el-card header="services">
          <el-card v-for="(params, service) in device.model.services" :key="service">
            <template #header>
              <el-button
                type="primary"
                @click="device[`service_${service}`](configData.services[service])"
              >
                {{ service }}
              </el-button>
            </template>
            <ModelFormComponent :model="params" v-model:data="configData.services[service]" />
          </el-card>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
        <el-card header="events">
          <el-card v-for="(params, event) in device.model.events" :key="event">
            <template #header>
              <el-button type="primary" @click="device[`event_${event}`](configData.events[event])">
                {{ event }}
              </el-button>
            </template>
            <ModelFormComponent :model="params" v-model:data="configData.events[event]" />
          </el-card>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import { ref, reactive, watch, inject, onMounted, onUnmounted } from 'vue'
import { ElCard, ElRow, ElCol, ElButton, ElSwitch } from 'element-plus'
import MockDevice from '../utils/device/mock-device.js'
import ModelFormComponent from './ModelFormComponent.vue'

const props = defineProps({
  mockDevice: {
    type: MockDevice,
    required: true,
  },
})

const device = props.mockDevice

const configData = reactive({
  services: {},
  events: {},
})

for (const key in device.model.services) {
  configData.services[key] = {}
}

for (const key in device.model.events) {
  configData.events[key] = {}
}

const isAutoNext = ref(false)

let timerId

onMounted(() => {
  timerId = setInterval(() => {
    if (isAutoNext.value) {
      device.next()
    }
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timerId)
})

const isConnected = ref(false)

watch(isConnected, () => {
  if (isConnected.value) {
    device.connect()
  } else {
    device.disconnect()
  }
})

const all = inject('all')

let next

watch(
  all,
  () => {
    isConnected.value = all.value.isConnected
    device.isAutoMode = all.value.isAutoMode
    isAutoNext.value = all.value.isAutoNext
    device.properties.is_open = all.value.isOpen
    if (next !== all.value.next) {
      device.next()
      next = all.value.next
    }
  },
  {
    deep: true,
  },
)
</script>

<style scoped>
.el-card {
  margin-bottom: 10px;
}

.device-card .el-card:hover {
  background-color: #dfe4ea;
}

.device-card {
  background-color: #a4b0be;
}
</style>
