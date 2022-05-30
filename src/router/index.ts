import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: "/home/plaque-list"
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      children: [
        {
          path: "",
          redirect: "/home/plaque-list"
        },
        {
          path: "plaque-list",
          name: "plaque-list",
          component: () => import('@/components/PlaqueList.vue')
        },
        {
          path: "qr-scan",
          name: "qr-scan",
          component: () => import('@/components/QrScan.vue')
        },
      ]
    },
    {
      path: '/landing',
      name: 'landing',
      component: () => import('@/views/LandingView.vue')
    },
    {
      path: '/submit',
      name: 'submit',
      component: () => import('@/views/SubmitView.vue')
    }
  ]
})

export default router
