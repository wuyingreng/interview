<script lang="ts" setup name="Car">
  import { ref } from 'vue'
  let gameList = ref([
    {
      id: '原神',
      name: '原神',
    },
    {
      id: '米哈游',
      name: '米哈游',
    },
  ])
  let carObj = ref({
    price: 10,
    brand: '奥迪',
  })
  const changeBrand = () => {
    carObj.value = {
      price: 120,
      brand: '保时捷',
    }
  }
</script>
<template>
  <div class="person">
    <h1>用ref封装对象类型</h1>
    <h2>游戏列表</h2>
    <ul>
      <li v-for="game in gameList" :key="game.id">{{ game.name }}</li>
    </ul>
    <div>{{ carObj.price }}</div>
    <div @click="changeBrand">修改价格</div>
  </div>
</template>
<style scoped>
  .person {
  }
</style>
