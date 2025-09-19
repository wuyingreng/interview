<script setup lang="ts" name="Detail">
  import { toRefs } from 'vue'
  import { useRoute } from 'vue-router'
  /**
   * query
   *query: LocationQuery
   *https://router.vuejs.org/zh/api/interfaces/RouteLocationNormalizedLoaded.html
   *代表当前地址的 search 属性的对象
   *继承自
   *_RouteLocationBase.query
   */
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
  const { query } = toRefs(useRoute())
</script>

<template>
  <div>{{ query.title }}</div>
  <div>{{ query.id }}</div>
  <div>{{ query.name }}</div>
</template>
