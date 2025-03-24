<template>
  <el-select-v2
    :model-value="state"
    @update:model-value="update"
    placeholder="state"
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
  state: {
    type: String,
  },
})

const emit = defineEmits(['update:state'])

function update(value) {
  emit('update:state', value)
}

async function list() {
  const json = await publicApi.getStateList()
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
