import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Props from '@/components/ComCommunication/01_props/Father.vue'
import Event from '@/components/ComCommunication/02_custom-event/Father.vue'
import Bus from '@/components/ComCommunication/03_mitt/Father.vue'
import Model from '@/components/ComCommunication/04_v-model/Father.vue'
import AttrsListeners from '@/components/ComCommunication/05_$attrs/Father.vue'
import RefChildrenParent from '@/components/ComCommunication/06_$refs-$parent/Father.vue'
import ProvideInject from '@/components/ComCommunication/07_provide-inject/Father.vue'
import Pinia from '@/components/ComCommunication/08_pinia/Father.vue'
import Slot from '@/components/ComCommunication/09_slot_作用域插槽/Father.vue'
import OtherAPI from '@/views/OtherAPI.vue'
import Shadow from '@/components/OtherAPI/045_shallowRef与shallowReactive'
import CustomRef from '@/components/OtherAPI/048_customRef'
import Teleport from '@/components/OtherAPI/049_Teleport'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
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
       {
      path: '/pinia',
      name: 'pinia',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Pinia.vue'),
    },
    {
      path: '/pagination-demo',
      name: 'pagination-demo',
      component: () => import('../views/PaginationDemo.vue'),
    },
    {
      path:'/',
      redirect:'/home'
    },
    {
      path:'/communication',
      component:()=>import('../views/Communication.vue'),
      children: [
		{
			path: 'props',
			component: Props
		},
		{
			path: 'event',
			component: Event
		},
		{
			path: 'mitt',
			component: Bus
		},
		{
			path: 'model',
			component: Model
		},
		{
			path: 'attrs',
			component: AttrsListeners
		},
		{
			path: 'ref-parent',
			component: RefChildrenParent
		},
		{
			path: 'provide-inject',
			component: ProvideInject
		},
		{
			path: 'pinia',
			component: Pinia
		},
		{
			path: 'slot',
			component: Slot
		},	{
			path: 'slot',
			component: Slot
		},
    	
	]
    },
    {
			path: '/other-api',
			component: OtherAPI,
      children:[
        {
          path:'shadow',
          component: Shadow,
        },
        {
          path:'custom-ref',
          component: CustomRef,
        },
        {
          path:'teleport',
          component: Teleport,
        }
      ]
		},
  ],
})

export default router

