<script lang="ts" setup name="Watch1">
  import { changeName, changeAge, changePerson, person } from './script'
</script>

<template>
  <div class="person">
    <h2>watch1:监听ref定义的对象数据</h2>

    <div class="result">
      <el-text type="info">姓名: {{ person.name }}</el-text>
      <el-text type="info">年龄: {{ person.age }}</el-text>
      <el-button type="primary" @click="changeName">更改名字</el-button>
      <el-button type="primary" @click="changeAge">更改年龄</el-button>
      <el-button type="primary" @click="changePerson">更改人</el-button>
    </div>
  </div>
</template>

<style scoped>
  /* 导入拆分后的样式 */
  @import './style.css';
</style>
