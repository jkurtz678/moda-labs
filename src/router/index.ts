import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: "/home"
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
          path: "token-list",
          name: "token-list",
          component: () => import('@/components/TokenList.vue')
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
      component: () => import('@/views/LandingView.vue'),
    },
    {
      path: '/submit',
      name: 'submit',
      component: () => import('@/views/SubmitView.vue')
    },
    /*  {
       path: '/login',
       name: 'login',
       component: () => import('@/views/MetamaskLogin.vue')
     }, */
  ]
})

export default router
