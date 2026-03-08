<template>
  <div class="talk">
    <ul>
      <li v-for="talk in loveTalkStore.talkList" :key="talk.id">{{ talk.title }}</li>
    </ul>
    <button @click="loveTalkStore.getLoveTalk">获取一句土味情话</button>
  </div>
</template>

<script setup lang="ts" name="LoveTalk">
  import { useLoveTalkStore } from '@/store/loveTalk'
  const loveTalkStore = useLoveTalkStore()
  loveTalkStore.$subscribe((mutation, state) => {
    localStorage.setItem('talkList', JSON.stringify(state.talkList))
  })
</script>

<style scoped>
  .talk {
    background-color: orange;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 0 10px;
  }
</style>
