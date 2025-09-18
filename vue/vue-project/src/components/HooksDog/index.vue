<template>
  <div>和:{{ sum }} 放大10倍的和:{{ plusSum }}</div>
  <el-button type="danger" @click="addSum">sum+1</el-button>
  <ul>
    <li v-for="dog in dogs">
      <img :src="dog" alt="dog" class="dogImage" />
    </li>
  </ul>
  <br />
  <el-button type="danger" @click="addDog">dog+1</el-button>
</template>

<script setup lang="ts" name="HooksDog">
  import { useDog } from './hooks/useDog'
  import { useSum } from './hooks/useSum'
  let { dogs, addDog } = useDog()
  let { sum, addSum, plusSum } = useSum()
</script>
<style scoped>
  .dogImage {
    width: 100px;
    height: 100px;
    object-fit: contain;
  }
</style>
