<template>
  <Loading :active="isLoading"></Loading>
  <!-- <h2>訂單列表</h2> -->
  <div class="container">
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">訂單日期</th>
          <th width="120">Email</th>
          <th>訂單款項</th>
          <th>應付金額</th>
          <th width="100">是否付款</th>
          <th width="220">編輯</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(order, key) in orders" :key="key">
          <tr v-if="orders.length">
            <td>{{ new Date(order.create_at * 1000).toLocaleDateString() }}</td>
            <td><span v-text="order.user.email" v-if="order.user"></span></td>
            <td class="text-start">
              <ul>
                <li v-for="(product, i) in order.products" :key="i">
                  品項 : {{ product.product.title }} - {{ product.qty }} {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-right">{{ order.total }}</td>
            <td>
              <div v-if="order.is_paid === 1">
                <p style="color: rgb(36, 212, 95)">已付款</p>
              </div>
              <div v-else>
                <p style="color: red">尚未付款</p>
              </div>
            </td>
            <td>
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  @click="openModal('check', order)"
                >
                  查看細節
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="openModal('dele', order)"
                >
                  刪除訂單
                </button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
  <!-- pagination -->
  <OrderPagination :pages="pages" :get-orders="getOrders"></OrderPagination>
  <!-- Modal -->
  <Ord-Modal :temp-order="tempOrder" :update-order="updateOrder" ref="oModal"></Ord-Modal>
  <Del-Modal :temp-order="tempOrder" :del-order="delOrder" ref="dModal"></Del-Modal>
</template>

<script>
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

import OrderPagination from '@/components/OrderPagination.vue'
import OrdModal from '@/components/OrderModal.vue'
import DelModal from '@/components/DeleteOrderModal.vue'

const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data() {
    return {
      isLoading: false,
      tempOrder: {}, //點選訂單
      selectID: '', //點選訂單ID
      orders: [], //訂單菜單
      pages: {} //訂單列表-頁碼
    }
  },
  methods: {
    // checkSignIn() {
    //   const api = `${VITE_URL}/api/user/check`
    //   axios
    //     .post(api)
    //     .then(() => {
    //     })
    //     .catch(() => {
    //       alert('帳號密碼有誤，將轉回登入頁面')
    //       //window.location.assign("login.html");
    //       this.$router.push('/login')
    //     })
    // },
    //取得頁面Orders
    getOrders(page = 1) {
      this.isLoading = true
      const api = `${VITE_URL}/api/${VITE_PATH}/admin/orders?page=${page}`
      axios
        .get(api)
        .then((res) => {
          this.isLoading = false
          this.orders = res.data.orders
          this.pages = res.data.pagination
        })
        .catch((err) => {
          this.isLoading = false
          alert(err.data.message)
        })
    },
    //開啟Modal判斷
    openModal(action = 'check', item) {
      if (action =='dele') {
        this.$refs.dModal.openModal();
      } 
      else {
        this.$refs.oModal.openModal();
      }
      this.tempOrder = { ...item }
    },
    //更新訂單資訊
    updateOrder(item) {
      this.isLoading = true
      const api = `${VITE_URL}/api/${VITE_PATH}/admin/product/${item.id}`
      const httpMethod = 'put'
      axios[httpMethod](api, { data: item })
        .then((res) => {
          this.isLoading = false
          this.$refs.oModal.closeModal()
          alert(res.data.message)
        })
        .catch((err) => {
          this.isLoading = false
          alert(err.data.message)
        })
    },
    // 刪除訂單(itemID)
    delOrder(itemID) {
      this.isLoading = true
      // 刪除訂單(all)
      //const api2 = `${VITE_URL}/api/${VITE_PATH}/admin/orders/all`;
      const api = `${VITE_URL}/api/${VITE_PATH}/admin/order/${itemID}`
      const httpMethod = 'delete'
      axios[httpMethod](api)
        .then((res) => {
          this.isLoading = false
          this.getOrders()
          this.$refs.dModal.closeModal()
          alert(res.data.message)
        })
        .catch((err) => {
          this.isLoading = false
          alert(err.data.message)
        })
    },
  },
  created() {
    // 在dashboard已處理登入問題
    // const token = document.cookie.replace(/(?:(?:^|.*;\s*)shopToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    // axios.defaults.headers.common['Authorization'] = token
    // this.checkSignIn()

    //this.isLoading = true
    this.getOrders()
    // setTimeout(() => {
    //   this.isLoading = false //狀態驅動'元件'
    // }, 1000)
  },
  mounted() {},
  components: {
    OrderPagination,
    OrdModal,
    DelModal,
    Loading
  }
}
</script>