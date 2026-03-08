<script lang="ts" setup name="Watch1">
  import { changeName, changeAge, changeCar1, changeCar2, changeCar, person } from './script'
</script>

<template>
  <div class="person">
    <h2>watch4:监视ref或reactive定义的【对象类型】数据中的某个属性，注意点如下：</h2>

    <div class="result">
      <el-text type="info">姓名: {{ person.name }}</el-text>
      <el-text type="info">年龄: {{ person.age }}</el-text>
      <el-text type="info">汽车: {{ person.car.car1 }}、{{ person.car.car2 }}</el-text>
      <el-button type="primary" @click="changeName">更改名字</el-button>
      <el-button type="primary" @click="changeAge">更改年龄</el-button>
      <el-button type="primary" @click="changeCar1">更改第一台车</el-button>
      <el-button type="primary" @click="changeCar2">更改第二台车</el-button>
      <el-button type="primary" @click="changeCar">更改整个车</el-button>
    </div>
  </div>
</template>

<style scoped>
  /* 导入拆分后的样式 */
  @import './style.css';
</style>
