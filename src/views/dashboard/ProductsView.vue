<template>
  <Loading :active="isLoading"></Loading>
  <h2>商品列表</h2>
  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="openModal(true)">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">
            品項分類
          </th>
          <th colspan="2">產品名稱</th>
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
          <td style="max-height: 100%; max-width: 100%; position: static;">
            <img 
              :src="product.imageUrl"
              :alt="product.title"
              :title="product.title + ':' + product.description"
              class="img-fluid" style="height:100px;"
            />
          </td>
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
                @click="openModal(false, 'edit', product)">
                編輯
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm"
                @click="openModal(false, 'dele', product)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- pagination -->
  <Pagination :pages="pages" :update-page="getProducts" ></Pagination>
  <!-- Modal -->
  <Prod-Modal :temp-product="tempProduct" :update-product="updateProduct" 
    :add-image="addImage" :del-image="delImage" ref="pModal"></Prod-Modal>
  <Del-Modal :temp-product="tempProduct" :del-product="delProduct" ref="dModal"></Del-Modal>
</template>

<script>
import axios from 'axios';
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

import Pagination from '@/components/PaginationTool.vue';
import ProdModal from '@/components/ProductModal.vue';
import DelModal from '@/components/DeleteModal.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data(){
      return {
      isLoading: false,
      isNew: false,
      tempProduct: {}, //點選產品
      selectID: '', //點選產品ID
      products : [], //產品菜單
      pages: {}, //產品菜單-頁碼
      }
  },
  methods: {
    // checkSignIn() {
    //   const api = `${VITE_URL}/api/user/check`;
    //   axios.post(api)
    //   .then(() => {
    //     // this.getProducts();
    //     // //臨時-後台確認Orders用
    //     // //this.getOrders();
    //   })
    //   .catch(() => {
    //     alert('帳號密碼有誤，將轉回登入頁面');
    //     //window.location.assign("login.html");
    //     this.$router.push('/login');
    //   })
    // },
    getProducts(page = 1) {
        const api = `${VITE_URL}/api/${VITE_PATH}/admin/products?page=${page}`;
        axios.get(api)
        .then((res) => {
            this.products = res.data.products;
            this.pages = res.data.pagination;
        })
    },
    openModal(isNew, action = 'edit', item) {
      if (action =='dele') {
        this.$refs.dModal.openModal();
      } 
      else {
        this.$refs.pModal.openModal();
      }
      if (isNew) {
          this.tempProduct = {}
      } 
      else {
          this.tempProduct = { ...item }
      }
      this.isNew = isNew;
    },
    updateProduct(item) {
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

    // //臨時-後台確認Orders用 之後轉移
    // getOrders() {
    //     const api = `${VITE_URL}/api/${VITE_PATH}/admin/orders`;
    //     axios.get(api)
    //     .then(() => {
    //       //console.log('this.Order =>', res.data);
    //       //console.log('this.Order.Orders =>', res.data.orders);
    //     })
    //     .catch((err) => {
    //         alert(err.data.message);
    //     })
    //     // 刪除訂單(all)
    //     // const api2 = `${VITE_URL}/api/${VITE_PATH}/admin/orders/all`;
    //     // axios.delete(api2)
    //     // .then((res) => {
    //     //     console.log('this.Order =>', res);
    //     //     //console.log('this.Order.Orders =>', res.data.orders);
    //     // })
    //     // .catch((err) => {
    //     //     alert(err.data.message);
    //     // })
    // },
  },
  created(){ 
    // 在dashboard已處理登入問題
    // const token = document.cookie.replace(/(?:(?:^|.*;\s*)shopToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    // axios.defaults.headers.common['Authorization'] = token
    // this.checkSignIn()


    this.isLoading = true
    this.getProducts()
    setTimeout(() => {
      this.isLoading = false //狀態驅動'元件'
    }, 1000)
  },
  mounted() {
  },
  components: {
    Pagination,
    ProdModal,
    DelModal,
    Loading
  }
}
</script>