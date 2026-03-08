<template>
  <div>Checked names: {{ checkedNames }}</div>

  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
  <label for="jack">Jack</label>

  <input type="checkbox" id="john" value="John" v-model="checkedNames" />
  <label for="john">John</label>

  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
  <label for="mike">Mike</label>

  <div>Picked: {{ picked }}</div>

  <input type="radio" id="one" value="One" v-model="picked" />

  <input type="radio" id="one" value="One" v-model="picked" />
  <label for="one">One</label>

  <input type="radio" id="two" value="Two" v-model="picked" />
  <label for="two">Two</label>
  <p>选择器{{ selectedOptions }}</p>
  <select v-model="selectedOptions" multiple>
    <option v-for="option in options" :value="option.value">{{ option.text }}</option>
  </select>
  <p>单一的复选框{{ toggle }}</p>
  <input type="checkbox" v-model="toggle" true-value="yes1" false-value="no2" />
</template>

<script lang="ts" setup>
  import { fa } from 'element-plus/es/locales.mjs'
  import { reactive, ref } from 'vue'
  const checkedNames = ref([])
  const picked = ref('One')
  const selectedOptions = ref(['A'])
  const options = ref([
    { text: 'One', value: 'A' },
    { text: 'Two', value: 'B' },
    { text: 'Three', value: { number: 123 } },
  ])
  const toggle = ref()
</script>
