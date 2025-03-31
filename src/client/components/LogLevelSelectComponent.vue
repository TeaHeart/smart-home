<template>
  <el-select-v2
    placeholder="level"
    :options="options"
    :clearable="clearable"
    :disabled="disabled"
    v-model="level"
  />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElSelectV2 } from 'element-plus'
import { publicApi } from '../api/index.js'

const props = defineProps({
  clearable: {
    type: Boolean,
    default: () => true,
  },
  disabled: {
    type: Boolean,
    default: () => false,
  },
  level: {
    type: String,
  },
})

const emit = defineEmits(['update:level'])

const level = computed({
  get: () => props.level,
  set: (value) => emit('update:level', value),
})

const options = ref([])

async function list() {
  const json = await publicApi.getLogLevelList()
  ElMessage.success(json.message)
  options.value = json.data.map((value) => ({ value, label: value }))
}

onMounted(() => {
  list()
})
</script>

<style scoped></style>
