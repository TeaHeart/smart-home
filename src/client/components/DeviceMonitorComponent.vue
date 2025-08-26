<template>
  <el-card class="device-card">
    <template #header>
      {{ device.model.name }}
      <el-tag :type="device.online ? 'success' : 'danger'">
        {{ device.online ? 'online' : 'offline' }}
      </el-tag>
      <el-tag v-if="device.description" type="primary"> {{ device.description }}</el-tag>
    </template>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-card header="properties">
          <ModelFormComponent
            :disabled="true"
            :model="device.model.properties"
            v-model:data="device.properties"
          />
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
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
            <ModelFormComponent :model="params" v-model:data="deviceData.services[service]" />
          </el-card>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-card>
          <template #header>
            events
            <el-button @click="device.events.splice(0)">clear</el-button>
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
import { reactive, onMounted, onUnmounted } from 'vue'
import { ElCard, ElRow, ElCol, ElTag, ElButton, ElTable, ElTableColumn } from 'element-plus'
import { DeviceMonitor } from '../utils/index.js'
import ModelFormComponent from './ModelFormComponent.vue'

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
