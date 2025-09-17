<script lang="ts" setup>
  import PersonVue34 from '../components/Responsive/PersonRef.vue'
  import CarReactive from '../components/Responsive/CarReactive.vue'
  import CarRefObj from '../components/Responsive/CarRefObj.vue'
  import CarToRefs from '../components/Responsive/CarToRefs.vue'
  import Computed from '../components/Responsive/Computed/index.vue'
</script>

<template>
  <div class="responsive">
    <PersonVue34 />
    <CarReactive />
    <CarRefObj />
    <CarToRefs />
    <Computed />
  </div>
</template>
<style scoped>
  @media (min-width: 1024px) {
    .responsive {
      min-height: 100vh;
      display: flex;
      align-items: center;
      flex-direction: column;
    }
  }
</style>
