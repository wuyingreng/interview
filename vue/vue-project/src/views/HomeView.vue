<template>
  <main>
    <div>dom 相关</div>
    <UseTemplateRef />
    <div>props相关</div>
    <Parent v-if="show" />

    <div>使用 JavaScript 表达式</div>
    <div>{{ dogObject?.name }}</div>
    <div v-bind="objAttrs">test obj attrs</div>
    <div>指令 Directives</div>
    <button :disabled="disabled">Button</button>
    <button disabled="">测试disabled为 空字符串</button>

    <a :[attrname]="href" target="_blank" @[enventName].prevent="log">跳转去百度</a>
    <!-- <a :['foo' + bar]="value"> ... </a> -->
  </main>
</template>
<script setup>
  import { ref } from 'vue'
  import UseTemplateRef from '../components/UseTemplateRef.vue'
  import Parent from '../components/Props/DefineProps/Parent.vue'
  let show = ref(true)
  let disabled = ref()
  const dogObject = {
    name: 'Emily',
    age: 3,
  }
  const objAttrs = {
    id: 'test',
    class: 'wrapper',
    style: 'background-color:red',
  }
  const attrname = 'href'
  const href = 'https://www.baidu.com'
  const enventName = 'click'
  const log = () => {
    console.log('a链接被点击了')
  }
</script>
