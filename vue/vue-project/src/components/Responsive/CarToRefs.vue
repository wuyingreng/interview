<script lang="ts" setup name="Car">
  import { reactive, toRefs } from 'vue'

  let carObj = reactive({
    price: 10,
    brand: '奥迪',
  })
  let { price } = toRefs(carObj)
  const changePrice = () => {
    price.value += 10
  }
</script>
<template>
  <div class="person">
    <h1>对reactive进行解构属性要用toRef才有响应式</h1>
    <div>{{ carObj.price }}</div>
    <div @click="changePrice">修改汽车价格</div>
  </div>
</template>
<style scoped>
  .person {
  }
</style>
