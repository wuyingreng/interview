<script setup lang="ts" name="Detail">
  import { defineProps } from 'vue'
  const { title, content, id } = defineProps(['title', 'content', 'id'])
</script>

<template>
  <div>{{ title }}</div>
  <div>{{ id }}</div>
  <div>{{ content }}</div>
</template>
