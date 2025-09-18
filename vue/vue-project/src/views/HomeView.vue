<script setup lang="ts">
  import { ref } from 'vue'
  import UseTemplateRef from '../components/UseTemplateRef.vue'
  import Parent from '../components/Props/DefineProps/Parent.vue'
  let show = ref(true)
</script>

<template>
  <main>
    <div>dom 相关</div>
    <UseTemplateRef />
    <div>props相关</div>
    <Parent v-if="show" />
  </main>
</template>
