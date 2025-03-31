<template>
  <el-form>
    <el-form-item label="id">
      <el-input v-model="entity.id" disabled clearable />
    </el-form-item>
    <el-form-item label="name">
      <el-input v-model="entity.name" clearable />
    </el-form-item>
    <el-form-item label="enabled">
      <el-switch v-model:model-value="entity.enabled" />
    </el-form-item>
    <el-form-item label="source">
      <DeviceSelectComponent v-model:device="entity.source" />
    </el-form-item>
    <el-form-item label="condition">
      <el-tag v-for="item in operatorList" :key="item" @click="appendToCondition(item)">
        {{ item }}
      </el-tag>
      <template v-if="sourceDevice.model">
        <el-tag
          type="success"
          v-for="(field, property) in sourceDevice.model.properties"
          :key="property"
          @click="appendToCondition(property)"
        >
          {{ property }}
        </el-tag>
      </template>
      <el-input v-model="entity.condition" clearable />
    </el-form-item>
    <el-form-item label="target">
      <DeviceSelectComponent v-model:device="entity.target" />
    </el-form-item>
    <el-form-item label="service">
      <el-select-v2 v-model="entity.service.service" :options="targetServiceOptions" clearable />
      <!-- 忘记设置了类型, 这里就没用了 -->
      <!--
      <template v-if="sourceDevice.model">
        can use:<el-tag
          type="warning"
          v-for="(field, property) in sourceDevice.model.properties"
          :key="property"
        >
          {{ property }}
        </el-tag>
      </template>
      -->
      <ModelFormComponent
        v-if="entity.service.service && targetDevice.model"
        :model="targetDevice.model.services[entity.service.service]"
        v-model:data="entity.service.data"
      />
      <el-input v-bind:model-value="JSON.stringify(entity.service.data)" disabled />
    </el-form-item>
    <el-form-item label="description">
      <el-input v-model="entity.description" clearable />
    </el-form-item>
    <el-form-item>
      <el-button @click="clear">clear</el-button>
      <el-button type="primary" @click="save">save</el-button>
    </el-form-item>
  </el-form>
  {{ entity }}
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { deviceApi, ruleApi } from '../api/index.js'
import {
  ElMessage,
  ElButton,
  ElTag,
  ElSwitch,
  ElFormItem,
  ElForm,
  ElInput,
  ElSelectV2,
} from 'element-plus'
import DeviceSelectComponent from '../components/DeviceSelectComponent.vue'
import ModelFormComponent from '../components/ModelFormComponent.vue'

const operatorList = ['and', 'or', 'not', '>', '>=', '<', '<=', '==', '!=', '( )']

const entityObj = {
  enabled: true,
  service: {
    data: {},
  },
}

const entity = ref({})
const sourceDevice = ref({})
const targetDevice = ref({})

const targetServiceOptions = computed(() => {
  if (targetDevice.value.model?.services) {
    return Object.keys(targetDevice.value.model.services).map((value) => ({
      value,
      label: value,
    }))
  }
  return []
})

function clear() {
  entity.value = JSON.parse(JSON.stringify(entityObj))
}
clear()

function appendToCondition(property) {
  if (!entity.value.condition) {
    entity.value.condition = ''
  }
  entity.value.condition += ' '
  entity.value.condition += property
  entity.value.condition += ' '
}

async function save() {
  if (entity.value.id) {
    const json = await ruleApi.updateById(entity.value.id, entity.value)
    ElMessage.success(json.message)
  } else {
    entity.value.id = undefined
    const json = await ruleApi.add(entity.value)
    ElMessage.success(json.message)
  }
}

watch(
  () => entity.value.source,
  async () => {
    if (!entity.value.source) {
      sourceDevice.value = {}
      return
    }
    const json = await deviceApi.getById(entity.value.source)
    ElMessage.success(json.message)
    sourceDevice.value = json.data
  },
)

watch(
  () => entity.value.target,
  async () => {
    if (!entity.value.target) {
      targetDevice.value = {}
      return
    }
    const json = await deviceApi.getById(entity.value.target)
    ElMessage.success(json.message)
    targetDevice.value = json.data
  },
)

watch(
  () => entity.value.service.service,
  (newVal, oldVal) => {
    if (oldVal) {
      entity.value.service.data = {}
    }
  },
)

onMounted(async () => {
  const route = useRoute()
  const id = route.params.id
  if (id) {
    const json = await ruleApi.getById(id)
    ElMessage.success(json.message)
    entity.value = json.data
  }
})
</script>

<style scoped>
.el-tag:hover {
  cursor: pointer;
}

.el-tag {
  margin-right: 3px;
  margin-bottom: 3px;
}
</style>
