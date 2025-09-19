<template>
  <el-container>
    <el-aside width="200px">
      <ul>
        <!-- 不能用new ，new是保留字 -->
        <li v-for="item in news" :key="item.id">
          <el-button type="info" @click="viewDetail(item)">查看详情</el-button>
          <RouterLink
            :to="{
              // 方式一：query形式
              path: '/news/detail',
              query: {
                title: item.title,
                content: item.content,
                id: item.id,
              },
              // 方式二：params参数
              // name: 'news-detail-params',
              // params: {
              //   id: item.id,
              //   title: item.title,
              //   content: item.content,
              // },
            }"
          >
            {{ item.title }}
          </RouterLink>
        </li>
      </ul>
    </el-aside>
    <el-main>
      <RouterView />
    </el-main>
  </el-container>
</template>
<script setup lang="ts" name="News">
  import { useRouter } from 'vue-router'
  import { reactive } from 'vue'

  // 在组件顶层调用 useRouter
  const router = useRouter()

  let news = reactive<{ id: string; title: string; content: string }[]>([
    { id: 'asfdtrfay01', title: '很好的抗癌食物', content: '西蓝花' },
    { id: 'asfdtrfay02', title: '如何一夜暴富', content: '学IT' },
    { id: 'asfdtrfay03', title: '震惊，万万没想到', content: '明天是周一' },
    { id: 'asfdtrfay04', title: '好消息！好消息！', content: '快过年了' },
  ])

  interface ItemProps {
    id: string
    title: string
    content: string
  }

  const viewDetail = (item: ItemProps) => {
    console.log('router==>', router)
    if (router) {
      router.push({
        name: 'news-detail-params',
        params: {
          id: item.id,
          title: item.title,
          content: item.content,
        },
      })
    } else {
      console.error('Router is not available')
    }
  }
</script>
