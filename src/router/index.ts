import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/landing',
      name: 'landing',
      component: () => import('../views/Landing.vue')
    },
    {
      path: '/submit',
      name: 'submit',
      component: () => import('../views/SubmitView.vue')
    }
  ]
})

export default router
