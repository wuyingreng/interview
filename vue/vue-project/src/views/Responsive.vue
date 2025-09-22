<script lang="ts" setup>
  import PersonVue34 from '../components/Responsive/PersonRef.vue'
  import CarReactive from '../components/Responsive/CarReactive.vue'
  import CarRefObj from '../components/Responsive/CarRefObj.vue'
  import CarToRefs from '../components/Responsive/CarToRefs.vue'
  import Computed from '../components/Responsive/Computed/index.vue'
  import Watch1 from '../components/Responsive/Watch1'
  import Watch2 from '../components/Responsive/Watch2'
  import Watch3 from '../components/Responsive/Watch3'
  import Watch4 from '../components/Responsive/Watch4'
</script>

<template>
  <div class="responsive">
    <div class="basic">
      <PersonVue34 />
      <el-divider />
      <CarReactive />
      <el-divider />
      <CarRefObj />
      <el-divider />
      <CarToRefs />
      <el-divider />
      <Computed />
    </div>
    <div>
      <span>watch相关</span>
      <watch1 />
      <el-divider />
      <watch2 />
      <el-divider />
      <watch3 />
      <el-divider />
      <watch4 />
    </div>
  </div>
</template>
<style scoped>
  @media (min-width: 1024px) {
    .responsive {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
    .basic {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin-right: 20px;
    }
  }
</style>
