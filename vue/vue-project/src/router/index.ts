import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/setup',
      name: 'setup',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SetUpView.vue'),
    },
    {
      path: '/responsive',
      name: 'responsive',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Responsive.vue'),
    },
    {
      path: '/hooks',
      name: 'hooks',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Hooks.vue'),
    },
    {
      path: '/news',
      name: 'news',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/News.vue'),
      children: [
        {
          path: 'detail',
          name: 'news-detail-query',
          component: () => import('../components/Router/DetailQuery.vue'),
        },
        {
          path: 'detail/:id/:title/:content?',
          name: 'news-detail-params',
          component: () => import('../components/Router/DetailParams.vue'),
          props: true,
        }
      ]
    },
  ],
})

export default router

