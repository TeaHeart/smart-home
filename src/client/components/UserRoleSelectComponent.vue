<template>
  <el-select-v2
    filterable
    placeholder="role"
    :options="options"
    :clearable="clearable"
    :disabled="disabled"
    v-model="role"
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
  role: {
    type: String,
  },
})

const emit = defineEmits(['update:role'])

const role = computed({
  get: () => props.role,
  set: (value) => emit('update:role', value),
})

const options = ref([])

async function list() {
  const json = await publicApi.getUserRoleList()
  ElMessage.success(json.message)
  options.value = json.data.map((value) => ({ value, label: value }))
}

onMounted(() => {
  list()
})
</script>

<style scoped></style>
