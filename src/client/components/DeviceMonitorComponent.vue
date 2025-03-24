<template>
  <el-card class="device-card">
    <template #header>
      {{ device.model.name }}
      <el-tag :type="stateToClass[device.state]">{{ device.state }}</el-tag>
      <el-tag v-if="device.description" type="info"> {{ device.description }}</el-tag>
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
            <el-switch
              v-if="field.type === 'boolean'"
              v-model="device.properties[property]"
              disabled
            />
            <!-- enum -->
            <el-select-v2
              v-else-if="field.type === 'enum'"
              v-model="device.properties[property]"
              :options="field.enum.map((value) => ({ label: value, value }))"
              disabled
            />
            <!-- number -->
            <el-input
              v-else-if="field.type === 'number'"
              v-model.number="device.properties[property]"
              type="number"
              disabled
            >
              <template #suffix>
                {{ field.unit }}
              </template>
            </el-input>
            <!-- else other -->
            <el-input v-else v-model="device.properties[property]" type="text" disabled />
          </el-form-item>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
        <el-card header="services">
          <el-card v-for="(params, service) in device.model.services" :key="service">
            <template #header>
              <el-button
                type="primary"
                @click="device.services(service, deviceData.services[service])"
              >
                {{ service }}
              </el-button>
            </template>
            <el-form-item v-for="(field, property) in params" :key="property" :label="property">
              <!-- boolean -->
              <el-switch
                v-if="field.type === 'boolean'"
                v-model="deviceData.services[service][property]"
              />
              <!-- enum -->
              <el-select-v2
                v-else-if="field.type === 'enum'"
                v-model="deviceData.services[service][property]"
                :options="field.enum.map((value) => ({ label: value, value }))"
                clearable
              />
              <!-- number -->
              <el-input
                v-else-if="field.type === 'number'"
                v-model.number="deviceData.services[service][property]"
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
                v-model="deviceData.services[service][property]"
                type="text"
                clearable
              >
                <template #suffix>
                  {{ field.unit }}
                </template>
              </el-input>
            </el-form-item>
          </el-card>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
        <el-card>
          <template #header>
            events
            <el-button type="warning" @click="device.events.splice(0)">clear</el-button>
          </template>
          <el-table :data="device.events">
            <el-table-column type="expand">
              <template #default="scope">
                {{ JSON.stringify(scope.row) }}
              </template>
            </el-table-column>
            <el-table-column label="event">
              <template #default="scope">
                {{ scope.row.event }}
              </template>
            </el-table-column>
            <el-table-column label="data">
              <template #default="scope">
                {{ JSON.stringify(scope.row.data) }}
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import {
  ElInput,
  ElCard,
  ElSelectV2,
  ElRow,
  ElCol,
  ElTag,
  ElFormItem,
  ElButton,
  ElSwitch,
  ElTable,
  ElTableColumn,
} from 'element-plus'
import DeviceMonitor from '../utils/device/device-monitor.js'

const stateToClass = ref({
  online: 'success',
  offline: 'danger',
})

const props = defineProps({
  deviceMonitor: {
    type: DeviceMonitor,
    required: true,
  },
})

const device = props.deviceMonitor
const deviceData = reactive({
  services: {},
})

for (const key in device.model.services) {
  deviceData.services[key] = {}
}

onMounted(() => {
  device.connect()
})
onUnmounted(() => {
  device.disconnect()
})
</script>

<style scoped>
.el-card {
  margin-bottom: 10px;
}

.device-card .el-card:hover {
  background-color: #dfe4ea;
}

.device-card {
  background-color: #ced6e0;
}
</style>
