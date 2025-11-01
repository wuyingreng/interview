<template>
  <div class="child1">
    <h3>子组件1</h3>
    <h4>玩具：{{ toy }}</h4>
    <h4>书籍：{{ book }} 本</h4>
  <button @click="minusHouse">干掉父亲的一套房产</button>
  </div>
</template>

<script setup lang="ts" name="Child1">
  import { ref, getCurrentInstance } from 'vue'
  // 数据
  let toy = ref('奥特曼')
  let book = ref(3)

  // 方法
  function minusHouse() {
    const inst: any = getCurrentInstance()
    // 在 setup 中通过 proxy.$parent 获取父组件实例（兼容 Options API 父实例）
    const parent = inst && inst.proxy && inst.proxy.$parent
    if (parent) {
      // 若父组件通过 defineExpose 暴露了 house，直接修改，否则保护性判断
      if (typeof parent.house !== 'undefined') {
        parent.house -= 1
      } else if (parent.$ && typeof parent.$.setupState !== 'undefined' && typeof parent.$.setupState.house !== 'undefined') {
        parent.$.setupState.house -= 1
      } else {
        console.warn('父组件实例中未找到 house 字段')
      }
    } else {
      console.warn('无法获取父组件实例')
    }
  }

  // 把数据交给外部
  defineExpose({ toy, book })
</script>

<style scoped>
  .child1 {
    margin-top: 20px;
    background-color: skyblue;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px black;
  }
</style>
