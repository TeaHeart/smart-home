<template>
  <el-form :model="data">
    <el-form-item v-for="(field, name) in model" :key="name" :label="name">
      <!-- boolean -->
      <el-switch v-if="field.type === 'boolean'" v-model="data[name]" :disabled="disabled" />
      <!-- enum -->
      <el-select-v2
        v-else-if="field.type === 'enum'"
        :options="field.enum.map((value) => ({ label: value, value }))"
        :placeholder="name"
        :disabled="disabled"
        :clearable="clearable"
        v-model="data[name]"
      />
      <!-- number -->
      <el-input
        v-else-if="field.type === 'number'"
        type="number"
        :placeholder="name"
        :disabled="disabled"
        :clearable="clearable"
        v-model.number="data[name]"
      >
        <template #suffix>
          {{ field.unit }}
        </template>
      </el-input>
      <!-- string -->
      <el-input
        v-else-if="field.type === 'string'"
        type="text"
        :placeholder="name"
        :disabled="disabled"
        :clearable="clearable"
        v-model="data[name]"
      >
        <template #suffix>
          {{ field.unit }}
        </template>
      </el-input>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { computed } from 'vue'
import { ElForm, ElFormItem, ElSwitch, ElSelectV2, ElInput } from 'element-plus'

const props = defineProps({
  disabled: {
    type: Boolean,
    default: () => false,
  },
  clearable: {
    type: Boolean,
    default: () => true,
  },
  model: {
    type: Object,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:data'])

const data = computed({
  get: () => props.data,
  set: (value) => emit('update:data', value),
})
</script>

<style scoped>
.el-form {
  width: 100%;
}

.el-form-item {
  padding: 5px;
}
</style>
