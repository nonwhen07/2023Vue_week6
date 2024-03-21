<template>
    <h2>這是前台</h2>
    <nav>
        <RouterLink to="/">Home</RouterLink> |
        <RouterLink to="/about">關於我們</RouterLink> |
        <RouterLink to="/products">商品列表</RouterLink> |
        <!-- <RouterLink to="/cart">購物車列表</RouterLink> | -->
        <RouterLink to="/login">登入頁面</RouterLink> |
        <RouterLink to="/admin/products">後台 產品列表</RouterLink> |
        <RouterLink to="/admin/orders">後台 訂單列表</RouterLink> |
        <RouterLink to="/admin/coupon">後台 優惠卷列表</RouterLink>
    </nav>

    <div class="container-fluid mt-3 position-relative">
        <ToastMessages></ToastMessages>
        <RouterView></RouterView>
    </div>
</template>

<script>
import emitter from '@/methods/emitter.js';
import ToastMessages from '@/components/ToastMessages.vue';

export default {
    provide() {
        return {
            emitter,
        }
    },
    components: {
        ToastMessages,
    },
}

</script>