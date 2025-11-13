<template>
  <div class="father">
    <h3>父组件</h3>
    <h4>汽车：{{ car }}</h4>
    <h4 v-if="toy">子给的玩具：{{ toy }}</h4>
    <!-- send-toy是用-链接的会被自动转为驼峰 -->
    <Child :car="car" :send-toy="getToy" />
  </div>

  <p :style="{ fontSize: fontSizeRef + 'px' }">测试Blog</p>
  <Blog :title="title" @enlarge-text="fontSizeRef += 1" />
</template>

<script setup lang="ts" name="Father">
  import Child from './Child.vue'
  import Blog from './Blog.vue'
  import { ref } from 'vue'
  // 数据
  let car = ref('奔驰')
  let toy = ref('')
  let getToy = (value: string) => {
    toy.value = value
  }

  const title = ref('父组件pass过来的title')
  const fontSizeRef = ref(12)
</script>

<style scoped>
  .father {
    background-color: rgb(165, 164, 164);
    padding: 20px;
    border-radius: 10px;
  }
</style>
