import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/FrontView.vue'),
      children: [
        {
          path: '',
          name: 'home',
          // component: HomeView
          component: () => import('../views/HomeView.vue')
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/AboutView.vue')
        },
        {
          path: 'products',
          component: () => import('../views/ProductsView.vue')
        },
        {
          path: 'cart',
          component: () => import('../views/CartView.vue')
        },
        
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      component: () => import('../views/dashboard/DashBoardView.vue'),
      children: [
        {
          path: 'products',
          component: () => import('../views/dashboard/ProductsView.vue')
        },
        {
          path: 'order',
          component: () => import('../views/dashboard/OrderView.vue')
        }
      ]
    },
    
  ]
})

export default router
