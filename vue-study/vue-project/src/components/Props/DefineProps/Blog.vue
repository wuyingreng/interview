<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button @click="emit('enlarge-text')">Enlarge text</button>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps(['title'])
  const emit = defineEmits(['enlarge-text'])
  console.log('props==>', props)
</script>
