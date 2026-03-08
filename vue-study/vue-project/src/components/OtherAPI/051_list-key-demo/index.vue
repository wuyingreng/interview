<template>
  <div class="demo-container">
    <h2>列表渲染 Key 的作用演示</h2>

    <!-- Demo 1: 临时DOM状态 -->
    <div class="demo-section">
      <h3>Demo 1: 临时DOM状态（表单输入值未绑定）</h3>
      <p>在输入框中输入内容，然后点击"反转列表"按钮，观察输入内容的位置</p>

      <div class="button-group">
        <button @click="reverseList1">反转列表（无key）</button>
        <button @click="reverseList2">反转列表（有key）</button>
      </div>

      <div class="demo-row">
        <div class="demo-column">
          <h4>❌ 无 key（会出问题）</h4>
          <div v-for="item in list1" class="list-item">
            <span>{{ item.name }}</span>
            <!-- 注意：这里没有使用v-model，是临时DOM状态 -->
            <input type="text" :placeholder="`输入${item.name}`" />
          </div>
        </div>

        <div class="demo-column">
          <h4>✅ 有 key（正确）</h4>
          <div v-for="item in list2" :key="item.id" class="list-item">
            <span>{{ item.name }}</span>
            <!-- 注意：这里没有使用v-model，是临时DOM状态 -->
            <input type="text" :placeholder="`输入${item.name}`" />
          </div>
        </div>
      </div>
    </div>

    <!-- Demo 2: 子组件状态 -->
    <div class="demo-section">
      <h3>Demo 2: 子组件状态</h3>
      <p>点击列表项中的按钮增加计数，然后点击"反转列表"按钮，观察计数器的位置</p>

      <div class="button-group">
        <button @click="reverseList3">反转列表（无key）</button>
        <button @click="reverseList4">反转列表（有key）</button>
      </div>

      <div class="demo-row">
        <div class="demo-column">
          <h4>❌ 无 key（会出问题）</h4>
          <ListItem v-for="item in list3" :name="item.name" />
        </div>

        <div class="demo-column">
          <h4>✅ 有 key（正确）</h4>
          <ListItem v-for="item in list4" :key="item.id" :name="item.name" />
        </div>
      </div>
    </div>

    <!-- Demo 3: 对比 - 使用v-model绑定（非临时DOM状态） -->
    <div class="demo-section">
      <h3>Demo 3: 使用 v-model 绑定（非临时DOM状态）</h3>
      <p>使用v-model时，即使没有key，状态也能正确保持，因为状态在Vue的data中管理</p>

      <div class="button-group">
        <button @click="reverseList5">反转列表（无key，但用v-model）</button>
      </div>

      <div class="demo-column">
        <div v-for="item in list5" class="list-item">
          <span>{{ item.name }}</span>
          <!-- 使用v-model，状态在Vue的data中管理 -->
          <input type="text" v-model="item.inputValue" :placeholder="`输入${item.name}`" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import ListItem from './ListItem.vue'

  // Demo 1: 临时DOM状态 - 无key
  const list1 = ref([
    { id: 1, name: '苹果' },
    { id: 2, name: '香蕉' },
    { id: 3, name: '橙子' },
  ])

  // Demo 1: 临时DOM状态 - 有key
  const list2 = ref([
    { id: 1, name: '苹果' },
    { id: 2, name: '香蕉' },
    { id: 3, name: '橙子' },
  ])

  // Demo 2: 子组件状态 - 无key
  const list3 = ref([
    { id: 1, name: '苹果' },
    { id: 2, name: '香蕉' },
    { id: 3, name: '橙子' },
  ])

  // Demo 2: 子组件状态 - 有key
  const list4 = ref([
    { id: 1, name: '苹果' },
    { id: 2, name: '香蕉' },
    { id: 3, name: '橙子' },
  ])

  // Demo 3: 使用v-model绑定
  const list5 = ref([
    { id: 1, name: '苹果', inputValue: '' },
    { id: 2, name: '香蕉', inputValue: '' },
    { id: 3, name: '橙子', inputValue: '' },
  ])

  const reverseList1 = () => {
    list1.value = list1.value.reverse()
  }

  const reverseList2 = () => {
    list2.value = list2.value.reverse()
  }

  const reverseList3 = () => {
    list3.value = list3.value.reverse()
  }

  const reverseList4 = () => {
    list4.value = list4.value.reverse()
  }

  const reverseList5 = () => {
    list5.value = list5.value.reverse()
  }
</script>

<style scoped>
  .demo-container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .explanation {
    background: #f5f5f5;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 30px;
  }

  .explanation h3 {
    margin-top: 0;
    color: #42b983;
  }

  .explanation ul {
    margin: 10px 0;
    padding-left: 20px;
  }

  .demo-section {
    margin-bottom: 40px;
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
  }

  .demo-section h3 {
    margin-top: 0;
    color: #2c3e50;
  }

  .demo-row {
    display: flex;
    gap: 20px;
    margin-top: 20px;
  }

  .demo-column {
    flex: 1;
    padding: 15px;
    background: #fafafa;
    border-radius: 6px;
  }

  .demo-column h4 {
    margin-top: 0;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 2px solid #e0e0e0;
  }

  .list-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    margin-bottom: 10px;
    background: white;
    border-radius: 4px;
    border: 1px solid #ddd;
  }

  .list-item span {
    min-width: 60px;
    font-weight: bold;
    color: #2c3e50;
  }

  .list-item input {
    flex: 1;
    padding: 6px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }

  .button-group {
    margin-bottom: 15px;
  }

  .button-group button {
    margin-right: 10px;
    padding: 8px 16px;
    background: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.3s;
  }

  .button-group button:hover {
    background: #35a572;
  }

  .button-group button:active {
    background: #2d8f5e;
  }
</style>
