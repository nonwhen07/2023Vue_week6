<template>
    <h2>這是前台</h2>
    <nav>
        <RouterLink to="/">Home</RouterLink> |
        <RouterLink to="/about">關於我們</RouterLink> |
        <RouterLink to="/products">商品列表</RouterLink> |
        <!-- <RouterLink to="/cart">購物車列表</RouterLink> | -->
        <RouterLink to="/admin/products">後台 產品列表</RouterLink> |
        <RouterLink to="/admin/orders">後台 訂單列表</RouterLink> |
        <RouterLink to="/admin/coupon">後台 優惠卷列表</RouterLink>|
        <RouterLink v-if="!isSignIn" to="/login">登入頁面</RouterLink> 
        <RouterLink v-else to="" @click="logout">登出</RouterLink>
    </nav>

    <div class="container-fluid mt-3 position-relative">
        <ToastMessages></ToastMessages>
        <RouterView></RouterView>
    </div>
    <!-- <div id="scrollTop" role="button" class="p-2 rounded-1 fade show" style="margin-right: -184px;">
        <span class="material-icons"> arrow_drop_up </span>
    </div> -->
</template>

<script>
import axios from 'axios';
import emitter from '@/methods/emitter.js';
import ToastMessages from '@/components/ToastMessages.vue';

import '@/assets/_img_hovereffect.css';

const { VITE_URL } = import.meta.env;

export default {
    data() {
        return {
            isSignIn: false,
        }
    },
    methods: {
        check() {
            const token = document.cookie.replace( /(?:(?:^|.*;\s*)shopToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
            this.isSignIn = token.length ? true : false;
        },
        logout() {
            const api = `${VITE_URL}/logout`;
            axios.post(api)
            .then(() => { 
                emitter.emit('push-message', {
                    style: 'success',
                    title: '登出成功',
                });
                //alert('登出成功');
                //this.$router.push('/login');

                //document.cookie = `shopToken=; expires=${new Date()}`;
                const emptytoken=''; //清空shopToken內的植
                document.cookie = `shopToken=${emptytoken}; expires=${new Date()}`;
            })
            this.isSignIn = false;
        },
    },
    provide() {
        return {
            emitter,
        }
    },
    components: {
        ToastMessages,
    },
    created() {
        //this.check();
    },
    mounted() {
        this.check();
    },
}

</script>