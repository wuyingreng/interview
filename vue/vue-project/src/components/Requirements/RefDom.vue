<template>
  <input ref="inputRef" class="input-element" placeholder="这是一个输入框" type="text" />

  <button @click="changeWidth">设置宽度为 300px</button>
  <button @click="changeColor">更改背景颜色</button>
  <button @click="focusInput">聚焦输入框</button>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  // 正确的类型定义
  const inputRef = ref<HTMLInputElement | null>(null)

  const changeWidth = () => {
    if (inputRef.value) {
      inputRef.value.style.width = '300px'
    }
  }

  const changeColor = () => {
    if (inputRef.value) {
      inputRef.value.style.backgroundColor = '#ffe0b2'
    }
  }

  const focusInput = () => {
    if (inputRef.value) {
      inputRef.value.focus()
    }
  }
</script>
