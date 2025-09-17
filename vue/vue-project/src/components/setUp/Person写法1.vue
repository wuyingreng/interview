<script lang="ts">
  export default {
    // 在beforeCreate
    setup(props, ctx) { 
      let name='张三';
     let changeName=()=>{
      name='李四'
     };
    //  return  {changeName,name} // 这样目前是无法做到响应的

     // 也可以直接返回一个函数，直接展示渲染的内容
     return ()=>"哈哈"
    },
  }
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