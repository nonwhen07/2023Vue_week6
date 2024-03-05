<template>
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
const { VITE_URL } = import.meta.env;

export default {
  data() {
    return {
      user: {
          username: '',
          password: ''
      }
    }
  },
  methods: {
    signIn () {
      const api = `${VITE_URL}/admin/signin`;
      axios.post(api, this.user)
        .then((res) => {
          const { token, expired } = res.data
          document.cookie = `shopToken=${token}; expires=${new Date(expired)}`;
          this.$router.push("/admin/products");
        })
        .catch(() => {
          alert('登入資料有誤，請確認帳號密碼');
          //this.$router.push('/login');
      })
    }
  }
};
</script>