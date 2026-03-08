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
   */
  const route = useRoute()
  const { params } = toRefs(route)

  console.log('params==>', params.value)
</script>

<template>
  <div class="detail-params">
    <h2>新闻详情 (Params 方式)</h2>
    <div v-if="params.id">
      <p>
        <strong>ID:</strong>
        {{ params.id }}
      </p>
      <p>
        <strong>标题:</strong>
        {{ params.title }}
      </p>
      <p>
        <strong>内容:</strong>
        {{ params.content }}
      </p>
    </div>
    <div v-else>
      <p>没有参数</p>
    </div>
  </div>
</template>

<style scoped>
  .detail-params {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin: 20px;
  }
</style>
