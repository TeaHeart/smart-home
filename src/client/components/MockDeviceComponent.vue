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
          <el-form-item
            v-for="(field, property) in device.model.properties"
            :key="property"
            :label="property"
          >
            <!-- boolean -->
            <el-switch v-if="field.type === 'boolean'" v-model="device.properties[property]" />
            <!-- enum -->
            <el-select-v2
              v-else-if="field.type === 'enum'"
              v-model="device.properties[property]"
              :options="field.enum.map((value) => ({ label: value, value }))"
            />
            <!-- number -->
            <el-input
              v-else-if="field.type === 'number'"
              v-model.number="device.properties[property]"
              type="number"
            >
              <template #suffix>
                {{ field.unit }}
              </template>
            </el-input>
            <!-- else other -->
            <el-input v-else v-model="device.properties[property]" type="text">
              <template #suffix>
                {{ field.unit }}
              </template>
            </el-input>
          </el-form-item>
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
            <el-form-item v-for="(field, property) in params" :key="property" :label="property">
              <!-- boolean -->
              <el-switch
                v-if="field.type === 'boolean'"
                v-model="configData.services[service][property]"
              />
              <!-- enum -->
              <el-select-v2
                v-else-if="field.type === 'enum'"
                v-model="configData.services[service][property]"
                :options="field.enum.map((value) => ({ label: value, value }))"
                clearable
              />
              <!-- number -->
              <el-input
                v-else-if="field.type === 'number'"
                v-model.number="configData.services[service][property]"
                type="number"
                clearable
              >
                <template #suffix>
                  {{ field.unit }}
                </template>
              </el-input>
              <!-- else other -->
              <el-input
                v-else
                v-model="configData.services[service][property]"
                type="text"
                clearable
              />
            </el-form-item>
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
            <el-form-item v-for="(field, property) in params" :key="property" :label="property">
              <!-- boolean -->
              <el-switch
                v-if="field.type === 'boolean'"
                v-model="configData.events[event][property]"
              />
              <!-- enum -->
              <el-select-v2
                v-else-if="field.type === 'enum'"
                v-model="configData.events[event][property]"
                :options="field.enum.map((value) => ({ label: value, value }))"
                clearable
              />
              <!-- number -->
              <el-input
                v-else-if="field.type === 'number'"
                v-model.number="configData.events[event][property]"
                type="number"
                clearable
              >
                <template #suffix>
                  {{ field.unit }}
                </template>
              </el-input>
              <!-- else other -->
              <el-input v-else v-model="configData.events[event][property]" type="text" clearable>
                <template #suffix>
                  {{ field.unit }}
                </template>
              </el-input>
            </el-form-item>
          </el-card>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import { ref, reactive, watch, inject, onMounted, onUnmounted } from 'vue'
import {
  ElInput,
  ElCard,
  ElSelectV2,
  ElRow,
  ElCol,
  ElFormItem,
  ElButton,
  ElSwitch,
} from 'element-plus'
import MockDevice from '../utils/device/mock-device.js'

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
  { deep: true },
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
  background-color: #2ed573;
}
</style>
