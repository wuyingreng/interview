<template>
  <div class="person">
    <h1>用reactive封装对象类型</h1>
    <h2>游戏列表</h2>
    <ul>
      <li v-for="game in gameList" :key="game.id">{{ game.name }}</li>
    </ul>
    <div>{{ carObj.price }}</div>
    <div @click="changePrice">修改价格</div>
    <br />
    <p>Reactive Proxy vs. Original</p>

    <p>Reactive 不能替换整个对象</p>
    <div>state.count{{ state.count }}</div>
    <button @click="state.count++">state.count+1</button>
    <div>state2.count{{ state2.count }}</div>
    <button @click="state2.count++">state2.count+1</button>
  </div>
</template>
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
  const raw: { [key: string]: any } = {}
  const proxy = reactive(raw)

  const proxy2: { [key: string]: any } = reactive({})
  proxy2.nest = raw
  console.log('raw===proxy', raw === proxy, reactive(raw) === proxy)
  console.log('proxy2.nest==>', proxy2.nest, proxy2.nest === raw)

  let state = reactive({ count: 0 })

  // 上面的 ({ count: 0 }) 引用将不再被追踪
  // (响应性连接已丢失！)
  state = reactive({ count: 1 })
  let state2 = reactive({ count: 0 })
  state2 = { count: 1 }
</script>
<style scoped>
  .person {
  }
</style>
