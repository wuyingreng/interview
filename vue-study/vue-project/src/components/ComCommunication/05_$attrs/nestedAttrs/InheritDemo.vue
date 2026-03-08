<template>
  <div class="demo">
    <h3>深层组件继承：当 attribute 符合底层 props 声明时作为 props 传入</h3>

    <!-- 场景1：向 FancyButton 传入与 BaseButton props 同名的 attribute，会被当作 props 传给 BaseButton -->
    <MyButton size="lg" type="danger" :disabled="isDisabled" @click="onClick">
      Danger Large
    </MyButton>

    <!-- 场景2：传入与 BaseButton 无关的普通 attribute，会作为普通 attribute 继续透传（这里没有接收方则无效）-->
    <MyButton data-test="just-attr" :disabled="false">Default With data-test</MyButton>
  </div>
</template>

<script setup lang="ts" name="InheritDemo">
  import { ref } from 'vue'
  import MyButton from './MyButton.vue'

  const isDisabled = ref(false)
  function onClick() {
    alert('BaseButton 接收到 click 事件')
  }
</script>

<style scoped>
  .demo {
    display: flex;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
  }
</style>
