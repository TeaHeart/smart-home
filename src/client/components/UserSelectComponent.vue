<template>
  <el-select-v2
    :model-value="user"
    @update:model-value="update"
    placeholder="user"
    :options="dataList"
    clearable
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElSelectV2, ElMessage } from 'element-plus'
import { userApi } from '../api/index.js'

const dataList = ref([])

defineProps({
  user: {
    type: String,
  },
})

const emit = defineEmits(['update:user'])

function update(value) {
  emit('update:user', value)
}

async function list() {
  const json = await userApi.list({ curr: 1, size: 1000 })
  ElMessage.success(json.message)
  dataList.value = json.data.map((value) => ({
    label: value.username,
    value: value.id,
  }))
}

onMounted(() => {
  list()
})
</script>

<style scoped></style>
