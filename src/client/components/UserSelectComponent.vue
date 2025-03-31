<template>
  <el-select-v2
    filterable
    placeholder="user"
    :options="options"
    :disabled="disabled"
    :clearable="clearable"
    v-model="user"
  />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElSelectV2, ElMessage } from 'element-plus'
import { userApi } from '../api/index.js'

const props = defineProps({
  disabled: {
    type: Boolean,
    default: () => false,
  },
  clearable: {
    type: Boolean,
    default: () => true,
  },
  user: {
    type: String,
  },
})

const emit = defineEmits(['update:user'])

const user = computed({
  get: () => props.user,
  set: (value) => emit('update:user', value),
})

const options = ref([])

async function list() {
  const json = await userApi.list({ size: -1 })
  ElMessage.success(json.message)
  options.value = json.data.map((value) => ({
    label: value.username,
    value: value.id,
  }))
}

onMounted(() => {
  list()
})
</script>

<style scoped></style>
