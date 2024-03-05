<template>
    <h2>這是前台</h2>
    <nav>
        <RouterLink to="/">Home</RouterLink> |
        <RouterLink to="/about">關於我們</RouterLink> |
        <RouterLink to="/products">產品列表</RouterLink> |
        <RouterLink to="/cart">購物車列表</RouterLink> |
        <RouterLink to="/login">登入頁面</RouterLink> |
        <RouterLink to="/admin/products">後台 產品列表</RouterLink> |
        <RouterLink to="/admin/order">後台 訂單列表</RouterLink> |
    </nav>
    <RouterView></RouterView>
</template>