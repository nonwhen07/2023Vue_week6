<template>
    <h2>這是後台</h2>
    <nav>
        <RouterLink to="/">回到前台</RouterLink> |
        <RouterLink to="/admin/products">產品列表</RouterLink> |
        <RouterLink to="/admin/order">訂單列表</RouterLink> 
    </nav>
    <RouterView></RouterView>
</template>

<script>
import axios from 'axios';
const { VITE_URL } = import.meta.env;

export default {
    data(){
        return {
        // apiUrl,
        // apiPath,
        isNew: false,
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
            .then(() => {
                //this.getProducts();
            })
            .catch(() => {
                alert('帳號密碼有誤，將轉回登入頁面');
                //window.location.assign("login.html");
                this.$router.push('/login');
            })
            
        },
    },
    created(){
        const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)shopToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
        );
        axios.defaults.headers.common["Authorization"] = token;
        //this.$http.defaults.headers.common["Authorization"] = token;
        this.checkSignIn();
    },
}
</script>
