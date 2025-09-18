<script setup lang="ts">
  import {
    reactive,
    ref,
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    onUpdated,
    onBeforeUnmount,
    onUnmounted,
  } from 'vue'
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
  console.log('生命周期--父组件创建')

  let sum = ref(0)
  let changeSum = () => {
    sum.value += 1
  }
  onBeforeMount(() => {
    console.log('生命周期--父组件挂载前')
  })
  onMounted(() => {
    console.log('生命周期--父组件挂载')
  })
  onBeforeUpdate(() => {
    console.log('生命周期--父组件更新前')
  })
  onUpdated(() => {
    console.log('生命周期--父组件更新后')
  })
  onBeforeUnmount(() => {
    console.log('生命周期--父组件卸载前')
  })
  onUnmounted(() => {
    console.log('生命周期--父组件卸载后')
  })
  let show = ref(true)
</script>

<template>
  <Child a="哈哈" :personList="personList" v-if="show" />
  <div>{{ sum }}</div>
  <el-button type="success" @click="changeSum">Success</el-button>
</template>

<style scoped></style>
