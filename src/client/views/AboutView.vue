<template>
  <div>about</div>
</template>

<script setup>
import { reactive } from 'vue'

const list = reactive({})

list.a = {
  name: '张三',
  age: 20,
  address: '北京市',
}
list.b = {
  name: '李四',
  age: 30,
  address: '上海市',
}

console.log(list.a, list.b)
</script>

<style scoped></style>
