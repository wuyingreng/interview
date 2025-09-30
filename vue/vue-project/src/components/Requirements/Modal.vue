<template>
  <!-- 模态框蒙层 -->
  <div v-if="visible" class="modal-overlay" @click="handleOverlayClick">
    <!-- 对话框容器 -->
     <!-- 当用户点击对话框内容时，使用 @click.stop 阻止事件冒泡到蒙层 -->
    <div class="modal-dialog" @click.stop>
      <div class="modal-header">
        <h3>确认对话框</h3>
      </div>
      <div class="modal-body">
        <p>您确定要执行此操作吗？</p>
      </div>
      <div class="modal-footer">
        <button class="btn-cancel" @click="handleCancel">取消</button>
        <button class="btn-confirm" @click="handleConfirm">确认</button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'

  // 定义props
  const props = defineProps({
    visible: {
      type: Boolean,
      default: false,
    },
  })

  // 定义emits

  const emit = defineEmits[('update:visible', 'confirm', 'cancel')]
  // 处理蒙层点击事件
  const handleOverlayClick = () => {
    // 点击蒙层时不关闭模态框，实现防止点击穿透
    console.log('点击了蒙层，但不关闭模态框')
  }

  // 处理取消按钮点击
  const handleCancel = () => {
    emit('cancel')
    emit('update:visible', false)
  }

  // 处理确认按钮点击
  const handleConfirm = () => {
    emit('confirm')
    emit('update:visible', false)
  }

  // 监听visible变化，控制body滚动
  watch(
    () => props.visible,
    (newVal) => {
      if (newVal) {
        // 显示模态框时禁止body滚动
        document.body.style.overflow = 'hidden'
      } else {
        // 隐藏模态框时恢复body滚动
        document.body.style.overflow = 'auto'
      }
    },
  )
</script>

<style scoped>
  /* 蒙层样式 - 覆盖整个屏幕 */
  /* 核心原理：
使用 position: fixed 让蒙层覆盖整个视口
高 z-index 确保模态框在所有其他元素之上
完全覆盖屏幕，阻止用户点击背景内容 */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    /* 防止滚动穿透 */
    overflow: hidden;
  }

  /* 对话框样式 */
  .modal-dialog {
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    max-width: 400px;
    width: 90%;
    max-height: 80vh;
    overflow: auto;
    /* 防止对话框内容被选中 */
    user-select: none;
  }

  /* 对话框头部 */
  .modal-header {
    padding: 20px 20px 0 20px;
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
  }

  .modal-header h3 {
    margin: 0;
    color: #333;
    font-size: 18px;
    font-weight: 600;
  }

  /* 对话框内容 */
  .modal-body {
    padding: 0 20px 20px 20px;
    color: #666;
    line-height: 1.5;
  }

  /* 对话框底部按钮 */
  .modal-footer {
    padding: 0 20px 20px 20px;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }

  /* 按钮样式 */
  .btn-cancel,
  .btn-confirm {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s;
  }

  .btn-cancel {
    background-color: #f5f5f5;
    color: #666;
    border: 1px solid #ddd;
  }

  .btn-cancel:hover {
    background-color: #e8e8e8;
  }

  .btn-confirm {
    background-color: #007bff;
    color: white;
  }

  .btn-confirm:hover {
    background-color: #0056b3;
  }

  /* 响应式设计 */
  @media (max-width: 480px) {
    .modal-dialog {
      width: 95%;
      margin: 20px;
    }

    .modal-header,
    .modal-body,
    .modal-footer {
      padding-left: 15px;
      padding-right: 15px;
    }
  }
</style>
