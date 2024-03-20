import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: () => import('../views/user/UserView.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/user/HomeView.vue')
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/user/AboutView.vue')
        },
        {
          path: 'products/',
          component: () => import('../views/user/ProductsView.vue')
        },
        {
          path: 'products/:category',
          component: () => import('../views/user/ProductsView.vue'),
          props: (route) => {
            return {
              category: route.params.category
            }
          }
        },
        {
          path: 'cart',
          component: () => import('../views/user/CartView.vue')
        },
        
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/user/LoginView.vue')
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
          path: 'products/:category',
          component: () => import('../views/dashboard/ProductsView.vue'),
          props: (route) => {
            return {
              category: route.params.category
            }
          }
        },
        {
          path: 'orders',
          component: () => import('../views/dashboard/OrdersView.vue')
        },
        {
          path: 'coupon',
          component: () => import('../views/dashboard/CouponView.vue')
        }
      ]
    },
    //404
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/user/NotFound.vue')
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
