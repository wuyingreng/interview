<script lang="ts">
  import PersonVue3 from './components/setUp/Person写法1.vue'
  import PersonVue32 from './components/setUp/Person写法2.vue'
  import PersonVue33 from './components/setUp/Person写法3.vue'
</script>

<template>
  <div class="about">
    <el-text class="mx-1">This is an about page</el-text>
    <PersonVue3 />
    <PersonVue32 />
    <PersonVue33 />
  </div>
</template>

<style>
  @media (min-width: 1024px) {
    .setup {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
</style>
