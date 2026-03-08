<script lang="ts" setup name="Person34">
  import { ref } from 'vue'
  let name = ref('张三')
  let count = ref(0)
  let changeName = () => {
    name.value = '李四'
  }
</script>
<template>
  <div class="person">
    <h1>ref的基本用法</h1>
    <h2>{{ name }}</h2>
    <button @click="changeName">修改名字</button>

    <p>{{ count }}</p>
    <button @click="count++">修改count</button>
  </div>
</template>
<style scoped>
  .person {
    margin-bottom: 20px;
  }
</style>
