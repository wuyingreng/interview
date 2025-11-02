<template>
  <div class="toast-demo">
    <h3>Toast 组件使用示例</h3>
    <p>Toast 已全局注册，可以在任何组件中直接使用，无需导入</p>

    <div class="button-group">
      <button @click="showSuccess">成功提示</button>
      <button @click="showError">错误提示</button>
      <button @click="showWarning">警告提示</button>
      <button @click="showInfo">信息提示</button>
      <button @click="showCustom">自定义提示</button>
    </div>

    <!-- 使用全局注册的 Toast 组件 -->
    <!-- 由于已在 main.ts 中全局注册，这里可以直接使用，无需导入 -->
    <Toast
      v-if="toastConfig.visible"
      :message="toastConfig.message"
      :type="toastConfig.type"
      :description="toastConfig.description"
      :duration="toastConfig.duration"
      :closable="toastConfig.closable"
      @close="handleToastClose"
    />
  </div>
</template>

<script setup lang="ts" name="ToastDemo">
  import { ref } from 'vue'
  // 注意：由于 Toast 已在 main.ts 中全局注册，这里不需要导入

  type ToastType = 'success' | 'error' | 'warning' | 'info'

  interface ToastConfig {
    visible: boolean
    message: string
    type: ToastType
    description?: string
    duration?: number
    closable?: boolean
  }

  const toastConfig = ref<ToastConfig>({
    visible: false,
    message: '',
    type: 'info',
  })

  // 显示成功提示
  const showSuccess = () => {
    toastConfig.value = {
      visible: true,
      message: '操作成功！',
      type: 'success',
      description: '您的数据已成功保存',
      duration: 3000,
    }
  }

  // 显示错误提示
  const showError = () => {
    toastConfig.value = {
      visible: true,
      message: '操作失败！',
      type: 'error',
      description: '请检查网络连接后重试',
      duration: 4000,
    }
  }

  // 显示警告提示
  const showWarning = () => {
    toastConfig.value = {
      visible: true,
      message: '警告',
      type: 'warning',
      description: '此操作不可撤销，请谨慎操作',
      duration: 5000,
    }
  }

  // 显示信息提示
  const showInfo = () => {
    toastConfig.value = {
      visible: true,
      message: '提示信息',
      type: 'info',
      description: '这是一条普通的信息提示',
      duration: 3000,
    }
  }

  // 显示自定义提示
  const showCustom = () => {
    toastConfig.value = {
      visible: true,
      message: '自定义提示',
      type: 'info',
      description: '这是一个不自动关闭的提示，需要手动关闭',
      duration: 0, // 0 表示不自动关闭
      closable: true,
    }
  }

  // Toast 关闭时的回调
  const handleToastClose = () => {
    toastConfig.value.visible = false
  }
</script>

<style scoped>
  .toast-demo {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #f9f9f9;
  }

  .toast-demo h3 {
    margin-top: 0;
    color: #333;
  }

  .toast-demo p {
    color: #666;
    margin-bottom: 20px;
  }

  .button-group {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .button-group button {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    background: #007bff;
    color: white;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.3s;
  }

  .button-group button:hover {
    background: #0056b3;
  }

  .button-group button:active {
    transform: scale(0.98);
  }
</style>
