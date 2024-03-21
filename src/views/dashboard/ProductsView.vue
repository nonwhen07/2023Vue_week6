<template>
  <Loading :active="isLoading"></Loading>
  <h2>商品列表</h2>
  <div class="container">
    <div class="text-end mt-4">

      <!-- 產品列表(後台之後要改成動態讀取並v-for生成) -->
      <ul class="list-group list-group-horizontal">
        <li class="list-group-item btn btn-outline-primary p-0">
          <RouterLink class="router-link-active active px-3 px-md-4 py-1" to="/admin/products/">全部</RouterLink>
        </li>
        <li class="list-group-item btn btn-outline-primary p-0">
          <RouterLink class="router-link-active active px-3 px-md-4 py-1" to="/admin/products/旅遊" >旅遊</RouterLink>
        </li>
        <li class="list-group-item btn btn-outline-primary p-0">
          <RouterLink class="router-link-active active px-3 px-md-4 py-1" to="/admin/products/蔬果">蔬果</RouterLink>
        </li>
        <li class="list-group-item btn btn-outline-primary p-0">
          <RouterLink class="router-link-active active px-3 px-md-4 py-1" to="/admin/products/肉品">肉品</RouterLink>
        </li>
      </ul> 
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
  props: ['category'], //動態路由-category 
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
  inject: ['emitter'],
  methods: {
    getProducts(page = 1) {
      this.isLoading = true
      let api = `${VITE_URL}/api/${VITE_PATH}/admin/products?page=${page}`;
      if(this.category !== undefined) {
        api = `${VITE_URL}/api/${VITE_PATH}/products?page=${page}&category=${this.category}`
      };
      axios.get(api)
      .then((res) => {
        this.products = res.data.products;
        this.pages = res.data.pagination;
      })

      setTimeout(() => {
        this.isLoading = false //狀態驅動'元件'
      }, 1000)
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
        this.$refs.pModal.closeModal();
        //this.getProducts();
        //alert(res.data.message);
        if (res.data.success) {
          this.getProducts();
          this.emitter.emit('push-message', {
            style: 'success',
            title: '更新成功',
          });
        } 
        else {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '更新失敗',
            content: res.data.message.join('、'),
          });
        }
      })
    },
    delProduct(itemID) {
      let api = `${VITE_URL}/api/${VITE_PATH}/admin/product/${itemID}`; //預設新增，再來判斷isNew
      let httpMethod = 'delete';
      axios[httpMethod](api)
      .then((res) => {
        this.$refs.dModal.closeModal();
        // this.getProducts();
        // alert(res.data.message);
        if (res.data.success) {
          this.getProducts();
          this.emitter.emit('push-message', {
            style: 'success',
            title: '已刪除產品',
          });
        } 
        else {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '刪除失敗',
            content: res.data.message.join('、'),
          });
        }
      })
    },
    addImage() {
      if (this.tempProduct.imagesUrl === undefined) {
        this.tempProduct.imagesUrl = [];
      }
      const addImageUrl = document.getElementById('addImageUrl').value;
      this.tempProduct.imagesUrl.push(addImageUrl);
      this.tempProduct.imageUrl = this.tempProduct.imagesUrl[0]; //調整商品的主要顯示圖片bug
    },
    delImage(index) {
      this.tempProduct.imagesUrl.splice(index, 1);
      this.tempProduct.imageUrl = this.tempProduct.imagesUrl[0];
    },
  },
  created() {
    this.getProducts()
  },
  watch: {
    category() {// watch 動態路由 props
      this.getProducts();
    }
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