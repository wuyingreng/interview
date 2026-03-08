<template>
  <input type="text" v-model="ming" />
  <br />
  <input type="text" v-model="mima" />
</template>

<script setup lang="ts" name="AtguiguInput">
  // 在子组件中使用 defineModel
  const ming = defineModel('ming')
  const mima = defineModel('mima')
</script>

<style scoped>
  input {
    border: 2px solid black;
    background-image: linear-gradient(45deg, red, yellow, green);
    height: 30px;
    font-size: 20px;
    color: white;
  }
</style>
