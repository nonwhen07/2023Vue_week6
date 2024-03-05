<template>
    <h2>商品列表</h2>
    <div class="container">
      <div class="text-end mt-4">
        <button class="btn btn-primary"
          data-bs-toggle="modal" data-bs-target="#productModal"
          @click="openModal(true)">
          建立新的產品
        </button>
      </div>
      <table class="table mt-4">
        <thead>
          <tr>
            <th width="120">
              分類
            </th>
            <th>產品名稱</th>
            <th width="120">
              原價
            </th>
            <th width="120">
              售價
            </th>
            <th width="100">
              是否啟用
            </th>
            <th width="120">
              編輯
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for=" product in products" :key="product.id">
            <td>{{product.category}}</td>
            <td>{{product.title}}</td>
            <td class="text-start">{{product.origin_price}}</td>
            <td class="text-start">{{product.price}}</td>
            <td>
              <div v-if="product.is_enabled === 1">
                <p style="color: rgb(36, 212, 95);">啟用</p>
              </div>
              <div v-else>
                <p style="color: red;">未啟用</p>
              </div>
            </td>
            <td>
              <div class="btn-group">
                <button type="button" class="btn btn-outline-primary btn-sm" 
                  data-bs-toggle="modal" data-bs-target="#productModal"
                  @click="openModal(false, product)">
                  編輯
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm" 
                  data-bs-toggle="modal" data-bs-target="#delProductModal" 
                  @click="openModal(false, product)">
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- pagination -->
    <Pagination :pages="pages" :get-products="getProducts" ></Pagination>
    <!-- pagination -->
    <!-- Modal -->
    <Prod-Modal :temp-product="tempProduct" :updata-product="updataProduct" 
      :add-image="addImage" :del-image="delImage" ref="pModal"></Prod-Modal>
    <Del-Modal :temp-product="tempProduct" :del-product="delProduct" ref="dModal"></Del-Modal>
    <!-- Modal -->

</template>

<script>
import axios from 'axios';
import Pagination from '@/components/Pagination.vue';
import ProdModal from '@/components/ProductModal.vue';
import DelModal from '@/components/DeleteModal.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
    data(){
        return {
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
            this.getProducts();
        })
        .catch(() => {
          alert('帳號密碼有誤，將轉回登入頁面');
          //window.location.assign("login.html");
          this.$router.push('/login');
        })
        },
        getProducts(page = 1) {
            const api = `${VITE_URL}/api/${VITE_PATH}/admin/products?page=${page}`;
            axios.get(api)
            .then((res) => {
                this.products = res.data.products;
                this.pages = res.data.pagination;
            })
        },
        openModal(isNew, item) {
            if (isNew) {
                this.tempProduct = {}
            } 
            else {
                this.tempProduct = { ...item }
            }
            this.isNew = isNew
        },
        updataProduct(item) {
            let api = `${VITE_URL}/api/${VITE_PATH}/admin/product`; //預設新增，再來判斷isNew
            let httpMethod = 'post'
            if (!this.isNew) {
                api = `${VITE_URL}/api/${VITE_PATH}/admin/product/${item.id}`
                httpMethod = 'put'
            }
            axios[httpMethod](api, { data: item })
            .then((res) => {
                this.isNew = false;
                this.getProducts();
                this.$refs.pModal.closeModal();
                alert(res.data.message);
            })
            .catch((err) => {
                alert(err.data.message);
            })
        },
        delProduct(itemID) {
            let api = `${VITE_URL}/api/${VITE_PATH}/admin/product/${itemID}`; //預設新增，再來判斷isNew
            let httpMethod = 'delete';
            axios[httpMethod](api)
            .then((res) => {
                this.getProducts();
                this.$refs.dModal.closeModal();
                alert(res.data.message);
            })
            .catch((err) => {
                alert(err.data.message);
            })
        },
        addImage() {
        if (this.tempProduct.imagesUrl === undefined){
            this.tempProduct.imagesUrl = [];
        }
        const addImageUrl = document.getElementById('addImageUrl').value;
        this.tempProduct.imagesUrl.push(addImageUrl);
        },
        delImage(index) {
        this.tempProduct.imagesUrl.splice(index, 1);
        },
    },
    created(){ // dashboard以處理登入問題
        const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)shopToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
        );
        axios.defaults.headers.common["Authorization"] = token;
        this.checkSignIn();
    },
    mounted() {
    },
    components: {
        Pagination,
        ProdModal,
        DelModal
    }

    
    
}
</script>