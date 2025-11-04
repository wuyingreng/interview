<template>
  <p>额外的 ref 解包细节</p>
  <div>{{ object.id }}</div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  const object = { id: ref(1) }
  const count = ref(0)
  const otherCount = ref(2)

  const state = reactive({
    count,
  })
  console.log('state.count before==>', state.count)
  state.count += 1

  console.log('state.count after==>', state, count.value)

  const book = reactive([ref('Vue3 Guide')])
  console.log('book.0.value', book[0])

  const map = reactive(new Map([['count', ref(0)]]))
  console.log('map==>', map.get('count'))
</script>
