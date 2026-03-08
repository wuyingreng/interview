<template>
  <el-container>
    <el-aside width="200px">
      <router-link active-class="active" class="list-group-item" to="/communication/props">
        1. props
      </router-link>
      <router-link active-class="active" class="list-group-item" to="/communication/event">
        2. 自定义事件
      </router-link>
      <router-link active-class="active" class="list-group-item" to="/communication/mitt">
        3. mitt
      </router-link>
      <router-link active-class="active" class="list-group-item" to="/communication/model">
        4. v-model
      </router-link>
      <router-link active-class="active" class="list-group-item" to="/communication/attrs">
        5. $attrs
      </router-link>
      <router-link active-class="active" class="list-group-item" to="/communication/ref-parent">
        6.
        <span class="small">$refs、$parent</span>
      </router-link>
      <router-link active-class="active" class="list-group-item" to="/communication/provide-inject">
        7. provide、inject
      </router-link>
      <router-link active-class="active" class="list-group-item" to="/communication/pinia">
        8. pinia
      </router-link>
      <router-link active-class="active" class="list-group-item" to="/communication/slot">
        9. slot
      </router-link>
    </el-aside>
    <el-main>
      <RouterView />
    </el-main>
  </el-container>
</template>

<script setup lang="ts" name="Communication"></script>
<style scoped>
  .list-group-item {
    width: 100%;
    display: inline-block;
  }
  .active {
    color: var(--color-text);
  }
</style>
