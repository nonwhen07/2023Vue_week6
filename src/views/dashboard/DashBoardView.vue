<template>
    <h2>這是後台</h2>
    <nav>
        <RouterLink to="/">回到前台</RouterLink> |
        <RouterLink to="/admin/products">產品列表</RouterLink> |
        <RouterLink to="/admin/order">訂單列表</RouterLink> 
    </nav>
    <RouterView></RouterView>
</template>