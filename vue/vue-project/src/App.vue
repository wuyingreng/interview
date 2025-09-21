<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import Person from './components/Person.vue'
</script>

<template>
  <el-container>
    <el-header>
      <Person />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/hooks">自定义Hooks相关</RouterLink>
        <RouterLink to="/setup">SetUp相关</RouterLink>
        <RouterLink to="/responsive">Responsive相关</RouterLink>
        <RouterLink to="/news">路由相关</RouterLink>
        <RouterLink to="/pinia">pinia相关</RouterLink>
        <RouterLink to="/pagination-demo">分页表格示例</RouterLink>
        <RouterLink to="/communication">组件之间相互通信</RouterLink>
      </nav>
    </el-header>
    <el-main><RouterView /></el-main>
  </el-container>
</template>

<style scoped>
  header {
    line-height: 1.5;
    max-height: 100vh;
  }

  .logo {
    display: block;
    margin: 0 auto 2rem;
  }

  nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
  }

  nav a.router-link-exact-active {
    color: var(--color-text);
  }

  nav a.router-link-exact-active:hover {
    background-color: transparent;
  }

  nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
  }

  nav a:first-of-type {
    border: 0;
  }

  @media (min-width: 1024px) {
    header {
      display: flex;
      place-items: center;
      padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
      margin: 0 2rem 0 0;
    }

    header .wrapper {
      display: flex;
      place-items: flex-start;
      flex-wrap: wrap;
    }

    nav {
      text-align: left;
      margin-left: -1rem;
      font-size: 1rem;

      padding: 1rem 0;
      margin-top: 1rem;
    }
  }
</style>
