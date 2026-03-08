<template>
  <Transition name="toast-fade">
    <div v-if="visible" :class="['toast', `toast-${type}`]" @click="handleClose">
      <div class="toast-icon">
        <span v-if="type === 'success'">✓</span>
        <span v-else-if="type === 'error'">✗</span>
        <span v-else-if="type === 'warning'">⚠</span>
        <span v-else>ℹ</span>
      </div>
      <div class="toast-content">
        <div class="toast-message">{{ message }}</div>
        <div v-if="description" class="toast-description">{{ description }}</div>
      </div>
      <button v-if="closable" class="toast-close" @click.stop="handleClose">×</button>
    </div>
  </Transition>
</template>

<script setup lang="ts" name="Toast">
import { ref, onMounted, onUnmounted } from 'vue'

type ToastType = 'success' | 'error' | 'warning' | 'info'

const props = withDefaults(
  defineProps<{
    message: string
    type?: ToastType
    description?: string
    duration?: number // 显示时长（毫秒），0 表示不自动关闭
    closable?: boolean // 是否显示关闭按钮
  }>(),
  {
    type: 'info',
    duration: 3000,
    closable: true
  }
)

const emit = defineEmits<{
  close: []
}>()

const visible = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

// 显示 Toast
const show = () => {
  visible.value = true
  // 如果设置了 duration，自动关闭
  if (props.duration > 0) {
    timer = setTimeout(() => {
      handleClose()
    }, props.duration)
  }
}

// 关闭 Toast
const handleClose = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  visible.value = false
  // 延迟触发 close 事件，等待动画完成
  setTimeout(() => {
    emit('close')
  }, 300)
}

onMounted(() => {
  show()
})

onUnmounted(() => {
  if (timer) {
    clearTimeout(timer)
  }
})

// 暴露方法给父组件
defineExpose({
  show,
  close: handleClose
})
</script>

<style scoped>
.toast {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 300px;
  max-width: 500px;
  padding: 14px 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10000;
  cursor: pointer;
  transition: all 0.3s;
}

.toast:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.toast-success {
  border-left: 4px solid #52c41a;
}

.toast-error {
  border-left: 4px solid #ff4d4f;
}

.toast-warning {
  border-left: 4px solid #faad14;
}

.toast-info {
  border-left: 4px solid #1890ff;
}

.toast-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 16px;
  font-weight: bold;
}

.toast-success .toast-icon {
  background: #f6ffed;
  color: #52c41a;
}

.toast-error .toast-icon {
  background: #fff2f0;
  color: #ff4d4f;
}

.toast-warning .toast-icon {
  background: #fffbe6;
  color: #faad14;
}

.toast-info .toast-icon {
  background: #e6f7ff;
  color: #1890ff;
}

.toast-content {
  flex: 1;
  min-width: 0;
}

.toast-message {
  font-size: 14px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  line-height: 1.5;
}

.toast-description {
  margin-top: 4px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.65);
  line-height: 1.5;
}

.toast-close {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border: none;
  background: transparent;
  color: rgba(0, 0, 0, 0.45);
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

.toast-close:hover {
  color: rgba(0, 0, 0, 0.85);
}

/* 动画效果 */
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.3s ease;
}

.toast-fade-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px);
}

.toast-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .toast {
    left: 10px;
    right: 10px;
    transform: none;
    min-width: auto;
  }

  .toast-fade-enter-from,
  .toast-fade-leave-to {
    transform: translateY(-20px);
  }
}
</style>
