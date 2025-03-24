<template>
  <el-select-v2
    :model-value="type"
    @update:model-value="update"
    placeholder="type"
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
  type: {
    type: String,
  },
})

const emit = defineEmits(['update:type'])

function update(value) {
  emit('update:type', value)
}

async function list() {
  const json = await publicApi.getTypeList()
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
