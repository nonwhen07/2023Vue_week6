import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/front/FrontView.vue'),
      children: [
        {
          path: '',
          name: 'home',
          // component: HomeView
          component: () => import('../views/front/HomeView.vue')
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/front/AboutView.vue')
        },
        {
          path: 'products',
          component: () => import('../views/front/ProductsView.vue')
        },
        {
          path: 'cart',
          component: () => import('../views/front/CartView.vue')
        },
        
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/front/LoginView.vue')
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
    //404
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/front/NotFound.vue')
    },
    // //重新導向 
    // {
    //   path: '/:pathMatch(.*)*',
    //   redirect: {
    //     name: 'home',
    //   }
    // }
  ]
})

export default router
