<script lang="ts">
  export default {
    name: 'Person',
    data() {
      return {
        name: 'Emily',
        age: 18,
        tel: '18038083743',
      }
    },
    methods: {
      changeName: function () {
        this.name = '张三'
      },
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
  .person {
    color: red;
  }
</style>
