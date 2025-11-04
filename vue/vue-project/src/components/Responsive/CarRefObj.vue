<template>
  <div class="person">
    <h1>用ref封装对象类型</h1>
    <h2>游戏列表</h2>
    <ul>
      <li v-for="{ name } of gameList" :key="name">{{ name }}</li>
    </ul>
    <div>{{ carObj.price }}</div>
    <button @click="changeBrand">修改价格</button>
    <p>测试ref的解构</p>
    <div>brandNew: {{ brandNew }}</div>
    <div>priceNew: {{ priceNew }}</div>
    <p v-for="n in 10">{{ n }}</p>
    <p>v-for 用于对象中</p>
    <p v-for="(value, key, index) in carObj">{{ value }}</p>

    <div v-for="(item, index) in list" :key="index">
      <input v-model="item.value" />
      {{ item.name }}
    </div>
    <button @click="deleteMiddle">删除中间项</button>
  </div>
</template>

<script lang="ts" setup name="Car">
  import { ref, toRefs } from 'vue'

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

  const list = ref([
    { id: 1, name: 'A', value: '' },
    { id: 2, name: 'B', value: '用户输入的内容' }, // 用户在这里输入了内容
    { id: 3, name: 'C', value: '' },
  ])

  // 使用 toRefs 保持响应式连接
  const { price: priceNew, brand: brandNew } = toRefs(carObj.value)

  const changeBrand = () => {
    carObj.value = {
      price: 120,
      brand: '保时捷',
    }
  }

  const deleteMiddle = () => {
    list.value.splice(1, 1) // 删除B
    // 删除后：
    // index=0: A (不变)
    // index=1: C (原本的C移动到B的位置)
  }
</script>
