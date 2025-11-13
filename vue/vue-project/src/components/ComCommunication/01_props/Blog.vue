<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button @click="largeText">Enlarge text</button>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps(['title'])
  const emit = defineEmits(['enlarge-text'])
  const largeText = () => {
    console.log('emit==>', emit)
    emit('enlarge-text')
  }
  console.log('props==>', props)
</script>
