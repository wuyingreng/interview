<script setup lang="ts" name="Detail">
  import { toRefs } from 'vue'
  import { useRoute } from 'vue-router'

  /**
   * toRefs的解释
   * Converts a reactive object to a plain object :转换一个reactive对象为普通对象
   * where each property of the resulting object :结果对象中的每一个属性是
   * is a ref pointing to the corresponding property of the original object.
   * 一个ref ，这个ref指向原始对象的对应的属性
   * Each individual ref is created using toRef.
   *
   *
   */
  const { params } = toRefs(useRoute())
</script>

<template>
  <div>{{ params.title }}</div>
  <div>{{ params.id }}</div>
  <div>{{ params.content }}</div>
</template>
