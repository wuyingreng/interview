<template>
  <div class="fancy-wrap">
    <!-- 这里不声明任何 props，仅通过 $attrs 透传给 BaseButton -->
    <BaseButton v-bind="$attrs">
      <slot />
    </BaseButton>
  </div>
</template>

<script setup lang="ts" name="FancyButton">
  import BaseButton from './BaseButton.vue'
  defineOptions({ inheritAttrs: false })
</script>

<style scoped>
  .fancy-wrap {
    display: inline-block;
    padding: 6px;
    border-radius: 8px;
    background: rgba(64, 158, 255, 0.08);
  }
</style>
