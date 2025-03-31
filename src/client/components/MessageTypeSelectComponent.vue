<template>
  <el-select-v2
    filterable
    placeholder="type"
    :options="options"
    :clearable="clearable"
    :disabled="disabled"
    v-model="type"
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
  type: {
    type: String,
  },
})

const emit = defineEmits(['update:type'])

const type = computed({
  get: () => props.type,
  set: (value) => emit('update:type', value),
})

const options = ref([])

async function list() {
  const json = await publicApi.getMessageTypeList()
  ElMessage.success(json.message)
  options.value = json.data.map((value) => ({ value, label: value }))
}

onMounted(() => {
  list()
})
</script>

<style scoped></style>
