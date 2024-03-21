<template>
  <Loading :active="isLoading"></Loading>
  <div class="container-fluid mt-3 position-relative">
    <ToastMessages></ToastMessages>
  </div>
  <h2>登入頁面</h2>
  <div class="container mt-5" id="mainApp">
    <form class="row justify-content-center" @submit.prevent="signIn">
      <div class="col-md-6">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
        <div class="mb-2">
          <label for="inputEmail" class="sr-only">Email address</label>
          <input id="inputEmail" type="email" class="form-control" placeholder="Email address" required autofocus v-model="user.username" />
        </div>
        <div class="mb-2">
          <label for="inputPassword" class="sr-only">Password</label>
          <input id="inputPassword" type="password" class="form-control" placeholder="Password" required v-model="user.password" />
        </div>
        <div class="text-end mt-4">
          <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

import emitter from '@/methods/emitter.js';
import ToastMessages from '@/components/ToastMessages.vue';

const { VITE_URL } = import.meta.env;

export default {
  data() {
    return {
      isLoading: false,
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signIn () {
      this.isLoading = true;

      const api = `${VITE_URL}/admin/signin`;
      axios.post(api, this.user)
        .then((res) => {
          setTimeout(() => {
            this.isLoading = false //狀態驅動'元件'
          }, 500)

          const { token, expired } = res.data
          document.cookie = `shopToken=${token}; expires=${new Date(expired)}`;
          //this.$router.push("/admin/products");
          if (res.data.success) {
            emitter.emit('push-message', {
              style: 'success',
              title: '登入成功',
            });
            this.$router.push("/admin/products");
          } 
        })
        .catch(() => {
          setTimeout(() => {
            this.isLoading = false //狀態驅動'元件'
          }, 500)

          emitter.emit('push-message', {
            style: 'danger',
            title: '登入資料有誤，請確認帳號密碼，將轉回登入頁面',
          });
      })
    }
  },
  provide() {
    return {
      emitter,
    }
  },
  components: {
    Loading,
    ToastMessages,
  }
};
</script>