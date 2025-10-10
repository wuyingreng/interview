<template>
  <button
    class="base-button"
    :class="[`size-${size}`, `type-${type}`]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts" name="BaseButton">
  type ButtonSize = 'sm' | 'md' | 'lg'
  type ButtonType = 'primary' | 'secondary' | 'danger'

  const props = defineProps({
    size: { type: String as () => ButtonSize, default: 'md' },
    type: { type: String as () => ButtonType, default: 'primary' },
    disabled: { type: Boolean, default: false },
  })
  defineEmits<{ (e: 'click'): void }>()
</script>

<style scoped>
  .base-button {
    padding: 8px 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    color: #fff;
  }
  .size-sm {
    font-size: 12px;
  }
  .size-md {
    font-size: 14px;
  }
  .size-lg {
    font-size: 16px;
  }

  .type-primary {
    background: #409eff;
  }
  .type-secondary {
    background: #909399;
  }
  .type-danger {
    background: #f56c6c;
  }

  .base-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
</style>
