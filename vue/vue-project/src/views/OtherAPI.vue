<template>
  <el-container>
    <el-aside width="200px">
      <ul>
        <li>
          <RouterLink
            :to="{
              path: '/other-api/shadow',
            }"
          >
            shadowRef和shadowReactive
          </RouterLink>
        </li>
        <li>
          <RouterLink
            :to="{
              path: '/other-api/custom-ref',
            }"
          >
            custom-ref
          </RouterLink>
        </li>
        <li>
          <RouterLink
            :to="{
              path: '/other-api/teleport',
            }"
          >
            Teleport
          </RouterLink>
        </li>
        <li>
          <RouterLink
            :to="{
              path: '/other-api/v-html-bind-data',
            }"
          >
            v-html
          </RouterLink>
        </li>
        <li>
          <RouterLink
            :to="{
              path: '/other-api/list-key-demo',
            }"
          >
            list-key-demo
          </RouterLink>
        </li>
      </ul>
    </el-aside>
    <el-main>
      <RouterView />
    </el-main>
  </el-container>
</template>
<script setup lang="ts" name="OtherAPI"></script>
