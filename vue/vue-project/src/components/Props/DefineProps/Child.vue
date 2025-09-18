<script setup lang="ts">
  import {
    defineProps,
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    onUpdated,
    onBeforeUnmount,
    onUnmounted,
  } from 'vue'
  import type { PersonType } from '@/types'

  // 1.  接收list并且保存起来以方便后续做判断
  // let allProps = defineProps(['a', 'personList'])
  // console.log('allProps==>', allProps.personList)

  // 2. 接收list+类型限制
  // let props = defineProps<{
  //   personList: PersonType[]
  //   a: string
  // }>()

  // 2. 接收list+类型限制+默认值
  let props = withDefaults(
    defineProps<{
      personList?: PersonType[]
      a: string
    }>(),
    {
      personList: () => [{ name: '测试名字', age: 99 }],
    },
  )

  console.log('生命周期--子组件创建')

  onBeforeMount(() => {
    console.log('生命周期--子组件挂载前')
  })
  onMounted(() => {
    console.log('生命周期--子组件挂载')
  })
  onBeforeUpdate(() => {
    console.log('生命周期--子组件更新前')
  })
  onUpdated(() => {
    console.log('生命周期--子组件更新后')
  })
  onBeforeUnmount(() => {
    console.log('生命周期--子组件卸载前')
  })
  onUnmounted(() => {
    console.log('生命周期--子组件卸载后')
  })
</script>

<template>
  <div>
    <div>{{ a }}</div>
    <ul>
      <li v-for="person in personList" :key="person.name">
        <span>{{ person.name }}</span>
        <span>{{ person.age }}</span>
      </li>
    </ul>
  </div>
</template>
