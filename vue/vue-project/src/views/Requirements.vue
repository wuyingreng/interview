<template>
  <el-container>
    <el-aside width="200px">
      <ul>
        <li>
          <RouterLink
            :to="{
              path: '/requirements/ref-dom',
            }"
          >
            用ref去获取dom元素
          </RouterLink>
        </li>
        <li>
          <RouterLink
            :to="{
              path: '/requirements/pagination-demo',
            }"
          >
            分页demo
          </RouterLink>
        </li>
        <li>
          <RouterLink
            :to="{
              path: '/requirements/icon',
            }"
          >
            Icon
          </RouterLink>
        </li>
      </ul>
    </el-aside>
    <el-main>
      <RouterView />
    </el-main>
  </el-container>
</template>
<script setup lang="ts" name="Requirements"></script>
