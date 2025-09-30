<template>
  <div class="modal-demo">
    <h2>模态框演示</h2>
    <p>点击下面的按钮打开模态框，体验防止点击穿透的效果：</p>

    <button @click="showModal" class="open-btn">打开模态框</button>

    <!-- 模态框组件 -->
    <Modal v-model:visible="modalVisible" @confirm="handleConfirm" @cancel="handleCancel" />
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import Modal from './Modal.vue'

  const modalVisible = ref(false)
  const result = ref('')

  const showModal = () => {
    modalVisible.value = true
  }

  const handleConfirm = () => {
    result.value = '用户点击了确认按钮'
    console.log('用户确认了操作')
  }

  const handleCancel = () => {
    result.value = '用户点击了取消按钮'
    console.log('用户取消了操作')
  }
</script>

<style scoped>
  .modal-demo {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
  }

  h2 {
    color: #333;
    margin-bottom: 20px;
  }

  p {
    color: #666;
    line-height: 1.6;
    margin-bottom: 20px;
  }

  .open-btn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.2s;
  }

  .open-btn:hover {
    background-color: #0056b3;
  }

  .result {
    margin-top: 20px;
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 4px;
    border-left: 4px solid #007bff;
  }

  .result p {
    margin: 0;
    color: #333;
    font-weight: 500;
  }
</style>
