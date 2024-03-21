<template>
  <Loading :active="isLoading" />
  <h2>商品列表</h2>
  <div class="container">
    <div class="mt-4">
      <!-- 產品列表 -->
      <ul class="list-group list-group-horizontal">
        <li class="list-group-item btn btn-outline-primary p-0">
          <RouterLink class="router-link-active active px-3 px-md-4 py-1" to="/products/">全部</RouterLink>
        </li>
        <li class="list-group-item btn btn-outline-primary p-0">
          <RouterLink class="router-link-active active px-3 px-md-4 py-1" to="/products/旅遊" >旅遊</RouterLink>
        </li>
        <li class="list-group-item btn btn-outline-primary p-0">
          <RouterLink class="router-link-active active px-3 px-md-4 py-1" to="/products/蔬果">蔬果</RouterLink>
        </li>
        <li class="list-group-item btn btn-outline-primary p-0">
          <RouterLink class="router-link-active active px-3 px-md-4 py-1" to="/products/肉品">肉品</RouterLink>
        </li>
        <!-- <li class="list-group-item btn btn-outline-primary p-0">
          <RouterLink class="router-link-active active px-3 px-md-4 py-1" to="/products/吐司">吐司</RouterLink>
        </li>
        <li class="list-group-item btn btn-outline-primary p-0">
          <RouterLink class="router-link-active active px-3 px-md-4 py-1" to="/products/漢堡" >漢堡</RouterLink>
        </li>
        <li class="list-group-item btn btn-outline-primary p-0">
          <RouterLink class="router-link-active active px-3 px-md-4 py-1" to="/products/蛋餅">蛋餅</RouterLink>
        </li>
        <li class="list-group-item btn btn-outline-primary p-0">
          <RouterLink class="router-link-active active px-3 px-md-4 py-1" to="/products/飲品">飲品</RouterLink>
        </li> -->
      </ul> 
      <!-- <Navbar></Navbar> -->

      <table class="table align-middle">
        <thead>
          <tr>
            <th>圖片</th>
            <th>產品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>
              <div style="background-size: cover; background-position: center">
                <img
                  class="img-fluid" style="height: 100px"
                  :src="product.imageUrl" v-bind:alt="product.title"
                  v-bind:title="product.title + ':' + product.description"
                />
              </div>
            </td>
            <td>{{ product.title }}</td>
            <td>
              <del class="h6">原價 {{ product.origin_price }} 元</del>
              <div class="h5">現在只要 {{ product.price }} 元</div>
            </td>
            <td>
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  :disabled="product.id === status.checkProduct"
                  @click="openModal(product)"
                >
                  <i class="fas fa-spinner fa-pulse"></i>
                  <span
                    v-if="product.id === status.checkProduct"
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  查看更多
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  :disabled="product.id === status.addCartLoading"
                  @click="addToCart(product.id, 1)"
                >
                  <i class="fas fa-spinner fa-pulse"></i>
                  <span
                    v-if="product.id === status.addCartLoading"
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  加入購物車
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- pagination -->
      <Pagination :pages="pages" :update-page="getProducts"></Pagination>
      <!-- 購物車列表 -->
      <template v-if="cartslength > 0">
        <div class="text-end">
          <button
            class="btn btn-outline-danger"
            type="button"
            @click="delAllCart"
            :disabled="status.delCart === 'delAll'"
          >
            <span
              v-if="status.delCart === 'delAll'"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            清空購物車
          </button>
        </div>
        <table class="table align-middle">
          <thead>
            <tr>
              <th></th>
              <th>品名</th>
              <th style="width: 170px">數量/單位</th>
              <th>單價</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cartitem in carts.carts" :key="cartitem.id">
              <td>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="delCart(cartitem.id)"
                  :disabled="cartitem.id === status.delCart"
                >
                  <i v-if="cartitem.id !== status.delCart" class="fas fa-spinner fa-pulse">x</i>
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                    v-if="cartitem.id === status.delCart"
                  ></span>
                </button>
              </td>
              <td>
                {{ cartitem.product.title }}
                <!-- <div class="text-success">
                    已套用優惠券
                    </div> -->
              </td>
              <td>
                <div class="input-group input-group-sm">
                  <div class="input-group mb-3">
                    <!-- <span v-if="cartitem.id === status.cartQtyLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> -->
                    <!-- <input min="1" type="number" class="form-control" v-model="cartitem.qty"
                        @change="cartChangeQty(cartitem, cartitem.qty)" :disabled="cartitem.id === status.cartQtyLoading"> -->
                    <button
                      type="button"
                      class="btn btn-outline-primary btn-sm"
                      @click="cartitem.qty--, cartChangeQty(cartitem, cartitem.qty)"
                      :disabled="cartitem.qty === 1 || cartitem.id === status.cartQtyLoading"
                    >
                      -
                    </button>
                    <input
                      min="1"
                      type="number"
                      class="form-control"
                      style="text-align: center"
                      v-model="cartitem.qty"
                      :disabled="cartitem.id === status.cartQtyLoading"
                      readonly
                    />
                    <button
                      type="button"
                      class="btn btn-outline-primary btn-sm"
                      @click="cartitem.qty++, cartChangeQty(cartitem, cartitem.qty)"
                      :disabled="cartitem.id === status.cartQtyLoading"
                    >
                      +
                    </button>
                    <span class="input-group-text" id="basic-addon2">{{
                      cartitem.product.unit
                    }}</span>
                  </div>
                </div>
              </td>
              <td class="text-end">
                <small class="text-success">折扣價：</small>
                <del>{{ cartitem.product.origin_price }}</del>
                {{ cartitem.product.price }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-end">總計</td>
              <td class="text-end">{{ carts.total }}</td>
            </tr>
            <tr>
              <td colspan="3" class="text-end text-success">折扣價</td>
              <td class="text-end text-success">{{ carts.final_total }}</td>
            </tr>
          </tfoot>
        </table>
        <!-- 購物車客戶資訊 -->
        <div class="my-5 row justify-content-center">
          <v-form ref="form" class="col-md-6" v-slot="{ errors }" @submit="sendOrder">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <v-field
                id="email"
                name="email"
                type="email"
                class="form-control"
                placeholder="請輸入 Email"
                :class="{ 'is-invalid': errors['email'] }"
                rules="email|required"
                v-model="form.user.email"
              ></v-field>
              <error-message name="email" class="invalid-feedback"></error-message>
            </div>
            <div class="mb-3">
              <label for="name" class="form-label">收件人姓名</label>
              <v-field
                id="name"
                name="姓名"
                type="text"
                class="form-control"
                placeholder="請輸入姓名"
                :class="{ 'is-invalid': errors['姓名'] }"
                rules="required"
                v-model="form.user.name"
              ></v-field>
              <error-message name="姓名" class="invalid-feedback"></error-message>
            </div>
            <div class="mb-3">
              <label for="tel" class="form-label">收件人電話</label>
              <v-field
                id="tel"
                name="電話"
                type="text"
                class="form-control"
                placeholder="請輸入電話"
                :class="{ 'is-invalid': errors['電話'] }"
                :rules="isPhone"
                v-model="form.user.tel"
              ></v-field>
              <error-message name="電話" class="invalid-feedback"></error-message>
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">收件人地址</label>
              <v-field
                id="address"
                name="地址"
                type="text"
                class="form-control"
                placeholder="請輸入地址"
                :class="{ 'is-invalid': errors['地址'] }"
                rules="required"
                v-model="form.user.address"
              ></v-field>
              <error-message name="地址" class="invalid-feedback"></error-message>
            </div>
            <div class="mb-3">
              <label for="message" class="form-label">留言</label>
              <textarea
                id="message"
                class="form-control"
                cols="30"
                rows="10"
                v-model="form.message"
              ></textarea>
            </div>
            <div class="text-end">
              <button
                type="submit"
                class="btn btn-danger"
                :disabled="form.user.id === status.cartQtyLoading"
              >
                送出訂單
              </button>
            </div>
          </v-form>
        </div>
      </template>
    </div>
  </div>
  <!-- 產品Modal -->
  <User-Modal :temp-product="tempProduct" :add-to-cart="addToCart" ref="uModal"></User-Modal>
</template>

<script>
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import Pagination from '@/components/PaginationTool.vue'
import UserModal from '@/components/UserProductModal.vue'

// import Navbar from '@/components/FrontNavbar.vue'


const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  props: ['category'],
  data() {
    return {
      //category: {}, //動態路由-category 

      tempProduct: {}, //點選產品
      selectID: '', //點選產品ID
      products: [], //產品菜單
      pages: {}, //產品菜單-頁碼
      carts: [], //購物車菜單
      cartslength: 0,

      status: {
        checkProduct: '',
        addCartLoading: '',
        cartQtyLoading: '',
        delCart: ''
      },

      isLoading: false, //loading狀態
      form: {
        //購物車user
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: '' //購物車user-message
      }
    }
  },
  inject: ['emitter'],
  methods: {
    openModal(item) {
      this.$refs.uModal.openModal()

      this.status.checkProduct = item.id
      this.tempProduct = { ...item }
      //this.status.checkProduct = '';
      setTimeout(() => {
        this.status.checkProduct = ''
      }, 200)
    },
    getProducts(page = 1) {
      this.isLoading = true

      let api = `${VITE_URL}/api/${VITE_PATH}/products?page=${page}`;
      if(this.category !== undefined) {
        api = `${VITE_URL}/api/${VITE_PATH}/products?page=${page}&category=${this.category}`
      };
      axios.get(api)
      .then((res) => {
        this.products = res.data.products
        this.pages = res.data.pagination
      })

      setTimeout(() => {
        this.isLoading = false //狀態驅動'元件'
      }, 1000)
    },
    getCarts() {
      this.isLoading = true

      const api = `${VITE_URL}/api/${VITE_PATH}/cart`
      axios.get(api)
        .then((res) => {
          // console.log('this.cart', res.data);
          // console.log('this.cart.carts', res.data.data.carts);
          this.carts = res.data.data
          this.cartslength = res.data.data.carts.length
        })
        .catch(() => {
          this.carts = []
          this.cartslength = 0
        })

      setTimeout(() => {
        this.isLoading = false //狀態驅動'元件'
      }, 1000)
    },
    addToCart(itemId, qty = 1) {
      this.status.addCartLoading = itemId
      let api = `${VITE_URL}/api/${VITE_PATH}/cart`
      let httpMethod = 'post'
      let cart = {
        product_id: itemId,
        qty: qty
      }
      axios[httpMethod](api, { data: cart })
        .then((res) => {
          //this.getCarts()
          this.status.addCartLoading = ''
          this.$refs.uModal.closeModal()

          if (res.data.success) {
            this.getCarts()
            this.emitter.emit('push-message', {
              style: 'success',
              title: '加入購物車成功',
            });
          } 
        })
        .catch(() => {
          //alert(err.data.message)
          this.status.addCartLoading = ''
        })
    },
    cartChangeQty(item, qty = 1) {
      this.status.cartQtyLoading = item.id
      let api = `${VITE_URL}/api/${VITE_PATH}/cart/${item.id}`
      let httpMethod = 'put'
      let order = {
        product_id: item.id,
        qty: qty
      }
      axios[httpMethod](api, { data: order })
        .then((res) => {
          //this.getCarts()
          this.status.cartQtyLoading = ''
          this.$refs.uModal.closeModal()

          if (res.data.success) {
            this.getCarts()
            this.emitter.emit('push-message', {
              style: 'success',
              title: '加入購物車成功',
            });
          }

        })
        .catch((err) => {
          //alert(err.data.message)
          this.emitter.emit('push-message', {
              style: 'danger',
              title: '加入失敗',
              content: err.data.message.join('、'),
            });
          this.status.cartQtyLoading = ''
        })
    },
    delCart(itemID) {
      this.status.delCart = itemID
      let api = `${VITE_URL}/api/${VITE_PATH}/cart/${itemID}` //預設新增，再來判斷isNew
      let httpMethod = 'delete'
      axios[httpMethod](api)
        .then((res) => {
          //this.getCarts()
          this.status.delCart = ''
          if (res.data.success) {
            this.getCarts()
            this.emitter.emit('push-message', {
              style: 'success',
              title: '刪除品項成功',
            });
          }
        })
        // .catch((err) => {
        //   alert(err.data.message)
        //   this.status.delCart = ''
        // })
    },
    delAllCart() {
      this.status.delCart = 'delAll'
      let api = `${VITE_URL}/api/${VITE_PATH}/carts` //預設新增，再來判斷isNew
      let httpMethod = 'delete'
      axios[httpMethod](api)
        .then((res) => {
          this.getCarts()
          this.status.delCart = ''
          if (res.data.success) {
            this.getCarts()
            this.emitter.emit('push-message', {
              style: 'success',
              title: '已清空購物車',
            });
          }
        })
        // .catch((err) => {
        //   alert(err.data.message)
        //   this.status.delCart = ''
        // })
    },
    sendOrder() {
      this.isLoading = true
      let api = `${VITE_URL}/api/${VITE_PATH}/order`
      const order = this.form
      axios
        .post(api, { data: order })
        .then((res) => {
          //alert(res.data.message);
          //this.getCarts()
          this.$refs.form.resetForm()
          this.isLoading = false

          if (res.data.success) {
            this.getCarts()
            this.emitter.emit('push-message', {
              style: 'success',
              title: '已送出訂單',
            });
          }
          else {
            this.emitter.emit('push-message', {
              style: 'danger',
              title: '送出訂單失敗',
              content: res.data.message.join('、'),
            });
          }
        })
        // .catch((err) => {
        //   alert(err.data.message)
        //   this.isLoading = false
        // })
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '電話為必填，須為有效的電話號碼'
    }
  },
  created() {
  },
  watch: {
    category() {// watch 動態路由 props
      this.getProducts();
      //console.log(this.$route.params.category); //測試動態路由匯入
    }
  },
  mounted() { 
    

    //VueLoading作為'元件'使用方式
    this.isLoading = true
    this.getProducts()
    this.getCarts()
    //VueLoading作為'元件'使用方式
    setTimeout(() => {
      this.isLoading = false //狀態驅動'元件'
    }, 1000)
    //VueLoading作為'插件'使用方式
    // const loader = this.$loading.show(); //方法驅動'插件'
    // setTimeout(() => {
    //     loader.hide()
    // }, 1000);
  },
  components: {
    Loading,
    Pagination,
    UserModal,
    //Navbar
  }
}
</script>
