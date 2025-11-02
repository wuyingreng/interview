<template>
  <div class="demo">
    <h3>Vue 中 $ 变量的使用位置</h3>

    <!-- $event 只能在模板中使用 -->
    <input type="text" :value="inputValue" @input="handleInput($event)" placeholder="输入内容" />

    <!-- $attrs 在模板中使用 -->
    <div class="attrs-demo" v-bind="$attrs">透传的属性: {{ JSON.stringify($attrs) }}</div>

    <!-- $slots 在模板中使用 -->
    <div class="slots-demo">
      <div v-for="(_, name) in $slots" :key="name">
        插槽 {{ name }}:
        <slot :name="name" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="EventDemo">
  import { ref, useAttrs, useSlots } from 'vue'

  // 在 script 中获取 attrs 和 slots
  const attrs = useAttrs()
  const slots = useSlots()

  const inputValue = ref('')

  // $event 只能在模板中使用，这里接收的是事件对象
  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement
    inputValue.value = target.value

    // 在 script 中打印 attrs 和 slots
    console.log('Script 中的 attrs:', attrs)
    console.log('Script 中的 slots:', slots)

    // ❌ 错误：$event 在 script 中不存在
    // console.log($event) // 这会报错
  }
</script>

<style scoped>
  .demo {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }

  .attrs-demo {
    margin: 10px 0;
    padding: 10px;
    background: #f0f0f0;
    border-radius: 4px;
  }

  .slots-demo {
    margin: 10px 0;
    padding: 10px;
    background: #e0f0ff;
    border-radius: 4px;
  }

  input {
    width: 200px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
</style>
