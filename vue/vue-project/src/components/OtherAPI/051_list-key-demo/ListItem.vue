<template>
  <div class="list-item">
    <span>{{ name }}</span>
    <button @click="increment">点击次数: {{ count }}</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 定义props
defineProps<{
  name: string
}>()

// 子组件内部的状态（临时状态）
const count = ref(0)

const increment = () => {
  count.value++
}
</script>

<style scoped>
.list-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  margin-bottom: 10px;
  background: white;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.list-item span {
  min-width: 60px;
  font-weight: bold;
  color: #2c3e50;
}

.list-item button {
  padding: 6px 12px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;
}

.list-item button:hover {
  background: #35a572;
}

.list-item button:active {
  background: #2d8f5e;
}
</style>
