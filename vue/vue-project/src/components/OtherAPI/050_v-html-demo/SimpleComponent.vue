<template>
  <div class="simple-component">
    <div class="component-header">
      <span class="component-icon">✓</span>
      <strong>SimpleComponent</strong>
    </div>
    <div class="component-body">
      <p>这是通过 Vue 组件系统正常渲染的组件</p>
      <p>接收到的消息：{{ message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts" name="SimpleComponent">
defineProps<{
  message: string
}>()
</script>

<style scoped>
.simple-component {
  padding: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  margin: 10px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.component-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.component-icon {
  width: 24px;
  height: 24px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.component-body {
  padding-left: 32px;
}

.component-body p {
  margin: 5px 0;
}
</style>