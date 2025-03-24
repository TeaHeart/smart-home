<template>
  <el-select-v2
    :model-value="level"
    @update:model-value="update"
    placeholder="level"
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
  level: {
    type: String,
  },
})

const emit = defineEmits(['update:level'])

function update(value) {
  emit('update:level', value)
}

async function list() {
  const json = await publicApi.getLevelList()
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
