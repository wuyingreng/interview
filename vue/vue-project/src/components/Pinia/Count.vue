<template>
  <div class="count">
    <!-- 这里面涉及到一个解包的问题 -->
    <h2>当前求和为：{{ sum }}</h2>
    <!-- getter是计算属性,不要() -->
    <h2>当前求和的10倍为：{{ plusSum }}</h2>
    <h2>当前学校的大写{{ upperSchool }}</h2>
    <!-- .number是修饰符，n是下面的ref1 用来实现双向数据绑定的  -->
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="add">加</button>
    <button @click="minus">减</button>
  </div>
</template>

<script setup lang="ts" name="Count">
  import { storeToRefs } from 'pinia'
  import { reactive, ref } from 'vue'
  import { useCountStore } from '@/store/count'
  // 数据

  let n = ref(1) // 用户选择的数字

  const countStore = useCountStore()
  // 只会把countStore的state和getter相关的变成响应式
  let { sum, plusSum, upperSchool } = storeToRefs(countStore)
  console.log('storeToRefs(countStore)==>', storeToRefs(countStore))

  let obj = reactive({
    a: 1,
    b: 2,
    c: ref(9),
  })

  let x = ref(9)
  console.log(obj.a)
  console.log(obj.b)
  console.log(obj.c)
  console.log(x.value)

  // 方法
  function add() {
    countStore.increment(n.value)
  }
  function minus() {
    countStore.sum -= n.value
  }
</script>

<style scoped>
  .count {
    background-color: skyblue;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 0 10px;
  }
  select,
  button {
    margin: 0 5px;
    height: 25px;
  }
</style>
