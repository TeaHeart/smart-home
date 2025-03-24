<template>
  <el-select-v2
    :model-value="role"
    @update:model-value="update"
    placeholder="role"
    :options="dataList"
    clearable
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElSelectV2, ElMessage } from 'element-plus'
import { publicApi } from '../api/index.js'

const dataList = ref([])

defineProps({
  role: {
    type: String,
  },
})

const emit = defineEmits(['update:role'])

function update(value) {
  emit('update:role', value)
}

async function list() {
  const json = await publicApi.getRoleList()
  ElMessage.success(json.message)
  dataList.value = json.data.map((value) => ({
    label: value,
    value,
  }))
}

onMounted(() => {
  list()
})
</script>

<style scoped></style>
