<template>
  <el-select-v2
    filterable
    placeholder="device"
    :options="options"
    :disabled="disabled"
    :clearable="clearable"
    v-model="device"
  />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElSelectV2, ElMessage } from 'element-plus'
import { deviceApi } from '../api/index.js'

const props = defineProps({
  disabled: {
    type: Boolean,
    default: () => false,
  },
  clearable: {
    type: Boolean,
    default: () => true,
  },
  device: {
    type: String,
  },
})

const emit = defineEmits(['update:device'])

const device = computed({
  get: () => props.device,
  set: (value) => emit('update:device', value),
})

const options = ref([])

async function list() {
  const json = await deviceApi.list({ size: -1 })
  ElMessage.success(json.message)
  options.value = json.data.map((value) => ({
    label: [value.deviceId, value.model.name, value.description].filter(item => item).join(' | '),
    value: value.id,
  }))
}

onMounted(() => {
  list()
})
</script>

<style scoped></style>
