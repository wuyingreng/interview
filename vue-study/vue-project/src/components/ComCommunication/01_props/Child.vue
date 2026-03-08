<template>
  <div class="child">
    <h3>子组件</h3>
    <h4>玩具：{{ toy }}</h4>
    <h4>父给的车：{{ car }}</h4>
    <button @click="sendToy(toy)">把玩具给父亲</button>
    <Blog />
    测试
  </div>
</template>

<script setup lang="ts" name="Child">
  import { ref, defineProps } from 'vue'
  defineProps(['car', 'sendToy'])
  const toy = ref('奥特曼')
</script>

<style scoped>
  .child {
    background-color: skyblue;
    padding: 10px;
    box-shadow: 0 0 10px black;
    border-radius: 10px;
  }
</style>
