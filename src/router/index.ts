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
      redirect: "/home/plaque-list",
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
          component: () => import('@/components/TokenList.vue'),
          children: [
            {
              path: "new",
              name: "new-token",
              components: {
                default: () => import('@/components/SubmitTokenDialog.vue')
              }
            },
            {
              path: ":token_meta_id",
              name: "edit-token",
              components: {
                default: () => import('@/components/SubmitTokenDialog.vue')
              }
            },
          ]
        },
        {
          path: "artwork-tile-grid",
          name: "artwork-tile-grid",
          component: () => import('@/components/ArtworkTileGrid.vue'),
          children: [
            {
              path: "new",
              name: "new-artwork",
              components: {
                default: () => import('@/components/SubmitTokenDialog.vue')
              }
            },
            {
              path: ":token_meta_id",
              name: "edit-artwork",
              components: {
                default: () => import('@/components/SubmitTokenDialog.vue')
              }
            },
          ]
        },
        {
          path: "gallery-list",
          name: "gallery-list",
          component: () => import('@/components/GalleryList.vue'),
          children: [
            {
              path: "new",
              name: "new-gallery",
              components: {
                default: () => import('@/components/GalleryDetailDialog.vue')
              }
            },
            {
              path: ":gallery_id",
              name: "edit-gallery",
              components: {
                default: () => import('@/components/GalleryDetailDialog.vue')
              }
            }]
        },
        {
          path: "account-settings",
          name: "account-settings",
          component: () => import('@/components/AccountSettings.vue'),
        },
        {
          path: "qr-scan",
          name: "qr-scan",
          component: () => import('@/components/QrScan.vue')
        },
      ]
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('@/views/SignUpView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('@/views/ForgotPasswordView.vue'),
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
    {
      path: '/preview-plaque/:token_meta_id',
      name: 'preview-plaque',
      component: () => import('@/views/PlaquePreview.vue')
    },
    {
      path: "/bid/:token_meta_id",
      name: "bid",
      component: () => import('@/views/BiddingView.vue')
    },
    {
      path: "/qr-landing/:token_meta_id",
      name: "qr-landing",
      component: () => import('@/views/QrLandingView.vue'),
      children: [
        {
          path: "",
          name: "actions",
          component: () => import('@/components/QrLandingActions.vue'),
        },
        {
          path: "bid",
          name: "bid",
          component: () => import('@/components/QrLandingBiddingForm.vue')
        },
        {
          path: "sales-inquiry",
          name: "sales-inquiry",
          component: () => import('@/components/QrLandingSalesInquiry.vue')
        },
        {
          path: "iframe",
          name: "iframe",
          component: () => import('@/components/IframeView.vue')
        },
      ]
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: () => import('@/views/CatalogView.vue'),
      children: [
        {
          path: '', 
          name: 'catalog-gallery-list',
          component: () => import('@/components/catalog/CatalogGalleryList.vue')
        },
        {
          path: ':gallery_id', 
          name: 'catalog-gallery-detail',
          component: () => import('@/components/catalog/CatalogGalleryDetail.vue'),
          props: true
        }
      ]
    },
    /*  {
       path: '/login',
       name: 'login',
       component: () => import('@/views/MetamaskLogin.vue')
     }, */
  ]
})

export default router
