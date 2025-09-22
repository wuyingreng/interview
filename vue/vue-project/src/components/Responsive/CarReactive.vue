<script lang="ts" setup name="Car">
  import { reactive, ref } from 'vue'
  let gameList = reactive([
    {
      id: '原神',
      name: '原神',
    },
    {
      id: '米哈游',
      name: '米哈游',
    },
  ])
  let carObj = reactive({
    price: 10,
  })
  const changePrice = () => {
    carObj.price += 10
  }
  const books = reactive([ref('Vue 3 Guide')])
  console.log('carObj==>', carObj, 'books==>', books)
</script>
<template>
  <div class="person">
    <h1>用reactive封装对象类型</h1>
    <h2>游戏列表</h2>
    <ul>
      <li v-for="game in gameList" :key="game.id">{{ game.name }}</li>
    </ul>
    <div>{{ carObj.price }}</div>
    <div @click="changePrice">修改价格</div>
  </div>
</template>
<style scoped>
  .person {
  }
</style>
