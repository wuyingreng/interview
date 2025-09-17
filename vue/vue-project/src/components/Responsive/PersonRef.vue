<script lang="ts" setup name="Person34">
  import { ref } from 'vue'
  let name = ref('张三')
  let changeName = () => {
    name.value = '李四'
  }
</script>
<template>
  <div class="person">
    <h2>{{ name }}</h2>
    <button @click="changeName">修改名字</button>
  </div>
</template>
<style scoped>
  .person {
    color: red;
  }
</style>
