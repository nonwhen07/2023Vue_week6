<template>
    <h2>這是後台</h2>
    <nav>
        <RouterLink to="/">回到前台</RouterLink> |
        <RouterLink to="/admin/products">產品列表</RouterLink> |
        <RouterLink to="/admin/orders">訂單列表</RouterLink> |
        <RouterLink to="/admin/coupon">優惠卷列表</RouterLink> |
        <RouterLink to="" @click="logout">登出</RouterLink> 
    </nav>

    <div class="container-fluid mt-3 position-relative">
        <ToastMessages></ToastMessages>
        <RouterView v-if="isSignIn"></RouterView>
    </div>
    
</template>

<script>
import axios from 'axios';
import emitter from '@/methods/emitter.js';
import ToastMessages from '@/components/ToastMessages.vue';

const { VITE_URL } = import.meta.env;

export default {
    data() {
        return {
            isSignIn: false, //確認登入顯示後台
            tempProduct: {}, //點選產品
            selectID: '', //點選產品ID
            products : [], //產品菜單
            pages: {}, //產品菜單-頁碼
        }
    },
    methods: {
        checkSignIn() {
            const api = `${VITE_URL}/api/user/check`;
            axios.post(api)
            .then((res) => {
                if (res.data.success) {
                    emitter.emit('push-message', {
                        style: 'success',
                        title: '登入成功',
                    });
                }
                this.isSignIn = true;
            })
            .catch(() => {
                // emitter.emit('push-message', {
                //     style: 'danger',
                //     title: '登入資料有誤，請確認帳號密碼，將轉回登入頁面',
                // });
                this.$router.push('/login');
                this.isSignIn = false;

                //document.cookie = `shopToken=; expires=${new Date()}`;
                // const emptytoken=''; //清空shopToken內的植
                // document.cookie = `shopToken=${emptytoken}; expires=${new Date()}`;
            })
            
        },
        logout() {
            const api = `${VITE_URL}/logout`;
            axios.post(api)
            .then(() => {
                emitter.emit('push-message', {
                    style: 'success',
                    title: '登出成功',
                });
                //document.cookie = `shopToken=; expires=${new Date()}`;
                const emptytoken=''; //清空shopToken內的植
                document.cookie = `shopToken=${emptytoken}; expires=${new Date()}`;
            })
            this.isSignIn = false;
            this.$router.push('/login');
        },
    },
    components: {
        ToastMessages,
    },
    provide() {
        return {
            emitter,
        }
    },
    created() {
        const token = document.cookie.replace( /(?:(?:^|.*;\s*)shopToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common["Authorization"] = token;
        //this.$http.defaults.headers.common["Authorization"] = token;
        this.checkSignIn();
    },
}
</script>
