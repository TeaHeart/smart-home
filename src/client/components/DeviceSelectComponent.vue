<template>
  <el-select-v2
    :disabled="disable"
    :model-value="device"
    @update:model-value="update"
    placeholder="device"
    :options="dataList"
    clearable
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElSelectV2, ElMessage } from 'element-plus'
import { deviceApi } from '../api/index.js'

const dataList = ref([])

defineProps({
  device: {
    type: String,
  },
  disable: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:device'])

function update(value) {
  emit('update:device', value)
}

async function list() {
  const json = await deviceApi.list({ size: -1 })
  ElMessage.success(json.message)
  dataList.value = json.data.map((value) => ({
    label: {
      deviceId: value.deviceId,
      description: value.description,
      name: value.model.name,
    },
    value: value.id,
  }))
}

onMounted(() => {
  list()
})
</script>

<style scoped></style>
