<template>
  <el-form :inline="true" :model="search">
    <el-form-item label="device">
      <DeviceSelectComponent
        style="width: 500px"
        v-model:device="search.deviceId"
        @update:device="update"
      />
    </el-form-item>
    <el-form-item label="time">
      <el-date-picker
        type="datetimerange"
        :shortcuts="shortcuts"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
        v-model="search.timeRange"
        @update:model-value="update"
      />
    </el-form-item>
  </el-form>
  <el-card header="stats">
    <el-row :gutter="20">
      <el-col v-for="(value, key) in data.stats" :key="key" :span="4">
        <el-statistic :value="value">
          <template #title>
            <el-tag :type="typeToClass[key]"> {{ key }} </el-tag>
          </template>
        </el-statistic>
      </el-col>
    </el-row>
  </el-card>
  <el-card header="history">
    <div style="height: 500px; width: 100%" ref="chartRef" />
  </el-card>
  <el-card v-for="(value, key) in data.message" :key="key">
    <template #header>
      <el-tag :type="typeToClass[key]">{{ key }} </el-tag>
    </template>
    <el-table :data="value">
      <el-table-column type="expand">
        <template #default="scope">
          {{ JSON.stringify(scope.row) }}
        </template>
      </el-table-column>
      <el-table-column label="time">
        <template #default="scope">
          {{ scope.row.time }}
        </template>
      </el-table-column>
      <el-table-column v-if="key === 'service' || key === 'event'" :label="key">
        <template #default="scope">
          {{ scope.row.data[key] }}
        </template>
      </el-table-column>
      <el-table-column label="data">
        <template #default="scope">
          {{ JSON.stringify(scope.row.data) }}
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import {
  ElForm,
  ElFormItem,
  ElDatePicker,
  ElCard,
  ElTable,
  ElTableColumn,
  ElRow,
  ElCol,
  ElStatistic,
  ElTag,
} from 'element-plus'
import * as echarts from 'echarts'
import { messageApi } from '../api/index.js'
import DeviceSelectComponent from '../components/DeviceSelectComponent.vue'

const typeToClass = {
  online: 'success',
  upload: 'info',
  service: 'primary',
  event: 'warning',
  offline: 'danger',
}

const shortcuts = [
  {
    text: 'last 10 minute',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setMinutes(end.getMinutes() - 10)
      return [start, end]
    },
  },
  {
    text: 'last hour',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setHours(end.getHours() - 1)
      return [start, end]
    },
  },
  {
    text: 'last day',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setDate(start.getDate() - 1)
      return [start, end]
    },
  },
  {
    text: 'last week',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setDate(start.getDate() - 7)
      return [start, end]
    },
  },
  {
    text: 'last month',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setMonth(start.getMonth() - 1)
      return [start, end]
    },
  },
]

const search = ref({
  timeRange: shortcuts[1].value(),
  deviceId: '',
})
const data = ref({
  time: [],
  history: {},
  stats: {
    online: 0,
    upload: 0,
    service: 0,
    event: 0,
    offline: 0,
  },
  message: {
    upload: [],
    service: [],
    event: [],
  },
})
const chartRef = ref(null)

async function update() {
  if (!search.value.deviceId || !search.value.timeRange) {
    return
  }
  let json = await messageApi.listHistory(search.value)
  data.value = json.data
  updateChart()
}

let chart

function clean() {
  if (chart) {
    chart.dispose()
    chart = null
  }
}

function updateChart() {
  clean()
  chart = echarts.init(chartRef.value)
  const propertyNameList = []
  const series = []
  for (const key in data.value.history) {
    propertyNameList.push(key)
    series.push({
      name: key,
      type: 'line',
      data: data.value.history[key],
    })
  }
  var option = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: propertyNameList,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.value.time,
    },
    yAxis: {
      type: 'value',
    },
    series: series,
  }
  chart.setOption(option)
}

onBeforeUnmount(() => {
  clean()
})
</script>

<style scoped>
.el-card {
  margin-bottom: 20px;
}

.el-statistic {
  --el-statistic-content-font-size: 2em;
  --el-statistic-title-font-size: 1.2em;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
</style>
