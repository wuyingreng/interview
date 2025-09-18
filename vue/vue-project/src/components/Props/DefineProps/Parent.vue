<script setup lang="ts">
  import { reactive } from 'vue'
  import Child from './Child.vue'
  import type { PersonType } from '@/types'
  let personList = reactive<PersonType[]>([
    {
      name: '张三',
      age: 14,
    },
    {
      name: '李四',
      age: 20,
    },
  ])
</script>

<template>
  <Child a="哈哈" />
</template>

<style scoped></style>
