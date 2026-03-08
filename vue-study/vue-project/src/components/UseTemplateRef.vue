<script lang="ts" setup name="Car">
  import { useTemplateRef } from 'vue'
  const pRef = useTemplateRef('p')
  const showLog = () => {
    console.log(pRef.value)
  }
</script>
<template>
  <h2 class="test" ref="p"></h2>
  <el-button type="primary" @click="showLog">点击显示h2的内容</el-button>
</template>
<!-- 不加局部样式，会影响其他地方用到class的test的元素。 -->
<style scoped>
  .test {
    background-color: skyblue;
  }
</style>
