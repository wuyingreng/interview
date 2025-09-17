<script lang="ts">
  export default {
    name:"Person",
    // 在beforeCreate 之前
  
  }
</script>
<script lang="ts" setup >
    let name='张三';
     let changeName=()=>{
      name='李四'
     };

</script>
<template>
  <div class="person">
      <h2>{{ name }}</h2>
      <button @click="changeName">修改名字</button>
  </div>
</template>
<style scoped>
  .person{
    color:red;
  }
</style>