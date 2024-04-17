<template>
  <!-- <h2>這是前台</h2> -->
  <!-- <div class="container-fluid mt-3 position-relative sticky-top">
    <nav class="navbar fixed-top navbar-expand-sm navbar-dark bg-light">
      <div class="container-fluid">
        <RouterLink class="router-link-active px-3 px-md-4 py-1" style="text-decoration: none; color: #6c757d;" to="/">這是前台</RouterLink>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav category list-unstyled d-flex justify-content-left">
            <li class="nav-item btn btn-outline-secondary p-0 ms-1">
              <RouterLink class="router-link-active px-3 px-md-4 py-1" to="/">Home</RouterLink>
            </li>
            <li class="nav-item btn btn-outline-secondary p-0 ms-1">
              <RouterLink class="router-link-active px-3 px-md-4 py-1" to="/about">關於我們</RouterLink>
            </li>
            
            <li class="nav-item btn btn-outline-secondary p-0 ms-1">
              <RouterLink class="router-link-active px-3 px-md-4 py-1" to="/products/all"
                >產品列表</RouterLink
              >
            </li>
            <li class="nav-item btn btn-outline-secondary p-0 ms-1">
              <RouterLink class="router-link-active px-3 px-md-4 py-1" to="/admin/products"
                >後台 產品列表</RouterLink
              >
            </li>
            <li class="nav-item btn btn-outline-secondary p-0 ms-1">
              <RouterLink class="router-link-active px-3 px-md-4 py-1" to="/admin/orders"
                >後台 訂單列表</RouterLink
              >
            </li>
            <li class="nav-item btn btn-outline-secondary p-0 ms-1">
              <RouterLink class="router-link-active px-3 px-md-4 py-1" to="/admin/coupon"
                >後台 優惠卷列表</RouterLink
              >
            </li>
            <li class="nav-item btn btn-outline-secondary p-0 ms-1">
              <RouterLink v-if="!isSignIn" class="router-link-active px-3 px-md-4 py-1" to="/login"
                >登入頁面</RouterLink
              >
              <RouterLink v-else class="router-link-active px-3 px-md-4 py-1" to="#" @click="logout"
                >登出</RouterLink
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div> -->
  <nav class="navbar fixed-top navbar-expand-sm navbar-dark bg-light py-2">
    <div class="container-fluid">
      <RouterLink class="router-link-active px-3 px-md-4 py-1" style="text-decoration: none; color: #6c757d;" to="/">這是前台</RouterLink>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav category list-unstyled d-flex justify-content-left">
          <li class="nav-item btn btn-outline-secondary p-0 ms-1">
            <RouterLink class="router-link-active px-3 px-md-4 py-1" to="/">Home</RouterLink>
          </li>
          <li class="nav-item btn btn-outline-secondary p-0 ms-1">
            <RouterLink class="router-link-active px-3 px-md-4 py-1" to="/about">關於我們</RouterLink>
          </li>
          
          <li class="nav-item btn btn-outline-secondary p-0 ms-1">
            <RouterLink class="router-link-active px-3 px-md-4 py-1" to="/products/all"
              >產品列表</RouterLink
            >
          </li>
          <li class="nav-item btn btn-outline-secondary p-0 ms-1">
            <RouterLink class="router-link-active px-3 px-md-4 py-1" to="/admin/products"
              >後台 產品列表</RouterLink
            >
          </li>
          <li class="nav-item btn btn-outline-secondary p-0 ms-1">
            <RouterLink class="router-link-active px-3 px-md-4 py-1" to="/admin/orders"
              >後台 訂單列表</RouterLink
            >
          </li>
          <li class="nav-item btn btn-outline-secondary p-0 ms-1">
            <RouterLink class="router-link-active px-3 px-md-4 py-1" to="/admin/coupon"
              >後台 優惠卷列表</RouterLink
            >
          </li>
          <li class="nav-item btn btn-outline-secondary p-0 ms-1">
            <RouterLink v-if="!isSignIn" class="router-link-active px-3 px-md-4 py-1" to="/login"
              >登入頁面</RouterLink
            >
            <RouterLink v-else class="router-link-active px-3 px-md-4 py-1" to="#" @click="logout"
              >登出</RouterLink
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container-fluid mt-3 position-relative">
    <ToastMessages></ToastMessages>
    <RouterView></RouterView>
  </div>
  <!-- <div id="scrollTop" role="button" class="p-2 rounded-1 fade show" style="margin-right: -184px;">
      <span class="material-icons"> arrow_drop_up </span>
  </div> -->

  <footer class="footer py-2 bg-light">
    <div class="container text-center">
      <small class="text-black-50 fw-light mb-0">本網站僅供個人作品使用，不提供商業用途</small>
    </div>
  </footer>

</template>

<script>
import axios from 'axios'
import emitter from '@/methods/emitter.js'
import ToastMessages from '@/components/ToastMessages.vue'

import '@/assets/_img_hovereffect.css'
import '@/assets/css/userview.scss'

const { VITE_URL } = import.meta.env

export default {
  data() {
    return {
      isSignIn: false
    }
  },
  methods: {
    check() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)shopToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.isSignIn = token.length ? true : false
    },
    logout() {
      const api = `${VITE_URL}/logout`
      axios.post(api).then(() => {
        emitter.emit('push-message', {
          style: 'success',
          title: '登出成功'
        })
        //alert('登出成功');
        //this.$router.push('/login');

        //document.cookie = `shopToken=; expires=${new Date()}`;
        const emptytoken = '' //清空shopToken內的植
        document.cookie = `shopToken=${emptytoken}; expires=${new Date()}`
      })
      this.isSignIn = false
    }
  },
  provide() {
    return {
      emitter
    }
  },
  components: {
    ToastMessages
  },
  created() {
    //this.check();
  },
  mounted() {
    this.check()
  }
}
</script>
