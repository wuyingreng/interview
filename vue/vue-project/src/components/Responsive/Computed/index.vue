<script lang="ts" setup name="Computed">
  import { firstName, lastName, fullName } from './script'
</script>

<template>
  <div class="person">
    <h2>Computed 示例</h2>
    <div class="input-group">
      <el-input 
        v-model="firstName" 
        placeholder="Please input firstname" 
        class="input-field"
      />
      <el-input 
        v-model="lastName" 
        placeholder="Please input lastname" 
        class="input-field"
      />
    </div>
    <div class="result">
      <el-text type="info">全名: {{ fullName }}</el-text>
    </div>
  </div>
</template>

<style scoped>
  /* 导入拆分后的样式 */
  @import './style.css';
</style>
