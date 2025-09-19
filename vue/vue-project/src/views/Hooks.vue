<template>
  <div class="hooks">
    <h1>This is an hooks page</h1>
    <HooksDog />
  </div>
</template>
<script lang="ts" setup>
  import HooksDog from '@/components/HooksDog'
</script>
<style>
  @media (min-width: 1024px) {
    .hooks {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
</style>
