<script lang="ts" setup name="Watch1">
  import { changeSum, sum } from './script'
</script>

<template>
  <div class="person">
    <h2>watch1:监听ref定义基础数据</h2>

    <div class="result">
      <el-text type="info">当前求和为: {{ sum }}</el-text>
      <el-button type="primary" @click="changeSum">更改sum</el-button>
    </div>
  </div>
</template>

<style scoped>
  /* 导入拆分后的样式 */
  @import './style.css';
</style>
