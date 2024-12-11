const routes = [
  {
    path: '/',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/LoginAdmin.vue') },
      
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/index', component: () => import('pages/IndexPage.vue') },
      
    ]
  },
  
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
